import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../utils/apiClient';

const ReviewPanel = () => {
  const { id } = useParams();
  const [notes, setNotes] = useState('');
  const [qualityScore, setQualityScore] = useState(80);
  const [status, setStatus] = useState('');

  const handleSave = async () => {
    await api.post(/candidates//review, { scores: { quality: qualityScore }, notes });
    setStatus('Review saved');
  };

  return (
    <div className="card">
      <h2>Reviewer Panel</h2>
      <textarea placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <input
        type="number"
        value={qualityScore}
        min={0}
        max={100}
        onChange={(e) => setQualityScore(Number(e.target.value))}
      />
      <button onClick={handleSave}>Save</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default ReviewPanel;
