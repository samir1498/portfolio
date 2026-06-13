import { useNavbar } from "@/hooks/useNavbar";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import MobileNav from "./MobileNav";

interface NavbarProps {
  lang?: string;
  pathname?: string;
}

export default function Navbar({
  lang: currentLang = "en",
  pathname = "/",
}: NavbarProps) {
  const {
    isOpen,
    setIsOpen,
    scrolled,
    isDark,
    isHomePage,
    navLinks,
    homeHref,
    toggleTheme,
  } = useNavbar(currentLang, pathname);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-page/90 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href={homeHref}
            onClick={() => setIsOpen(false)}
            className="flex-shrink-0 flex items-center gap-2 group"
            aria-label="Samir.Dev homepage"
          >
            <img
              src="/brand/logo-mark.svg"
              alt="Samir.Dev logo"
              className="w-9 h-9 rounded-lg ring-1 ring-primary/20 group-hover:ring-primary/45 transition-all"
            />
            <span className="text-xl font-bold text-foreground">Samir.Dev</span>
          </a>

          <DesktopNav
            navLinks={navLinks}
            isHomePage={isHomePage}
            homeHref={homeHref}
            isDark={isDark}
            onToggleTheme={toggleTheme}
          />

          <MobileNav
            isDark={isDark}
            onToggleTheme={toggleTheme}
            onMenuClick={() => setIsOpen((prev) => !prev)}
          />
        </div>
      </div>

      <MobileMenu
        isOpen={isOpen}
        navLinks={navLinks}
        isHomePage={isHomePage}
        homeHref={homeHref}
        onLinkClick={() => setIsOpen(false)}
      />
    </nav>
  );
}
