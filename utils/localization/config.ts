import { enUS as en, it } from "date-fns/locale";

export type Locale = (typeof locales)[number];

export const locales = ["en", "it"] as const;
export const dateLocales: any = { en, it };
export const languages = {
  en: "English",
  it: "Italiano",
};

export const defaultLocale: Locale = "en";
export const defaultMoneyLocale: string = "it-IT"; // TODO add support to other locales
