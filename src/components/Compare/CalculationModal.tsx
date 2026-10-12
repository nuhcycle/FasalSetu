import React from 'react';
import { ComparisonResult, Language } from '../../types';
import { getTranslation } from '../../services/i18n';
import { formatINR } from '../../services/calculationEngine';
import { 
  X, 
  Calculator, 
  CheckCircle2, 
  Truck, 
  Scale, 
  AlertTriangle, 
  ArrowRight,
  ShieldAlert,
  Coins
} from 'lucide-react';

interface CalculationModalProps {
  result: ComparisonResult | null;
  language: Language;
  onClose: () => void;
}

export const CalculationModal: React.FC<CalculationModalProps> = ({
  result,
  language,
  onClose,
}) => {
  if (!result) return null;
  const t = getTranslation(language);
  const { mandi } = result;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E1E9DC] overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#F3F8EF] px-6 py-5 border-b border-[#E1E9DC] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2F6B3F] text-white flex items-center justify-center">
              <Calculator className="w-5 h-5 text-[#FFFDF5]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#26352A]">
                {t.breakdownTitle}
              </h3>
              <p className="text-xs text-[#6B786D]">
                {language === 'hi' ? mandi.mandiNameHi : mandi.mandiName} • {mandi.district}
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

        {/* Content Body with Step-by-Step Math */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Unit Conversion Explanation */}
          <div className="bg-[#FFFDF5] p-3.5 rounded-2xl border border-[#E9B949]/30 text-xs text-[#8B6848] space-y-1">
            <p className="font-bold">
              ⚖️ {language === 'hi' ? 'माप इकाई का मानक रूपांतरण' : 'Standard Unit Normalization'}:
            </p>
            <p>
              {language === 'hi'
                ? `1 क्विंटल = 100 किलोग्राम | 1 टन = 1,000 किलोग्राम। दर्ज फसल: ${result.quantityKg.toLocaleString('en-IN')} kg (${result.quantityQuintals} क्विंटल)`
                : `1 Quintal = 100 Kilograms | 1 Tonne = 1,000 Kilograms. Entered harvest: ${result.quantityKg.toLocaleString('en-IN')} kg (${result.quantityQuintals} quintals)`}
            </p>
          </div>

          {/* Step 1: Gross Proceeds */}
          <div className="p-4 rounded-2xl bg-[#F3F8EF] border border-[#E1E9DC] space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#2F6B3F]">
              <span>{t.step1Gross}</span>
              <span className="text-sm">{formatINR(result.grossProceeds)}</span>
            </div>
            <div className="text-xs text-[#6B786D] font-mono bg-white p-2.5 rounded-xl border border-[#E1E9DC] space-y-1">
              <p>
                {result.quantityKg.toLocaleString('en-IN')} kg × ₹{result.pricePerKg.toFixed(2)}/kg
              </p>
              <p className="text-[11px] text-[#8B6848]">
                (= {result.quantityQuintals} quintals × {formatINR(result.reportedModalPricePerQuintal)}/q)
              </p>
            </div>
          </div>

          {/* Step 2: Transport Cost */}
          <div className="p-4 rounded-2xl bg-[#F3F8EF] border border-[#E1E9DC] space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#B93838]">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#8B6848]" />
                <span>{t.step2Transport}</span>
              </span>
              <span className="text-sm">- {formatINR(result.transportCost)}</span>
            </div>
            <div className="text-xs text-[#6B786D] font-mono bg-white p-2.5 rounded-xl border border-[#E1E9DC]">
              {result.distanceKm} km × {formatINR(Math.round(result.transportCost / Math.max(1, result.distanceKm)))}/km
            </div>
          </div>

          {/* Step 3: Loading & Unloading */}
          <div className="p-4 rounded-2xl bg-[#F3F8EF] border border-[#E1E9DC] space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#B93838]">
              <span>{t.step3Loading}</span>
              <span className="text-sm">
                - {formatINR(result.loadingCost + result.unloadingCost)}
              </span>
            </div>
            <div className="text-xs text-[#6B786D] font-mono bg-white p-2.5 rounded-xl border border-[#E1E9DC] space-y-0.5">
              <p>Loading: {result.quantityQuintals} q × ₹{Math.round(result.loadingCost / Math.max(1, result.quantityQuintals))}/q = {formatINR(result.loadingCost)}</p>
              <p>Unloading: {result.quantityQuintals} q × ₹{Math.round(result.unloadingCost / Math.max(1, result.quantityQuintals))}/q = {formatINR(result.unloadingCost)}</p>
            </div>
          </div>

          {/* Step 4: Mandi Cess & Other Charges */}
          <div className="p-4 rounded-2xl bg-[#F3F8EF] border border-[#E1E9DC] space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#B93838]">
              <span>{t.step4Cess}</span>
              <span className="text-sm">
                - {formatINR(result.mandiFeeCost + result.otherCosts)}
              </span>
            </div>
            <div className="text-xs text-[#6B786D] font-mono bg-white p-2.5 rounded-xl border border-[#E1E9DC] space-y-0.5">
              <p>APMC Mandi Cess: {formatINR(result.mandiFeeCost)}</p>
              <p>Packaging & Gunny Bags: {formatINR(result.otherCosts)}</p>
            </div>
          </div>

          {/* Step 5: Final Net In Pocket */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#2F6B3F] to-[#22512F] text-white shadow-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">{t.step5Net}</span>
              <span className="text-2xl font-extrabold tracking-tight">
                {formatINR(result.estimatedNetProceeds)}
              </span>
            </div>
            <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs text-white/90">
              <span>{t.effectivePerQuintal}:</span>
              <span className="font-bold text-sm bg-white/20 px-2.5 py-0.5 rounded-md">
                {formatINR(result.effectiveNetPerQuintal)}{t.perQuintal}
              </span>
            </div>
          </div>

          {/* Advisory & Disclaimers */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              <span>{t.disclaimerTitle}</span>
            </div>
            <p className="leading-relaxed">
              {t.disclaimerText}
            </p>
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
