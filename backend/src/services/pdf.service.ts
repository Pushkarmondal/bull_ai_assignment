import puppeteer from "puppeteer";
import handlebars from "handlebars";
import fs from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import type { ReportTemplateData } from "../types/report";
import { REPORT_DIR, TEMPLATE_DIR } from "../config/constants";
import { logger } from "../utils/logger";

function findChromeExecutable(): string | undefined {
  const possiblePaths = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  ];
  for (const executablePath of possiblePaths) {
    if (existsSync(executablePath)) {
      return executablePath;
    }
  }
  return undefined;
}

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

  const executablePath = findChromeExecutable();
  logger.info(`Launching headless Puppeteer browser (executable: ${executablePath || "default cache"})...`);

  const launchArgs = ["--no-sandbox", "--disable-setuid-sandbox", "--font-render-hinting=medium"];
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
      ...(executablePath ? { executablePath } : {}),
      args: launchArgs,
    });
  } catch (err) {
    logger.warn(`Default Puppeteer launch failed. Attempting channel 'chrome'... ${err}`);
    browser = await puppeteer.launch({
      headless: true,
      channel: "chrome",
      args: launchArgs,
    });
  }

  try {
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });

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
