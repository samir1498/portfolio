import { Calendar, Clock3, ArrowUpRight } from "lucide-react";

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

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(date));

export default function BlogCard({
  post,
  single,
}: {
  post: Post;
  single: boolean;
}) {
  return (
    <article
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-page/70 backdrop-blur-[2px] transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 ${
        single ? "p-8 md:p-9" : "p-6"
      }`}
    >
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <time
              dateTime={new Date(post.data.pubDate).toISOString()}
              className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-secondary-foreground/80"
            >
              <Calendar className="h-3 w-3" />
              {formatDate(post.data.pubDate)}
            </time>
            <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-secondary-foreground/80">
              <Clock3 className="h-3 w-3" />
              {post.data.readingTime} min read
            </span>
          </div>
          <div className="mx-3 h-px flex-1 bg-border/40 transition-colors group-hover:bg-primary/35" />
        </div>

        {post.data.seriesTitle && post.data.seriesOrder !== undefined && (
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-secondary-foreground/80">
            <span>{post.data.seriesTitle}</span>
            <span className="text-primary">Part {post.data.seriesOrder}</span>
          </div>
        )}

        <h2
          className={`font-bold leading-tight text-foreground transition-colors group-hover:text-primary ${
            single ? "text-4xl" : "text-2xl"
          }`}
        >
          <a
            href={`/blog/${post.slug}/`}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-md"
          >
            {post.data.title}
          </a>
        </h2>

        <p
          className={`mt-4 line-clamp-3 leading-relaxed text-secondary-foreground/85 transition-colors group-hover:text-secondary-foreground ${
            single ? "text-lg" : "text-sm"
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
              className="inline-flex items-center rounded-full border border-border/70 bg-secondary/40 px-2.5 py-1 text-[11px] font-medium tracking-wide text-secondary-foreground/85"
            >
              {tag}
            </span>
          ))}
          {post.data.tags.length > 3 && (
            <span className="inline-flex items-center rounded-full border border-border/70 bg-secondary/40 px-2.5 py-1 text-[11px] font-medium tracking-wide text-secondary-foreground/85">
              +{post.data.tags.length - 3}
            </span>
          )}
        </div>

        <a
          href={`/blog/${post.slug}/`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          Read
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}
