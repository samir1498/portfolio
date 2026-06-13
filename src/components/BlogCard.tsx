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

function articleClasses(single: boolean): string {
  const base =
    "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-page/70 backdrop-blur-[2px] transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10";
  return single ? `${base} p-8 md:p-9` : `${base} p-6`;
}

function titleClasses(single: boolean): string {
  const base =
    "font-bold leading-tight text-foreground transition-colors group-hover:text-primary";
  return single ? `${base} text-4xl` : `${base} text-2xl`;
}

function descriptionClasses(single: boolean): string {
  const base =
    "mt-4 line-clamp-3 leading-relaxed text-secondary-foreground/85 transition-colors group-hover:text-secondary-foreground";
  return single ? `${base} text-lg` : `${base} text-sm`;
}

function SeriesSection({ title, order }: { title?: string; order?: number }) {
  if (!title || order === undefined) return null;
  return <SeriesBadge title={title} order={order} />;
}

export default function BlogCard({
  post,
  single,
}: {
  post: Post;
  single: boolean;
}) {
  return (
    <article className={articleClasses(single)}>
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between gap-2">
          <BlogMeta
            pubDate={post.data.pubDate}
            readingTime={post.data.readingTime}
          />
          <div className="mx-3 h-px flex-1 bg-border/40 transition-colors group-hover:bg-primary/35" />
        </div>

        <SeriesSection
          title={post.data.seriesTitle}
          order={post.data.seriesOrder}
        />

        <h2 className={titleClasses(single)}>
          <a
            href={`/blog/${post.slug}/`}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-md"
          >
            {post.data.title}
          </a>
        </h2>

        <p className={descriptionClasses(single)}>{post.data.description}</p>
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
