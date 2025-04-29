"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";

const SliderPosts = ({ posts }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {posts.map((post) => (
        <link
          key={post.id}
          as="image"
          href={
            post.attributes.imagenPrincipal.data?.attributes.url ||
            "/fallback-image.jpg"
          }
        />
      ))}
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 5000 }}
        loop={true}
        className="w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px] mb-10 rounded-3xl overflow-hidden shadow-xl"
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <div className="relative w-full h-full rounded-3xl overflow-hidden">
              <Image
                src={
                  post.attributes.imagenPrincipal.data?.attributes.url ||
                  "/fallback-image.jpg"
                }
                alt={post.attributes.titulo}
                layout="fill"
                objectFit="cover"
                priority
                className="rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-3xl">
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-white">
                    {post.attributes.titulo}
                  </h2>
                  <p className="mb-4 sm:mb-5 text-sm sm:text-base md:text-lg text-white line-clamp-2 sm:line-clamp-3">
                    {post.attributes.sumario}
                  </p>
                  <Link
                    href={`/noticias/${post.attributes.category.data.attributes.slug}/${post.attributes.slug}`}
                    className="inline-block bg-[#54BCAF] text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold hover:bg-[#3da396] transition-colors duration-300 shadow-md hover:shadow-lg"
                  >
                    Leer más
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SliderPosts;
