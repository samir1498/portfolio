export default function SeriesBadge({
  title,
  order,
}: {
  title: string;
  order: number;
}) {
  return (
    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-secondary-foreground/80">
      <span>{title}</span>
      <span className="text-primary">Part {order}</span>
    </div>
  );
}
