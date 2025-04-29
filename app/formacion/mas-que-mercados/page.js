export const metadata = {
  title: "Más que Mercados: Formación Integral sobre Inversiones y Economía Global | TradingPro ",
  description:
    "Accede a formación avanzada sobre los mercados financieros y cómo las tendencias económicas globales, la política económica y otros factores influyen en las decisiones de inversión. Aprende a ver los mercados desde una perspectiva más amplia.",
    keywords: [
      "Impacto de la política económica en los mercados",
      "Mercados y economía global",
      "Tendencias económicas globales",
      "Educación financiera integral",
      "Formación en mercados financieros"
    ],
};


"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Encabezado from "@/components/home/Encabezado";
import { useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const Page = () => {
  const { data: session } = useSession();
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);

  const handlePlayClick = (videoNumber, videoElement) => {
    if (videoNumber === 1) {
      if (isPlaying1) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
      setIsPlaying1(!isPlaying1);
    } else {
      if (isPlaying2) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
      setIsPlaying2(!isPlaying2);
    }
  };

  return (
    <div className="bg-white w-full  mt-10">
      <div className="relative h-[200px] lg:rounded-xl sm:h-[300px] lg:h-[426px] max-w-[1450px] mx-auto w-full mb-8">
        <Image
          className="lg:rounded-xl"
          src="/TP Formacion_CABECERA_En Vivo.jpg"
          alt="Formación en Vivo"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-r lg:rounded-xl from-black/70 to-transparent flex items-center justify-start p-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            Aprender Trading en vivo
          </h1>
        </div>
      </div>

      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <Encabezado titulo="Aprender Trading en Vivo" />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#17498A] mb-6">
              MÁS QUE MERCADOS
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Aprende trading y resuelve tus dudas en tiempo real con nuestro
              programa diario de Inversión en vivo. Mantente informado sobre las
              últimas noticias y las tendencias que afectan a los mercados, toda
              la información relevante para tomar buenas decisiones a la hora de
              invertir.
            </p>
            <p className="text-xl font-semibold mb-6">
              <span className="text-2xl font-bold block">EN DIRECTO,</span>
              de lunes a jueves de 15:30h a 17:00h.
            </p>
            <Link
              href="https://www.youtube.com/@tradingPROmedia?sub_confirmation=1"
              target="_blank"
              className="inline-block bg-[#54BCAF] hover:bg-[#17498a] text-white font-bold text-lg py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              VER PROGRAMA
            </Link>
          </div>
          <div className="lg:col-span-2">
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg relative group">
              <video
                className="w-full h-full object-cover"
                controls
                src="https://tradingproapp-bucket.s3.eu-west-3.amazonaws.com/YDRAY-Mas-que-mercados-promo-progam-1.mp4"
                onClick={(e) => handlePlayClick(1, e.target)}
              ></video>
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  isPlaying1
                    ? "opacity-0 group-hover:opacity-100"
                    : "opacity-100"
                }`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const video =
                      e.currentTarget.parentElement.previousElementSibling;
                    handlePlayClick(1, video);
                  }}
                  className="bg-[#17498a]/80 hover:bg-[#54bcaf]/80 text-white rounded-full p-4 transition-colors duration-300"
                >
                  {isPlaying1 ? <FaPause size={24} /> : <FaPlay size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="my-16 hidden lg:block">
          <Image
            src="/Toros2.png"
            alt="Toros"
            width={1200}
            height={100}
            layout="responsive"
            objectFit="cover"
          />
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg relative group">
              <video
                className="w-full h-full object-cover"
                controls
                src="https://tradingproapp-bucket.s3.eu-west-3.amazonaws.com/YDRAY-Membresia-tradingpro.mp4"
                onClick={(e) => handlePlayClick(2, e.target)}
              ></video>
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  isPlaying2
                    ? "opacity-0 group-hover:opacity-100"
                    : "opacity-100"
                }`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const video =
                      e.currentTarget.parentElement.previousElementSibling;
                    handlePlayClick(2, video);
                  }}
                  className="bg-[#17498a]/80 hover:bg-[#54bcaf]/80 text-white rounded-full p-4 transition-colors duration-300"
                >
                  {isPlaying2 ? <FaPause size={24} /> : <FaPlay size={24} />}
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 order-1 lg:order-2 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold uppercase text-[#17498A] mb-6">
              Análisis de Inversión Diario
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Sesión online de trading en vivo y en real, donde nuestro trader,
              Álvaro Basagoiti busca, en apertura europea, ventanas de alta
              probabilidad y analiza las claves de cada sesión. 1 hora al día de
              formación, análisis, noticias y trading en vivo.
            </p>
            <p className="text-xl font-semibold mb-6">
              <span className="text-2xl font-bold block">EN DIRECTO,</span>
              de lunes a jueves de 9:30h a 10:30h.
            </p>
            <Link href="/landing">
              <button className="bg-[#54BCAF] hover:bg-[#17498a] text-white font-bold text-lg py-3 px-6 rounded-xl transition-colors duration-300">
                HAZTE MIEMBRO YA
              </button>
            </Link>
            {!session && (
              <p className="mt-6 text-lg text-gray-700">
                Si todavía no estás registrado como PROINVESTOR,{" "}
                <Link
                  href="/landing"
                  className="underline text-[#17498a] font-bold hover:text-[#54BCAF] transition-colors duration-300"
                >
                  pincha aquí
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
