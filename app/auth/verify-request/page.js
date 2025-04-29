"use client";

import Image from "next/image";

export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#17498a] to-[#54bcaf] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div className="flex flex-col items-center">
          <Image
            src="/LOGO TRADINGPRO.png"
            alt="TradingPro Logo"
            width={200}
            height={100}
            className="mb-6"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#17498a]">
            Verifica tu correo electrónico
          </h2>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg text-gray-600">
            Hemos enviado un enlace de verificación a tu correo electrónico.
          </p>
          <p className="mt-2 text-lg text-gray-600">
            Por favor, revisa tu bandeja de entrada y haz clic en el enlace para
            completar el proceso de inicio de sesión.
          </p>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-500">
            Si no recibes el correo en unos minutos, revisa tu carpeta de spam o
            intenta iniciar sesión nuevamente.
          </p>
        </div>

        <div className="mt-8">
          <a
            href="/auth"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#54bcaf] hover:bg-[#3da396] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#54bcaf] transition-colors duration-300"
          >
            Volver a la página de inicio de sesión
          </a>
        </div>
      </div>
    </div>
  );
}
