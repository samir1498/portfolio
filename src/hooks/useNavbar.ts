import { useState, useEffect } from "react";
import { getNavLinks, getHomeHref } from "@/lib/navLinks";

export function useNavbar(lang: string, pathname: string) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const isHomePage = pathname === "/" || /^\/(fr|ar)\/?$/.test(pathname);
  const navLinks = getNavLinks(lang);
  const homeHref = getHomeHref(lang);

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

  return {
    isOpen,
    setIsOpen,
    scrolled,
    isDark,
    isHomePage,
    navLinks,
    homeHref,
    toggleTheme,
  };
}
