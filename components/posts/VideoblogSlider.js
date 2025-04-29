"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Encabezado from "../home/Encabezado";

export default function VideoblogSlider() {
  const [isClient, setIsClient] = useState(false);
  const {
    data: posts,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["videoblog"],
    queryFn: async () => {
      const response = await fetch(
        "/api/entradas?accion=getEntradas&categoria=videoblog"
      );
      if (!response.ok) {
        throw new Error("Error al obtener los posts");
      }
      return response.json();
    },
    refetchInterval: 3000,
    staleTime: 2500,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (isLoading) return <div>Cargando posts...</div>;

  if (isError) return <div>Error al cargar los posts</div>;

  if (!posts?.data?.length) return null;

  return (
    <div className="mt-10">
      <Encabezado titulo="Videoblog" href="/noticias/videoblog" />
      <div className="relative my-8 w-full px-8">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-videoblog",
            prevEl: ".swiper-button-prev-videoblog",
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full h-full min-h-[300px] max-h-[400px]"
        >
          {posts?.data?.map((post) => (
            <SwiperSlide
              key={`Videoblog${post.id}`}
              className="bg-white rounded-xl shadow-sm overflow-hidden group transition-all duration-300  hover:-translate-y-1"
            >
              <Link
                href={`/noticias/videoblog/${post.attributes.slug}`}
                className="block h-full"
              >
                <div className="relative w-full h-[200px] overflow-hidden">
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                    <span className="text-white font-semibold px-4 py-2 rounded-lg bg-[#54BCAF] transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      Ver más
                    </span>
                  </div>
                  <Image
                    src={post.attributes.imagenPrincipal.data.attributes.url}
                    alt={post.attributes.titulo}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 h-[calc(100%-200px)] flex flex-col justify-between">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 group-hover:text[#54BCAF] transition-colors">
                    {post.attributes.titulo}
                  </h3>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-gray-500 text-xs">
                      {format(
                        new Date(post.attributes.publishedAt),
                        "d 'de' MMM, yyyy",
                        {
                          locale: es,
                        }
                      )}
                    </span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-prev-videoblog absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2.5 shadow-md flex items-center justify-center cursor-pointer hover:bg-[#54BCAF] hover:text-white transition-all duration-300 group">
          <IoIosArrowBack
            size={25}
            className="text-[#54BCAF] group-hover:text-white transition-colors"
          />
        </div>
        <div className="swiper-button-next-videoblog absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2.5 shadow-md flex items-center justify-center cursor-pointer hover:bg-[#54BCAF] hover:text-white transition-all duration-300 group">
          <IoIosArrowForward
            size={25}
            className="text-[#54BCAF] group-hover:text-white transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
