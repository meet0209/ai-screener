import { Schema, model, type Document, type Types } from 'mongoose';

export interface IAssignmentResult {
  staticAnalysisLog?: string;
  similarityScore?: number;
  aiReview?: string;
}

export interface IAssignment extends Document {
  candidate: Types.ObjectId;
  repoUrl?: string;
  artifactUrl?: string;
  status: 'pending' | 'processing' | 'completed';
  score: number;
  results: IAssignmentResult;
}

const assignmentSchema = new Schema<IAssignment>(
  {
    candidate: { type: Schema.Types.ObjectId, ref: 'Candidate', required: true },
    repoUrl: { type: String },
    artifactUrl: { type: String },
    status: { type: String, enum: ['pending', 'processing', 'completed'], default: 'pending' },
    score: { type: Number, default: 0 },
    results: {
      staticAnalysisLog: String,
      similarityScore: Number,
      aiReview: String,
    },
  },
  { timestamps: true },
);

export const Assignment = model<IAssignment>('Assignment', assignmentSchema);
