import config from '../../astro-i18next.config.ts';
import i18next from 'i18next';

/**
 * Returns the locale detected from a given path
 */
export const detectLocaleFromPath = (path: string) => {
  // remove all leading slashes
  path = path.replace(/^\/+/g, '');

  const { defaultLocale, locales } = config;

  const pathSegments = path.split('/');

  if (
    JSON.stringify(pathSegments) === JSON.stringify(['']) ||
    JSON.stringify(pathSegments) === JSON.stringify(['', ''])
  ) {
    return defaultLocale;
  }

  // make a copy of supported locales
  let otherLocales = [...locales];
  otherLocales = otherLocales.filter(locale => locale !== defaultLocale); // remove base locale (first index)

  // loop over all locales except the base one
  for (const otherLocale of otherLocales) {
    if (pathSegments[0] === otherLocale) {
      // if the path starts with one of the other locales, then detected!
      return otherLocale;
    }
  }

  // return default locale by default
  return defaultLocale;
};

export const localizePath = (
  path: string = '/',
  locale: string | null = null,
  base: string = import.meta.env.BASE_URL,
): string => {
  if (!locale) {
    locale = i18next.language;
  }

  let pathSegments = path.split('/').filter(segment => segment !== '');
  const baseSegments = base.split('/').filter(segment => segment !== '');

  if (JSON.stringify(pathSegments).startsWith(JSON.stringify(baseSegments).replace(/]+$/, ''))) {
    // remove base from path
    pathSegments.splice(0, baseSegments.length);
  }

  path = pathSegments.length === 0 ? '' : pathSegments.join('/');
  base = baseSegments.length === 0 ? '/' : '/' + baseSegments.join('/') + '/';

  const { flatRoutes, showDefaultLocale, defaultLocale, locales, trailingSlash } = config;

  if (!locales.includes(locale)) {
    console.warn(
      `WARNING(astro-i18next): "${locale}" locale is not supported, add it to the locales in your astro config.`,
    );
    return handleTrailingSlash(`${base}${path}`, trailingSlash);
  }

  if (pathSegments.length === 0) {
    if (showDefaultLocale) {
      return handleTrailingSlash(`${base}${locale}`, trailingSlash);
    }

    return handleTrailingSlash(locale === defaultLocale ? base : `${base}${locale}`, trailingSlash);
  }

  // check if the path is not already present in flatRoutes
  if (locale === defaultLocale) {
    const translatedPathKey = Object.keys(flatRoutes).find(key => flatRoutes[key] === '/' + path);
    if (typeof translatedPathKey !== 'undefined') {
      pathSegments = translatedPathKey.split('/').filter(segment => segment !== '');
    }
  }

  // remove locale from pathSegments (if there is any)
  for (const locale of locales) {
    if (pathSegments[0] === locale) {
      pathSegments.shift();
      break;
    }
  }

  // prepend the given locale if it's not the base one (unless showDefaultLocale)
  if (showDefaultLocale || locale !== defaultLocale) {
    pathSegments = [locale, ...pathSegments];
  }

  const localizedPath = base + pathSegments.join('/');

  // is path translated?
  if (Object.prototype.hasOwnProperty.call(flatRoutes, localizedPath.replace(/\/$/, ''))) {
    return handleTrailingSlash(flatRoutes[localizedPath.replace(/\/$/, '')], trailingSlash);
  }

  return handleTrailingSlash(localizedPath, trailingSlash);
};

export const handleTrailingSlash = (path: string, trailingSlash: config['trailingSlash']) => {
  if (path === '/') {
    return path;
  }

  switch (trailingSlash) {
    case 'always':
      return path.endsWith('/') ? path : path + '/';
    case 'never':
      return path.replace(/\/$/, '');
    default:
      return path;
  }
};
