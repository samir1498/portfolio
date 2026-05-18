// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import path from "path";
import { fileURLToPath } from "url";

// https://astro.build/config
export default defineConfig({
  site: "https://samir-bettahar.dev",
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: ["**/.unlighthouse/**", "**/.unlighthouse-ci/**"],
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "src"),
      },
    },
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
    quality: "mid",
  },
  integrations: [mdx(), react(), sitemap()],
  output: "static",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "ar"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
