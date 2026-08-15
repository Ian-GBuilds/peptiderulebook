import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getPublishedUpdates } from '../data/adapter';
import { getSiteConfig } from '../data/adapter';

export const GET: APIRoute = async (context) => {
  const site = await getSiteConfig();
  const updates = await getPublishedUpdates();
  return rss({
    title: site.name,
    description: site.description,
    site: context.site || site.url,
    items: updates.map((update) => ({
      title: update.title,
      description: update.dek,
      link: `/updates/${update.slug}/`,
      pubDate: new Date(update.date_published),
    })),
  });
};
