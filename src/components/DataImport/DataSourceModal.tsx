import React, { useState } from 'react';
import { Language } from '../../types';
import { getTranslation } from '../../services/i18n';
import { dataService, DataSourceMode, DataSourceStatus } from '../../services/dataService';
import { 
  X, 
  Database, 
  Upload, 
  Download, 
  Key, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  ExternalLink,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface DataSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onDataUpdated: () => void;
}

export const DataSourceModal: React.FC<DataSourceModalProps> = ({
  isOpen,
  onClose,
  language,
  onDataUpdated,
}) => {
  if (!isOpen) return null;

  const t = getTranslation(language);
  const [status, setStatus] = useState<DataSourceStatus>(dataService.getStatus());
  const [apiKeyInput, setApiKeyInput] = useState<string>(dataService.getApiKey());
  const [csvFeedback, setCsvFeedback] = useState<{ success: boolean; msg: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleModeChange = (mode: DataSourceMode) => {
    dataService.setMode(mode);
    setStatus(dataService.getStatus());
    onDataUpdated();
  };

  const handleSaveApiKey = () => {
    dataService.setApiKey(apiKeyInput.trim());
    if (apiKeyInput.trim()) {
      dataService.setMode('datagov_api');
    }
    setStatus(dataService.getStatus());
    onDataUpdated();
  };

  const handleDownloadSampleCsv = () => {
    const csvContent = dataService.generateSampleCsvTemplate();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'fasalsetu_agmarknet_sample.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setCsvFeedback(null);

    const reader = new FileReader();
    reader.onload = evt => {
      try {
        const text = evt.target?.result as string;
        const parsed = dataService.parseCsvContent(text);
        setCsvFeedback({
          success: true,
          msg: `Successfully imported ${parsed.length} official mandi records from ${file.name}!`,
        });
        setStatus(dataService.getStatus());
        onDataUpdated();
      } catch (err: any) {
        setCsvFeedback({
          success: false,
          msg: err.message || 'Failed to parse CSV. Please verify column headers.',
        });
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E1E9DC] overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#F3F8EF] px-6 py-5 border-b border-[#E1E9DC] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2F6B3F] text-white flex items-center justify-center">
              <Database className="w-5 h-5 text-[#FFFDF5]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#26352A]">
                {t.dataSourceTitle}
              </h3>
              <p className="text-xs text-[#6B786D]">
                Agmarknet • e-NAM • Data.gov.in Schema Normalization
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#6B786D] hover:bg-white hover:text-[#26352A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Current Status Pill Card */}
          <div className="p-4 rounded-2xl bg-[#F3F8EF] border border-[#E1E9DC] flex items-center justify-between">
            <div>
              <span className="text-xs text-[#6B786D] block font-medium">{t.currentSource}:</span>
              <strong className="text-sm text-[#26352A]">{status.sourceLabel}</strong>
              <p className="text-[11px] text-[#79A95A] font-semibold mt-0.5">
                {status.recordCount} Mandi records active • Normalization Schema V2
              </p>
            </div>

            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              status.isDemo ? 'bg-[#FFFDF5] text-[#8B6848] border border-[#E9B949]' : 'bg-[#EBF5EE] text-[#2F6B3F]'
            }`}>
              {status.isDemo ? 'Sample Demo Mode' : 'Live / Custom Data'}
            </span>
          </div>

          {/* Mode Switcher */}
          <div>
            <label className="block text-xs font-bold text-[#26352A] mb-2 uppercase tracking-wider">
              Select Data Integration Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleModeChange('demo')}
                className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                  status.mode === 'demo'
                    ? 'bg-[#2F6B3F] text-white border-[#2F6B3F] shadow-sm'
                    : 'bg-white hover:bg-[#F3F8EF] text-[#26352A] border-[#E1E9DC]'
                }`}
              >
                <div className="font-bold mb-1">1. Verified Sample Data</div>
                <p className={`text-[11px] ${status.mode === 'demo' ? 'text-white/80' : 'text-[#6B786D]'}`}>
                  Curated APMC benchmarks (Lasalgaon, Choithram, Khanna, Kota)
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleModeChange('custom_csv')}
                className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                  status.mode === 'custom_csv'
                    ? 'bg-[#2F6B3F] text-white border-[#2F6B3F] shadow-sm'
                    : 'bg-white hover:bg-[#F3F8EF] text-[#26352A] border-[#E1E9DC]'
                }`}
              >
                <div className="font-bold mb-1">2. Custom CSV Upload</div>
                <p className={`text-[11px] ${status.mode === 'custom_csv' ? 'text-white/80' : 'text-[#6B786D]'}`}>
                  Upload official Agmarknet export files or mandi records
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleModeChange('datagov_api')}
                className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                  status.mode === 'datagov_api'
                    ? 'bg-[#2F6B3F] text-white border-[#2F6B3F] shadow-sm'
                    : 'bg-white hover:bg-[#F3F8EF] text-[#26352A] border-[#E1E9DC]'
                }`}
              >
                <div className="font-bold mb-1">3. Live data.gov.in API</div>
                <p className={`text-[11px] ${status.mode === 'datagov_api' ? 'text-white/80' : 'text-[#6B786D]'}`}>
                  Direct connection with Open Government Data API key
                </p>
              </button>
            </div>
          </div>

          {/* Section 1: CSV Upload Workflow */}
          <div className="p-4 rounded-2xl bg-white border border-[#E1E9DC] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#2F6B3F]" />
                <span className="text-xs font-bold text-[#26352A]">{t.uploadCsv}</span>
              </div>
              <button
                type="button"
                onClick={handleDownloadSampleCsv}
                className="flex items-center gap-1 text-[11px] font-semibold text-[#2F6B3F] hover:underline"
              >
                <Download className="w-3 h-3" />
                <span>{t.downloadSampleCsv}</span>
              </button>
            </div>
            <p className="text-xs text-[#6B786D] leading-relaxed">
              {t.uploadCsvDesc}. Accepts columns: <code>State, District, Market, Commodity, Variety, Arrival_Date, Min_Price, Max_Price, Modal_Price</code>.
            </p>

            <div className="pt-1">
              <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-[#C4D7BC] hover:border-[#2F6B3F] rounded-2xl bg-[#F3F8EF]/40 cursor-pointer transition-colors">
                <FileText className="w-8 h-8 text-[#79A95A] mb-1.5" />
                <span className="text-xs font-bold text-[#26352A]">
                  Click to select CSV file from your computer
                </span>
                <span className="text-[10px] text-[#6B786D] mt-0.5">
                  Comma-separated .csv format only
                </span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {csvFeedback && (
              <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                csvFeedback.success ? 'bg-[#EBF5EE] text-[#2F6B3F]' : 'bg-red-50 text-[#B93838]'
              }`}>
                {csvFeedback.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                <span>{csvFeedback.msg}</span>
              </div>
            )}
          </div>

          {/* Section 2: Live Government API Key Setup */}
          <div className="p-4 rounded-2xl bg-[#FFFDF5] border border-[#E9B949]/40 space-y-3">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-[#8B6848]" />
              <span className="text-xs font-bold text-[#26352A]">{t.apiKeySection}</span>
            </div>
            <p className="text-xs text-[#6B786D] leading-relaxed">
              {t.apiKeyDesc} You can register freely at{' '}
              <a 
                href="https://data.gov.in" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#2F6B3F] font-semibold underline inline-flex items-center gap-0.5"
              >
                data.gov.in <ExternalLink className="w-2.5 h-2.5" />
              </a>{' '}
              to generate a personal API key.
            </p>

            <div className="flex gap-2">
              <input
                type="password"
                value={apiKeyInput}
                onChange={e => setApiKeyInput(e.target.value)}
                placeholder="Enter 57-character API Key (e.g. 579b464db66ec23bdd000001...)"
                className="flex-1 px-3 py-2 rounded-xl border border-[#E1E9DC] bg-white text-xs font-mono text-[#26352A] focus:outline-none focus:border-[#2F6B3F]"
              />
              <button
                type="button"
                onClick={handleSaveApiKey}
                className="px-4 py-2 rounded-xl bg-[#2F6B3F] hover:bg-[#22512F] text-white text-xs font-bold transition-colors whitespace-nowrap"
              >
                {t.saveApiKey}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F3F8EF] border-t border-[#E1E9DC] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#2F6B3F] text-white text-xs font-semibold hover:bg-[#22512F] transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
