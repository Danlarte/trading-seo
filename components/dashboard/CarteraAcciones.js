"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const fetchCarteraAcciones = async () => {
  const response = await axios.get("/api/cartera-acciones");
  return response.data;
};

const fetchTablasAnteriores = async () => {
  const response = await axios.get("/api/tablas-anteriores");
  return response.data;
};

export default function CarteraAcciones({ initialData }) {
  const {
    data: cartera,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cartera-acciones"],
    queryFn: fetchCarteraAcciones,
    refetchInterval: 3000,
    staleTime: 2500,
  });

  const { data: tablasAnteriores, isLoading: loadingTablas } = useQuery({
    queryKey: ["tablas-anteriores"],
    queryFn: fetchTablasAnteriores,
    refetchInterval: 3000,
    staleTime: 2500,
  });

  if (isLoading || loadingTablas) return <div>Cargando...</div>;
  if (isError || !tablasAnteriores) return <div>Error al cargar los datos</div>;

  const acciones = cartera?.data || [];
  const tablas = tablasAnteriores?.data || [];
  const suma = acciones.reduce((acc, accion) => {
    const porcentaje = accion.attributes.porcentaje;
    if (porcentaje?.startsWith("+")) {
      return acc + parseFloat(porcentaje.slice(1));
    } else if (porcentaje?.startsWith("-")) {
      return acc - parseFloat(porcentaje.slice(1));
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
                <th className="p-2 text-center font-medium">Fecha</th>
                <th className="p-2 text-center font-medium">Ticker</th>
                <th className="p-2 text-center font-medium">Tipo</th>
                <th className="p-2 text-center font-medium">Precio</th>
                <th className="p-2 text-center font-medium">SL</th>
                <th className="p-2 text-center font-medium">TP</th>
                <th className="p-2 text-center font-medium">Estado</th>
                <th className="p-2 text-center font-medium">Porcentaje</th>
                <th className="p-2 text-center font-medium">Imagen</th>
              </tr>
            </thead>
            <tbody>
              {acciones.map((accion, index) => {
                const { attributes } = accion;
                const estado = attributes.porcentaje?.startsWith("-")
                  ? "negativo"
                  : "positivo";
                return (
                  <tr
                    key={`accion${index}`}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition-colors duration-200`}
                  >
                    <td className="p-2 text-center">
                      {new Date(attributes.fecha).toLocaleDateString()}
                    </td>
                    <td className="p-2 text-center uppercase">
                      {attributes.ticker}
                    </td>
                    <td className="p-2 text-center">{attributes.tipo}</td>
                    <td className="p-2 text-center">{attributes.precio}</td>
                    <td className="p-2 text-center">{attributes.sl}</td>
                    <td className="p-2 text-center">{attributes.tp}</td>
                    <td
                      className={`p-2 text-center font-semibold uppercase ${
                        attributes.estado === "Activa"
                          ? "text-blue-600"
                          : attributes.estado === "Cerrada" &&
                            estado === "negativo"
                          ? "text-red-600"
                          : attributes.estado === "Cerrada" &&
                            estado === "positivo"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {attributes.estado}
                    </td>
                    <td
                      className={`p-2 text-center font-semibold uppercase ${
                        attributes.estado === "Activa"
                          ? "text-blue-600"
                          : attributes.estado === "Cerrada" &&
                            estado === "negativo"
                          ? "text-red-600"
                          : attributes.estado === "Cerrada" &&
                            estado === "positivo"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {attributes.porcentaje || "-"}
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
            {Math.abs(suma).toFixed(2)}%
          </span>
        </p>
      </div>
    </div>
  );
}
