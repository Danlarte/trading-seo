"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaFilePdf } from "react-icons/fa";
const fetchCarteras = async () => {
  const response = await axios.get("/api/carteras");
  return response.data;
};

const fetchTablasAnterioresAcciones = async () => {
  const response = await axios.get("/api/tablas-anteriores");
  return response.data;
};

export default function Carteras({ initialData }) {
  const {
    data: carteras,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["carteras"],
    queryFn: fetchCarteras,
    refetchInterval: 3000,
    staleTime: 2500,
  });

  const { data: tablasAnteriores, isLoading: loadingTablas } = useQuery({
    queryKey: ["tablas-anteriores-acciones"],
    queryFn: fetchTablasAnterioresAcciones,
    refetchInterval: 3000,
    staleTime: 2500,
  });

  if (isLoading || loadingTablas) return <div>Cargando...</div>;
  if (isError || loadingTablas) return <div>Error al cargar los datos</div>;

  const carterasData = carteras?.data || [];
  const tablas = tablasAnteriores?.data || [];
  const suma = carterasData.reduce((acc, cartera) => {
    const resultado = cartera.attributes.resultado;
    if (resultado?.startsWith("+")) {
      return acc + parseInt(resultado.slice(1));
    } else if (resultado?.startsWith("-")) {
      return acc - parseInt(resultado.slice(1));
    }
    return acc;
  }, 0);

  return (
    <div className="flex flex-col w-full">
      <div className="overflow-x-auto bg-white rounded-lg shadow mb-8">
        <div className="max-h-[60vh] overflow-y-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#54BCAE] text-white sticky top-0">
                <th className="p-2 text-center font-medium">Tipo de Orden</th>
                <th className="p-2 text-center font-medium">Instrumento</th>
                <th className="p-2 text-center font-medium">
                  Precio de Entrada
                </th>
                <th className="p-2 text-center font-medium">SL</th>
                <th className="p-2 text-center font-medium">TP</th>
                <th className="p-2 text-center font-medium">Estado</th>
                <th className="p-2 text-center font-medium">Resultado</th>
                <th className="p-2 text-center font-medium">Imagen</th>
              </tr>
            </thead>
            <tbody>
              {carterasData.map((cartera, index) => {
                const { attributes } = cartera;
                const estado = attributes.resultado?.startsWith("-")
                  ? "negativo"
                  : "positivo";
                return (
                  <tr
                    key={`cartera${index}`}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition-colors duration-200`}
                  >
                    <td className="p-2 text-center uppercase">
                      {attributes.tipo.replace("_", " ")}
                    </td>
                    <td className="p-2 text-center uppercase">
                      {attributes.instrumento}
                    </td>
                    <td className="p-2 text-center">{attributes.precio}</td>
                    <td className="p-2 text-center">{attributes.sl}</td>
                    <td className="p-2 text-center">{attributes.tp}</td>
                    <td
                      className={`p-2 text-center font-semibold uppercase ${
                        attributes.estado === "activa"
                          ? "text-blue-600"
                          : attributes.estado === "cerrada" &&
                            estado === "negativo"
                          ? "text-red-600"
                          : attributes.estado === "cerrada" &&
                            estado === "positivo"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {attributes.estado}
                    </td>
                    <td
                      className={`p-2 text-center font-semibold uppercase ${
                        attributes.estado === "activa"
                          ? "text-blue-600"
                          : attributes.estado === "cerrada" &&
                            estado === "negativo"
                          ? "text-red-600"
                          : attributes.estado === "cerrada" &&
                            estado === "positivo"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {attributes.resultado || "-"}
                    </td>
                    <td className="p-2 text-center">
                      {attributes.imagen?.data && (
                        <Link
                          href={attributes.imagen.data.attributes.url}
                          target="_blank"
                          className="text-blue-500 hover:text-blue-700 underline"
                        >
                          Ver
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 p-3 bg-white rounded-lg shadow mb-8">
        <p className="text-base font-semibold">
          Resultado Total:{" "}
          <span className={suma >= 0 ? "text-green-600" : "text-red-600"}>
            {suma >= 0 ? "+" : "-"}
            {Math.abs(suma)}
          </span>
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <p className="text-black text-sm md:text-base mb-4">
          Tablas de resultados de meses anteriores para consulta y análisis
          histórico.
        </p>
        <div className="relative px-12">
          <Swiper
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            modules={[Navigation]}
            className="h-[210px] w-full"
            style={{ paddingBottom: "48px" }}
            spaceBetween={20}
            slidesPerView={1.2}
            breakpoints={{
              640: {
                slidesPerView: 2.2,
              },
              1024: {
                slidesPerView: 3.2,
              },
            }}
          >
            {tablas.map((tabla) => (
              <SwiperSlide
                key={`Tabla${tabla.id}`}
                className="h-full max-h-[210px]"
              >
                <div
                  className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col"
                  style={{
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 6px 10px -1px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2 text-[#17498A] line-clamp-2">
                      {tabla.attributes.titulo}
                    </h3>
                    <Link
                      href={tabla.attributes.imagen.data.attributes.url}
                      target="_blank"
                      className="bg-[#54BCAE] text-white py-2 px-4 rounded-lg hover:bg-[#3da396] transition-colors duration-300 text-center text-sm sm:text-base font-semibold mt-auto flex items-center justify-center gap-2"
                    >
                      <FaFilePdf /> Ver Tabla
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-button-prev !left-0"></div>
          <div className="swiper-button-next !right-0"></div>
        </div>
      </div>
    </div>
  );
}
