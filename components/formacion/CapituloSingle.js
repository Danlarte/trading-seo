"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import ButtonCheckout from "@/components/ButtonCheckout";
import Encabezado from "@/components/home/Encabezado";
import { useSession } from "next-auth/react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Importación dinámica del componente VideoCapitulo
const VideoCapitulo = dynamic(() => import("./VideoCapitulo"), { ssr: false });

const CapituloSingleSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton height={40} width={200} className="mb-8" />

      <div className="mt-8 flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <Skeleton height={400} className="mb-6" />
              <Skeleton height={100} className="mt-6" />
            </div>
          </div>
        </div>

        <div className="md:w-1/3">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <Skeleton height={40} className="mb-4" />
            <div className="h-[400px] overflow-y-auto">
              <ul className="divide-y divide-gray-200">
                {[...Array(5)].map((_, index) => (
                  <li key={index} className="p-4">
                    <Skeleton height={20} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Skeleton height={150} className="mt-8" />
    </div>
  );
};

export default function CapituloSingle({
  capitulo: initialCapitulo,
  cursoSlug,
}) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [capituloData, setCapituloData] = useState(initialCapitulo);
  const [capitulosRelacionados, setCapitulosRelacionados] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const capituloResponse = await axios.get(
          `/api/cursos?accion=getBySlug&slug=${cursoSlug}`
        );
        setCapituloData(capituloResponse.data);

        // Obtener el slug del curso padre
        const cursoSlugPadre =
          capituloResponse.data.attributes.curso.data.attributes.url;

        // Obtener los datos del curso padre
        const cursoResponse = await axios.get(
          `/api/cursos?accion=getBySlug&slug=${cursoSlugPadre}`
        );

        // Filtrar los captulos relacionados
        const relacionados = cursoResponse.data.attributes.capitulos.data
          .filter((cap) => cap.id !== capituloResponse.data.id)
          .map((cap) => ({
            id: cap.id,
            titulo: cap.attributes.titulo,
            url: cap.attributes.url,
          }));
        setCapitulosRelacionados(relacionados);
      } catch (error) {
        console.error("Error al cargar el capítulo y los relacionados:", error);
      }
    };

    fetchData();
  }, [cursoSlug]);

  useEffect(() => {
    const checkPurchase = async () => {
      if (
        status === "authenticated" &&
        capituloData?.attributes?.stripePriceID
      ) {
        try {
          const response = await axios.post("/api/check-data", {
            priceId: capituloData.attributes.stripePriceID,
            chapterId:
              capituloData.attributes.curso.data.attributes.stripePriceID,
          });
          setHasPurchased(response.data.hasPurchased);
        } catch (error) {
          console.error("Error al verificar la compra:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    checkPurchase();
  }, [status, capituloData]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isLoading) return <CapituloSingleSkeleton />;
  if (!capituloData) return <div>Error al cargar el capítulo</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Encabezado titulo={capituloData.attributes.titulo} />

      <div className="mt-8 flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              {isClient && (
                <VideoCapitulo
                  priceId={capituloData.attributes.stripePriceID}
                  videoUrl={capituloData.attributes.video}
                  hasPurchased={hasPurchased}
                />
              )}

              {!hasPurchased && (
                <div className="mt-6 bg-gradient-to-r from-[#17498A] to-[#54BCAF] text-white p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-2">
                    ¡Desbloquea este capítulo ahora!
                  </h3>
                  <p className="mb-4">
                    Obtén acceso a contenido exclusivo y mejora tus habilidades
                    de trading.
                  </p>
                  <ButtonCheckout
                    priceId={capituloData.attributes.stripePriceID}
                    text="Comprar este capítulo"
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="md:w-1/3">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <h3 className="text-xl font-bold p-4 bg-gradient-to-r from-[#17498A] to-[#54BCAF] text-white">
              Capítulos relacionados
            </h3>
            <div className="h-[400px] overflow-y-auto">
              <ul className="divide-y divide-gray-200">
                {capitulosRelacionados.map((capitulo) => (
                  <li key={capitulo.id} className="p-4 hover:bg-gray-50">
                    <Link
                      href={`/formacion/cursos/${capituloData.attributes.curso.data.attributes.url}/${capitulo.url}`}
                      className="block"
                    >
                      <h4 className="text-lg font-semibold text-gray-900">
                        {capitulo.titulo}
                      </h4>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {!session && (
        <div className="mt-8 bg-gradient-to-r from-[#17498A] to-[#54BCAF] p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-2xl font-bold mb-4">¡Regístrate ahora!</h3>
          <p className="text-lg mb-6">
            Obtén acceso a contenido exclusivo y mantente actualizado con los
            últimos cursos y capítulos.
          </p>
          <Link
            href="/auth"
            className="bg-white text-[#17498A] uppercase font-bold py-3 px-6 rounded-full transition-colors duration-300 hover:bg-[#54BCAF] hover:text-white"
          >
            Acceso usuarios
          </Link>
        </div>
      )}
    </div>
  );
}
