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
      <h2 id="status-heading" className="text-xl font-bold text-[#1e293b]">Current status</h2>
      <p className="mt-2 text-slate-700">{summary}</p>
      <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full text-sm" aria-label={`Status assertions for ${substance.canonical_name}`}>
          <caption className="sr-only">Status assertions by activity, jurisdiction, date, qualification, and sources</caption>
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
            <tr>
              <th className="px-4 py-3">Activity</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">As of</th>
              <th className="px-4 py-3">Jurisdiction</th>
              <th className="px-4 py-3">Qualification</th>
              <th className="px-4 py-3">Sources</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {substance.status_assertions.map((assertion) => {
              const jurisdiction = jurisdictions.find((j) => j.id === assertion.jurisdiction_id);
              const sources = assertion.controlling_source_ids
                .map((id) => documents.find((d) => d.id === id))
                .filter(Boolean) as SourceDocument[];
              return (
                <tr key={assertion.id}>
                  <td className="px-4 py-3 font-medium">{assertion.activity}</td>
                  <td className="px-4 py-3"><StatusBadge status={assertion} /></td>
                  <td className="px-4 py-3 whitespace-nowrap">{formatDate(assertion.as_of_date)}</td>
                  <td className="px-4 py-3">{jurisdiction?.name || assertion.jurisdiction_id}</td>
                  <td className="px-4 py-3 text-slate-600 max-w-sm">{assertion.qualification || '—'}</td>
                  <td className="px-4 py-3">
                    <ul className="space-y-1">
                      {sources.map((doc) => (
                        <li key={doc.id}>
                          <a href={`/documents/${doc.slug}/`} className="text-orange-600 hover:underline">{doc.title}</a>
                          {doc.official_url && (
                            <a href={doc.official_url} target="_blank" rel="noopener noreferrer" className="ml-2 text-xs text-slate-500 hover:text-orange-600">official ↗</a>
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
