"use client";

import { whatsappUrl } from "@/lib/site";
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
  { label: "Contacto", href: "#contacto" },
];

const Nav = ({ siteSettings }: { siteSettings: SiteSettings | null }) => {
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    document.getElementById(href.replace("#", ""))?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <nav className="flex items-center gap-5 md:gap-6 max-w-[1200px] mx-auto px-6 py-5 flex-wrap">
      <a
        href="#hero"
        onClick={(e) => handleScroll(e, "#hero")}
        className="text-[19px] mr-auto no-underline text-ink"
      >
        {siteSettings?.brandName ?? "Ignacia Ayala"}
      </a>

      {NAV_ITEMS.map((item) => (
        <a
          key={item.href}
          href={item.href}
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
