import React from 'react';
import { Header } from './components/layout/Header';
import { ReportForm } from './components/features/ReportForm';
import { Sparkles, FileCheck, BarChart2, Zap, ShieldCheck } from 'lucide-react';

export function App() {
  return (
    <div className="min-h-screen bg-[#060913] bg-ambient-glow text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-white flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Banner Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-xs font-bold mb-5 shadow-sm shadow-emerald-950/50 animate-float">
            <Sparkles className="w-3.5 h-3.5" /> Production Ready AI Equity Research Engine
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Financial Research <span className="gradient-text">Report Generator</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl mx-auto">
            Upload company earnings documents in <strong className="text-slate-200">PDF</strong>, <strong className="text-slate-200">CSV</strong>, or <strong className="text-slate-200">TXT</strong> format to extract structured financial data and generate downloadable 4-page Geojit-style equity research reports.
          </p>
        </div>

        {/* Feature Highlights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
          <div className="p-4 sm:p-5 rounded-2xl glass-card flex items-start gap-3.5 group cursor-default">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">Groq Llama 3.3 Extraction</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Extracts structured line items, margins & narrative highlights with Zod schema validation.</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl glass-card flex items-start gap-3.5 group cursor-default">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">Dual-Axis Vector SVG Charts</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Generates 4 vector trend graphics for revenue, EBITDA, GOV, and PAT margins.</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl glass-card flex items-start gap-3.5 group cursor-default">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-200 group-hover:text-teal-400 transition-colors">Geojit 4-Page PDF Template</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Puppeteer A4 print layout matching authentic Geojit institutional report standards.</p>
            </div>
          </div>
        </div>

        {/* Main Generator Form */}
        <ReportForm />
      </main>

      <footer className="border-t border-slate-900/80 bg-slate-950/80 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Production Equity Research Generator
          </p>
          <p className="text-slate-400">Powered by Vite, React, Express, Groq AI, Handlebars & Puppeteer</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
