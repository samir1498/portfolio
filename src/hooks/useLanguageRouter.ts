import { useState, useEffect } from "react";

const LANG_PATTERN = /^\/(en|fr|ar)(\/|$)/;

export function detectLanguage(path: string): string {
  const match = path.match(LANG_PATTERN);
  if (match) return match[1];
  if (path.startsWith("/fr")) return "fr";
  if (path.startsWith("/ar")) return "ar";
  return "en";
}

export function switchLanguagePath(newLang: string): string {
  const currentPath = window.location.pathname;
  const hash = window.location.hash;
  if (currentPath.startsWith("/blog/")) {
    return currentPath + hash;
  }
  if (LANG_PATTERN.test(currentPath)) {
    const stripped = currentPath.replace(LANG_PATTERN, "/");
    if (newLang === "en") return stripped + hash;
    return currentPath.replace(LANG_PATTERN, `/${newLang}/`) + hash;
  }
  if (currentPath === "/") return `/${newLang}/` + hash;
  return `/${newLang}${currentPath}` + hash;
}

export function useLanguageRouter() {
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    setCurrentLang(detectLanguage(window.location.pathname));
  }, []);

  const switchLanguage = (newLang: string) => {
    if (newLang !== currentLang) {
      window.location.href = switchLanguagePath(newLang);
    }
  };

  return { currentLang, switchLanguage };
}
