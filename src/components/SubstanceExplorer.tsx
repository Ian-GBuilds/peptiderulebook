import { useMemo, useState, useEffect } from 'react';
import type { Substance } from '../data/types';
import {
  statusFacets,
  activityColumns,
  toneFor,
  stampClass,
  primaryStatusLabel,
} from './status-utils';
import CompareDrawer from './CompareDrawer';

interface Props {
  substances: Substance[];
}

type SortKey = 'name' | 'verified' | 'assertions';

const MAX_COMPARE = 3;

export default function SubstanceExplorer({ substances }: Props) {
  const [query, setQuery] = useState('');
  const [activeFacets, setActiveFacets] = useState<Set<string>>(new Set());
  const [activeActivity, setActiveActivity] = useState<string>('all');
  const [sort, setSort] = useState<SortKey>('name');
  const [compare, setCompare] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Persist compare selection across the session so it survives navigation.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('prb-compare');
      if (saved) setCompare(JSON.parse(saved));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      sessionStorage.setItem('prb-compare', JSON.stringify(compare));
    } catch {}
  }, [compare]);

  const toggleFacet = (key: string) => {
    setActiveFacets((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const toggleCompare = (slug: string) => {
    setCompare((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, slug];
    });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = substances.filter((s) => {
      // text match across name, synonyms, identity notes
      if (q) {
        const hay = [s.canonical_name, ...s.synonyms, s.identity_notes]
          .join(' ')
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      // status facet chips (AND across selected chips)
      for (const key of activeFacets) {
        const facet = statusFacets.find((f) => f.key === key);
        if (facet && !facet.test(s)) return false;
      }
      // activity column filter
      if (activeActivity !== 'all') {
        const col = activityColumns.find((c) => c.key === activeActivity);
        if (col && !s.status_assertions.some((a) => col.match.test(a.activity))) return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === 'name') return a.canonical_name.localeCompare(b.canonical_name);
      if (sort === 'verified')
        return +new Date(b.last_verified) - +new Date(a.last_verified);
      return b.status_assertions.length - a.status_assertions.length;
    });
    return list;
  }, [substances, query, activeFacets, activeActivity, sort]);

  const compareSubstances = compare
    .map((slug) => substances.find((s) => s.slug === slug))
    .filter(Boolean) as Substance[];

  const resetAll = () => {
    setQuery('');
    setActiveFacets(new Set());
    setActiveActivity('all');
  };

  const anyFilter = query || activeFacets.size > 0 || activeActivity !== 'all';

  return (
    <div>
      {/* Search + sort toolbar */}
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
        <div className="relative flex-1">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search peptides, brand names, aliases…"
            aria-label="Search substances"
            className="w-full bg-paper border border-hairline rounded-sm pl-9 pr-3 py-2.5 text-ink placeholder:text-ink-muted focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="meta shrink-0">Sort</label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="bg-paper border border-hairline rounded-sm px-3 py-2.5 text-sm text-ink focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none"
          >
            <option value="name">Name (A–Z)</option>
            <option value="verified">Recently verified</option>
            <option value="assertions">Most statuses</option>
          </select>
        </div>
      </div>

      {/* Status facet chips */}
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by status">
        {statusFacets.map((f) => {
          const active = activeFacets.has(f.key);
          const count = substances.filter((s) => f.test(s)).length;
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={active}
              onClick={() => toggleFacet(f.key)}
              className={
                'stamp cursor-pointer transition-colors ' +
                (active
                  ? 'bg-ink text-paper border-ink'
                  : 'stamp-neutral hover:border-ink/40')
              }
            >
              {f.label}
              <span className="ml-1.5 opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Activity segmented control */}
      <div className="mt-4 flex flex-wrap items-center gap-1 border border-hairline rounded-sm p-1 bg-paper w-fit">
        {[{ key: 'all', short: 'All activities' }, ...activityColumns].map((c) => {
          const active = activeActivity === c.key;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setActiveActivity(c.key)}
              className={
                'px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm transition-colors ' +
                (active ? 'bg-ink text-paper' : 'text-ink-muted hover:text-ink')
              }
            >
              {c.short}
            </button>
          );
        })}
      </div>

      {/* Result meta bar */}
      <div className="mt-5 flex items-center justify-between border-t border-hairline pt-4">
        <p className="meta">
          {filtered.length} of {substances.length} substances
        </p>
        {anyFilter && (
          <button
            type="button"
            onClick={resetAll}
            className="meta text-accent hover:text-accent-dark underline decoration-accent/40"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results grid */}
      {filtered.length === 0 ? (
        <div className="mt-10 text-center py-16 border border-dashed border-hairline rounded-sm">
          <p className="text-ink font-serif text-lg">No substances match those filters.</p>
          <p className="mt-2 text-ink-muted text-sm">Try clearing a status chip or search term.</p>
          <button type="button" onClick={resetAll} className="mt-4 btn btn-secondary">Reset</button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s) => (
            <ExplorerCard
              key={s.slug}
              substance={s}
              query={query}
              selected={compare.includes(s.slug)}
              disabled={!compare.includes(s.slug) && compare.length >= MAX_COMPARE}
              onToggleCompare={() => toggleCompare(s.slug)}
            />
          ))}
        </div>
      )}

      {/* Sticky compare tray */}
      {compare.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-paper border-t border-hairline shadow-[0_-2px_8px_rgba(13,27,42,0.06)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="meta">Compare ({compare.length}/{MAX_COMPARE}):</span>
              {compareSubstances.map((s) => (
                <span key={s.slug} className="stamp stamp-neutral">
                  {s.canonical_name}
                  <button
                    type="button"
                    aria-label={`Remove ${s.canonical_name}`}
                    onClick={() => toggleCompare(s.slug)}
                    className="ml-1.5 text-ink-muted hover:text-accent"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button type="button" onClick={() => setCompare([])} className="meta text-ink-muted hover:text-ink">
                Clear
              </button>
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                disabled={compare.length < 2}
                className="btn btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Compare side-by-side
              </button>
            </div>
          </div>
        </div>
      )}

      {drawerOpen && (
        <CompareDrawer substances={compareSubstances} onClose={() => setDrawerOpen(false)} />
      )}

      {/* spacer so tray doesn't cover last row */}
      {compare.length > 0 && <div className="h-20" />}
    </div>
  );
}

function highlight(text: string, q: string) {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-accent/20 text-ink rounded-sm px-0.5">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
}

function ExplorerCard({
  substance,
  query,
  selected,
  disabled,
  onToggleCompare,
}: {
  substance: Substance;
  query: string;
  selected: boolean;
  disabled: boolean;
  onToggleCompare: () => void;
}) {
  const label = primaryStatusLabel(substance);
  const tone = toneFor(
    substance.status_assertions.find((a) => /FDA-approved drug product/i.test(a.activity))
      ?.status_value ?? substance.status_assertions[0]?.status_value ?? ''
  );
  return (
    <article className={'card p-5 flex flex-col ' + (selected ? 'ring-2 ring-accent/50 border-accent/40' : '')}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold font-serif text-ink leading-tight">
          <a href={`/substances/${substance.slug}/`} className="no-underline hover:underline decoration-accent">
            {highlight(substance.canonical_name, query)}
          </a>
        </h3>
        <span className={stampClass[tone] + ' shrink-0'}>{label}</span>
      </div>

      {/* activity mini-stamps */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {substance.status_assertions.slice(0, 4).map((a) => (
          <span key={a.id} className={stampClass[toneFor(a.status_value)]} title={`${a.activity}: ${a.status_label}`}>
            {activityShort(a.activity)}
          </span>
        ))}
      </div>

      {substance.synonyms.length > 0 && (
        <p className="mt-3 text-xs font-mono text-ink-muted">
          Also: {highlight(substance.synonyms.slice(0, 3).join(', '), query)}
          {substance.synonyms.length > 3 && '…'}
        </p>
      )}
      <p className="mt-2 text-sm text-ink-muted line-clamp-3 flex-1">{substance.identity_notes}</p>

      <div className="mt-4 flex items-center justify-between border-t border-hairline pt-3">
        <label className={'flex items-center gap-2 text-xs font-mono uppercase tracking-wider cursor-pointer ' + (disabled ? 'opacity-40 cursor-not-allowed' : 'text-ink-muted hover:text-ink')}>
          <input
            type="checkbox"
            checked={selected}
            disabled={disabled}
            onChange={onToggleCompare}
            className="accent-accent"
          />
          Compare
        </label>
        <a href={`/substances/${substance.slug}/`} className="text-xs font-mono uppercase tracking-wider text-ink hover:text-accent no-underline">
          Read status →
        </a>
      </div>
    </article>
  );
}

function activityShort(activity: string): string {
  const col = activityColumns.find((c) => c.match.test(activity));
  if (col) return col.short;
  if (/copies/i.test(activity)) return '503A copies';
  return activity.split(' ')[0];
}
