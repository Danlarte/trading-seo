export const metadata = {
  title: "Membresía TradingPRO: Accede a Herramientas Avanzadas y Formación Exclusiva | TradingPro ",
  description:
    "Únete a la membresía TradingPRO y obtén acceso a herramientas avanzadas, análisis exclusivo de mercado, estrategias de trading y formación especializada. Lleva tu trading al siguiente nivel con el apoyo de expertos.",
    keywords: [
      "Membresía de trading exclusiva",
      "Acceso a herramientas de trading",
      "Formación avanzada en trading",
      "Análisis de mercado exclusivo",
      "Membresía premium para traders"
    ],
};



import LandingPage from "@/components/landing/LandingPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return <LandingPage session={session} />;
}
