"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const LanguageSwitcher = ({ currentLang }: { currentLang: string }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
  ];

  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  // Close on click outside, and on Escape — neither existed before, so the
  // menu used to stay open forever unless you clicked its own items.
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const changeLanguage = (langCode: string) => {
    const segments = pathname.split("/");
    segments[1] = langCode;
    const newPath = segments.join("/");
    // Force a full clean browser-level navigation to avoid App Router i18n "hanging" issues.
    // Deliberate full navigation inside a click handler, not a render-time mutation —
    // the compiler-oriented rule below can't tell the two apart for a global like this.
    // eslint-disable-next-line react-hooks/immutability
    window.location.href = newPath;
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative inline-block text-left">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="px-3 py-1.5 bg-ink/5 hover:bg-ink/10 border border-ink/5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5"
      >
        {/* The accessible name must contain the visible label (WCAG 2.5.3) —
            a separate aria-label like "Change language" that omits the
            visible "ES"/"EN" text fails that. Prefixing instead of
            replacing keeps both. */}
        <span className="sr-only">Idioma / Language: </span>
        <span>{currentLang === "en" ? "EN" : "ES"}</span>
        <span aria-hidden="true" className="text-[10px] opacity-60">
          ▼
        </span>
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Idiomas / Languages"
          className="absolute right-0 mt-2 w-32 origin-top-right rounded-xl bg-bg shadow-lg ring-1 ring-ink/5 overflow-hidden border border-divider z-10"
        >
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                role="menuitem"
                aria-current={currentLang === lang.code ? "true" : undefined}
                onClick={() => changeLanguage(lang.code)}
                className={`block w-full px-4 py-2 text-left text-sm ${
                  currentLang === lang.code
                    ? "bg-surface text-ink font-medium"
                    : "text-neutral-800 hover:bg-surface/60"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
