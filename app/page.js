import Link from "next/link";
import SliderHeroHome from "../components/home/SliderHeroHome";
import { fetchNoticias } from "@/libs/api";
import TickerTape from "@/components/TickerTape";
import Tweets from "@/components/home/Tweets";
import Noticia from "@/components/home/Noticia";
import Encabezado from "@/components/home/Encabezado";
import Image from "next/image";
import Venta from "@/components/home/Venta";
import LogosHome from "@/components/home/LogosHome";
import Pricing from "@/components/Pricing";
import Guias from "@/components/home/Guias";
import VideoblogSlider from "@/components/posts/VideoblogSlider";
import Acciones from "@/components/home/Acciones";

export default async function Page() {
  const initialData = await fetchNoticias();
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/entradas?accion=tweets`
  );
  const data = await response.json();

  return (
    <>
      <main className="mt-1">

      <section className="text-center my-8 px-4">
          <h1 className="text-3xl font-bold">
            Plataforma de Educación y Herramientas para Inversores
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg">
            En TradingPRO, ofrecemos formación completa, herramientas de análisis y recursos exclusivos para mejorar tus habilidades en trading e inversión. Únete a nuestra comunidad y comienza a invertir con éxito.
          </p>
        </section>
        <SliderHeroHome initialData={initialData} />
        <TickerTape />
        <Tweets initialData={data} />

        <div className="flex flex-row bg-white justify-center mt-8 items-start w-full gap-9 lg:flex-nowrap flex-wrap p-2">
          <div className="flex flex-col gap-3 items-center lg:w-1/2 w-full">
            <div className="flex flex-col gap-3 items-center h-[647px]">
              <Encabezado titulo="Últimas Noticias Bolsa" />
              <div className="flex-grow overflow-hidden">
                <Noticia categoriaExcluida="opiniones-de-expertos" />
              </div>
            </div>
          </div>
          <div className="flex flex-col p-0 gap-3 items-center lg:w-1/2 w-full">
            <div className="flex flex-col h-[647px] gap-3 items-center">
              <Encabezado titulo="Análisis Financieros" />
              <div className="flex-grow  overflow-hidden">
                <Noticia categoria="opiniones-de-expertos" />
              </div>
              <Acciones />
            </div>
          </div>
        </div>
        <VideoblogSlider />
        <Pricing />
        <Venta />
        <Guias />
        <Encabezado titulo="Partners y Colaboradores de TradingPRO" />
        <LogosHome />
      </main>
    </>
  );
}
/** SEO PAGINA DINAMICA */
export async function generateMetadata() {
  return {
    title: "Noticias de Trading y Actualidad Financiera | TradingPro",
    description:
      "TradingPro ofrece una plataforma de trading online para mejorar tus inversiones financieras. Aprende estrategias de trading con nuestros cursos y herramientas. Únete a nosotros y comienza a invertir hoy.",
      keywords: [
        "Plataforma de tradinng",
        "Trading online",
        "Inversiones financieras",
        "Curso de trading",
        "Estrategias de inversión",
      ],
    openGraph: {
      title: "Noticias de Trading y Actualidad Financiera | TradingPro",
      description:
        "TradingPro ofrece una plataforma de trading online para mejorar tus inversiones financieras. Aprende estrategias de trading con nuestros cursos y herramientas. Únete a nosotros y comienza a invertir hoy.",
      images: [{ url: "/og-image.jpg" }],
    },
  };
}
