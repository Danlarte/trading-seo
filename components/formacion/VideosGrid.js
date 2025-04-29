
"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Encabezado from "@/components/home/Encabezado";

export default function VideosGrid({ categoria, initialData }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["videos", categoria],
    queryFn: () =>
      fetch(`/api/videos?categoria=${categoria}`)
        .then((res) => res.json())
        .catch((e) => {
          console.error("Error fetching videos:", e);
          throw e;
        }),
    initialData: initialData,
    refetchInterval: 3000,
    staleTime: 2500,
  });

  if (isLoading) return <div className="text-center py-10">Cargando...</div>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Error al cargar los videos
      </div>
    );

  return (
    <>
      <div className="relative h-[250px] mt-10 lg:h-[400px] w-full bg-gradient-to-r from-[#17498A] to-[#54BCAF] rounded-lg overflow-hidden">
        <Image
          src="/Cabecera_FORMACIÓN videos gratuitos- WEB TRADING PRO.png"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={100}
          alt="Formación videos gratuitos"
          className="opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-start">
          <h1 className="text-4xl lg:text-6xl font-bold text-white text-start drop-shadow-lg ml-8">
            Videos Formativos
          </h1>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-3 mt-9">
        <Encabezado titulo="VIDEOS FORMATIVOS" />
        <div className="mt-10 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2">
              <div className="relative h-[300px] lg:h-[450px]">
                <Image
                  src="/Diseño cabecera masterclasses ok.png"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  quality={100}
                  alt="Masterclasses"
                />
              </div>
            </div>
            <div className="lg:w-1/2 p-8">
              <h2 className="text-3xl font-bold text-[#54BDB0] mb-4">
                ¿Cuál es el mejor sistema de trading?
              </h2>
              <h3 className="text-2xl font-bold text-[#17498A] mb-4">
                {data[0]?.attributes.categoria}
              </h3>
              <p className="text-lg font-bold mb-4 text-gray-700">
                {data[0]?.attributes.autor}
              </p>
              <p className="mb-4 text-gray-600">
                ¡Bienvenidos a la emocionante serie de{" "}
                <strong>vídeos formativos gratuitos</strong>! Sumérgete en el
                mundo de las <strong>finanzas y la inversión</strong> con{" "}
                <strong>dos expertos reconocidos</strong> en el sector.
              </p>
              <p className="text-gray-600">
                En esta <strong>exclusiva lista de reproducción</strong>, José y
                Álvaro comparten sus <strong>grandes conocimientos</strong>{" "}
                sobre <strong>estrategias de trading</strong>,{" "}
                <strong>análisis de mercado</strong> y{" "}
                <strong>consejos prácticos</strong> para que te adentres en el
                ecosistema del trading y aprendas a{" "}
                <strong>sacar la mayor rentabilidad de tus finanzas</strong>.
                ¡No te los pierdas!
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((video, index) => (
            <div
              key={`video-${index}`}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <div className="relative h-48">
                {video.attributes.imagen.data && (
                  <Image
                    src={video.attributes.imagen.data.attributes.url}
                    layout="fill"
                    objectFit="cover"
                    alt={video.attributes.titulo}
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#17498A] mb-2 line-clamp-2">
                  {video.attributes.titulo}
                </h3>
                <p className="text-lg font-semibold mb-4 text-gray-600">
                  {video.attributes.autor}
                </p>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {video.attributes.descripcion}
                </p>
                <Link
                  href={video.attributes.url}
                  target="_blank"
                  className="inline-block bg-[#54BCAF] text-white font-bold py-2 px-6 rounded-full hover:bg-[#3da396] transition-colors duration-300"
                >
                  Ver video
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
