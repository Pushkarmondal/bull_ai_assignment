import React from 'react';
import { X, ExternalLink, Download, FileText } from 'lucide-react';
import { Button } from '../common/Button';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportUrl: string;
  companyName: string;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  reportUrl,
  companyName,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      style={{
        backgroundColor: 'rgba(6, 9, 19, 0.55)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
    >
      <div className="glass-modal rounded-2xl w-full max-w-5xl h-[88vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
        {/* Modal Header */}
        <div className="p-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-teal flex items-center justify-center text-white shadow-md">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury font-bold text-slate-900 dark:text-white text-base">
                {companyName} Equity Research Report
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">Generated Geojit-Style 4-Page PDF</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open Fullscreen
            </a>

            <a
              href={reportUrl}
              download={`${companyName.toLowerCase().replace(/\s+/g, '_')}_research_report.pdf`}
            >
              <Button variant="primary" className="py-1.5 px-4 text-xs">
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Download PDF
              </Button>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content - PDF Viewer */}
        <div className="flex-1 bg-slate-100 dark:bg-slate-950 p-2 relative">
          <iframe
            src={reportUrl}
            title={`${companyName} Report Preview`}
            className="w-full h-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white"
          />
        </div>
      </div>
    </div>
  );
};
