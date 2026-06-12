import { Sun, Moon } from "lucide-react";

interface NavThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export default function NavThemeToggle({
  isDark,
  onToggle,
}: NavThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-full bg-secondary text-muted hover:text-primary transition-colors focus:outline-none"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
