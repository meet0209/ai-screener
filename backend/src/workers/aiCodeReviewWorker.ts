import type { WorkerOptions } from 'bullmq';
import { Worker } from 'bullmq';
import { Assignment } from '../models/Assignment.js';
import { Candidate } from '../models/Candidate.js';
import { aiService } from '../services/aiService.js';
import { JobType } from '../jobs/jobTypes.js';

export const aiCodeReviewWorker = (connection: WorkerOptions['connection']) =>
  new Worker(
    JobType.AiCodeReview,
    async (job) => {
      const { assignmentId } = job.data as { assignmentId: string };
      const assignment = await Assignment.findById(assignmentId);
      if (!assignment) throw new Error('Assignment not found');
      const review = await aiService.codeReview({ diff: assignment.repoUrl ?? '' });
      await Assignment.findByIdAndUpdate(assignmentId, {
        $set: {
          'results.aiReview': review.review,
          status: 'completed',
        },
      });
      await Candidate.findByIdAndUpdate(assignment.candidate, {
        'scores.quality': 90,
      });
      return review;
    },
    { connection },
  );
