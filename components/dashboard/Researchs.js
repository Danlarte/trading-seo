"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const fetchResearchs = async () => {
  const response = await axios.get("/api/researchs");
  return response.data;
};

export default function Researchs({ initialData }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["researchs"],
    queryFn: fetchResearchs,
    refetchInterval: 3000,
    staleTime: 2500,
  });

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error al cargar los research</div>;

  const researchs = data || [];

  return (
    <div className="flex flex-col w-full">
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <p className="text-black text-sm md:text-base">
          Informe que interpreta los indicadores económicos y financieros más
          relevantes publicados durante los últimos siete días.
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
          {researchs.map((research) => (
            <SwiperSlide key={`Research${research.id}`} className="h-full">
              <div
                className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col"
                style={{
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 6px 10px -1px rgba(0, 0, 0, 0.08)",
                }}
              >
                <div className="relative h-48 sm:h-56 md:h-64">
                  <Image
                    fill
                    src={research.attributes.imagen.data.attributes.url}
                    alt={research.attributes.titulo}
                    className="object-cover"
                  />
                </div>
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2 text-[#17498A] line-clamp-2">
                    {research.attributes.titulo}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 mb-4 flex-grow overflow-y-auto">
                    {research.attributes.descripcion}
                  </p>
                  <Link
                    href={research.attributes.archivo.data.attributes.url}
                    target="_blank"
                    className="bg-[#54BCAE] text-white py-2 px-4 rounded-lg hover:bg-[#3da396] transition-colors duration-300 text-center text-sm sm:text-base font-semibold mt-auto"
                  >
                    Ver Research
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
