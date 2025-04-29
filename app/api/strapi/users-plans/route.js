import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import { gql } from "@apollo/client";
import { client } from "@/libs/apollo-client";

export async function GET(request) {
  try {
    const session = await getServerSession();

    if (!session || !session.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await connectMongo();

    // Verificar si el usuario que hace la solicitud es administrador
    const adminUser = await User.findOne({ email: session.user.email }).lean();
    if (!adminUser || !adminUser.isAdmin) {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
    }

    // Obtener los IDs de usuario de los parámetros de consulta
    const { searchParams } = new URL(request.url);
    const userIdsParam = searchParams.get("userIds");

    if (!userIdsParam) {
      return NextResponse.json(
        { error: "No se proporcionaron IDs de usuario" },
        { status: 400 }
      );
    }

    const userIds = userIdsParam.split(",");
    console.log(`Procesando ${userIds.length} IDs de usuario`);

    // Obtener usuarios de MongoDB por IDs para conseguir sus emails
    const users = await User.find({ _id: { $in: userIds } }).lean();
    console.log(`Encontrados ${users.length} usuarios en MongoDB`);

    const emailToIdMap = {};
    users.forEach((user) => {
      if (user.email) {
        emailToIdMap[user.email.toLowerCase()] = user._id.toString();
      }
    });

    const emails = Object.keys(emailToIdMap);
    console.log(`Emails mapeados: ${emails.length}`);

    // Si no hay usuarios, devolver un objeto vacío
    if (emails.length === 0) {
      return NextResponse.json({});
    }

    // Dividir la lista de emails en grupos más pequeños para evitar límites en la consulta
    const chunkSize = 200;
    const emailChunks = [];
    for (let i = 0; i < emails.length; i += chunkSize) {
      emailChunks.push(emails.slice(i, i + chunkSize));
    }
    console.log(
      `Dividiendo emails en ${emailChunks.length} grupos para consultar Strapi`
    );

    // Consultar Strapi para cada grupo de emails
    let allStrapiUsers = [];

    for (let i = 0; i < emailChunks.length; i++) {
      const chunk = emailChunks[i];
      console.log(
        `Consultando chunk ${i + 1}/${emailChunks.length} (${
          chunk.length
        } emails)`
      );

      // Primero, consultar todos los usuarios con plan EXPERT
      const GET_EXPERT_USERS = gql`
        query GetExpertUsers($emails: [String!]!) {
          usersPermissionsUsers(
            filters: {
              and: [{ email: { in: $emails } }, { plan: { eq: "EXPERT" } }]
            }
            pagination: { pageSize: 1000 }
          ) {
            data {
              id
              attributes {
                email
                plan
              }
            }
            meta {
              pagination {
                total
              }
            }
          }
        }
      `;

      const expertUsersResult = await client.query({
        query: GET_EXPERT_USERS,
        variables: { emails: chunk },
        fetchPolicy: "no-cache",
      });

      const expertUsers =
        expertUsersResult?.data?.usersPermissionsUsers?.data || [];
      console.log(
        `Encontrados ${expertUsers.length} usuarios EXPERT en chunk ${i + 1}`
      );
      allStrapiUsers = [...allStrapiUsers, ...expertUsers];

      // Luego, consultar el resto de usuarios para obtener sus planes
      const GET_OTHER_USERS = gql`
        query GetOtherUsers($emails: [String!]!) {
          usersPermissionsUsers(
            filters: {
              and: [{ email: { in: $emails } }, { plan: { ne: "EXPERT" } }]
            }
            pagination: { pageSize: 1000 }
          ) {
            data {
              id
              attributes {
                email
                plan
              }
            }
            meta {
              pagination {
                total
              }
            }
          }
        }
      `;

      const otherUsersResult = await client.query({
        query: GET_OTHER_USERS,
        variables: { emails: chunk },
        fetchPolicy: "no-cache",
      });

      const otherUsers =
        otherUsersResult?.data?.usersPermissionsUsers?.data || [];
      console.log(
        `Encontrados ${otherUsers.length} usuarios NON-EXPERT en chunk ${i + 1}`
      );
      allStrapiUsers = [...allStrapiUsers, ...otherUsers];
    }

    console.log(
      `Total de usuarios obtenidos de Strapi: ${allStrapiUsers.length}`
    );

    // Contabilizar planes específicos para depuración
    const planCounts = {};
    allStrapiUsers.forEach((user) => {
      const plan = user.attributes.plan || "null";
      planCounts[plan] = (planCounts[plan] || 0) + 1;
    });
    console.log("Distribución de planes:", planCounts);

    // Crear un mapa de id de MongoDB a plan
    const userPlans = {};
    allStrapiUsers.forEach((strapiUser) => {
      if (!strapiUser.attributes || !strapiUser.attributes.email) {
        console.log("Usuario Strapi sin email:", strapiUser.id);
        return;
      }

      const email = strapiUser.attributes.email.toLowerCase();
      const plan = strapiUser.attributes.plan;

      if (email && emailToIdMap[email]) {
        userPlans[emailToIdMap[email]] = plan || null;
      } else {
        console.log(`Email no encontrado en mapa de MongoDB: ${email}`);
      }
    });

    // Contar cuántos usuarios tienen plan EXPERT
    const expertCount = Object.values(userPlans).filter(
      (plan) => plan === "EXPERT"
    ).length;
    console.log(`Total usuarios con plan EXPERT mapeados: ${expertCount}`);

    return NextResponse.json(userPlans);
  } catch (error) {
    console.error("Error al obtener planes de usuario desde Strapi:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud: " + error.message },
      { status: 500 }
    );
  }
}
