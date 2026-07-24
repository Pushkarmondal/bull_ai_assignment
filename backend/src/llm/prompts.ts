export const SYSTEM_PROMPT = `You are a professional equity research analyst working at a top-tier institutional financial firm (like Geojit Research).
Extract key financial information, metrics, narrative insights, and table line items from the provided financial context document.

CRITICAL INSTRUCTIONS:
1. Return ONLY valid JSON.
2. NEVER include markdown formatting like \`\`\`json or explanation text.
3. If a field or metric is unavailable in the context, return null (do NOT invent false numbers).
4. Strictly align all text with the TARGET COMPANY specified. Do NOT hallucinate third-party brands or companies not present in the document.
5. RECOMMENDATION & HEADLINE CONSISTENCY:
   - If rating is BUY or ACCUMULATE, the headline MUST convey positive growth and upside (e.g., 'Strong operational momentum drives long-term growth'). NEVER write 'valuation limits upside' for a BUY recommendation.
   - If rating is HOLD or REDUCE, the headline should reflect valuation constraints or moderate upside.
6. OUTLOOK & VALUATION: Must focus on forward-looking institutional catalysts, margin trajectory, capex plans, segment expansion, or key risks. DO NOT repeat the past quarterly revenue or EBITDA figures already stated in business summary.`;

