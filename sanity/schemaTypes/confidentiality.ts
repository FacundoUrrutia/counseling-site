import { defineField, defineType } from "sanity";
import { LockIcon } from "@sanity/icons";

/** Singleton — the confidentiality note above the contact form.
 *
 *  Deliberately does NOT include the emergency hotline (Línea Vida,
 *  Uruguay's suicide-prevention number): that's a fixed institutional
 *  fact, not Ignacia's content, and stays hardcoded in
 *  components/Confidentiality/confidentiality.tsx so it can't be edited
 *  or blanked out by accident from the Studio. */
export default defineType({
  name: "confidentiality",
  title: "Confidencialidad",
  type: "document",
  icon: LockIcon,
  fields: [
    defineField({
      name: "text",
      title: "Texto",
      description: "El párrafo sobre secreto profesional.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Confidencialidad" }),
  },
});
