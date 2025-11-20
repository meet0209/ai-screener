import { Schema, model, type Document, type Types } from 'mongoose';

export interface IResumeSummary {
  skills: string[];
  experience: string;
  projects: string[];
  redFlags: string[];
  headline: string;
}

export interface CandidateStatusSnapshot {
  stage: 'uploaded' | 'processing' | 'testing' | 'completed' | 'rejected';
  updatedAt: Date;
}

export interface ICandidate extends Document {
  name: string;
  email: string;
  roleApplied: string;
  resumeUrl?: string;
  resumeText?: string;
  summary?: IResumeSummary;
  statusHistory: CandidateStatusSnapshot[];
  scores: {
    resume: number;
    mcq: number;
    coding: number;
    assignment: number;
    quality: number;
    similarityPenalty: number;
  };
  tags: string[];
  aiNotes?: string;
}

const summarySchema = new Schema<IResumeSummary>({
  skills: [{ type: String }],
  experience: { type: String },
  projects: [{ type: String }],
  redFlags: [{ type: String }],
  headline: { type: String },
});

const statusSchema = new Schema<CandidateStatusSnapshot>({
  stage: {
    type: String,
    enum: ['uploaded', 'processing', 'testing', 'completed', 'rejected'],
    default: 'uploaded',
  },
  updatedAt: { type: Date, default: Date.now },
});

const candidateSchema = new Schema<ICandidate>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    roleApplied: { type: String, required: true },
    resumeUrl: { type: String },
    resumeText: { type: String },
    summary: summarySchema,
    statusHistory: { type: [statusSchema], default: [] },
    scores: {
      resume: { type: Number, default: 0 },
      mcq: { type: Number, default: 0 },
      coding: { type: Number, default: 0 },
      assignment: { type: Number, default: 0 },
      quality: { type: Number, default: 0 },
      similarityPenalty: { type: Number, default: 0 },
    },
    tags: [{ type: String }],
    aiNotes: { type: String },
  },
  { timestamps: true },
);

candidateSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

export const Candidate = model<ICandidate>('Candidate', candidateSchema);

candidateSchema.index({ name: 'text', email: 'text', roleApplied: 'text' });

