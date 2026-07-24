export type GenerationStep = 'idle' | 'parsing' | 'extracting' | 'charts' | 'pdf' | 'completed' | 'error';

export interface GenerateReportResponse {
  success: boolean;
  reportUrl: string;
  companyName: string;
  generatedAt: string;
  error?: string;
}

export interface SampleDoc {
  id: string;
  companyName: string;
  filename: string;
  type: 'PDF' | 'CSV' | 'TXT';
  path: string;
}
