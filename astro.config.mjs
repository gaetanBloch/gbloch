import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import tailwindcss from "tailwindcss";
import postcssImport from "postcss-import";
import postcssNesting from "tailwindcss/nesting";
import autoprefixer from "autoprefixer";

// https://astro.build/config
export default defineConfig({
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
