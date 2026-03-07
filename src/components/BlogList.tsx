import { useMemo, useState } from "react";
import { Search, Calendar, Tag, XCircle, ArrowUpRight } from "lucide-react";

interface Post {
  slug: string;
  data: {
    title: string;
    description: string;
    pubDate: Date;
    tags: string[];
  };
}

interface BlogListProps {
  initialPosts: Post[];
  allTags: string[];
}

export default function BlogList({ initialPosts, allTags }: BlogListProps) {
  const [activeTag, setActiveTag] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(
    () =>
      initialPosts.filter((post) => {
        const matchesSearch = post.data.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesTag =
          activeTag === "all" || post.data.tags.includes(activeTag);
        return matchesSearch && matchesTag;
      }),
    [initialPosts, searchQuery, activeTag],
  );

  const isSinglePost = filteredPosts.length === 1;

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date(date));

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

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setActiveTag("all")}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            activeTag === "all"
              ? "border-primary/60 bg-page text-primary"
              : "border-border bg-secondary text-muted hover:bg-page hover:text-foreground"
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTag === tag
                ? "border-primary/60 bg-page text-primary"
                : "border-border bg-secondary text-muted hover:bg-page hover:text-foreground"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {filteredPosts.length > 0 ? (
        <div
          className={
            isSinglePost
              ? "mt-16 max-w-3xl mx-auto text-left"
              : "mt-16 grid gap-6 text-left sm:grid-cols-2 xl:grid-cols-3"
          }
        >
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-secondary transition-colors hover:border-primary/50 ${
                isSinglePost ? "p-8 md:p-9" : "p-6"
              }`}
            >
              <div className="relative z-10">
                <div className="mb-4 flex items-center justify-between gap-2">
                  <time
                    dateTime={new Date(post.data.pubDate).toISOString()}
                    className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted"
                  >
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.data.pubDate)}
                  </time>
                  <div className="mx-3 h-px flex-1 bg-border/40 transition-colors group-hover:bg-primary/35" />
                </div>

                <h3
                  className={`font-bold leading-tight text-foreground transition-colors group-hover:text-primary ${
                    isSinglePost ? "text-4xl" : "text-2xl"
                  }`}
                >
                  <a
                    href={`/blog/${post.slug}/`}
                    className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-md"
                  >
                    {post.data.title}
                  </a>
                </h3>

                <p
                  className={`mt-4 line-clamp-3 leading-relaxed text-muted transition-colors group-hover:text-secondary-foreground/85 ${
                    isSinglePost ? "text-lg" : "text-sm"
                  }`}
                >
                  {post.data.description}
                </p>
              </div>

              <div className="relative z-10 mt-7 flex items-end justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {post.data.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-md border border-border bg-page px-2.5 py-1 text-xs font-medium text-secondary-foreground/85"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                  {post.data.tags.length > 3 && (
                    <span className="inline-flex items-center rounded-md border border-border bg-page px-2.5 py-1 text-xs font-medium text-secondary-foreground/85">
                      +{post.data.tags.length - 3}
                    </span>
                  )}
                </div>

                <a
                  href={`/blog/${post.slug}/`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/85"
                >
                  Read
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-20 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full border border-border bg-secondary">
            <Search className="h-8 w-8 text-muted" />
          </div>
          <p className="text-lg text-muted">
            No articles found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveTag("all");
            }}
            className="mt-4 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Clear search filters
          </button>
        </div>
      )}
    </div>
  );
}
