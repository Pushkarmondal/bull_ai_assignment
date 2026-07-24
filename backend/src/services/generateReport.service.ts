import path from "path";
import { parsePdfFile } from "../parsers/pdfParser";
import { parseCsvFile } from "../parsers/csvParser";
import { parseTxtFile } from "../parsers/txtParser";
import { extractFinancialData } from "../llm/extractor";
import { buildNormalizedReport } from "../builders/reportBuilder";
import { generateReportCharts } from "./chart.service";
import { mapToTemplateData } from "../builders/templateMapper";
import { generatePdfReport } from "./pdf.service";
import { logger } from "../utils/logger";

export interface GenerateReportInput {
  companyName: string;
  filePath: string;
  originalFilename: string;
}

export interface GenerateReportOutput {
  success: boolean;
  reportUrl: string;
  companyName: string;
  generatedAt: string;
}

export async function generateReportPipeline(
  input: GenerateReportInput
): Promise<GenerateReportOutput> {
  const { companyName, filePath, originalFilename } = input;
  const ext = path.extname(originalFilename).toLowerCase();
  const reportId = `${companyName.toLowerCase().replace(/[^a-z0-9]/g, "_")}_${Date.now()}`;

  logger.info(`Starting report generation pipeline for ${companyName} (${ext})...`);

  // Step 1: Text extraction
  let extractedText = "";
  if (ext === ".pdf") {
    extractedText = await parsePdfFile(filePath);
  } else if (ext === ".csv") {
    extractedText = await parseCsvFile(filePath);
  } else if (ext === ".txt") {
    extractedText = await parseTxtFile(filePath);
  } else {
    throw new Error(`Unsupported file type: ${ext}`);
  }

  // Step 2: AI extraction
  const rawReportData = await extractFinancialData(companyName, extractedText);

  // Step 3: Normalize report & missing value fallbacks
  const normalizedReport = buildNormalizedReport(rawReportData);

  // Step 4: Render Charts
  const charts = await generateReportCharts(reportId, normalizedReport.chartData);

  // Step 5: Map to Handlebars View Model
  const templateData = mapToTemplateData(normalizedReport, charts);

  // Step 6: Generate PDF Report
  const reportUrl = await generatePdfReport(reportId, templateData);

  logger.info(`Report generation completed for ${companyName}: ${reportUrl}`);

  return {
    success: true,
    reportUrl,
    companyName: normalizedReport.company.name,
    generatedAt: new Date().toISOString(),
  };
}
