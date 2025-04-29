"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    nombre: "",
    apellidos: "",
    telefono: "",
    telegram: "",
  });
  const [prefix, setPrefix] = useState("+34");

  useEffect(() => {
    const fetchUserData = async () => {
      if (status === "authenticated") {
        try {
          const response = await fetch("/api/update-phone", {
            method: "GET",
            headers: {
              "Cache-Control": "no-cache, no-store, must-revalidate",
              Pragma: "no-cache",
              Expires: "0",
            },
          });

          if (response.ok) {
            const data = await response.json();
            // Separar el prefijo del teléfono si existe
            let phonePrefix = "";
            let phoneNumber = data.telefono || "";

            setPrefix(phonePrefix);
            setUserData({
              nombre: data.nombre || "",
              apellidos: data.apellidos || "",
              telefono: "",
              telegram: data.telegram || "",
            });
          }
        } catch (error) {
          console.error("Error al cargar los datos del perfil:", error);
          toast.error("Error al cargar los datos del perfil");
        }
      }
    };

    fetchUserData();
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.nombre.trim()) {
      toast.error("Por favor, introduce tu nombre");
      return;
    }

    if (!userData.telefono || userData.telefono.length < 9) {
      toast.error("Por favor, introduce un número de teléfono válido");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/update-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: `${prefix}${userData.telefono}`,
          nombre: userData.nombre,
          apellidos: userData.apellidos,
          telegram: userData.telegram,
          email: session.user.email,
        }),
      });

      if (response.ok) {
        toast.success("Perfil actualizado correctamente");
      } else {
        throw new Error("Error al actualizar el perfil");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al actualizar el perfil");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acceso no autorizado</h1>
          <p className="mb-4">Debes iniciar sesión para ver esta página</p>
          <Link
            href="/api/auth/signin"
            className="btn bg-[#54bcaf] text-white hover:bg-[#3da396]"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/LOGO TRADINGPRO.png"
            alt="TradingPro Logo"
            width={150}
            height={75}
            className="mb-4"
          />
          <h1 className="text-2xl font-bold text-[#17498a]">Mi Perfil</h1>
          <div className="w-16 h-1 bg-[#54bcaf] rounded-full mt-2"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre *
            </label>
            <input
              type="text"
              id="nombre"
              value={userData.nombre}
              onChange={(e) =>
                setUserData({ ...userData, nombre: e.target.value })
              }
              placeholder="Introduce tu nombre"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#54bcaf] focus:border-[#54bcaf] transition-colors"
              required
            />
          </div>

          <div>
            <label
              htmlFor="apellidos"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Apellidos
            </label>
            <input
              type="text"
              id="apellidos"
              value={userData.apellidos}
              onChange={(e) =>
                setUserData({ ...userData, apellidos: e.target.value })
              }
              placeholder="Introduce tus apellidos"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#54bcaf] focus:border-[#54bcaf] transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Número de teléfono *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                placeholder="+34"
                className="w-20 p-3 border border-gray-300 rounded-md focus:ring-[#54bcaf] focus:border-[#54bcaf] transition-colors"
              />
              <input
                type="tel"
                id="phone"
                value={userData.telefono}
                onChange={(e) =>
                  setUserData({ ...userData, telefono: e.target.value })
                }
                placeholder="Ej: 612345678"
                className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-[#54bcaf] focus:border-[#54bcaf] transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="telegram"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Telegram
            </label>
            <input
              type="text"
              id="telegram"
              value={userData.telegram}
              onChange={(e) =>
                setUserData({ ...userData, telegram: e.target.value })
              }
              placeholder="Introduce tu número de Telegram"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#54bcaf] focus:border-[#54bcaf] transition-colors"
            />
          </div>

          <div className="flex justify-end">
            <Link href="/" className="btn btn-ghost mr-2">
              Cancelar
            </Link>
            <button
              type="submit"
              className="btn bg-[#54bcaf] text-white hover:bg-[#3da396]"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Guardar cambios"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
