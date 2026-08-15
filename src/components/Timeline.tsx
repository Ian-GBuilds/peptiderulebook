import type { TimelineEvent, SourceDocument } from '../data/types';

interface Props {
  events: TimelineEvent[];
  documents: SourceDocument[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}

export default function Timeline({ events, documents }: Props) {
  const sorted = [...events].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return (
    <section aria-labelledby="timeline-heading" className="mt-10">
      <h2 id="timeline-heading" className="text-2xl font-bold font-serif text-ink">Timeline</h2>
      <ol className="mt-4 relative border-l border-hairline ml-2">
        {sorted.map((event, index) => {
          const sources = event.source_ids
            .map((id) => documents.find((d) => d.id === id))
            .filter(Boolean) as SourceDocument[];
          return (
            <li key={index} className="mb-8 ml-6">
              <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-accent ring-4 ring-paper" aria-hidden="true" />
              <time className="text-xs font-mono font-semibold uppercase tracking-wider text-ink-muted">{formatDate(event.date)}</time>
              <h3 className="mt-1 text-base font-semibold font-serif text-ink">{event.title}</h3>
              {event.procedural_status && (
                <span className="mt-1 inline-block stamp stamp-neutral">
                  {event.procedural_status}
                </span>
              )}
              <p className="mt-2 text-sm text-ink-muted">{event.description}</p>
              {sources.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {sources.map((doc) => (
                    <li key={doc.id}>
                      <a href={`/documents/${doc.slug}/`} className="text-sm text-ink hover:text-accent no-underline decoration-accent/50 hover:decoration-accent">{doc.title}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
