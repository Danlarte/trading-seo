import { NextResponse } from "next/server";
import { gql } from "@apollo/client";
import { client } from "@/libs/apollo-client";

// Definir el cliente Apollo fuera de la función para reutilizarlo

// Función para crear consultas GraphQL con variables
function createQuery(queryString) {
  return (variables) =>
    gql`
      ${queryString(variables)}
    `;
}

// Objeto con las consultas GraphQL
const queries = {
  getEntradasNoCategory: createQuery(
    ({ page }) => `
    query entradasnew {
      entradas(
        pagination: { pageSize: 40, page: ${page} }
        sort: "fecha:desc"
      ) {
        meta {
          pagination {
            page
          }
        }
        data {
          id
          attributes {
            titulo
            contenido
            fecha
            Destacar
            sumario
            autor
            imagenPrincipal {
              data {
                attributes {
                  url
                }
              }
            }
            createdAt
            slug
            categoria
            category {
              data {
                attributes {
                  titulo
                  destacada
                  slug
                }
              }
            }
            audio {
              data {
                attributes {
                  url
                }
              }
            }
            videoLegacy
            publishedAt
          }
        }
      }
    }
  `
  ),
  getEntradas: createQuery(
    ({ page, categoria }) => `
    query entradasnew {
      entradas(
        pagination: { pageSize: 40, page: ${page} }
        filters: { category: { slug: { eq: "${categoria}" } } }
        sort: "fecha:desc"
      ) {
        meta {
          pagination {
            page
          }
        }
        data {
          id
          attributes {
            titulo
            contenido
            fecha
            Destacar
            sumario
            autor
            imagenPrincipal {
              data {
                attributes {
                  url
                }
              }
            }
            createdAt
            slug
            categoria
            category {
              data {
                attributes {
                  titulo
                  destacada
                  slug
                }
              }
            }
            audio {
              data {
                attributes {
                  url
                }
              }
            }
            videoLegacy
            publishedAt
          }
        }
      }
    }
  `
  ),
  getLatest: gql`
    query e {
      entradas(
        pagination: { pageSize: 20 }
        filters: { category: { slug: { ne: "opiniones-de-expertos" } } }
        sort: "fecha:desc"
      ) {
        meta {
          pagination {
            page
          }
        }
        data {
          id
          attributes {
            titulo
            contenido
            fecha
            Destacar
            sumario
            autor
            imagenPrincipal {
              data {
                attributes {
                  url
                }
              }
            }
            createdAt
            slug
            category {
              data {
                attributes {
                  titulo
                  destacada
                  slug
                }
              }
            }
            categoria
            audio {
              data {
                attributes {
                  url
                }
              }
            }
            videoLegacy
            publishedAt
          }
        }
      }
    }
  `,
  getLatestOpinion: gql`
    query e {
      entradas(
        pagination: { pageSize: 13 }
        filters: { category: { slug: { eq: "opiniones-de-expertos" } } }
        sort: "fecha:desc"
      ) {
        meta {
          pagination {
            page
          }
        }
        data {
          id
          attributes {
            titulo
            contenido
            fecha
            Destacar
            sumario
            autor
            imagenPrincipal {
              data {
                attributes {
                  url
                }
              }
            }
            createdAt
            slug
            categoria
            category {
              data {
                attributes {
                  titulo
                  destacada
                  slug
                }
              }
            }
            audio {
              data {
                attributes {
                  url
                }
              }
            }
            videoLegacy
            publishedAt
          }
        }
      }
    }
  `,
  getdestacadas: createQuery(
    ({ categoria }) => `
    query e {
      entradas(
        pagination: { pageSize: 5 }
        filters: {
          category: { slug: { eq: "${categoria}" } }
          Destacar: { eq: true }
        }
        sort: "fecha:desc"
      ) {
        meta {
          pagination {
            page
          }
        }
        data {
          id
          attributes {
            titulo
            contenido
            fecha
            Destacar
            sumario
            autor
            imagenPrincipal {
              data {
                attributes {
                  url
                }
              }
            }
            createdAt
            slug
            categoria
            category {
              data {
                attributes {
                  titulo
                  destacada
                  slug
                }
              }
            }
            audio {
              data {
                attributes {
                  url
                }
              }
            }
            videoLegacy
            publishedAt
          }
        }
      }
    }
  `
  ),
  getslugs: createQuery(
    () => `
    query e {
      entradas(
        sort: "fecha:desc"
        pagination: { pageSize: 100 }
      ) {
        data {
          attributes {
            slug
            category {
              data {
                attributes {
                  slug
                }
              }
            }
          }
        }
      }
    }
  `
  ),
  getBySlug: createQuery(
    ({ slug }) => `
    query getBySlug {
      entradas(
        filters: {
          slug: {
            eq: "${slug}"
          }
        }
      ) {
        data {
          attributes {
            slug
            titulo
            contenido
            fecha
            sumario
            autor
            slug
            imagenPrincipal {
              data {
                attributes {
                  url
                }
              }
            }
            categoria
            category {
              data {
                attributes {
                  titulo
                  destacada
                  slug
                }
              }
            }
            audio {
              data {
                attributes {
                  url
                }
              }
            }
            videoLegacy
            Destacar
            createdAt
          }
        }
      }
    }
  `
  ),
  getRelatedBySlug: createQuery(
    ({ slug, categoria }) => `
    query getRelatedPosts {
      entradas(
        pagination: { pageSize: 5 }
        filters: {
          and: [
            { category: { slug: { eq: "${categoria}" } } }
            { slug: { ne: "${slug}" } }
          ]
        }
        sort: "fecha:desc"
      ) {
        meta {
          pagination {
            total
            pageSize
            page
          }
        }
        data {
          id
          attributes {
            titulo
            sumario
            fecha
            slug
            autor
            imagenPrincipal {
              data {
                attributes {
                  url
                }
              }
            }
            category {
              data {
                attributes {
                  titulo
                  slug
                }
              }
            }
          }
        }
      }
    }
  `
  ),
  tweets: createQuery(
    () => `
      query tweets {
        twitters(sort: "publishedAt:desc", pagination: { pageSize: 15 }) {
          data {
            id
            attributes {
              contenido
              publishedAt
            }
          }
        }
      }
    `
  ),
};

// Función para ejecutar consultas
async function executeQuery(queryFunction, variables = {}) {
  try {
    let query;
    if (typeof queryFunction === "function") {
      query = queryFunction(variables);
    } else {
      query = queryFunction;
    }
    const { data } = await client.query({ query });
    return NextResponse.json(data.entradas || data.twitters.data);
  } catch (e) {
    console.error("Error en la consulta GraphQL:", e);
    return NextResponse.json(
      { error: "Error en la consulta" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const accion = searchParams.get("accion");
  const page = searchParams.get("page") || "1";
  const categoria = searchParams.get("categoria") || null;
  const slug = searchParams.get("slug");

  const variables = { page, categoria, slug };

  let response;

  switch (accion) {
    case "getEntradasNoCategory":
    case "getEntradas":
    case "getdestacadas":
    case "getslugs":
    case "tweets":
    case "getBySlug":
    case "getRelatedBySlug":
      response = await executeQuery(queries[accion], variables);
      break;
    case "getLatest":
    case "getLatestOpinion":
      response = await executeQuery(queries[accion]);
      break;
    default:
      response = NextResponse.json(
        { error: "Acción no válida" },
        { status: 400 }
      );
  }

  response.headers.set("Cache-Control", "no-store, max-age=0");
  return response;
}
