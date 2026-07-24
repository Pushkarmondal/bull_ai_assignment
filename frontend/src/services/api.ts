import axios from 'axios';
import type{ GenerateReportResponse } from '../types';

const API_BASE = '';

export async function generateReport(
  companyName: string,
  file: File
): Promise<GenerateReportResponse> {
  const formData = new FormData();
  formData.append('companyName', companyName);
  formData.append('file', file);

  const response = await axios.post<GenerateReportResponse>(
    `${API_BASE}/api/report/generate`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
}
