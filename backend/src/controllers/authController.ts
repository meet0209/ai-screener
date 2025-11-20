import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { ApiError } from '../utils/errors.js';
import { createTokens } from '../utils/token.js';
import { env } from '../config/env.js';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(400, 'Email already registered');
  const user = await User.create({ name, email, password, role });
  const tokens = createTokens({ id: user._id.toString(), role: user.role });
  res.status(201).json({ user, ...tokens });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, 'Invalid credentials');
  const valid = await user.comparePassword(password);
  if (!valid) throw new ApiError(401, 'Invalid credentials');
  const tokens = createTokens({ id: user._id.toString(), role: user.role });
  res.json({ user, ...tokens });
};

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body as { refreshToken?: string };
  if (!refreshToken) throw new ApiError(400, 'Refresh token required');
  try {
    const decoded = jwt.verify(refreshToken, env.refreshSecret) as { userId: string; role: string };
    const tokens = createTokens({ id: decoded.userId, role: decoded.role });
    res.json(tokens);
  } catch (error) {
    throw new ApiError(401, 'Invalid refresh token');
  }
};
