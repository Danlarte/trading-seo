import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import PurchasesAdmin from "@/components/dashboard/PurchasesAdmin";
import PurchasesManagement from "@/components/dashboard/PurchasesManagement";
import ProductsWithUsers from "@/components/dashboard/ProductsWithUsers";
import User from "@/models/User";
import connectMongo from "@/libs/mongoose";

export const metadata = {
  title: "Administración de Compras | TradingPro",
  description: "Panel de administración de compras de usuarios",
};

export default async function PurchasesAdminPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login");
  }

  await connectMongo();

  // Verificar si el usuario es admin
  const user = await User.findOne({ email: session.user.email }).lean();

  if (!user || !user.isAdmin) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-[#17498A] mb-8 px-4">
          Administración de Compras
        </h1>
      </div>

      <section className="mb-12">
        <PurchasesAdmin />
      </section>
      <section>
        <ProductsWithUsers />
      </section>

      <section className="mb-12">
        <PurchasesManagement />
      </section>
    </div>
  );
}
