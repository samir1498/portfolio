const labels: Record<string, Record<string, string>> = {
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

export function getNavLinks(lang: string): NavLink[] {
  // fallow-ignore-next-line complexity
  const t = (key: string) => labels[key]?.[lang] ?? labels[key]?.en ?? key;

  return [
    { name: t("about"), href: "#about" },
    { name: t("blog"), href: "/blog" },
    { name: t("skills"), href: "#skills" },
    { name: t("experience"), href: "#experience" },
    { name: t("academic"), href: "#academic" },
    { name: t("projects"), href: "#showcase" },
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
