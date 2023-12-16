export interface Link {
  i18nKey: string;
  url: string;
}

export const links: Link[] = [
  {
    i18nKey: 'header.about',
    url: '/about',
  },
  {
    i18nKey: 'header.portfolio',
    url: '/portfolio',
  },
  {
    i18nKey: 'header.certifications',
    url: '/certifications',
  },
  {
    i18nKey: 'header.contact',
    url: '/contact',
  },
];
