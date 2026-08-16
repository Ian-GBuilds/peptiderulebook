import { useState } from 'react';
import type { ClaimCheck } from '../data/types';

interface Props {
  claim: ClaimCheck;
  linkToPage?: boolean;
}

const verdictClasses: Record<string, string> = {
  accurate: 'stamp stamp-green',
  'partly accurate': 'stamp stamp-amber',
  misleading: 'stamp stamp-red',
  unsupported: 'stamp stamp-neutral',
  outdated: 'stamp stamp-blue',
  'not verifiable': 'stamp stamp-neutral',
};

export default function ClaimCardInteractive({ claim, linkToPage = true }: Props) {
  const [revealed, setRevealed] = useState(false);

  return (
    <article className="card p-5 flex flex-col">
      <p className="text-xs font-mono uppercase tracking-wider text-ink-muted">
        Claim check · {claim.jurisdiction} · {claim.date}
      </p>
      <blockquote className="mt-3 text-base font-serif text-ink leading-snug border-l-2 border-hairline pl-3">
        “{claim.claim}”
      </blockquote>

      {!revealed ? (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="btn btn-primary w-full sm:w-auto"
            aria-expanded={false}
          >
            Reveal the verdict
          </button>
          <p className="mt-2 text-xs text-ink-muted">Think it through first — then check it against the controlling source.</p>
        </div>
      ) : (
        <div className="mt-4 motion-safe:animate-reveal">
          <span className={verdictClasses[claim.verdict] || 'stamp stamp-neutral'}>{claim.verdict}</span>
          <p className="mt-3 text-sm font-medium text-ink">{claim.correct_wording}</p>
          {claim.why_confusion && (
            <p className="mt-2 text-sm text-ink-muted"><span className="font-semibold text-ink">Why the confusion:</span> {claim.why_confusion}</p>
          )}
        </div>
      )}

      {linkToPage && (
        <div className="mt-4 border-t border-hairline pt-3">
          <a href={`/claim-check/${claim.slug}/`} className="text-xs font-mono uppercase tracking-wider text-ink hover:text-accent no-underline">
            Full claim check →
          </a>
        </div>
      )}
    </article>
  );
}
