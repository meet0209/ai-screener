import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './api/swagger.js';
import routes from './routes/index.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

export const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(helmet());
  app.use(express.json({ limit: '10mb' }));
  app.use(morgan('dev'));

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/api', routes);

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use(errorMiddleware);
  return app;
};
