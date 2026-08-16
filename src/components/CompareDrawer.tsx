import { useEffect } from 'react';
import type { Substance } from '../data/types';
import { activityColumns, toneFor, stampClass } from './status-utils';

interface Props {
  substances: Substance[];
  onClose: () => void;
}

function cellFor(s: Substance, match: RegExp) {
  return s.status_assertions.find((a) => match.test(a.activity));
}

export default function CompareDrawer({ substances, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Compare substances"
    >
      <div className="absolute inset-0 bg-ink/30" onClick={onClose} />
      <div className="relative bg-paper border border-hairline rounded-sm w-full max-w-5xl max-h-[90vh] overflow-auto motion-safe:animate-reveal">
        <div className="sticky top-0 bg-paper border-b border-hairline px-5 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold font-serif text-ink">Side-by-side comparison</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close comparison"
            className="p-2 rounded-sm hover:bg-ground text-ink-muted hover:text-ink"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table min-w-full">
            <thead>
              <tr>
                <th className="sticky left-0 bg-paper z-10">Activity</th>
                {substances.map((s) => (
                  <th key={s.slug} className="min-w-[180px]">
                    <a href={`/substances/${s.slug}/`} className="text-ink hover:text-accent no-underline font-semibold normal-case text-sm">
                      {s.canonical_name}
                    </a>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activityColumns.map((col) => {
                // Only show a row if at least one substance has an assertion for it.
                const anyHas = substances.some((s) => cellFor(s, col.match));
                if (!anyHas) return null;
                return (
                  <tr key={col.key}>
                    <td className="font-medium sticky left-0 bg-inherit">{col.short}</td>
                    {substances.map((s) => {
                      const a = cellFor(s, col.match);
                      if (!a)
                        return (
                          <td key={s.slug} className="text-ink-muted">—</td>
                        );
                      return (
                        <td key={s.slug}>
                          <span className={stampClass[toneFor(a.status_value)]}>{a.status_label}</span>
                          {a.qualification && (
                            <p className="mt-1.5 text-xs text-ink-muted leading-snug">{a.qualification}</p>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              <tr>
                <td className="font-medium sticky left-0 bg-inherit">Aliases</td>
                {substances.map((s) => (
                  <td key={s.slug} className="text-xs font-mono text-ink-muted">
                    {s.synonyms.slice(0, 4).join(', ') || '—'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="font-medium sticky left-0 bg-inherit">Last verified</td>
                {substances.map((s) => (
                  <td key={s.slug} className="font-mono text-xs whitespace-nowrap">{s.last_verified}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="px-5 py-4 border-t border-hairline bg-ground/40">
          <p className="text-xs text-ink-muted">
            Status in one activity or jurisdiction does not automatically apply to another. Always confirm against the controlling source on each substance page.
          </p>
        </div>
      </div>
    </div>
  );
}
