import { Queue } from 'bullmq';
import { env } from '../config/env.js';
import { JobType } from './jobTypes.js';

const connection = env.redisUrl;

const queues: Record<JobType, Queue> = Object.values(JobType).reduce((acc, type) => {
  acc[type as JobType] = new Queue(type as JobType, { connection: { url: connection } });
  return acc;
}, {} as Record<JobType, Queue>);

export const enqueueJob = async (type: JobType, payload: Record<string, unknown>) => {
  const queue = queues[type];
  return queue.add(type, payload, { attempts: 3, backoff: { type: 'exponential', delay: 5000 } });
};

export const getQueue = (type: JobType) => queues[type];
