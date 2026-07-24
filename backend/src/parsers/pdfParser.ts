import { PDFParse } from "pdf-parse";
import fs from "fs/promises";
import { logger } from "../utils/logger";

export async function parsePdfFile(filePath: string): Promise<string> {
  try {
    const dataBuffer = await fs.readFile(filePath);
    const parser = new PDFParse({ data: dataBuffer });
    const parsedData = await parser.getText();
    logger.info(`Extracted ${parsedData.total} pages from PDF ${filePath}`);
    return parsedData.text;
  } catch (error: any) {
    logger.error(`Error parsing PDF file ${filePath}: ${error.message}`);
    throw new Error(`Failed to parse PDF document: ${error.message}`);
  }
}
