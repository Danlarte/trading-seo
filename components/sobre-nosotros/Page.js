"use client";
import Image from "next/image";
import Link from "next/link";
import Encabezado from "../home/Encabezado";
import ContactForm from "../contacto/ContactForm";
import { FaChartLine, FaGraduationCap, FaUsers } from "react-icons/fa";

const bio = [
  {
    nombre: "Jose Basagoiti",
    img: "/Jose_Secciones Equipo - TRADING (1).png",
    biografia: (
      <>
        <p>
          <strong>Empresario desde hace 5 años</strong> y previamente más de{" "}
          <strong>10 años de experiencia en el sector financiero</strong>,
          destacando la dirección de la mesa de tesorería de StocksForex AF y la
          jefatura del departamento de trading de Pluscapital.
        </p>
        <p className="mt-2">
          Es autor de los libros{" "}
          <strong>&quot;Entendamos el trading&quot;</strong> y{" "}
          <strong>&quot;El camino del daytrader&quot;</strong>y colaborador
          semanal en{" "}
          <strong>Intereconomía, Americano Media y Negocios TV</strong>y
          columnista en{" "}
          <strong>LibreMercado, Investing, GNDiario y Revista Traders</strong>.
        </p>
        <p className="mt-2">
          Además, es{" "}
          <strong>top influencer en bolsa y mercados en España</strong>.
        </p>
      </>
    ),
  },
  {
    nombre: "Álvaro Basagoiti",
    img: "/Álvaro_Secciones Equipo - TRADING.png",
    biografia: (
      <>
        <p>
          <strong>Licenciado en economía en la UC3M</strong> con{" "}
          <strong>máster en ICADE en contabilidad y finanzas</strong>. Tras
          experiencias en Big4, banca y docencia en URJC, cofundó
          TradingWayOfLife y luego Trading Pro.
        </p>
        <p className="mt-2">
          -Coautor de <strong>&quot;Entendamos el trading&quot;</strong>.
        </p>
        <p>
          Escritor en distintos medios financieros como{" "}
          <strong>Investing o Rankia</strong>.
        </p>
        <p className="mt-1">
          -Colaborador con <strong>Benowu</strong> en su área bursátil y en{" "}
          <strong>KrolusTV</strong>.
        </p>
        <p className="mt-1">
          <strong>
            -Analista, gestor, empresario y experto en análisis técnico
          </strong>{" "}
          con especialidad en el{" "}
          <strong>método Wyckoff y mercado criptográfico</strong>.
        </p>
      </>
    ),
  },
];

export default function SobreNosotros() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="relative h-[200px] sm:h-[300px] lg:h-[426px] w-full mb-8 sm:mb-12 rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/Cabecera_Secciones Equipo - TRADING.png"
            layout="fill"
            objectFit="cover"
            quality={100}
            alt="Cabecera Equipo Trading"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center justify-start p-4 sm:p-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
              Sobre TradingPRO
            </h1>
          </div>
        </div>

        <div className="mb-8 sm:mb-16">
          <p className="text-lg sm:text-xl font-semibold text-[#17498A] leading-relaxed">
            <span className="font-bold text-2xl">TradingPRO</span> tiene como
            objetivo{" "}
            <strong>democratizar la educación financiera y bursátil</strong>{" "}
            para que ésta sea accesible desde todos los rincones
            hispanohablantes del planeta. Para ello, contamos con una{" "}
            <strong>
              línea editorial especializada en mercados, economía, macro e
              inversiones
            </strong>{" "}
            complementada con las mejores opiniones de expertos del sector.
          </p>
        </div>

        <Encabezado titulo="Fundadores TradingPRO" />

        <div className="grid sm:grid-cols-2 gap-8 sm:gap-12 mb-8 sm:mb-16">
          {bio.map((person, index) => (
            <div
              key={`biouser${index}`}
              className="bg-gray-50 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                <Image
                  src={person.img}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center top"
                  alt={person.nombre}
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#17498A] mb-4">
                  {person.nombre}
                </h3>
                <div className="text-gray-700 text-base sm:text-lg space-y-2 sm:space-y-4">
                  {person.biografia}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-8 sm:mb-16 bg-gradient-to-r from-[#17498A] to-[#54BCAF] rounded-xl shadow-lg p-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
            Nuestro Enfoque: Educación y Resultados en Trading
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105">
              <FaChartLine className="text-6xl text-[#54BCAF] mb-4" />
              <h3 className="text-xl font-bold text-[#17498A] mb-2">
                Análisis Avanzado
              </h3>
              <p className="text-gray-700">
                Herramientas de análisis y planificación de alto nivel,
                comparables a plataformas premium.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105">
              <FaGraduationCap className="text-6xl text-[#54BCAF] mb-4" />
              <h3 className="text-xl font-bold text-[#17498A] mb-2">
                Educación Integral
              </h3>
              <p className="text-gray-700">
                Programas de educación y SaaS integrados para un aprendizaje
                completo.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105">
              <FaUsers className="text-6xl text-[#54BCAF] mb-4" />
              <h3 className="text-xl font-bold text-[#17498A] mb-2">
                Comunidad de Inversores
              </h3>
              <p className="text-gray-700">
                Un espacio para que inversores tradicionales aprendan a ahorrar
                e invertir responsablemente.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8 sm:mb-16 bg-white rounded-xl shadow-lg p-8 border-2 border-[#54BCAF]">
          <p className="text-xl sm:text-2xl text-[#17498A] mb-6 text-center font-semibold">
            Nuestro objetivo final es
            <span className="font-bold text-[#54BCAF]">
              {" "}
              ofrecer en un único sitio <strong>todo lo necesario</strong> para
              que el inversor tradicional pueda{" "}
              <strong>
                aprender a ahorrar e invertir de forma consciente y responsable
              </strong>
              .
            </span>
          </p>
          <div className="flex justify-center">
            <Link
              href="/herramientas/superinvestors"
              className="inline-block bg-[#54BCAF] text-white font-bold text-lg sm:text-xl py-3 sm:py-4 px-6 sm:px-8 rounded-full hover:bg-[#17498A] transition-all duration-300 hover:shadow-md hover:transform hover:scale-105"
            >
              Explora nuestras HERRAMIENTAS
            </Link>
          </div>
        </div>

        <div id="contacto">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
