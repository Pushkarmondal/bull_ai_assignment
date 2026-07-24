import { z } from "zod";

const nullableStringOrNumber = z.union([z.string(), z.number(), z.null()]).optional();

export const companyInfoSchema = z.object({
  name: z.string().default("Target Company"),
  sector: z.string().nullable().optional(),
  cmp: nullableStringOrNumber,
  targetPrice: nullableStringOrNumber,
  rating: z.string().nullable().optional(),
  earnings: z.string().nullable().optional(),
  marketCap: nullableStringOrNumber,
  enterpriseValue: nullableStringOrNumber,
  outstandingShares: nullableStringOrNumber,
  beta: nullableStringOrNumber,
  dividendYield: nullableStringOrNumber,
  freeFloat: nullableStringOrNumber,
  weekHighLow: z.string().nullable().optional(),
  avgVolume6m: nullableStringOrNumber,
  faceValue: nullableStringOrNumber,
  bloombergCode: z.string().nullable().optional(),
  nseCode: z.string().nullable().optional(),
  bseCode: z.string().nullable().optional(),
  sensex: nullableStringOrNumber,
  timeFrame: z.string().nullable().optional(),
  reportDate: z.string().nullable().optional(),
});

export const shareholdingRowSchema = z.object({
  category: z.string(),
  q1: nullableStringOrNumber,
  q2: nullableStringOrNumber,
  q3: nullableStringOrNumber,
});

export const pricePerformanceRowSchema = z.object({
  period: z.string(),
  absoluteReturn: nullableStringOrNumber,
  sensexReturn: nullableStringOrNumber,
  relativeReturn: nullableStringOrNumber,
});

export const financialForecastSummaryRowSchema = z.object({
  metric: z.string(),
  fyA: nullableStringOrNumber,
  fyE1: nullableStringOrNumber,
  fyE2: nullableStringOrNumber,
});

export const quarterlyFinancialRowSchema = z.object({
  metric: z.string(),
  currentQ: nullableStringOrNumber,
  prevYearQ: nullableStringOrNumber,
  yoyGrowth: nullableStringOrNumber,
  prevQ: nullableStringOrNumber,
  qoqGrowth: nullableStringOrNumber,
});

export const statementRowSchema = z.object({
  particulars: z.string(),
  fy23A: nullableStringOrNumber,
  fy24A: nullableStringOrNumber,
  fy25A: nullableStringOrNumber,
  fy26E: nullableStringOrNumber,
  fy27E: nullableStringOrNumber,
});

export const ratioRowSchema = z.object({
  particulars: z.string(),
  fy23A: nullableStringOrNumber,
  fy24A: nullableStringOrNumber,
  fy25A: nullableStringOrNumber,
  fy26E: nullableStringOrNumber,
  fy27E: nullableStringOrNumber,
});

export const changeInEstimatesRowSchema = z.object({
  metric: z.string(),
  oldFY26E: nullableStringOrNumber,
  oldFY27E: nullableStringOrNumber,
  newFY26E: nullableStringOrNumber,
  newFY27E: nullableStringOrNumber,
  changeFY26E: nullableStringOrNumber,
  changeFY27E: nullableStringOrNumber,
});

export const recommendationHistoryRowSchema = z.object({
  date: z.string(),
  rating: z.string(),
  targetPrice: z.union([z.string(), z.number()]),
});

export const chartSeriesDataSchema = z
  .object({
    labels: z.array(z.string()).default([]),
    revenue: z.array(z.number()).default([]),
    revenueGrowth: z.array(z.number()).optional(),
    gov: z.array(z.number()).optional(),
    govGrowth: z.array(z.number()).optional(),
    ebitda: z.array(z.number()).default([]),
    ebitdaMargin: z.array(z.number()).optional(),
    pat: z.array(z.number()).default([]),
    patMargin: z.array(z.number()).optional(),
  })
  .optional();

export const rawExtractedReportSchema = z.object({
  company: companyInfoSchema,
  businessSummary: z.string().nullable().optional(),
  outlook: z.string().nullable().optional(),
  recommendation: z.string().nullable().optional(),
  highlights: z.array(z.string()).default([]),
  companyData: z.record(z.any()).optional(),
  shareholding: z.array(shareholdingRowSchema).default([]),
  pricePerformance: z.array(pricePerformanceRowSchema).default([]),
  forecastSummary: z.array(financialForecastSummaryRowSchema).default([]),
  quarterlyFinancials: z.array(quarterlyFinancialRowSchema).default([]),
  changeInEstimates: z.array(changeInEstimatesRowSchema).default([]),
  profitAndLoss: z.array(statementRowSchema).default([]),
  balanceSheet: z.array(statementRowSchema).default([]),
  cashflow: z.array(statementRowSchema).default([]),
  ratios: z.array(ratioRowSchema).default([]),
  recommendationHistory: z.array(recommendationHistoryRowSchema).default([]),
  chartData: chartSeriesDataSchema,
});
