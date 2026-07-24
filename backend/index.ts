import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { env } from "./src/config/env";
import { REPORT_DIR, UPLOAD_DIR } from "./src/config/constants";
import reportRoutes from "./src/routes/report.routes";
import { errorHandler } from "./src/middlewares/errorHandler";
import { notFoundHandler } from "./src/middlewares/notFound";
import { logger } from "./src/utils/logger";

const app = express();

// Ensure output directories exist
[UPLOAD_DIR, REPORT_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve reports statically as well as via API route
app.use("/reports", express.static(REPORT_DIR));

// Routes
app.use(reportRoutes);

// Healthcheck
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 404 & Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.PORT, () => {
  logger.info(`Backend server running on http://localhost:${env.PORT}`);
});