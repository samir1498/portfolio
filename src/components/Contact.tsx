import React from "react";
import { SOCIAL_LINKS } from "@/shared-data";
import { Send } from "lucide-react";
import { type Lang, en, fr } from "@/data";

interface ContactProps {
  lang: Lang;
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const { SECTIONS, CONTACT_FORM } = lang === "fr" ? fr : en;

  return (
    <section id="contact" className="py-24 bg-page border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        <div className="space-y-8">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              {SECTIONS.contact}
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-8">
              {SECTIONS.contactSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SOCIAL_LINKS.map((link, idx) => {
              const Icon = link.icon;
              return (
                <div
                  className="animate-fade-in-up"
                  key={idx}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-page border border-border rounded-lg hover:border-primary transition-all group shadow-sm hover:shadow-md"
                  >
                    <div className="p-2 bg-primary/10 rounded text-muted group-hover:text-primary transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="ml-4 overflow-hidden">
                      <p className="text-xs text-muted font-bold uppercase tracking-wider">
                        {link.label}
                      </p>
                      <p className="text-foreground font-medium truncate">
                        {link.value}
                      </p>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="animate-fade-in-up bg-page p-8 rounded-xl border border-border shadow-lg"
          style={{ animationDelay: "200ms" }}
        >
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-muted mb-2"
              >
                {CONTACT_FORM.name}
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 bg-page border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-foreground transition-all placeholder:text-muted"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-muted mb-2"
              >
                {CONTACT_FORM.email}
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-page border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-foreground transition-all placeholder:text-muted"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-muted mb-2"
              >
                {CONTACT_FORM.message}
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 bg-page border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-foreground transition-all placeholder:text-muted resize-none"
                placeholder={
                  lang === "fr"
                    ? "Décrivez votre projet..."
                    : "Tell me about your project..."
                }
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-all duration-300"
            >
              <Send className="w-4 h-4 mr-2" />
              {CONTACT_FORM.send}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
