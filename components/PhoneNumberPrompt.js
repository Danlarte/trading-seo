import { useState } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function PhoneNumberPrompt({ onSubmit, onClose }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [prefix, setPrefix] = useState("+34");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telegram, setTelegram] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      toast.error("Por favor, introduce tu nombre");
      return;
    }
    if (phoneNumber.length < 9) {
      toast.error("Por favor, introduce un número de teléfono válido");
      return;
    }
    setIsLoading(true);
    try {
      await onSubmit({
        phoneNumber: `${prefix}${phoneNumber}`,
        nombre,
        apellidos,
        telegram,
      });
      const response = await fetch("/api/stripe/generate-discount", {
        method: "POST",
      });
      const data = await response.json();
      if (response.ok) {
        setDiscountCode(data.code);
        navigator.clipboard.writeText(data.code);
        toast.success(
          <div>
            <p>¡Código de descuento generado con éxito!</p>
            <p className="font-bold">{data.code}</p>
            <p className="text-sm">Copiado al portapapeles</p>
          </div>,
          { duration: 10000 }
        );
        onClose();
      } else {
        throw new Error(
          data.error || "Error al generar el código de descuento"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al procesar la solicitud");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/LOGO TRADINGPRO.png"
            alt="TradingPro Logo"
            width={150}
            height={75}
            className="mb-4"
          />
          <h2 className="text-2xl font-bold text-[#17498a] mb-2">
            Completa tu perfil
          </h2>
          <div className="w-16 h-1 bg-[#54bcaf] rounded-full"></div>
        </div>
        {!discountCode ? (
          <>
            <p className="text-gray-600 mb-6 text-center">
              Añade tus datos personales y obtén un 7% de descuento en tu
              próxima compra.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
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
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                  placeholder="Introduce tus apellidos"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#54bcaf] focus:border-[#54bcaf] transition-colors"
                />
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
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  placeholder="Introduce tu número de Telegram"
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
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Ej: 612345678"
                    className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-[#54bcaf] focus:border-[#54bcaf] transition-colors"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#54bcaf] text-white py-3 rounded-md hover:bg-[#3da396] transition-colors font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Procesando..." : "Guardar y obtener descuento"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              ¡Gracias por completar tu perfil! Aquí tienes tu código de
              descuento:
            </p>
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-4 rounded-md mb-4">
              <p className="text-2xl font-bold text-white">{discountCode}</p>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Este código es de un solo uso y te dará un 10% de descuento en tu
              próxima compra.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
