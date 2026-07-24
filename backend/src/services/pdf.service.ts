import puppeteer from "puppeteer";
import handlebars from "handlebars";
import fs from "fs/promises";
import path from "path";
import { ReportTemplateData } from "../types/report";
import { REPORT_DIR, TEMPLATE_DIR } from "../config/constants";
import { logger } from "../utils/logger";

export async function generatePdfReport(
  reportId: string,
  templateData: ReportTemplateData
): Promise<string> {
  logger.info(`Building PDF report for ${templateData.company.name} (${reportId})...`);

  // 1. Read Handlebars template & CSS
  const hbsPath = path.join(TEMPLATE_DIR, "report.hbs");
  const cssPath = path.join(TEMPLATE_DIR, "report.css");

  const hbsContent = await fs.readFile(hbsPath, "utf-8");
  const cssContent = await fs.readFile(cssPath, "utf-8");

  // 2. Compile template
  const compiledTemplate = handlebars.compile(hbsContent);
  const htmlContent = compiledTemplate({
    ...templateData,
    cssContent,
  });

  // 3. Launch Puppeteer
  await fs.mkdir(REPORT_DIR, { recursive: true });
  const pdfFilename = `${reportId}.pdf`;
  const pdfFilePath = path.join(REPORT_DIR, pdfFilename);

  logger.info("Launching headless Puppeteer browser...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--font-render-hinting=medium"],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Print A4 PDF
    await page.pdf({
      path: pdfFilePath,
      format: "A4",
      printBackground: true,
      margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
    });

    logger.info(`PDF generated successfully: ${pdfFilePath}`);
    return `/reports/${pdfFilename}`;
  } finally {
    await browser.close();
  }
}
