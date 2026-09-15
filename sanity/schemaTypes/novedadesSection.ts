import { defineField, defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons";

/** Singleton — heading for the Novedades section on the home page. Same
 *  pattern as specialtiesSection: the posts themselves are separate
 *  `novedad` documents. */
export default defineType({
  name: "novedadesSection",
  title: "Novedades (sección)",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Título de la sección",
      type: "string",
      initialValue: "Novedades",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Novedades (sección)" }),
  },
});
