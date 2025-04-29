"use client";
import Head from "next/head";
import Encabezado from "@/components/home/Encabezado";

export default function PoliticaCookies() {
  let nombre = "TradingPRO Inversión S.L.";
  let direccion = "8.016-Madrid, Calle Alfonso VIII nº 11, 3º D";
  let cif = "B-72840713";
  let telefono = "913581451";
  let email = "tradingPro@tradingPro.app";
  let nombre_web = "tradingPro.app";
  let registro = "Registro Mercantil de Madrid";

  return (
    <>
      <Head>
        <title>Trading Pro - Política de Cookies</title>
        <meta name="description" content="Política de Cookies de Trading Pro" />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Encabezado titulo="Política de Cookies" />

        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 mt-8">
          <div className="prose max-w-none">
            <p className="mb-4">
              El dominio {nombre_web} utiliza procedimientos automáticos de
              recogida (Cookies) para reunir información personal como puede ser
              el tipo de navegador o sistema operativo, página de referencia,
              ruta, dominio ISP (Proveedor de Internet), etc. todo ello con el
              fin de mejorar los servicios prestados. Las Cookies nos ayudan a
              adaptar esta página web a sus necesidades personales.
            </p>

            <p className="mb-4">
              Una Cookie es un pequeño archivo que se almacena en el ordenador
              del usuario y nos permite reconocerle. El conjunto de cookies nos
              ayuda a mejorar la calidad de nuestra web, permitiéndonos así
              personalizar hasta cierto punto la navegación de cada usuario por
              nuestra web. Las cookies actualmente son esenciales para el
              funcionamiento de internet, aportando innumerables ventajas en la
              prestación de servicios interactivos, facilitándole la navegación
              y usabilidad de nuestra web.
            </p>

            <p className="mb-4">
              Tenga en cuenta que las cookies no pueden dañar su equipo y que, a
              cambio, el que estén activadas nos ayudan a identificar y resolver
              los errores y mejorar la navegabilidad de nuestro sitio.
            </p>

            <h2 className="text-2xl font-bold text-[#17498A] mt-8 mb-4">
              Tipología de cookies:
            </h2>

            <p className="mb-4">
              Para una mayor información del usuario sobre la tipología y uso de
              las cookies le informamos que:
            </p>

            <h3 className="text-xl font-semibold text-[#17498A] mt-6 mb-2">
              Desde el punto de vista de tiempo de vida de la cookie:
            </h3>

            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">
                <span className="font-semibold">Cookies de sesión:</span> son
                cookies temporales que permanecen en el archivo de cookies de su
                navegador hasta que abandone la página web, por lo que ninguna
                queda registrada en el disco duro del usuario. La información
                obtenida por medio de estas cookies, sirven para analizar pautas
                de tráfico en la web. A la larga, esto nos permite proporcionar
                una mejor experiencia para mejorar el contenido y facilitando su
                uso.
              </li>
              <li className="mb-2">
                <span className="font-semibold">Cookies persistentes:</span> son
                almacenadas en el disco duro y nuestra web las lee cada vez que
                usted realiza una nueva visita. Una cookie permanente posee una
                fecha de expiración determinada. La cookie dejará de funcionar
                después de esa fecha. Las utilizamos, generalmente, para
                facilitar la experiencia del usuario recordando sus hábitos de
                navegación o, en su caso, facilitar los servicios de compra y/o
                registro.
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-[#17498A] mt-6 mb-2">
              Desde el punto de vista de la finalidad de cada cookie:
            </h3>

            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">
                <span className="font-semibold">Cookies Técnicas:</span> son
                aquellas que permiten al usuario la navegación a través de una
                página web, plataforma o aplicación y la utilización de las
                diferentes opciones o servicios que en ella existan, incluyendo
                aquellas que el editor utiliza para permitir la gestión y
                operativa de la página web y habilitar sus funciones y
                servicios.
              </li>
              <li className="mb-2">
                <span className="font-semibold">
                  Cookies de preferencias o personalización:
                </span>{" "}
                son aquellas que permiten recordar información para que el
                usuario acceda al servicio con determinadas características que
                pueden diferenciar su experiencia de la de otros usuarios.
              </li>
              <li className="mb-2">
                <span className="font-semibold">
                  Cookies de análisis o medición:
                </span>{" "}
                son aquellas que permiten al responsable de estas el seguimiento
                y análisis del comportamiento de los usuarios de los sitios web
                a los que están vinculadas.
              </li>
              <li className="mb-2">
                <span className="font-semibold">
                  Cookies de publicidad comportamental:
                </span>{" "}
                son aquellas que almacenan información del comportamiento de los
                usuarios obtenida a través de la observación continuada de sus
                hábitos de navegación, lo que permite desarrollar un perfil
                específico para mostrar publicidad en función de este.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-[#17498A] mt-8 mb-4">
              Relación y descripción de cookies:
            </h2>

            <p className="mb-4">
              La tabla que publicamos a continuación recoge de forma
              esquematizada las cookies anteriormente descritas y utilizadas en
              el sitio web {nombre_web}:
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre de cookie
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dominio de cookie
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duración
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Uso de cookie
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2">_ga</td>
                    <td className="px-4 py-2">{nombre_web}</td>
                    <td className="px-4 py-2">2 años</td>
                    <td className="px-4 py-2">
                      Cookies analíticas (Google Analytics): Utiliza un
                      identificador anónimo para distinguir usuarios anónimos y
                      realizar análisis sobre las interacciones de los usuarios
                      en la aplicación con el fin de optimizar los servicios que
                      se ofrecen
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">_gat</td>
                    <td className="px-4 py-2">{nombre_web}</td>
                    <td className="px-4 py-2">
                      10 minutos desde creación o modificación
                    </td>
                    <td className="px-4 py-2">
                      Cookies analíticas (Google Analytics): Se usa para
                      diferenciar entre los diferentes objetos de seguimiento
                      creados en la sesión. La cookie se crea al cargar la
                      librería JavaScript y no existe una versión previa de la
                      cookie _gat. La cookie se actualiza cada vez que envía los
                      datos a Google Analytics.
                    </td>
                  </tr>
                  {/* Añadir más filas según sea necesario */}
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-[#17498A] mt-8 mb-4">
              Información adicional:
            </h2>

            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">
                Para conocer más sobre las cookies de Google Analytics puede
                visitar la siguiente página:
                <a
                  href="https://policies.google.com/technologies/cookies?hl=es"
                  className="text-[#54BCAF] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://policies.google.com/technologies/cookies?hl=es
                </a>
                . Puede desactivar las cookies de Google Analytics a través del
                siguiente enlace:
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  className="text-[#54BCAF] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://tools.google.com/dlpage/gaoptout
                </a>
              </li>
              <li className="mb-2">
                En este sitio web encontrará información sobre cómo funciona la
                publicidad basada en el comportamiento, información sobre las
                cookies y las medidas que usted puede tomar para proteger su
                privacidad en Internet:
                <a
                  href="http://www.youronlinechoices.com/es/"
                  className="text-[#54BCAF] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  http://www.youronlinechoices.com/es/
                </a>
              </li>
              <li className="mb-2">
                Para más información sobre cookies y sus derechos como usuario
                puede consultar la Guía sobre el uso de cookies elaborada por la
                Agencia Española de Protección de Datos con la colaboración de
                las asociaciones ADIGITAL, Anunciantes, AUTOCONTROL e IAB Spain:
                <a
                  href="https://www.aepd.es/media/guias/guia-cookies.pdf"
                  className="text-[#54BCAF] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.aepd.es/media/guias/guia-cookies.pdf
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
