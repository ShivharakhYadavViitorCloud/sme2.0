import 'dotenv/config';

function required(name: string): string {
  const v = process.env[name];
  if (!v?.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return v.trim();
}

export const config = {
  port: Number(process.env.PORT) || 8787,
  /** MongoDB connection string (required for API persistence) */
  mongodbUri: required('MONGODB_URI'),
  /** OpenAI API key (required for /api/chat) */
  openaiApiKey: required('OPENAI_API_KEY'),
  openaiModel: process.env.OPENAI_MODEL?.trim() || 'gpt-4o-mini',
  /** Comma-separated browser origins allowed to call this API (e.g. http://localhost:3000,https://user.github.io) */
  corsOrigins: (process.env.CORS_ORIGINS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
};
