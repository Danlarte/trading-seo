import { gql } from "@apollo/client";
import { client } from "@/libs/apollo-client";
import WebinarSingle from "@/components/webinars/WebinarSingle";

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

async function getWebinar(slug) {
  try {
    const { data } = await client.query({
      query,
      variables: {
        slug,
      },
    });

    if (!data?.webinarMensuales?.data?.[0]) {
      return null;
    }

    const webinarData = data.webinarMensuales.data[0];
    return {
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
  } catch (error) {
    console.error("Error al obtener el webinar:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const webinar = await getWebinar(slug);
  if (!webinar) {
    return {
      title: "Webinar no encontrado | Trading Pro App",
      description: "El webinar que buscas no está disponible.",
    };
  }

  return {
    title: `${webinar.titulo} | Trading Pro App`,
    description: webinar.subtitulo || webinar.descripcion?.slice(0, 155) || "",
    openGraph: {
      title: webinar.titulo,
      description:
        webinar.subtitulo || webinar.descripcion?.slice(0, 155) || "",
      images: [{ url: webinar.imagen || "/fallback-image.jpg" }],
    },
  };
}

export default async function WebinarPage({ params }) {
  const { slug } = await params;
  const initialData = await getWebinar(slug);

  return (
    <main className=" mx-auto px-4 py-8">
      <div className=" mx-auto">
        <WebinarSingle slug={slug} initialData={initialData} />
      </div>
    </main>
  );
}
