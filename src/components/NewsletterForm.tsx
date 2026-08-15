import React, { useState } from 'react';

interface Props {
  variant?: 'inline' | 'card';
}

export default function NewsletterForm({ variant = 'card' }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'ok'>('idle');

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.includes('@')) {
      setStatus('ok');
      setEmail('');
    }
  };

  const wrapper = variant === 'inline'
    ? 'flex flex-col sm:flex-row gap-3 items-start sm:items-end'
    : 'bg-white border border-slate-200 rounded-xl p-6 shadow-sm';

  return (
    <form onSubmit={handleSubmit} className={wrapper}>
      {variant === 'card' && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#1e293b]">Rule Change Alerts</h3>
          <p className="text-sm text-slate-600 mt-1">Get a short email when peptide statuses, shortages, or compounding rules change.</p>
        </div>
      )}
      <label className="flex-1 w-full">
        <span className="sr-only">Email address</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
      </label>
      <button
        type="submit"
        className="w-full sm:w-auto inline-flex justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      >
        Get Rule Change Alerts
      </button>
      {status === 'ok' && <p className="text-sm text-emerald-700" role="status">Thanks — we’ll email you when rules change.</p>}
    </form>
  );
}
