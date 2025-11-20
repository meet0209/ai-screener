import type { Response } from 'express';
import type { AuthRequest } from '../middlewares/authMiddleware.js';
import { assignmentService } from '../services/assignmentService.js';

export const submitAssignment = async (req: AuthRequest, res: Response) => {
  const assignment = await assignmentService.submit(req.params.candidateId, req.body);
  res.status(201).json(assignment);
};

export const getAssignmentResults = async (req: AuthRequest, res: Response) => {
  const assignment = await assignmentService.getResults(req.params.id);
  res.json(assignment);
};
