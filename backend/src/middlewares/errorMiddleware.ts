import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';

export const errorMiddleware = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response => {
  const status = err instanceof ApiError ? err.status : 500;
  const message = err.message || 'Internal Server Error';
  if (status >= 500) {
    logger.error('Unhandled error', err);
  }
  return res.status(status).json({ success: false, message });
};
