/**
 * Canonical site URL. No production domain has been confirmed yet, so this
 * falls back to a placeholder — set NEXT_PUBLIC_SITE_URL as a real env var
 * before deploying, or robots.txt/sitemap.xml will keep pointing at it.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://example-ignacia-ayala.com";

/** Builds a wa.me link. `number` is siteSettings.whatsappNumber from
 *  Sanity (international format, digits only — no longer hardcoded here
 *  now that it's editable content). */
export const whatsappUrl = (number: string, message?: string) =>
  `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
