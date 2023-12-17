import config from '../../astro-i18next.config';
import i18next, { t } from 'i18next';

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

export const handleTrailingSlash = (path: string, trailingSlash = config['trailingSlash']) => {
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

export const interpolate = (
  i18nKey: string,
  referenceString: string,
  namespace: string | null = null,
): string => {
  const localizedString = t(i18nKey, { ns: namespace });

  if (localizedString === i18nKey) {
    console.warn(`WARNING(astro-i18next): missing translation key ${i18nKey}.`);
    return referenceString;
  }

  const tagsRegex = /<([\w\d]+)([^>]*)>/gi;

  const referenceStringMatches = referenceString.match(tagsRegex);

  if (!referenceStringMatches) {
    console.warn(
      'WARNING(astro-i18next): default slot does not include any HTML tag to interpolate! You should use the `t` function directly.',
    );
    return localizedString;
  }

  const referenceTags = [];
  referenceStringMatches.forEach(tagNode => {
    const [, name, attributes] = tagsRegex.exec(tagNode);
    referenceTags.push({ name, attributes });

    // reset regex state
    tagsRegex.exec('');
  });

  let interpolatedString = localizedString;
  for (let index = 0; index < referenceTags.length; index++) {
    const referencedTag = referenceTags[index];
    // Replace opening tags
    interpolatedString = interpolatedString.replaceAll(
      `<${index}>`,
      `<${referencedTag.name}${referencedTag.attributes}>`,
    );
    // Replace closing tags
    interpolatedString = interpolatedString.replaceAll(`</${index}>`, `</${referencedTag.name}>`);
  }

  return interpolatedString;
};

/**
 * Creates a reference string from an HTML string. The reverse of interpolate(), for use
 * with <Trans> when not explicitly setting a key
 */
export const createReferenceStringFromHTML = (html: string) => {
  // Allow these tags to carry through to the output
  const allowedTags = ['strong', 'br', 'em', 'i', 'b'];

  let forbiddenStrings: { key: string; str: string }[] = [];
  if (i18next.options) {
    forbiddenStrings = ['keySeparator', 'nsSeparator', 'pluralSeparator', 'contextSeparator']
      .map(key => {
        return {
          key,
          str: i18next.options[key],
        };
      })
      .filter(function <T>(val: T | undefined): val is T {
        return typeof val !== 'undefined';
      });
  }

  const tagsRegex = /<([\w\d]+)([^>]*)>/gi;

  const referenceStringMatches = html.match(tagsRegex);

  if (!referenceStringMatches) {
    console.warn(
      'WARNING(astro-i18next): default slot does not include any HTML tag to interpolate! You should use the `t` function directly.',
    );
    return html;
  }

  const referenceTags = [];
  referenceStringMatches.forEach(tagNode => {
    const [, name, attributes] = tagsRegex.exec(tagNode);
    referenceTags.push({ name, attributes });

    // reset regex state
    tagsRegex.exec('');
  });

  let sanitizedString = html.replace(/\s+/g, ' ').trim();
  for (let index = 0; index < referenceTags.length; index++) {
    const referencedTag = referenceTags[index];
    if (allowedTags.includes(referencedTag.name) && referencedTag.attributes.trim().length === 0) {
      continue;
    }
    sanitizedString = sanitizedString.replaceAll(
      new RegExp(`<${referencedTag.name}[^>]*?\\s*\\/>`, 'gi'),
      `<${index}/>`,
    );
    sanitizedString = sanitizedString.replaceAll(
      `<${referencedTag.name}${referencedTag.attributes}>`,
      `<${index}>`,
    );
    sanitizedString = sanitizedString.replaceAll(`</${referencedTag.name}>`, `</${index}>`);
  }

  for (let index = 0; index < forbiddenStrings.length; index++) {
    const { key, str } = forbiddenStrings[index];
    if (sanitizedString.includes(str)) {
      console.warn(
        `WARNING(astro-i18next): "${str}" was found in a <Trans> translation key, but it is also used as ${key}. Either explicitly set an i18nKey or change the value of ${key}.`,
      );
    }
  }
  return sanitizedString;
};
