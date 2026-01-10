import { getLangFromUrl } from "./utils";
import { defaultLang } from "./ui";
import en from "./en/translations";
import fr from "./fr/translations";
import ar from "./ar/translations";

const translations = {
  en,
  fr,
  ar,
} as const;

export function useTranslations(url: URL) {
  const lang = getLangFromUrl(url) as keyof typeof translations;
  return function t(key: keyof typeof en) {
    return translations[lang]?.[key] || translations[defaultLang][key];
  };
}
