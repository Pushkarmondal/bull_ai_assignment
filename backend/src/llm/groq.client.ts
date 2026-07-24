import Groq from "groq-sdk";
import { env } from "../config/env";
import { logger } from "../utils/logger";

let groqInstance: Groq | null = null;

export function getGroqClient(): Groq | null {
  if (!env.GROQ_API_KEY) {
    logger.warn("GROQ_API_KEY environment variable is not set. Real AI extraction will fallback to sample template generator if key is missing.");
    return null;
  }
  if (!groqInstance) {
    groqInstance = new Groq({
      apiKey: env.GROQ_API_KEY,
    });
  }
  return groqInstance;
}
