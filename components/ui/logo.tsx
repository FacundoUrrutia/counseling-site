/**
 * Isologo horizontal — insertado inline (no <img src="...svg">) a propósito:
 * una imagen SVG externa corre en un contexto aislado que no hereda el CSS
 * de la página, así que var(--font-caprasimo)/var(--font-figtree) nunca
 * resolverían ahí — quedaría siempre con el fallback (Playfair Display /
 * Inter, que el sitio no carga). Inline, el texto sí hereda las variables
 * reales definidas en <body> (ver app/layout.tsx) y usa Caprasimo/Figtree
 * como el resto del sitio.
 *
 * El archivo fuente equivalente vive en public/logo/isologo-horizontal.svg
 * (para uso fuera de React, ej. compartir el asset) — mismo dibujo, mismo
 * fallback de fuente si se abre standalone.
 */
const Logo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 480 100"
    role="img"
    aria-label="Ignacia Ayala, Counselor"
    className={className}
  >
    <path
      d="M6,-8 C4,-28 24,-36 44,-32 C62,-28 70,-12 66,6 C62,22 46,32 28,30 C10,28 8,12 6,-8 Z"
      transform="translate(4,38) rotate(-6)"
      fill="#C1653E"
    />
    <path
      d="M6,-8 C4,-28 24,-36 44,-32 C62,-28 70,-12 66,6 C62,22 46,32 28,30 C10,28 8,12 6,-8 Z"
      transform="translate(28,58) scale(0.8) rotate(18)"
      fill="#4A3428"
    />
    <text x="112" y="54" fontFamily="var(--font-caprasimo)" fontSize="42" fill="#4A3428">
      Ignacia Ayala
    </text>
    <text
      x="114"
      y="76"
      fontFamily="var(--font-figtree)"
      fontSize="14"
      letterSpacing="3"
      fill="#C1653E"
    >
      COUNSELOR
    </text>
  </svg>
);

export default Logo;
