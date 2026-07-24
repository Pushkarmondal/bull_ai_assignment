/**
 * Helper utility functions for numeric formatting and safe conversions.
 */

export function formatCurrency(value: number | string | null | undefined): string {
  if (value === null || value === undefined || value === "") return "-";
  const num = typeof value === "number" ? value : parseFloat(value.toString().replace(/,/g, ""));
  if (isNaN(num)) return value.toString();
  return num.toLocaleString("en-IN");
}

export function formatPercent(value: number | string | null | undefined): string {
  if (value === null || value === undefined || value === "") return "-";
  const num = typeof value === "number" ? value : parseFloat(value.toString().replace(/%/g, ""));
  if (isNaN(num)) return value.toString();
  return `${num > 0 ? "+" : ""}${num.toFixed(1)}%`;
}

export function dashIfNull(value: any): string {
  if (value === null || value === undefined || value === "" || value === "N/A" || value === "null") {
    return "-";
  }
  return value.toString();
}

export function naIfNull(value: any): string {
  if (value === null || value === undefined || value === "" || value === "N/A" || value === "null" || value === "-") {
    return "N/A";
  }
  return value.toString();
}

export function safeNumber(value: any, defaultValue: number = 0): number {
  if (typeof value === "number" && !isNaN(value)) return value;
  if (!value) return defaultValue;
  const parsed = parseFloat(value.toString().replace(/[^0-9.-]/g, ""));
  return isNaN(parsed) ? defaultValue : parsed;
}
