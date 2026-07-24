import React from 'react';
import { CheckCircle2, Loader2, FileText, Cpu, BarChart3, FileCheck } from 'lucide-react';
import type { GenerationStep } from '../../types';

interface ProgressStepperProps {
  currentStep: GenerationStep;
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({ currentStep }) => {
  const steps = [
    { id: 'parsing', label: 'Parsing Document', icon: FileText },
    { id: 'extracting', label: 'Extracting AI Data', icon: Cpu },
    { id: 'charts', label: 'Generating Charts', icon: BarChart3 },
    { id: 'pdf', label: 'Building PDF Report', icon: FileCheck },
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
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-6 mb-6">
      <h3 className="text-sm font-semibold text-slate-200 mb-4 flex items-center justify-between">
        <span>Report Generation Progress</span>
        <span className="text-xs text-emerald-400 font-mono">Processing...</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
        {steps.map((step) => {
          const status = getStepStatus(step.id);
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                status === 'completed'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : status === 'active'
                  ? 'bg-slate-800 border-emerald-500 text-white shadow-lg shadow-emerald-500/10 animate-pulse'
                  : 'bg-slate-950/50 border-slate-800/80 text-slate-500'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-bold ${
                  status === 'completed'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : status === 'active'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-900 text-slate-600'
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
              <div>
                <p className="text-xs font-semibold">{step.label}</p>
                <p className="text-[10px] text-slate-400 capitalize">
                  {status === 'completed' ? 'Done' : status === 'active' ? 'In progress' : 'Waiting'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
