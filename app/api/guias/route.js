import { NextResponse } from "next/server";
import { gql } from "@apollo/client";
import { client } from "@/libs/apollo-client";

const query = gql`
  query Guias {
    guias(sort: "publishedAt:desc") {
      data {
        id
        attributes {
          titulo
          archivo {
            data {
              attributes {
                url
              }
            }
          }
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
      query,
    });

    const guias = data.guias.data.map((guia) => ({
      id: guia.id,
      titulo: guia.attributes.titulo,
      archivo: guia.attributes.archivo.data.attributes.url,
      imagen: guia.attributes.imagen.data.attributes.url,
    }));

    const response = NextResponse.json(guias);
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  } catch (error) {
    console.error("Error:", error);
    const errorResponse = NextResponse.json(
      { error: "Error al obtener las guías" },
      { status: 500 }
    );
    errorResponse.headers.set("Cache-Control", "no-store, max-age=0");
    return errorResponse;
  }
}
