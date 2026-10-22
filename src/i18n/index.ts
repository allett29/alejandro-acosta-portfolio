import { en } from "./en";
import { es } from "./es";
import type { Dictionary, Locale } from "./types";

export type { Dictionary, Locale, SkillCategory } from "./types";

export const dictionaries: Record<Locale, Dictionary> = { en, es };

export const defaultLocale: Locale = "en";

export const LOCALE_STORAGE_KEY = "portfolio-locale";

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
