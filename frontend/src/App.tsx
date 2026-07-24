import React from 'react';
import { Header } from './components/layout/Header';
import { ReportForm } from './components/features/ReportForm';
import { Sparkles, FileCheck, BarChart2, Zap, ShieldCheck } from 'lucide-react';

export function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060913] bg-ambient-glow text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-white transition-colors duration-400 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Luxury Editorial Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-14 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 text-xs font-bold mb-6 shadow-sm animate-float">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> Executive Equity Research Engine
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Financial Research. <br className="hidden sm:inline" />
            <span className="gradient-text-luxury italic font-normal">Intelligence.</span> Intuition.
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-6 leading-relaxed max-w-2xl mx-auto font-normal">
            Upload company earnings documents in <strong className="font-semibold text-slate-900 dark:text-slate-200">PDF</strong>, <strong className="font-semibold text-slate-900 dark:text-slate-200">CSV</strong>, or <strong className="font-semibold text-slate-900 dark:text-slate-200">TXT</strong> format to extract structured financial data and generate downloadable 4-page Geojit-style equity research reports.
          </p>
        </div>

        {/* Feature Highlights Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-14">
          <div className="p-5 rounded-2xl glass-card flex items-start gap-4 group cursor-default transition-all duration-300">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Groq Llama 3.3 Extraction</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Extracts structured line items, margins & narrative highlights with Zod schema validation.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-card flex items-start gap-4 group cursor-default transition-all duration-300">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Dual-Axis Vector SVG Charts</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Generates 4 vector trend graphics for revenue, EBITDA, GOV, and PAT margins.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-card flex items-start gap-4 group cursor-default transition-all duration-300">
            <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">Geojit 4-Page PDF Template</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Puppeteer A4 print layout matching authentic Geojit institutional report standards.</p>
            </div>
          </div>
        </div>

        {/* Main Generator Form */}
        <ReportForm />
      </main>

      <footer className="border-t border-slate-200/80 dark:border-slate-900/80 bg-white/60 dark:bg-slate-950/80 py-8 text-xs text-slate-500 dark:text-slate-500 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Institutional Financial Research Suite
          </p>
          <p className="text-slate-500">Powered by Vite, React, Express, Groq AI, Handlebars & Puppeteer</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
