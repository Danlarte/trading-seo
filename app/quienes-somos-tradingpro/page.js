import SobreNosotros from "@/components/sobre-nosotros/Page";

export default function SobreNosotrosPage() {
  return <SobreNosotros />;
}

export async function generateMetadata() {
  return {
    title: "Quiénes Somos: Conoce a TradingPro y Nuestra Misión Educativa en el Mundo del Trading",
    description:
      "Descubre quiénes somos en TradingPro, una plataforma dedicada a ofrecer formación ",
    keywords: [
      "Plataforma educativa de trading",
      "Formación para traders",
      "Herramientas avanzadas para inversores",
      "Comunidad de traders y educadores",
      "Quiénes somos TradingPro"
    ],
  };
}
