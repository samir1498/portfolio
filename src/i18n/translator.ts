import { getLangFromUrl } from './utils';
import { defaultLang } from './ui';
import en from './en/translations';
import fr from './fr/translations';

const translations = {
  en,
  fr,
};

export function useTranslations(url: URL) {
  const lang = getLangFromUrl(url);
  return function t(key: keyof typeof en) {
    return translations[lang][key] || translations[defaultLang][key];
  }
}
