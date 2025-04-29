import { NextResponse } from "next/server";
import { gql } from "@apollo/client";
import { client } from "@/libs/apollo-client";

const GET_USERS = gql`
  query GetUsers {
    usersPermissionsUsers {
      data {
        id
        attributes {
          username
          email
          telefono
          plan
        }
      }
    }
  }
`;

export async function GET(request) {
  try {
    const { data } = await client.query({ query: GET_USERS });
    const response = NextResponse.json(data.usersPermissionsUsers.data);
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  } catch (error) {
    const errorResponse = NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
    errorResponse.headers.set("Cache-Control", "no-store, max-age=0");
    return errorResponse;
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const data = {
      externalid: body.email,
      username: body.email,
      role: "3",
      provider: "local",
      confirmed: true,
      blocked: false,
    };
    const CREATE_USER = gql`
        mutation CreateUser{
          createUsersPermissionsUser(data: {
          externalid: "${data.externalid}",
          username: "${data.username}",
          role: "${data.role}",
          provider: "${data.provider}",
          confirmed: ${data.confirmed},
          blocked: ${data.blocked}
          }) {
            data {
              id
              attributes {
                username
                email
                telefono
                externalid
                role {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      `;
    const { data: responseData } = await client.mutate({
      mutation: CREATE_USER,
      variables: { data },
    });
    const response = NextResponse.json(
      responseData.createUsersPermissionsUser.data
    );

    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  } catch (error) {
    const errorResponse = NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
    errorResponse.headers.set("Cache-Control", "no-store, max-age=0");
    return errorResponse;
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const UPDATE_USER = gql`
      mutation UpdateUser {
        updateUsersPermissionsUser(id: ${id}, data: ${data}) {
          data {
            id
            attributes {
              username
              email
              telefono
            }
          }
        }
      }
    `;
    const { data: responseData } = await client.mutate({
      mutation: UPDATE_USER,
    });
    const response = NextResponse.json(
      responseData.updateUsersPermissionsUser.data
    );
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  } catch (error) {
    const errorResponse = NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
    errorResponse.headers.set("Cache-Control", "no-store, max-age=0");
    return errorResponse;
  }
}

// Nueva función para buscar o crear usuario
export async function PATCH(request) {
  try {
    const { email, name, phone } = await request.json();

    if (!email) {
      const errorResponse = NextResponse.json(
        { error: "Email es requerido" },
        { status: 400 }
      );
      errorResponse.headers.set("Cache-Control", "no-store, max-age=0");
      return errorResponse;
    }

    // Primero, intentamos buscar el usuario
    const { data: userData } = await client.query({
      query: gql`
        query GetUserByEmail {
          usersPermissionsUsers(filters: { email: { eq: "${email}" } }) {
            data {
              id
              attributes {
                username
                email
                telefono
                externalid
                role {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      `,
    });

    if (userData.usersPermissionsUsers.data.length > 0) {
      // El usuario ya existe, actualizamos sus datos
      const userId = userData.usersPermissionsUsers.data[0].id;
      const UPDATE_USER = gql`
        mutation UpdateUser($userId: ID!, $phone: String) {
          updateUsersPermissionsUser(id: $userId, data: { telefono: $phone }) {
            data {
              id
              attributes {
                username
                email
                telefono
                externalid
                role {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const { data: updateData } = await client.mutate({
        mutation: UPDATE_USER,
        variables: {
          userId,
          phone,
        },
      });
      await fetch("https://tradingpro.app/api/brevo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          sms: phone,
        }),
      }).catch((err) => {
        console.log("error brevo", err);
      });
      const response = NextResponse.json(
        updateData.updateUsersPermissionsUser.data
      );
      response.headers.set("Cache-Control", "no-store, max-age=0");
      return response;
    } else {
      // El usuario no existe, lo creamos
      const randomPassword = Math.random().toString(36).slice(-8);
      const newUserData = {
        email,
        username: email,
        externalid: email,
        password: randomPassword,
        telefono: phone,
        role: "3",
        provider: "local",
        confirmed: true,
        blocked: false,
      };

      const CREATE_USER = gql`
        mutation CreateUser($data: UsersPermissionsUserInput!) {
          createUsersPermissionsUser(data: $data) {
            data {
              id
              attributes {
                username
                email
                telefono
                externalid
                role {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      `;
      const { data: responseData } = await client.mutate({
        mutation: CREATE_USER,
        variables: { data: newUserData },
      });
      await fetch("https://tradingpro.app/api/brevo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newUserData.email,
          sms: newUserData.telefono,
        }),
      }).catch((err) => {
        console.log("error brevo", err);
      });
      console.log("responseData", responseData);
      const response = NextResponse.json(
        responseData.createUsersPermissionsUser.data
      );
      response.headers.set("Cache-Control", "no-store, max-age=0");
      return response;
    }
  } catch (error) {
    console.error(
      "Error al buscar o crear usuario en Strapi:",
      error.graphQLErrors
    );
    const errorResponse = NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
    errorResponse.headers.set("Cache-Control", "no-store, max-age=0");
    return errorResponse;
  }
}
