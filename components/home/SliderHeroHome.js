"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";

import "swiper/css";
import "swiper/css/navigation";

const SliderHeroHome = ({ initialData }) => {
  const { data, isError } = useQuery({
    queryKey: ["noticias"],
    queryFn: async () => {
      const response = await fetch("/api/entradas?accion=getLatest");
      if (!response.ok) {
        throw new Error("Error al obtener las noticias");
      }
      return response.json();
    },
    initialData,
    refetchInterval: 3000,
    staleTime: 2500,
  });

  const noticias =
    data?.data.slice(0, 5).map((item) => ({
      id: item.id,
      titulo: item.attributes.titulo,
      descripcion: item.attributes.sumario,
      imagen: item.attributes.imagenPrincipal.data.attributes.url,
      slug: item.attributes.slug,
      categoria: item.attributes.category.data.attributes.slug, // Añadimos la categoría
    })) || [];

  const registroSlide = [
    {
      id: "webinars",
      titulo: "",
      descripcion: "",
      imagen: "/slider webinar 2.png",
      url: "/webinars",
    },
    {
      id: "registro",
      titulo: "¡Únete a nuestra comunidad!",
      descripcion:
        "Regístrate ahora y obtén acceso a contenido exclusivo, ofertas especiales y mucho más.",
      imagen:
        "https://supabase.drumstock.dev/storage/v1/object/public/TradingPro/minerasdebitcoin.jpg-minerasdebitcoin_f21c266e15.jpg",
    },
  ];

  const allSlides = [...noticias, ...registroSlide];

  if (isError) {
    return <div>Error al cargar las noticias</div>;
  }

  return (
    <>
      {allSlides.map((slide) => (
        <link key={slide.id} rel="preload" as="image" href={slide.imagen} />
      ))}
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 5000 }}
        loop={true}
        className="w-full h-[500px] sm:h-[600px] md:h-[600px] lg:h-[600px] xl:h-[600px] mb-10 rounded-3xl overflow-hidden shadow-xl"
      >
        {allSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full rounded-3xl overflow-hidden">
              <Image
                src={slide.imagen}
                alt={slide.titulo}
                layout="fill"
                objectFit="cover"
                priority
                className="rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-3xl">
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 text-white">
                    {slide.titulo}
                  </h2>
                  <p className="mb-3 sm:mb-4 md:mb-5 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white line-clamp-2 sm:line-clamp-3 md:line-clamp-4">
                    {slide.descripcion}
                  </p>
                  {slide.id === "registro" ? (
                    <Link
                      href="/auth"
                      className="inline-block bg-[#54BCAF] text-white px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-3 lg:px-6 lg:py-4 rounded-full text-sm sm:text-base md:text-lg lg:text-xl font-semibold hover:bg-[#3da396] transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                      Registrarse
                    </Link>
                  ) : slide.id === "webinars" ? (
                    <Link
                      href="/webinars"
                      className="inline-block bg-[#54BCAF] text-white px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-3 lg:px-6 lg:py-4 rounded-full text-sm sm:text-base md:text-lg lg:text-xl font-semibold hover:bg-[#3da396] transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                      Ver Webinars
                    </Link>
                  ) : (
                    <Link
                      href={`/noticias/${slide.categoria}/${slide.slug}`}
                      className="inline-block bg-[#54BCAF] text-white px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-3 lg:px-6 lg:py-4 rounded-full text-sm sm:text-base md:text-lg lg:text-xl font-semibold hover:bg-[#3da396] transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                      Leer más
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SliderHeroHome;
