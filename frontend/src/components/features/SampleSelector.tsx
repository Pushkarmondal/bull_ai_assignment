import React from 'react';
import { Sparkles, FileText, Table, Zap } from 'lucide-react';
import type { SampleDoc } from '../../types';

interface SampleSelectorProps {
  onSelectSample: (companyName: string, file: File) => void;
}

export const SampleSelector: React.FC<SampleSelectorProps> = ({ onSelectSample }) => {

  const handleSampleClick = (sample: SampleDoc, content: string) => {
    const blob = new Blob([content], {
      type: sample.type === 'CSV' ? 'text/csv' : 'text/plain',
    });
    const file = new File([blob], sample.filename, { type: blob.type });
    onSelectSample(sample.companyName, file);
  };

  return (
    <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wider">
            Quick 1-Click Test Documents
          </span>
        </div>
        <span className="text-[11px] text-slate-500 dark:text-slate-500 font-medium hidden sm:inline">Click to pre-fill form & test AI pipeline</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          type="button"
          onClick={() =>
            handleSampleClick(
              { id: '1', companyName: 'Tata Consultancy Services', filename: 'tcs_q1fy26.txt', type: 'TXT', path: '' },
              `Tata Consultancy Services Limited\nEquity Research Input\nCompany: Tata Consultancy Services Ltd.\nTicker: NSE: TCS\nSector: Information Technology\nQuarter: Q1 FY26\n\nRevenue from Operations: Rs. 64,479 crore\nRevenue YoY Growth: 6.8%\nOperating Margin: 24.7%\nEBIT: Rs. 15,920 crore\nNet Profit: Rs. 12,760 crore\nPAT YoY Growth: 8.1%\nLarge deal bookings reached USD 9.4 billion.\nMarket Cap: Rs. 15,80,000 crore\nCMP: Rs. 4380\nTarget Price: Rs. 4850\nRecommendation: BUY`
            )
          }
          className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-slate-100 dark:hover:bg-slate-900/80 text-left transition-all duration-300 group cursor-pointer active:scale-95 shadow-sm"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">TCS (Tech)</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Q1FY26 • TXT Format</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() =>
            handleSampleClick(
              { id: '2', companyName: 'Reliance Industries', filename: 'reliance_q1fy26.csv', type: 'CSV', path: '' },
              `Metric,Q1FY26,Q1FY25,YoY Growth (%)\nCompany Name,Reliance Industries Ltd,,\nSector,Energy & Telecom,,\nCurrent Market Price (CMP),2980,,\nTarget Price,3450,,\nRating,BUY,,\nMarket Cap (Rs cr),2015000,,\nRevenue from Operations,236890,216850,9.2\nEBITDA,42780,38760,10.4\nPAT Adjusted,17450,15130,15.3`
            )
          }
          className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 hover:bg-slate-100 dark:hover:bg-slate-900/80 text-left transition-all duration-300 group cursor-pointer active:scale-95 shadow-sm"
        >
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Table className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Reliance Industries</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Q1FY26 • CSV Format</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() =>
            handleSampleClick(
              { id: '3', companyName: 'Larsen & Toubro', filename: 'lt_q1fy26.txt', type: 'TXT', path: '' },
              `Larsen & Toubro Limited\nEquity Research Input Document\nCompany: Larsen & Toubro Ltd.\nTicker: NSE: LT\nSector: Engineering & Construction\nQuarter: Q1 FY26\n\nRevenue from Operations: Rs. 58,420 crore\nRevenue Growth: 9.9%\nEBITDA: Rs. 6,980 crore\nEBITDA Margin: 11.9%\nPAT: Rs. 3,820 crore\nPAT Growth: 14.2%\nOrder Book: Rs. 5,92,000 crore\nCMP: Rs. 3780\nTarget Price: Rs. 4250\nRecommendation: BUY`
            )
          }
          className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 hover:bg-slate-100 dark:hover:bg-slate-900/80 text-left transition-all duration-300 group cursor-pointer active:scale-95 shadow-sm"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Larsen & Toubro</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Q1FY26 • TXT Format</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() =>
            handleSampleClick(
              { id: '4', companyName: 'Apple Inc.', filename: 'apple_fy25.txt', type: 'TXT', path: '' },
              `Apple Inc. Q3 FY25 Results. Sector: Consumer Electronics. CMP: $224.50. Target Price: $260.00. Rating: BUY. Quarterly revenue $85.8 billion, up 5% YoY. Services revenue record $24.2 billion, up 14% YoY. EBITDA margin 32.5%.`
            )
          }
          className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-slate-100 dark:hover:bg-slate-900/80 text-left transition-all duration-300 group cursor-pointer active:scale-95 shadow-sm"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Apple Inc.</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">FY25 Results • TXT Format</div>
          </div>
        </button>
      </div>
    </div>
  );
};
