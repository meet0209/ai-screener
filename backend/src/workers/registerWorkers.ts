import { Worker } from 'bullmq';
import { env } from '../config/env.js';
import { Job } from '../models/Job.js';
import { logger } from '../utils/logger.js';
import { JobType } from '../jobs/jobTypes.js';
import { resumeParserWorker } from './resumeParserWorker.js';
import { aiResumeSummaryWorker } from './aiResumeSummaryWorker.js';
import { aiTestGeneratorWorker } from './aiTestGeneratorWorker.js';
import { autoCodeAnalysisWorker } from './autoCodeAnalysisWorker.js';
import { similarityWorker } from './similarityWorker.js';
import { aiCodeReviewWorker } from './aiCodeReviewWorker.js';

const connection = { url: env.redisUrl };

const workerMap: Record<JobType, Worker> = {
  [JobType.ResumeParser]: resumeParserWorker(connection),
  [JobType.ResumeSummary]: aiResumeSummaryWorker(connection),
  [JobType.TestGeneration]: aiTestGeneratorWorker(connection),
  [JobType.CodeAnalysis]: autoCodeAnalysisWorker(connection),
  [JobType.Similarity]: similarityWorker(connection),
  [JobType.AiCodeReview]: aiCodeReviewWorker(connection),
};

export const registerWorkers = async () => {
  Object.entries(workerMap).forEach(([type, worker]) => {
    worker.on('completed', async (job) => {
      await Job.create({ jobId: job.id, type, payload: job.data, status: 'completed' });
      logger.info(`${type} completed`, job.id);
    });
    worker.on('failed', async (job, err) => {
      await Job.create({ jobId: job?.id ?? 'unknown', type, payload: job?.data ?? {}, status: 'failed', error: err.message });
      logger.error(`${type} failed`, err);
    });
  });
};
