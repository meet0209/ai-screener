import type { WorkerOptions } from 'bullmq';
import { Worker } from 'bullmq';
import { Candidate } from '../models/Candidate.js';
import { JobType } from '../jobs/jobTypes.js';

export const resumeParserWorker = (connection: WorkerOptions['connection']) =>
  new Worker(
    JobType.ResumeParser,
    async (job) => {
      const { candidateId, rawText } = job.data as { candidateId: string; rawText: string };
      await Candidate.findByIdAndUpdate(candidateId, {
        resumeText: rawText,
        $push: { statusHistory: { stage: 'processing', updatedAt: new Date() } },
      });
      return { success: true };
    },
    { connection },
  );
