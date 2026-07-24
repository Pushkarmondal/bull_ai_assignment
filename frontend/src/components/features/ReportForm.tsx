import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FileText, Download, Eye, AlertCircle, RefreshCw, CheckCircle2, Sparkles, Layers, FileCheck2 } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { UploadZone } from './UploadZone';
import { SampleSelector } from './SampleSelector';
import { ProgressStepper } from './ProgressStepper';
import { PreviewModal } from './PreviewModal';
import { generateReport } from '../../services/api';
import type { GenerationStep, GenerateReportResponse } from '../../types';

const formSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
});

type FormValues = z.infer<typeof formSchema>;

function deriveCompanyNameFromFilename(filename: string): string {
  const baseName = filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ').trim();
  const lower = baseName.toLowerCase();

  if (lower.includes('tcs') || lower.includes('tata consultancy')) return 'Tata Consultancy Services';
  if (lower.includes('reliance')) return 'Reliance Industries';
  if (lower.includes('zomato') || lower.includes('eternal')) return 'Eternal Ltd.';
  if (lower.includes('apple')) return 'Apple Inc.';
  if (lower.includes('l&t') || lower.includes('larsen')) return 'Larsen & Toubro';
  if (lower.includes('infosys')) return 'Infosys';
  if (lower.includes('hdfc')) return 'HDFC Bank';
  if (lower.includes('icici')) return 'ICICI Bank';

  // Title case formatting for generic file names
  return baseName
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const ReportForm: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>('');
  const [step, setStep] = useState<GenerationStep>('idle');
  const [result, setResult] = useState<GenerateReportResponse | null>(null);
  const [apiError, setApiError] = useState<string>('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
    },
  });

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    setFileError('');
    setApiError('');

    if (file) {
      const derived = deriveCompanyNameFromFilename(file.name);
      if (derived) {
        setValue('companyName', derived, { shouldValidate: true });
      }
    } else {
      setValue('companyName', '', { shouldValidate: true });
    }
  };

  const handleSampleSelect = (companyName: string, file: File) => {
    setValue('companyName', companyName, { shouldValidate: true });
    setSelectedFile(file);
    setFileError('');
    setApiError('');
  };

  const onSubmit = async (data: FormValues) => {
    if (!selectedFile) {
      setFileError('Please upload or select a financial context document.');
      return;
    }

    setFileError('');
    setApiError('');
    setResult(null);

    try {
      setStep('parsing');
      await new Promise((res) => setTimeout(res, 600));

      setStep('extracting');
      await new Promise((res) => setTimeout(res, 800));

      setStep('charts');
      await new Promise((res) => setTimeout(res, 600));

      setStep('pdf');
      const response = await generateReport(data.companyName, selectedFile);

      if (response.success) {
        setResult(response);
        setStep('completed');
      } else {
        throw new Error(response.error || 'Failed to generate report');
      }
    } catch (err: any) {
      setStep('error');
      setApiError(
        err.response?.data?.error || err.message || 'An error occurred while generating the report.'
      );
    }
  };

  const handleReset = () => {
    setStep('idle');
    setResult(null);
    setApiError('');
    setSelectedFile(null);
    setValue('companyName', '');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {step !== 'idle' && step !== 'completed' && step !== 'error' && (
        <ProgressStepper currentStep={step} companyName={selectedFile?.name ? deriveCompanyNameFromFilename(selectedFile.name) : 'Target Company'} />
      )}

      <Card>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 tracking-tight font-sans">
              <FileText className="w-5 h-5 text-emerald-500" />
              Generate Financial Research Report
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
              Upload earnings context files to extract structured data & produce a downloadable 4-page PDF.
            </p>
          </div>
          {result && (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-sm animate-fade-in">
              <CheckCircle2 className="w-4 h-4" /> Ready for Download
            </span>
          )}
        </div>

        {apiError && (
          <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 flex items-start gap-3.5 shadow-lg shadow-rose-950/10 animate-fade-in">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-bold text-rose-700 dark:text-rose-300">Report Generation Error</p>
              <p className="text-xs opacity-90 mt-1 leading-relaxed">{apiError}</p>
            </div>
          </div>
        )}

        {result ? (
          <div className="text-center py-8 animate-fade-in">
            <div className="w-20 h-20 rounded-3xl gradient-teal text-white flex items-center justify-center mx-auto mb-5 shadow-2xl shadow-emerald-500/30 border border-emerald-400/30 animate-float">
              <FileCheck2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
              Report Generated Successfully!
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto mb-6 leading-relaxed">
              Authentic 4-page Geojit-style research report for <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{result.companyName}</strong> is ready for review and download.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                <Layers className="w-3.5 h-3.5 text-cyan-500" /> 4-Page PDF Report
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Vector SVG Charts
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all font-semibold text-sm cursor-pointer shadow-md active:scale-95"
              >
                <Eye className="w-4 h-4 text-cyan-500" />
                Preview PDF Report
              </button>

              <a href={result.reportUrl} download={`${result.companyName.toLowerCase().replace(/\s+/g, '_')}_report.pdf`}>
                <Button variant="primary">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF Report
                </Button>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Generate Another
              </button>
            </div>

            <PreviewModal
              isOpen={isPreviewOpen}
              onClose={() => setIsPreviewOpen(false)}
              reportUrl={result.reportUrl}
              companyName={result.companyName}
            />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Company Name <span className="text-emerald-500">*</span>
              </label>
              <input
                type="text"
                {...register('companyName')}
                placeholder="e.g. Reliance Industries, Tata Consultancy Services, Apple Inc."
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-[#060913]/80 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm font-medium shadow-inner"
              />
              {errors.companyName && (
                <p className="text-xs text-rose-500 dark:text-rose-400 mt-2 font-medium">{errors.companyName.message}</p>
              )}
            </div>

            <UploadZone
              selectedFile={selectedFile}
              onFileSelect={handleFileSelect}
              error={fileError}
            />

            <SampleSelector onSelectSample={handleSampleSelect} />

            <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-end">
              <Button
                type="submit"
                variant="primary"
                isLoading={step !== 'idle' && step !== 'completed' && step !== 'error'}
                className="w-full sm:w-auto min-w-[200px]"
              >
                Generate Report
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};
