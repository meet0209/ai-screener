interface AISummaryCardProps {
  summary?: {
    headline?: string;
    skills?: string[];
    experience?: string;
    redFlags?: string[];
  };
}

export const AISummaryCard = ({ summary }: AISummaryCardProps) => (
  <div className="card">
    <h3>{summary?.headline ?? 'AI Summary'}</h3>
    <p>{summary?.experience ?? 'Awaiting AI processing.'}</p>
    <div>
      <strong>Skills:</strong> {summary?.skills?.join(', ') ?? 'N/A'}
    </div>
    <div>
      <strong>Red Flags:</strong> {summary?.redFlags?.join(', ') ?? 'None'}
    </div>
  </div>
);
