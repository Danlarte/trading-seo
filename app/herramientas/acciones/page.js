import AccionesListing from "@/components/herramientas/acciones/AccionesListing";
import Encabezado from "@/components/home/Encabezado";

export default async function Acciones() {
  let initialData = null;

  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/acciones`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    initialData = await response.json();
  } catch (error) {
    console.error("Error fetching initial data:", error);
    initialData = {
      acciones: { data: [] },
    };
  }

  return (
    <>
      <Encabezado titulo="Precio objetivo de acciones" />
      <AccionesListing initialData={initialData} />
    </>
  );
}

export async function generateMetadata() {
  return {
    title: "Acciones en Portafolio | TradingPRO",
    description:
      "Listado completo de acciones en nuestro portafolio con análisis y potencial de crecimiento.",
    openGraph: {
      title: "Acciones | TradingPRO",
      description:
        "Listado completo de acciones en nuestro portafolio con análisis y potencial de crecimiento.",
    },
  };
}
