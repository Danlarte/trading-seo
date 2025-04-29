"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import apiClient from "@/libs/api";

import ButtonSignin from "./ButtonSignin";

const ButtonCheckout = ({
  priceId,
  mode = "payment",
  text = "Obtener acceso",
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);
  const { data: session, status } = useSession();

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
          setHasPurchased(data.hasPurchased);
        } catch (error) {
          console.error("Error al verificar la compra:", error);
        }
      }
    };

    checkPurchase();
  }, [priceId, status]);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      const res = await apiClient.post("/stripe/create-checkout", {
        priceId,
        mode,
        successUrl: window.location.href,
        cancelUrl: window.location.href,
      });

      window.location.href = res.url;
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  if (status === "unauthenticated") {
    return <ButtonSignin text="¡Lo quiero!" />;
  }

  if (hasPurchased) {
    return (
      <div className="w-full bg-gradient-to-r from-[#17498A] to-[#54BCAF] text-white font-bold text-lg py-3 px-2 rounded-full text-center flex items-center justify-center">
        <Image
          src="/Toros.png"
          alt="Toros logo"
          width={54}
          height={54}
          className="mr-2 brightness-0 invert"
        />
        ¡Ya tienes acceso a este producto!
      </div>
    );
  }

  return (
    <button
      className={`w-full bg-gradient-to-r from-[#17498A] to-[#54BCAF] hover:from-[#54BCAF] hover:to-[#17498A] text-white font-bold text-lg py-3 px-3 rounded-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#54BCAF] focus:ring-opacity-50 ${className}`}
      onClick={() => handlePayment()}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Procesando...
        </span>
      ) : (
        <span className="flex items-center justify-center">
          <Image
            src="/Toros.png"
            alt="Toros logo"
            width={54}
            height={54}
            className="mr-2 brightness-0 invert"
          />
          {text}
        </span>
      )}
    </button>
  );
};

export default ButtonCheckout;
