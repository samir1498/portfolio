export const languages = {
  en: "English",
  fr: "Français",
  ar: "العربية",
};

export const defaultLang = "en";

// RTL languages
export const rtlLanguages = ["ar"];

export function isRtl(lang: string): boolean {
  return rtlLanguages.includes(lang);
}
