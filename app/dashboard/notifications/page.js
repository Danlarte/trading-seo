import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import NotificationsAdmin from "@/components/dashboard/NotificationsAdmin";
import User from "@/models/User";
import connectMongo from "@/libs/mongoose";

export const metadata = {
  title: "Administración de Notificaciones | TradingPro",
  description: "Panel de administración de notificaciones",
};

export default async function NotificationsAdminPage() {
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
      <NotificationsAdmin />
    </div>
  );
}
