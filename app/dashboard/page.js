import ButtonAccount from "@/components/ButtonAccount";
import Carteras from "@/components/dashboard/Carteras";
import CarteraAcciones from "@/components/dashboard/CarteraAcciones";
import Researchs from "@/components/dashboard/Researchs";
import Webinar from "@/components/dashboard/Webinar";
import {
  fetchCarteras,
  fetchResearchs,
  fetchCarteraAcciones,
} from "@/libs/api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import DashboardAccordion from "@/components/dashboard/DashboardAccordion";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return {
    title: "Dashboard - TradingPro",
    description:
      "Accede a tu dashboard personalizado de TradingPro. Consulta el análisis diario, la cartera TradingPro y el research semanal.",
  };
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const plan = session.user.plan;
  const initialCarterasData = await fetchCarteras();
  const initialResearchsData = await fetchResearchs();
  const initialCarteraAccionesData = await fetchCarteraAcciones();

  const sections = [
    {
      title: "El Análisis Diario",
      content: <Webinar />,
      state: "expert",
    },
    {
      title: "Cartera TradingPRO",
      content: <Carteras initialData={initialCarterasData} />,
      state: "expert",
    },
    {
      title: "Cartera de Acciones",
      content: <CarteraAcciones initialData={initialCarteraAccionesData} />,
      state: "expert",
    },
    {
      title: "Research Semanal",
      content: <Researchs initialData={initialResearchsData} />,
      state: "expert",
    },
  ];

  return (
    <main className="min-h-screen p-4 sm:p-2 md:p-2 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6 sm:mb-9">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#17498a]">
            Dashboard
          </h1>
          <ButtonAccount />
        </div>

        <DashboardAccordion sections={sections} plan={plan} />
      </div>
    </main>
  );
}
