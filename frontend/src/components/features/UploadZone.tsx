import React, { useRef, useState } from 'react';
import { UploadCloud, File, X, CheckCircle2 } from 'lucide-react';

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
      alert('Please upload a valid PDF, CSV, or TXT file.');
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-200 mb-2">
        Upload Financial Document <span className="text-emerald-400">*</span>
      </label>

      {!selectedFile ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-emerald-500 bg-emerald-500/10 scale-[1.01]'
              : 'border-slate-700 bg-slate-900/50 hover:border-slate-500 hover:bg-slate-800/50'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleChange}
            accept=".pdf,.csv,.txt"
            className="hidden"
          />

          <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 mx-auto flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-7 h-7" />
          </div>

          <p className="text-slate-200 font-medium mb-1">
            Click to upload or drag & drop document
          </p>
          <p className="text-xs text-slate-400">
            Supports <strong className="text-emerald-400">PDF</strong>, <strong className="text-emerald-400">CSV</strong>, or <strong className="text-emerald-400">TXT</strong> (Max 15MB)
          </p>
        </div>
      ) : (
        <div className="border border-slate-700 bg-slate-800/70 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <File className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-slate-100 text-sm flex items-center gap-2">
                {selectedFile.name}
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </p>
              <p className="text-xs text-slate-400">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for processing
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onFileSelect(null)}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {error && <p className="text-xs text-rose-400 mt-2">{error}</p>}
    </div>
  );
};
