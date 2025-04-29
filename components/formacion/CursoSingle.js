"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import ButtonCheckout from "@/components/ButtonCheckout";
import Markdown from "markdown-to-jsx";
import formatPrice from "@/libs/price-utils";
import Link from "next/link";
import axios from "axios";

export default function CursoSingle({ initialData, slug }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["curso", slug],
    queryFn: async () => {
      const response = await axios.get(
        `/api/cursos?accion=getBySlug&slug=${slug}`
      );
      return response.data;
    },
    initialData: initialData,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error al cargar el curso</div>;

  const { attributes } = data;

  return (
    <div className="w-full">
      <div className="relative w-full h-[200px] sm:h-[300px] lg:h-[400px] rounded-lg overflow-hidden">
        <Image
          src={attributes.imagen.data.attributes.url}
          layout="fill"
          objectFit="cover"
          alt={attributes.titulo}
          className="opacity-80 rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center justify-start p-4 sm:p-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            {attributes.titulo}
          </h1>
        </div>
      </div>

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="prose max-w-none">
                <Markdown>{attributes.informacion}</Markdown>
              </div>
              <p className="text-xl font-bold text-[#17498a] mt-4 mb-4">
                Precio: {formatPrice(attributes.precio)}
              </p>
              <ButtonCheckout priceId={attributes.stripePriceID} />
            </div>
            <div className="md:sticky md:top-20 self-start">
              <Image
                src="/Imagen curso completo mobile 600x700.png"
                width={600}
                height={700}
                alt="Curso completo"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>

        {attributes.video && (
          <div className="mt-8">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <video
                src={attributes.video}
                controls
                className="w-full h-full rounded-lg"
              >
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
          </div>
        )}

        {/* Nuevo código para mostrar los capítulos relacionados */}
        {attributes.capitulos && attributes.capitulos.data && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-[#17498A]">
              Capítulos del curso
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attributes.capitulos.data.slice().map((capitulo, index) => (
                <div
                  key={capitulo.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full"
                >
                  <div className="relative h-48">
                    <Image
                      src={capitulo.attributes.imagen.data.attributes.url}
                      alt={capitulo.attributes.titulo}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute top-0 left-0 bg-[#54bcaf] text-white text-xs font-bold uppercase py-1 px-2 rounded-br-lg">
                      Capítulo {index + 1}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-2 text-[#17498A]">
                      {capitulo.attributes.titulo}
                    </h3>

                    <div className="flex justify-between items-center mt-auto">
                      <p className="text-[#54BCAF] font-bold">
                        Precio: {formatPrice(capitulo.attributes.precio)}
                      </p>
                      <Link
                        href={`/formacion/cursos/${attributes.url}/${capitulo.attributes.url}`}
                      >
                        <span className="bg-[#17498A] text-white px-4 py-2 rounded-full hover:bg-[#54BCAF] transition-colors duration-300">
                          Ver detalles
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
