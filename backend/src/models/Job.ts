import { Schema, model, type Document } from 'mongoose';

export interface IJob extends Document {
  jobId: string;
  type: string;
  payload: Record<string, unknown>;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  error?: string;
}

const jobSchema = new Schema<IJob>(
  {
    jobId: { type: String, required: true },
    type: { type: String, required: true },
    payload: { type: Schema.Types.Mixed, required: true },
    status: {
      type: String,
      enum: ['queued', 'processing', 'completed', 'failed'],
      default: 'queued',
    },
    error: { type: String },
  },
  { timestamps: true },
);

export const Job = model<IJob>('Job', jobSchema);
