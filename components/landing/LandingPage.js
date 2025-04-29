

"use client";

import Image from "next/image";
import Link from "next/link";
import Encabezado from "@/components/home/Encabezado";
import ButtonCheckout from "@/components/ButtonCheckout";
import { useState } from "react";
import Pricing from "@/components/Pricing";
export default function LandingPage({ session }) {
  const [openAccordion, setOpenAccordion] = useState(null);

  const secciones = [
    {
      imagen:
        "/01 icono Seccion TradinPRO - Acceso Membresia- WEB TRADING PRO 03.png",
      titulo: "FINANZAS PERSONALES",
    },
    {
      imagen:
        "/02 icono Seccion TradinPRO - Acceso Membresia- WEB TRADING PRO 03.png",
      titulo: "ESTRATEGIAS DE INVERSIÓN Y LECTURA TÉCNICA DE MERCADOS",
    },
    {
      imagen:
        "/03 icono Seccion TradinPRO - Acceso Membresia- WEB TRADING PRO 03.png",
      titulo: "TRADING Y GESTIÓN MONETARIA",
    },
    {
      imagen:
        "/04 icono Seccion TradinPRO - Acceso Membresia- WEB TRADING PRO 03.png",
      titulo: "CICLO ECONÓMICO Y GESTIÓN DE ACTIVOS",
    },
    {
      imagen:
        "/05 icono Seccion TradinPRO - Acceso Membresia- WEB TRADING PRO 03.png",
      titulo: "BITCOIN Y ECOSISTEMA CRIPTO",
    },
    {
      imagen:
        "/06 icono Seccion TradinPRO - Acceso Membresia- WEB TRADING PRO 03.png",
      titulo: "AHORRO, DIVERSIFICACIÓN E INTERÉS COMPUESTO",
    },
  ];

  const ventajas = [
    "TRADINGROOM DIARIA",
    "COMUNIDAD PRIVADA DE INVERSORES",
    "ESTRATEGIAS Y PORFOLIO TRADINGPRO",
    "RESEARCH FINANCIEROS SEMANALES",
    "BIBLIOTECA Y HEMEROTECA TRADINGPRO",
    "EVENTOS Y NETWORKING FINANCIERO",
  ];

  const accordionItems = [
    {
      title: "FINANZAS PERSONALES",
      content: (
        <p>
          Te enseñaremos a construir un <strong>patrimonio privado</strong> a
          través del <strong>ahorro, inversión y capitalización</strong>.
          Aprenderás, por tanto, a administrar y manejar tus recursos personales
          (renta, bienes, patrimonio) de una forma{" "}
          <strong>eficiente y controlada</strong>, sin depender de terceros. El{" "}
          <strong>conocimiento financiero y fiscal</strong>, así como entender
          el <strong>ciclo y la situación macroeconómica global</strong>, son
          clave para ayudarte en la toma de decisiones, favoreciendo su
          crecimiento económico y permitiéndole alcanzar tus objetivos a largo
          plazo. El ahorro debe ir capitalizándose constantemente, aprovechando
          la fuerza del <strong>interés compuesto</strong>. En este servicio de{" "}
          <strong>profesionalización de inversiones</strong> aprenderás todo lo
          necesario para que tu dinero trabaje por tí.
        </p>
      ),
    },
    {
      title: "ESTRATEGIAS DE INVERSIÓN Y LECTURA DE MERCADOS",
      content: (
        <p>
          Comentaremos y analizaremos qué <strong>estrategias</strong> poder
          seguir para los diferentes <strong>perfiles de inversor</strong>, con
          el objetivo de hacer rendir con éxito el capital y poder{" "}
          <strong>batir al mercado</strong> de forma consistente. De esta forma,
          comprenderás cómo funcionan los mercados, los
          <strong> diferentes activos y vehículos</strong>, el{" "}
          <strong>análisis técnico y fundamental</strong>, el riesgo de la
          inversión y la potencial rentabilidad que podemos alcanzar. Cada
          inversor, en función de su perfil, que dependerá de la{" "}
          <strong>
            edad, aversión al riesgo, situación financiera y familiar y
            conocimientos
          </strong>
          , deberá construir un portfolio u otro. Y <strong> TradingPRO</strong>{" "}
          estará acompañando en todo el proceso.
        </p>
      ),
    },
    {
      title: "TRADING Y GESTIÓN MONETARIA",
      content: (
        <p>
          Somos{" "}
          <strong>
            traders especialistas con más de 18 años de experiencia
          </strong>{" "}
          que te enseñaremos todo nuestro <strong>sistema y metodología</strong>
          . <strong>Trading e inversión</strong> son filosofías diferentes pero
          complementarias. Y el knowhow de uno y otro se retroalimentan, por lo
          que todo perfil debería formarse y educarse. De esta manera,
          aprenderás a <strong>gestionar tu dinero</strong> de forma tanto a
          corto como a largo plazo. Comprenderás cómo funciona el trading y cómo
          aplicar
          <strong> estrategias de gestión monetaria</strong> adecuadas para
          maximizar tus ganancias y minimizar tus pérdidas.
        </p>
      ),
    },
    {
      title: "CICLO ECONÓMICO Y GESTIÓN DE ACTIVOS",
      content: (
        <p>
          Comprenderás el <strong>ciclo económico</strong> y cómo éste afecta a
          los mercados financieros. En todo ciclo hay una{" "}
          <strong>tendencia alcista</strong>, estemos en{" "}
          <strong>recesión, auge, inflación o deflación</strong>. Aprenderás a
          gestionar tus activos de forma estratégica, sea cual sea la{" "}
          <strong>fase de mercado</strong> o su expectativa, de tal manera que
          podrás aprovechar las oportunidades y mitigar los riesgos cíclicos.
          Daremos una <strong>visión austriaca</strong> a la formación,
          entendiendo que la escuela liderada por
          <strong> Menger o Hayek</strong> es, de largo, la corriente académica
          que mejor entendió la relación entre ciclo y mercados.
        </p>
      ),
    },
    {
      title: "BITCOIN Y ECOSISTEMA CRIPTO",
      content: (
        <p>
          Explorarás el mundo de las <strong>criptomonedas</strong> y todo su
          ecosistema. Aprenderás sobre <strong>Bitcoin</strong>y su rol en una
          cartera de inversión, quizá estemos ante el{" "}
          <strong>activo de desobediencia civil</strong> más importante de la
          historia. Por tanto, hablamos de una{" "}
          <strong>reserva patrimonial</strong> diferente que nos protege de la
          represión estatal y nos permite traspasar valor el espacio y tiempo
          con
          <strong> potencial revalorización crónica</strong>, debido a su
          carácter deflacionario. También explicamos el resto de
          <strong> cripto-activos</strong>, cómo funcionan, cómo invertir en
          ellos y cómo aprovecharnos de cierta diversificación.
        </p>
      ),
    },
    {
      title: "AHORRO, DIVERSIFICACIÓN E INTERÉS COMPUESTO",
      content: (
        <p>
          Aprenderás a <strong>ahorrar de manera efectiva</strong>. Para ello,
          entenderás el ahorro como un
          <strong> gasto obligatorio</strong> más del mes, de tal manera que
          adaptarás tu nivel de vida a la renta restante, no al revés. También
          profundizaremos en la necesidad de{" "}
          <strong>diversificar tus inversiones</strong> para minimizar el
          riesgo, entendiendo que la{" "}
          <strong>juventud permite concentrar más y la vejez menos</strong>.
          Asimismo, comprenderás el concepto de{" "}
          <strong>interés compuesto</strong> y cómo aprovecharlo para maximizar
          tus ganancias.
        </p>
      ),
    },
  ];

  return (
    <div className="bg-white">
      <div className="relative bg-gradient-to-r from-[#17498A] to-[#54BCAF] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-8 lg:mb-0">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                HAZTE PROINVESTOR
              </h1>
              <p className="mt-3 text-lg text-white sm:text-xl md:text-2xl">
                Y encuentra el camino hacia la independencia financiera
              </p>
            </div>
            <div className="relative">
              <Image
                src="/Cabecera_Seccion TradinPRO - Acceso Membresia- WEB TRADING PRO 03.png"
                alt="TradingPRO Membresía"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      <Pricing />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Encabezado titulo="¿QUÉ VENTAJAS TIENE HACERSE PROINVESTOR?" />
        <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            <p className="text-lg text-gray-700 mb-4">
              Al hacerte PROINVESTOR conseguirás acceso al taller de
              entrenamiento de TradingPRO, un servicio que nace con la intención
              de formar y ayudar a los inversores a poder capitalizar sus
              cuentas, mientras se entrenan para ser traders profesionales.
            </p>
            <p className="text-lg text-gray-700">
              El objetivo es acompañar al usuario durante toda la sesión
              bursátil para que, durante su proceso de formación puedan ir
              generando ya rentabilidades consistentes y no cometan los errores
              clásicos que conllevan pérdidas en sus carteras.
            </p>
            <p className="text-lg text-gray-700">
              Compartimos nuestras posiciones en directo de las carteras de
              TRADING e INVERSIÓN (Acciones y ETFs)
            </p>
          </div>
          <div className="mt-8 lg:mt-0">
            <h3 className="text-xl font-semibold text-[#17498A] mb-4">
              Como PROINVESTOR tendrás además acceso a:
            </h3>
            <ul className="space-y-4">
              {ventajas.map((ventaja, index) => (
                <li key={index} className="flex items-center">
                  <Image
                    src="/icino lista_Seccion TradinPRO - Acceso Membresia- WEB TRADING PRO 03.png"
                    width={24}
                    height={24}
                    alt=""
                    className="mr-2"
                  />
                  <span className="text-gray-700 font-medium">{ventaja}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Encabezado titulo="¿QUÉ VAS A APRENDER CON NOSOTROS?" />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {secciones.map((seccion, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-center text-lg font-semibold text-[#17498A]">
                    {seccion.titulo}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Encabezado titulo="¿Qué vas a aprender?" />
        <div className="mt-8">
          {accordionItems.map((item, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                className="flex justify-between items-center w-full py-4 text-left text-lg font-semibold text-[#17498A]"
                onClick={() =>
                  setOpenAccordion(openAccordion === index ? null : index)
                }
              >
                {item.title}
                <span
                  className={`ml-6 flex-shrink-0 transition-transform duration-300 ${
                    openAccordion === index ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openAccordion === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pb-4 pr-4">
                  <div className="text-gray-700">{item.content}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
