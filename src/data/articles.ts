import { getCollection } from 'astro:content';

export async function getPublishedArticles() {
  return (await getCollection('articles', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const ARTICLE_CATEGORIES = {
  substance: 'Substance Status',
  explainer: 'Rule Explainer',
  update: 'Regulatory Update',
  'claim-check': 'Claim Check',
  enforcement: 'Enforcement Watch',
} as const;
