interface LabelEntry {
  en: string;
  fr: string;
  ar: string;
}

const labels: Record<string, LabelEntry> = {
  about: { en: "About", fr: "À propos", ar: "نبذة عني" },
  blog: { en: "Blog", fr: "Blog", ar: "المدونة" },
  skills: { en: "Skills", fr: "Compétences", ar: "المهارات" },
  experience: { en: "Experience", fr: "Expérience", ar: "الخبرة" },
  academic: { en: "Academic", fr: "Formation", ar: "التعليم" },
  projects: { en: "Projects", fr: "Projets", ar: "المشاريع" },
};

export interface NavLink {
  name: string;
  href: string;
}

function translateLabel(key: string, lang: string): string {
  const entry = labels[key];
  if (!entry) return key;
  return (entry as Record<string, string>)[lang] ?? entry.en;
}

export function getNavLinks(lang: string): NavLink[] {
  return [
    { name: translateLabel("about", lang), href: "#about" },
    { name: translateLabel("blog", lang), href: "/blog" },
    { name: translateLabel("skills", lang), href: "#skills" },
    { name: translateLabel("experience", lang), href: "#experience" },
    { name: translateLabel("academic", lang), href: "#academic" },
    { name: translateLabel("projects", lang), href: "#showcase" },
  ];
}

export function getHomeHref(lang: string): string {
  return lang === "fr" || lang === "ar" ? `/${lang}` : "/";
}

export function withPrefix(
  href: string,
  isHomePage: boolean,
  homeHref: string,
): string {
  if (!href.startsWith("#")) return href;
  return isHomePage ? href : `${homeHref}${href}`;
}
