import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { api } from '../utils/apiClient';
import { AISummaryCard } from '../components/AISummaryCard';
import { ScoreBadge } from '../components/ScoreBadge';

const CandidateDetails = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ['candidate', id],
    queryFn: async () => (await api.get(/candidates/)).data,
  });

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>{data.name}</h1>
          <p>{data.email}</p>
        </div>
        <div className="actions">
          <Link to={/candidates//resume}>View Resume</Link>
          <Link to={/assignments/}>Assignment</Link>
          <Link to={/review/}>Review Panel</Link>
        </div>
      </div>
      <AISummaryCard summary={data.summary} />
      <div className="card">
        <h3>Scores</h3>
        <div className="score-grid">
          {Object.entries(data.scores ?? {}).map(([key, value]) => (
            <div key={key} className="score-item">
              <span>{key}</span>
              <ScoreBadge value={value as number} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateDetails;
