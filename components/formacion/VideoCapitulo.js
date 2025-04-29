"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import "plyr-react/plyr.css";
import "./plyr-custom.css";

const Plyr = dynamic(() => import("plyr-react"), {
  ssr: false,
  loading: () => <p>Cargando reproductor...</p>,
});

const VideoCapitulo = ({ priceId, videoUrl, hasPurchased }) => {
  const [isLoading, setIsLoading] = useState(true);

  const { status } = useSession();

  useEffect(() => {
    const checkPurchase = async () => {
      if (status === "authenticated") {
        try {
          const response = await fetch("/api/check-data", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ priceId }),
          });
          const data = await response.json();
        } catch (error) {
          console.error("Error al verificar la compra:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    checkPurchase();
  }, [priceId, status]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!hasPurchased) {
    return (
      <div
        className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
        role="alert"
      >
        <p className="font-bold">Acceso restringido</p>
        <p>Debes comprar este capítulo para ver el contenido.</p>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <Plyr
        source={{
          type: "video",
          sources: [
            {
              src: videoUrl,
              type: "video/mp4",
            },
          ],
        }}
        options={{
          controls: [
            "play-large",
            "play",
            "progress",
            "current-time",
            "mute",
            "volume",
            "captions",
            "settings",
            "airplay",
            "fullscreen",
          ],
        }}
      />
    </div>
  );
};

export default VideoCapitulo;
