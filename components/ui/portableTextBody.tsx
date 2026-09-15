import { PortableText, type PortableTextComponents, type PortableTextBlock } from "@portabletext/react";

/** Renders the `body` field of a novedad — Portable Text, not raw HTML
 *  (see sanity/schemaTypes/novedad.ts for why). Only what's in the schema
 *  is mapped here (2 block styles, 2 marks, 1 list type) — anything else
 *  added to the schema later needs a matching entry here or it renders as
 *  plain unstyled text. */
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
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 pl-5 list-disc space-y-1 text-neutral-800 leading-relaxed last:mb-0">
        {children}
      </ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

const PortableTextBody = ({ value }: { value: PortableTextBlock[] }) => (
  <PortableText value={value} components={components} />
);

export default PortableTextBody;
