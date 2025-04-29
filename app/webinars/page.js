/** SEO ETIQUETAS PAGINA ESTÁTICA */

export const metadata = {
  title: "Webinars de Trading y Estrategias de Inversión | TradingPro",
  description:
    "Únete a nuestros webinars gratuitos y aprende de los expertos en trading e inversión. Obtén análisis de mercados en tiempo real y mejora tus habilidades de inversión en criptomonedas y más.",
    keywords: [
      "Webinars de trading",
      "Seminarios en línea de inversión",
      "Educación financiera en línea",
      "Aprender a invertir en criptomonedas",
      "Análisis de mercados en tiempo real"
    ],
};



import { Suspense } from "react";
import WebinarsContent from "@/components/webinars/WebinarsContent";



export default function WebinarsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Webinars Mensuales
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Formación exclusiva en vivo con análisis de mercado y estrategias de
          trading
        </p>
        <Suspense fallback={<div>Cargando webinars...</div>}>
          <WebinarsContent />
        </Suspense>
      </div>
    </main>
  );
}
