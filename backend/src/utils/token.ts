import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const createTokens = (user: { id: string; role: string }) => {
  const accessToken = jwt.sign({ userId: user.id, role: user.role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
  const refreshToken = jwt.sign({ userId: user.id, role: user.role }, env.refreshSecret, {
    expiresIn: env.refreshExpiresIn,
  });
  return { accessToken, refreshToken };
};
