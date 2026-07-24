import type { ChartSeriesData, GeneratedCharts } from "../types/report";
import { logger } from "../utils/logger";
import fs from "fs/promises";
import { CHART_DIR } from "../config/constants";

function renderDualAxisChartSvg(
  title: string,
  labels: string[],
  barLabel: string,
  barData: number[],
  lineLabel: string,
  lineData: number[]
): string {
  const width = 480;
  const height = 220;
  const padding = { top: 35, right: 45, bottom: 40, left: 45 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const minBar = Math.min(0, ...barData);
  const maxBar = Math.max(...barData) || 1;
  const barRange = maxBar - minBar || 1;

  const minLine = Math.min(0, ...lineData);
  const maxLine = Math.max(...lineData) || 1;
  const lineRange = maxLine - minLine || 1;

  const numItems = labels.length;
  const step = chartWidth / Math.max(numItems, 1);
  const barWidth = Math.min(24, step * 0.5);

  let barElements = "";
  const linePoints: { x: number; y: number }[] = [];
  let xLabels = "";

  for (let i = 0; i < numItems; i++) {
    const xCenter = padding.left + i * step + step / 2;

    // Bar element
    const valBar = barData[i] ?? 0;
    const barY = padding.top + chartHeight - ((valBar - minBar) / barRange) * chartHeight;
    const barZeroY = padding.top + chartHeight - ((0 - minBar) / barRange) * chartHeight;
    const h = Math.max(1, Math.abs(barZeroY - barY));
    const topY = Math.min(barY, barZeroY);

    barElements += `<rect x="${xCenter - barWidth / 2}" y="${topY}" width="${barWidth}" height="${h}" fill="#00a699" rx="2" />`;

    // Line point
    const valLine = lineData[i] ?? 0;
    const lineY = padding.top + chartHeight - ((valLine - minLine) / lineRange) * chartHeight;
    linePoints.push({ x: xCenter, y: lineY });

    // X Axis label
    xLabels += `<text x="${xCenter}" y="${height - 15}" font-family="sans-serif" font-size="9" fill="#666" text-anchor="middle">${labels[i]}</text>`;
  }

  // Line path and dots
  const pathD = linePoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  let dots = "";
  for (const p of linePoints) {
    dots += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3" fill="#ff8c00" stroke="#ffffff" stroke-width="1.5" />`;
  }

  // Y-axis gridlines & ticks
  let gridLines = "";
  const numGrid = 4;
  for (let i = 0; i <= numGrid; i++) {
    const yRatio = i / numGrid;
    const yPos = padding.top + chartHeight * (1 - yRatio);
    const leftVal = Math.round(minBar + barRange * yRatio);
    const rightVal = (minLine + lineRange * yRatio).toFixed(1);

    gridLines += `
      <line x1="${padding.left}" y1="${yPos.toFixed(1)}" x2="${(width - padding.right).toFixed(1)}" y2="${yPos.toFixed(1)}" stroke="#eeeeee" stroke-dasharray="2 2" />
      <text x="${padding.left - 5}" y="${(yPos + 3).toFixed(1)}" font-family="sans-serif" font-size="8" fill="#888" text-anchor="end">${leftVal}</text>
      <text x="${width - padding.right + 5}" y="${(yPos + 3).toFixed(1)}" font-family="sans-serif" font-size="8" fill="#888" text-anchor="start">${rightVal}%</text>
    `;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="100%" height="100%" fill="#ffffff" />
    <text x="15" y="20" font-family="sans-serif" font-size="13" font-weight="bold" fill="#333">${title}</text>
    <rect x="${width - 180}" y="10" width="10" height="10" fill="#00a699" rx="1" />
    <text x="${width - 165}" y="18" font-family="sans-serif" font-size="9" fill="#555">${barLabel}</text>
    <line x1="${width - 85}" y1="15" x2="${width - 70}" y2="15" stroke="#ff8c00" stroke-width="2" />
    <circle cx="${width - 77.5}" cy="15" r="2.5" fill="#ff8c00" />
    <text x="${width - 65}" y="18" font-family="sans-serif" font-size="9" fill="#555">${lineLabel}</text>
    ${gridLines}
    ${barElements}
    <path d="${pathD}" fill="none" stroke="#ff8c00" stroke-width="2" />
    ${dots}
    ${xLabels}
  </svg>`.trim();

  const base64 = Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}

export async function generateReportCharts(
  reportId: string,
  data?: ChartSeriesData
): Promise<GeneratedCharts> {
  logger.info(`Generating SVG chart graphics for report ${reportId}...`);
  await fs.mkdir(CHART_DIR, { recursive: true });

  const labels = data?.labels || ["Q2FY24", "Q3FY24", "Q4FY24", "Q1FY25", "Q2FY25", "Q3FY25", "Q4FY25", "Q1FY26"];
  const revenue = data?.revenue || [2800, 3100, 3500, 4206, 4800, 5200, 5833, 7167];
  const revenueGrowth = data?.revenueGrowth || [17.9, 15.4, 18.1, 14.1, 12.6, 7.9, 20.0, 22.9];
  const gov = data?.gov || [110, 125, 140, 155, 170, 185, 200, 220];
  const govGrowth = data?.govGrowth || [13.4, 12.8, 14.2, 14.4, 14.3, 15.8, 16.7, 18.0];
  const ebitda = data?.ebitda || [40, 65, 90, 177, 210, 160, 72, 115];
  const ebitdaMargin = data?.ebitdaMargin || [-1.7, 1.6, 2.4, 4.2, 4.7, 3.0, 1.2, 1.6];
  const pat = data?.pat || [20, 45, 80, 253, 230, 180, 39, 25];
  const patMargin = data?.patMargin || [1.3, 2.0, 4.2, 6.0, 4.9, 3.7, 0.7, 0.3];

  const revenueChartUrl = renderDualAxisChartSvg("Revenue", labels, "Revenue (Rs.cr)", revenue, "Growth (QoQ %)", revenueGrowth);
  const govChartUrl = renderDualAxisChartSvg("Gross Order Value", labels, "GOV (Rs. Bn)", gov, "Growth (QoQ %)", govGrowth);
  const ebitdaChartUrl = renderDualAxisChartSvg("EBITDA", labels, "EBITDA (Rs.cr)", ebitda, "Margin (%)", ebitdaMargin);
  const patChartUrl = renderDualAxisChartSvg("PAT", labels, "PAT (Rs.cr)", pat, "Margin (%)", patMargin);

  logger.info(`SVG Charts generated successfully for report ${reportId}`);

  return {
    revenueChartUrl,
    govChartUrl,
    ebitdaChartUrl,
    patChartUrl,
  };
}
