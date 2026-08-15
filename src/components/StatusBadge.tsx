interface Props {
  status: {
    status_value: string;
    status_label: string;
  };
}

const colorMap: Record<string, string> = {
  approved: 'stamp-green',
  'not-approved': 'stamp-neutral',
  'not-currently-marketed': 'stamp-neutral',
  'safety-risk': 'stamp-red',
  restricted: 'stamp-amber',
  resolved: 'stamp-blue',
  'component-approved': 'stamp-green',
  'route-dependent': 'stamp-amber',
  'not-listed': 'stamp-neutral',
  investigational: 'stamp-neutral',
  prohibited: 'stamp-red',
  'partly-approved': 'stamp-amber',
};

export default function StatusBadge({ status }: Props) {
  const classes = colorMap[status.status_value] || 'stamp-neutral';
  return (
    <span className={`stamp ${classes}`}>
      {status.status_label}
    </span>
  );
}
