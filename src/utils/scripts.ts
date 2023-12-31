import type { GhostPost, MDXInstance, Post, SimplePost } from '../types';

export function sortMDByDate(posts: MDXInstance<Post>[] = []) {
  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.publishDate).valueOf() - new Date(a.frontmatter.publishDate).valueOf(),
  );
}

// This function expects the @arg posts to be sorted by sortMDByDate()
export function getPreviousAndNextPosts(currentSlug: string, posts: MDXInstance<Post>[] = []) {
  const index = posts.findIndex(({ url }) => url === currentSlug);
  return {
    prev: posts[index + 1] ?? null,
    next: posts[index - 1] ?? null,
  };
}

export function getAllTags(posts: MDXInstance<Post>[] = []) {
  const allTags = new Set<string>();
  posts.forEach(post => {
    post.frontmatter.tags?.map(tag => allTags.add(tag.toLowerCase()));
  });
  return [...allTags];
}

export function getAllTagsWithCount(posts: MDXInstance<Post>[] = []): {
  [key: string]: number;
} {
  return posts.reduce((prev, post) => {
    const currTags = { ...prev };
    post.frontmatter.tags?.forEach(function (tag) {
      currTags[tag] = (currTags[tag] || 0) + 1;
    });
    return currTags;
  }, {});
}

export function toggleClass(element: HTMLElement, className: string) {
  element.classList.toggle(className);
}

export function elementHasClass(element: HTMLElement, className: string) {
  return element.classList.contains(className);
}

export function getLocaleTime(
  date: number | Date,
  options: Intl.DateTimeFormatOptions = {},
  locale: string | string[] = 'en-GB',
) {
  const formatOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  };
  return new Intl.DateTimeFormat(locale, formatOptions).format(date);
}

export function mdxToSimplePost(post: MDXInstance<Post>): SimplePost {
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    url: post.url,
    publishDate: post.frontmatter.publishDate,
  };
}

export function ghostToSimplePost(post: GhostPost): SimplePost {
  return {
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    // url: post.url,
    url: '/posts/ghost/' + post.slug,
    publishDate: post.published_at,
    tags: [],
    headings: [],
  };
}

export function attachEvent(selector, event, fn) {
  const matches = typeof selector === 'string' ? document.querySelectorAll(selector) : selector;
  if (matches?.length) {
    matches.forEach(elem => {
      elem.addEventListener(event, e => fn(e, elem), false);
    });
  }
}
