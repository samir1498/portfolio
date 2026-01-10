import React from "react";
import { SOCIAL_LINKS } from "../data";
import { Send } from "lucide-react";

const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-24 bg-slate-50 dark:bg-dark relative border-t border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-8">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Let's Work Together
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
                I'm currently available for freelance projects or full-time
                opportunities. If you have a project that needs some creative
                direction or a robust technical solution, I'd love to hear from
                you.
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
                      className="flex items-center p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-primary transition-all group shadow-sm hover:shadow-md"
                    >
                      <div className="p-2 bg-blue-50 dark:bg-slate-800 rounded text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="ml-4 overflow-hidden">
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                          {link.label}
                        </p>
                        <p className="text-slate-700 dark:text-slate-200 font-medium truncate">
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
            className="animate-fade-in-up bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-none"
            style={{ animationDelay: "200ms" }}
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-darker border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-900 dark:text-white transition-all placeholder:text-slate-400"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-darker border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-900 dark:text-white transition-all placeholder:text-slate-400"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-darker border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-900 dark:text-white transition-all placeholder:text-slate-400 resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-300"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
