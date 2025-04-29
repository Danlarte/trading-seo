import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Mi Perfil - TradingPro",
  description: "Gestiona tu información personal en TradingPro",
};

export default function ProfileLayout({ children }) {
  return (
    <>
      <div className="mt-[60px]">{children}</div>
    </>
  );
}
