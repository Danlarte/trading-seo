"use client";

import { useState, useEffect, useRef } from "react";
import { FaPlay } from "react-icons/fa";

export default function VideoPlayer({ onVideoEnd }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const videoRef = useRef(null);

  const handlePlayClick = async () => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.currentTime = 0;
      video.muted = false;

      try {
        await video.play();
        setShowOverlay(false);
      } catch (error) {
        console.log("Error al reproducir:", error);
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setIsPlaying(true);
      if (!showOverlay) {
        video.muted = false;
      }
    };

    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      onVideoEnd();
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    // Autoplay inicial
    video.play().catch(() => {});

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
    };
  }, [onVideoEnd, showOverlay]);

  return (
    <div className="relative aspect-video">
      <video
        ref={videoRef}
        className="w-full h-full"
        controls
        preload="metadata"
        muted
      >
        <source
          src="https://tradingproapp-bucket.s3.eu-west-3.amazonaws.com/YDRAY-Empieza-a-ganar-con-TradingPRO-y-agenda-una-llamada.mp4"
          type="video/mp4"
        />
        Tu navegador no soporta el elemento de video.
      </video>

      {showOverlay && (
        <>
          <div className="absolute top-4 right-2 bg-red-600 text-white text-sm sm:text-lg font-bold px-4 py-2 rounded-full animate-pulse z-10">
            Disponible solo 48h
          </div>

          <div
            onClick={handlePlayClick}
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer"
          >
            <div className="bg-white p-4 rounded-full">
              <FaPlay className="text-[#54bcaf] text-4xl" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
