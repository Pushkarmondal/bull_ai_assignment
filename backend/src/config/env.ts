import dotenv from "dotenv";
import path from "path";
import { DEFAULT_PORT, ROOT_DIR } from "./constants";

dotenv.config({ path: path.join(ROOT_DIR, ".env") });

export const env = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : DEFAULT_PORT,
  NODE_ENV: process.env.NODE_ENV || "development",
  GROQ_API_KEY: process.env.GROQ_API_KEY || "",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
};
