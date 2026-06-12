import React, { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { useLanguageRouter } from "@/hooks/useLanguageRouter";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "ar", label: "العربية", flag: "🇩🇿" },
];

interface LanguageSwitcherProps {
  compact?: boolean;
}

function LangMenu({
  currentLang,
  onSelect,
  onClose,
}: {
  currentLang: string;
  onSelect: (code: string) => void;
  onClose: () => void;
}) {
  return (
    <div
      className="absolute right-0 mt-2 p-1 bg-page border border-border rounded-lg shadow-xl min-w-[140px] z-[100]"
      style={{ top: "100%" }}
    >
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => {
            onSelect(lang.code);
            onClose();
          }}
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
  );
}

function useDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return { isOpen, setIsOpen, ref };
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  compact = false,
}) => {
  const { currentLang, switchLanguage } = useLanguageRouter();
  const { isOpen, setIsOpen, ref } = useDropdown();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 rounded-full bg-secondary text-muted hover:text-primary transition-colors focus:outline-none ${
          compact ? "px-2 py-1.5 text-xs" : "px-2.5 py-1.5 text-sm"
        } font-medium`}
        aria-label={`${currentLang.toUpperCase()} - Switch language`}
        aria-expanded={isOpen}
      >
        <Globe className={compact ? "w-3.5 h-3.5" : "w-4 h-4"} />
        <span className="uppercase">{currentLang}</span>
      </button>

      {isOpen && (
        <LangMenu
          currentLang={currentLang}
          onSelect={switchLanguage}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSwitcher;
