import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT ?? 3000),
  redisUrl: process.env.REDIS_URL ?? "redis://localhost:6379",
  postgresUrl:
    process.env.POSTGRES_URL ?? "postgresql://postgres:postgres@localhost:5432/voice_ai",
  openAiApiKey: process.env.OPENAI_API_KEY ?? "",
  elevenLabsApiKey: process.env.ELEVENLABS_API_KEY ?? "",
  environment: process.env.NODE_ENV ?? "development",
};
