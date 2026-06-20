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

const locales: Record<string, string> = {
  en: "en_US",
  fr: "fr_FR",
  ar: "ar_DZ",
};

const getLocale = (lang: string) => locales[lang] ?? "en_US";

const buildArticleMeta = (
  ogType: string | undefined,
  publishedTime?: string | Date,
  modifiedTime?: string | Date,
  articleTags?: string[],
) =>
  ogType === "article"
    ? {
        publishedTime: toIsoDate(publishedTime),
        modifiedTime: toIsoDate(modifiedTime),
        tags: articleTags && articleTags.length > 0 ? articleTags : undefined,
      }
    : undefined;

interface SeoOptions {
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
}

interface SeoInput {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImageUrl: string;
  ogType: "website" | "article";
  lang: string;
  ogImageAlt: string;
  publishedTime?: string | Date;
  modifiedTime?: string | Date;
  articleTags: string[];
  favicon: string;
}

function buildSeoOpenGraph({
  title,
  canonicalUrl,
  ogImageUrl,
  ogType,
  lang,
  ogImageAlt,
  description,
  publishedTime,
  modifiedTime,
  articleTags,
}: SeoInput) {
  return {
    basic: { title, type: ogType, image: ogImageUrl, url: canonicalUrl },
    optional: { description, locale: getLocale(lang) },
    image: { url: ogImageUrl, width: 1200, height: 630, alt: ogImageAlt },
    article: buildArticleMeta(ogType, publishedTime, modifiedTime, articleTags),
  };
}

function buildSeoTweet({
  title,
  description,
  ogImageUrl,
  ogImageAlt,
}: SeoInput) {
  return {
    card: "summary_large_image" as const,
    title,
    description,
    image: ogImageUrl,
    imageAlt: ogImageAlt,
  };
}

export function getSeoConfig(options?: SeoOptions) {
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

  const effectivePathname =
    lang === "en" ? pathname.replace(/^\/en(?:\/|$)/, "/") : pathname;
  const canonicalUrl = new URL(
    effectivePathname,
    siteConfig.siteUrl,
  ).toString();
  const ogImageUrl = toAbsoluteUrl(ogImage || siteConfig.ogImage);
  const openGraphImageAlt = ogImageAlt || `${title} preview image`;

  const input: SeoInput = {
    title,
    description,
    canonicalUrl,
    ogImageUrl,
    ogType,
    lang,
    ogImageAlt: openGraphImageAlt,
    publishedTime,
    modifiedTime,
    articleTags,
    favicon: siteConfig.favicon,
  };

  return {
    title,
    description,
    canonical: canonicalUrl,
    openGraph: buildSeoOpenGraph(input),
    twitter: buildSeoTweet(input),
    extend: {
      link: [
        { rel: "icon", type: "image/svg+xml", href: siteConfig.favicon },
        { rel: "apple-touch-icon", href: "/brand/logo-mark-256.png" },
      ],
      meta: [],
    },
  };
}
