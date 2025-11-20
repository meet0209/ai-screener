import type { Response } from 'express';
import type { AuthRequest } from '../middlewares/authMiddleware.js';
import { reportService } from '../services/reportService.js';

export const getScorecard = async (req: AuthRequest, res: Response) => {
  const report = await reportService.scorecard(req.params.candidateId);
  res.json(report);
};
