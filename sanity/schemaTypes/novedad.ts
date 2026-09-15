import { defineField, defineType, defineArrayMember } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

/** Repeatable document — capacitaciones, reuniones y eventos que hoy se
 *  postean en Instagram, curados a mano en vez de sincronizados vía la
 *  API de Instagram (ver la conversación que llevó a esta decisión: sin
 *  tokens que vencen, sin dependencia de terceros, sin golpe de
 *  performance).
 *
 *  El campo `body` es Portable Text, no HTML crudo: le da a un editor no
 *  técnico negrita, saltos de línea/párrafo y un estilo "Destacado" para
 *  texto prioritario, con una barra de edición simple — sin el riesgo de
 *  que alguien rompa el formato escribiendo etiquetas a mano. */
export default defineType({
  name: "novedad",
  title: "Novedad",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      description: 'Se genera a partir del título — es la parte de la URL, ej. "/novedades/taller-de-duelo".',
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Imágenes",
      description: "Entre 1 y 3 imágenes.",
      type: "array",
      of: [
        defineArrayMember({
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
        }),
      ],
      validation: (rule) => rule.required().min(1).max(3),
    }),
    defineField({
      name: "description",
      title: "Descripción breve",
      description:
        "Se muestra en la card de la home y en el listado de /novedades — 1 a 2 líneas.",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: "body",
      title: "Texto",
      description:
        "Se muestra solo en la página individual del post. Seleccioná texto y usá el botón de negrita, o cambiá el estilo del párrafo a \"Destacado\" para resaltarlo.",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Destacado", value: "destacado" },
          ],
          lists: [],
          marks: {
            decorators: [{ title: "Negrita", value: "strong" }],
            annotations: [],
          },
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Fecha",
      description: "Determina el orden — la más nueva se muestra primero.",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Más reciente primero",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", media: "images.0", subtitle: "publishedAt" },
    prepare: ({ title, media, subtitle }) => ({
      title,
      media,
      subtitle: subtitle ? new Date(subtitle).toLocaleDateString("es-UY") : undefined,
    }),
  },
});
