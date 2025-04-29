"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";

const fetchAcciones = async () => {
  const response = await fetch("/api/acciones");
  if (!response.ok) {
    throw new Error("Error al cargar las acciones");
  }
  return response.json();
};

const Acciones = () => {
  const [isClient, setIsClient] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["acciones"],
    queryFn: fetchAcciones,
    refetchInterval: 30000,
    staleTime: 25000,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  if (isLoading) return <div>Cargando acciones...</div>;
  if (isError) return <div>Error al cargar las acciones</div>;

  const slides = [
    {
      type: "image",
      content: (
        <Link href="/herramientas/superinvestors" className="w-full">
          <Image
            alt="Superinvestors"
            height={237}
            width={1000}
            src="/newhome1.png"
            className="w-full h-auto"
          />
        </Link>
      ),
    },
    ...(data?.acciones?.data?.map((accion) => ({
      type: "accion",
      content: (
        <div className="p-6 h-[237px] w-[700px] flex bg-white rounded-xl shadow-sm border border-gray-100 hover:border-[#54BCAF] transition-all duration-300">
          <div className="w-1/2 pr-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 group-hover:text-[#54BCAF] transition-colors">
                {accion.attributes.nombre}
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                {accion.attributes.ticker}
              </p>
            </div>
            <div className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600">Precio Objetivo</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {accion.attributes.precio}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600">Potencial</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {accion.attributes.potencial}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 pl-4 border-l border-gray-200">
            <p className="text-sm text-gray-600 line-clamp-6">
              {accion.attributes.descripcion}
            </p>
          </div>
        </div>
      ),
    })) || []),
  ];

  return (
    <div className="hidden md:block mt-3">
      <div className="relative max-w-[700px] h-[237px]">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-acciones",
            prevEl: ".swiper-button-prev-acciones",
          }}
          autoplay={{ delay: 5000, disableOnInteraction: true }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide
              key={index}
              className={`${
                slide.type === "image"
                  ? ""
                  : "group transition-all duration-300"
              }`}
            >
              {slide.content}
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-prev-acciones absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2.5 shadow-md flex items-center justify-center cursor-pointer hover:bg-[#54BCAF] hover:text-white transition-all duration-300 group">
          <IoIosArrowBack
            size={25}
            className="text-[#54BCAF] group-hover:text-white transition-colors"
          />
        </div>
        <div className="swiper-button-next-acciones absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2.5 shadow-md flex items-center justify-center cursor-pointer hover:bg-[#54BCAF] hover:text-white transition-all duration-300 group">
          <IoIosArrowForward
            size={25}
            className="text-[#54BCAF] group-hover:text-white transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default Acciones;
