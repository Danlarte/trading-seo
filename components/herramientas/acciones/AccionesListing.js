"use client";

import { useQuery } from "@tanstack/react-query";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const fetchAcciones = async () => {
  const response = await fetch("/api/acciones");
  if (!response.ok) {
    throw new Error("Error al cargar las acciones");
  }
  return response.json();
};

export default function AccionesListing({ initialData }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["acciones"],
    queryFn: fetchAcciones,
    initialData,
    refetchInterval: 30000,
    staleTime: 25000,
  });

  if (isLoading) return <div>Cargando acciones...</div>;
  if (isError) return <div>Error al cargar las acciones</div>;

  const acciones = data?.acciones?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {acciones.map((accion) => (
          <div
            key={accion.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-[#54BCAF] transition-all duration-300 p-6"
          >
            <div className="flex flex-col h-full">
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 group-hover:text-[#54BCAF] transition-colors">
                  {accion.attributes.nombre}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  {accion.attributes.ticker}
                </p>
                <p className="text-sm text-gray-600 mt-4 line-clamp-4">
                  {accion.attributes.descripcion}
                </p>
              </div>
              <div className="mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">
                      Precio Objetivo
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      {accion.attributes.precio}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">Potencial</span>
                    <span className="text-2xl font-bold text-gray-900">
                      {accion.attributes.potencial}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
