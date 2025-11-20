import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../config/env.js';
import type {
  AiProvider,
  CodeReviewPayload,
  ResumeSummaryPayload,
  ScorecardPayload,
  SimilarityPayload,
  TestGenerationPayload,
} from './aiProvider.js';

const loadPrompt = (name: string): string => {
  const cwd = process.cwd();
  const distPath = join(cwd, 'dist', 'ai', 'prompts', name);
  if (existsSync(distPath)) {
    return readFileSync(distPath, 'utf-8');
  }
  return readFileSync(join(cwd, 'src', 'ai', 'prompts', name), 'utf-8');
};

export class GeminiProvider implements AiProvider {
  private client: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.client = new GoogleGenerativeAI(env.geminiApiKey || '');
    // Using Gemini 1.5 Flash for speed and cost-effectiveness
    this.model = this.client.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  private async chat(prompt: string, variables: Record<string, unknown>): Promise<string> {
    // Interpolate variables into the prompt template
    const template = Object.entries(variables).reduce((acc, [key, value]) => {
      return acc.replaceAll(`{{${key}}}`, Array.isArray(value) ? value.join(', ') : String(value));
    }, prompt);

    try {
      // Generate content using Gemini
      const result = await this.model.generateContent(template);
      const response = await result.response;
      const text = response.text();
      return text || '';
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error(`Failed to generate content: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async summarizeResume(payload: ResumeSummaryPayload): Promise<Record<string, unknown>> {
    const prompt = loadPrompt('resumeSummary.md');
    const text = await this.chat(prompt, { resumeText: payload.resumeText });
    return { summary: text };
  }

  async generateTest(payload: TestGenerationPayload): Promise<Record<string, unknown>> {
    const prompt = loadPrompt('testGeneration.md');
    const text = await this.chat(prompt, payload);
    return { test: text };
  }

  async reviewCode(payload: CodeReviewPayload): Promise<Record<string, unknown>> {
    const prompt = loadPrompt('codeReview.md');
    const text = await this.chat(prompt, payload);
    return { review: text };
  }

  async checkSimilarity(payload: SimilarityPayload): Promise<Record<string, unknown>> {
    const prompt = loadPrompt('similarityCheck.md');
    const text = await this.chat(prompt, payload);
    return { similarity: text };
  }

  async buildScorecard(payload: ScorecardPayload): Promise<Record<string, unknown>> {
    const prompt = loadPrompt('scorecard.md');
    const text = await this.chat(prompt, payload);
    return { scorecard: text };
  }
}
