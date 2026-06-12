import type { Lang } from "@/data";

export type Translations<T extends string> = Record<T, Record<Lang, string>>;

export function createTranslator<T extends string>(
  translations: Translations<T>,
  lang: Lang,
) {
  return function t(key: T): string {
    // fallow-ignore-next-line complexity
    return translations[key]?.[lang] ?? translations[key]?.en ?? key;
  };
}
