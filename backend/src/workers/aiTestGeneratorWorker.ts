import type { WorkerOptions } from 'bullmq';
import { Worker } from 'bullmq';
import { Test } from '../models/Test.js';
import { Candidate } from '../models/Candidate.js';
import { aiService } from '../services/aiService.js';
import { JobType } from '../jobs/jobTypes.js';

export const aiTestGeneratorWorker = (connection: WorkerOptions['connection']) =>
  new Worker(
    JobType.TestGeneration,
    async (job) => {
      const { candidateId, testId, role } = job.data as {
        candidateId: string;
        testId: string;
        role: string;
      };
      const candidate = await Candidate.findById(candidateId);
      if (!candidate) throw new Error('Candidate missing');
      const aiTest = await aiService.testGeneration({ role, skills: candidate.summary?.skills ?? [] });
      const mcqs = Array.from({ length: 10 }).map((_, idx) => ({
        question: `AI question ${idx + 1} for ${role}`,
        options: ['A', 'B', 'C', 'D'],
        answer: idx % 4,
      }));
      const coding = [
        { title: 'Problem 1', prompt: 'Implement API client', starterCode: '// TODO' },
        { title: 'Problem 2', prompt: 'Optimize query', starterCode: '// TODO' },
      ];
      await Test.findByIdAndUpdate(testId, { mcqs, coding, status: 'delivered' });
      return aiTest;
    },
    { connection },
  );
