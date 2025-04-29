const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
      "images.unsplash.com",
      "logos-world.net",
      "supabase.drumstock.dev",
      "res.cloudinary.com",
      "tradingapi.jose-sanchez.dev",
      "cdn.rareblocks.xyz",
      "vz-0989adaf-a45.b-cdn.net",
      "jionytqmllaxhyjtsssn.supabase.co",
    ],
  },
  async redirects() {
    return [
      {
        source: "/curso/inversion-y-trading",
        destination: "/formacion/cursos/inversion-y-trading",
        permanent: true,
      },
      {
        source: "/comunidad",
        destination: "/",
        permanent: true,
      },
      {
        source: "/comunidad/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/herramientas/graficos",
        destination: "/herramientas/graficos-trading-tiempo-real",
        permanent: true,
      },
      {
        source: "/herramientas/insiders",
        destination: "/herramientas/informacion-privilegiada-inversion",
        permanent: true,
      },
      {
        source: "/herramientas/calculadora",
        destination: "/herramientas/calcular-interes-compuesto",
        permanent: true,
      },
      {
        source: "/landing",
        destination: "/membresia-trading-tradingpro",
        permanent: true,
      },
      {
        source: "/sobre-nosotros",
        destination: "/quienes-somos-tradingpro",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
