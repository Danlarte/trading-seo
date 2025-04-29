import { NextResponse } from "next/server";
import { gql } from "@apollo/client";
import { client } from "@/libs/apollo-client";

const GET_CARTERA_ACCIONES = gql`
  query GetCarteraAcciones {
    carteraAcciones(sort: "fecha:desc", pagination: { pageSize: 1000 }) {
      data {
        id
        attributes {
          fecha
          ticker
          tipo
          estado
          precio
          sl
          tp
          porcentaje
          imagen {
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
`;

export async function GET(request) {
  try {
    const { data } = await client.query({
      query: GET_CARTERA_ACCIONES,
    });

    if (!data || !data.carteraAcciones) {
      throw new Error("No se recibieron datos de cartera de acciones");
    }

    const response = NextResponse.json(data.carteraAcciones);
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  } catch (error) {
    console.error("Error al obtener la cartera de acciones:", error);
    const errorResponse = NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
    errorResponse.headers.set("Cache-Control", "no-store, max-age=0");
    return errorResponse;
  }
}
