"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const LanguageSwitcher = ({ currentLang }: { currentLang: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [viewList, setViewList] = useState(false);

  const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
  ];

  const changeLanguage = (langCode: string) => {
    const segments = pathname.split("/");
    segments[1] = langCode;
    const newPath = segments.join("/");
    // Force a full clean browser-level navigation to avoid App Router i18n "hanging" issues
    window.location.href = newPath;
    setViewList(false);
  };

  return (
    <div className="relative inline-block text-left z-50">
      <button
        onClick={() => setViewList(!viewList)}
        className="px-3 py-1.5 bg-black/5 hover:bg-black/10 border border-black/5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5"
      >
        <span>{currentLang === "en" ? "EN" : "ES"}</span>
        <span className="text-[10px] opacity-60">▼</span>
      </button>

      {viewList && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-32 origin-top rounded-xl bg-white/90 backdrop-blur-lg shadow-xl ring-1 ring-black/5 focus:outline-none overflow-hidden border border-white/20">
          <div className="py-1" role="none">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`block w-full px-4 py-2 text-left text-sm ${
                  currentLang === lang.code
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700 hover:bg-gray-50"
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
