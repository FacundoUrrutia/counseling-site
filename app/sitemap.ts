import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/app/i18n/dictionaries";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [locale, `${SITE_URL}/${locale}`]),
        ),
      },
    },
    ...locales.map((locale) => ({
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}`]),
        ),
      },
      priority: locale === defaultLocale ? 1 : 0.9,
    })),
  ];
}
