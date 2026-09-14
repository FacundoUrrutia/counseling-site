import { defineField, defineType } from "sanity";
import { CreditCardIcon } from "@sanity/icons";

/** Singleton — "Honorarios y logística". Same reasoning as approach.ts:
 *  three fixed, named cards instead of an open list. */
export default defineType({
  name: "logistics",
  title: "Honorarios y logística",
  type: "document",
  icon: CreditCardIcon,
  fields: [
    defineField({
      name: "title",
      title: "Título de la sección",
      type: "string",
      initialValue: "Honorarios y logística",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sourceNote",
      title: "Nota bajo el título",
      description: "Aclaración sobre la vigencia de estos datos, si corresponde.",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "feesTitle",
      title: "Card 1 — título",
      type: "string",
      initialValue: "Honorarios",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "feesText",
      title: "Card 1 — texto (precios, moneda, formas de pago)",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "insuranceTitle",
      title: "Card 2 — título",
      type: "string",
      initialValue: "Obra social / prepaga",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "insuranceText",
      title: "Card 2 — texto",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cancellationTitle",
      title: "Card 3 — título",
      type: "string",
      initialValue: "Política de cancelación",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cancellationText",
      title: "Card 3 — texto",
      description:
        "Si se deja vacío, el sitio muestra la card marcada como PENDIENTE.",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Honorarios y logística" }),
  },
});
