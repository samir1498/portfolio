export const siteConfig = {
  siteUrl: "https://samir-bettahar.dev",
  defaultTitle: "Samir.Dev | Full-Stack Software Engineer",
  defaultDescription:
    "Full-stack software engineer building modern web apps, scalable backend services, and practical engineering workflows.",
  ogImage: "/og/default.png",
  favicon: "/brand/favicon-brand.svg",
};

const toAbsoluteUrl = (url: string) =>
  /^https?:\/\//.test(url)
    ? url
    : `${siteConfig.siteUrl}${url.startsWith("/") ? url : `/${url}`}`;

const toIsoDate = (value?: string | Date) =>
  value ? new Date(value).toISOString() : undefined;

export function getSeoConfig(options?: {
  title?: string;
  description?: string;
  lang?: string;
  pathname?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: "website" | "article";
  publishedTime?: string | Date;
  modifiedTime?: string | Date;
  articleTags?: string[];
}) {
  const {
    title = siteConfig.defaultTitle,
    description = siteConfig.defaultDescription,
    lang = "en",
    pathname = "/",
    ogImage,
    ogImageAlt,
    ogType = "website",
    publishedTime,
    modifiedTime,
    articleTags = [],
  } = options || {};

  const canonicalUrl = new URL(pathname, siteConfig.siteUrl).toString();
  const ogImageUrl = toAbsoluteUrl(ogImage || siteConfig.ogImage);
  const openGraphImageAlt = ogImageAlt || `${title} preview image`;

  return {
    title,
    description,
    canonical: canonicalUrl,
    openGraph: {
      basic: {
        title,
        type: ogType,
        image: ogImageUrl,
        url: canonicalUrl,
      },
      optional: {
        description,
        locale: lang === "fr" ? "fr_FR" : lang === "ar" ? "ar_DZ" : "en_US",
      },
      image: {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: openGraphImageAlt,
      },
      article:
        ogType === "article"
          ? {
              publishedTime: toIsoDate(publishedTime),
              modifiedTime: toIsoDate(modifiedTime),
              tags: articleTags.length > 0 ? articleTags : undefined,
            }
          : undefined,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      image: ogImageUrl,
      imageAlt: openGraphImageAlt,
    },
    extend: {
      link: [
        { rel: "icon", type: "image/svg+xml", href: siteConfig.favicon },
        { rel: "apple-touch-icon", href: "/brand/logo-mark-256.png" },
      ],
      meta: [],
    },
  };
}
