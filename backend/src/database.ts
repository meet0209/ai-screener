import mongoose from 'mongoose';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

mongoose.set('strictQuery', true);

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(env.mongoUri);
    logger.info('MongoDB connected');
  } catch (error) {
    logger.error('Mongo connection error', error);
    process.exit(1);
  }
};
