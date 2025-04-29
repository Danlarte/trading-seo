"use client";
import Link from "next/link";
import Head from "next/head";
import Encabezado from "@/components/home/Encabezado";

export default function AvisoLegal() {
  let nombre = "TradingPro, S.L.";
  let direccion = "8.016-Madrid, Calle Alfonso VIII nº 11, 3º D";
  let cif = "B-72840713";
  let telefono = "913581451";
  let email = "tradingPro@tradingPro.app";
  let nombre_web = "tradingPro.app";
  let registro = "Registro Mercantil de Madrid";

  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>TradingPRO - Aviso Legal</title>
        <meta name="description" content="Aviso legal de TradingPRO" />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Encabezado titulo="Aviso Legal" />

        <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#17498A] mb-6">
              Aviso Legal
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                TradingPRO es un foro de formación y educación en materia de
                análisis bursátil, de carácter genérico y no personalizado a las
                circunstancias del cliente. Todo el material y formación
                ofrecidos tienen un carácter esencialmente educativo.
              </p>
              <p>
                TradingPRO no ofrece ningún servicio de inversión o servicio
                auxiliar de inversión en los términos recogidos por la
                legislación española. TradingPRO no ofrece ningún tipo de
                asesoramiento financiero ni de inversión personalizado
                atendiendo a las circunstancias personales de los/las
                alumnos/as, ni de forma directa ni de forma indirecta, mediante
                respuesta a las consultas/dudas/preocupaciones/opiniones
                recibidas de los/las alumnos/as. Esto implica que cualquier
                opinión o valoración expresadas por los formadores de TradingPRO
                es de carácter totalmente educativo y no se debe inferir como
                una confirmación para enajenar o adquirir valores o cualquier
                otro activo financiero.
              </p>
              <p>
                TradingPRO <b>NO</b> es una entidad autorizada para proporcionar
                servicios de asesoría de inversión; por lo que sus cursos, NO
                son recomendaciones/consejo/sugerencia de compra o venta de
                valores o cualquier otro activo financiero.
              </p>
              <p>
                Las formaciones de TradingPRO <b>NO</b> son
                recomendaciones/consejo/sugerencia o invitación de enajenación o
                adquisición de valores, corrección ni confirmación de tesis de
                inversión que tengan por objeto sustentar o respaldar decisiones
                de enajenación o adquisición, servicios de señales de inversión
                ni proporcionan confirmación para enajenar o adquirir valores o
                cualquier otro activo financiero.
              </p>
              <p className="font-bold">
                CADA USUARIO ES EL ÚNICO SUJETO RESPONSABLE DE SUS DECISIONES DE
                ENAJENACIÓN O ADQUISICIÓN DE VALORES O DE CUALQUIER ACTIVO
                FINANCIERO.
              </p>
              <p>
                Con el fin de cumplir con las normas y leyes que rigen la
                actividad formativa de este foro, TradingPRO se reserva el
                derecho de responder a interacciones de alumnos, en caso de
                detectar ánimo o intención de recibir asesoramiento/consejo de
                inversión o financiero en general. TradingPRO se reserva el
                derecho de finalizar la prestación de servicios formativos a
                un/a alumno/a que pese a conocer este aviso legal, persista en
                su intención de obtener asesoramiento/consejo de inversión o
                financiero en general con el fin o la pretensión de delegar,
                participar o compartir la responsabilidad de sus decisiones y
                acciones en y con el foro.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#17498A] mb-6">
              Identificación
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                De acuerdo con el Art.10 de la Ley 34/2002, de 11 de julio, de
                Servicios de la sociedad de la información y de comercio
                electrónico de España se informa:
              </p>
              <p>
                Los dominios TradingPRO.es, TradingPRO.app (en adelante, los
                dominios) están administrados y explotados por la empresa
                TradingPRO, S.L. con domicilio en 28.016-Madrid, Calle Alfonso
                VIII nº 11, 3º D, con CIF B-72840713
              </p>
              <p>Contacto: 623 24 30 01</p>
              <p>Correo electrónico: info@TradingPRO.app</p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#17498A] mb-6">
              Condición de Usuario
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                La aceptación de las presentes condiciones generales y política
                de privacidad conjuntamente con la utilización de cualquier
                Servicio de TradingPRO atribuye la Condición de Usuario del
                mismo.
              </p>
              <p>
                Con carácter general para la utilización completa de los
                Servicios de TradingPRO será necesario el Registro del Usuario,
                aunque será posible acceder a determinados servicios sin estar
                dado de alta.
              </p>
              <p>
                En algunos casos se ofrece la alternativa al usuario de darse de
                alta a través de determinadas redes sociales siempre que sea
                usuario de la red social correspondiente. El procedimiento de
                alta vendrá determinado en cada momento en función de la citada
                red social.
              </p>
              <p>
                Se presume que el acceso o la mera utilización del sitio web por
                parte del Usuario implica la adhesión de éste a las condiciones
                generales que TradingPRO Inversión S.L. tenga publicadas en el
                momento en el que se acceda a los dominios referidos
                anteriormente. En consecuencia, el Usuario debe estar al tanto
                de estas condiciones generales. En este sentido, se entenderá
                por Usuario a la persona que acceda, navegue, utilice o
                participe en los servicios y actividades, gratuitas o de pago,
                desarrolladas por TradingPRO Inversión S.L.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#17498A] mb-6">
              Condiciones de Uso
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                El Usuario se abstendrá de utilizar cualquiera de los servicios
                ofrecidos en TradingPRO con fines o efectos ilícitos, lesivos de
                los derechos e intereses de terceros, o que puedan dañar,
                inutilizar, sobrecargar, deteriorar o impedir la normal
                utilización de los servicios, los equipos informáticos o los
                documentos, archivos y cualquier contenido almacenado en
                TradingPRO o servidores externos enlazados desde TradingPRO.
              </p>
              <p>
                El usuario se abstendrá de usar TradingPRO con el objetivo de a)
                la promoción de un sitio web (spam); b) las campañas comerciales
                (aunque el lugar promocionado no contenga publicidad directa) o
                la publicación de planes amigo; c) la publicación de mensajes
                con noticias falsas y/o de difamación o insultos a terceras
                personas.
              </p>
              <p>
                El usuario se abstendrá de crear múltiples cuentas de usuario.
                El usuario respetará además las normas de participación. El
                incumplimiento de las condiciones de uso podría significar el
                bloqueo de la cuenta de usuario, el borrado y/o edición del
                texto ofensivo, y la adopción de otras medidas adecuadas según
                las leyes españolas y europeas.
              </p>
              <p>
                Los mensajes, comentarios, noticias y votos enviados
                voluntariamente por los usuarios para ser publicados en el sitio
                web serán contenidos que se publicarán en la misma web de manera
                abierta y pública, el usuario declara a estos efectos conocer
                estos aspectos al tiempo que manifiesta declarar que cuenta con
                las autorizaciones, consentimientos y licencias necesarias para
                su publicación. Quedan relacionados con los comentarios y votos
                de otros usuarios. En caso de solicitar el usuario registrado el
                borrado de sus mensajes en el foro, TradingPRO procederá a su
                anonimización pero sin borrar el contenido de la publicación o
                publicaciones realizadas. Los gestores de TradingPRO podrán
                conservar estos datos con el objetivo de mantener la coherencia
                de la información publicada y los contenidos publicados por
                todos los usuarios.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#17498A] mb-6">
              Propiedad Intelectual e Industrial
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                El Usuario reconoce que todos los elementos de TradingPRO y de
                cada uno de los Servicios prestados a través del mismo, la
                información y materiales contenidos en el mismo, la estructura,
                selección, ordenación y presentación de sus contenidos y los
                programas de ordenador utilizados en relación con el mismo están
                protegidos por derechos de propiedad intelectual e industrial de
                TradingPRO o de terceros.
              </p>
              <p>
                Salvo que fuera autorizado por TradingPRO, en su caso, por los
                terceros titulares de los derechos correspondientes, o a menos
                que ello resulte legalmente permitido, el Usuario no podrá
                reproducir, transformar, modificar, desensamblar, realizar
                ingeniería inversa, distribuir, alquilar, prestar, poner a
                disposición o permitir el acceso al público a través de
                cualquier modalidad de comunicación pública de ninguno de los
                elementos referidos en el párrafo anterior.
              </p>
              <p>
                En particular, queda terminantemente prohibido la utilización de
                los textos, imágenes, publicaciones y otro elemento incluido en
                la presente plataforma para su posterior inclusión, total o
                parcial, en otros sitios ajenos a la plataforma sin contar con
                la autorización previa y por escrito de la plataforma.
              </p>
              <p>
                El Usuario deberá abstenerse de suprimir los signos
                identificativos de los derechos (de propiedad intelectual,
                industrial o cualquier otro) de TradingPRO o de los terceros que
                figuren en la plataforma y en cada uno de los diversos Servicios
                ofrecidos a través de él. Asimismo, el Usuario deberá abstenerse
                de eludir o manipular cualesquiera dispositivos técnicos
                establecidos por La compañía o por terceros, ya sea en la
                plataforma, en cualquiera de los Servicios o en cualquiera de
                los materiales, elementos o información obtenidos a través del
                mismo, para la protección de sus derechos.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#17498A] mb-6">
              Exclusión de garantías y responsabilidad
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Los gestores de TradingPRO no garantizan la licitud, fiabilidad,
                exactitud, exhaustividad, actualidad y utilidad de los
                contenidos publicados.
              </p>
              <p>
                En los dominios el Usuario podrá encontrar enlaces, y/o
                subenlaces a otras páginas web mediante diferentes botones,
                links, banners, etc, los cuales son gestionados por terceros. El
                titular no tiene facultad ni medios humanos ni técnicos para
                conocer, controlar ni aprobar toda la información, contenidos,
                productos o servicios facilitados por otros dominios a los que
                se establecen enlaces desde los dominios.
              </p>
              <p>
                El establecimiento de un hiperenlace, enlace y/o subenlaces,
                intercambio, no implica en ningún caso la existencia de
                relaciones entre los gestores de TradingPRO y el propietario del
                lugar web con la que se establezca, ni la aceptación y
                aprobación de sus contenidos o servicios.
              </p>
              <p>
                De existir contenidos formativos patrocinados o sponsorizados
                por terceros se hará constar expresamente esta condición. En
                todo caso, TradingPRO no garantiza la licitud, fiabilidad,
                utilidad, veracidad o exactitud de los servicios prestados por
                terceros a través de los dominios o sobre los que TradingPRO
                únicamente actúe como medio o cauce publicitario.
              </p>
              <p>
                TradingPRO no será responsable de los daños y perjuicios de toda
                índole irrogados por los servicios prestados por terceros a
                través de los dominios y en particular, con carácter puramente
                ejemplificativo o numerus apertus:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  De los incumplimientos de la ley, la moral o el orden público
                </li>
                <li>
                  De la infracción de los derechos de propiedad intelectual e
                  industrial
                </li>
                <li>
                  De la realización de actos de competencia desleal y publicidad
                  ilícita
                </li>
                <li>
                  De la inadecuación o inexactitud de la información contenida u
                  ofrecida en los sitios enlazados
                </li>
                <li>
                  De la falta de veracidad, exactitud, exhaustividad,
                  pertinencia y/o actualidad de los contenidos transmitidos,
                  difundidos, almacenados, recibidos, obtenidos, puestos a
                  disposición o accesibles mediante los servicios prestados por
                  terceros
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#17498A] mb-6">
              Modificaciones
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                TradingPRO se reserva el derecho de efectuar sin previo aviso
                las modificaciones que considere oportunas en su portal,
                pudiendo cambiar, suprimir o añadir tanto los contenidos y
                servicios que se presten a través de la misma como la forma en
                la que éstos aparezcan presentados o localizados en su portal.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#17498A] mb-6">
              Derecho de exclusión
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                TradingPRO se reserva el derecho a denegar o retirar el acceso a
                portal y/o los servicios ofrecidos sin necesidad de preaviso, a
                instancia propia o de un tercero, a aquellos usuarios que
                incumplan las presentes Condiciones Generales de Uso.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#17498A] mb-6">
              Generalidades
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                TradingPRO perseguirá el incumplimiento de las presentes
                condiciones así como cualquier utilización indebida de su portal
                ejerciendo todas las acciones civiles y penales que le puedan
                corresponder en derecho.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#17498A] mb-6">
              Legislación aplicable y jurisdicción
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                La relación entre TradingPRO y el USUARIO se regirá por la
                normativa española vigente y cualquier controversia se someterá
                a los Juzgados y tribunales de la ciudad de Madrid.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
