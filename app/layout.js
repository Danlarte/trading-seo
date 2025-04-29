import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { getSEOTags } from "@/libs/seo";
import ClientLayout from "@/components/LayoutClient";
import config from "@/config";
import "./globals.css";
import Navigation from "@/components/Navigation";
import FooterTrading from "@/components/FooterTrading";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";

const font = Inter({ subsets: ["latin"] });

export const viewport = {
  // Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
  themeColor: config.colors.main,
  width: "device-width",
  initialScale: 1,
};

export const metadata = getSEOTags();

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const reducedPadding = headersList.get("x-reduced-padding") === "true";

  return (
    <html lang="es" data-theme={config.colors.theme} className={font.className}>
      <Analytics />
      <GoogleTagManager gtmId="GTM-TRV2D456" />
      <body>
        {/* ClientLayout contains all the client wrappers (Crisp chat support, toast messages, tooltips, etc.) */}
        <ClientLayout>
          <Navigation />
          <div className={`${reducedPadding ? "pt-[25px]" : "pt-[60px]"}`}>
            {children}
          </div>
          <FooterTrading />
        </ClientLayout>
      </body>
    </html>
  );
}
