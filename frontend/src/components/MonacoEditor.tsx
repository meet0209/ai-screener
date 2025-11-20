import Editor from '@monaco-editor/react';

interface MonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const MonacoEditor = ({ value, onChange }: MonacoEditorProps) => (
  <div style={{ height: 300 }}>
    <Editor
      height="100%"
      defaultLanguage="typescript"
      value={value}
      onChange={(val) => onChange(val ?? '')}
      options={{ fontSize: 14 }}
    />
  </div>
);
