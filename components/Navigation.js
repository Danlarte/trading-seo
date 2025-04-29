"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import ButtonSignin from "./ButtonSignin";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import PhoneNumberPrompt from "./PhoneNumberPrompt";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import NotificationIndicator from "./notifications/NotificationIndicator";
import NotificationList from "./notifications/NotificationList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getNavItems = (isAdmin) => {
  const items = [
    {
      text: "Noticias",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { text: "Actualidad", href: "/noticias/actualidad" },
        {
          text: "Análisis de Mercados",
          href: "/noticias/analisis-de-mercados",
        },
        { text: "Opinión", href: "/noticias/opinion" },
        { text: "Criptomonedas", href: "/noticias/criptomonedas" },
        {
          text: "Opiniones de Expertos",
          href: "/noticias/opiniones-de-expertos",
        },
      ],
    },
    {
      text: "Herramientas",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { text: "Webinars", href: "/webinars" },
        { text: "Gráficos", href: "/herramientas/graficos" },
        { text: "Superinvestors", href: "/herramientas/superinvestors" },
        { text: "Insiders", href: "/herramientas/insiders" },
        { text: "Interés compuesto", href: "/herramientas/calculadora" },
        { text: "Calendario económico", href: "/herramientas/calendario" },
        { text: "Precio objetivo de acciones", href: "/herramientas/acciones" },
      ],
    },
    {
      text: "Formación",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { text: "Más que Mercados", href: "/formacion/mas-que-mercados" },
        {
          text: "Curso Completo",
          href: "/formacion/cursos/inversion-y-trading",
        },
        { text: "Videos formativos", href: "/formacion/videos" },
        { text: "Membresía", href: "/landing" },
      ],
    },
    {
      text: "Tradingpro",
      href: "/sobre-nosotros",
      hasDropdown: false,
    },
  ];

  if (isAdmin) {
    items.push({
      text: "Administración",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { text: "Notificaciones", href: "/dashboard/notifications" },
        { text: "Compras", href: "/dashboard/purchases" },
      ],
    });
  }

  return items;
};

