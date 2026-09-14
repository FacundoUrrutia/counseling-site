/**
 * Canonical site URL. No production domain has been confirmed yet, so this
 * falls back to a placeholder — set NEXT_PUBLIC_SITE_URL as a real env var
 * before deploying, or metadataBase/robots/sitemap will keep pointing at it.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://example-ignacia-ayala.com";

/**
 * Ignacia's WhatsApp number (099 076 756, Uruguay), in wa.me's required
 * format: no leading 0, country code prefixed, digits only.
 */
const WHATSAPP_NUMBER = "59899076756";

/** Builds a wa.me link that opens a chat with an optional pre-filled message. */
export const whatsappUrl = (message?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
