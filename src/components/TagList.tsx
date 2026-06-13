export default function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.slice(0, 3).map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center rounded-full border border-border/70 bg-secondary/40 px-2.5 py-1 text-[11px] font-medium tracking-wide text-secondary-foreground/85"
        >
          {tag}
        </span>
      ))}
      {tags.length > 3 && (
        <span className="inline-flex items-center rounded-full border border-border/70 bg-secondary/40 px-2.5 py-1 text-[11px] font-medium tracking-wide text-secondary-foreground/85">
          +{tags.length - 3}
        </span>
      )}
    </div>
  );
}
