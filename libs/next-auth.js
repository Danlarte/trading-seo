import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import config from "@/config";
import connectMongo from "./mongo";
import { generateVerificationEmail } from "./generateVerificationEmail";
import { sendEmail } from "./resend";
import { gql } from "@apollo/client";
import { client } from "./apollo-client";

// Asegúrate de que esta URL sea correcta para tu API de Strapi

// Crear el cliente de Apollo aquí, fuera de las funciones de callback

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      // Follow the "Login with Google" tutorial to get your credentials
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.given_name ? profile.given_name : profile.name,
          email: profile.email,
          image: profile.picture,
          createdAt: new Date(),
        };
      },
    }),
    // Follow the "Login with Email" tutorial to set up your email server
    // Requires a MongoDB database. Set MONOGODB_URI env variable.
    ...(connectMongo
      ? [
          EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: config.mailgun.fromNoReply,
            sendVerificationRequest: async ({ identifier, url, provider }) => {
              const { host } = new URL(url);
              const emailHtml = generateVerificationEmail(url);
              await sendEmail({
                to: identifier,
                subject: `Verifica tu correo electrónico para ${host}`,
                html: emailHtml,
              });
            },
          }),
        ]
      : []),
  ],
  // New users will be saved in Database (MongoDB Atlas). Each user (model) has some fields like name, email, image, etc..
  // Requires a MongoDB database. Set MONOGODB_URI env variable.
  // Learn more about the model type: https://next-auth.js.org/v3/adapters/models
  ...(connectMongo && { adapter: MongoDBAdapter(connectMongo) }),

  callbacks: {
    async redirect({ url, baseUrl }) {
      // Si la URL es relativa, añádela a la URL base
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Si la URL es absoluta pero está en el mismo origen, permítela
      else if (new URL(url).origin === baseUrl) return url;
      // En cualquier otro caso, redirige a la página de inicio
      return baseUrl;
    },
    async signIn({ user, account, profile }) {
      if (!user.email) {
        console.error("Error: No se proporcionó un email válido");
        return false;
      }

      try {
        const response = await fetch(
          `${process.env.NEXTAUTH_URL}/api/usuarios`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email }),
          }
        );

        if (!response.ok) {
          throw new Error("Error al crear/obtener usuario en Strapi");
        }

        const data = await response.json();
        user.strapiId = parseInt(data.id);
        return true;
      } catch (error) {
        console.error("Error al registrar usuario en Strapi:", error);
        // Considera devolver true aquí si quieres permitir el inicio de sesión incluso si falla la integración con Strapi
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.strapiId = user.strapiId;
      }
      return token;
    },
    async session({ session, token }) {
      if (!session.user?.email) {
        console.error("Error: No hay email en la sesión");
        return session;
      }

      try {
        const GET_USER = gql`
          query GetUser($email: String!) {
            usersPermissionsUsers(filters: { email: { eq: $email } }) {
              data {
                id
                attributes {
                  email
                  username
                  externalid
                  plan
                }
              }
            }
          }
        `;

        const { data } = await client.query({
          query: GET_USER,
          variables: { email: session.user.email },
        });

        if (data.usersPermissionsUsers.data.length > 0) {
          const strapiUser = data.usersPermissionsUsers.data[0];
          session.user.strapiId = strapiUser.id;
          session.user.externalid = strapiUser.attributes.externalid;
          session.user.plan = strapiUser.attributes.plan || "free";
          session.user.id = token.sub;
        } else {
          console.error("Usuario no encontrado en Strapi");
        }
      } catch (error) {
        console.error(
          "Error al obtener usuario de Strapi para la sesión:",
          error
        );
        // No modificamos la sesión si hay un error, pero permitimos que continúe
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  theme: {
    brandColor: config.colors.main,
    // Add you own logo below. Recommended size is rectangle (i.e. 200x50px) and show your logo + name.
    // It will be used in the login flow to display your logo. If you don't add it, it will look faded.
    logo: `https://${config.domainName}/LOGO TRADINGPRO.png`,
  },
  pages: {
    signIn: "/auth",
  },
};
