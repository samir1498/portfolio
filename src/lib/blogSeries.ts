import type { CollectionEntry } from "astro:content";

export type SeriesContext = {
  series: string;
  seriesTitle: string;
  seriesOrder: number;
  total: number;
  posts: Array<{
    slug: string;
    title: string;
    seriesOrder: number;
  }>;
  previous?: { slug: string; title: string; seriesOrder: number };
  next?: { slug: string; title: string; seriesOrder: number };
};

const hasSeries = (post: CollectionEntry<"blog">) =>
  post.data.series &&
  post.data.seriesTitle &&
  post.data.seriesOrder !== undefined;

export function validateSeries(posts: CollectionEntry<"blog">[]) {
  const seen = new Map<string, Set<number>>();
  posts.forEach((post) => {
    if (!hasSeries(post)) return;
    const seriesId = post.data.series!;
    const order = post.data.seriesOrder!;
    const orders = seen.get(seriesId) ?? new Set<number>();
    if (orders.has(order)) {
      throw new Error(
        `Duplicate seriesOrder ${order} in series "${seriesId}" (post: ${post.slug})`,
      );
    }
    orders.add(order);
    seen.set(seriesId, orders);
  });
}

export function getSeriesContext(
  posts: CollectionEntry<"blog">[],
  slug: string,
): SeriesContext | null {
  const current = posts.find((post) => post.slug === slug);
  if (!current || !hasSeries(current)) return null;

  const seriesId = current.data.series!;
  const seriesTitle = current.data.seriesTitle!;
  const seriesOrder = current.data.seriesOrder!;
  const seriesPosts = posts
    .filter((post) => post.data.series === seriesId)
    .map((post) => ({
      slug: post.slug,
      title: post.data.title,
      seriesOrder: post.data.seriesOrder!,
    }))
    .sort((a, b) => a.seriesOrder - b.seriesOrder);

  const index = seriesPosts.findIndex((post) => post.slug === slug);
  const previous = index > 0 ? seriesPosts[index - 1] : undefined;
  const next =
    index >= 0 && index < seriesPosts.length - 1
      ? seriesPosts[index + 1]
      : undefined;

  return {
    series: seriesId,
    seriesTitle,
    seriesOrder,
    total: seriesPosts.length,
    posts: seriesPosts,
    previous,
    next,
  };
}
