import type { WorkerOptions } from 'bullmq';
import { Worker } from 'bullmq';
import { Assignment } from '../models/Assignment.js';
import { Candidate } from '../models/Candidate.js';
import { JobType } from '../jobs/jobTypes.js';

export const autoCodeAnalysisWorker = (connection: WorkerOptions['connection']) =>
  new Worker(
    JobType.CodeAnalysis,
    async (job) => {
      const { assignmentId } = job.data as { assignmentId: string };
      const assignment = await Assignment.findByIdAndUpdate(
        assignmentId,
        {
          $set: {
            'results.staticAnalysisLog': 'ESLint issues: 0 (mocked)',
            score: 85,
          },
        },
        { new: true },
      );
      if (assignment) {
        await Candidate.findByIdAndUpdate(assignment.candidate, {
          'scores.assignment': assignment.score,
          'scores.quality': 80,
        });
      }
    },
    { connection },
  );
