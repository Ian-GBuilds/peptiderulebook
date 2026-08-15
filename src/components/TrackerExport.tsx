interface Props {
  rows: Record<string, string>[];
  columns: { key: string; label: string }[];
  name: string;
}

export default function TrackerExport({ rows, columns, name }: Props) {
  const headers = columns.map((c) => c.label);
  const keys = columns.map((c) => c.key);

  const toCsv = () => {
    const escape = (val: string) => `"${val.replace(/"/g, '""')}"`;
    const lines = [headers.map(escape).join(',')];
    rows.forEach((row) => {
      lines.push(keys.map((k) => escape(row[k] || '')).join(','));
    });
    return lines.join('\n');
  };

  const download = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => download(toCsv(), `${name}.csv`, 'text/csv')}
        className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        Download CSV
      </button>
      <button
        onClick={() => download(JSON.stringify(rows, null, 2), `${name}.json`, 'application/json')}
        className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        Download JSON
      </button>
    </div>
  );
}
