import { defineField, defineType } from "sanity";
import { CaseIcon } from "@sanity/icons";

/** Singleton — "Cómo trabajo". Three fixed cards (not a repeatable list):
 *  the layout pairs the first one with a photo and is designed for
 *  exactly this trio, so it's modeled as named fields rather than an
 *  open-ended array an editor could freely add to. */
export default defineType({
  name: "approach",
  title: "Cómo trabajo",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      title: "Título de la sección",
      type: "string",
      initialValue: "Cómo trabajo",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "officePhoto",
      title: "Foto del consultorio",
      description: "Se muestra junto a la card de Modalidad.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "modalityTitle",
      title: "Card 1 — título",
      type: "string",
      initialValue: "Modalidad",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "modalityText",
      title: "Card 1 — texto (modalidad, dirección, días)",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sessionDurationTitle",
      title: "Card 2 — título",
      type: "string",
      initialValue: "Duración de sesión",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sessionDurationText",
      title: "Card 2 — texto",
      description:
        "Si se deja vacío, el sitio muestra la card marcada como PENDIENTE en vez de romper o mostrar un hueco en blanco.",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "firstConsultTitle",
      title: "Card 3 — título",
      type: "string",
      initialValue: "La primera consulta",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "firstConsultText",
      title: "Card 3 — texto",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Cómo trabajo" }),
  },
});
