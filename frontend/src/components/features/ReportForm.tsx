import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FileText, Download, Eye, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
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
      companyName: 'Eternal Ltd.',
    },
  });

  const handleSampleSelect = (companyName: string, file: File) => {
    setValue('companyName', companyName);
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
      // Simulate visual step updates for better UX feedback
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
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {step !== 'idle' && step !== 'completed' && step !== 'error' && (
        <ProgressStepper currentStep={step} />
      )}

      <Card>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              Generate Financial Research Report
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Upload company context files to auto-generate a downloadable 4-page Geojit equity report.
            </p>
          </div>
          {result && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" /> Ready
            </span>
          )}
        </div>

        {apiError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold">Report Generation Error</p>
              <p className="text-xs opacity-90 mt-0.5">{apiError}</p>
            </div>
          </div>
        )}

        {result ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl gradient-teal text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-extrabold text-white mb-2">
              Report Generated Successfully!
            </h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-8">
              Geojit-style research report for <strong className="text-emerald-400">{result.companyName}</strong> is ready for review and download.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 hover:text-white transition-all font-medium text-sm cursor-pointer"
              >
                <Eye className="w-4 h-4 text-cyan-400" />
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
                className="inline-flex items-center gap-1.5 px-4 py-3 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
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
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Company Name <span className="text-emerald-400">*</span>
              </label>
              <input
                type="text"
                {...register('companyName')}
                placeholder="e.g. Eternal Ltd., Reliance Industries, Apple Inc."
                className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm"
              />
              {errors.companyName && (
                <p className="text-xs text-rose-400 mt-1.5">{errors.companyName.message}</p>
              )}
            </div>

            <UploadZone
              selectedFile={selectedFile}
              onFileSelect={(file) => {
                setSelectedFile(file);
                setFileError('');
              }}
              error={fileError}
            />

            <SampleSelector onSelectSample={handleSampleSelect} />

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end">
              <Button
                type="submit"
                variant="primary"
                isLoading={step !== 'idle' && step !== 'completed' && step !== 'error'}
                className="w-full sm:w-auto"
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
