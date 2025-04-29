export async function generateMetadata() {
  return {
    title: "Actualidad Financiera | TradingPRO",
    description:
      "Las últimas noticias y análisis del mundo financiero y del trading.",
    openGraph: {
      title: "Noticias | TradingPRO",
      description:
        "Las últimas noticias y análisis del mundo financiero y del trading.",
    },
  };
}


import PostsListing from "@/components/posts/PostsListing";

export default async function Noticias() {
  let initialData = null;

  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/entradas?page=1&accion=getEntradasNoCategory`,
      { next: { revalidate: 60 } }
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
      <PostsListing initialData={initialData} />
    </>
  );
}

export async function generateMetadata() {
  return {
    title: "Actualidad Financiera | TradingPRO",
    description:
      "Las últimas noticias y análisis del mundo financiero y del trading.",
    openGraph: {
      title: "Noticias | TradingPRO",
      description:
        "Las últimas noticias y análisis del mundo financiero y del trading.",
    },
  };
}
