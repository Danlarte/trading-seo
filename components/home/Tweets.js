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

export default function Tweets({ initialData }) {
  const [isClient, setIsClient] = useState(false);
  const {
    data: tweets,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["tweets"],
    queryFn: async () => {
      const response = await fetch("/api/entradas?accion=tweets");
      if (!response.ok) {
        throw new Error("Error al obtener los tweets");
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

  if (isLoading) return <div>Cargando tweets...</div>;

  if (isError) return <div>Error al cargar los tweets</div>;

  return (
    <div className="relative my-8 w-full px-8">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next-tweets",
          prevEl: ".swiper-button-prev-tweets",
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 4 },
        }}
        className="w-full h-full min-h-[300px] max-h-[400px]"
      >
        {tweets?.map((tweet) => (
          <SwiperSlide
            key={`Tweet${tweet.id}`}
            className="bg-white rounded-xl shadow-lg overflow-hidden h-[300px] sm:h-[350px] md:h-[400px]"
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 flex items-center">
              <span className="text-white font-bold text-sm">TradingPro</span>
            </div>
            <div className="p-3 flex flex-col h-[calc(100%-40px)]">
              <p className="text-gray-800 text-sm leading-relaxed mb-2 flex-grow overflow-auto">
                {tweet.attributes.contenido}
              </p>
              <div className="flex justify-end">
                <span className="text-gray-500 text-xs">
                  {format(
                    new Date(tweet.attributes.publishedAt),
                    "d 'de' MMM, yyyy",
                    {
                      locale: es,
                    }
                  )}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-prev-tweets absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-1.5 shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
        <IoIosArrowBack size={25} className="text-blue-500" />
      </div>
      <div className="swiper-button-next-tweets absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-1.5 shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
        <IoIosArrowForward size={25} className="text-blue-500" />
      </div>
    </div>
  );
}
