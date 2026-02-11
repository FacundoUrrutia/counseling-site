import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "es"];
const defaultLocale = "en";

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  const preferredLocale = locales.find((locale) =>
    acceptLanguage.toLowerCase().includes(locale),
  );
  return preferredLocale || defaultLocale;
}

export function middleware(request: NextRequest) {
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
