import * as en from "./en";
import * as fr from "./fr";
import * as ar from "./ar";

export type Lang = "en" | "fr" | "ar";

const data = { en, fr, ar };

export function getLocalizedData(lang: Lang) {
  return data[lang] || data.en;
}

// Re-export for direct access
export { en, fr, ar };
