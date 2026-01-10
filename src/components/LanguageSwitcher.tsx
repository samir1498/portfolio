import React, { useState, useEffect, useRef } from "react";
import { Globe, Check } from "lucide-react";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  // Add more languages here:
  // { code: "ar", label: "العربية", flag: "🇩🇿" },
];

interface LanguageSwitcherProps {
  compact?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  compact = false,
}) => {
  const [currentLang, setCurrentLang] = useState("en");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = window.location.pathname;
    const match = path.match(/^\/(en|fr)\//);
    if (match) {
      setCurrentLang(match[1]);
    } else if (path.startsWith("/fr")) {
      setCurrentLang("fr");
    }
  }, []);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLanguage = (newLang: string) => {
    if (newLang === currentLang) {
      setIsOpen(false);
      return;
    }

    const currentPath = window.location.pathname;
    const hash = window.location.hash;
    let newPath: string;

    const langPattern = /^\/(en|fr)(\/|$)/;
    if (langPattern.test(currentPath)) {
      newPath = currentPath.replace(langPattern, `/${newLang}/`);
    } else {
      newPath = `/${newLang}/`;
    }

    window.location.href = newPath + hash;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 rounded-full bg-secondary text-muted hover:text-primary transition-colors focus:outline-none ${
          compact ? "px-2 py-1.5 text-xs" : "px-2.5 py-1.5 text-sm"
        } font-medium`}
        aria-label="Switch language"
        aria-expanded={isOpen}
      >
        <Globe className={compact ? "w-3.5 h-3.5" : "w-4 h-4"} />
        <span className="uppercase">{currentLang}</span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 p-1 bg-page border border-border rounded-lg shadow-xl min-w-[140px] z-[100]"
          style={{ top: "100%" }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                lang.code === currentLang
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:bg-secondary hover:text-foreground"
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span className="flex-1 text-left">{lang.label}</span>
              {lang.code === currentLang && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
