import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: { site: URL | undefined }) {
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );

  return rss({
    title: "Samir.Dev Blog",
    description:
      "Engineering notes, Java deep dives, experiments, and practical software lessons.",
    site: context.site ?? "https://samir-bettahar.dev",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}/`,
      categories: post.data.tags,
    })),
  });
}
