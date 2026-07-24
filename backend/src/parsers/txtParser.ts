import fs from "fs/promises";
import { logger } from "../utils/logger";

export async function parseTxtFile(filePath: string): Promise<string> {
  try {
    const text = await fs.readFile(filePath, "utf-8");
    logger.info(`Read TXT file ${filePath} (${text.length} characters)`);
    return text;
  } catch (error: any) {
    logger.error(`Error reading TXT file ${filePath}: ${error.message}`);
    throw new Error(`Failed to read TXT document: ${error.message}`);
  }
}
