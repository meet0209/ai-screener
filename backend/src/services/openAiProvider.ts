import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import OpenAI from 'openai';
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

export class OpenAiProvider implements AiProvider {
  private client = new OpenAI({ apiKey: env.openAiKey });

  private async chat(prompt: string, variables: Record<string, unknown>): Promise<string> {
    const template = Object.entries(variables).reduce((acc, [key, value]) => {
      return acc.replaceAll(`{{${key}}}`, Array.isArray(value) ? value.join(', ') : String(value));
    }, prompt);

    const response = await this.client.responses.create({
      model: 'gpt-4.1-mini',
      input: template,
    });
    return response.output?.[0]?.content?.[0]?.text?.value ?? '';
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
