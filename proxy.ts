import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, Locale } from "@/app/i18n/dictionaries";

/** Parses Accept-Language respecting q-values (instead of a naive
 *  .includes() scan) and returns the first supported locale, in the
 *  browser's actual preference order. */
function getLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  const preferred = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, qPart] = part.trim().split(";q=");
      return { tag: tag.toLowerCase().split("-")[0], q: qPart ? parseFloat(qPart) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  const match = preferred.find((p) => (locales as string[]).includes(p.tag));
  return (match?.tag as Locale) ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and static assets
    "/((?!_next|api|favicon.ico|images|.*\\..*).*)",
  ],
};
