import { NextResponse } from "next/server";
import { gql } from "@apollo/client";
import { client } from "@/libs/apollo-client";

const query = gql`
  query WebinarMensualBySlug($slug: String!) {
    webinarMensuales(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          titulo
          subtitulo
          descripcion
          duracion
          fecha
          precio
          slug
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

export async function GET(request, { params }) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json(
      { error: "Slug no proporcionado" },
      { status: 400 }
    );
  }

  try {
    const { data } = await client.query({
      query,
      variables: {
        slug,
      },
    });

    if (!data?.webinarMensuales?.data?.[0]) {
      return NextResponse.json(
        { error: "Webinar no encontrado" },
        { status: 404 }
      );
    }

    const webinarData = data.webinarMensuales.data[0];
    const webinar = {
      id: webinarData.id,
      titulo: webinarData.attributes.titulo,
      subtitulo: webinarData.attributes.subtitulo,
      descripcion: webinarData.attributes.descripcion,
      duracion: webinarData.attributes.duracion,
      fecha: webinarData.attributes.fecha,
      precio: webinarData.attributes.precio,
      codigoFormulario: webinarData.attributes.codigoFormulario,
      imagen: webinarData.attributes.imagen?.data?.attributes?.url || null,
      slug: webinarData.attributes.slug,
    };

    const response = NextResponse.json(webinar);
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  } catch (error) {
    console.error("Error detallado:", error);
    const errorResponse = NextResponse.json(
      {
        error: "Error al obtener el webinar",
        details: error.message,
      },
      { status: 500 }
    );
    errorResponse.headers.set("Cache-Control", "no-store, max-age=0");
    return errorResponse;
  }
}
