import type { Response } from 'express';
import { candidateService } from '../services/candidateService.js';
import type { AuthRequest } from '../middlewares/authMiddleware.js';
import { extractResumeText } from '../utils/resumeParser.js';

export const uploadCandidate = async (req: AuthRequest, res: Response) => {
  const { name, email, roleApplied } = req.body;
  const resumeText = await extractResumeText(req.file ?? undefined);
  const candidate = await candidateService.createCandidate({ name, email, roleApplied, resumeText });
  res.status(201).json(candidate);
};

export const listCandidates = async (req: AuthRequest, res: Response) => {
  const { search, status } = req.query;
  const candidates = await candidateService.listCandidates({
    search: search as string | undefined,
    status: status as string | undefined,
  });
  res.json(candidates);
};

export const getCandidate = async (req: AuthRequest, res: Response) => {
  const candidate = await candidateService.getCandidate(req.params.id);
  res.json(candidate);
};

export const generateTest = async (req: AuthRequest, res: Response) => {
  const { testService } = await import('../services/testService.js');
  const test = await testService.generate(req.params.id);
  res.status(201).json(test);
};

export const reviewCandidate = async (req: AuthRequest, res: Response) => {
  const { scores = {}, notes } = req.body as { scores?: Record<string, number>; notes?: string };
  const candidate = await candidateService.updateScores(req.params.id, scores);
  if (notes) {
    candidate.aiNotes = notes;
    await candidate.save();
  }
  res.json(candidate);
};

export const exportCandidatesCsv = async (_req: AuthRequest, res: Response) => {
  const candidates = await candidateService.listCandidates({});
  const header = 'Name,Email,Role,Resume Score,MCQ Score,Final Status\n';
  const rows = candidates
    .map(
      (c) =>
        `${c.name},${c.email},${c.roleApplied},${c.scores.resume},${c.scores.mcq},${c.statusHistory?.at(-1)?.stage ?? ''}`,
    )
    .join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="candidates.csv"');
  res.send(header + rows);
};
