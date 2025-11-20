import { Schema, model, type Document, type Types } from 'mongoose';

export interface IMcqQuestion {
  question: string;
  options: string[];
  answer: number;
}

export interface ICodingChallenge {
  title: string;
  prompt: string;
  starterCode: string;
}

export interface ITest extends Document {
  candidate: Types.ObjectId;
  mcqs: IMcqQuestion[];
  coding: ICodingChallenge[];
  status: 'draft' | 'delivered' | 'submitted';
  submittedAt?: Date;
  results?: {
    mcqScore: number;
    codingNotes: string;
  };
}

const testSchema = new Schema<ITest>(
  {
    candidate: { type: Schema.Types.ObjectId, ref: 'Candidate', required: true },
    mcqs: [
      {
        question: { type: String, required: true },
        options: { type: [String], required: true },
        answer: { type: Number, required: true },
      },
    ],
    coding: [
      {
        title: String,
        prompt: String,
        starterCode: String,
      },
    ],
    status: { type: String, enum: ['draft', 'delivered', 'submitted'], default: 'draft' },
    submittedAt: { type: Date },
    results: {
      mcqScore: Number,
      codingNotes: String,
    },
  },
  { timestamps: true },
);

export const Test = model<ITest>('Test', testSchema);
