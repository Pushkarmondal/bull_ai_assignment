import type { GenerateReportResponse } from '../types';

export async function generateReport(
  companyName: string,
  file: File
): Promise<GenerateReportResponse> {
  const formData = new FormData();
  formData.append('companyName', companyName);
  formData.append('file', file);

  const response = await fetch('/api/report/generate', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json().catch(() => ({ success: false, error: `HTTP Error ${response.status}` }));

  if (!response.ok || !data.success) {
    throw new Error(data.error || `Server responded with status ${response.status}`);
  }

  return data;
}
