// src/config/seo.ts
// Shared SEO configuration for the portfolio

export const siteConfig = {
  siteUrl: "https://samir-bettahar.dev",
  defaultTitle: "Samir Bettahar - Software Engineer",
  defaultDescription:
    "Full-stack software engineer specialized in React, TypeScript, Next.js, and modern web development. View my portfolio and get in touch.",
  ogImage: "/og-image.png",
  favicon: "/logo.png",
};

export function getSeoConfig(options?: {
  title?: string;
  description?: string;
  lang?: string;
  pathname?: string;
}) {
  const {
    title = siteConfig.defaultTitle,
    description = siteConfig.defaultDescription,
    lang = "en",
    pathname = "/",
  } = options || {};

  const canonicalUrl = `${siteConfig.siteUrl}${pathname}`;
  const ogImageUrl = `${siteConfig.siteUrl}${siteConfig.ogImage}`;

  return {
    title,
    description,
    canonical: canonicalUrl,
    openGraph: {
      basic: {
        title,
        type: "website",
        image: ogImageUrl,
        url: canonicalUrl,
      },
      optional: {
        description,
        locale: lang === "fr" ? "fr_FR" : lang === "ar" ? "ar_DZ" : "en_US",
        siteName: "Samir Bettahar Portfolio",
      },
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      image: ogImageUrl,
    },
    extend: {
      link: [
        { rel: "icon", type: "image/png", href: siteConfig.favicon },
        { rel: "apple-touch-icon", href: siteConfig.favicon },
      ],
      meta: [],
    },
  };
}
