import { useState } from 'react';
import { DataTable } from '../components/DataTable';
import { ScoreBadge } from '../components/ScoreBadge';
import { useCandidates } from '../hooks/useCandidates';
import { Link } from 'react-router-dom';
import { FileUploader } from '../components/FileUploader';
import { api } from '../utils/apiClient';

const Dashboard = () => {
  const [search, setSearch] = useState('');
  const [newCandidate, setNewCandidate] = useState({ name: '', email: '', roleApplied: '' });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const { data = [], refetch } = useCandidates(search);

  const handleUpload = async () => {
    const formData = new FormData();
    Object.entries(newCandidate).forEach(([key, value]) => formData.append(key, value));
    if (resumeFile) formData.append('resume', resumeFile);
    await api.post('/candidates/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setNewCandidate({ name: '', email: '', roleApplied: '' });
    setResumeFile(null);
    refetch();
  };

  const handleExport = async () => {
    const { data: blob } = await api.get('/candidates/export/csv', { responseType: 'blob' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'candidates.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="page-header">
        <h1>Candidate Dashboard</h1>
        <div className="actions">
          <input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button onClick={handleExport}>Export CSV</button>
        </div>
      </div>
      <div className="card">
        <h3>Upload Resume</h3>
        <div className="form-grid">
          <input
            placeholder="Name"
            value={newCandidate.name}
            onChange={(e) => setNewCandidate((prev) => ({ ...prev, name: e.target.value }))}
          />
          <input
            placeholder="Email"
            value={newCandidate.email}
            onChange={(e) => setNewCandidate((prev) => ({ ...prev, email: e.target.value }))}
          />
          <input
            placeholder="Role"
            value={newCandidate.roleApplied}
            onChange={(e) => setNewCandidate((prev) => ({ ...prev, roleApplied: e.target.value }))}
          />
        </div>
        <FileUploader onUpload={setResumeFile} />
        <button onClick={handleUpload}>Create Candidate</button>
      </div>
      <DataTable
        data={data}
        columns={[
          { header: 'Name', accessor: 'name', render: (value, row) => <Link to={/candidates/}>{value}</Link> },
          { header: 'Role', accessor: 'roleApplied' },
          { header: 'Resume', accessor: 'scores', render: (_v, row) => <ScoreBadge value={row.scores?.resume ?? 0} /> },
          { header: 'Status', accessor: 'statusHistory', render: (_v, row) => row.statusHistory?.at(-1)?.stage ?? 'N/A' },
        ]}
      />
    </div>
  );
};

export default Dashboard;
