import type { SiteConfig, Tracker, Author } from '../data/types';

interface ArticleLike {
  title: string;
  slug: string;
  dek: string;
  date_published: string;
  date_modified?: string;
  hero_image?: string;
}

export function Organization(site: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    description: site.description,
    sameAs: [site.twitter ? `https://twitter.com/${site.twitter.replace('@', '')}` : undefined, site.github].filter(Boolean),
  };
}

export function WebSite(site: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    description: site.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${site.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function BreadcrumbList(items: { label: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href,
    })),
  };
}

export function Article(update: ArticleLike, site: SiteConfig, path?: string) {
  const url = path ? `${site.url}${path.replace(/\/$/, '')}/` : `${site.url}/updates/${update.slug}/`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: update.title,
    description: update.dek,
    url,
    datePublished: update.date_published,
    dateModified: update.date_modified || update.date_published,
    author: { '@type': 'Organization', name: site.name },
    image: update.hero_image ? `${site.url}${update.hero_image}` : undefined,
  };
}

export function NewsArticle(update: ArticleLike, site: SiteConfig, path?: string) {
  const url = path ? `${site.url}${path.replace(/\/$/, '')}/` : `${site.url}/updates/${update.slug}/`;
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: update.title,
    description: update.dek,
    url,
    datePublished: update.date_published,
    dateModified: update.date_modified || update.date_published,
    author: { '@type': 'Organization', name: site.name },
    image: update.hero_image ? `${site.url}${update.hero_image}` : undefined,
  };
}

export function Dataset(tracker: Tracker, site: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: tracker.name,
    description: tracker.description,
    url: `${site.url}/trackers/${tracker.slug}/`,
    dateModified: tracker.last_updated,
    creator: { '@type': 'Organization', name: site.name },
  };
}

export function ItemList(list: { name: string; url: string; description?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: list.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
      description: item.description,
    })),
  };
}

export function ProfilePage(author: Author, site: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.role,
      description: author.bio,
      url: `${site.url}/authors/${author.slug}/`,
    },
    url: `${site.url}/authors/${author.slug}/`,
    name: `${author.name} — ${site.name}`,
  };
}
