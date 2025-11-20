import { Candidate } from '../models/Candidate.js';
import { ApiError } from '../utils/errors.js';
import { aiService } from './aiService.js';

export const reportService = {
  async scorecard(candidateId: string) {
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) throw new ApiError(404, 'Candidate not found');

    const weights = {
      resume: 0.2,
      mcq: 0.15,
      coding: 0.25,
      assignment: 0.2,
      quality: 0.15,
      similarityPenalty: -0.15,
    } as const;

    const weighted = Object.entries(weights).reduce((acc, [key, weight]) => {
      const score = candidate.scores[key as keyof typeof candidate.scores] ?? 0;
      return acc + score * weight;
    }, 0);

    const finalScore = Math.max(0, Math.min(100, Math.round(weighted)));

    const recommendation =
      finalScore >= 85
        ? 'strong-hire'
        : finalScore >= 70
        ? 'interview'
        : finalScore >= 55
        ? 'hold'
        : 'reject';

    const aiScorecard = await aiService.scorecard({
      candidateName: candidate.name,
      scores: candidate.scores,
    });

    return { finalScore, recommendation, aiScorecard };
  },
};
