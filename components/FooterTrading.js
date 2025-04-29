"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";

const FooterTrading = () => {
  const pathname = usePathname();
  if (pathname === "/aprender-a-invertir" || pathname == "/video-clase")
    return null;

  return (
    <footer className="bg-gradient-to-r from-[#17498a] to-[#54bcaf] mt-10 text-white">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/">
              <Image
                src="/LOGO TRADINGPRO.png"
                alt="TradingPro Logo"
                width={150}
                height={75}
                className="mb-4 brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-center md:text-left">
              TradingPRO: Tu plataforma de educación financiera y análisis de
              mercados.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/noticias/actualidad"
                  className="hover:text-[#54BCAF] transition-colors"
                >
                  Noticias
                </Link>
              </li>
              <li>
                <Link
                  href="/herramientas/graficos"
                  className="hover:text-[#54BCAF] transition-colors"
                >
                  Herramientas
                </Link>
              </li>
              <li>
                <Link
                  href="/formacion/mas-que-mercados"
                  className="hover:text-[#54BCAF] transition-colors"
                >
                  Formación
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="hover:text-[#54BCAF] transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre-nosotros"
                  className="hover:text-[#54BCAF] transition-colors"
                >
                  Sobre nosotros
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/aviso-legal"
                  className="hover:text-[#54BCAF] transition-colors"
                >
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-cookies"
                  className="hover:text-[#54BCAF] transition-colors"
                >
                  Política de cookies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a
                href="https://t.me/tradingprobasagoiti"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#54BCAF] transition-colors"
              >
                <FaTelegram size={24} />
              </a>
              <a
                href="https://instagram.com/tradingpromedia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#54BCAF] transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.tiktok.com/@tradingpromedia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#54BCAF] transition-colors"
              >
                <FaTiktok size={24} />
              </a>
              <a
                href="https://twitter.com/TradingPROmedia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#54BCAF] transition-colors"
              >
                <FaXTwitter size={24} />
              </a>
              <a
                href="https://youtube.com/@tradingPROmedia?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#54BCAF] transition-colors"
              >
                <FaYoutube size={24} />
              </a>
              <a
                href="https://facebook.com/tradingproapp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#54BCAF] transition-colors"
              >
                <FaFacebook size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} TradingPRO. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterTrading;
