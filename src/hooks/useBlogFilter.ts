import { useMemo, useState } from "react";

interface Post {
  slug: string;
  data: {
    title: string;
    description: string;
    pubDate: Date;
    tags: string[];
    readingTime: number;
    series?: string;
    seriesTitle?: string;
    seriesOrder?: number;
  };
}

export function useBlogFilter(posts: Post[]) {
  const [activeTag, setActiveTag] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        const matchesSearch = post.data.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesTag =
          activeTag === "all" || post.data.tags.includes(activeTag);
        return matchesSearch && matchesTag;
      }),
    [posts, searchQuery, activeTag],
  );

  return {
    activeTag,
    setActiveTag,
    searchQuery,
    setSearchQuery,
    filteredPosts,
  };
}
