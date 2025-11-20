import type { ICandidate } from '../models/Candidate.js';
import { Candidate } from '../models/Candidate.js';
import { ApiError } from '../utils/errors.js';
import { enqueueJob } from '../jobs/queue.js';
import { JobType } from '../jobs/jobTypes.js';

export const candidateService = {
  async createCandidate(data: {
    name: string;
    email: string;
    roleApplied: string;
    resumeText?: string;
  }) {
    const candidate = await Candidate.create({
      ...data,
      statusHistory: [{ stage: 'uploaded', updatedAt: new Date() }],
    });
    if (data.resumeText) {
      await enqueueJob(JobType.ResumeParser, {
        candidateId: candidate._id.toString(),
        rawText: data.resumeText,
      });
      await enqueueJob(JobType.ResumeSummary, { candidateId: candidate._id.toString() });
    }
    return candidate;
  },

  async listCandidates(query: { search?: string; status?: string }) {
    const filter: Record<string, unknown> = {};
    if (query.search) {
      filter.$text = { $search: query.search };
    }
    if (query.status) {
      filter['statusHistory.stage'] = query.status;
    }
    return Candidate.find(filter).sort({ createdAt: -1 });
  },

  async getCandidate(id: string) {
    const candidate = await Candidate.findById(id);
    if (!candidate) throw new ApiError(404, 'Candidate not found');
    return candidate;
  },

  async updateScores(id: string, scores: Partial<ICandidate['scores']>) {
    const candidate = await Candidate.findByIdAndUpdate(
      id,
      {
        $set: Object.entries(scores).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [`scores.${key}`]: value,
          }),
          {},
        ),
      },
      { new: true },
    );
    if (!candidate) throw new ApiError(404, 'Candidate not found');
    return candidate;
  },
};
