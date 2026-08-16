import { useState } from 'react';
import type { FaqItem } from '../data/types';

interface Props {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mt-4 border border-hairline rounded-sm divide-y divide-hairline">
      {items.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="bg-paper">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 text-left px-4 py-3.5 hover:bg-ground/50 transition-colors"
            >
              <span className="font-semibold text-ink">{faq.question}</span>
              <svg
                className={'h-4 w-4 shrink-0 text-ink-muted transition-transform ' + (isOpen ? 'rotate-45' : '')}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 text-ink-muted motion-safe:animate-reveal">{faq.answer}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
