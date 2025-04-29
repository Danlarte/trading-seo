//** SEO CATEGORIAS DE SECCION NOTICIAS */
const categoryMetadata = {

  "analisis-de-mercados": {
    title: "Análisis de Mercados Financieros | TradingPRO",
    description: "Mantente informado con nuestros análisis de mercados financieros. Descubre predicciones, tendencias y pronósticos sobre acciones, criptomonedas y más.",
    keywords: [
      "Análisis de mercado ",
      "Predicciones de acciones ",
      " Análisis de criptomonedas",
      " Tendencias del mercado financiero",
      " Pronósticos de inversión",
    ],
  },
  "opinion": {
    title: "Opinión y Análisis Financiero | TradingPro",
    description: "Lee las opiniones y análisis de expertos sobre los mercados financieros, estrategias de inversión y tendencias económicas. Mantente al día con nuestras perspectivas sobre los movimientos clave del mercado.",
    keywords: [
      "Opinión financiera ",
      " Análisis de mercados",
      " Comentarios de expertos",
      " Estrategias de inversión",
      " Perspectivas de mercado",
    ],

  },
  "criptomonedas": {
    title: "Noticias y Análisis de Criptomonedas | TradingProo",
    description: "Mantente al día con las últimas noticias y análisis de criptomonedas. Descubre las tendencias de Bitcoin, Ethereum y otras altcoins, con predicciones y análisis detallados para tomar decisiones informadas de inversión.",
    keywords: [
      "Noticias de criptomonedas ",
      " Análisis de criptomonedas",
      " Bitcoin y Ethereum",
      " Tendencias en criptomonedas",
      " Predicciones de criptomonedas",
    ],

  },
  "opiniones-de-expertos": {
    title: "Opiniones de Expertos en Finanzas y Estrategias de Inversión | TradingPro",
    description: "Descubre las opiniones de expertos en los mercados financieros. Obtén análisis, consejos y predicciones sobre las mejores estrategias de inversión y las tendencias económicas actuales.",
  keywords: [
    "Opiniones de expertos en finanzas",
    "Análisis de mercados",
    "Estrategias de inversión",
    "Consejos financieros",
    "Predicciones del mercado",
  ],
}
};


export async function generateMetadata({ params }) {
  const { category } = params;

  const metadata = categoryMetadata[category];

  if (!metadata) {
    return {
      title: `Noticias de ${category} | TradingPRO`,
      description: `Lee las últimas noticias sobre ${category} en TradingPRO.`,
    };
  }

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
    },
  };
}


import PostsListing from "@/components/posts/PostsListing";

export default async function Noticias(props) {
  const params = await props.params;
  const { category } = params;

  let initialData = null;
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/entradas?page=1&accion=getEntradas&categoria=${category}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    initialData = await response.json();
  } catch (error) {
    console.error("Error fetching initial data:", error);
    initialData = {
      data: [],
      meta: { pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } },
    };
  }

  return (
    <>
      <PostsListing initialData={initialData} category={category} />
    </>
  );
}

export async function generateMetadata(props) {
  const params = await props.params;
  const { category } = params;
  return {
    title: `Noticias de ${category} | Tu Sitio Web`,
    description: `Lee las últimas noticias sobre ${category} en nuestro sitio.`,
  };
}
