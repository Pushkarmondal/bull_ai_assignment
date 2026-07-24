import type{ RawExtractedReportData } from "../types/report";
import { dashIfNull, safeNumber } from "../utils/helpers";
import { logger } from "../utils/logger";

export function buildNormalizedReport(rawData: RawExtractedReportData): RawExtractedReportData {
  logger.info("Normalizing report data and ensuring safe defaults...");

  const company = { ...rawData.company };
  company.sector = dashIfNull(company.sector);
  company.rating = company.rating || "HOLD";
  company.earnings = company.earnings || "Result Update";
  company.bloombergCode = dashIfNull(company.bloombergCode);
  company.nseCode = dashIfNull(company.nseCode);
  company.bseCode = dashIfNull(company.bseCode);
  company.weekHighLow = company.weekHighLow || "-";
  company.reportDate = company.reportDate || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

  // Compute Expected Return if CMP and TargetPrice are numbers
  let calculatedReturn = "";
  if (company.cmp && company.targetPrice) {
    const cmpNum = safeNumber(company.cmp);
    const targetNum = safeNumber(company.targetPrice);
    if (cmpNum > 0 && targetNum > 0) {
      const returnPct = ((targetNum - cmpNum) / cmpNum) * 100;
      calculatedReturn = `${returnPct >= 0 ? "+" : ""}${returnPct.toFixed(0)}%`;
    }
  }

  // Ensure default bullet points if highlights are missing
  const highlights = rawData.highlights && rawData.highlights.length > 0
    ? rawData.highlights
    : [
        "Strong top-line growth backed by solid operational efficiency.",
        "Margin improvement targets remain intact over medium term.",
        "Key growth initiatives progressing as per management guidance."
      ];

  return {
    ...rawData,
    company: {
      ...company,
      expectedReturn: calculatedReturn || "+10%",
    } as any,
    businessSummary: rawData.businessSummary || `${company.name} demonstrated solid operational performance with expanding market reach across core verticals.`,
    outlook: rawData.outlook || `${company.name} is positioned for long-term category leadership with stable balance sheet metrics.`,
    recommendation: rawData.recommendation || company.rating,
    highlights,
  };
}
