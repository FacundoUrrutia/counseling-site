import siteSettings from "./siteSettings";
import hero from "./hero";
import aboutMe from "./aboutMe";
import specialtiesSection from "./specialtiesSection";
import specialty from "./specialty";
import approach from "./approach";
import logistics from "./logistics";
import confidentiality from "./confidentiality";
import novedadesSection from "./novedadesSection";
import novedad from "./novedad";

export const schemaTypes = [
  siteSettings,
  hero,
  aboutMe,
  specialtiesSection,
  specialty,
  approach,
  logistics,
  confidentiality,
  novedadesSection,
  novedad,
];

/** Document type names with exactly one instance — used by structure.ts
 *  to hide "create new" and by the seed script to know which _id to fix. */
export const SINGLETON_TYPES = new Set([
  "siteSettings",
  "hero",
  "aboutMe",
  "specialtiesSection",
  "approach",
  "logistics",
  "confidentiality",
  "novedadesSection",
]);
