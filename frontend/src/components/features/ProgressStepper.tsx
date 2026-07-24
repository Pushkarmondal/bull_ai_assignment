import React from 'react';
import { CheckCircle2, Loader2, FileText, Cpu, BarChart3, FileCheck } from 'lucide-react';
import type { GenerationStep } from '../../types';

interface ProgressStepperProps {
  currentStep: GenerationStep;
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({ currentStep }) => {
  const steps = [
    { id: 'parsing', label: 'Parsing Document', icon: FileText, desc: 'Extracting text content' },
    { id: 'extracting', label: 'Extracting AI Metrics', icon: Cpu, desc: 'Groq Llama-3.3 JSON mode' },
    { id: 'charts', label: 'Rendering Charts', icon: BarChart3, desc: 'Generating 4 vector graphics' },
    { id: 'pdf', label: 'Building PDF Report', icon: FileCheck, desc: 'Puppeteer print layout' },
  ];

  const getStepStatus = (stepId: string) => {
    const order = ['idle', 'parsing', 'extracting', 'charts', 'pdf', 'completed'];
    const currentIndex = order.indexOf(currentStep);
    const stepIndex = order.indexOf(stepId);

    if (currentStep === 'completed' || stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="w-full bg-slate-950/70 border border-slate-800/80 rounded-2xl p-6 mb-8 shadow-xl backdrop-blur-xl animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <h3 className="text-sm font-bold text-white tracking-wide">Report Generation Pipeline</h3>
        </div>
        <span className="text-xs text-emerald-400 font-bold px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
          Live Execution
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 relative">
        {steps.map((step) => {
          const status = getStepStatus(step.id);
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-300 ${
                status === 'completed'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-sm'
                  : status === 'active'
                  ? 'bg-slate-900 border-emerald-400 text-white shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-500/30 animate-pulse-glow'
                  : 'bg-slate-950/60 border-slate-800/60 text-slate-500'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold transition-transform ${
                  status === 'completed'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : status === 'active'
                    ? 'gradient-teal text-white shadow-md shadow-emerald-900/40 scale-105'
                    : 'bg-slate-900 text-slate-600 border border-slate-800'
                }`}
              >
                {status === 'completed' ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : status === 'active' ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold truncate">{step.label}</p>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                  {status === 'completed' ? 'Completed' : status === 'active' ? step.desc : 'Queued'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
