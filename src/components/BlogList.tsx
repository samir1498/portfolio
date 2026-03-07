import { useState, useEffect } from "react";
import { Search, Calendar, Tag, XCircle } from "lucide-react";

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
  const [posts, setPosts] = useState(initialPosts);
  const [activeTag, setActiveTag] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const filtered = initialPosts.filter((post) => {
      const matchesSearch = post.data.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesTag = activeTag === "all" || post.data.tags.includes(activeTag);
      return matchesSearch && matchesTag;
    });
    setPosts(filtered);
  }, [searchQuery, activeTag, initialPosts]);

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date(date));

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="relative mx-auto mt-12 max-w-xl group">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 opacity-50 blur transition duration-500 group-hover:opacity-100"></div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search className="h-5 w-5 text-muted transition-colors group-hover:text-primary" />
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full rounded-full border border-border/50 bg-page/80 py-4 pl-12 pr-4 text-foreground placeholder-muted backdrop-blur-xl focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 sm:text-sm transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted hover:text-foreground"
            >
              <XCircle className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filters */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setActiveTag("all")}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all backdrop-blur-sm ${
            activeTag === "all"
              ? "border-primary/30 bg-primary/10 text-primary shadow-sm"
              : "border-border/40 bg-secondary/30 text-muted hover:bg-secondary/60 hover:text-foreground hover:scale-105"
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all backdrop-blur-sm ${
              activeTag === tag
                ? "border-primary/30 bg-primary/10 text-primary shadow-sm"
                : "border-border/40 bg-secondary/30 text-muted hover:bg-secondary/60 hover:text-foreground hover:scale-105"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-secondary/10 border border-white/5 p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-secondary/20 hover:shadow-2xl hover:shadow-primary/5 ${
                isLoaded ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <time
                    dateTime={new Date(post.data.pubDate).toISOString()}
                    className="flex items-center gap-1.5 text-xs font-medium text-muted tracking-wider uppercase"
                  >
                    <Calendar className="w-3 h-3" />
                    {formatDate(post.data.pubDate)}
                  </time>
                  <div className="h-px flex-1 bg-border/30 mx-3 group-hover:bg-primary/20 transition-colors"></div>
                </div>

                <h3 className="text-2xl font-bold text-foreground transition-colors group-hover:text-primary leading-tight">
                  <a href={`/blog/${post.slug}/`} className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true"></span>
                    {post.data.title}
                  </a>
                </h3>

                <p className="mt-4 text-sm text-muted line-clamp-3 leading-relaxed group-hover:text-secondary-foreground/80 transition-colors">
                  {post.data.description}
                </p>
              </div>

              <div className="relative z-10 mt-8 flex flex-wrap gap-2">
                {post.data.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-md bg-secondary/40 px-2.5 py-1 text-xs font-medium text-secondary-foreground/70 ring-1 ring-inset ring-white/5 transition-colors group-hover:bg-secondary/60 group-hover:text-secondary-foreground"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
                {post.data.tags.length > 3 && (
                  <span className="inline-flex items-center rounded-md bg-secondary/40 px-2.5 py-1 text-xs font-medium text-secondary-foreground/70 ring-1 ring-inset ring-white/5">
                    +{post.data.tags.length - 3}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* No Results Message */
        <div className="mt-20 text-center animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/30 mb-4">
            <Search className="h-8 w-8 text-muted" />
          </div>
          <p className="text-lg text-muted">No articles found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveTag("all");
            }}
            className="mt-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Clear search filters
          </button>
        </div>
      )}
    </div>
  );
}
