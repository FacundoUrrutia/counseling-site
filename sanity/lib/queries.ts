import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

/** Image field shape as it comes back from a GROQ query with no
 *  projection on the field — the raw stored object, which is exactly
 *  what @sanity/image-url's urlFor() expects. SanityImageSource is a
 *  union, so this is an intersection type, not an `interface extends`. */
export type SanityImageWithAlt = SanityImageSource & { alt: string };

export interface SiteSettings {
  brandName: string;
  metaTitle: string;
  metaDescription: string;
  primaryCtaLabel: string;
  whatsappNavLabel: string;
  whatsappFullLabel: string;
  whatsappNumber: string;
  whatsappMessage: string;
  footerCopyrightName: string;
  footerCredentialLabel: string | null;
  footerCredentialUrl: string | null;
}

export interface Hero {
  titleBefore: string;
  titleAfter: string;
  subtitle: string;
}

export interface AboutMe {
  title: string;
  subtitle: string;
  text: string;
  photo: SanityImageWithAlt;
  credentialsFormationLabel: string;
  credentialsFormationValue: string;
  credentialsRegistrationLabel: string;
  credentialsRegistrationValue: string;
  credentialsSourceNote: string | null;
}

export interface SpecialtiesSection {
  title: string;
  sourceNote: string | null;
}

export interface Specialty {
  title: string;
  description: string;
}

export interface Approach {
  title: string;
  officePhoto: SanityImageWithAlt;
  modalityTitle: string;
  modalityText: string;
  sessionDurationTitle: string;
  sessionDurationText: string | null;
  firstConsultTitle: string;
  firstConsultText: string;
}

export interface Logistics {
  title: string;
  sourceNote: string | null;
  feesTitle: string;
  feesText: string;
  insuranceTitle: string;
  insuranceText: string;
  cancellationTitle: string;
  cancellationText: string | null;
}

export interface Confidentiality {
  text: string;
}

export interface HomePageData {
  siteSettings: SiteSettings | null;
  hero: Hero | null;
  aboutMe: AboutMe | null;
  specialtiesSection: SpecialtiesSection | null;
  specialties: Specialty[];
  approach: Approach | null;
  logistics: Logistics | null;
  confidentiality: Confidentiality | null;
}

const SITE_SETTINGS_FIELDS = /* groq */ `
  brandName, metaTitle, metaDescription, primaryCtaLabel,
  whatsappNavLabel, whatsappFullLabel, whatsappNumber, whatsappMessage,
  footerCopyrightName, footerCredentialLabel, footerCredentialUrl
`;

const HERO_FIELDS = /* groq */ `titleBefore, titleAfter, subtitle`;

const ABOUT_ME_FIELDS = /* groq */ `
  title, subtitle, text, photo,
  credentialsFormationLabel, credentialsFormationValue,
  credentialsRegistrationLabel, credentialsRegistrationValue,
  credentialsSourceNote
`;

const SPECIALTIES_SECTION_FIELDS = /* groq */ `title, sourceNote`;

const SPECIALTY_FIELDS = /* groq */ `title, description`;

const APPROACH_FIELDS = /* groq */ `
  title, officePhoto,
  modalityTitle, modalityText,
  sessionDurationTitle, sessionDurationText,
  firstConsultTitle, firstConsultText
`;

const LOGISTICS_FIELDS = /* groq */ `
  title, sourceNote,
  feesTitle, feesText,
  insuranceTitle, insuranceText,
  cancellationTitle, cancellationText
`;

const CONFIDENTIALITY_FIELDS = /* groq */ `text`;

/** One round trip for the whole home page — every section's content in a
 *  single GROQ query instead of one fetch per component. */
export const HOME_PAGE_QUERY = /* groq */ `{
  "siteSettings": *[_type == "siteSettings"][0]{ ${SITE_SETTINGS_FIELDS} },
  "hero": *[_type == "hero"][0]{ ${HERO_FIELDS} },
  "aboutMe": *[_type == "aboutMe"][0]{ ${ABOUT_ME_FIELDS} },
  "specialtiesSection": *[_type == "specialtiesSection"][0]{ ${SPECIALTIES_SECTION_FIELDS} },
  "specialties": *[_type == "specialty"] | order(order asc) { ${SPECIALTY_FIELDS} },
  "approach": *[_type == "approach"][0]{ ${APPROACH_FIELDS} },
  "logistics": *[_type == "logistics"][0]{ ${LOGISTICS_FIELDS} },
  "confidentiality": *[_type == "confidentiality"][0]{ ${CONFIDENTIALITY_FIELDS} }
}`;

/** Metadata only needs siteSettings — generateMetadata() uses this instead
 *  of the full HOME_PAGE_QUERY so a metadata-only request stays cheap. */
export const SITE_SETTINGS_QUERY = /* groq */ `*[_type == "siteSettings"][0]{ ${SITE_SETTINGS_FIELDS} }`;
