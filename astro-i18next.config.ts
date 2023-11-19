import type { AstroI18nextConfig } from 'astro-i18next';

const config: AstroI18nextConfig = {
  defaultLocale: 'en',
  locales: ['en', 'fr', 'ja'],
  i18nextServer: {
    debug: true,
  },
  i18nextBrowser: {
    debug: true,
  },
  flatRoutes: {},
  showDefaultLocale: false,
  trailingSlash: 'never',
};

export default config;
