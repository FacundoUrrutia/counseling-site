import "server-only";
import type es from "./es.json";

export type Locale = "en" | "es";

export const locales: Locale[] = ["en", "es"];
export const defaultLocale: Locale = "es";

/** `[lang]` is a plain (non-catch-all) dynamic segment, so it matches ANY
 *  single path chunk — /foo.png, /robots.txt, /whatever all resolve to this
 *  route with lang="foo.png" etc. Every route in app/[lang] must guard with
 *  this and call notFound() before touching the dictionary, or an unknown
 *  "locale" crashes trying to look up a dictionary loader that doesn't exist. */
export const isValidLocale = (value: string): value is Locale =>
  (locales as string[]).includes(value);

/** Single source of truth for the dictionary shape — derived from es.json
 *  instead of hand-written per-component interfaces, so a new key is
 *  type-checked everywhere it's used the moment it's added to the JSON. */
export type Dict = typeof es;

const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  es: () => import("./es.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dict> =>
  dictionaries[locale]();
