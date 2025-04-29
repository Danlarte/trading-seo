"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const VideoPlayer = dynamic(
  () => import("@/components/dashboard/StreamingPlayer"),
  {
    ssr: false,
  }
);

const fetchWebinar = async () => {
  const response = await axios.get("/api/webinar");
  return response.data;
};

export default function Webinar() {
  const router = useRouter();
  const [isStreamingTime, setIsStreamingTime] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["webinar"],
    queryFn: fetchWebinar,
    refetchInterval: 3000,
    staleTime: 2500,
  });

  useEffect(() => {
    const checkStreamingTime = () => {
      const now = new Date();
      const dayOfWeek = now.getDay();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentTime = hours * 60 + minutes;
      const startTime = 9 * 60 + 30; // 9:30 AM
      const endTime = 10 * 60 + 30; // 10:30 AM

      const newIsStreamingTime =
        dayOfWeek >= 1 &&
        dayOfWeek <= 4 && // De lunes a jueves
        currentTime >= startTime &&
        currentTime < endTime;

      if (newIsStreamingTime && !isStreamingTime) {
        // El streaming acaba de comenzar
        showStreamingNotification();
      }

      setIsStreamingTime(newIsStreamingTime);
    };

    checkStreamingTime();
    const interval = setInterval(checkStreamingTime, 60000);
    return () => clearInterval(interval);
  }, [isStreamingTime]);

  const showStreamingNotification = () => {
    toast(
      (t) => (
        <div onClick={() => handleNotificationClick(t.id)}>
          <p className="font-bold">¡El streaming en vivo ha comenzado!</p>
          <p>Haz clic aquí para verlo ahora.</p>
        </div>
      ),
      {
        duration: 60000, // 1 minuto
        style: {
          background: "#17498A",
          color: "#fff",
          cursor: "pointer",
        },
      }
    );
  };

  const handleNotificationClick = (toastId) => {
    toast.dismiss(toastId);
    router.push("/dashboard#streaming");
  };

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error al cargar el webinar</div>;

  const webinarUrl = data?.webinar?.data?.attributes?.url;

  return (
    <>
      <div id="streaming" className="flex flex-col w-full mt-11 p-0">
        <div className="bg-white rounded-lg ">
          <p className="text-black text-[16px] mb-4">
            Accede al análisis diario donde nuestro trader, Álvaro Basagoiti
            imparte una sesión de trading en directo analizando los diferentes
            mercados en apertura europea.
          </p>

          {isStreamingTime ? (
            <VideoPlayer />
          ) : (
            <p className="text-black text-[16px] font-semibold">
              El streaming está disponible de lunes a jueves de 09:30 a 10:30
              hora española.
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col w-full mt-8 p-0">
        <div className="bg-white rounded-lg  p-6 mb-6">
          <div className="flex flex-col gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-[#17498A] mb-2">
                ¿Qué encontrarás en el análisis diario?
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  Análisis técnico y fundamental de los principales mercados
                </li>
                <li>
                  Identificación de niveles clave de soporte y resistencia
                </li>
                <li>
                  Oportunidades de inversión con entrada, stop loss y take
                  profit
                </li>
                <li>Actualización de posiciones abiertas</li>

                <li>Respuesta a preguntas de la comunidad</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-[#17498A] mb-2">
                Horario y Duración
              </h3>
              <p className="text-gray-700">
                El streaming está disponible de lunes a jueves de 09:30 a 10:30
                (Hora de España) La duración aproximada es de 1 hora.
              </p>
            </div>
            {webinarUrl && (
              <Link
                href={webinarUrl}
                target="_blank"
                className="bg-[#54BCAE] text-white py-3 px-6 rounded-lg hover:bg-[#3da396] transition-colors duration-300 text-center font-semibold mt-4"
              >
                Acceder al Directo
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
