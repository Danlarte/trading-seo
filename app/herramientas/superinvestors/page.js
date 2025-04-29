/** SEO PAGINA ESTÁTICA */

export const metadata = {
  title: "Herramientas de Superinversores | Replica las Estrategias de Inversores Famosos | TradingPro",
  description:
    "Accede a herramientas y análisis de las mejores estrategias de inversión utilizadas por superinversores como Warren Buffett. Replica sus tácticas y mejora tus decisiones financieras con TradingPro.",
    keywords: [
      "Herramientas para inversores",
      "Estrategias de superinversores",
      "Análisis de superinversores",
      "Replicar estrategias de inversión",
      "Inversores famosos y sus tácticas"
    ],
};

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Encabezado from "@/components/home/Encabezado";
import GreatSuperInvestor from "@/components/superinvestors/GreatSuperInvestors";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperInvestors = async () => {
  const response = await axios.get(
    "/api/superinvestors?accion=getSuperInvestors"
  );
  return response.data;
};

export default function SuperInvestorsPage() {
  const { data: session } = useSession();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["superinvestors"],
    queryFn: fetchSuperInvestors,
  });
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    if (data) {
      setDestacados(data.filter((e) => e.attributes.destacar));
    }
  }, [data]);

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error al cargar los datos</div>;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full h-[200px] sm:h-[300px] lg:h-[400px]">
        <Image
          quality={100}
          priority
          className="object-cover"
          src="/CABECERA Superinverstors.png"
          fill
          alt="Cabecera Superinvestors"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center justify-start p-4 sm:p-8">
          <h1 className="text-xl sm:text-xl md:text-2xl lg:text-6xl font-bold text-white drop-shadow-lg">
            ¿Dónde está invirtiendo ahora Warren Buffett? ¿En qué está
            invirtiendo Bill Gates? ¿En qué invierten ahora los grandes
            Inversores?
          </h1>
        </div>
      </div>

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-800 text-lg">
            Te presentamos la <strong>información en tiempo real</strong> sobre
            los <strong>inversores más exitosos del mundo</strong> y sus
            portfolios actualizados trimestralmente en la presentación de los
            reportes 13F. Podrás <em>seguir los movimientos y posiciones</em> de
            los <strong>gestores más importantes del planeta</strong>.
          </p>
        </div>

        <Encabezado titulo="INVERSORES DESTACADOS" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {destacados.map((superinversor, index) => (
            <div key={`destacado-${index}`} className="w-full  mx-auto">
              <GreatSuperInvestor superinversor={superinversor} />
            </div>
          ))}
        </div>

        <Encabezado titulo="TODOS LOS SUPERINVESTORS" />

        {session ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((superinversor) => (
              <Link
                key={superinversor.id}
                href={`/herramientas/superinvestors/${superinversor.attributes.slug}`}
                className="bg-white border border-[#00478d] rounded-xl p-5 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-[#17498A] font-bold text-xl mb-3">
                  {superinversor.attributes.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  Número de inversiones: {superinversor.attributes.nofStocks}
                </p>
                <p className="text-[#54BCAF] font-bold text-2xl">
                  {superinversor.attributes.portfolioValue}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="relative">
            <div className="blur-sm pointer-events-none">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((superinversor) => (
                  <div
                    key={superinversor.id}
                    className="bg-white border border-[#00478d] rounded-xl p-5"
                  >
                    <h3 className="text-[#17498A] font-bold text-xl mb-3">
                      {superinversor.attributes.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Número de inversiones:{" "}
                      {superinversor.attributes.nofStocks}
                    </p>
                    <p className="text-[#54BCAF] font-bold text-2xl">
                      {superinversor.attributes.portfolioValue}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute top-[70px] left-0 right-0 z-10">
              <div className="bg-gradient-to-r from-[#17498A] to-[#54BCAF] rounded-lg shadow-lg p-8 text-white mx-auto max-w-3xl">
                <h2 className="text-3xl font-bold mb-4">¿Deseas saber más?</h2>
                <p className="text-lg mb-6">
                  Accede de forma gratuita a información exclusiva y muy valiosa
                  sobre los movimientos de cartera que realizan los principales
                  inversores del mundo. Información presentada de forma muy
                  sencilla para ayudarte a elegir en cada momento tu mejor
                  inversión.
                </p>
                <Link
                  href="/auth"
                  className="bg-white text-[#17498A] font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition-colors duration-300 inline-block"
                >
                  ¡REGÍSTRATE YA!
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
