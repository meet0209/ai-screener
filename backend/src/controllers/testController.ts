import type { Response } from 'express';
import type { AuthRequest } from '../middlewares/authMiddleware.js';
import { testService } from '../services/testService.js';

export const getTest = async (req: AuthRequest, res: Response) => {
  const test = await testService.get(req.params.id);
  res.json(test);
};

export const submitTest = async (req: AuthRequest, res: Response) => {
  const test = await testService.submit(req.params.id, req.body);
  res.json(test);
};
