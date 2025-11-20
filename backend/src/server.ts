import { createApp } from './app.js';
import { connectDatabase } from './database.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';
import { registerWorkers } from './workers/registerWorkers.js';

const start = async () => {
  await connectDatabase();
  await registerWorkers();
  const app = createApp();
  app.listen(env.port, () => {
    logger.info(`Backend running on port ${env.port}`);
  });
};

void start();
