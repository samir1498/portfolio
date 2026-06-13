import { Calendar, Clock3 } from "lucide-react";

export default function BlogMeta({
  pubDate,
  readingTime,
}: {
  pubDate: Date;
  readingTime: number;
}) {
  const formatted = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(pubDate));

  return (
    <div className="mb-4 flex items-center gap-3">
      <time
        dateTime={new Date(pubDate).toISOString()}
        className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-secondary-foreground/80"
      >
        <Calendar className="h-3 w-3" />
        {formatted}
      </time>
      <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-secondary-foreground/80">
        <Clock3 className="h-3 w-3" />
        {readingTime} min read
      </span>
    </div>
  );
}
