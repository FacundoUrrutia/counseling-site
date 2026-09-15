"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { whatsappUrl } from "@/lib/site";
import Logo from "@/components/ui/logo";
import type { SiteSettings } from "@/sanity/lib/queries";

// Labels de navegación: quedan fijos en código, no en Sanity — están
// acoplados 1:1 a los anchors (#sobre-mi, etc.) de cada sección. Editarlos
// desde el Studio sin saber que el href sigue apuntando al id viejo
// rompería el scroll silenciosamente.
const NAV_ITEMS = [
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Cómo trabajo", href: "#enfoque" },
  { label: "Honorarios", href: "#logistica" },
  { label: "Novedades", href: "#novedades" },
  { label: "Contacto", href: "#contacto" },
];

const Nav = ({ siteSettings }: { siteSettings: SiteSettings | null }) => {
  // Nav se reutiliza en /novedades y /novedades/[slug], que no tienen estas
  // secciones — ahí un anchor debe navegar de vuelta a "/#seccion" (deja que
  // el navegador lo resuelva), no intentar hacer scroll a un id inexistente
  // en la página actual.
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  // Mismo patrón que usaba el selector de idioma: Escape cierra y devuelve
  // el foco al botón que abrió, y el scroll del body se bloquea mientras el
  // drawer está abierto (es pantalla completa en mobile).
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string,
  ) => {
    if (!isHome) {
      setMenuOpen(false);
      return;
    }
    e.preventDefault();
    document.getElementById(hash.replace("#", ""))?.scrollIntoView({
      behavior: "smooth",
    });
    setMenuOpen(false);
  };

  return (
    <nav className="flex items-center gap-5 md:gap-6 max-w-[1200px] mx-auto px-6 py-5">
      <a
        href={isHome ? "#hero" : "/"}
        onClick={(e) => handleScroll(e, "#hero")}
        className="mr-auto no-underline flex items-center"
      >
        <Logo className="h-12 w-auto" />
      </a>

      {/* Desktop: links + WhatsApp inline, como siempre */}
      <div className="hidden md:flex items-center gap-5 lg:gap-6">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={isHome ? item.href : `/${item.href}`}
            onClick={(e) => handleScroll(e, item.href)}
            className="text-sm text-ink/80 hover:text-accent transition-colors no-underline whitespace-nowrap"
          >
            {item.label}
          </a>
        ))}

        {siteSettings && (
          <a
            href={whatsappUrl(siteSettings.whatsappNumber, siteSettings.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] bg-accent-2-700 text-bg px-[18px] py-2.5 rounded-full whitespace-nowrap no-underline hover:bg-accent-2-800 transition-colors"
          >
            {siteSettings.whatsappNavLabel}
          </a>
        )}
      </div>

      {/* Mobile: botón de hamburguesa, el resto vive en el drawer */}
      <button
        ref={menuButtonRef}
        type="button"
        onClick={() => setMenuOpen(true)}
        aria-label="Abrir menú"
        aria-haspopup="true"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        className="md:hidden p-2 -mr-2 text-ink"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Fondo oscuro detrás del drawer */}
      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={`md:hidden fixed inset-0 bg-ink/40 z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer — entra deslizando de derecha a izquierda */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={`md:hidden fixed top-0 right-0 h-dvh w-[78%] max-w-[320px] bg-bg shadow-lg z-50 transition-transform duration-300 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Cerrar menú"
            className="p-2 text-ink"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col px-8 pt-2 pb-8 gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={isHome ? item.href : `/${item.href}`}
              onClick={(e) => handleScroll(e, item.href)}
              className="py-3 text-base text-ink/80 hover:text-accent transition-colors no-underline border-b border-ink/[0.06]"
            >
              {item.label}
            </a>
          ))}

          {siteSettings && (
            <a
              href={whatsappUrl(siteSettings.whatsappNumber, siteSettings.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="mt-6 text-center text-sm bg-accent-2-700 text-bg px-[18px] py-3 rounded-full no-underline hover:bg-accent-2-800 transition-colors"
            >
              {siteSettings.whatsappNavLabel}
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
