import { NextResponse } from "next/server";
import { gql } from "@apollo/client";
import { client } from "@/libs/apollo-client";

const GET_CURSOS = gql`
  query GetCursos {
    productos(pagination: { pageSize: 1000 }, sort: "createdAt:desc") {
      data {
        id
        attributes {
          titulo
          informacion
          precio
          url
          stripeProductID
          stripePriceID
          imagen {
            data {
              attributes {
                url
              }
            }
          }
          tipo
          video
          createdAt
          curso {
            data {
              id
              attributes {
                titulo
                informacion
                precio
                stripeProductID
                stripePriceID
                imagen {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                tipo
                video
                createdAt
              }
            }
          }
        }
      }
    }
  }
`;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const accion = searchParams.get("accion");

  try {
    if (!accion) {
      const { data } = await client.query({ query: GET_CURSOS });
      const response = NextResponse.json(data.productos.data);

      return response;
    } else if (accion === "getSlugs") {
      const GET_SLUGS = gql`
        query GetSlugs {
          productos {
            data {
              id
              attributes {
                url
                tipo
                createdAt
                capitulos {
                  data {
                    id
                    attributes {
                      url
                      tipo
                    }
                  }
                }
              }
            }
          }
        }
      `;
      const { data } = await client.query({ query: GET_SLUGS });
      const response = NextResponse.json(data.productos.data);
      response.headers.set("Cache-Control", "no-store, max-age=0");
      return response;
    } else if (accion === "getBySlug") {
      const slug = searchParams.get("slug");
      const GET_BY_SLUG = gql`
        query GetBySlug($slug: String!) {
          productos(filters: { url: { eq: $slug } }) {
            data {
              id
              attributes {
                caracteristicas {
                  __typename
                  ... on ComponentCursosCaracteristicas {
                    id
                    titulo
                    informacion
                  }
                }
                titulo
                informacion
                precio
                url
                stripeProductID
                stripePriceID
                imagen {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                tipo
                video
                createdAt
                curso {
                  data {
                    id
                    attributes {
                      titulo
                      url
                      informacion
                      precio
                      stripeProductID
                      stripePriceID
                      imagen {
                        data {
                          attributes {
                            url
                          }
                        }
                      }
                      tipo
                      video
                      createdAt
                    }
                  }
                }
                capitulos(pagination: { pageSize: 100 }) {
                  data {
                    id
                    attributes {
                      titulo
                      url
                      precio
                      stripeProductID
                      stripePriceID
                      imagen {
                        data {
                          attributes {
                            url
                          }
                        }
                      }
                      tipo
                      informacion
                      video
                      createdAt
                    }
                  }
                }
              }
            }
          }
        }
      `;
      const { data } = await client.query({
        query: GET_BY_SLUG,
        variables: { slug },
      });
      const response = NextResponse.json(data.productos.data[0]);
      response.headers.set("Cache-Control", "no-store, max-age=0");
      return response;
    } else {
      return NextResponse.json({ error: "Acción no válida" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error al obtener los cursos:", error);
    const errorResponse = NextResponse.json(
      { error: "Error al obtener los cursos" },
      { status: 500 }
    );
    errorResponse.headers.set("Cache-Control", "no-store, max-age=0");
    return errorResponse;
  }
}
