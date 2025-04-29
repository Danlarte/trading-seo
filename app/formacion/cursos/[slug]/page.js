import CursoSingle from "@/components/formacion/CursoSingle";
import { fetchCursoBySlug } from "@/libs/api";

export default async function CursoPage(props) {
  const params = await props.params;
  const { slug } = params;
  const initialData = await fetchCursoBySlug(slug);

  return <CursoSingle initialData={initialData} slug={slug} />;
}
/** seo */
export async function generateMetadata(props) {
  const params = await props.params;
  const { slug } = params;
  const curso = await fetchCursoBySlug(slug);

  return {
    title: `${curso.attributes.titulo} | TradingPRO`,
    description: curso.attributes.informacion,
  };
}

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/cursos?accion=getSlugs`
  );
  const data = await response.json();

  return data
    .filter((curso) => curso.attributes.tipo === "completo")
    .map((curso) => ({
      slug: curso.attributes.url,
    }));
}
