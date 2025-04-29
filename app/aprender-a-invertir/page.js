"use client";
import Script from "next/script";
import TestimonialsAvatars from "@/components/TestimonialsAvatars";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

export default function EmbudoVentas() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    prefix: "+34",
    phone: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataToSend = {
      nombre: formData.name,
      email: formData.email,
      ...(formData.phone && {
        sms: formData.prefix + formData.phone,
      }),
    };

    try {
      await fetch("/api/usuarios", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      await fetch("/api/brevo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: dataToSend.nombre,
          email: dataToSend.email,
          sms: dataToSend.sms,
          lista: 29,
        }),
      }).catch((err) => {
        console.log("error brevo", err);
      });
      const data = await response.json();
      if (data) {
        // Trigger Google Ads conversion event
        if (typeof gtag === "function") {
          gtag("event", "conversion", {
            send_to: "AW-443767014/ZXoBCLPstowaEOaxzdMB",
            event_callback: function () {
              router.push("/video-clase");
            },
          });
        }
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
    router.push("/video-clase");
  };

  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-443767014"
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-443767014');
        `}
      </Script>
      <div className="min-h-screen  px-1 sm:px-3 lg:px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-xl  overflow-hidden">
          <div className="bg-gradient-to-r from-[#17498a] to-[#54bcaf] p-3 text-white text-center">
            <h2 className="text-sm lg:text-4xl font-bold mb-2">
              — CLASE GRATUITA DE 10 MINUTOS —
            </h2>
            <h1 className="text-lg sm:text-2xl font-bold mb-4">
              ¡Conoce la técnica que te permitirá comenzar a obtener tus
              primeras ganancias!
            </h1>
          </div>

          <div className="p-3">
            <ul className="space-y-2 sm:space-y-4 mb-6">
              {[
                "Descubrirás una estrategia de inversión que funciona para <strong>generar ingresos</strong> constantes mensualmente, sin depender de terceros.",
                "Te revelaremos cómo obtener beneficios diarios <strong>de manera sencilla</strong>, con un método que podrás dominar en un mes, incluso si nunca has invertido antes y cuentas con poco capital inicial.",
                "Gracias a nuestro enfoque, tendrás más tiempo para disfrutar de tu familia y afición <strong>sin tener que rendir cuentas a nadie</strong> ni solicitar permisos.",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <FaCheck className="text-[#54bcaf] mt-1 mr-2 flex-shrink-0" />
                  <span
                    className="text-xs sm:text-base"
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                </li>
              ))}
            </ul>

            <div className="bg-gray-100 p-6 rounded-xl mt-5">
              <h3 className="text-xs sm:text-xl font-bold text-[#17498A] mb-4 text-center">
                ¿Dónde prefieres que te enviemos tu sesión gratuita?
              </h3>
              <form className="space-y-4 mb-7" onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="Tu nombre (sin apellidos)"
                    className="flex-1 p-2 border rounded-md"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    placeholder="Tu correo electrónico principal"
                    className="flex-1 p-2 border rounded-md"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="+34"
                    className="w-20 p-2 border rounded-md"
                    value={formData.prefix}
                    onChange={(e) =>
                      setFormData({ ...formData, prefix: e.target.value })
                    }
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    className="flex-1 p-2 border rounded-md w-20"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="terms" required className="mr-2" />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    Confirmo que he leído la{" "}
                    <Link
                      href="/aviso-legal"
                      className="text-[#54bcaf] hover:underline"
                    >
                      política de privacidad
                    </Link>{" "}
                    y estoy de acuerdo en recibir material educativo y ofertas
                    comerciales
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#54bcaf] text-white font-bold py-3 px-4 rounded-full hover:bg-[#3da396] transition-colors duration-300"
                >
                  OBTENER ACCESO AHORA
                </button>
              </form>
              <TestimonialsAvatars />
            </div>
          </div>

          <div className="p-6 bg-gray-50 flex flex-col sm:flex-row items-center">
            <div className="sm:w-2/4 mb-4 sm:mb-0">
              <Image
                src="/fotoembudo.jpg"
                alt="TradingPro"
                width={400}
                height={200}
                className="rounded-xl w-full h-full object-cover"
              />
            </div>
            <div className="sm:w-2/4 sm:pl-6">
              <h4 className="text-xl font-bold text-[#17498A] mb-2">
                TradingPro
              </h4>

              <p className="text-sm text-gray-600 mb-2">
                Álvaro y Jose Basagoiti, escritores del best-seller: "Entendamos
                el Trading", que logró vender más de 16.000 copias en su primera
                edición.
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Colaboran semanalmente con reconocidos medios de Televisión y
                Radio como Negocios TV, LibreMercado, Intereconomía, Investing o
                Rankia, así como en periódicos y revistas económicas de
                reconocimiento mundial.
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Creadores del hub de información y formación de inversión más
                relevante de España y Latinoamérica, con una plataforma software
                de más de 25.000 usuarios y un equipo humano de 22
                profesionales.
              </p>
              <Link
                href="/"
                className="bg-[#54bcaf] text-white text-sm font-bold py-2 px-3 rounded-full hover:bg-[#3da396] transition-colors duration-300"
              >
                Visitar Tradingpro
              </Link>
            </div>
          </div>
          <div className="text-center text-xs text-gray-500 p-4 bg-gray-100 mt-4">
            <p>TradingPRO Inversión S.L - B72840713</p>
            <p>Alfonso VIII Nº13 Madrid (28016)</p>
            <p>
              La información de este sitio tiene sólo carácter informativo y no
              pretende, ni es, ni ofrece recomendaciones de inversión
            </p>
            <div className="mt-2 space-x-4">
              <Link
                href="/aviso-legal"
                className="text-[#54bcaf] hover:underline"
              >
                Aviso Legal
              </Link>
              <Link
                href="/politica-cookies"
                className="text-[#54bcaf] hover:underline"
              >
                Política de Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
