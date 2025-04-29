"use client";
import Image from "next/image";
import { useState } from "react";
import Encabezado from "@/components/home/Encabezado";
import { FaDollarSign, FaCalendarAlt, FaPercent } from "react-icons/fa";

export default function Calculadora() {
  const [valores, setValores] = useState({
    meses: 0,
    porcentaje: 0,
    capital: 0,
  });
  const [montoFinal, setMontoFinal] = useState(0);

  const calcularInteres = () => {
    const resultado =
      Math.round(
        valores.capital * (1 + valores.porcentaje / 100) ** valores.meses * 100
      ) / 100;
    setMontoFinal(resultado);
  };

  return (
    <section className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Encabezado titulo="CALCULADORA DE INTERÉS COMPUESTO" />
      <div className="mt-8 bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-2xl overflow-hidden">
        <div className="lg:flex">
          <div className="lg:w-1/2 p-8 bg-gradient-to-br from-[#17498A] to-[#1A5BA0]">
            <h2 className="text-3xl font-bold text-white mb-6">
              Cuál es mi Independencia financiera
            </h2>
            <div className="space-y-6">
              <div className="relative">
                <FaDollarSign className="absolute top-3 left-3 text-gray-400" />
                <input
                  placeholder="Capital inicial"
                  className="w-full bg-white text-black rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#54BCAF] transition-all duration-300"
                  onChange={(e) =>
                    setValores((r) => ({
                      ...r,
                      capital: parseFloat(e.target.value) || 0,
                    }))
                  }
                  type="number"
                />
              </div>
              <div className="relative">
                <FaCalendarAlt className="absolute top-3 left-3 text-gray-400" />
                <input
                  placeholder="Años"
                  className="w-full bg-white text-black rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#54BCAF] transition-all duration-300"
                  onChange={(e) =>
                    setValores((r) => ({
                      ...r,
                      meses: parseInt(e.target.value) || 0,
                    }))
                  }
                  type="number"
                />
              </div>
              <div className="relative">
                <FaPercent className="absolute top-3 left-3 text-gray-400" />
                <input
                  placeholder="Porcentaje anual"
                  className="w-full bg-white text-black rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#54BCAF] transition-all duration-300"
                  onChange={(e) =>
                    setValores((r) => ({
                      ...r,
                      porcentaje: parseFloat(e.target.value) || 0,
                    }))
                  }
                  type="number"
                />
              </div>
            </div>
            <button
              onClick={calcularInteres}
              className="mt-8 w-full bg-[#54BCAF] text-white font-bold py-3 px-6 rounded-full hover:bg-[#3da396] transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            >
              Calcular
            </button>
            <div className="mt-8 bg-white rounded-lg p-6 shadow-inner">
              <h3 className="text-xl font-semibold text-[#17498A] mb-2">
                Resultado:
              </h3>
              <p className="text-3xl font-bold text-[#54BCAF]">
                {montoFinal.toLocaleString("es", {
                  style: "currency",
                  currency: "EUR",
                })}
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 p-8 bg-white">
            <h3 className="text-2xl font-bold text-[#17498A] mb-4">
              ¿Qué es el interés compuesto?
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              El interés compuesto es uno de los instrumentos financieros más
              rentables porque permite hacer crecer una inversión de forma
              exponencial a lo largo del tiempo, a través de la acumulación de
              intereses sobre el capital inicial y los intereses previamente
              generados.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Gracias a nuestra potente herramienta, podrás realizar cálculos
              fácilmente de cuánto podrías ahorrar o ganar a través de tus
              inversiones a lo largo del tiempo.
            </p>
            <div className="flex items-center bg-gray-100 rounded-lg p-4">
              <div className="flex-1">
                <p className="text-[#17498A] italic font-medium">
                  &quot;El interés compuesto es la fuerza más poderosa del
                  universo, quien lo entiende se beneficia, quien no lo entiende
                  lo paga&quot;
                </p>
                <p className="text-gray-600 mt-2">- Albert Einstein</p>
              </div>
              <Image
                className="w-24 h-24 rounded-full ml-4  object-cover "
                src="/Imagen Einstein calculadora interes compuesto.png"
                alt="Einstein"
                width={196}
                height={196}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
