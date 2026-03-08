import type { APIRoute } from "astro";

const buildSitemapAlias = (site: URL | undefined) => {
  const base = site ?? new URL("https://samir-bettahar.dev");
  const sitemapIndex = new URL("/sitemap-index.xml", base).toString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${sitemapIndex}</loc>
  </sitemap>
</sitemapindex>`;
};

export const GET: APIRoute = ({ site }) =>
  new Response(buildSitemapAlias(site), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
