import { PortableText, type PortableTextComponents, type PortableTextBlock } from "@portabletext/react";

/** Renders the `body` field of a novedad — Portable Text, not raw HTML
 *  (see sanity/schemaTypes/novedad.ts for why). Only two block styles
 *  exist in the schema (Normal, Destacado) and one mark (Negrita), so
 *  that's all this maps — anything else added to the schema later needs
 *  a matching entry here or it renders as plain unstyled text. */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-neutral-800 leading-relaxed last:mb-0">{children}</p>
    ),
    destacado: ({ children }) => (
      <p className="mb-4 p-4 bg-accent-100 border-l-4 border-accent-700 text-ink font-medium rounded-r-lg last:mb-0">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  },
};

const PortableTextBody = ({ value }: { value: PortableTextBlock[] }) => (
  <PortableText value={value} components={components} />
);

export default PortableTextBody;
