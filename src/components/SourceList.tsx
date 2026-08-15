import type { SourceDocument } from '../data/types';

interface Props {
  sources: SourceDocument[];
  title?: string;
}

export default function SourceList({ sources, title = 'Sources' }: Props) {
  if (sources.length === 0) return null;
  return (
    <section aria-labelledby="sources-heading" className="mt-10">
      <h2 id="sources-heading" className="text-2xl font-bold font-serif text-ink">{title}</h2>
      <ul className="mt-4 space-y-3">
        {sources.map((doc) => (
          <li key={doc.id} className="card p-4">
            <a href={`/documents/${doc.slug}/`} className="font-medium text-ink hover:text-accent no-underline decoration-accent/50 hover:decoration-accent">{doc.title}</a>
            <p className="mt-1 text-sm font-mono text-ink-muted">{doc.issuing_body}{doc.document_type && ` · ${doc.document_type}`}{doc.docket_or_citation && ` · ${doc.docket_or_citation}`}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {doc.official_url && (
                <a href={doc.official_url} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs py-1 px-2">Official page ↗</a>
              )}
              {doc.official_pdf_url && (
                <a href={doc.official_pdf_url} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs py-1 px-2">PDF ↗</a>
              )}
              {doc.archive_url && (
                <a href={doc.archive_url} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs py-1 px-2">Archive ↗</a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
