import path from "path";

export const ROOT_DIR = path.resolve(__dirname, "../../");
export const UPLOAD_DIR = path.join(ROOT_DIR, "uploads");
export const REPORT_DIR = path.join(ROOT_DIR, "reports");
export const CHART_DIR = path.join(ROOT_DIR, "charts");
export const SAMPLES_DIR = path.join(UPLOAD_DIR, "samples");
export const TEMPLATE_DIR = path.join(ROOT_DIR, "src", "templates");

export const DEFAULT_PORT = 5001;

export const ALLOWED_FILE_TYPES = [".pdf", ".csv", ".txt"];
export const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB

export const GROQ_MODELS = {
  PRIMARY: "llama-3.3-70b-versatile",
  FALLBACK: "llama3-70b-8192",
};
