import { useState } from 'react';

const Settings = () => {
  const [provider, setProvider] = useState('openai');
  const [apiKey, setApiKey] = useState('');

  const handleSave = () => {
    alert(Saved  provider settings);
  };

  return (
    <div className="card">
      <h2>AI Provider Settings</h2>
      <select value={provider} onChange={(e) => setProvider(e.target.value)}>
        <option value="openai">OpenAI</option>
        <option value="azure">Azure OpenAI</option>
      </select>
      <input
        placeholder="API key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        type="password"
      />
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default Settings;
