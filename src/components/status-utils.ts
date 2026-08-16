// Shared helpers for interactive islands. Keeps stamp coloring consistent
// with StatusBadge.tsx and the design system's regulatory-stamp palette.
import type { Substance } from '../data/types';

export type StampTone = 'green' | 'amber' | 'red' | 'blue' | 'neutral';

// Maps a status_value to a regulatory-stamp tone (matches DESIGN.md).
export const statusToneMap: Record<string, StampTone> = {
  approved: 'green',
  'component-approved': 'green',
  'partly-approved': 'amber',
  'route-dependent': 'amber',
  restricted: 'amber',
  resolved: 'blue',
  'not-approved': 'neutral',
  'not-currently-marketed': 'neutral',
  'not-listed': 'neutral',
  investigational: 'neutral',
  'safety-risk': 'red',
  prohibited: 'red',
};

export function toneFor(statusValue: string): StampTone {
  return statusToneMap[statusValue] ?? 'neutral';
}

export const stampClass: Record<StampTone, string> = {
  green: 'stamp stamp-green',
  amber: 'stamp stamp-amber',
  red: 'stamp stamp-red',
  blue: 'stamp stamp-blue',
  neutral: 'stamp stamp-neutral',
};

// High-level filter buckets a reader actually thinks in.
export interface StatusFacet {
  key: string;
  label: string;
  // returns true if the substance matches this facet
  test: (s: Substance) => boolean;
}

const has = (s: Substance, values: string[]) =>
  s.status_assertions.some((a) => values.includes(a.status_value));

export const statusFacets: StatusFacet[] = [
  { key: 'approved', label: 'FDA-approved product', test: (s) => has(s, ['approved']) },
  { key: 'not-approved', label: 'Not an approved drug', test: (s) => has(s, ['not-approved']) },
  { key: 'investigational', label: 'Investigational', test: (s) => has(s, ['investigational']) || s.status_assertions.some((a) => /investigational/i.test(a.status_label)) },
  { key: 'discontinued', label: 'Discontinued product', test: (s) => has(s, ['not-currently-marketed']) },
  { key: 'compoundable', label: 'Compounding pathway', test: (s) => has(s, ['component-approved', 'route-dependent', 'restricted']) },
  { key: 'safety-risk', label: 'Compounding safety risk', test: (s) => has(s, ['safety-risk']) },
  { key: 'wada', label: 'WADA-prohibited (sport)', test: (s) => s.status_assertions.some((a) => a.status_value === 'prohibited') },
  { key: 'shortage', label: 'Had a national shortage', test: (s) => s.status_assertions.some((a) => /shortage/i.test(a.activity)) },
];

// Canonical activity columns for the overview matrix.
export const activityColumns: { key: string; label: string; short: string; match: RegExp }[] = [
  { key: 'fda', label: 'FDA-approved drug product', short: 'FDA', match: /FDA-approved drug product/i },
  { key: '503a', label: '503A pharmacy compounding', short: '503A', match: /503A/i },
  { key: '503b', label: '503B outsourcing-facility compounding', short: '503B', match: /503B/i },
  { key: 'shortage', label: 'National drug shortage', short: 'Shortage', match: /shortage/i },
  { key: 'wada', label: 'Sport (WADA)', short: 'WADA', match: /WADA|sport/i },
];

export function primaryStatusLabel(s: Substance): string {
  const fda = s.status_assertions.find((a) => /FDA-approved drug product/i.test(a.activity));
  return (fda ?? s.status_assertions[0])?.status_label ?? 'Under review';
}
