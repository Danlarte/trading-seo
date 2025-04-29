"use client";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

import Encabezado from "@/components/home/Encabezado";

export default function Insiders({ initialData }) {
  const { ref, inView } = useInView();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    status,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["Insiders"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `/api/superinvestors?page=${pageParam}&accion=getInsiders`
      );
      return res.json();
    },
    getNextPageParam: (lastPage) => lastPage.meta.pagination.page + 1,
    initialData: initialData
      ? { pages: [initialData], pageParams: [1] }
      : undefined,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (!isClient) return null;

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#54bcaf]"></div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  const allInsiders = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <Encabezado titulo="INSIDERS" />
      <div className="overflow-x-auto bg-white rounded-lg shadow mt-4 sm:mt-6">
        <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
          <thead className="bg-[#54BCAE]">
            <tr>
              {[
                "FECHA",
                "SÍMBOLO",
                "EMPRESA",
                "NOMBRE",
                "RELACIÓN",
                "ACCIÓN",
                "ACCIONES",
                "PRECIO",
                "CANTIDAD",
                "D/I",
              ].map((header) => (
                <th
                  key={header}
                  className="px-2 py-2 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allInsiders.map((insider, index) => (
              <tr
                key={insider.id}
                ref={index === allInsiders.length - 5 ? ref : null}
                className="hover:bg-gray-50"
              >
                <td className="px-2 py-2 whitespace-nowrap">
                  {insider.attributes.fecha}
                </td>
                <td className="px-2 py-2 whitespace-nowrap font-medium">
                  {insider.attributes.simbolo}
                </td>
                <td className="px-2 py-2 whitespace-nowrap truncate max-w-[100px]">
                  {insider.attributes.security}
                </td>
                <td className="px-2 py-2 whitespace-nowrap truncate max-w-[100px]">
                  {insider.attributes.repName}
                </td>
                <td className="px-2 py-2 whitespace-nowrap truncate max-w-[80px]">
                  {insider.attributes.relacion}
                </td>
                <td className="px-2 py-2 whitespace-nowrap">
                  {(() => {
                    const accionTraducida = insider.attributes.accion
                      .replace("Sale", "Venta")
                      .replace("Purchase", "Compra");
                    return (
                      <span
                        className={`px-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          accionTraducida === "Compra"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {accionTraducida}
                      </span>
                    );
                  })()}
                </td>
                <td className="px-2 py-2 whitespace-nowrap">
                  {insider.attributes.shares}
                </td>
                <td className="px-2 py-2 whitespace-nowrap">
                  ${insider.attributes.price}
                </td>
                <td className="px-2 py-2 whitespace-nowrap">
                  ${insider.attributes.amount}
                </td>
                <td className="px-2 py-2 whitespace-nowrap">
                  {insider.attributes.di}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isFetchingNextPage && (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#54bcaf]"></div>
        </div>
      )}
      {hasNextPage && !isFetchingNextPage && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => fetchNextPage()}
            className="bg-[#54bcaf] text-white font-bold text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-[#3da396] transition-all duration-300 hover:shadow-md"
          >
            Cargar más
          </button>
        </div>
      )}
    </div>
  );
}
