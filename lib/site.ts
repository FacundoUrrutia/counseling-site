/**
 * Canonical site URL. No production domain has been confirmed yet, so this
 * falls back to a placeholder — set NEXT_PUBLIC_SITE_URL as a real env var
 * before deploying, or metadataBase/robots/sitemap will keep pointing at it.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://example-ignacia-ayala.com";
