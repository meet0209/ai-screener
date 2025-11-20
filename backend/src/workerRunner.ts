import { connectDatabase } from './database.js';
import { registerWorkers } from './workers/registerWorkers.js';
import { logger } from './utils/logger.js';

const start = async () => {
  await connectDatabase();
  await registerWorkers();
  logger.info('Workers ready');
};

void start();
