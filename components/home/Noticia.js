"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { FaPlay, FaMicrophone } from "react-icons/fa";

const fetchNoticias = async (categoria) => {
  const url = categoria
    ? `/api/entradas?accion=getEntradas&categoria=${categoria}&page=1`
    : "/api/entradas?accion=getEntradasNoCategory&page=1";

  const response = await axios.get(url);
  return response.data;
};

const calcularTiempoLectura = (contenido) => {
  const palabrasPorMinuto = 200;
  const texto = contenido.replace(/<[^>]*>/g, "");
  const palabras = texto.trim().split(/\s+/).length;
  const minutos = Math.ceil(palabras / palabrasPorMinuto);
  return `${minutos} min de lectura`;
};

const Noticia = ({ categoria, categoriaExcluida }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["noticias", categoria],
    queryFn: () => fetchNoticias(categoria),
    refetchInterval: 3000,
    staleTime: 2500,
  });

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error al cargar las noticias</div>;

  const noticias = categoriaExcluida
    ? data.data.filter(
        (noticia) =>
          noticia.attributes.category.data.attributes.slug !==
            categoriaExcluida &&
          noticia.attributes.category.data.attributes.slug !== "videoblog"
      )
    : data.data;

  return (
    <div className="flex flex-col space-y-6 h-full max-h-[700px] overflow-y-auto pr-4">
      {noticias.map((noticia) => (
        <div
          key={noticia.id}
          className="bg-white shadow-md rounded-xl transition-all duration-300 hover:shadow-xl sm:min-h-[200px] min-h-[400px]"
        >
          <div className="flex flex-col sm:flex-row h-full">
            <div className="w-full sm:w-1/3 relative h-48 sm:h-full">
              <div className="absolute top-0 left-0 bg-[#54bcaf] text-white text-xs font-bold uppercase py-1 px-2 rounded-br-lg z-10">
                {noticia.attributes.category.data.attributes.titulo}
              </div>
              <Image
                src={
                  noticia.attributes.imagenPrincipal.data?.attributes.url ||
                  "/fallback-image.jpg"
                }
                alt={noticia.attributes.titulo}
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl sm:rounded-l-xl  sm:rounded-tr-none"
              />
              <div className="absolute bottom-2 right-2 flex space-x-2">
                {noticia.attributes.audio.data && (
                  <div className="bg-[#54bcaf] rounded-full p-2">
                    <FaMicrophone className="text-white" size={16} />
                  </div>
                )}
                {noticia.attributes.videoLegacy && (
                  <div className="bg-[#54bcaf] rounded-full p-2">
                    <FaPlay className="text-white" size={16} />
                  </div>
                )}
              </div>
            </div>
            <div className="w-full sm:w-2/3 p-4 flex flex-col justify-between">
              <div>
                <Link
                  href={`/noticias/${noticia.attributes.category.data.attributes.slug}/${noticia.attributes.slug}`}
                >
                  <h2 className="text-xl font-bold text-[#17498A] mb-2 hover:text-[#54BCAF] transition-colors duration-300 line-clamp-2">
                    {noticia.attributes.titulo}
                  </h2>
                </Link>
                <div
                  dangerouslySetInnerHTML={{
                    __html: noticia.attributes.sumario,
                  }}
                  className="text-gray-600 line-clamp-3 text-sm"
                />
              </div>
              <div className="mt-2 flex justify-between items-center">
                <Link
                  href={`/noticias/${noticia.attributes.category.data.attributes.slug}/${noticia.attributes.slug}`}
                >
                  <span className="text-[#54BCAF] font-semibold hover:underline inline-flex items-center text-sm">
                    VER NOTICIA
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </Link>
                <span className="text-xs text-gray-500">
                  {calcularTiempoLectura(noticia.attributes.contenido)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Noticia;
