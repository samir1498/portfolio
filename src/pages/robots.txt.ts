import type { APIRoute } from "astro";

const buildRobotsTxt = (site: URL | undefined) => {
  const base = site ?? new URL("https://samir-bettahar.dev");
  const sitemapIndex = new URL("/sitemap-index.xml", base).toString();

  return `User-agent: *
Allow: /

Sitemap: ${sitemapIndex}
`;
};

export const GET: APIRoute = ({ site }) =>
  new Response(buildRobotsTxt(site), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "all",
      Link: `<${new URL("/rss.xml", site ?? new URL("https://samir-bettahar.dev")).toString()}>; rel="alternate"; type="application/rss+xml"`,
    },
  });
