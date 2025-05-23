"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [callbackUrl, setCallbackUrl] = useState("/dashboard");

  const router = useRouter();

  useEffect(() => {
    // Obtener el callbackUrl de la URL actual
    const urlParams = new URLSearchParams(window.location.search);
    const callback = urlParams.get("callbackUrl");
    if (callback) {
      setCallbackUrl(callback);
    }
  }, []);

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await signIn("email", {
      email,
      redirect: false,
      callbackUrl,
    });
    setIsLoading(false);
    if (result?.error) {
      console.error(result.error);
    } else {
      router.push("/auth/verify-request");
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl });
  };

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
            Inicia sesión en tu cuenta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleEmailSignIn}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#54bcaf] focus:border-[#54bcaf] focus:z-10 sm:text-sm"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#54bcaf] hover:bg-[#3da396] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#54bcaf] transition-colors duration-300"
            >
              {isLoading
                ? "Cargando..."
                : "Iniciar sesión con correo electrónico"}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                O continúa con
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#17498a] hover:bg-[#0f3c7a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#17498a] transition-colors duration-300"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              Iniciar sesión con Google
            </button>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          Al iniciar sesión, aceptas nuestra{" "}
          <a href="/cookies" className="text-[#54bcaf] hover:underline">
            política de cookies
          </a>
          .
        </div>
      </div>
    </div>
  );
}
