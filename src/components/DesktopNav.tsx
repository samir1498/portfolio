import LanguageSwitcher from "./LanguageSwitcher";
import NavThemeToggle from "./NavThemeToggle";
import { withPrefix } from "@/lib/navLinks";
import type { NavLink } from "@/lib/navLinks";

export default function DesktopNav({
  navLinks,
  isHomePage,
  homeHref,
  isDark,
  onToggleTheme,
}: {
  navLinks: NavLink[];
  isHomePage: boolean;
  homeHref: string;
  isDark: boolean;
  onToggleTheme: () => void;
}) {
  return (
    <div className="hidden md:flex items-center gap-4">
      <div className="flex items-baseline space-x-6">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={withPrefix(link.href, isHomePage, homeHref)}
            className="text-muted hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>
      <LanguageSwitcher />
      <NavThemeToggle isDark={isDark} onToggle={onToggleTheme} />
    </div>
  );
}
