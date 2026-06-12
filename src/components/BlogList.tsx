import { useMemo, useState } from "react";
import { Search, XCircle } from "lucide-react";
import BlogCard from "./BlogCard";
import TagFilters from "./TagFilters";
import NoResults from "./NoResults";

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

interface BlogListProps {
  initialPosts: Post[];
  allTags: string[];
}

function useBlogFilter(posts: Post[]) {
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

export default function BlogList({ initialPosts, allTags }: BlogListProps) {
  const {
    activeTag,
    setActiveTag,
    searchQuery,
    setSearchQuery,
    filteredPosts,
  } = useBlogFilter(initialPosts);

  const isSinglePost = filteredPosts.length === 1;

  return (
    <div className="w-full">
      <div className="relative mx-auto mt-12 max-w-xl">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-secondary text-primary">
            <Search className="h-4 w-4" />
          </div>
        </div>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full rounded-xl border border-border bg-page py-3.5 pl-14 pr-10 text-foreground placeholder-muted focus:border-primary focus:outline-none sm:text-sm transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted hover:text-foreground"
          >
            <XCircle className="h-5 w-5" />
          </button>
        )}
      </div>

      <TagFilters tags={allTags} active={activeTag} onSelect={setActiveTag} />

      {filteredPosts.length > 0 ? (
        <div
          className={
            isSinglePost
              ? "mt-16 max-w-3xl mx-auto text-left"
              : "mt-16 grid gap-6 text-left sm:grid-cols-2 xl:grid-cols-3"
          }
        >
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} single={isSinglePost} />
          ))}
        </div>
      ) : (
        <NoResults
          onClear={() => {
            setSearchQuery("");
            setActiveTag("all");
          }}
        />
      )}
    </div>
  );
}
