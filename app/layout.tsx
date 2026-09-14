/**
 * Root layout — Next.js requires this file to exist so it has somewhere to
 * render routes that fall outside app/[lang] (the global not-found page,
 * and any request the locale-redirect proxy doesn't rewrite). Before this
 * file existed, those requests crashed with a 500 (see app/[lang]/layout.tsx
 * for where <html>/<body> and locale-specific chrome actually live).
 *
 * It stays a pure pass-through: app/[lang]/layout.tsx owns <html>/<body>
 * so it can set the correct lang="es" / lang="en" per request.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