const useAdminStatus = (session) => {
  return useQuery({
    queryKey: ["adminStatus", session?.user?.email],
    queryFn: async () => {
      if (!session?.user?.email) return false;
      const response = await axios.get("/api/auth/me");
      return response.data?.isAdmin || false;
    },
    enabled: !!session?.user?.email,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { data: isAdmin = false } = useAdminStatus(session);
  const [showPhonePrompt, setShowPhonePrompt] = useState(false);

  const navItems = useMemo(() => getNavItems(isAdmin), [isAdmin]);

  const checkPhoneNumber = useCallback(async () => {
    if (status === "authenticated" && session?.user) {
      try {
        const response = await fetch("/api/update-phone", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        const data = await response.json();

        if (
          (!data.telefono || !data.nombre) &&
          !Cookies.get("phonePromptShown")
        ) {
          setShowPhonePrompt(true);
          // Establecer una cookie que expira en 1 hora
          Cookies.set("phonePromptShown", "true", { expires: 1 / 24 });
        }
      } catch (error) {
        console.error("Error al verificar los datos del perfil:", error);
      }
    }
  }, [status, session]);

  useEffect(() => {
    checkPhoneNumber();
    const interval = setInterval(checkPhoneNumber, 60000); // Verificar cada minuto
    return () => clearInterval(interval);
  }, [checkPhoneNumber]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handlePhoneSubmit = async (userData) => {
    try {
      const response = await fetch("/api/update-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: userData.phoneNumber,
          nombre: userData.nombre,
          apellidos: userData.apellidos,
          telegram: userData.telegram,
          email: session.user.email,
        }),
      });
      if (response.ok) {
        toast.success(
          "Información de perfil actualizada. ¡Disfruta de tu descuento!"
        );
        setShowPhonePrompt(false);
        Cookies.remove("phonePromptShown"); // Eliminar la cookie después de actualizar el número
        await checkPhoneNumber();
      } else {
        throw new Error("Error al actualizar la información de perfil");
      }
    } catch (error) {
      toast.error("Error al actualizar la información de perfil");
    }
  };

  const handleClosePrompt = () => {
    setShowPhonePrompt(false);
  };

  if (pathname === "/aprender-a-invertir" || pathname == "/video-clase")
    return null;

  return (
    <>
      <div className="flex flex-row fixed bg-white z-[99] w-full max-w-[1500px] mx-auto px-3 py-2 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/LOGO TRADINGPRO.png"
              alt="TradingPro Logo"
              width={100}
              height={100}
            />
          </Link>
        </div>

        {/* Enlaces de navegación (escritorio) */}
        <div className="hidden lg:flex items-center justify-center">
          <nav className="flex space-x-4">
            {navItems.map((item, index) => (
              <NavItem
                key={index}
                href={item.href}
                text={item.text}
                hasDropdown={item.hasDropdown}
                dropdownItems={item.dropdownItems}
              />
            ))}
          </nav>
        </div>

        {/* Botón de inicio de sesión y menú móvil */}
        <div className="flex items-center px-2 space-x-2">
          {session?.user && (
            <NotificationIndicator className="hidden lg:block" />
          )}
          <ButtonSignin text="Entrar" />
          <MobileMenuButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>
      </div>

      {/* Menú móvil mejorado */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-[100] transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold">Menú</h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto">
            {session?.user && (
              <div className="px-4 py-2 border-b">
                <div className="w-full">
                  <NotificationList
                    onClose={() => setMobileMenuOpen(false)}
                    isMobile={true}
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col p-4 space-y-4">
              {navItems.map((item, index) => (
                <MobileNavItem
                  key={index}
                  href={item.href}
                  text={item.text}
                  hasDropdown={item.hasDropdown}
                  dropdownItems={item.dropdownItems}
                />
              ))}
            </div>
          </nav>
          <div className="p-4 border-t">
            <ButtonSignin text="Entrar" extraStyle="w-full" />
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[99]"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
      {showPhonePrompt && (
        <PhoneNumberPrompt
          onSubmit={handlePhoneSubmit}
          onClose={handleClosePrompt}
        />
      )}
    </>
  );
}

function NavItem({ href, text, hasDropdown, dropdownItems }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={href}
        className="flex items-center px-1 sm:px-2 md:px-3 lg:px-4 py-1 md:py-2 rounded-md transition-colors duration-200 hover:bg-gray-100"
      >
        <span className="text-black font-bold uppercase text-[11px] sm:text-[12px] md:text-[14px] lg:text-[16px]">
          {text}
          {hasDropdown && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline-block ml-1 h-2 w-2 md:h-3 md:w-3 transition-transform duration-200 group-hover:rotate-180"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          )}
        </span>
      </Link>
      {hasDropdown && (
        <div
          className={`
            absolute top-full left-0 bg-white shadow-lg rounded-md py-1 mt-1 
            min-w-[140px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px] transition-all duration-200 transform origin-top 
            ${isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}
          `}
        >
          {dropdownItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block px-2 sm:px-3 md:px-4 py-1 md:py-2 text-[10px] sm:text-[11px] md:text-xs lg:text-sm text-black hover:bg-gray-100 transition-colors duration-150"
            >
              {item.text}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileNavItem({ href, text, hasDropdown, dropdownItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isOpen]);

  const handleClick = () => {
    if (hasDropdown) {
      setIsOpen(!isOpen);
    } else {
      router.push(href);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="w-full text-left text-black font-bold uppercase text-[17px] py-2 flex items-center justify-between"
      >
        {text}
        {hasDropdown && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`inline-block ml-1 h-3 w-3 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        )}
      </button>
      {hasDropdown && (
        <div
          ref={contentRef}
          className="bg-gray-50 rounded-md mt-1 overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: "0px", opacity: isOpen ? 1 : 0 }}
        >
          <div className="py-2 px-4 space-y-2">
            {dropdownItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block py-1 text-sm text-black hover:text-gray-600 transition-colors duration-150"
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileMenuButton({ onClick }) {
  return (
    <button className="lg:hidden text-black font-bold ml-4" onClick={onClick}>
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 24 24"
        height="24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
      </svg>
    </button>
  );
}

export default Navigation;
