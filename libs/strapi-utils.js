import { gql } from "@apollo/client";
import { client } from "./apollo-client";

function generateRandomPassword(length = 12) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

export async function findOrCreateUserInStrapi(email) {
  const GET_USER = gql`
    query GetUser($email: String!) {
      usersPermissionsUsers(filters: { email: { eq: $email } }) {
        data {
          id
          attributes {
            email
            username
            externalid
            telefono
          }
        }
      }
    }
  `;

  const CREATE_USER = gql`
    mutation CreateUser($data: UsersPermissionsUserInput!) {
      createUsersPermissionsUser(data: $data) {
        data {
          id
          attributes {
            email
            username
            externalid
          }
        }
      }
    }
  `;

  try {
    // Buscar el usuario en Strapi
    const { data: userData } = await client.query({
      query: GET_USER,
      variables: { email },
    });

    if (userData.usersPermissionsUsers.data.length > 0) {
      // El usuario ya existe en Strapi
      return userData.usersPermissionsUsers.data[0];
    } else {
      // El usuario no existe, crearlo en Strapi
      const randomPassword = generateRandomPassword();
      const { data: newUserData } = await client.mutate({
        mutation: CREATE_USER,
        variables: {
          data: {
            email,
            username: email,
            externalid: email, // Usamos el email como externalid
            password: randomPassword,
            confirmed: true,
            blocked: false,
            provider: "google",
            role: "3", // Asegúrate de que este es el ID correcto para el rol de usuario normal
          },
        },
      });
      return newUserData.createUsersPermissionsUser.data;
    }
  } catch (error) {
    console.error("Error al buscar o crear usuario en Strapi:", error);
    throw error;
  }
}

export async function obtenerIdUsuarioStrapi(email, strapiId) {
  const OBTENER_ID_USUARIO = gql`
    query ObtenerIdUsuario($email: String!, $strapiId: ID) {
      usersPermissionsUsers(
        filters: { or: [{ email: { eq: $email } }, { id: { eq: $strapiId } }] }
      ) {
        data {
          id
        }
      }
    }
  `;

  try {
    const { data } = await client.query({
      query: OBTENER_ID_USUARIO,
      variables: { email, strapiId },
    });

    if (data.usersPermissionsUsers.data.length > 0) {
      return data.usersPermissionsUsers.data[0].id;
    } else {
      throw new Error("Usuario no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el ID del usuario en Strapi:", error);
    throw error;
  }
}
