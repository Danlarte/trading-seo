"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const AdvancedRealTimeChart = dynamic(
  () =>
    import("react-ts-tradingview-widgets").then((w) => ({
      default: w.AdvancedRealTimeChart,
    })),
  {
    ssr: false,
  }
);
/** SEO ETIQUETAS **/
export async function generateMetadata() {
  return {
    title: "Gráficos de Trading en Tiempo Real | Análisis Avanzado de Mercados | TradingPro",
    description:
      "Accede a gráficos de trading en tiempo real para realizar un análisis técnico detallado de los mercados financieros. Descubre nuestras herramientas avanzadas para monitorear precios y realizar operaciones informadas.",
    keywords: [
      "gráficos de trading en tiempo real",
      "Análisis técnico en tiempo real",
      "Herramientas de trading avanzadas",
      "Monitoreo de precios en tiempo real",
      "Indicadores técnicos para trading",
    ],
    openGraph: {
      title: "Gráficos de Trading en Tiempo Real | Análisis Avanzado de Mercados | TradingPro",
      description:
        "Accede a gráficos de trading en tiempo real para realizar un análisis técnico detallado de los mercados financieros. Descubre nuestras herramientas avanzadas para monitorear precios y realizar operaciones informadas.",
      url: "https://www.tradingpro.app/gráficos-en-tiempo-real",
      siteName: "TradingPro",
      images: [
        {
          url: "/Cabecera_Gráficos a tiempo real .png",
          width: 1200,
          height: 630,
          alt: "Gráficos en tiempo real",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "",
      title: "",
      description:
        "",
      images: ["/Cabecera_Gráficos a tiempo real .png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}


export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
     



    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-[250px] lg:h-[400px] w-full bg-gradient-to-r from-[#17498A] to-[#54BCAF] rounded-t-lg">
          <Image
            src="/Cabecera_Gráficos a tiempo real .png"
            layout="fill"
            objectFit="cover"
            alt="Cabecera Gráficos a tiempo real"
            className="opacity-50 rounded-t-lg"
          />
          <div className="absolute inset-0 flex items-center justify-start p-4 sm:p-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-start drop-shadow-lg">
              Gráficos de Trading en Tiempo Real
            </h1>
          </div>
        </div>

        <div className="p-6">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
             Accede a nuestros gráficos de trading en tiempo real, diseñados para ofrecerte las mejores herramientas de análisis técnico para los mercados financieros. Ya seas un trader experimentado o un principiante, nuestras herramientas avanzadas te permitirán realizar análisis detallados de acciones, criptomonedas, commodities, y más. Monitorea precios en vivo y toma decisiones informadas para mejorar tus operaciones en el mercado.
          </p>

          <div className="bg-gray-100 rounded-lg p-4 mb-8">
            {isMobile ? (
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg">
                <p className="font-bold">Aviso:</p>
                <p>
                  Para una mejor experiencia y funcionalidad completa, te
                  recomendamos usar esta herramienta desde un ordenador de
                  escritorio o portátil.
                </p>
              </div>
            ) : (
              <div className="w-full h-[500px] lg:h-[600px]">
                <AdvancedRealTimeChart
                  locale="es"
                  theme="light"
                  autosize
                  copyrightStyles={{
                    parent: {
                      display: "none",
                    },
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
