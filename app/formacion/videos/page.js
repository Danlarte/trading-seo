export const metadata = {
  title: "Curso de Inversión y Trading: Formación Completa para Inversores | TradingPro ",
  description:
    "Aprende todo lo que necesitas sobre trading e inversión con nuestros cursos. Mejora tus habilidades financieras, aprende estrategias clave y toma decisiones informadas para invertir con éxito en los mercados.",
    keywords: [
      "Curso de inversión y trading",
      "Formación en mercados financieros",
      "Aprender trading e inversión",
      "Estrategias de trading",
      "Inversión en los mercados financieros"
    ],
};


import VideosGrid from "@/components/formacion/VideosGrid";
import { fetchVideos } from "@/libs/api";

export default async function VideosPage() {
  const initialData = await fetchVideos("Masterclass TradingPRO");

  return (
    <div>
      <VideosGrid
        categoria="Masterclass TradingPRO"
        initialData={initialData}
      />
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: "Videos Formativos | TradingPRO",
    description:
      "Explora nuestra colección de videos formativos sobre trading y finanzas.",
  };
}
