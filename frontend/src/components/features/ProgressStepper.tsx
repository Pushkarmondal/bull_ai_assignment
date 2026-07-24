import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, FileText, Cpu, BarChart3, FileCheck, Terminal, Clock, Sparkles, Activity } from 'lucide-react';
import type { GenerationStep } from '../../types';

interface ProgressStepperProps {
  currentStep: GenerationStep;
  companyName?: string;
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({ currentStep, companyName = 'Target Company' }) => {
  const [elapsed, setElapsed] = useState<number>(0);

  // Timer counter during active steps
  useEffect(() => {
    let interval: any;
    if (currentStep !== 'idle' && currentStep !== 'completed' && currentStep !== 'error') {
      const startTime = Date.now();
      interval = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 100) / 10);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [currentStep]);

  const steps = [
    {
      id: 'parsing',
      num: 1,
      label: 'Document Extraction',
      shortLabel: 'Parsing',
      icon: FileText,
      desc: 'PDF/CSV/TXT reader & sanitization',
      log: 'Reading text content, normalizing tables and character encodings...',
    },
    {
      id: 'extracting',
      num: 2,
      label: 'Groq AI Intelligence',
      shortLabel: 'AI Extraction',
      icon: Cpu,
      desc: 'Llama-3.3-70B JSON schema mode',
      log: 'Extracting financial metrics, margins, P&L, balance sheet & recommendations...',
    },
    {
      id: 'charts',
      num: 3,
      label: 'Vector SVG Graphics',
      shortLabel: 'SVG Charts',
      icon: BarChart3,
      desc: 'Dual-axis revenue & PAT graphs',
      log: 'Rendering 4 high-definition vector SVG trend graphics...',
    },
    {
      id: 'pdf',
      num: 4,
      label: 'Geojit PDF Renderer',
      shortLabel: 'PDF Build',
      icon: FileCheck,
      desc: 'Puppeteer A4 print engine',
      log: 'Compiling Handlebars template & creating 4-page Geojit-style PDF...',
    },
  ];

  const getStepStatus = (stepId: string) => {
    const order = ['idle', 'parsing', 'extracting', 'charts', 'pdf', 'completed'];
    const currentIndex = order.indexOf(currentStep);
    const stepIndex = order.indexOf(stepId);

    if (currentStep === 'completed' || stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  const getProgressPercentage = () => {
    switch (currentStep) {
      case 'parsing':
        return 25;
      case 'extracting':
        return 50;
      case 'charts':
        return 75;
      case 'pdf':
        return 90;
      case 'completed':
        return 100;
      default:
        return 5;
    }
  };

  const activeStepObj = steps.find((s) => s.id === currentStep) || steps[0];
  const progressPercent = getProgressPercentage();

  return (
    <div className="w-full bg-white/90 dark:bg-[#0b1120]/90 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl backdrop-blur-2xl animate-fade-in transition-all duration-300">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              Pipeline Execution Engine
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                Job Active
              </span>
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Generating 4-page research report for <strong className="text-slate-900 dark:text-slate-200 font-semibold">{companyName}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-semibold flex items-center gap-2 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-cyan-500 animate-spin-slow" />
            <span>Elapsed: {elapsed.toFixed(1)}s</span>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-mono">
            {progressPercent}% Complete
          </div>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2 font-semibold">
          <span className="flex items-center gap-1.5 text-slate-900 dark:text-white">
            <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            Current Stage: <strong className="text-emerald-600 dark:text-emerald-400">{activeStepObj.label}</strong>
          </span>
          <span>{progressPercent}%</span>
        </div>

        <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden relative shadow-inner p-0.5">
          <div
            className="h-full rounded-full gradient-teal transition-all duration-500 ease-out shadow-lg shadow-emerald-500/30 relative overflow-hidden"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute inset-0 shimmer-effect opacity-60"></div>
          </div>
        </div>
      </div>

      {/* 4 Pipeline Stages Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
        {steps.map((step) => {
          const status = getStepStatus(step.id);
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className={`p-4 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
                status === 'completed'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400 shadow-sm'
                  : status === 'active'
                  ? 'bg-white dark:bg-slate-900 border-emerald-500 text-slate-900 dark:text-white shadow-xl ring-2 ring-emerald-500/30 scale-[1.02]'
                  : 'bg-slate-50/50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/80 text-slate-400 dark:text-slate-500 opacity-70'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-extrabold font-mono px-2 py-0.5 rounded-md ${
                    status === 'completed'
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                      : status === 'active'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    STAGE 0{step.num}
                  </span>

                  {status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 animate-fade-in" />
                  ) : status === 'active' ? (
                    <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                  )}
                </div>

                <div className="flex items-center gap-2.5 mb-1.5">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      status === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                        : status === 'active'
                        ? 'gradient-teal text-white shadow-md'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold truncate">{step.label}</h4>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug font-medium">
                  {step.desc}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[10px]">
                <span className="font-semibold capitalize">
                  {status === 'completed' ? 'Done' : status === 'active' ? 'Executing...' : 'Queued'}
                </span>
                {status === 'active' && (
                  <span className="font-mono text-emerald-500 animate-pulse">Running</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Pipeline Execution Terminal Console */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs shadow-inner">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5 font-bold text-slate-300">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" /> Pipeline Console Logs
          </span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Live Event Stream
          </span>
        </div>

        <div className="space-y-1 text-slate-300 leading-relaxed text-[11px]">
          <p className="text-slate-500">
            [{elapsed.toFixed(1)}s] <span className="text-emerald-400">INFO</span> Pipeline orchestrator started for {companyName}
          </p>

          <p className="text-emerald-300">
            [{elapsed.toFixed(1)}s] <span className="text-cyan-400">EXEC</span> {activeStepObj.log}
          </p>

          {currentStep === 'completed' && (
            <p className="text-emerald-400 font-bold">
              [{elapsed.toFixed(1)}s] SUCCESS 4-Page Geojit PDF report compiled successfully.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
