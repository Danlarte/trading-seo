"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function LogosHome() {
  const logos = [
    {
      imagen: "/1Logo Google.png",
    },
    {
      imagen: "/home/2.png",
    },
    {
      imagen: "/home/3.png",
    },
    {
      imagen: "/home/4.png",
    },
    {
      imagen: "/home/5.png",
    },
    {
      imagen: "/home/7.png",
    },
    {
      imagen: "/home/8.png",
    },
  ];

  return (
    <div className="relative w-full my-2 px-8">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        navigation={{
          nextEl: ".swiper-button-next-logos",
          prevEl: ".swiper-button-prev-logos",
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        className="w-full"
      >
        {logos.map((logo, index) => (
          <SwiperSlide
            key={`logos${index}`}
            className="flex items-center justify-center"
          >
            <Image
              src={logo.imagen}
              alt="logo"
              width={200}
              height={200}
              style={{
                objectFit: "contain",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-prev-logos absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-1.5 shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
        <IoIosArrowBack size={25} className="text-blue-500" />
      </div>
      <div className="swiper-button-next-logos absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-1.5 shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
        <IoIosArrowForward size={25} className="text-blue-500" />
      </div>
    </div>
  );
}
