import { Search } from "lucide-react";

interface NoResultsProps {
  onClear: () => void;
}

export default function NoResults({ onClear }: NoResultsProps) {
  return (
    <div className="mt-20 text-center">
      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full border border-border bg-secondary">
        <Search className="h-8 w-8 text-muted" />
      </div>
      <p className="text-lg text-muted">
        No articles found matching your criteria.
      </p>
      <button
        onClick={onClear}
        className="mt-4 text-sm font-medium text-primary transition-colors hover:text-primary"
      >
        Clear search filters
      </button>
    </div>
  );
}
