"use client";

import { usePathname } from "next/navigation";
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

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string,
  ) => {
    if (!isHome) return;
    e.preventDefault();
    document.getElementById(hash.replace("#", ""))?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <nav className="flex items-center gap-5 md:gap-6 max-w-[1200px] mx-auto px-6 py-5 flex-wrap">
      <a
        href={isHome ? "#hero" : "/"}
        onClick={(e) => handleScroll(e, "#hero")}
        className="mr-auto no-underline flex items-center"
      >
        <Logo className="h-12 w-auto" />
      </a>

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
    </nav>
  );
};

export default Nav;
