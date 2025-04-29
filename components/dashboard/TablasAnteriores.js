"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const fetchTablasAnteriores = async () => {
  const response = await axios.get("/api/tablas-anteriores");
  return response.data;
};

export default function TablasAnteriores({ initialData }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tablas-anteriores"],
    queryFn: async () => {
      const response = await axios.get("/api/tablas-anteriores");
      return response.data;
    },
  });

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error al cargar las tablas anteriores</div>;

  const tablas = data?.data || [];

  return (
    <div className="flex flex-col w-full">
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <p className="text-black text-sm md:text-base">
          Tablas de resultados de meses anteriores para consulta y análisis
          histórico.
        </p>
      </div>
      <div className="relative px-12">
        <Swiper
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          modules={[Navigation]}
          className="h-[510px] w-full"
          style={{ paddingBottom: "48px" }}
          spaceBetween={20}
          slidesPerView={1.2}
          breakpoints={{
            640: {
              slidesPerView: 2.2,
            },
            1024: {
              slidesPerView: 3.2,
            },
          }}
        >
          {tablas.map((tabla) => (
            <SwiperSlide key={`Tabla${tabla.id}`} className="h-full">
              <div
                className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col"
                style={{
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 6px 10px -1px rgba(0, 0, 0, 0.08)",
                }}
              >
                <div className="relative h-48 sm:h-56 md:h-64 bg-gray-100">
                  <iframe
                    src={`${tabla.attributes.imagen.data.attributes.url}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-full"
                    title={tabla.attributes.titulo}
                  />
                </div>
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2 text-[#17498A] line-clamp-2">
                    {tabla.attributes.titulo}
                  </h3>
                  <Link
                    href={tabla.attributes.imagen.data.attributes.url}
                    target="_blank"
                    className="bg-[#54BCAE] text-white py-2 px-4 rounded-lg hover:bg-[#3da396] transition-colors duration-300 text-center text-sm sm:text-base font-semibold mt-auto"
                  >
                    Ver Tabla
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-prev !left-0"></div>
        <div className="swiper-button-next !right-0"></div>
      </div>
    </div>
  );
}
