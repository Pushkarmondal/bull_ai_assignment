import React from 'react';
import { Sparkles, FileText, Table } from 'lucide-react';
import { SampleDoc } from '../../types';

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
    <div className="mt-6 pt-6 border-t border-slate-800">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-emerald-400" />
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Quick Test with Sample Financial Documents
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() =>
            handleSampleClick(
              { id: '1', companyName: 'Eternal Ltd.', filename: 'zomato_q1fy26.txt', type: 'TXT', path: '' },
              `Retail Equity Research - Eternal Ltd. (Zomato) Q1FY26 Result Update. Consolidated revenue surged 70.4% YoY to Rs 7,167cr. Blinkit revenue soared 154.8% YoY to Rs 2,400cr. EBITDA margin 1.6%. Target Price Rs 337, CMP Rs 306, Rating HOLD.`
            )
          }
          className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/60 text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200 group-hover:text-emerald-400">Eternal Ltd. (Zomato)</div>
            <div className="text-[10px] text-slate-400">Q1FY26 • TXT Format</div>
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
          className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/60 text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
            <Table className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-400">Reliance Industries</div>
            <div className="text-[10px] text-slate-400">Q1FY26 • CSV Format</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() =>
            handleSampleClick(
              { id: '3', companyName: 'Apple Inc.', filename: 'apple_fy25.txt', type: 'TXT', path: '' },
              `Apple Inc. Q3 FY25 Results. Sector: Consumer Electronics. CMP: $224.50. Target Price: $260.00. Rating: BUY. Quarterly revenue $85.8 billion, up 5% YoY. Services revenue record $24.2 billion, up 14% YoY. EBITDA margin 32.5%.`
            )
          }
          className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/60 text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200 group-hover:text-purple-400">Apple Inc.</div>
            <div className="text-[10px] text-slate-400">FY25 Results • TXT Format</div>
          </div>
        </button>
      </div>
    </div>
  );
};
