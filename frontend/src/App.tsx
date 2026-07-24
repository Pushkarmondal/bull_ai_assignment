import React from 'react';
import { Header } from './components/layout/Header';
import { ReportForm } from './components/features/ReportForm';
import { Sparkles, FileCheck, BarChart2, Zap } from 'lucide-react';

export function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Banner Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Production Ready AI Financial Analyst
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Financial Research Report Generator
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            Recreating authentic Geojit-style equity research reports. Upload financial documents in <strong className="text-slate-200">PDF</strong>, <strong className="text-slate-200">CSV</strong>, or <strong className="text-slate-200">TXT</strong> format to auto-extract structured financial data and generate downloadable 4-page PDF reports.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-200">Groq AI Extraction</h4>
              <p className="text-xs text-slate-400 mt-0.5">Parses metrics, narrative summaries & financial line items with Zod validation.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-200">Dynamic Charts</h4>
              <p className="text-xs text-slate-400 mt-0.5">Renders 4 server-side Chart.js trend graphics for revenue, EBITDA, GOV, & margins.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-200">Geojit 4-Page PDF</h4>
              <p className="text-xs text-slate-400 mt-0.5">Puppeteer print layout matching authentic Geojit equity report structure.</p>
            </div>
          </div>
        </div>

        {/* Main Generator Form */}
        <ReportForm />
      </main>

      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <p>Production Equity Research Generator • Built with Vite, React, Express, Groq AI, Handlebars & Puppeteer</p>
      </footer>
    </div>
  );
}

export default App;
