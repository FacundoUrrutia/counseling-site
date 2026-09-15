import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";

/** Repeatable document — the one genuine collection on this site. Shown
 *  both as cards in "Especialidades" and, as a joined tag list, inline in
 *  the hero title (see sanity/lib/queries.ts) — a single source instead
 *  of keeping the hero's tag text in sync by hand. */
export default defineType({
  name: "specialty",
  title: "Especialidad",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Título",
      description: 'Ej. "Duelo", "Ansiedad".',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Orden",
      description: "Determina el orden de aparición — menor número va primero.",
      type: "number",
      validation: (rule) => rule.required().integer(),
    }),
  ],
  orderings: [
    {
      title: "Orden de despliegue",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
