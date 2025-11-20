import type { WorkerOptions } from 'bullmq';
import { Worker } from 'bullmq';
import { Assignment } from '../models/Assignment.js';
import { Candidate } from '../models/Candidate.js';
import { aiService } from '../services/aiService.js';
import { JobType } from '../jobs/jobTypes.js';

export const similarityWorker = (connection: WorkerOptions['connection']) =>
  new Worker(
    JobType.Similarity,
    async (job) => {
      const { assignmentId } = job.data as { assignmentId: string };
      const assignment = await Assignment.findById(assignmentId);
      if (!assignment) throw new Error('Assignment missing');
      const response = await aiService.similarity({ assignmentId, repoUrl: assignment.repoUrl });
      const similarityScore = 5;
      await Assignment.findByIdAndUpdate(assignmentId, {
        $set: {
          'results.similarityScore': similarityScore,
        },
      });
      await Candidate.findByIdAndUpdate(assignment.candidate, {
        'scores.similarityPenalty': similarityScore,
      });
      return response;
    },
    { connection },
  );
