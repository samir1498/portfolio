import { Menu } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import NavThemeToggle from "./NavThemeToggle";

export default function MobileNav({
  isDark,
  onToggleTheme,
  onMenuClick,
}: {
  isDark: boolean;
  onToggleTheme: () => void;
  onMenuClick: () => void;
}) {
  return (
    <div className="flex md:hidden items-center gap-2">
      <LanguageSwitcher compact />
      <NavThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      <button
        onClick={onMenuClick}
        className="inline-flex items-center justify-center p-2 rounded-md text-muted hover:text-primary hover:bg-secondary focus:outline-none"
        aria-label="Toggle menu"
      >
        <Menu className="w-6 h-6" />
      </button>
    </div>
  );
}
