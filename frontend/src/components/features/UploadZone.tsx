import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, Table, File, X, CheckCircle2, FileUp } from 'lucide-react';

interface UploadZoneProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  error?: string;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onFileSelect,
  selectedFile,
  error,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSelect(e.target.files[0]);
    }
  };

  const validateAndSelect = (file: File) => {
    const validExts = ['.pdf', '.csv', '.txt'];
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
    if (validExts.includes(fileExt)) {
      onFileSelect(file);
    } else {
      alert('Please upload a valid PDF, CSV, or TXT document.');
    }
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (ext === 'csv') return <Table className="w-5 h-5 text-cyan-400" />;
    if (ext === 'pdf') return <FileText className="w-5 h-5 text-emerald-400" />;
    return <File className="w-5 h-5 text-teal-400" />;
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-slate-200 mb-2.5">
        Upload Financial Document <span className="text-emerald-400">*</span>
      </label>

      {!selectedFile ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`group border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 relative overflow-hidden ${
            isDragging
              ? 'border-emerald-400 bg-emerald-500/15 scale-[1.01] shadow-xl shadow-emerald-950/40'
              : 'border-slate-800 bg-slate-950/40 hover:border-emerald-500/40 hover:bg-slate-900/60'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleChange}
            accept=".pdf,.csv,.txt"
            className="hidden"
          />

          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-emerald-400 mb-4 shadow-lg group-hover:scale-110 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all duration-300">
            <UploadCloud className="w-8 h-8 group-hover:animate-bounce" />
          </div>

          <p className="text-slate-200 font-bold text-base mb-1 group-hover:text-white transition-colors">
            Click to upload or drag & drop financial document
          </p>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
            Supports earnings releases, annual reports, or quarterly metrics in <span className="text-emerald-400 font-semibold">PDF</span>, <span className="text-cyan-400 font-semibold">CSV</span>, or <span className="text-teal-400 font-semibold">TXT</span> format.
          </p>

          <div className="flex items-center justify-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">.PDF</span>
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">.CSV</span>
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">.TXT</span>
          </div>
        </div>
      ) : (
        <div className="border border-slate-750 bg-slate-900/80 rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-black/40 animate-fade-in">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
              {getFileIcon(selectedFile.name)}
            </div>
            <div>
              <p className="font-bold text-white text-sm flex items-center gap-2">
                {selectedFile.name}
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </p>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">
                {(selectedFile.size / 1024).toFixed(1)} KB • Ready for AI extraction
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onFileSelect(null)}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all cursor-pointer"
            title="Remove document"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {error && <p className="text-xs text-rose-400 mt-2 font-medium flex items-center gap-1"><X className="w-3.5 h-3.5" /> {error}</p>}
    </div>
  );
};
