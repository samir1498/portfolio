import * as en from "./en";
import * as fr from "./fr";

export type Lang = "en" | "fr";

const data = { en, fr };

export function getLocalizedData(lang: Lang) {
  return data[lang] || data.en;
}

// Re-export for direct access
export { en, fr };
