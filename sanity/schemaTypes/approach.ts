import { defineField, defineType } from "sanity";
import { CaseIcon } from "@sanity/icons";

const imageField = (name: string, title: string) =>
  defineField({
    name,
    title,
    description: "Opcional — si se agrega, la card muestra la foto en vez de quedar solo con texto.",
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
  });

/** Singleton — "Cómo trabajo". Tres cards fijas (no una lista abierta):
 *  el layout está pensado para este trío exacto, así que se modelan como
 *  campos nombrados en vez de un array que un editor podría alargar sin
 *  que el diseño lo acompañe. Cada card tiene su propia imagen opcional —
 *  ninguna está atada a una sola foto fija como antes. */
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
    imageField("modalityImage", "Card 1 — imagen"),
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
    imageField("sessionDurationImage", "Card 2 — imagen"),
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
    imageField("firstConsultImage", "Card 3 — imagen"),
  ],
  preview: {
    prepare: () => ({ title: "Cómo trabajo" }),
  },
});
