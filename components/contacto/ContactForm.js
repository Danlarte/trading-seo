import { useState } from "react";
import Link from "next/link";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [enviando, setEnviando] = useState(false);
  const [mensajeEnvio, setMensajeEnvio] = useState("");
  const [aceptaPolitica, setAceptaPolitica] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMensajeEnvio("Mensaje enviado con éxito. Gracias por contactarnos.");
        setFormData({ nombre: "", email: "", mensaje: "" });
      } else {
        setMensajeEnvio(
          data.error ||
            "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      setMensajeEnvio(
        "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo."
      );
    }
    setEnviando(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 max-w-2xl mx-auto my-8">
      <h2 className="text-2xl md:text-3xl font-bold text-[#17498A] mb-6 text-center">
        Contáctanos
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-[#54BCAF]"
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-[#54BCAF]"
            placeholder="tu@email.com"
          />
        </div>
        <div>
          <label
            htmlFor="mensaje"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-[#54BCAF] resize-none"
            placeholder="Escribe tu mensaje aquí..."
          ></textarea>
        </div>
        <div className="flex items-start">
          <input
            type="checkbox"
            id="politica"
            checked={aceptaPolitica}
            onChange={(e) => setAceptaPolitica(e.target.checked)}
            required
            className="mt-1 mr-2"
          />
          <label htmlFor="politica" className="text-sm text-gray-600">
            Acepto la{" "}
            <Link
              href="/politica-privacidad"
              className="text-[#54BCAF] hover:underline"
            >
              política de privacidad
            </Link>{" "}
            y el tratamiento de mis datos personales.
          </label>
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={enviando || !aceptaPolitica}
            className="w-full md:w-auto bg-[#54BCAF] text-white font-bold text-lg py-3 px-6 rounded-full hover:bg-[#3da396] transition-all duration-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {enviando ? "Enviando..." : "Enviar mensaje"}
          </button>
        </div>
      </form>
      {mensajeEnvio && (
        <p
          className={`mt-4 text-center ${
            mensajeEnvio.includes("éxito") ? "text-green-600" : "text-red-600"
          }`}
        >
          {mensajeEnvio}
        </p>
      )}
    </div>
  );
}
