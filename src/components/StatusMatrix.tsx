import type { Substance, SourceDocument, Jurisdiction } from '../data/types';
import StatusBadge from './StatusBadge';

interface Props {
  substance: Substance;
  documents: SourceDocument[];
  jurisdictions: Jurisdiction[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}

export default function StatusMatrix({ substance, documents, jurisdictions }: Props) {
  const summary = substance.status_assertions
    .map((a) => `${a.activity}: ${a.status_label}`)
    .join('; ');

  return (
    <section aria-labelledby="status-heading" className="mt-8">
      <h2 id="status-heading" className="text-2xl font-bold font-serif text-ink">Current status</h2>
      <p className="mt-2 text-ink-muted">{summary}</p>
      <div className="mt-4 overflow-x-auto border border-hairline">
        <table className="data-table min-w-full" aria-label={`Status assertions for ${substance.canonical_name}`}>
          <caption className="sr-only">Status assertions by activity, jurisdiction, date, qualification, and sources</caption>
          <thead>
            <tr>
              <th>Activity</th>
              <th>Status</th>
              <th>As of</th>
              <th>Jurisdiction</th>
              <th>Qualification</th>
              <th>Sources</th>
            </tr>
          </thead>
          <tbody>
            {substance.status_assertions.map((assertion) => {
              const jurisdiction = jurisdictions.find((j) => j.id === assertion.jurisdiction_id);
              const sources = assertion.controlling_source_ids
                .map((id) => documents.find((d) => d.id === id))
                .filter(Boolean) as SourceDocument[];
              return (
                <tr key={assertion.id}>
                  <td className="font-medium">{assertion.activity}</td>
                  <td><StatusBadge status={assertion} /></td>
                  <td className="whitespace-nowrap font-mono text-xs">{formatDate(assertion.as_of_date)}</td>
                  <td>{jurisdiction?.name || assertion.jurisdiction_id}</td>
                  <td className="text-ink-muted max-w-sm">{assertion.qualification || '—'}</td>
                  <td>
                    <ul className="space-y-1">
                      {sources.map((doc) => (
                        <li key={doc.id}>
                          <a href={`/documents/${doc.slug}/`} className="text-ink hover:text-accent no-underline decoration-accent/50 hover:decoration-accent">{doc.title}</a>
                          {doc.official_url && (
                            <a href={doc.official_url} target="_blank" rel="noopener noreferrer" className="ml-2 text-xs font-mono text-ink-muted hover:text-accent no-underline">official ↗</a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
