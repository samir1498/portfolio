import React, { useState } from "react";
import { SOCIAL_LINKS } from "@/shared-data";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { type Lang, getLocalizedData } from "@/data";

// Web3Forms access key
const WEB3FORMS_ACCESS_KEY = "96fbb359-4d6b-4c3e-a7c4-fa7ec80a7bda";

interface ContactProps {
  lang: Lang;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const { SECTIONS, CONTACT_FORM } = getLocalizedData(lang);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact: ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        // Reset to idle after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const statusMessages = {
    success:
      lang === "ar"
        ? "تم إرسال الرسالة!"
        : lang === "fr"
        ? "Message envoyé !"
        : "Message sent!",
    error:
      lang === "ar"
        ? "خطأ. حاول مرة أخرى."
        : lang === "fr"
        ? "Erreur. Réessayez."
        : "Error. Please try again.",
  };

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
                      <Icon />
                    </div>
                    <div className="rtl:mr-4 ltr:ml-4 overflow-hidden flex-1">
                      <p className="text-xs text-muted font-bold uppercase tracking-wider mb-1">
                        {link.label}
                      </p>
                      <p
                        className="text-foreground font-medium truncate rtl:text-right"
                        dir="ltr"
                      >
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
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-page border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-foreground transition-all placeholder:text-muted"
                placeholder={CONTACT_FORM.placeholderName}
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
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-page border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-foreground transition-all placeholder:text-muted"
                placeholder={CONTACT_FORM.placeholderEmail}
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
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-page border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-foreground transition-all placeholder:text-muted resize-none"
                placeholder={CONTACT_FORM.placeholderMessage}
              ></textarea>
            </div>

            {/* Status Messages */}
            {status === "success" && (
              <div className="flex items-center gap-2 text-green-500 bg-green-500/10 p-3 rounded-lg">
                <CheckCircle className="w-5 h-5 rtl:ml-2 ltr:mr-2" />
                <span>{statusMessages.success}</span>
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5 rtl:ml-2 ltr:mr-2" />
                <span>{statusMessages.error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <Loader2 className="w-4 h-4 rtl:ml-2 ltr:mr-2 animate-spin" />
              ) : (
                <Send className="w-4 h-4 rtl:ml-2 ltr:mr-2 rtl:-scale-x-100" />
              )}
              {status === "loading"
                ? lang === "ar"
                  ? "جاري الإرسال..."
                  : lang === "fr"
                  ? "Envoi..."
                  : "Sending..."
                : CONTACT_FORM.send}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
