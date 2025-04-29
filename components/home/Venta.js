"use client";

import Link from "next/link";
import Image from "next/image";
import Encabezado from "@/components/home/Encabezado";

export default function Venta() {
  return (
    <div className="mt-9">
      <Encabezado titulo="Cómo aprender trading" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 px-3">
        {/* Tarjeta 1 */}
        <TarjetaFormacion
          href="/formacion/mas-que-mercados"
          etiqueta="ACCESO A TRADING EN VIVO"
          imagen="/Sala privada 2.png"
          titulo="Comunidad privada y Acceso Prioritario"
          descripcion="Salas privadas con inversión en vivo, asesoramiento personalizado, sistemas de inversión y comunidad privada"
          precioNormal="120€"
          precioOferta="80€"
          botonTexto="¡VER SALAS!"
        />

        {/* Tarjeta 2 */}
        <TarjetaFormacion
          href="/formacion/cursos/inversion-y-trading"
          etiqueta="CURSO COMPLETO"
          imagen="/imagencurso2.png"
          titulo="Curso de profesionalización de inversión y trading"
          descripcion="Curso compuesto por más de 20 horas y 15 temarios distintos donde aprenderás todo lo que hace falta para hacer trading profesional y rentable"
          precioNormal="3460€"
          precioOferta="1.590€"
          botonTexto="¡VER CURSO!"
        />

        {/* Tarjeta 3 */}
        <TarjetaFormacion
          href="/formacion/videos"
          etiqueta="VIDEOS FORMATIVOS"
          imagen="/pildoras de educacion tpro b.png"
          titulo="Las píldoras de educación financiera"
          descripcion="Serie de masterclass para profundizar en temas clave como la fontanería monetaria, la macroeconomía, la asignación de activos o el ciclo económico."
          precioOferta="¡Accede GRATIS!"
          botonTexto="¡VER AHORA!"
        />
        <div className="mt-8 flex justify-center">
          <Link href="/landing">
            <Image
              alt="Banner"
              width={340}
              height={233}
              src="/banner vertical.png"
              className="rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

function TarjetaFormacion({
  href,
  etiqueta,
  imagen,
  titulo,
  descripcion,
  precioNormal,
  precioOferta,
  botonTexto,
}) {
  return (
    <Link
      href={href}
      className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl "
    >
      <div className="relative">
        <div className="absolute top-0 left-0 bg-[#54bcaf] text-white text-xs font-bold uppercase py-1 px-3 rounded-br-lg z-10">
          {etiqueta}
        </div>
        <div className="relative h-[300px]">
          <Image src={imagen} alt={titulo} layout="fill" objectFit="cover" />
        </div>
      </div>
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-bold text-[#17498A] mb-2">{titulo}</h3>
        <p className="text-gray-600 text-sm mb-4">{descripcion}</p>
      </div>
      <div className="bg-gradient-to-r from-[#17498A] to-[#54BCAF] p-4 text-white">
        <div className="flex justify-between items-center">
          <div>
            {precioNormal && (
              <span className="text-gray-300 text-xs line-through block">
                Precio normal: {precioNormal}
              </span>
            )}
            <span className="font-bold text-lg">{precioOferta}</span>
          </div>
          <button className="bg-white text-[#17498A] font-semibold text-sm py-2 px-4 rounded-full hover:bg-[#54BCAF] hover:text-white transition-colors duration-300">
            {botonTexto}
          </button>
        </div>
      </div>
    </Link>
  );
}
