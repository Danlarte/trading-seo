import { NextResponse } from "next/server";
import { gql } from "@apollo/client";
import { client } from "@/libs/apollo-client";

const queries = {
  getSuperInvestors: gql`
    query {
      managers(pagination: { pageSize: 100 }) {
        meta {
          pagination {
            page
          }
        }
        data {
          id
          attributes {
            name
            portfolioValue
            nofStocks
            slug
            destacar
            imagenPrincipal {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
  getBySlug: (slug) => gql`
    query {
      managers(filters: { slug: { eq: "${slug}" } }) {
        meta {
          pagination {
            page
          }
        }
        data {
          id
          attributes {
            name
            portfolioValue
            nofStocks
            slug
            period
            portFolioDate
            holdings (pagination: { pageSize: 100 }) {
              data {
                id
                attributes {
                  stock
                  porOfPortfolio
                  recentAct
                  shares
                  priceRep
                  value
                  currentPrice
                  moreLessRepPrice
                  week52Low
                  week52High
                }
              }
            }
          }
        }
      }
    }
  `,
  getHoldHistoryById: (id) => gql`
    query {
      holdings(filters: { id: { eq: ${parseInt(id)} } }) {
        data {
          id
          attributes {
            holdingHistorial (pagination: { pageSize: 300 }) {
              data {
                attributes {
                  activity
                  change
                  period
                  porcPortfolio
                  repPrice
                  shares
                }
              }
            }
          }
        }
      }
    }
  `,
  getActivityBySlug: (slug) => gql`
    query {
      managers(filters: { slug: { eq: "${slug}" } }) {
        meta {
          pagination {
            page
          }
        }
        data {
          id
          attributes {
            activities(sort: ["year:desc", "momento:desc"]
            pagination: { pageSize: 300 }
            ) {
              data {
                attributes {
                  activity
                  change
                  momento
                  share
                  stock
                  year
                }
              }
            }
          }
        }
      }
    }
  `,
  getBuysBySlug: (slug) => gql`
    query {
      managers(filters: { slug: { eq: "${slug}" } }) {
        meta {
          pagination {
            page
          }
        }
        data {
          id
          attributes {
            buys(sort: ["year:desc", "momento:desc"]
            pagination: { pageSize: 300 }
            ) {
              data {
                attributes {
                  activity
                  change
                  momento
                  share
                  stock
                  year
                }
              }
            }
          }
        }
      }
    }
  `,
  getSellsBySlug: (slug) => gql`
    query {
      managers(filters: { slug: { eq: "${slug}" } }) {
        meta {
          pagination {
            page
          }
        }
        data {
          id
          attributes {
            sells(sort: ["year:desc", "momento:desc"]
            pagination: { pageSize: 300 }
            ) {
              data {
                attributes {
                  activity
                  change
                  momento
                  share
                  stock
                  year
                }
              }
            }
          }
        }
      }
    }
  `,
  getInsiders: (page) => gql`
    query {
      insiders(pagination: { pageSize: 20, page: ${page} },sort: "fechaOrden:desc") {
         meta {
          pagination {
            page
          }
        }
        data {
          id
          attributes {
            fecha
            simbolo
            security
            repName
            relacion
            accion
            shares
            price
            amount
            di
            fechaOrden
          }
        }
      }
    }
  `,
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const accion = searchParams.get("accion");
  const slug = searchParams.get("slug");
  const id = searchParams.get("id");
  const page = searchParams.get("page") || "1";

  try {
    let query;
    let data;

    switch (accion) {
      case "getSuperInvestors":
        query = queries.getSuperInvestors;
        break;
      case "getBySlug":
        query = queries.getBySlug(slug);
        break;
      case "getHoldHistoryById":
        query = queries.getHoldHistoryById(parseInt(id));
        break;
      case "getActivityBySlug":
        query = queries.getActivityBySlug(slug);
        break;
      case "getBuysBySlug":
        query = queries.getBuysBySlug(slug);
        break;
      case "getSellsBySlug":
        query = queries.getSellsBySlug(slug);
        break;
      case "getInsiders":
        query = queries.getInsiders(page);
        break;
      default:
        return NextResponse.json(
          { error: "Acción no válida" },
          { status: 400 }
        );
    }

    const response = await client.query({ query });
    data = response.data;

    let res;
    if (accion === "getSuperInvestors") {
      res = data.managers?.data || [];
    } else if (accion === "getBySlug") {
      res = data.managers?.data?.[0] || null;
    } else if (accion === "getHoldHistoryById") {
      res = data.holdings?.data?.[0]?.attributes?.holdingHistorial?.data;
    } else if (accion === "getInsiders") {
      res = data.insiders || {};
    } else if (accion === "getSellsBySlug") {
      res = data.managers?.data?.[0]?.attributes?.sells?.data;
    } else if (accion === "getBuysBySlug") {
      res = data.managers?.data?.[0]?.attributes?.buys?.data;
    }
    if (accion === "getActivityBySlug") {
      res = data.managers?.data?.[0]?.attributes?.activities?.data;
    }

    const apiResponse = NextResponse.json(res);
    apiResponse.headers.set("Cache-Control", "no-store, max-age=0");
    return apiResponse;
  } catch (error) {
    const errorResponse = NextResponse.json(
      { error: "Error en la consulta" },
      { status: 500 }
    );
    errorResponse.headers.set("Cache-Control", "no-store, max-age=0");
    return errorResponse;
  }
}
