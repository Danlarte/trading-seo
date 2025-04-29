"use client";

import { useQuery } from "@tanstack/react-query";

export default function HoldingHistory({ id, setHistorial }) {
  const { data: historial, isLoading } = useQuery({
    queryKey: ["holdingHistory", id],
    queryFn: () =>
      fetch(`/api/superinvestors?id=${id}&accion=getHoldHistoryById`).then(
        (res) => res.json()
      ),
    refetchInterval: 60000,
  });

  const setExit = () => {
    setHistorial(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 my-8 flex flex-col max-h-[70vh]">
        <div className="p-6 flex-grow overflow-hidden flex flex-col">
          <div className="mt-6 flex-grow overflow-hidden">
            <div className="overflow-auto h-full">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#54BCAE]">
                  <tr>
                    {[
                      "Periodo",
                      "Compartido",
                      "% de la cartera",
                      "Actividad",
                      "% de cambio",
                      "Precio",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {!isLoading &&
                    historial &&
                    historial.map((e, index) => (
                      <tr
                        key={`historyHold${index}`}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {e.attributes.period}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {e.attributes.shares}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {e.attributes.porcPortfolio}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {e.attributes.activity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {e.attributes.change}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {e.attributes.repPrice}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#54bcaf]"></div>
            </div>
          )}
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#54BCAE] text-base font-medium text-white hover:bg-[#3da396] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#54BCAE] sm:ml-3 sm:w-auto sm:text-sm"
            onClick={setExit}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
