import React from 'react';
import { ComparisonResult, Language } from '../../types';
import { getTranslation } from '../../services/i18n';
import { formatINR } from '../../services/calculationEngine';
import { 
  Award, 
  MapPin, 
  Truck, 
  Info, 
  HelpCircle, 
  TrendingUp, 
  CheckCircle, 
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface RecommendedMandiCardProps {
  result: ComparisonResult;
  language: Language;
  onOpenCalculationModal: (result: ComparisonResult) => void;
  onSaveMandi: (id: string) => void;
  isSaved: boolean;
}

export const RecommendedMandiCard: React.FC<RecommendedMandiCardProps> = ({
  result,
  language,
  onOpenCalculationModal,
  onSaveMandi,
  isSaved,
}) => {
  const t = getTranslation(language);
  const { mandi } = result;

  return (
    <div className="relative rounded-3xl bg-white border-2 border-[#79A95A] p-6 shadow-sm overflow-hidden mb-6">
      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-[#E1E9DC]">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-[#EBF5EE] text-[#2F6B3F] text-xs font-bold flex items-center gap-1.5 border border-[#C4D7BC]">
            <Award className="w-4 h-4 text-[#E9B949]" />
            <span>{t.recommendedBadge}</span>
          </div>
          <span className="text-xs text-[#6B786D] hidden sm:inline">
            • {t.mandiSource}: <strong className="text-[#26352A]">{mandi.source}</strong>
          </span>
        </div>

        {/* Saved Toggle Button */}
        <button
          onClick={() => onSaveMandi(mandi.id)}
          className={`text-xs px-3 py-1 rounded-lg border font-medium transition-colors ${
            isSaved
              ? 'bg-[#EBF5EE] text-[#2F6B3F] border-[#79A95A]'
              : 'bg-white text-[#6B786D] border-[#E1E9DC] hover:text-[#26352A]'
          }`}
        >
          {isSaved ? `★ ${t.savedMandiBtn}` : `☆ ${t.saveMandiBtn}`}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Mandi Info & Prices */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#6B786D] mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#79A95A]" />
              <span>{mandi.district}, {mandi.state}</span>
              <span className="font-semibold text-[#2F6B3F]">({result.distanceKm} km {language === 'hi' ? 'दूरी' : 'away'})</span>
            </div>
            <h2 className="text-2xl font-bold text-[#26352A] tracking-tight">
              {language === 'hi' ? mandi.mandiNameHi : mandi.mandiName}
            </h2>
            <p className="text-xs text-[#6B786D] mt-0.5">
              {mandi.commodity} • <span className="text-[#8B6848] font-medium">{mandi.variety}</span>
            </p>
          </div>

          {/* Pricing Chips */}
          <div className="grid grid-cols-3 gap-3 bg-[#F3F8EF] p-3 rounded-2xl border border-[#E1E9DC]">
            <div>
              <p className="text-[11px] text-[#6B786D]">{t.modalPriceLabel}</p>
              <p className="text-lg font-bold text-[#2F6B3F] leading-tight">
                {formatINR(mandi.modalPrice)}
                <span className="text-xs font-normal text-[#6B786D]">{t.perQuintal}</span>
              </p>
            </div>
            <div>
              <p className="text-[11px] text-[#6B786D]">Min Price</p>
              <p className="text-sm font-semibold text-[#6B786D] leading-tight">
                {formatINR(mandi.minPrice)}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-[#6B786D]">Max Price</p>
              <p className="text-sm font-semibold text-[#26352A] leading-tight">
                {formatINR(mandi.maxPrice)}
              </p>
            </div>
          </div>

          {/* Explanation Quote */}
          {result.recommendationExplanationEn && (
            <div className="bg-[#FFFDF5] p-3 rounded-xl border border-[#E9B949]/30 text-xs text-[#8B6848] flex items-start gap-2">
              <span className="text-base leading-none">💡</span>
              <p className="leading-relaxed">
                {language === 'hi' ? result.recommendationExplanationHi : result.recommendationExplanationEn}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Earnings Summary Card */}
        <div className="lg:col-span-5 bg-[#F3F8EF] rounded-2xl p-5 border border-[#E1E9DC] space-y-3.5">
          <div className="flex items-center justify-between text-xs text-[#6B786D] pb-2 border-b border-[#E1E9DC]">
            <span>{t.grossProceedsLabel} ({result.quantityQuintals} q)</span>
            <span className="font-semibold text-[#26352A]">{formatINR(result.grossProceeds)}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-[#6B786D] pb-2 border-b border-[#E1E9DC]">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#8B6848]" />
              <span>{t.transportCostLabel}</span>
            </span>
            <span className="font-semibold text-[#B93838]">- {formatINR(result.transportCost)}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-[#6B786D] pb-2 border-b border-[#E1E9DC]">
            <span>Loading & Mandi Fees</span>
            <span className="font-semibold text-[#B93838]">
              - {formatINR(result.loadingCost + result.unloadingCost + result.mandiFeeCost + result.otherCosts)}
            </span>
          </div>

          {/* Highlight Net Earnings in Hand */}
          <div className="pt-1">
            <p className="text-xs font-semibold text-[#2F6B3F] uppercase tracking-wider">
              {t.netProceedsLabel}
            </p>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-3xl font-extrabold text-[#2F6B3F] tracking-tight">
                {formatINR(result.estimatedNetProceeds)}
              </span>
              <span className="text-xs font-semibold bg-[#2F6B3F] text-white px-2 py-0.5 rounded-full">
                {formatINR(result.effectiveNetPerQuintal)}{t.perQuintal} net
              </span>
            </div>
          </div>

          {/* Primary Action Button: See why this mandi is recommended */}
          <button
            onClick={() => onOpenCalculationModal(result)}
            className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#2F6B3F] hover:bg-[#22512F] text-white font-semibold text-xs shadow-xs hover:shadow transition-all"
          >
            <HelpCircle className="w-4 h-4 text-[#E9B949]" />
            <span>{t.seeWhyRecommended}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mandatory Disclaimer footer */}
      <div className="mt-4 pt-3 border-t border-[#E1E9DC] flex items-center gap-1.5 text-[11px] text-[#6B786D]">
        <Info className="w-3.5 h-3.5 text-[#8B6848] shrink-0" />
        <p className="leading-normal">
          {language === 'hi'
            ? 'ऐतिहासिक मॉडल भाव भविष्य की नीलामी के लिए गारंटी नहीं है। वास्तविक भाव गुणवत्ता, तौल और मंडी में आने वाले खरीदारों पर निर्भर करेगा।'
            : 'Historical modal prices are reported market averages and not a guaranteed future selling price.'}
        </p>
      </div>
    </div>
  );
};
