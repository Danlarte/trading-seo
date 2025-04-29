"use client";
import { useState } from "react";
import Encabezado from "@/components/home/Encabezado";

const faqs = [
  // Preguntas Generales
  {
    pregunta: "¿Cómo invertir sin perder dinero?",
    respuesta:
      "Es imposible eliminar por completo el riesgo al invertir, pero puedes minimizarlo con formación adecuada, diversificación de activos, y estrategias sólidas. Es imprescindible aprender a gestionar la emociones a la hora de invertir y aprender a utilizar correctamente los Stop Loss para minimizar los riesgos de forma correcta. Los cursos prácticos y las membresías de inversión que tenemos en TradingPRO te enseñan a utilizar estos métodos para proteger tu capital mientras aprovechas las oportunidades del mercado, para maximizar tus resultados minimizando tus riesgos.",
  },
  {
    pregunta: "¿Qué es un curso de trading auditado?",
    respuesta:
      "Un curso de trading auditado incluye resultados verificables de operaciones realizadas por los instructores. Esto garantiza que las estrategias enseñadas funcionan en mercados reales. Nuestro curso de Trading e inversión es el único curso completo con resultados demostrados y mentorías prácticas de 6 meses para que los resultados de tu formación se puedan ver de manera demostrable desde que empieces a aprender.",
  },
  {
    pregunta: "¿Cómo empezar a hacer trading desde cero?",
    respuesta:
      "Para empezar a hacer trading desde cero, necesitas un conocimiento básico de los mercados, una plataforma de trading confiable, y un curso práctico que te guíe paso a paso. En nuestro curso, aprenderás desde lo esencial hasta estrategias avanzadas con acompañamiento personalizado. Lo más importante es que incluimos 6 meses de acompañamiento con el curso para que todo lo que aprendas lo puedas ir aplicando en mercados reales con la ayuda de expertos que estaran acompañándote durante todo el proceso para que puedas rentabilizar tus inversiones de forma real y consistente.",
  },
  {
    pregunta: "¿Qué necesito para operar en los mercados financieros?",
    respuesta:
      "Solo necesitas una conexión a internet, una cuenta con un broker confiable, y formación adecuada. En TradingPRO te podemos ayudar con la formación para que puedas ser capaz de operar de forma rentable lo antes posible. Tenemos cursos de iniciación gratuitos, salas de trading diarias, membresías y un curso completo de inversión con resultados demostrables que ha ayudado ya a cientos de traders.",
  },
  {
    pregunta:
      "¿Cuáles son las mejores estrategias para no perder dinero invirtiendo?",
    respuesta:
      "Algunas estrategias efectivas incluyen el uso de stop-loss, diversificación de cartera, y operar solo en mercados que entiendas. Nuestras mentorías te enseñan a aplicar estas estrategias en tiempo real de manos de traders exitosos que operan a diario en vivo con cuentas reales y auditadas.",
  },
  {
    pregunta: "¿Qué tipos de activos puedo operar con este curso de trading?",
    respuesta:
      "Podrás operar acciones, futuros, CFDs, opciones, bonos, ETFs, fondos y criptomonedas. En TradingPRO nos enfocamos en darte la educación necesaria para cualquier etapa de tu carrera como inversor y de facilitarte todas herramientas para operar en cualquier mercado con éxito.",
  },
  {
    pregunta: "¿Dónde invierten los expertos financieros?",
    respuesta:
      "Expertos como Warren Buffett o Elon Musk tienden a diversificar entre acciones, tecnología, y activos tradicionales como oro. Puedes ver donde están invirtiendo los mejores inversores en tiempo real en la web de tradingpro, en la sección de superinvestors.",
  },
  {
    pregunta: "¿Cómo funciona una membresía de trading auditada?",
    respuesta:
      "Una membresía de trading auditada tiene que incluir sesiones de trading en vivo, investigación semanal, y resultados auditados. Debe estar diseñada para que puedas aprender y desarrollar las habilidades de trading mientras lo pones en práctica en mercados reales para que puedas ganar dinero invirtiendo.",
  },
  {
    pregunta:
      "¿Qué diferencia tiene un curso de trading práctico respecto a otros?",
    respuesta:
      "Un curso de Inversión práctico es el que tiene que incluir mentorías prácticas, resultados auditados y módulos que evolucionan con el mercado, y por supuesto todas las herramientas para que puedas empezar a poner en práctica lo que aprendes en el desarrollo del curso. Nuestro curso de trading práctico es el único que incluye 6 meses de formación gratuita para que la formación sea real y demstrable.",
  },
  {
    pregunta: "¿Cómo elegir el mejor broker para empezar a operar?",
    respuesta:
      "Elige un broker con regulación, bajas comisiones y una plataforma que sea fácil de usar. Si tienes dudas pide asesoramiento a un profesional antes de entrar en una plataforma.",
  },
  {
    pregunta: "¿Qué es la libertad financiera y cómo lograrla con trading?",
    respuesta:
      "La libertad financiera es la capacidad de generar ingresos pasivos que puedan cubrir tus gastos. ¿Cómo saber cuánto dinero necesito para tener libertad financiera? Tienes que calcular cuál es el coste medio que necesitas al mes para vivir, y luego calculas cuál es la cantidad de dinero que necesitas para que al invertirlo a una rentabilidad media te de la cifra de dinero que necesitas para vivir un mes.",
  },
  {
    pregunta: "¿Es posible ganar dinero mientras aprendo trading?",
    respuesta:
      "Para ganar dinero mientras aprendes trading necesitas poder operar a pequeña escala en mercados reales para aplicar la teoría que estás aprendiendo, para que se asimilen los procesos y entiendas como funcionan los mercados reales. TradingPRO es de las únicas academias que pone esta metodología en práctica, acompañando a sus alumnos por expertos durante todo el proceso para que el aprendizaje sea real.",
  },
  {
    pregunta:
      "¿Qué activos financieros son más rentables para operar este año?",
    respuesta:
      "Dependerá del mercado, pero acciones tecnológicas, oro, y criptomonedas son opciones muy populares y con mayor tendencia. En nuestras sesiones semanales te mantenemos actualizado. El mercado cambia constantemente y la mejor inversión es asegurarse de estar informado.",
  },
  {
    pregunta: "¿Cómo evitar los errores más comunes al hacer trading?",
    respuesta:
      "Algunos errores son no tener un plan, operar por emociones, y sobre apalancarse. Para no cometer estos errores debes formarte primero de forma efectiva. En TradingPRO ofrecemos cursos, mentorías, webinars y salas de trading, desde completamente gratuitas hasta formaciones completas para ser traders profesionales.",
  },
  {
    pregunta: "¿Qué incluye un curso de trading práctico?",
    respuesta:
      "Incluye clases en vivo, prácticas reales en mercados, estrategias avanzadas, y mentorías personalizadas.",
  },
  {
    pregunta:
      "¿Cuáles son los beneficios de una mentoría personalizada en trading?",
    respuesta:
      "Con una mentoría personalizada recibirás atención individual para resolver tus dudas y mejorar tus habilidades de inversión en menos tiempo. Evitando cometer los errores que hemos cometido los traders en el comienzo y que nos han hecho perder mucho dinero. Una mentoría de trading o un curso práctico en el que te enseñen mientras lo pones en práctica son las mejores inversiones para evitar perder dinero.",
  },
  {
    pregunta: "¿Qué son los mercados financieros y cómo funcionan?",
    respuesta:
      "Los mercados financieros son lugares, ya sean físicos o virtuales, donde se compran y venden activos financieros como acciones, bonos y divisas. Es por tanto un sitio al que acuden tanto compradores como vendedores que están interesados en invertir o buscan financiación. El sitio físico más famoso es la Bolsa de Wall Street en Nueva York.",
  },
  {
    pregunta: "¿Cómo saber si un curso de trading es confiable?",
    respuesta:
      "Para saber si un curso de trading es confiable, busca resultados auditados, reseñas u opiniones de estudiantes, y expertos reconocidos en el sector. Nuestro curso cumple con todos estos requisitos, y es impartido por Jose y Alvaro Basagoiti, los fundadores de TradingPRO, traders profesionales con los que cuentan semanalmente grandes medios de comunicación como Intereconomía, Negocios TV y myconomy, entre otros.",
  },
  {
    pregunta: "¿Cuánto dinero necesito para empezar a hacer trading?",
    respuesta:
      "Puedes empezar con pequeñas cantidades, pero es mejor comenzar con un capital que te permita diversificar. Te podemos asesorar según tus metas y sin ningún coste asociado.",
  },
  {
    pregunta:
      "¿Cuáles son las ventajas de un curso de trading que evoluciona con el mercado?",
    respuesta:
      "Los mercados son cambiantes y están en continua evolución, dependen de noticias de última hora, descubrimientos tecnológicos de vanguardia o incluso eventos macroeconómicos. Por lo que hacer un curso de Inversión estático es una pérdida de tiempo. Nuestro curso te asegura estar siempre actualizado, adaptando tus estrategias a cualquier cambio en los mercados, al igual que la evolución de nuestro curso. Además incluye 6 meses de mentorías prácticas con expertos para que puedas aprender a enfrentarte tú solo al mercado.",
  },
  {
    pregunta: "¿Qué son los futuros, CFDs y ETFs, y cómo se operan?",
    respuesta:
      "Futuros: Son contratos para comprar o vender un activo en una fecha futura a un precio acordado. Son ideales para aquellos inversores que buscan especulación o cobertura. CFDs (Contratos por Diferencia): Son instrumentos de inversión que te permiten operar sobre la diferencia de precio de un activo sin poseerlo. ETFs (Fondos Cotizados): Son fondos de inversión que replican el rendimiento de un índice o activo.",
  },
  {
    pregunta: "¿Qué plataformas de trading son las mejores para principiantes?",
    respuesta:
      "Algunas de las plataformas recomendadas son MetaTrader, TradingView y plataformas propias de brokers. Te ayudamos a elegir la más adecuada según tus objetivos y experiencia.",
  },
  {
    pregunta:
      "¿Cómo operar con éxito en mercados como acciones, oro o petróleo?",
    respuesta:
      "Operar acciones con éxito implica entender los factores que influyen en cada mercado, como la economía global, eventos políticos o la cantidad de oferta y demanda de cada momento. En nuestras sesiones prácticas te enseñamos estrategias específicas para cada activo.",
  },
  {
    pregunta: "¿Qué es un gestor patrimonial y cómo puede ayudarme?",
    respuesta:
      "Un gestor patrimonial es un experto que te ayuda a organizar tus inversiones y planificar tu futuro financiero. En nuestra plataforma, ofrecemos herramientas gratuitas para que puedas tomar decisiones informadas como si tuvieras un gestor personal.",
  },
  {
    pregunta: "¿Qué diferencias hay entre trading e inversión a largo plazo?",
    respuesta:
      "El trading busca beneficios rápidos a través de operaciones frecuentes, mientras que la inversión a largo plazo se centra en el crecimiento sostenido del capital. Nuestro curso cubre ambos enfoques para que elijas el que mejor se adapte a tus objetivos.",
  },
  {
    pregunta: "¿Cuáles son los riesgos de invertir en criptomonedas?",
    respuesta:
      "El mayor riesgo de invertir en criptomonedas es que las criptomonedas son volátiles y no siempre están reguladas. Esto puede llevarte a tener grandes beneficios o grandes pérdidas rápidas. En nuestro curso sobre criptomonedas te enseñamos a gestionar riesgos para invertir de forma inteligente.",
  },
  {
    pregunta: "¿Cómo planificar mis finanzas personales para invertir?",
    respuesta:
      "Primero empieza por definir cuáles son tus objetivos, intenta ahorrar un porcentaje fijo de tus ingresos, aplicando la norma de nunca invertir dinero que no puedas permitirte perder. En la web de trading pro encontrarás guías prácticas gratuitas para ayudarte a planificar tu estrategia.",
  },
  {
    pregunta: "¿Qué pasos seguir para invertir como los grandes inversores?",
    respuesta:
      "Investiga a fondo los activos. Estudia las inversiones que están realizando los grandes inversores como Warren Buffet, Bill Gates o Stanley Druckenmiller. Diversifica tu cartera. Mantén la disciplina y paciencia.",
  },
  {
    pregunta: "¿Qué es la información privilegiada para invertir?",
    respuesta:
      "La información privilegiada se refiere a datos no públicos sobre empresas o mercados que pueden afectar su valor. Suelen tenerlo las personas que trabajan dentro de grandes empresas o Insiders, que tienen acceso a información privilegiada y por tanto se posicionan antes que la noticia llegue al público en general.",
  },
  {
    pregunta: "¿Cómo saber dónde invertir en cada momento del mercado?",
    respuesta:
      "Para saber dónde invertir, debes analizar tendencias económicas, datos históricos y proyecciones del mercado. Tienes que saber en qué etapa del mercado se encuentra ahora mismo, para poder adelantarte a los cambios que van a venir. Nuestra membresía de trading auditada te proporciona análisis semanal y asesoramiento para identificar las mejores oportunidades.",
  },
  // Preguntas sobre la Membresía
  {
    pregunta: "¿Puedo hacer la membresía cualquier día o va por plazos?",
    respuesta:
      "Sí, puedes unirte a la Membresía de TradingPRO en cualquier momento. El acceso es inmediato desde el momento en que te suscribes, sin importar el día del mes.",
  },
  {
    pregunta: "¿Qué incluye la Membresía de TradingPRO?",
    respuesta:
      "La membresía te da acceso a contenido exclusivo, análisis de mercado en vivo, estrategias avanzadas y comunidad privada con traders expertos.",
  },
  {
    pregunta: "¿Puedo cancelar la membresía cuando quiera?",
    respuesta:
      "Sí, puedes cancelar tu suscripción en cualquier momento desde tu perfil sin compromisos ni permanencia.",
  },
  // Preguntas sobre el Curso
  {
    pregunta: "¿El curso es adecuado para mí si no tengo ni idea de trading?",
    respuesta:
      "Sí. El curso está diseñado tanto para principiantes sin experiencia como para traders intermedios que quieren mejorar sus estrategias. Empezamos desde lo más básico y avanzamos hasta conceptos más técnicos.",
  },
  {
    pregunta: "¿Necesito experiencia previa o conocimientos en economía?",
    respuesta:
      "No es necesario. Todo está explicado desde cero y con un enfoque práctico para que cualquier persona pueda aprender.",
  },
  {
    pregunta: "¿Cuánto dura el curso?",
    respuesta:
      "El curso tiene una duración de aproximadamente 16 horas y es 100% online, puedes avanzar a tu propio ritmo. No hay un tiempo límite para completarlo.",
  },
  // Preguntas sobre Pagos y Suscripciones
  {
    pregunta: "¿Qué métodos de pago aceptan?",
    respuesta:
      "Aceptamos pagos con tarjeta de crédito/débito y transferencia bancaria.",
  },
  {
    pregunta: "¿Se puede pagar en cuotas?",
    respuesta:
      "Depende del plan que elijas. Algunas promociones permiten pago fraccionado. Contacta con nuestro servicio de soporte para más información: +34 623 24 30 01 o info@tradingpro.app",
  },
  // Preguntas sobre Soporte y Contacto
  {
    pregunta: "¿Cómo puedo contactar con el soporte?",
    respuesta:
      "Puedes escribirnos a través de nuestro formulario en la web, enviarnos un email a info@tradingpro.app o llamando / escribiendo un whatsapp al siguiente telefono: +34 623 24 30 01",
  },
];

export default function Faqs() {
  const [faqActivo, setFaqActivo] = useState(null);

  return (
    <div className="mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <Encabezado titulo="PREGUNTAS FRECUENTES" />
      <div className="mt-8 space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              className="w-full px-4 py-3 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#17498A] focus:ring-offset-2"
              onClick={() => setFaqActivo(faqActivo === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-[#17498A]">
                  {faq.pregunta}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    faqActivo === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>
            {faqActivo === index && (
              <div className="px-4 py-3 bg-gray-50">
                <p className="text-gray-600">{faq.respuesta}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
