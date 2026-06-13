import { withPrefix } from "@/lib/navLinks";

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: { name: string; href: string }[];
  isHomePage: boolean;
  homeHref: string;
  onLinkClick: () => void;
}

export default function MobileMenu({
  isOpen,
  navLinks,
  isHomePage,
  homeHref,
  onLinkClick,
}: MobileMenuProps) {
  return (
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
            onClick={onLinkClick}
            className="text-muted hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
}
