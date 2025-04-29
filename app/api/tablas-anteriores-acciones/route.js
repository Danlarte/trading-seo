import { NextResponse } from "next/server";
import { gql } from "@apollo/client";
import { client } from "@/libs/apollo-client";

const GET_TABLAS_ANTERIORES_ACCIONES = gql`
  query GetTablasAnterioresAcciones {
    tablasAnterioresAcciones(
      sort: "createdAt:desc"
      pagination: { pageSize: 1000 }
    ) {
      data {
        id
        attributes {
          titulo
          imagen {
            data {
              attributes {
                url
              }
            }
          }
          createdAt
        }
      }
    }
  }
`;

export async function GET(request) {
  try {
    const { data } = await client.query({
      query: GET_TABLAS_ANTERIORES_ACCIONES,
    });

    if (!data || !data.tablasAnterioresAcciones) {
      throw new Error(
        "No se recibieron datos de tablas anteriores de acciones"
      );
    }

    const response = NextResponse.json(data.tablasAnterioresAcciones);
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  } catch (error) {
    console.error("Error al obtener las tablas anteriores de acciones:", error);
    const errorResponse = NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
    errorResponse.headers.set("Cache-Control", "no-store, max-age=0");
    return errorResponse;
  }
}
