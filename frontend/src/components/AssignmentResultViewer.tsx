interface AssignmentResultViewerProps {
  results?: {
    staticAnalysisLog?: string;
    similarityScore?: number;
    aiReview?: string;
  };
}

export const AssignmentResultViewer = ({ results }: AssignmentResultViewerProps) => (
  <div className="card">
    <h3>Assignment Results</h3>
    <p><strong>ESLint:</strong> {results?.staticAnalysisLog ?? 'Pending'}</p>
    <p><strong>Similarity:</strong> {results?.similarityScore ?? 'Pending'}%</p>
    <p><strong>AI Review:</strong> {results?.aiReview ?? 'Queued'}</p>
  </div>
);
