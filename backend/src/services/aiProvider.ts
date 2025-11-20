export interface ResumeSummaryPayload {
  resumeText: string;
}

export interface TestGenerationPayload {
  role: string;
  skills: string[];
}

export interface CodeReviewPayload {
  diff: string;
  repoUrl?: string;
}

export interface SimilarityPayload {
  artifactUrl?: string;
  repoUrl?: string;
}

export interface ScorecardPayload {
  candidateName: string;
  scores: Record<string, number>;
}

export interface AiProvider {
  summarizeResume(payload: ResumeSummaryPayload): Promise<Record<string, unknown>>;
  generateTest(payload: TestGenerationPayload): Promise<Record<string, unknown>>;
  reviewCode(payload: CodeReviewPayload): Promise<Record<string, unknown>>;
  checkSimilarity(payload: SimilarityPayload): Promise<Record<string, unknown>>;
  buildScorecard(payload: ScorecardPayload): Promise<Record<string, unknown>>;
}
