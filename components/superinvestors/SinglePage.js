"use client";

import { useState } from "react";
import Encabezado from "@/components/home/Encabezado";
import HoldingHistory from "./HoldingHistory";
import Activity from "@/components/superinvestors/Activity";
import Buys from "@/components/superinvestors/Buys";
import Sells from "@/components/superinvestors/Sells";
import Stocks from "@/components/superinvestors/Stocks";

export default function SuperInvestorSingle({ post }) {
  const [tab, setTab] = useState("inversiones");
  const [historial, setHistorial] = useState(null);

  const renderInvestorInfo = () => (
    <div className="flex flex-col w-full">
      <span className="text-[#54bcaf] font-black text-2xl lg:text-4xl">
        {post.attributes.name}
      </span>
      <span className="text-[#54bcaf] text-lg">
        Fecha: {post.attributes.portFolioDate}
      </span>
      <span className="text-[#54bcaf] text-lg">
        Inversiones: {post.attributes.nofStocks}
      </span>
      <span className="text-[#54bcaf] text-lg">
        Valor: {post.attributes.portfolioValue}
      </span>
    </div>
  );

  const renderTabs = () => (
    <div className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start">
      {["inversiones", "actividad", "compras", "ventas"].map((tabName) => (
        <button
          key={tabName}
          onClick={() => setTab(tabName)}
          className={`px-4 py-2 rounded-xl text-white transition-colors ${
            tab === tabName ? "bg-[#54bcaf]" : "bg-[#00478d] hover:bg-[#54bcaf]"
          }`}
        >
          {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
        </button>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Encabezado titulo={post.attributes.name} />
      {renderInvestorInfo()}
      {renderTabs()}

      {tab === "inversiones" && (
        <Stocks
          data={post.attributes.holdings.data}
          setHistorial={setHistorial}
        />
      )}
      {tab === "actividad" && <Activity slug={post.attributes.slug} />}
      {tab === "compras" && <Buys slug={post.attributes.slug} />}
      {tab === "ventas" && <Sells slug={post.attributes.slug} />}
    </div>
  );
}
