import { NextResponse } from "next/server";
import { gql } from "@apollo/client";
import { client } from "@/libs/apollo-client";

const GET_CARTERAS = gql`
  query GetCarteras {
    carteras(sort: "createdAt:desc", pagination: { pageSize: 1000 }) {
      data {
        id
        attributes {
          tipo
          instrumento
          precio
          sl
          tp
          estado
          resultado
          createdAt
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
      query: GET_CARTERAS,
    });

    if (!data || !data.carteras) {
      throw new Error("No se recibieron datos de carteras");
    }

    const response = NextResponse.json(data.carteras);
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  } catch (error) {
    console.error("Error al obtener las carteras:", error);
    const errorResponse = NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
    errorResponse.headers.set("Cache-Control", "no-store, max-age=0");
    return errorResponse;
  }
}
