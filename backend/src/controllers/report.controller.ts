import { Request, Response, NextFunction } from "express";
import fs from "fs/promises";
import path from "path";
import { generateReportPipeline } from "../services/generateReport.service";
import { REPORT_DIR } from "../config/constants";
import { logger } from "../utils/logger";

export async function generateReportController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const companyName = req.body.companyName || "Target Company";
    const file = req.file;

    if (!file) {
      res.status(400).json({
        success: false,
        error: "Please upload a valid financial context document (.pdf, .csv, or .txt)",
      });
      return;
    }

    logger.info(`Received report generation request for ${companyName} (${file.originalname})`);

    const result = await generateReportPipeline({
      companyName,
      filePath: file.path,
      originalFilename: file.originalname,
    });

    // Cleanup uploaded temp file
    try {
      await fs.unlink(file.path);
    } catch (e) {
      logger.warn(`Failed to cleanup temp file ${file.path}`);
    }

    res.status(200).json(result);
  } catch (error) {
    // Cleanup file if error occurs
    if (req.file?.path) {
      try {
        await fs.unlink(req.file.path);
      } catch (e) {
        // Ignore unlink error
      }
    }
    next(error);
  }
}

export async function downloadReportController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const filename = req.params.filename;
    const filePath = path.join(REPORT_DIR, filename);

    try {
      await fs.access(filePath);
    } catch {
      res.status(404).json({ success: false, error: "Report PDF not found" });
      return;
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
    res.sendFile(filePath);
  } catch (error) {
    next(error);
  }
}
