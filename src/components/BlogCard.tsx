import { ArrowUpRight } from "lucide-react";
import BlogMeta from "./BlogMeta";
import SeriesBadge from "./SeriesBadge";
import TagList from "./TagList";

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
          <BlogMeta
            pubDate={post.data.pubDate}
            readingTime={post.data.readingTime}
          />
          <div className="mx-3 h-px flex-1 bg-border/40 transition-colors group-hover:bg-primary/35" />
        </div>

        {post.data.seriesTitle && post.data.seriesOrder !== undefined && (
          <SeriesBadge
            title={post.data.seriesTitle}
            order={post.data.seriesOrder}
          />
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
        <TagList tags={post.data.tags} />
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
