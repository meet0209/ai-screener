import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../utils/apiClient';
import { MonacoEditor } from '../components/MonacoEditor';

const TestRunner = () => {
  const { id } = useParams();
  const [answers, setAnswers] = useState<number[]>([]);
  const [code, setCode] = useState('');

  const { data } = useQuery({
    queryKey: ['test', id],
    queryFn: async () => (await api.get(/tests/)).data,
  });

  const mutation = useMutation({
    mutationFn: async () => api.post(/tests//submit, { mcqAnswers: answers, codingSubmission: code }),
  });

  return (
    <div>
      <h1>Test Runner</h1>
      {data?.mcqs?.map((mcq: any, idx: number) => (
        <div key={mcq.question} className="card">
          <p>{mcq.question}</p>
          {mcq.options.map((option: string, optionIdx: number) => (
            <label key={option}>
              <input
                type="radio"
                name={q-}
                onChange={() =>
                  setAnswers((prev) => {
                    const next = [...prev];
                    next[idx] = optionIdx;
                    return next;
                  })
                }
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <h2>Coding Challenges</h2>
      <MonacoEditor value={code} onChange={setCode} />
      <button onClick={() => mutation.mutate()} disabled={mutation.isLoading}>
        Submit Test
      </button>
    </div>
  );
};

export default TestRunner;
