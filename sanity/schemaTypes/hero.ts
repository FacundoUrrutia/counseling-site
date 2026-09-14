import { defineField, defineType } from "sanity";
import { SparklesIcon } from "@sanity/icons";

/** Singleton — the home hero. The specialties tag shown inline in the
 *  title is NOT a field here: it's computed from the `specialty` list
 *  (see sanity/lib/queries.ts) so it can't drift out of sync with the
 *  Especialidades section. */
export default defineType({
  name: "hero",
  title: "Hero (inicio)",
  type: "document",
  icon: SparklesIcon,
  fields: [
    defineField({
      name: "titleBefore",
      title: "Título — antes de las especialidades",
      description: 'Ej. "Te acompaño a atravesar". Las especialidades del listado de abajo se insertan justo después, y "Título — después" cierra la frase.',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titleAfter",
      title: "Título — después de las especialidades",
      description: 'Ej. "con escucha profesional."',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtítulo",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Hero (inicio)" }),
  },
});
