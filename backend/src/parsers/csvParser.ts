import csv from "csv-parser";
import fs from "fs";
import { logger } from "../utils/logger";

export async function parseCsvFile(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const results: Record<string, string>[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        logger.info(`Extracted ${results.length} rows from CSV ${filePath}`);
        // Convert array of objects to readable string format for AI
        const formattedText = results
          .map((row) =>
            Object.entries(row)
              .map(([key, value]) => `${key}: ${value}`)
              .join(" | ")
          )
          .join("\n");
        resolve(formattedText);
      })
      .on("error", (error) => {
        logger.error(`Error parsing CSV file ${filePath}: ${error.message}`);
        reject(new Error(`Failed to parse CSV document: ${error.message}`));
      });
  });
}
