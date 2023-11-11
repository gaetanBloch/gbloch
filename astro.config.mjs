import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import tailwindcss from "tailwindcss";
import postcssImport from "postcss-import";
import postcssNesting from "tailwindcss/nesting";
import autoprefixer from "autoprefixer";
import netlify from '@astrojs/netlify/functions';

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: netlify(),
  integrations: [
    tailwind(),
  ],
  vite: {
    css: {
      postcss: {
        plugins: [postcssImport, postcssNesting, tailwindcss, autoprefixer],
      },
    },
  },
});
