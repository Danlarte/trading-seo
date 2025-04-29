"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { format, isAfter } from "date-fns";
import { es } from "date-fns/locale";
import { FaClock, FaCalendar, FaEuroSign } from "react-icons/fa";
import Markdown from "markdown-to-jsx";

async function fetchWebinar(slug) {
  try {
    const res = await fetch(`/api/webinars-mensuales/${slug}`);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.details || "Error al cargar el webinar");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error al cargar el webinar:", error);
    throw error;
  }
}

export default function WebinarSingle({ slug, initialData }) {
  const {
    data: webinar,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["webinar", slug],
    queryFn: () => fetchWebinar(slug),
    initialData,
  });

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="bg-white rounded-xl shadow-md">
          <div className="h-[400px] bg-gray-200 rounded-t-xl" />
          <div className="p-8">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500">
          {error.message || "Error al cargar el webinar"}
        </p>
      </div>
    );
  }

  if (!webinar) {
    return (
      <div className="text-center">
        <p className="text-gray-500">Webinar no encontrado</p>
      </div>
    );
  }

  const webinarDate = new Date(webinar.fecha);
  const today = new Date();
  const isFutureWebinar = isAfter(webinarDate, today);

  return (
    <article
      className={`bg-white shadow-lg rounded-2xl transition-all duration-300 ${
        isFutureWebinar ? "border-2 border-[#54bcaf]" : ""
      }`}
    >
      <div className="relative lg:h-[500px] min-h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 z-10" />
        <div className="absolute top-0 left-0 bg-[#54bcaf] text-white text-sm font-bold uppercase py-2 px-4 rounded-br-2xl z-20">
          Webinar
        </div>
        {isFutureWebinar && (
          <div className="absolute top-0 right-0 bg-gradient-to-r from-[#17498a] to-[#54bcaf] text-white text-sm font-bold uppercase py-2 px-4 rounded-bl-2xl z-20">
            Próximamente
          </div>
        )}
        <Image
          src={webinar.imagen || "/fallback-image.jpg"}
          alt={webinar.titulo}
          fill
          priority
          className={`rounded-t-2xl object-cover transform hover:scale-105 transition-transform duration-700 ${
            !isFutureWebinar ? "grayscale-[30%]" : ""
          }`}
        />
        <div className="absolute bottom-0 left-0 right-0 p-2 z-20">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            {webinar.titulo}
          </h1>
          {webinar.subtitulo && (
            <p className="text-xl text-white/90 drop-shadow-lg">
              {webinar.subtitulo}
            </p>
          )}
        </div>
      </div>

      <div className="p-2 lg:p-6 w-full">
        <div className="lg:flex lg:gap-12 w-full">
          <div className="lg:flex-1 w-full">
            <div className="flex flex-wrap gap-4 mb-12 p-6 w-full bg-gray-50 rounded-xl">
              <div className="flex-1 min-w-[180px] flex items-center space-x-3 px-4 py-2 bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#54bcaf]/10">
                  <FaClock className="w-5 h-5 text-[#54bcaf]" />
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

              <div className="flex-1 min-w-[180px] flex items-center space-x-3 px-4 py-2 bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#54bcaf]/10">
                  <FaCalendar className="w-5 h-5 text-[#54bcaf]" />
                </div>
                <div>
                  <p className="text-xs uppercase font-semibold text-gray-500">
                    Fecha
                  </p>
                  <div>
                    <p className="text-sm font-bold text-[#17498A]">
                      {format(webinarDate, "d 'de' MMMM, yyyy", {
                        locale: es,
                      })}
                    </p>
                    <p className="text-sm font-medium text-[#17498A]/80">
                      {format(webinarDate, "HH:mm")} h
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-[180px] flex items-center space-x-3 px-4 py-2 bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#54bcaf]/10">
                  <FaEuroSign className="w-5 h-5 text-[#54bcaf]" />
                </div>
                <div>
                  <p className="text-xs uppercase font-semibold text-gray-500">
                    Precio
                  </p>
                  <p className="text-sm font-bold text-[#17498A]">
                    {webinar.precio === 0 ? "GRATIS" : `${webinar.precio}€`}
                  </p>
                </div>
              </div>
            </div>

            {webinar.descripcion && (
              <div className="prose prose-lg max-w-none text-gray-600">
                <Markdown
                  options={{
                    overrides: {
                      p: {
                        props: {
                          className: "mb-6 leading-relaxed",
                        },
                      },
                      a: {
                        props: {
                          className:
                            "text-[#54BCAF] hover:text-[#17498A] font-medium",
                          target: "_blank",
                          rel: "noopener noreferrer",
                        },
                      },
                      h2: {
                        props: {
                          className:
                            "text-2xl font-bold text-[#17498A] mt-12 mb-6",
                        },
                      },
                      h3: {
                        props: {
                          className:
                            "text-xl font-bold text-[#17498A] mt-8 mb-4",
                        },
                      },
                      ul: {
                        props: {
                          className: "list-disc pl-6 mb-6 space-y-2",
                        },
                      },
                      ol: {
                        props: {
                          className: "list-decimal pl-6 mb-6 space-y-2",
                        },
                      },
                      li: {
                        props: {
                          className: "mb-2 text-gray-700",
                        },
                      },
                      blockquote: {
                        props: {
                          className:
                            "border-l-4 border-[#54BCAF] pl-6 my-8 italic bg-gray-50 py-4 rounded-r-lg",
                        },
                      },
                    },
                  }}
                >
                  {webinar.descripcion}
                </Markdown>
              </div>
            )}
          </div>

          <div className="lg:w-[600px] lg:sticky lg:top-8">
            {webinar.codigoFormulario ? (
              <div
                className="p-2 bg-white rounded-xl shadow-lg border border-gray-100"
                dangerouslySetInnerHTML={{ __html: webinar.codigoFormulario }}
              />
            ) : isFutureWebinar ? (
              <div className="p-2 bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCalendar className="w-8 h-8 text-[#54bcaf]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#17498A]">
                    Próximamente
                  </h3>
                  <p className="text-gray-600">
                    El formulario de inscripción estará disponible próximamente
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-2 bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaClock className="w-8 h-8 text-[#54bcaf]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#17498A]">
                    Webinar Finalizado
                  </h3>
                  <p className="text-gray-600">
                    Este webinar ya ha finalizado. Pronto estará disponible la
                    grabación
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
