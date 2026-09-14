import Link from "next/link";

/**
 * Global not-found — catches any request that never reaches app/[lang]
 * (an unmatched URL with a dot in it, which the proxy's matcher deliberately
 * skips; see proxy.ts). Bilingual by necessity: there's no locale segment
 * to read a dictionary from here.
 */
export default function GlobalNotFound() {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          padding: "2rem",
          textAlign: "center",
          background: "#f5ead8",
          color: "#201e1d",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <p style={{ margin: 0, fontSize: "0.875rem", opacity: 0.7 }}>404</p>
        <p style={{ margin: 0, fontSize: "1.125rem" }}>
          Página no encontrada · Page not found
        </p>
        <Link href="/es" style={{ color: "#b2622d" }}>
          Volver al inicio · Back home
        </Link>
      </body>
    </html>
  );
}
