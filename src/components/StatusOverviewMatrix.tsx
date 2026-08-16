import { useMemo, useState } from 'react';
import type { Substance } from '../data/types';
import { activityColumns, toneFor, stampClass } from './status-utils';

interface Props {
  substances: Substance[];
}

const toneDot: Record<string, string> = {
  green: 'bg-stamp-green',
  amber: 'bg-stamp-amber',
  red: 'bg-stamp-red',
  blue: 'bg-stamp-blue',
  neutral: 'bg-hairline',
};

export default function StatusOverviewMatrix({ substances }: Props) {
  const [hover, setHover] = useState<{ slug: string; col: string } | null>(null);
  const rows = useMemo(
    () => [...substances].sort((a, b) => a.canonical_name.localeCompare(b.canonical_name)),
    [substances]
  );

  return (
    <div>
      <div className="overflow-x-auto border border-hairline rounded-sm">
        <table className="min-w-full text-sm" aria-label="Regulatory status overview matrix">
          <thead>
            <tr className="bg-paper border-b border-hairline">
              <th className="text-left px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-ink-muted sticky left-0 bg-paper z-10">
                Substance
              </th>
              {activityColumns.map((c) => (
                <th key={c.key} className="px-3 py-3 font-mono text-[11px] uppercase tracking-wider text-ink-muted text-center whitespace-nowrap">
                  {c.short}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((s, i) => (
              <tr key={s.slug} className={'border-b border-hairline last:border-0 ' + (i % 2 ? 'bg-ground/30' : 'bg-paper')}>
                <td className="px-4 py-2.5 sticky left-0 bg-inherit z-10">
                  <a href={`/substances/${s.slug}/`} className="text-ink hover:text-accent no-underline font-medium">
                    {s.canonical_name}
                  </a>
                </td>
                {activityColumns.map((c) => {
                  const a = s.status_assertions.find((x) => c.match.test(x.activity));
                  const isHover = hover?.slug === s.slug && hover?.col === c.key;
                  return (
                    <td
                      key={c.key}
                      className="px-3 py-2.5 text-center relative"
                      onMouseEnter={() => a && setHover({ slug: s.slug, col: c.key })}
                      onMouseLeave={() => setHover(null)}
                    >
                      {a ? (
                        <>
                          <span
                            className={'inline-block h-3 w-3 rounded-full ' + toneDot[toneFor(a.status_value)]}
                            aria-label={`${c.label}: ${a.status_label}`}
                          />
                          {isHover && (
                            <div className="absolute z-20 left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 bg-ink text-paper text-left rounded-sm p-3 shadow-lg pointer-events-none">
                              <p className="font-mono text-[10px] uppercase tracking-wider opacity-70">{c.label}</p>
                              <p className="mt-1 text-xs font-medium">{a.status_label}</p>
                              {a.qualification && <p className="mt-1 text-[11px] opacity-80 leading-snug">{a.qualification}</p>}
                            </div>
                          )}
                        </>
                      ) : (
                        <span className="text-hairline" aria-label={`${c.label}: no determination`}>·</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-muted">
        <Legend dot="bg-stamp-green" label="Approved / component-approved" />
        <Legend dot="bg-stamp-amber" label="Restricted / route-dependent" />
        <Legend dot="bg-stamp-red" label="Safety risk / prohibited" />
        <Legend dot="bg-stamp-blue" label="Shortage resolved" />
        <Legend dot="bg-hairline" label="Not approved / not listed" />
        <span className="flex items-center gap-1.5"><span className="text-hairline">·</span> No determination</span>
      </div>
    </div>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={'inline-block h-3 w-3 rounded-full ' + dot} />
      {label}
    </span>
  );
}
