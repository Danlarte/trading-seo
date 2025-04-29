/** ETIQUETAS SEO */
export const metadata = {
  title: "Información Privilegiada de Inversión | Oportunidades y Riesgos | TradingPro",
  description:
    "Descubre cómo acceder a oportunidades de inversión utilizando información privilegiada. Aprende sobre los riesgos y regulaciones asociadas con el uso de información no pública en las decisiones financieras.",
    keywords: [
      "Información privilegiada en inversiones",
      "Oportunidades de inversión basadas en información privilegiada",
      "Uso de información no pública en finanzas",
      "Riesgos de usar información privilegiada",
      "Regulaciones sobre información privilegiada"
    ],
};



import { Suspense } from "react";
import Insiders from "@/components/superinvestors/Insiders";
import { client } from "@/libs/apollo-client";
import { gql } from "@apollo/client";

const GET_INITIAL_INSIDERS = gql`
  query {
    insiders(pagination: { pageSize: 20, page: 1 }, sort: "fechaOrden:desc") {
      meta {
        pagination {
          page
          pageSize
          total
          pageCount
        }
      }
      data {
        id
        attributes {
          fecha
          simbolo
          security
          repName
          relacion
          accion
          shares
          price
          amount
          di
          fechaOrden
        }
      }
    }
  }
`;

async function getInitialInsiders() {
  try {
    const { data } = await client.query({ query: GET_INITIAL_INSIDERS });
    return data.insiders;
  } catch (error) {
    return null;
  }
}

export default async function InsidersPage() {
  const initialData = await getInitialInsiders();

  return (
    <div className="mx-auto px-4 py-8">
      <Suspense fallback={<div>Cargando...</div>}>
        <Insiders initialData={initialData} />
      </Suspense>
    </div>
  );
}
