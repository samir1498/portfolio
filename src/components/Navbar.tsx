import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import NavThemeToggle from "./NavThemeToggle";
import { getNavLinks, getHomeHref, withPrefix } from "@/lib/navLinks";

interface NavbarProps {
  lang?: string;
  pathname?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  lang: currentLang = "en",
  pathname = "/",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const isHomePage = pathname === "/" || /^\/(fr|ar)\/?$/.test(pathname);
  const navLinks = getNavLinks(currentLang);
  const homeHref = getHomeHref(currentLang);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const blogPath = window.location.pathname.startsWith("/blog");
    setScrolled(blogPath || window.scrollY > 20);

    const handleScroll = () => setScrolled(blogPath || window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

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

          {/* Desktop Nav */}
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
            <NavThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher compact />
            <NavThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted hover:text-primary hover:bg-secondary focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-page border-b border-border shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={withPrefix(link.href, isHomePage, homeHref)}
              onClick={() => setIsOpen(false)}
              className="text-muted hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
