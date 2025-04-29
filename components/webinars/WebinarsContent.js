"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { format, isAfter } from "date-fns";
import { es } from "date-fns/locale";
import { FaClock, FaCalendar, FaEuroSign } from "react-icons/fa";
import Markdown from "markdown-to-jsx";

async function fetchWebinars() {
  const res = await fetch("/api/webinars-mensuales");
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.details || "Error al cargar los webinars");
  }
  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error("Formato de datos inválido");
  }
  return data;
}

export default function WebinarsContent() {
  const {
    data: webinars,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["webinars"],
    queryFn: fetchWebinars,
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className="bg-white shadow-md rounded-xl animate-pulse h-[200px]"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">
          {error.message || "Error al cargar los webinars"}
        </p>
      </div>
    );
  }

  if (!webinars || webinars.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No hay webinars disponibles actualmente</p>
      </div>
    );
  }

  const today = new Date();

  return (
    <div className="flex flex-col space-y-6">
      {webinars.map((webinar) => {
        const webinarDate = new Date(webinar.fecha);
        const isFutureWebinar = isAfter(webinarDate, today);

        return (
          <article
            key={webinar.id}
            className={`bg-white shadow-md rounded-xl transition-all duration-300 hover:shadow-xl ${
              isFutureWebinar ? "border-2 border-[#54bcaf]" : ""
            }`}
          >
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-1/3 relative min-h-[250px]">
                <div className="absolute top-0 left-0 bg-[#54bcaf] text-white text-xs font-bold uppercase py-1 px-2 rounded-br-lg z-10">
                  Webinar
                </div>
                {isFutureWebinar && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-[#17498a] to-[#54bcaf] text-white text-xs font-bold uppercase py-1 px-2 rounded-bl-lg z-10">
                    Próximamente
                  </div>
                )}
                <Image
                  src={webinar.imagen || "/fallback-image.jpg"}
                  alt={webinar.titulo}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  priority
                  className={`rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none object-cover ${
                    !isFutureWebinar ? "grayscale-[30%]" : ""
                  }`}
                />
              </div>
              <div className="w-full sm:w-2/3 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#17498A] mb-2 hover:text-[#54BCAF] transition-colors duration-300">
                    {webinar.titulo}
                  </h2>
                  <p className="text-gray-600 mb-4">{webinar.subtitulo}</p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex-1 min-w-[140px] flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#54bcaf]/10">
                        <FaClock className="w-4 h-4 text-[#54bcaf]" />
                      </div>
                      <div>
                        <p className="text-xs uppercase font-semibold text-gray-500">
                          Duración
                        </p>
                        <p className="text-sm font-bold text-[#17498A]">
                          {webinar.duracion} min
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 min-w-[140px] flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#54bcaf]/10">
                        <FaCalendar className="w-4 h-4 text-[#54bcaf]" />
                      </div>
                      <div>
                        <p className="text-xs uppercase font-semibold text-gray-500">
                          Fecha
                        </p>
                        <p className="text-sm font-bold text-[#17498A]">
                          {format(webinarDate, "d MMM, yyyy", {
                            locale: es,
                          })}
                        </p>
                        <p className="text-xs font-medium text-[#17498A]/70">
                          {format(webinarDate, "HH:mm")} h
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 min-w-[140px] flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#54bcaf]/10">
                        <FaEuroSign className="w-4 h-4 text-[#54bcaf]" />
                      </div>
                      <div>
                        <p className="text-xs uppercase font-semibold text-gray-500">
                          Precio
                        </p>
                        <p className="text-sm font-bold text-[#17498A]">
                          {webinar.precio === 0
                            ? "GRATIS"
                            : `${webinar.precio}€`}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-600 line-clamp-2 text-sm mb-4">
                    <Markdown
                      options={{
                        overrides: {
                          p: {
                            props: {
                              className: "mb-4",
                            },
                          },
                          a: {
                            props: {
                              className: "text-[#54BCAF] hover:text-[#17498A]",
                            },
                          },
                        },
                      }}
                    >
                      {webinar.descripcion || ""}
                    </Markdown>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Link
                    href={`/webinars/${webinar.slug}`}
                    className={`${
                      isFutureWebinar
                        ? "bg-gradient-to-r from-[#17498a] to-[#54bcaf]"
                        : "bg-gray-500"
                    } text-white px-6 py-2 rounded-full hover:shadow-xl hover:scale-105 hover:brightness-110 transform transition-all duration-300 inline-flex items-center`}
                  >
                    {isFutureWebinar ? "Reservar plaza" : "Ver grabación"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
