"use client";

import LanguageSwitcher from "../LanguageSwitcher";
import { whatsappUrl } from "@/lib/site";
import type { Dict } from "@/app/i18n/dictionaries";

interface NavProps {
  dict: Dict;
  lang: string;
}

const Nav = ({ dict, lang }: NavProps) => {
  const navItems = [
    { label: dict.nav.aboutMe, href: "#sobre-mi" },
    { label: dict.nav.specialties, href: "#especialidades" },
    { label: dict.nav.approach, href: "#enfoque" },
    { label: dict.nav.logistics, href: "#logistica" },
    { label: dict.nav.contact, href: "#contacto" },
  ];

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
        {dict.nav.brand}
      </a>

      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={(e) => handleScroll(e, item.href)}
          className="text-sm text-ink/80 hover:text-accent transition-colors no-underline whitespace-nowrap"
        >
          {item.label}
        </a>
      ))}

      <a
        href={whatsappUrl(dict.contactForm.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[13px] bg-accent-2-700 text-bg px-[18px] py-2.5 rounded-full whitespace-nowrap no-underline hover:bg-accent-2-800 transition-colors"
      >
        {dict.nav.whatsapp}
      </a>

      <LanguageSwitcher currentLang={lang} />
    </nav>
  );
};

export default Nav;
