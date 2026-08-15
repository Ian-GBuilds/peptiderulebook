import { useEffect, useMemo, useState } from 'react';

interface SearchItem {
  type: 'substance' | 'rule' | 'update' | 'claim' | 'document' | 'jurisdiction';
  title: string;
  href: string;
  description?: string;
}

interface Props {
  index: SearchItem[];
}

export default function SearchModal({ index }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index.filter((item) =>
      item.title.toLowerCase().includes(q) ||
      (item.description || '').toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query, index]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-600 hover:border-orange-500 hover:text-orange-600"
        aria-label="Open search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        Search
        <kbd className="hidden sm:inline-block ml-2 rounded bg-slate-100 px-1.5 py-0.5 text-xs">⌘K</kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-20" role="dialog" aria-modal="true">
      <div className="w-full max-w-xl rounded-xl bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search substances, rules, updates..."
            className="flex-1 outline-none text-base"
          />
          <button onClick={() => setOpen(false)} className="text-sm text-slate-500 hover:text-slate-800">Esc</button>
        </div>
        <div className="max-h-96 overflow-auto p-2">
          {results.length === 0 && query.trim() && (
            <p className="px-4 py-6 text-sm text-slate-500 text-center">No results found.</p>
          )}
          {results.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 hover:bg-slate-50"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium uppercase tracking-wide text-orange-600">{item.type}</span>
              </div>
              <div className="mt-0.5 font-medium text-[#1e293b]">{item.title}</div>
              {item.description && <div className="text-sm text-slate-500 line-clamp-2">{item.description}</div>}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
