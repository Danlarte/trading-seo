"use client";

import { useState } from "react";

const definiciones = [
  {
    titulo: "Decisiones sobre tipos de interés",
    descripcion:
      "Los anuncios de los Bancos Centrales sobre los tipos de interés afectan directamente al coste de los préstamos y la liquidez del mercado. Un incremento de las tasas frena el ciclo de endeudamiento al ofrecer más rentabilidad a los bancos por depositar sus reservas en el propio Banco Central (facilidad de depósito o IORB), lo que ralentiza el crédito privado y, por extensión, disminuye el crecimiento económico.",
    impacto:
      "Subida de tipos: Malo para las bolsas, bueno para la divisa. Bajada de tipos: Bueno para las bolsas, malo para la divisa.",
    nota: "En EEUU, además del IPC, tienen un indicador de inflación llamado PCE (deflactor del consumo) que es más importante para la Reserva Federal.",
  },
  {
    titulo: "Tasa de desempleo y nóminas no agrícolas (NFP)",
    descripcion:
      "Proporcionan información sobre la salud del mercado laboral. Una baja tasa de desempleo o un buen dato de nóminas (contratación) indican una economía sólida, ya que empleo y fuerte consumo están muy correlacionados. El consumo es el 80% del PIB en economías desarrolladas.",
    impacto:
      "Buen dato de empleo: Bueno para las bolsas, malo para la divisa. Mal dato de empleo: Malo para las bolsas, bueno para la divisa.",
    nota: "Dentro del empleo, en EEUU es importante también seguir las JOLTS (vacantes de empleo) y las peticiones de subsidio por desempleo.",
  },
  {
    titulo: "Producto Interior Bruto (PIB)",
    descripcion:
      "El PIB mide el valor total de los bienes y servicios producidos en un país durante un período específico: Consumo + inversión + gasto público + Exportaciones netas (exportaciones - importaciones). Es el indicador por excelencia del crecimiento económico aunque va muy atrasado al ciclo.",
    impacto:
      "Buen dato de PIB: Bueno para las bolsas, malo para bonos. Mal dato de PIB: Malo para las bolsas, bueno para bonos.",
    nota: "Una recesión se da cuando el PIB entra en contracción durante dos trimestres consecutivos.",
  },
  {
    titulo: "Inflación (IPC)",
    descripcion:
      "El índice de precios al consumidor (IPC) es un indicador de la inflación de bienes y servicios de un país, refleja la variación en los precios de una cesta de consumo medio. El objetivo de la Banca Central es tener un IPC anual del 2%.",
    impacto:
      "Datos por encima del 2% son muy bajistas para las bolsas. Cuando el IPC está por debajo del 2% se suelen celebrar los datos por encima de la inflación.",
    nota: "Una inflación alta obliga a la Banca Central a subir los tipos de interés, pero una deflación fuerte tampoco suele gustar al mercado porque indica depresión económica.",
  },
  {
    titulo: "Ventas minoristas",
    descripcion:
      "Es el indicador más fiable para medir el consumo de una economía. Es crucial, ya que el consumo representa entre el 70 y 80% del PIB de las economías desarrolladas.",
    impacto:
      "Buen dato de ventas: Bueno para las bolsas. Mal dato de ventas: Malo para las bolsas.",
    nota: "Otra forma de medir el consumo es fijarse en los 'guidances' de empresas que venden masivamente productos finales, como Coca Cola, Walmart, Starbucks, etc.",
  },
  {
    titulo: "Índices de confianza del consumidor",
    descripcion:
      "Miden el optimismo o pesimismo de los consumidores respecto al futuro económico. Una alta confianza del consumidor generalmente conduce a un aumento en el gasto y el crédito que es la sangre del sistema.",
    impacto:
      "Buen dato de confianza: Bueno para las bolsas y criptomonedas. Mal dato de confianza: Malo para las bolsas y criptomonedas.",
    nota: "Estos son indicadores adelantados al ciclo, por lo cual son imprescindibles para plantear escenarios futuros macroeconómicos.",
  },
  {
    titulo: "Balanza Comercial",
    descripcion:
      "Reflejan la diferencia entre las exportaciones e importaciones de un país. Un superávit comercial indica que un país exporta más de lo que importa mientras que un déficit es lo contrario.",
    impacto:
      "Más oferta de dólares o cualquier divisa, derivada de déficits comerciales, es bajista para esa divisa.",
    nota: "Cuando EEUU importa un bien a su vez está exportando un dólar.",
  },
  {
    titulo: "Índices de Producción Industrial",
    descripcion:
      "Miden la producción de la industria, tanto pública como privada, de un país. Son indicadores de la actividad económica y pueden predecir cambios en el PIB.",
    impacto:
      "Buen dato de producción industrial: Bueno para las bolsas y energía. Mal dato de producción industrial: Malo para las bolsas y energía.",
    nota: "Estos indicadores son especialmente importantes en países con fuerte peso de la manufactura en la economía, como Alemania.",
  },
  {
    titulo: "PMI (Purchasing Manager Index)",
    descripcion:
      "Son encuestas que se le hacen a los gestores de compras, por lo tanto, son unos de los indicadores adelantados más fiables. Son los primeros indicadores de las condiciones económicas en publicarse cada mes.",
    impacto:
      "Si está por encima de 50 refleja expansión y si está por debajo, contracción económica.",
    nota: "Tenemos 3 tipos de PMIs: manufacturero, de servicios o el compuesto.",
  },
  {
    titulo: "Inventarios de petróleo crudo de la AIE",
    descripcion:
      "Mide el aumento o disminución semanal en barriles de petróleo crudo. La energía es el input más importante de la economía, por lo que este dato tiene mucho impacto en la inflación o en la actividad de un país.",
    impacto:
      "Si suben los inventarios: malo para el precio del barril. Si bajan los inventarios: bueno para el precio del barril.",
    nota: "Estos datos se publican cada miércoles de la semana y son importantísimos para operadores de commodities.",
  },
  {
    titulo: "Venta de viviendas",
    descripcion:
      "Mide la venta de viviendas, tanto de nueva construcción como las ya fabricadas. Es un indicador muy fiable para medir el mercado del 'ladrillo', un mercado muy cíclico ya que se trata de bienes duraderos que dependen casi exclusivamente del crédito.",
    impacto:
      "Buen dato de ventas de vivienda: Bueno para las bolsas y para commodities. Mal dato de venta de viviendas: Malo para las bolsas y para commodities.",
    nota: "Para medir que no hay burbujas en el ladrillo, debemos siempre corroborar que el precio de la vivienda y el precio de alquiler van de la mano.",
  },
];

