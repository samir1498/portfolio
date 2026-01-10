// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import path from "path";
import { fileURLToPath } from "url";

// https://astro.build/config
export default defineConfig({
  site: "https://samir-bettahar.dev",
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "src"),
      },
    },
  },
  integrations: [react(), sitemap()],
  output: "static",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
