import dotenv from 'dotenv';

dotenv.config();

const required = ['MONGODB_URI', 'JWT_SECRET', 'REDIS_URL']; // GEMINI_API_KEY is optional for now

required.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`[env] Missing ${key} in environment. Using fallback if available.`);
  }
});

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 5000),
  mongoUri: process.env.MONGODB_URI ?? 'mongodb://mongo:27017/ai_screener',
  redisUrl: process.env.REDIS_URL ?? 'redis://redis:6379',
  jwtSecret: process.env.JWT_SECRET ?? 'super-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '15m',
  refreshSecret: process.env.REFRESH_SECRET ?? 'refresh-secret',
  refreshExpiresIn: process.env.REFRESH_EXPIRES_IN ?? '7d',
  openAiKey: process.env.OPENAI_API_KEY ?? '',
  geminiApiKey: process.env.GEMINI_API_KEY ?? '',
};
