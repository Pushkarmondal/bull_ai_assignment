import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import type{ ChartConfiguration } from "chart.js";
import type{ ChartSeriesData, GeneratedCharts } from "../types/report";
import { logger } from "../utils/logger";
import path from "path";
import fs from "fs/promises";
import { CHART_DIR } from "../config/constants";

const width = 480;
const height = 220;

const chartJSNodeCanvas = new ChartJSNodeCanvas({
  width,
  height,
  backgroundColour: "#ffffff",
});

export async function generateReportCharts(
  reportId: string,
  data?: ChartSeriesData
): Promise<GeneratedCharts> {
  logger.info(`Generating chart graphics for report ${reportId}...`);
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

  // 1. Revenue Chart
  const revenueConfig: ChartConfiguration = {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          type: "bar",
          label: "Revenue (Rs.cr)",
          data: revenue,
          backgroundColor: "#00a699",
          borderRadius: 2,
          yAxisID: "y",
        },
        {
          type: "line",
          label: "Growth (QoQ %)",
          data: revenueGrowth,
          borderColor: "#ff8c00",
          backgroundColor: "#ff8c00",
          borderWidth: 2,
          pointRadius: 3,
          fill: false,
          yAxisID: "y1",
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        legend: { display: false },
        title: { display: true, text: "Revenue", align: "start", font: { size: 14, weight: "bold" } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 9 } } },
        y: { type: "linear", position: "left", ticks: { font: { size: 9 } } },
        y1: { type: "linear", position: "right", grid: { display: false }, ticks: { font: { size: 9 } } },
      },
    },
  };

  // 2. Gross Order Value Chart
  const govConfig: ChartConfiguration = {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          type: "bar",
          label: "GOV (Rs. Bn)",
          data: gov,
          backgroundColor: "#00a699",
          borderRadius: 2,
          yAxisID: "y",
        },
        {
          type: "line",
          label: "Growth (QoQ %)",
          data: govGrowth,
          borderColor: "#ff8c00",
          backgroundColor: "#ff8c00",
          borderWidth: 2,
          pointRadius: 3,
          fill: false,
          yAxisID: "y1",
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        legend: { display: false },
        title: { display: true, text: "Gross Order Value", align: "start", font: { size: 14, weight: "bold" } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 9 } } },
        y: { type: "linear", position: "left", ticks: { font: { size: 9 } } },
        y1: { type: "linear", position: "right", grid: { display: false }, ticks: { font: { size: 9 } } },
      },
    },
  };

  // 3. EBITDA Chart
  const ebitdaConfig: ChartConfiguration = {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          type: "bar",
          label: "EBITDA (Rs.cr)",
          data: ebitda,
          backgroundColor: "#00a699",
          borderRadius: 2,
          yAxisID: "y",
        },
        {
          type: "line",
          label: "Margin (%)",
          data: ebitdaMargin,
          borderColor: "#ff8c00",
          backgroundColor: "#ff8c00",
          borderWidth: 2,
          pointRadius: 3,
          fill: false,
          yAxisID: "y1",
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        legend: { display: false },
        title: { display: true, text: "EBITDA", align: "start", font: { size: 14, weight: "bold" } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 9 } } },
        y: { type: "linear", position: "left", ticks: { font: { size: 9 } } },
        y1: { type: "linear", position: "right", grid: { display: false }, ticks: { font: { size: 9 } } },
      },
    },
  };

  // 4. PAT Chart
  const patConfig: ChartConfiguration = {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          type: "bar",
          label: "PAT (Rs.cr)",
          data: pat,
          backgroundColor: "#00a699",
          borderRadius: 2,
          yAxisID: "y",
        },
        {
          type: "line",
          label: "Margin (%)",
          data: patMargin,
          borderColor: "#ff8c00",
          backgroundColor: "#ff8c00",
          borderWidth: 2,
          pointRadius: 3,
          fill: false,
          yAxisID: "y1",
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        legend: { display: false },
        title: { display: true, text: "PAT", align: "start", font: { size: 14, weight: "bold" } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 9 } } },
        y: { type: "linear", position: "left", ticks: { font: { size: 9 } } },
        y1: { type: "linear", position: "right", grid: { display: false }, ticks: { font: { size: 9 } } },
      },
    },
  };

  // Render to base64 Data URLs
  const revenueBuffer = await chartJSNodeCanvas.renderToBuffer(revenueConfig);
  const govBuffer = await chartJSNodeCanvas.renderToBuffer(govConfig);
  const ebitdaBuffer = await chartJSNodeCanvas.renderToBuffer(ebitdaConfig);
  const patBuffer = await chartJSNodeCanvas.renderToBuffer(patConfig);

  const revenueChartUrl = `data:image/png;base64,${revenueBuffer.toString("base64")}`;
  const govChartUrl = `data:image/png;base64,${govBuffer.toString("base64")}`;
  const ebitdaChartUrl = `data:image/png;base64,${ebitdaBuffer.toString("base64")}`;
  const patChartUrl = `data:image/png;base64,${patBuffer.toString("base64")}`;

  logger.info(`Charts generated successfully for report ${reportId}`);

  return {
    revenueChartUrl,
    govChartUrl,
    ebitdaChartUrl,
    patChartUrl,
  };
}
