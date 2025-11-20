import type { NextFunction, Response } from 'express';
import { ApiError } from '../utils/errors.js';
import type { AuthRequest } from './authMiddleware.js';

export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthRequest, _res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new ApiError(403, 'Forbidden');
    }
    next();
  };
};
