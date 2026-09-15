import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

/** Singleton — "Sobre mí": bio, retrato, y el bloque de credenciales.
 *  Los dos campos de credenciales quedan como texto libre (no como booleano
 *  "pendiente") porque hoy reflejan hechos confirmados — que no tenga
 *  matrícula es un dato real, no un placeholder. */
export default defineType({
  name: "aboutMe",
  title: "Sobre mí",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "title",
      title: "Título",
      description: 'Ej. "Soy Ignacia Ayala, Counselor profesional".',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtítulo",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Texto de presentación",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Retrato",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          description: "Obligatorio por accesibilidad — describí la foto.",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "credentialsFormationLabel",
      title: "Credenciales — etiqueta de formación",
      type: "string",
      initialValue: "Formación",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "credentialsFormationValue",
      title: "Credenciales — formación (contenido real)",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "credentialsRegistrationLabel",
      title: "Credenciales — etiqueta de matrícula/colegio",
      type: "string",
      initialValue: "Matrícula / colegio profesional",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "credentialsRegistrationValue",
      title: "Credenciales — matrícula/colegio (contenido real)",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "credentialsSourceNote",
      title: "Nota de fuente de las credenciales",
      description: "De dónde salen estos datos y cualquier aclaración relevante.",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "title", media: "photo" },
  },
});
