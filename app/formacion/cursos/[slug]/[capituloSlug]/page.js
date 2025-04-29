import { fetchCursoBySlug } from "@/libs/api";
import CapituloSingle from "@/components/formacion/CapituloSingle";

// Función para generar los metadatos
export async function generateMetadata(props) {
  const params = await props.params;
  const { capituloSlug } = params;
  const cursoData = await fetchCursoBySlug(capituloSlug);
  const capitulo = cursoData.attributes;
  const curso = capitulo.curso.data.attributes;

  const descripcionGeneral = `Explora el capítulo "${capitulo.titulo}" del curso "${curso.titulo}". Aprende y mejora tus habilidades con nuestro contenido educativo de alta calidad.`;

  return {
    title: `${capitulo.titulo} | ${curso.titulo}`,
    description: capitulo.descripcion || descripcionGeneral,
    openGraph: {
      title: capitulo.titulo,
      description: capitulo.descripcion || descripcionGeneral,
      images: [
        {
          url:
            capitulo.imagen?.data?.attributes?.url ||
            "/ruta-imagen-por-defecto.jpg",
        },
      ],
    },
  };
}

export default async function CapituloPage(props) {
  const params = await props.params;
  const { capituloSlug, slug } = params;
  const cursoData = await fetchCursoBySlug(capituloSlug);

  return (
    <CapituloSingle capitulo={cursoData} cursoSlug={cursoData.attributes.url} />
  );
}

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/cursos?accion=getSlugs`
  );
  const data = await response.json();

  const paths = [];

  data.forEach((curso) => {
    if (curso.attributes.tipo === "completo") {
      // Si el curso es de tipo "completo", usamos su URL como slug
      if (curso.attributes.capitulos && curso.attributes.capitulos.data) {
        curso.attributes.capitulos.data.forEach((capitulo) => {
          if (capitulo.attributes.tipo !== "completo") {
            paths.push({
              capituloSlug: capitulo.attributes.url,
              slug: curso.attributes.url,
            });
          }
        });
      }
    }
  });

  return paths;
}
