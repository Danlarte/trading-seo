import { NextResponse } from "next/server";
import { gql } from "@apollo/client";
import { client } from "@/libs/apollo-client";

const query = gql`
  query WebinarMensuales {
    webinarMensuales(sort: "fecha:asc", pagination: { pageSize: 100 }) {
      data {
        id
        attributes {
          titulo
          subtitulo
          descripcion
          duracion
          slug
          fecha
          precio
          codigoFormulario
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

    // Verificación de seguridad y manejo de nulos
    if (!data?.webinarMensuales?.data) {
      throw new Error("Estructura de datos inválida desde Strapi");
    }

    const webinars = data.webinarMensuales.data.map((webinar) => ({
      id: webinar.id,
      titulo: webinar.attributes.titulo,
      subtitulo: webinar.attributes.subtitulo,
      descripcion: webinar.attributes.descripcion,
      duracion: webinar.attributes.duracion,
      fecha: webinar.attributes.fecha,
      precio: webinar.attributes.precio,
      codigoFormulario: webinar.attributes.codigoFormulario,
      imagen: webinar.attributes.imagen?.data?.attributes?.url || null,
      slug: webinar.attributes.slug || null,
    }));

    const response = NextResponse.json(webinars);
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  } catch (error) {
    console.error("Error detallado:", error);
    const errorResponse = NextResponse.json(
      {
        error: "Error al obtener los webinars mensuales",
        details: error.message,
      },
      { status: 500 }
    );
    errorResponse.headers.set("Cache-Control", "no-store, max-age=0");
    return errorResponse;
  }
}
