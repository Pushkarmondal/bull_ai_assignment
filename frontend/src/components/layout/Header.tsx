import React from 'react';
import { FileText, Sparkles, Cpu, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-2xl sticky top-0 z-40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl gradient-teal flex items-center justify-center text-white shadow-lg shadow-emerald-900/30 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-base sm:text-lg text-white flex items-center gap-2 tracking-tight">
              Equity AI Engine
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm">
                <Sparkles className="w-3 h-3 animate-spin-slow" /> Geojit 4-Page Standard
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">Institutional Financial Report Generator</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="font-semibold text-slate-200">Groq Llama-3.3-70B</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold">Pipeline Online</span>
          </div>
        </div>
      </div>
    </header>
  );
};
