export default function OutputDisplay({ output }: { output: string[] }) {
  return (
    <div className="max-h-64 overflow-y-auto border-t border-border bg-black/10 p-4 font-mono text-xs leading-relaxed dark:bg-white/5">
      {output.map((line, i) => (
        <div
          key={i}
          className={
            line.startsWith("Error")
              ? "text-red-500"
              : line.startsWith("---")
                ? "font-semibold text-primary"
                : "text-secondary-foreground"
          }
        >
          {line}
        </div>
      ))}
    </div>
  );
}
