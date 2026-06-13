import type { Lang } from "@/data";

export type Translations<T extends string> = Record<T, Record<Lang, string>>;

function lookup<T extends string>(
  translations: Translations<T>,
  key: T,
  lang: Lang,
): string | undefined {
  return translations[key]?.[lang] ?? translations[key]?.en;
}

export function createTranslator<T extends string>(
  translations: Translations<T>,
  lang: Lang,
) {
  return function t(key: T): string {
    return lookup(translations, key, lang) ?? key;
  };
}
