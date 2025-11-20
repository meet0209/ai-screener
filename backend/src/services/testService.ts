import { Candidate } from '../models/Candidate.js';
import { Test } from '../models/Test.js';
import { ApiError } from '../utils/errors.js';
import { enqueueJob } from '../jobs/queue.js';
import { JobType } from '../jobs/jobTypes.js';

export const testService = {
  async generate(candidateId: string) {
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) throw new ApiError(404, 'Candidate not found');

    const test = await Test.create({ candidate: candidate._id, mcqs: [], coding: [] });
    await enqueueJob(JobType.TestGeneration, {
      candidateId: candidate._id.toString(),
      testId: test._id.toString(),
      role: candidate.roleApplied,
    });
    return test;
  },

  async get(testId: string) {
    const test = await Test.findById(testId);
    if (!test) throw new ApiError(404, 'Test not found');
    return test;
  },

  async submit(testId: string, payload: { mcqAnswers: number[]; codingSubmission: string }) {
    const test = await Test.findById(testId);
    if (!test) throw new ApiError(404, 'Test not found');

    const mcqScore = test.mcqs.reduce((score, question, idx) => {
      return score + (question.answer === payload.mcqAnswers[idx] ? 1 : 0);
    }, 0);

    test.status = 'submitted';
    test.submittedAt = new Date();
    test.results = {
      mcqScore,
      codingNotes: payload.codingSubmission.slice(0, 500),
    };
    await test.save();

    await Candidate.findByIdAndUpdate(test.candidate, {
      $set: {
        'scores.mcq': Math.round((mcqScore / Math.max(test.mcqs.length, 1)) * 100),
        'scores.coding': 70,
      },
    });

    return test;
  },
};
