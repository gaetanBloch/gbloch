/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly STRAPI_TOKEN: string;
  readonly STRAPI_URL: string;
  readonly GHOST_URL: string;
  readonly GHOST_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
