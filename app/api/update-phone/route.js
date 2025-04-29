import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { gql } from "@apollo/client";
import { client } from "@/libs/apollo-client";
import { obtenerIdUsuarioStrapi } from "@/libs/strapi-utils";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json(
      { error: "No autorizado o email no disponible" },
      { status: 401 }
    );
  }

  const { phoneNumber, nombre, apellidos, telegram, email } = await req.json();
  const strapiId = session.user.strapiId;
  const idUsuarioStrapi = await obtenerIdUsuarioStrapi(email, strapiId);

  const UPDATE_USER = gql`
    mutation UpdateUser(
      $id: ID!
      $telefono: String!
      $nombre: String!
      $apellidos: String
      $telegram: String
    ) {
      updateUsersPermissionsUser(
        id: $id
        data: {
          telefono: $telefono
          nombre: $nombre
          apellidos: $apellidos
          telegram: $telegram
        }
      ) {
        data {
          id
          attributes {
            telefono
            nombre
            apellidos
            telegram
          }
        }
      }
    }
  `;
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_USER,
      variables: {
        id: idUsuarioStrapi,
        telefono: phoneNumber,
        nombre: nombre,
        apellidos: apellidos || "",
        telegram: telegram || "",
      },
    });

    if (data.updateUsersPermissionsUser) {
      const response = NextResponse.json({ success: true });
      response.headers.set("Cache-Control", "no-store, max-age=0");
      return response;
    } else {
      throw new Error("Error al actualizar el número de teléfono");
    }
  } catch (error) {
    console.error(
      "Error detallado al actualizar el número de teléfono:",
      error
    );
    const errorResponse = NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
    errorResponse.headers.set("Cache-Control", "no-store, max-age=0");
    return errorResponse;
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json(
      { error: "No autorizado o email no disponible" },
      { status: 401 }
    );
  }

  const idUsuarioStrapi = await obtenerIdUsuarioStrapi(session.user.email);

  const GET_USER_PHONE = gql`
    query GetUserPhone {
      usersPermissionsUser(id: ${idUsuarioStrapi}) {
        data {
          attributes {
            telefono
            nombre
            apellidos
            telegram
          }
        }
      }
    }
  `;

  try {
    const { data } = await client.query({
      query: GET_USER_PHONE,
    });

    const userData = data.usersPermissionsUser.data.attributes;
    const response = NextResponse.json({
      telefono: userData.telefono,
      nombre: userData.nombre,
      apellidos: userData.apellidos,
      telegram: userData.telegram,
    });
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  } catch (error) {
    console.error("Error al obtener el número de teléfono:", error);
    const errorResponse = NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
    errorResponse.headers.set("Cache-Control", "no-store, max-age=0");
    return errorResponse;
  }
}