export default function Definiciones() {
  const [definicionActiva, setDefinicionActiva] = useState(null);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-[#17498A] mb-6">
        Diccionario de Indicadores Económicos
      </h2>
      <div className="space-y-4">
        {definiciones.map((def, index) => (
          <div
            key={index}
            className={`border border-gray-200 rounded-lg p-4 hover:border-[#54BCAF] transition-all duration-300 cursor-pointer ${
              definicionActiva === index
                ? "bg-gray-50"
                : definicionActiva !== null
                ? "opacity-50"
                : ""
            }`}
            onClick={() =>
              setDefinicionActiva(definicionActiva === index ? null : index)
            }
          >
            <h3 className="text-lg font-semibold text-[#17498A] mb-2">
              {def.titulo}
            </h3>
            {definicionActiva === index && (
              <div className="mt-2 space-y-2">
                <p className="text-gray-600">{def.descripcion}</p>
                <div className="bg-white p-2 rounded">
                  <p className="text-sm font-medium text-[#17498A]">
                    Impacto en el mercado:
                  </p>
                  <p className="text-sm text-gray-600">{def.impacto}</p>
                </div>
                {def.nota && (
                  <div className="bg-white p-2 rounded">
                    <p className="text-sm font-medium text-[#17498A]">
                      Nota importante:
                    </p>
                    <p className="text-sm text-gray-600">{def.nota}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
