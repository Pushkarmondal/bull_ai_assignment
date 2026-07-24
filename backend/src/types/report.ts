export interface CompanyInfo {
  name: string;
  sector: string | null;
  cmp: number | string | null;
  targetPrice: number | string | null;
  rating: string | null;
  earnings?: string | null;
  marketCap: number | string | null;
  enterpriseValue: number | string | null;
  outstandingShares: number | string | null;
  beta: number | string | null;
  dividendYield: number | string | null;
  freeFloat: number | string | null;
  weekHighLow?: string | null;
  avgVolume6m?: number | string | null;
  faceValue?: number | string | null;
  bloombergCode?: string | null;
  nseCode?: string | null;
  bseCode?: string | null;
  sensex?: number | string | null;
  timeFrame?: string | null;
  reportDate?: string | null;
}

export interface ShareholdingRow {
  category: string;
  q1: string | number | null;
  q2: string | number | null;
  q3: string | number | null;
}

export interface PricePerformanceRow {
  period: string;
  absoluteReturn: string | number | null;
  sensexReturn: string | number | null;
  relativeReturn: string | number | null;
}

export interface FinancialForecastSummaryRow {
  metric: string;
  fyA: string | number | null;
  fyE1: string | number | null;
  fyE2: string | number | null;
}

export interface QuarterlyFinancialRow {
  metric: string;
  currentQ: string | number | null;
  prevYearQ: string | number | null;
  yoyGrowth: string | number | null;
  prevQ: string | number | null;
  qoqGrowth: string | number | null;
}

export interface StatementRow {
  particulars: string;
  fy23A: string | number | null;
  fy24A: string | number | null;
  fy25A: string | number | null;
  fy26E: string | number | null;
  fy27E: string | number | null;
}

export interface RatioRow {
  particulars: string;
  fy23A: string | number | null;
  fy24A: string | number | null;
  fy25A: string | number | null;
  fy26E: string | number | null;
  fy27E: string | number | null;
}

export interface ChangeInEstimatesRow {
  metric: string;
  oldFY26E: string | number | null;
  oldFY27E: string | number | null;
  newFY26E: string | number | null;
  newFY27E: string | number | null;
  changeFY26E: string | number | null;
  changeFY27E: string | number | null;
}

export interface RecommendationHistoryRow {
  date: string;
  rating: string;
  targetPrice: number | string;
}

export interface ChartSeriesData {
  labels: string[];
  revenue: number[];
  revenueGrowth?: number[];
  gov?: number[];
  govGrowth?: number[];
  ebitda: number[];
  ebitdaMargin?: number[];
  pat: number[];
  patMargin?: number[];
}

export interface RawExtractedReportData {
  company: CompanyInfo;
  businessSummary: string | null;
  outlook: string | null;
  recommendation: string | null;
  highlights: string[];
  companyData?: Record<string, any>;
  shareholding: ShareholdingRow[];
  pricePerformance: PricePerformanceRow[];
  forecastSummary?: FinancialForecastSummaryRow[];
  quarterlyFinancials: QuarterlyFinancialRow[];
  changeInEstimates?: ChangeInEstimatesRow[];
  profitAndLoss: StatementRow[];
  balanceSheet: StatementRow[];
  cashflow: StatementRow[];
  ratios: RatioRow[];
  recommendationHistory?: RecommendationHistoryRow[];
  chartData?: ChartSeriesData;
}

export interface GeneratedCharts {
  revenueChartUrl: string;
  govChartUrl: string;
  ebitdaChartUrl: string;
  patChartUrl: string;
}

export interface ReportTemplateData {
  company: CompanyInfo;
  businessSummary: string;
  outlook: string;
  recommendation: string;
  highlights: string[];
  shareholding: ShareholdingRow[];
  pricePerformance: PricePerformanceRow[];
  forecastSummary: FinancialForecastSummaryRow[];
  quarterlyFinancials: QuarterlyFinancialRow[];
  changeInEstimates: ChangeInEstimatesRow[];
  profitAndLoss: StatementRow[];
  balanceSheet: StatementRow[];
  cashflow: StatementRow[];
  ratios: RatioRow[];
  recommendationHistory: RecommendationHistoryRow[];
  charts: GeneratedCharts;
  expectedReturn: string;
  generatedDate: string;
}