export function buildExtractionPrompt(companyName: string, documentText: string): string {
  return `Extract financial data and research insights strictly for target company: "${companyName}".

Financial Context Document Content:
----------------------------------------
${documentText.slice(0, 15000)}
----------------------------------------

Return a single JSON object matching this schema structure:
{
  "company": {
    "name": "${companyName}",
    "sector": "Extract actual sector from document for ${companyName} (e.g. Information Technology for TCS)",
    "cmp": 306,
    "targetPrice": 337,
    "rating": "BUY",
    "earnings": "Q1FY26 Result Update",
    "marketCap": null,
    "enterpriseValue": null,
    "outstandingShares": null,
    "beta": null,
    "dividendYield": null,
    "freeFloat": null,
    "weekHighLow": null,
    "avgVolume6m": null,
    "faceValue": null,
    "bloombergCode": null,
    "nseCode": null,
    "bseCode": null,
    "sensex": null,
    "timeFrame": "12 Months",
    "reportDate": "29th July, 2025"
  },
  "headline": "Punchy 1-sentence investment thesis headline strictly for ${companyName} (consistent with recommendation)",
  "businessSummary": "Executive summary paragraph explaining business performance...",
  "outlook": "Forward-looking strategic catalysts, margin trajectory, capex plans, or risks for ${companyName} (DO NOT repeat revenue/EBITDA figures)...",
  "recommendation": "BUY",
  "highlights": [
    "Key highlight bullet point 1...",
    "Key highlight bullet point 2..."
  ],
  "shareholding": [
    { "category": "Promoters", "q1": 0.0, "q2": 0.0, "q3": 0.0 },
    { "category": "FII's", "q1": 47.3, "q2": 44.4, "q3": 42.3 },
    { "category": "MFs/Institutions", "q1": 20.5, "q2": 23.6, "q3": 26.6 },
    { "category": "Public", "q1": 8.0, "q2": 8.5, "q3": 7.6 },
    { "category": "Others", "q1": 24.1, "q2": 23.6, "q3": 23.5 },
    { "category": "Total", "q1": 100.0, "q2": 100.0, "q3": 100.0 }
  ],
  "pricePerformance": [
    { "period": "Absolute Return", "absoluteReturn": "32.1%", "sensexReturn": "3.0%", "relativeReturn": "29.2%" },
    { "period": "Absolute Sensex", "absoluteReturn": "44.8%", "sensexReturn": "7.9%", "relativeReturn": "36.9%" },
    { "period": "Relative Return", "absoluteReturn": "39.7%", "sensexReturn": "2.5%", "relativeReturn": "37.1%" }
  ],
  "forecastSummary": [
    { "metric": "Sales", "fyA": 20243, "fyE1": 35020, "fyE2": 54632 },
    { "metric": "Growth (%)", "fyA": 67.1, "fyE1": 73.0, "fyE2": 56.0 },
    { "metric": "EBITDA", "fyA": 637, "fyE1": 1248, "fyE2": 3575 },
    { "metric": "EBITDA Margin (%)", "fyA": 3.1, "fyE1": 3.6, "fyE2": 6.5 },
    { "metric": "PAT Adjusted", "fyA": 527, "fyE1": 927, "fyE2": 2643 },
    { "metric": "Growth (%)", "fyA": 50.1, "fyE1": 75.9, "fyE2": 185.2 },
    { "metric": "Adjusted EPS", "fyA": 0.6, "fyE1": 1.0, "fyE2": 2.7 },
    { "metric": "Growth (%)", "fyA": 46.3, "fyE1": 60.1, "fyE2": 185.2 },
    { "metric": "P/E", "fyA": 335.8, "fyE1": 325.2, "fyE2": 114.1 },
    { "metric": "P/B", "fyA": 6.4, "fyE1": 9.6, "fyE2": 8.9 },
    { "metric": "EV/EBITDA", "fyA": 302.2, "fyE1": 240.3, "fyE2": 84.0 },
    { "metric": "ROE (%)", "fyA": 1.7, "fyE1": 3.0, "fyE2": 7.8 },
    { "metric": "D/E", "fyA": 0.1, "fyE1": 0.1, "fyE2": 0.1 }
  ],
  "quarterlyFinancials": [
    { "metric": "Sales", "currentQ": 7167, "prevYearQ": 4206, "yoyGrowth": 70.4, "prevQ": 5833, "qoqGrowth": 22.9 },
    { "metric": "EBITDA", "currentQ": 115, "prevYearQ": 177, "yoyGrowth": -35.0, "prevQ": 72, "qoqGrowth": 59.7 },
    { "metric": "Margin (%)", "currentQ": 1.6, "prevYearQ": 4.2, "yoyGrowth": "-260bps", "prevQ": 1.2, "qoqGrowth": "40bps" },
    { "metric": "EBIT", "currentQ": -199, "prevYearQ": 28, "yoyGrowth": -810.7, "prevQ": -215, "qoqGrowth": 7.4 },
    { "metric": "PBT", "currentQ": 88, "prevYearQ": 239, "yoyGrowth": -63.2, "prevQ": 97, "qoqGrowth": -9.3 },
    { "metric": "Rep. PAT", "currentQ": 25, "prevYearQ": 253, "yoyGrowth": -90.1, "prevQ": 39, "qoqGrowth": -35.9 },
    { "metric": "Adj PAT", "currentQ": 25, "prevYearQ": 253, "yoyGrowth": -90.1, "prevQ": 39, "qoqGrowth": -35.9 },
    { "metric": "Adj. EPS (Rs)", "currentQ": 0.03, "prevYearQ": 0.3, "yoyGrowth": -90.1, "prevQ": 0.04, "qoqGrowth": -35.9 }
  ],
  "changeInEstimates": [
    { "metric": "Revenue", "oldFY26E": 30738, "oldFY27E": 41743, "newFY26E": 35020, "newFY27E": 54632, "changeFY26E": 13.9, "changeFY27E": 30.9 },
    { "metric": "EBITDA", "oldFY26E": 1686, "oldFY27E": 3959, "newFY26E": 1248, "newFY27E": 3575, "changeFY26E": -25.9, "changeFY27E": -9.7 },
    { "metric": "Margins (%)", "oldFY26E": 5.5, "oldFY27E": 9.5, "newFY26E": 3.6, "newFY27E": 6.5, "changeFY26E": "-190bps", "changeFY27E": "-300bps" },
    { "metric": "Adj. PAT", "oldFY26E": 1460, "oldFY27E": 3254, "newFY26E": 927, "newFY27E": 2643, "changeFY26E": -36.5, "changeFY27E": -18.8 },
    { "metric": "EPS", "oldFY26E": 1.6, "oldFY27E": 3.6, "newFY26E": 1.0, "newFY27E": 2.7, "changeFY26E": -40.4, "changeFY27E": -23.7 }
  ],
  "profitAndLoss": [
    { "particulars": "Sales", "fy23A": 7079, "fy24A": 12114, "fy25A": 20243, "fy26E": 35020, "fy27E": 54632 },
    { "particulars": "% change", "fy23A": 68.9, "fy24A": 71.1, "fy25A": 67.1, "fy26E": 73.0, "fy27E": 56.0 },
    { "particulars": "EBITDA", "fy23A": -1210, "fy24A": 42, "fy25A": 637, "fy26E": 1248, "fy27E": 3575 },
    { "particulars": "% change", "fy23A": -35.4, "fy24A": -100.1, "fy25A": 63600.0, "fy26E": 96.0, "fy27E": 186.3 },
    { "particulars": "Depreciation", "fy23A": 437, "fy24A": 526, "fy25A": 863, "fy26E": 1233, "fy27E": 1372 },
    { "particulars": "EBIT", "fy23A": -1647, "fy24A": -484, "fy25A": -226, "fy26E": 16, "fy27E": 2203 },
    { "particulars": "Interest", "fy23A": 49, "fy24A": 72, "fy25A": 154, "fy26E": 181, "fy27E": 208 },
    { "particulars": "Other Income", "fy23A": 681, "fy24A": 847, "fy25A": 1077, "fy26E": 1401, "fy27E": 1530 },
    { "particulars": "PBT", "fy23A": -1015, "fy24A": 291, "fy25A": 697, "fy26E": 1236, "fy27E": 3524 },
    { "particulars": "% change", "fy23A": -16.8, "fy24A": -128.7, "fy25A": 139.5, "fy26E": 77.3, "fy27E": 185.2 },
    { "particulars": "Tax", "fy23A": 44, "fy24A": 60, "fy25A": -170, "fy26E": 309, "fy27E": 881 },
    { "particulars": "Tax Rate (%)", "fy23A": -4.3, "fy24A": 20.6, "fy25A": -24.4, "fy26E": 25.0, "fy27E": 25.0 },
    { "particulars": "Reported PAT", "fy23A": -971, "fy24A": 351, "fy25A": 527, "fy26E": 927, "fy27E": 2643 },
    { "particulars": "Adj. PAT", "fy23A": -971, "fy24A": 351, "fy25A": 527, "fy26E": 927, "fy27E": 2643 },
    { "particulars": "% change", "fy23A": -35.5, "fy24A": -136.1, "fy25A": 50.1, "fy26E": 75.9, "fy27E": 185.2 },
    { "particulars": "No. of shares (cr)", "fy23A": 855.4, "fy24A": 882.0, "fy25A": 965.0, "fy26E": 965.0, "fy27E": 965.0 },
    { "particulars": "Adj EPS (Rs.)", "fy23A": -1.2, "fy24A": 0.4, "fy25A": 0.6, "fy26E": 1.0, "fy27E": 2.7 }
  ],
  "balanceSheet": [
    { "particulars": "Cash", "fy23A": 1017, "fy24A": 731, "fy25A": 3614, "fy26E": 3203, "fy27E": 3155 },
    { "particulars": "Accts. Receivable", "fy23A": 457, "fy24A": 794, "fy25A": 1946, "fy26E": 3309, "fy27E": 4971 },
    { "particulars": "Inventories", "fy23A": 83, "fy24A": 88, "fy25A": 176, "fy26E": 350, "fy27E": 511 },
    { "particulars": "Other Cur. Assets", "fy23A": 9274, "fy24A": 3845, "fy25A": 5965, "fy26E": 6227, "fy27E": 6566 },
    { "particulars": "Investments", "fy23A": 2280, "fy24A": 10365, "fy25A": 10920, "fy26E": 12012, "fy27E": 13814 },
    { "particulars": "Net Fixed Assets", "fy23A": 636, "fy24A": 977, "fy25A": 2883, "fy26E": 3063, "fy27E": 3198 },
    { "particulars": "Intangible Assets", "fy23A": 5708, "fy24A": 5471, "fy25A": 6649, "fy26E": 6569, "fy27E": 6888 },
    { "particulars": "Total Assets", "fy23A": 21599, "fy24A": 23356, "fy25A": 35623, "fy26E": 38346, "fy27E": 42866 },
    { "particulars": "Current Liabilities", "fy23A": 1406, "fy24A": 2083, "fy25A": 3326, "fy26E": 5022, "fy27E": 6791 },
    { "particulars": "Debt Funds", "fy23A": 392, "fy24A": 588, "fy25A": 1654, "fy26E": 1737, "fy27E": 1824 },
    { "particulars": "Equity Capital", "fy23A": 836, "fy24A": 868, "fy25A": 907, "fy26E": 907, "fy27E": 907 },
    { "particulars": "Res. & Surplus", "fy23A": 18624, "fy24A": 19545, "fy25A": 29410, "fy26E": 30337, "fy27E": 32980 },
    { "particulars": "Shareholder Funds", "fy23A": 19460, "fy24A": 20413, "fy25A": 30317, "fy26E": 31244, "fy27E": 33887 },
    { "particulars": "Total Liabilities", "fy23A": 21599, "fy24A": 23356, "fy25A": 35623, "fy26E": 38346, "fy27E": 42866 },
    { "particulars": "BVPS", "fy23A": 23, "fy24A": 23, "fy25A": 31, "fy26E": 32, "fy27E": 35 }
  ],
  "cashflow": [
    { "particulars": "Net inc. + Depn.", "fy23A": -520, "fy24A": 836, "fy25A": 1390, "fy26E": 2160, "fy27E": 4015 },
    { "particulars": "Non-cash adj.", "fy23A": -7, "fy24A": -48, "fy25A": -506, "fy26E": -1803, "fy27E": -2925 },
    { "particulars": "Changes in W.C", "fy23A": -317, "fy24A": -142, "fy25A": -576, "fy26E": 89, "fy27E": -134 },
    { "particulars": "C.F. Operation", "fy23A": -844, "fy24A": 646, "fy25A": 308, "fy26E": 445, "fy27E": 956 },
    { "particulars": "Capital exp.", "fy23A": -101, "fy24A": -202, "fy25A": -931, "fy26E": -1051, "fy27E": -1229 },
    { "particulars": "C.F - Investment", "fy23A": 457, "fy24A": -347, "fy25A": -7993, "fy26E": -938, "fy27E": -1091 },
    { "particulars": "C.F - Finance", "fy23A": -127, "fy24A": -207, "fy25A": 8042, "fy26E": 83, "fy27E": 87 },
    { "particulars": "Chg. in cash", "fy23A": -514, "fy24A": 92, "fy25A": 357, "fy26E": -411, "fy27E": -48 },
    { "particulars": "Closing Cash", "fy23A": 1017, "fy24A": 731, "fy25A": 3614, "fy26E": 3203, "fy27E": 3155 }
  ],
  "ratios": [
    { "particulars": "EBITDA margin (%)", "fy23A": -17.1, "fy24A": 0.3, "fy25A": 3.1, "fy26E": 3.6, "fy27E": 6.5 },
    { "particulars": "EBIT margin (%)", "fy23A": -23.3, "fy24A": -4.0, "fy25A": -1.1, "fy26E": 0.0, "fy27E": 4.0 },
    { "particulars": "Net profit mgn.(%)", "fy23A": -13.7, "fy24A": 2.9, "fy25A": 2.6, "fy26E": 2.6, "fy27E": 4.8 },
    { "particulars": "ROE (%)", "fy23A": -5.0, "fy24A": 1.7, "fy25A": 1.7, "fy26E": 3.0, "fy27E": 7.8 },
    { "particulars": "ROCE (%)", "fy23A": -8.3, "fy24A": -2.3, "fy25A": -0.7, "fy26E": 0.0, "fy27E": 6.2 },
    { "particulars": "Current ratio (x)", "fy23A": 7.5, "fy24A": 2.6, "fy25A": 3.5, "fy26E": 2.6, "fy27E": 2.2 },
    { "particulars": "Quick ratio (x)", "fy23A": 4.1, "fy24A": 1.3, "fy25A": 2.4, "fy26E": 1.8, "fy27E": 1.6 },
    { "particulars": "EV/Sales (x)", "fy23A": 6.1, "fy24A": 13.3, "fy25A": 9.5, "fy26E": 8.6, "fy27E": 5.5 },
    { "particulars": "EV/EBITDA (x)", "fy23A": "n.m.", "fy24A": 3825.7, "fy25A": 302.2, "fy26E": 240.3, "fy27E": 84.0 },
    { "particulars": "P/E (x)", "fy23A": "n.m.", "fy24A": 444.8, "fy25A": 335.8, "fy26E": 325.2, "fy27E": 114.1 },
    { "particulars": "P/BV (x)", "fy23A": 2.2, "fy24A": 7.9, "fy25A": 6.4, "fy26E": 9.6, "fy27E": 8.9 }
  ],
  "recommendationHistory": [
    { "date": "11-Aug-22", "rating": "BUY", "targetPrice": 69 },
    { "date": "17-Feb-23", "rating": "BUY", "targetPrice": 60 },
    { "date": "08-Aug-23", "rating": "BUY", "targetPrice": 114 },
    { "date": "13-Feb-24", "rating": "BUY", "targetPrice": 174 },
    { "date": "16-May-24", "rating": "BUY", "targetPrice": 220 },
    { "date": "28-Oct-24", "rating": "BUY", "targetPrice": 284 },
    { "date": "30-Jan-25", "rating": "BUY", "targetPrice": 254 },
    { "date": "29-Jul-25", "rating": "HOLD", "targetPrice": 337 }
  ],
  "chartData": {
    "labels": ["Q2FY24", "Q3FY24", "Q4FY24", "Q1FY25", "Q2FY25", "Q3FY25", "Q4FY25", "Q1FY26"],
    "revenue": [2800, 3100, 3500, 4206, 4800, 5200, 5833, 7167],
    "revenueGrowth": [17.9, 15.4, 18.1, 14.1, 12.6, 7.9, 20.0, 22.9],
    "gov": [110, 125, 140, 155, 170, 185, 200, 220],
    "govGrowth": [13.4, 12.8, 14.2, 14.4, 14.3, 15.8, 16.7, 18.0],
    "ebitda": [40, 65, 90, 177, 210, 160, 72, 115],
    "ebitdaMargin": [-1.7, 1.6, 2.4, 4.2, 4.7, 3.0, 1.2, 1.6],
    "pat": [20, 45, 80, 253, 230, 180, 39, 25],
    "patMargin": [1.3, 2.0, 4.2, 6.0, 4.9, 3.7, 0.7, 0.3]
  }
}`;
}
