"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Encabezado from "./Encabezado";
import Link from "next/link";

export default function Guias() {
  const [isClient, setIsClient] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedGuia, setSelectedGuia] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    prefix: "",
  });

  const {
    data: guias,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["guias"],
    queryFn: async () => {
      const response = await fetch("/api/guias");
      if (!response.ok) {
        throw new Error("Error al obtener las guías");
      }
      return response.json();
    },
    refetchInterval: 3000,
    staleTime: 2500,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDownload = (guia) => {
    setSelectedGuia(guia);
    setShowPopup(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/usuarios", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: `${formData.prefix}${formData.phone}`,
        }),
      });
      if (response.ok) {
        window.open(selectedGuia.archivo, "_blank");
        setShowPopup(false);
        setFormData({ name: "", email: "", phone: "", prefix: "+34" });
      } else {
        throw new Error("Error al suscribirse");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!isClient) return null;

  if (isLoading)
    return <div className="text-center py-8">Cargando guías...</div>;

  if (isError)
    return (
      <div className="text-center py-8 text-red-500">
        Error al cargar las guías
      </div>
    );

  if (!guias || guias.length === 0)
    return <div className="text-center py-8">No hay guías disponibles</div>;

  return (
    <section className="bg-white py-12">
      <div className="mx-auto px-4">
        <Encabezado titulo="Guías Gratuitas de Inversión y Trading" />
        <div className="relative mt-8">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-guias",
              prevEl: ".swiper-button-prev-guias",
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            className="w-full h-full"
          >
            {guias.map((guia) => (
              <SwiperSlide
                key={`Guia${guia.id}`}
                className="flex flex-col items-center"
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 w-[200px]">
                  <div className="relative h-[280px] w-full">
                    <Image
                      src={guia.imagen}
                      alt={guia.titulo}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-[#17498A] font-bold text-lg mb-2 line-clamp-2">
                      {guia.titulo}
                    </h3>
                    <button
                      onClick={() => handleDownload(guia)}
                      className="w-full bg-[#54BCAF] text-white px-4 py-2 rounded-full text-sm hover:bg-[#17498A] transition-colors"
                    >
                      Descargar
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-button-prev-guias absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
            <IoIosArrowBack size={24} className="text-[#54BCAF]" />
          </div>
          <div className="swiper-button-next-guias absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
            <IoIosArrowForward size={24} className="text-[#54BCAF]" />
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-md w-full relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-[#17498A] transition-colors"
            >
              <IoMdClose size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#17498A]">
              Descarga tu guía
            </h2>
            <p className="mb-4">Introduce tus datos para descargar la guía:</p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Tu nombre (sin apellidos)"
                className="w-full p-2 border rounded-md focus:border-[#54BCAF] focus:ring focus:ring-[#54BCAF] focus:ring-opacity-50"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Tu correo electrónico principal"
                className="w-full p-2 border rounded-md focus:border-[#54BCAF] focus:ring focus:ring-[#54BCAF] focus:ring-opacity-50"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="+34"
                  className="w-20 p-2 border rounded-md focus:border-[#54BCAF] focus:ring focus:ring-[#54BCAF] focus:ring-opacity-50"
                  required
                  value={formData.prefix}
                  onChange={(e) =>
                    setFormData({ ...formData, prefix: e.target.value })
                  }
                />
                <input
                  type="tel"
                  placeholder="Tu número de teléfono"
                  className="flex-1 p-2 border rounded-md focus:border-[#54BCAF] focus:ring focus:ring-[#54BCAF] focus:ring-opacity-50"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="terms" required className="mr-2" />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  Confirmo que he leído la{" "}
                  <Link
                    href="/politica-privacidad"
                    className="text-[#54bcaf] hover:underline"
                  >
                    política de privacidad
                  </Link>{" "}
                  y estoy de acuerdo en recibir ofertas comerciales
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-[#54bcaf] text-white font-bold py-3 px-4 rounded-full hover:bg-[#17498A] transition-colors duration-300"
              >
                DESCARGAR GUÍA
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
