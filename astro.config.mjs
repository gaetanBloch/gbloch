import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import tailwindcss from 'tailwindcss';
import postcssImport from 'postcss-import';
import postcssNesting from 'tailwindcss/nesting';
import autoprefixer from 'autoprefixer';
// import netlify from '@astrojs/netlify/static'
import alpine from '@astrojs/alpinejs';
import solid from '@astrojs/solid-js';
import astroI18next from 'astro-i18next';
import sitemap from '@astrojs/sitemap';
// import vercelStatic from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  // adapter: vercelStatic(),
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en', // All urls that don't contain `ja` or `fr` after `https://gaetan-bloch.com/` will be treated as default locale, i.e. `en`
        locales: {
          en: 'en', // The `defaultLocale` value must present in `locales` keys
          fr: 'fr',
          ja: 'ja',
        },
      },
    }),
    tailwind(),
    alpine(),
    solid(),
    astroI18next(),
  ],
  vite: {
    server: {
      watch: {
        ignored: ['**/locales/**', '**/.idea/**'],
      },
    },
    css: {
      postcss: {
        plugins: [postcssImport, postcssNesting, tailwindcss, autoprefixer],
      },
    },
  },
});
