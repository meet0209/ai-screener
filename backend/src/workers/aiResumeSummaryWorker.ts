import type { WorkerOptions } from 'bullmq';
import { Worker } from 'bullmq';
import { Candidate } from '../models/Candidate.js';
import { aiService } from '../services/aiService.js';
import { JobType } from '../jobs/jobTypes.js';

const parseSummary = (raw: unknown) => {
  if (typeof raw === 'object' && raw !== null) return raw;
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch (error) {
      return { experience: raw };
    }
  }
  return {};
};

export const aiResumeSummaryWorker = (connection: WorkerOptions['connection']) =>
  new Worker(
    JobType.ResumeSummary,
    async (job) => {
      const { candidateId } = job.data as { candidateId: string };
      const candidate = await Candidate.findById(candidateId);
      if (!candidate) throw new Error('Candidate not found');
      const aiSummary = await aiService.resumeSummary({ resumeText: candidate.resumeText ?? '' });
      const parsed = parseSummary(aiSummary.summary);
      await Candidate.findByIdAndUpdate(candidateId, {
        summary: {
          skills: (parsed as any)?.skills ?? [],
          experience: (parsed as any)?.experience ?? '',
          projects: (parsed as any)?.projects ?? [],
          redFlags: (parsed as any)?.redFlags ?? [],
          headline: (parsed as any)?.headline ?? 'AI Summary',
        },
        'scores.resume': 80,
      });
      return aiSummary;
    },
    { connection },
  );
