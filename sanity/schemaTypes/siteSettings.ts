import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

/**
 * Singleton — sitewide config and copy reused across multiple sections
 * (brand name, the two recurring CTA labels, WhatsApp contact details,
 * SEO metadata, footer credit). Edited as a single document; the Studio
 * structure (see ../structure.ts) hides "create new" for this type.
 */
export default defineType({
  name: "siteSettings",
  title: "Configuración del sitio",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "brandName",
      title: "Nombre de marca",
      description: 'Aparece en el header como link al inicio (ej. "Ignacia Ayala").',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "metaTitle",
      title: "Título de la página (SEO)",
      description: "Aparece en la pestaña del navegador y en resultados de Google.",
      type: "string",
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: "metaDescription",
      title: "Descripción de la página (SEO)",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "primaryCtaLabel",
      title: 'Texto del botón principal (ej. "Reservar una consulta")',
      description: "Se reutiliza en el hero, en Sobre mí y en Honorarios.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whatsappNavLabel",
      title: 'Texto corto de WhatsApp (ej. "WhatsApp")',
      description: "Se usa en el botón del menú de navegación.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whatsappFullLabel",
      title: 'Texto largo de WhatsApp (ej. "Escribime por WhatsApp")',
      description: "Se usa en el hero y en la sección de contacto.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whatsappNumber",
      title: "Número de WhatsApp",
      description: 'Formato internacional sin "+" ni espacios (ej. 59899076756).',
      type: "string",
      validation: (rule) =>
        rule
          .required()
          .regex(/^\d{8,15}$/, { name: "solo dígitos, sin +, espacios ni guiones" }),
    }),
    defineField({
      name: "whatsappMessage",
      title: "Mensaje pre-cargado de WhatsApp",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "footerCopyrightName",
      title: "Nombre en el copyright del footer",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "footerCredentialLabel",
      title: "Texto del link de credencial (footer)",
      description: 'Ej. "Perfil verificado en Psychology Today".',
      type: "string",
    }),
    defineField({
      name: "footerCredentialUrl",
      title: "URL del link de credencial (footer)",
      type: "url",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Configuración del sitio" }),
  },
});
