import React from 'react';
import { Crop, ComparisonResult, Language } from '../../types';
import { getTranslation } from '../../services/i18n';
import { formatINR } from '../../services/calculationEngine';
import { Calendar, Store, Wallet, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface QuickMarketSummaryProps {
  selectedCrop: Crop;
  latestDate: string;
  usableMandisCount: number;
  bestResult?: ComparisonResult;
  language: Language;
}

export const QuickMarketSummary: React.FC<QuickMarketSummaryProps> = ({
  selectedCrop,
  latestDate,
  usableMandisCount,
  bestResult,
  language,
}) => {
  const t = getTranslation(language);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {/* 1. Selected Crop */}
      <div className="bg-white p-4 rounded-2xl border border-[#E1E9DC] shadow-xs">
        <div className="flex items-center justify-between text-xs text-[#6B786D] mb-1 font-medium">
          <span>{t.summarySelectedCrop}</span>
          <span className="text-xl">{selectedCrop.icon}</span>
        </div>
        <p className="text-lg font-bold text-[#26352A] truncate">
          {language === 'hi' ? selectedCrop.nameHi : selectedCrop.nameEn}
        </p>
        <p className="text-[11px] text-[#79A95A] font-semibold mt-0.5">
          {selectedCrop.category.toUpperCase()} • {selectedCrop.standardSeason}
        </p>
      </div>

      {/* 2. Latest Market Date */}
      <div className="bg-white p-4 rounded-2xl border border-[#E1E9DC] shadow-xs">
        <div className="flex items-center justify-between text-xs text-[#6B786D] mb-1 font-medium">
          <span>{t.summaryDate}</span>
          <Calendar className="w-4 h-4 text-[#79A95A]" />
        </div>
        <p className="text-lg font-bold text-[#26352A]">
          {latestDate}
        </p>
        <div className="flex items-center gap-1 text-[11px] text-[#2F6B3F] font-semibold mt-0.5">
          <CheckCircle2 className="w-3 h-3" />
          <span>{t.freshLabel}</span>
        </div>
      </div>

      {/* 3. Mandis Compared */}
      <div className="bg-white p-4 rounded-2xl border border-[#E1E9DC] shadow-xs">
        <div className="flex items-center justify-between text-xs text-[#6B786D] mb-1 font-medium">
          <span>{t.summaryMandisCount}</span>
          <Store className="w-4 h-4 text-[#8B6848]" />
        </div>
        <p className="text-lg font-bold text-[#26352A]">
          {usableMandisCount} {language === 'hi' ? 'मंडियां' : 'Mandis'}
        </p>
        <p className="text-[11px] text-[#6B786D] mt-0.5">
          {language === 'hi' ? 'दूरी व भाव से सत्यापित' : 'Within travel distance'}
        </p>
      </div>

      {/* 4. Best Net Return */}
      <div className="bg-gradient-to-br from-[#FFFDF5] to-[#F3F8EF] p-4 rounded-2xl border border-[#E9B949]/40 shadow-xs">
        <div className="flex items-center justify-between text-xs text-[#8B6848] mb-1 font-bold">
          <span>{t.summaryBestNet}</span>
          <Wallet className="w-4 h-4 text-[#E9B949]" />
        </div>
        <p className="text-lg font-extrabold text-[#2F6B3F]">
          {bestResult ? formatINR(bestResult.estimatedNetProceeds) : '—'}
        </p>
        <p className="text-[11px] text-[#8B6848] font-medium mt-0.5 truncate">
          {bestResult ? `@ ${bestResult.mandi.mandiName}` : 'Compute to see'}
        </p>
      </div>
    </div>
  );
};
