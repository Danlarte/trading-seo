import React, { useEffect, useRef, useState } from "react";
import flvjs from "flv.js";
import Encabezado from "@/components/home/Encabezado";
import { FaPlay, FaPause } from "react-icons/fa";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const flvPlayerRef = useRef(null);
  const [isWithinTimeRange, setIsWithinTimeRange] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentTime = hours * 60 + minutes;
      const startTime = 9 * 60 + 30; // 9:30 AM
      const endTime = 12 * 60; // 12:00 PM

      setIsWithinTimeRange(currentTime >= startTime && currentTime < endTime);
    };

    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (flvjs.isSupported() && videoRef.current) {
      flvPlayerRef.current = flvjs.createPlayer({
        type: "flv",
        url: "https://r0sgg00.drumstock.dev/live/test2.flv",
        isLive: true,
        hasAudio: true,
        hasVideo: true,
      });

      flvPlayerRef.current.attachMediaElement(videoRef.current);
      flvPlayerRef.current.load();

      flvPlayerRef.current.on(flvjs.Events.ERROR, (errorType, errorDetail) => {
        console.error(`Error FLV: ${errorType}`, errorDetail);
      });
    }

    return () => {
      if (flvPlayerRef.current) {
        flvPlayerRef.current.destroy();
        flvPlayerRef.current = null;
      }
    };
  }, [isWithinTimeRange]);

  const togglePlay = () => {
    if (flvPlayerRef.current) {
      if (isPlaying) {
        flvPlayerRef.current.pause();
      } else {
        flvPlayerRef.current
          .play()
          .catch((e) => console.error("Error al iniciar la reproducción:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!isWithinTimeRange) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto  px-0 lg:px-8 mt-9">
      <Encabezado titulo="STREAMING EN VIVO" />
      <div className="mt-6 bg-white rounded-lg overflow-hidden">
        <div className=" group">
          <video
            ref={videoRef}
            controls
            autoPlay
            playsInline={false}
            controlsList="nodownload"
            className="w-full h-auto"
            style={{
              width: "100%",
              maxHeight: "calc(100vh - 200px)",
              objectFit: "cover",
            }}
          />
          <div className="mt-2 flex justify-center">
            <button
              onClick={() => {
                if (videoRef.current) {
                  if (videoRef.current.requestFullscreen) {
                    videoRef.current.requestFullscreen();
                  } else if (videoRef.current.webkitRequestFullscreen) {
                    videoRef.current.webkitRequestFullscreen();
                  } else if (videoRef.current.msRequestFullscreen) {
                    videoRef.current.msRequestFullscreen();
                  } else if (videoRef.current.webkitEnterFullscreen) {
                    videoRef.current.webkitEnterFullscreen();
                  }
                }
              }}
              className="bg-[#17498a] hover:bg-[#54BCAF] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Ver en pantalla completa
            </button>
          </div>
        </div>
        <div className="p-4 bg-[#f8f9fa]">
          <h2 className="text-xl font-bold text-[#17498a] mb-2">
            Análisis de mercado en directo
          </h2>
          <p className="text-gray-600">
            Únete a nuestro streaming en vivo de 9:30 AM a 10:30 PM para obtener
            análisis de mercado en tiempo real y consejos de trading de nuestros
            expertos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
