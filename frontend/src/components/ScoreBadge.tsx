interface ScoreBadgeProps {
  value: number;
}

const getColor = (value: number) => {
  if (value >= 85) return '#22c55e';
  if (value >= 60) return '#f97316';
  return '#ef4444';
};

export const ScoreBadge = ({ value }: ScoreBadgeProps) => (
  <span
    style={{
      background: getColor(value),
      color: '#fff',
      padding: '4px 8px',
      borderRadius: '999px',
      fontWeight: 600,
    }}
  >
    {value}
  </span>
);
