export interface Link {
  i18nKey: string;
  url: string;
}

export const links: Link[] = [
  {
    i18nKey: 'header.home',
    url: '/#home',
  },
  {
    i18nKey: 'header.about',
    url: '/#about',
  },
  {
    i18nKey: 'header.work',
    url: '/#work',
  },
  {
    i18nKey: 'header.education',
    url: '/#education',
  },
  {
    i18nKey: 'header.blog',
    url: '/#blog',
  },
  {
    i18nKey: 'header.testimonials',
    url: '/#testimonials',
  },
  {
    i18nKey: 'header.contact',
    url: '/#contact',
  },
];
