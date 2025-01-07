import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://dicky54putra.com",
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  markdown: {
    shikiConfig: {
      wrap: true,
      themes: {
        light: "one-dark-pro",
        dark: "one-dark-pro",
      },
    },
  },
});
