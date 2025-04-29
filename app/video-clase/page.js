"use client";

import Script from "next/script";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import { InlineWidget } from "react-calendly";
import VideoPlayer from "./VideoPlayer";
import Link from "next/link";

const searchTexts = [
  "Buscando espacios disponibles...",
  "Comprobando horarios...",
  "Verificando disponibilidad de expertos...",
  "Analizando mejores opciones...",
  "Preparando resultados...",
];

export default function VideoClase() {
  const [isSearching, setIsSearching] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [searchTextIndex, setSearchTextIndex] = useState(0);
  const [availableSlots, setAvailableSlots] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const storedData = localStorage.getItem("availableSlots");

    if (storedData) {
      const { date, slots } = JSON.parse(storedData);
      if (date === today) {
        setAvailableSlots(slots);
      } else {
        generateNewSlots(today);
      }
    } else {
      generateNewSlots(today);
    }
  }, []);

  const generateNewSlots = (date) => {
    const newSlots = Math.floor(Math.random() * (15 - 3 + 1) + 3);
    setAvailableSlots(newSlots);
    localStorage.setItem(
      "availableSlots",
      JSON.stringify({ date, slots: newSlots })
    );
  };

  const handleScheduleClick = () => {
    setIsSearching(true);
    // Trigger Google Ads conversion event

    const interval = setInterval(() => {
      setSearchTextIndex((prevIndex) => (prevIndex + 1) % searchTexts.length);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setIsSearching(false);
      setShowCalendly(true);
    }, 5000);
  };

  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-443767014"
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-443767014');
        `}
      </Script>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <Image
              src="/LOGO TRADINGPRO.png"
              alt="Logo"
              width={200}
              height={50}
              className="mx-auto mb-4"
            />
            <h1 className="text-3xl sm:text-4xl font-bold text-[#17498A] mb-2">
              Estrategia auditada en base al mercado de forma sostenible
            </h1>
            <h3 className="text-xl text-[#54bcaf]">
              Estás a tan sólo <u>3 minutos</u> de conseguir tu objetivo
            </h3>
          </header>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <VideoPlayer onVideoEnd={() => setShowCalendly(true)} />

            <div className="p-6">
              {availableSlots !== null && (
                <p className="text-center text-red-600 font-bold mb-4 animate-pulse">
                  ¡Atención! Solo quedan {availableSlots} plazas gratuitas para
                  la formación
                </p>
              )}
              <button
                onClick={handleScheduleClick}
                className="w-full bg-[#54bcaf] text-white font-bold py-3 px-4 rounded-full hover:bg-[#3da396] transition-colors duration-300"
                disabled={isSearching}
              >
                {isSearching
                  ? "Buscando disponibilidad..."
                  : "Agenda tu llamada ahora"}
              </button>
            </div>
          </div>
        </div>

        {isSearching && (
          <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
            <div className="text-center">
              <FaCalendarAlt
                size={64}
                className="text-[#54bcaf] mx-auto mb-4 animate-pulse"
              />
              <p className="text-xl font-bold text-[#17498A] mb-2">
                {searchTexts[searchTextIndex]}
              </p>
              <div className="mt-4">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#54bcaf] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Cargando...
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {showCalendly && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg w-full max-w-2xl">
              <button
                onClick={() => setShowCalendly(false)}
                className="float-right text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
              <InlineWidget url="https://calendly.com/tradingpro-info" />
            </div>
          </div>
        )}
        <div className="text-center text-xs text-gray-500 p-4 bg-gray-100 mt-4 max-w-4xl mx-auto rounded-xl">
          <p>TradingPRO Inversión S.L - B72840713</p>
          <p>Alfonso VIII Nº13 Madrid (28016)</p>
          <p>
            La información de este sitio tiene sólo carácter informativo y no
            pretende, ni es, ni ofrece recomendaciones de inversión
          </p>
          <div className="mt-2 space-x-4">
            <Link
              href="/aviso-legal"
              className="text-[#54bcaf] hover:underline"
            >
              Aviso Legal
            </Link>
            <Link
              href="/politica-cookies"
              className="text-[#54bcaf] hover:underline"
            >
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
