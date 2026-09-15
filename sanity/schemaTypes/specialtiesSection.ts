import { defineField, defineType } from "sanity";
import { UlistIcon } from "@sanity/icons";

/** Singleton — heading + note for the Especialidades section (the actual
 *  specialty cards are separate `specialty` documents, since that list is
 *  the one real collection on the site). Same pattern as approach/logistics
 *  having their own `title`. */
export default defineType({
  name: "specialtiesSection",
  title: "Especialidades (sección)",
  type: "document",
  icon: UlistIcon,
  fields: [
    defineField({
      name: "title",
      title: "Título de la sección",
      type: "string",
      initialValue: "Especialidades",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sourceNote",
      title: "Nota bajo el título",
      description: "Ej. aclaración de fuente de la lista de especialidades.",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Especialidades (sección)" }),
  },
});
