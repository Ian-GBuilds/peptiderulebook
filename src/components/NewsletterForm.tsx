import React, { useState } from 'react';

interface Props {
  variant?: 'inline' | 'card';
}

export default function NewsletterForm({ variant = 'card' }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'ok'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.includes('@')) {
      setStatus('ok');
      setEmail('');
    }
  };

  const wrapper = variant === 'inline'
    ? 'flex flex-col sm:flex-row gap-3 items-start sm:items-end'
    : 'card p-6';

  return (
    <form onSubmit={handleSubmit} className={wrapper}>
      {variant === 'card' && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold font-serif text-ink">Rule Change Alerts</h3>
          <p className="text-sm text-ink-muted mt-1">Get a short email when peptide statuses, shortages, or compounding rules change.</p>
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
          className="w-full rounded-sm border border-hairline bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/40"
        />
      </label>
      <button
        type="submit"
        className="btn-primary w-full sm:w-auto"
      >
        Get Rule Change Alerts
      </button>
      {status === 'ok' && <p className="text-sm text-stamp-green" role="status">Thanks — we’ll email you when rules change.</p>}
    </form>
  );
}
