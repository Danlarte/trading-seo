"use client";

import Link from "next/link";
import Encabezado from "../home/Encabezado";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Image from "next/image";
import SliderPosts from "./SliderPosts";
import { usePathname } from "next/navigation";

export default function PostsListing({ initialData, category }) {
  const { ref, inView } = useInView();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const ImageWithFallback = ({ src, alt }) => {
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
      if (src.startsWith("/uploads")) {
        setImgSrc(`https://tradingapi.jose-sanchez.dev${src}`);
      }
    }, [src]);

    return (
      <Image
        alt={alt}
        style={{ objectFit: "cover" }}
        fill
        src={imgSrc}
        onError={() => {
          setImgSrc("/fallback-image.jpg");
        }}
      />
    );
  };

  const calcularTiempoLectura = (contenido) => {
    const palabrasPorMinuto = 200;
    const texto = contenido.replace(/<[^>]*>/g, "");
    const palabras = texto.trim().split(/\s+/).length;
    const minutos = Math.ceil(palabras / palabrasPorMinuto);
    return `${minutos} min de lectura`;
  };

  const fetchNoticias = async ({ pageParam = 1 }) => {
    const encodedCategory = encodeURIComponent(category).replace(/%20/g, "-");
    const url = category
      ? `/api/entradas?page=${pageParam}&accion=getEntradas&categoria=${encodedCategory}`
      : `/api/entradas?page=${pageParam}&accion=getEntradasNoCategory`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al cargar las noticias");
    return res.json();
  };

  const {
    status,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["noticiasDerLaHome" + category, category],
    queryFn: fetchNoticias,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.meta?.pagination) return undefined;
      const { page, pageCount } = lastPage.meta.pagination;
      return page < pageCount ? page + 1 : undefined;
    },
    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [1],
        }
      : undefined,
    refetchInterval: 3000,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (status === "loading" && !initialData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#54BCAF]"></div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center text-red-500 font-bold text-xl mt-10">
        Error: {error.message}
      </div>
    );
  }

  const pages = data?.pages || [];
  const sliderPosts = pages[0]?.data?.slice(0, 5) || [];
  const remainingPosts =
    pages.flatMap((page, index) =>
      index === 0 ? (page.data || []).slice(5) : page.data || []
    ) || [];

  if (sliderPosts.length === 0 && remainingPosts.length === 0) {
    return (
      <div className="text-center text-gray-500 font-bold text-xl mt-10">
        No hay noticias disponibles
      </div>
    );
  }

  return (
    <div className=" min-h-screen pb-12">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Encabezado titulo="NOTICIAS" />

        {sliderPosts.length > 0 && (
          <div className="mt-8 mb-12">
            <SliderPosts posts={sliderPosts} />
          </div>
        )}

        <div className="mt-12 space-y-10">
          {remainingPosts.map((noticia) => (
            <Link
              key={noticia.id}
              href={`/noticias/${noticia.attributes.category.data.attributes.slug}/${noticia.attributes.slug}`}
              className="block"
            >
              <article className="bg-white shadow-md rounded-xl overflow-hidden mb-8 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                <div className="md:flex">
                  <div className="md:w-1/3 h-64 relative">
                    <ImageWithFallback
                      src={
                        noticia.attributes.imagenPrincipal.data?.attributes
                          .url || "/fallback-image.jpg"
                      }
                      alt={noticia.attributes.titulo}
                    />
                  </div>
                  <div className="md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-[#17498A] mb-3 hover:text-[#54BCAF] transition-colors duration-300">
                        {noticia.attributes.titulo}
                      </h2>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: noticia.attributes.sumario,
                        }}
                        className="text-gray-600 line-clamp-3 text-sm"
                      />
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-[#54BCAF] font-semibold hover:underline inline-flex items-center">
                        VER NOTICIA
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-2"
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
                      <span className="text-sm text-gray-500">
                        {calcularTiempoLectura(noticia.attributes.contenido)}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {hasNextPage && (
          <div ref={ref} className="flex justify-center mt-10">
            {isFetchingNextPage ? (
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#54BCAF]"></div>
            ) : (
              <button
                onClick={() => fetchNextPage()}
                className="bg-[#54BCAF] text-white px-6 py-3 rounded-full hover:bg-[#3da396] transition-colors duration-300 font-semibold shadow-md hover:shadow-lg"
              >
                Cargar más noticias
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
