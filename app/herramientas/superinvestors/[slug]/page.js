import { fetchSuperInvestorBySlug } from "@/libs/api";
import SuperInvestorSingle from "@/components/superinvestors/SinglePage";

export default async function Page(props) {
  const params = await props.params;
  const { slug } = params;
  const superInvestor = await fetchSuperInvestorBySlug(slug);

  if (!superInvestor) {
    return <div>No se encontró el superinvestor</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SuperInvestorSingle post={superInvestor} />
    </div>
  );
}

export async function generateMetadata(props) {
  const params = await props.params;
  const { slug } = params;
  const superInvestor = await fetchSuperInvestorBySlug(slug);

  if (!superInvestor) {
    return {
      title: "Super Inversor no encontrado",
    };
  }

  return {
    title: `${superInvestor.attributes.name} | Super Inversores`,
    description: `Detalles de las inversiones y actividades de ${superInvestor.attributes.name}`,
  };
}
/* 
export async function generateStaticParams() {
  try {
    const url = `${process.env.NEXTAUTH_URL}/api/superinvestors?accion=getSuperInvestors`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorBody}`
      );
    }

    const data = await response.json();

    if (!data || !Array.isArray(data)) {
      return [];
    }

    return data.map((superInvestor) => ({
      slug: superInvestor.attributes.slug,
    }));
  } catch (error) {
    return [];
  }
} */
