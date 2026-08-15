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
      <h2 id="timeline-heading" className="text-xl font-bold text-[#1e293b]">Timeline</h2>
      <ol className="mt-4 relative border-l border-slate-300 ml-2">
        {sorted.map((event, index) => {
          const sources = event.source_ids
            .map((id) => documents.find((d) => d.id === id))
            .filter(Boolean) as SourceDocument[];
          return (
            <li key={index} className="mb-8 ml-6">
              <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-orange-500 ring-4 ring-white" aria-hidden="true" />
              <time className="text-xs font-semibold uppercase tracking-wide text-slate-500">{formatDate(event.date)}</time>
              <h3 className="mt-1 text-base font-semibold text-[#1e293b]">{event.title}</h3>
              {event.procedural_status && (
                <span className="mt-1 inline-block rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                  {event.procedural_status}
                </span>
              )}
              <p className="mt-2 text-sm text-slate-700">{event.description}</p>
              {sources.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {sources.map((doc) => (
                    <li key={doc.id}>
                      <a href={`/documents/${doc.slug}/`} className="text-sm text-orange-600 hover:underline">{doc.title}</a>
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
