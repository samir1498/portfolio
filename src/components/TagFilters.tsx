interface TagFiltersProps {
  tags: string[];
  active: string;
  onSelect: (tag: string) => void;
}

export default function TagFilters({
  tags,
  active,
  onSelect,
}: TagFiltersProps) {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-2">
      <button
        onClick={() => onSelect("all")}
        className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
          active === "all"
            ? "border-primary/50 bg-primary/10 text-primary shadow-sm"
            : "border-border/70 bg-page/60 text-secondary-foreground/80 hover:border-primary/40 hover:text-foreground"
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelect(tag)}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
            active === tag
              ? "border-primary/50 bg-primary/10 text-primary shadow-sm"
              : "border-border/70 bg-page/60 text-secondary-foreground/80 hover:border-primary/40 hover:text-foreground"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
