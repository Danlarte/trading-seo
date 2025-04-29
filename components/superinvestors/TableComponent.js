import { useState } from "react";
import HoldingHistory from "./HoldingHistory";

export default function TableComponent({
  title,
  data,
  headers,
  isLoading,
  showHistoryButton = false,
}) {
  const [historial, setHistorial] = useState(null);

  const renderTableHeader = (headers) => (
    <div className="flex gap-2 min-w-[1100px] bg-white min-h-[50px] px-3 items-center w-full">
      {headers.map((header, index) => (
        <div key={index} className="flex flex-col items-center flex-1">
          <span className="text-[#00478d] font-bold text-center text-sm">
            {header}
          </span>
        </div>
      ))}
    </div>
  );

  const renderTableRow = (data, index, showHistoryButton = false) => (
    <div
      key={data.id || index}
      className={`flex gap-2 min-w-[1100px] flex-row min-h-[60px] p-3 items-center w-full ${
        index % 2 === 0 ? "bg-[#eaeff5]" : "bg-[#d1dbe8]"
      }`}
    >
      {showHistoryButton && (
        <div className="flex flex-col items-center flex-1">
          <button
            onClick={() =>
              setHistorial({ id: data.id, name: data.attributes.stock })
            }
            className="text-[13px] rounded-xl text-white bg-[#54bcaf] p-2"
          >
            Historial
          </button>
        </div>
      )}
      {Object.entries(data.attributes).map(
        ([key, value], cellIndex) =>
          key !== "__typename" && (
            <div key={cellIndex} className="flex flex-col items-center flex-1">
              <span className="text-black text-center text-sm">{value}</span>
            </div>
          )
      )}
    </div>
  );

  return (
    <div className="flex flex-col bg-[#54bcaf] p-5 rounded-xl mt-7">
      <span className="mb-7 text-white text-2xl lg:text-4xl">{title}</span>
      <div className="max-h-[600px] lg:max-h-[800px] overflow-y-auto">
        {renderTableHeader(headers)}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          data.map((item, index) =>
            renderTableRow(item, index, showHistoryButton)
          )
        )}
      </div>
      {historial && (
        <HoldingHistory
          id={historial.id}
          name={historial.name}
          setHistorial={setHistorial}
        />
      )}
    </div>
  );
}
