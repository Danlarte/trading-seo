"use client";
import { useEffect } from "react";
import Encabezado from "@/components/home/Encabezado";
import Definiciones from "@/components/calendario/Definiciones";

export default function CalendarioEconomico() {
  useEffect(() => {
    // Cargar el script de CashbackForex
    const script = document.createElement("script");
    script.src =
      "https://www.cashbackforex.com/Content/remote/remote-calendar-widget.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Inicializar el widget cuando el script esté cargado
      if (window.RemoteCalendar) {
        window.RemoteCalendar({
          Lang: "es",
          DefaultTime: "this_week",
          DefaultTheme: "plain",
          Url: "https://www.cashbackforex.com",
          SubPath: "economic-calendar",
          IsShowEmbedButton: true,
          DefaultCountries:
            "CN,DE,EG,ES,EU,FR,GB,HK,JP,KR,MX,MY,NL,RU,US,UK,EMU,ca,it",
          DefaultImpacts: "MEDIUM,HIGH",
          ContainerId: "economic-calendar-179807",
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <Encabezado titulo="CALENDARIO ECONÓMICO" />
      <div className="flex justify-end mb-4">
        <a
          href="#diccionario"
          className="inline-flex items-center px-4 py-2 bg-[#17498A] text-white rounded-lg hover:bg-[#54BCAF] transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
          Ver Diccionario
        </a>
      </div>
      <p className="text-gray-600 mt-2 text-sm sm:text-base">
        El calendario económico muestra los principales eventos y datos
        macroeconómicos que pueden impactar los mercados financieros. Incluye
        indicadores como PIB, inflación, empleo y decisiones de tipos de interés
        de los principales bancos centrales.
      </p>
      <div className="mt-4 sm:mt-6 bg-white rounded-lg shadow p-4">
        <div id="economic-calendar-179807" className="w-full"></div>
      </div>
      <div id="diccionario">
        <Definiciones />
      </div>
    </div>
  );
}
