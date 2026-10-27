import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({
    base: './src/content/articles',
    pattern: '**/*.md',
    generateId: ({ entry }) => entry.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, ''),
  }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    date: z.coerce.date(),
    category: z.enum(['substance', 'explainer', 'update', 'claim-check', 'enforcement']),
    tags: z.array(z.string()).default([]),
    sources: z.array(z.object({ title: z.string(), url: z.url() })).default([]),
    draft: z.boolean().default(true),
    updated: z.coerce.date().optional(),
    hero: z.string().optional(),
    heroAlt: z.string().optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = { articles };
