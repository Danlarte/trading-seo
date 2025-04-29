import SingleNoticias from "@/components/posts/SingleNoticias";

async function getPostData(slug) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/entradas?accion=getBySlug&slug=${slug}`,
    {
      next: { revalidate: 1 },
    }
  );

  const data = await response.json();

  return data.data[0];
}
async function getRelatedPosts(slug, category) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/entradas?accion=getRelatedBySlug&slug=${slug}&categoria=${category}`,
    {
      next: { revalidate: 1 },
    }
  );

  const data = await response.json();

  return data.data;
}

export default async function Page(props) {
  const params = await props.params;
  const postData = await getPostData(params.slug);
  const relatedPosts = await getRelatedPosts(params.slug, params.category);

  if (!postData) {
    return <div>No se encontraron datos</div>;
  }

  return (
    <SingleNoticias
      initialData={postData}
      slug={params.slug}
      relatedPosts={relatedPosts}
    />
  );
}

export async function generateMetadata(props) {
  const params = await props.params;
  const postData = await getPostData(params.slug);

  if (!postData) {
    return {
      title: "Noticia no encontrada | TradingPRO",
      description: "La noticia que buscas no está disponible.",
    };
  }

  const { attributes } = postData;

  return {
    title: `${attributes.titulo} | TradingPRO`,
    description:
      attributes.sumario ||
      "Lee las últimas noticias sobre trading y finanzas en TradingPRO.",
    openGraph: {
      title: attributes.titulo,
      description:
        attributes.sumario ||
        "Lee las últimas noticias sobre trading y finanzas en TradingPRO.",
      images: [
        {
          url:
            attributes.imagenPrincipal?.data?.attributes?.url ||
            "/default-news-image.jpg",
        },
      ],
      type: "article",
      article: {
        publishedTime: attributes.createdAt,
        authors: [attributes.autor],
        tags: [
          attributes.categoria,
          attributes.category?.data?.attributes?.titulo,
        ],
      },
    },
  };
}

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/entradas?accion=getslugs`,
    {
      next: { revalidate: 1 },
    }
  );
  const data = await response.json();

  if (!data || !data.data) {
    console.error("No se recibieron datos válidos de la API");
    return [];
  }

  return data.data.map((post) => ({
    slug: post.attributes.slug,
    category: post.attributes.category.data.attributes.slug,
  }));
}
