interface Props {
  status: {
    status_value: string;
    status_label: string;
  };
}

const colorMap: Record<string, string> = {
  approved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'not-approved': 'bg-slate-100 text-slate-700 border-slate-200',
  'not-currently-marketed': 'bg-slate-100 text-slate-700 border-slate-200',
  'safety-risk': 'bg-orange-100 text-orange-800 border-orange-200',
  restricted: 'bg-amber-100 text-amber-800 border-amber-200',
  resolved: 'bg-blue-100 text-blue-800 border-blue-200',
  'component-approved': 'bg-teal-100 text-teal-800 border-teal-200',
  'route-dependent': 'bg-purple-100 text-purple-800 border-purple-200',
  'not-listed': 'bg-gray-100 text-gray-700 border-gray-200',
  investigational: 'bg-gray-100 text-gray-700 border-gray-200',
  prohibited: 'bg-red-100 text-red-800 border-red-200',
  'partly-approved': 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

export default function StatusBadge({ status }: Props) {
  const classes = colorMap[status.status_value] || 'bg-gray-100 text-gray-700 border-gray-200';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${classes}`}>
      {status.status_label}
    </span>
  );
}
