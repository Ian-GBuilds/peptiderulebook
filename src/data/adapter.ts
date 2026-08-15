import type {
  Author,
  ClaimCheck,
  SourceDocument,
  Jurisdiction,
  Rule,
  SiteConfig,
  Substance,
  Tracker,
  Update,
} from './types';

function loadJson<T>(glob: Record<string, () => Promise<unknown>>): Promise<T[]> {
  return Promise.all(
    Object.values(glob).map(async (mod) => {
      const m = (await mod()) as { default: T } | T;
      if (m && typeof m === 'object' && 'default' in m) {
        return (m as { default: T }).default;
      }
      return m as T;
    })
  );
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const m = (await import('../content/config/site.json')) as { default: SiteConfig };
  return m.default;
}

export async function getSubstances(): Promise<Substance[]> {
  const glob = import.meta.glob<{ default: Substance }>('../content/substances/*.json', { eager: false });
  return loadJson<Substance>(glob);
}

export async function getSubstanceBySlug(slug: string): Promise<Substance | undefined> {
  const all = await getSubstances();
  return all.find((s) => s.slug === slug);
}

export async function getRules(): Promise<Rule[]> {
  const glob = import.meta.glob<{ default: Rule }>('../content/rules/*.json', { eager: false });
  return loadJson<Rule>(glob);
}

export async function getRuleBySlug(slug: string): Promise<Rule | undefined> {
  const all = await getRules();
  return all.find((r) => r.slug === slug);
}

export async function getUpdates(): Promise<Update[]> {
  const glob = import.meta.glob<{ default: Update }>('../content/updates/*.json', { eager: false });
  return loadJson<Update>(glob);
}

export async function getUpdateBySlug(slug: string): Promise<Update | undefined> {
  const all = await getUpdates();
  return all.find((u) => u.slug === slug);
}

export async function getClaimChecks(): Promise<ClaimCheck[]> {
  const glob = import.meta.glob<{ default: ClaimCheck }>('../content/claims/*.json', { eager: false });
  return loadJson<ClaimCheck>(glob);
}

export async function getClaimCheckBySlug(slug: string): Promise<ClaimCheck | undefined> {
  const all = await getClaimChecks();
  return all.find((c) => c.slug === slug);
}

export async function getDocuments(): Promise<SourceDocument[]> {
  const glob = import.meta.glob<{ default: SourceDocument }>('../content/documents/*.json', { eager: false });
  return loadJson<SourceDocument>(glob);
}

export async function getDocumentBySlug(slug: string): Promise<SourceDocument | undefined> {
  const all = await getDocuments();
  return all.find((d) => d.slug === slug);
}

export async function getJurisdictions(): Promise<Jurisdiction[]> {
  const glob = import.meta.glob<{ default: Jurisdiction }>('../content/jurisdictions/*.json', { eager: false });
  return loadJson<Jurisdiction>(glob);
}

export async function getJurisdictionBySlug(slug: string): Promise<Jurisdiction | undefined> {
  const all = await getJurisdictions();
  return all.find((j) => j.slug === slug);
}

export async function getTrackers(): Promise<Tracker[]> {
  const glob = import.meta.glob<{ default: Tracker }>('../content/trackers/*.json', { eager: false });
  return loadJson<Tracker>(glob);
}

export async function getTrackerBySlug(slug: string): Promise<Tracker | undefined> {
  const all = await getTrackers();
  return all.find((t) => t.slug === slug);
}

export async function getAuthors(): Promise<Author[]> {
  const glob = import.meta.glob<{ default: Author }>('../content/authors/*.json', { eager: false });
  return loadJson<Author>(glob);
}

export async function getAuthorBySlug(slug: string): Promise<Author | undefined> {
  const all = await getAuthors();
  return all.find((a) => a.slug === slug);
}

export async function getPublishedUpdates(): Promise<Update[]> {
  const all = await getUpdates();
  return all.filter((u) => u.status === 'published').sort((a, b) => +new Date(b.date_published) - +new Date(a.date_published));
}
