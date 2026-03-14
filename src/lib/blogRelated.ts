import type { CollectionEntry } from "astro:content";

export function getRelatedPosts(
  posts: CollectionEntry<"blog">[],
  slug: string,
  limit = 3,
) {
  const current = posts.find((post) => post.slug === slug);
  if (!current) return [];

  const currentTags = new Set(current.data.tags ?? []);
  if (currentTags.size === 0) return [];

  const scored = posts
    .filter((post) => post.slug !== slug)
    .map((post) => {
      const overlap = post.data.tags.filter((tag) => currentTags.has(tag));
      return {
        post,
        score: overlap.length,
        overlap,
      };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.post.data.pubDate.getTime() - a.post.data.pubDate.getTime();
    });

  return scored.slice(0, limit).map(({ post, overlap }) => ({
    slug: post.slug,
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.pubDate,
    tags: post.data.tags,
    overlap,
  }));
}
