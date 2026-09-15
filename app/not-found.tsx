import Link from "next/link";

/**
 * Ya no necesita su propio <html>/<body> — con un solo root layout
 * (app/layout.tsx) esta página se anida ahí normalmente, como cualquier
 * otra ruta. La complejidad anterior (not-found con su propio html/body
 * bilingüe) era consecuencia del split [lang], que ya no existe.
 */
export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center gap-3 px-8 text-center">
      <p className="m-0 text-sm text-neutral-600">404</p>
      <p className="m-0 text-lg text-ink">Página no encontrada</p>
      <Link href="/" className="text-accent-700 hover:text-accent-800 transition-colors">
        Volver al inicio
      </Link>
    </div>
  );
}
