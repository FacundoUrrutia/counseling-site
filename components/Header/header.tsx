"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "motion/react";
import LanguageSwitcher from "../LanguageSwitcher";

interface HeaderProps {
  dict: {
    nav: {
      about: string;
      services: string;
      howIWork: string;
      contact: string;
    };
  };
  lang: string;
}

const Header = ({ dict, lang }: HeaderProps) => {
  const [isFloating, setIsFloating] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsFloating(latest > 50);
    });
  }, [scrollY]);

  const navItems = [
    { label: dict.nav.about, href: "#about" },
    { label: dict.nav.services, href: "#services" },
    { label: dict.nav.howIWork, href: "#how-i-work" },
    { label: dict.nav.contact, href: "#contact" },
  ];

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none p-4 md:p-6 transition-none">
      <motion.nav
        initial={false}
        animate={{
          width: "100%",
          maxWidth: isFloating ? "650px" : "1280px",
          backgroundColor: isFloating
            ? "rgba(255, 255, 255, 0.5)"
            : "rgba(255, 255, 255, 0)",
          backdropFilter: isFloating ? "blur(16px)" : "blur(0px)",
          borderRadius: isFloating ? "999px" : "0px",
          padding: isFloating ? "12px 32px" : "16px 32px",
          boxShadow: isFloating ? "0 10px 30px rgba(0,0,0,0.08)" : "none",
          border: isFloating
            ? "1px solid rgba(255,255,255,0.5)"
            : "1px solid rgba(255,255,255,0)",
          y: isFloating ? 10 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for a premium, snappy feel
        }}
        className="pointer-events-auto flex items-center justify-center gap-6 md:gap-12"
      >
        {/* Navigation Links */}
        <ul className="flex items-center gap-3 md:gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="text-[10px] sm:text-xs md:text-sm font-serif text-black/70 hover:text-black hover:scale-105 transition-all py-2 relative group whitespace-nowrap"
              >
                {item.label}
                <span className="absolute bottom-1 left-0 w-0 h-[1px] bg-black/40 group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* Language Switcher */}
        <div className="flex-shrink-0">
          <LanguageSwitcher currentLang={lang} />
        </div>
      </motion.nav>
    </header>
  );
};

export default Header;
