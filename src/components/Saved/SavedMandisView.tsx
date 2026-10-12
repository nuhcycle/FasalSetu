import React from 'react';
import { MandiRecord, Language, ComparisonInput } from '../../types';
import { getTranslation } from '../../services/i18n';
import { formatINR } from '../../services/calculationEngine';
import { Bookmark, MapPin, Trash2, ArrowRight, Store } from 'lucide-react';

interface SavedMandisViewProps {
  savedMandis: MandiRecord[];
  onRemoveSaved: (id: string) => void;
  onCompareWithMandi: (mandi: MandiRecord) => void;
  language: Language;
}

export const SavedMandisView: React.FC<SavedMandisViewProps> = ({
  savedMandis,
  onRemoveSaved,
  onCompareWithMandi,
  language,
}) => {
  const t = getTranslation(language);

  if (savedMandis.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-[#E1E9DC] p-10 text-center shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-[#F3F8EF] text-[#79A95A] flex items-center justify-center mx-auto mb-3">
          <Bookmark className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-[#26352A] mb-1">
          {language === 'hi' ? 'कोई पसंदीदा मंडी सुरक्षित नहीं है' : 'No Saved Mandis Yet'}
        </h3>
        <p className="text-xs text-[#6B786D] max-w-sm mx-auto">
          {language === 'hi'
            ? 'मंडी तुलना स्क्रीन पर किसी भी मंडी कार्ड पर बुकमार्क आइकन दबाकर उसे तुरंत सुरक्षित करें।'
            : 'Bookmark mandis in the Compare Mandis tab to keep track of your regular market yards here.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white p-5 rounded-2xl border border-[#E1E9DC] shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#26352A]">{t.navSaved}</h2>
          <p className="text-xs text-[#6B786D]">
            {savedMandis.length} {language === 'hi' ? 'मंडियां आपकी वॉचलिस्ट में हैं' : 'mandis in your quick watchlist'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {savedMandis.map(mandi => (
          <div
            key={mandi.id}
            className="bg-white rounded-3xl border border-[#E1E9DC] p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-bold text-base text-[#26352A]">
                    {language === 'hi' ? mandi.mandiNameHi : mandi.mandiName}
                  </h3>
                  <p className="text-xs text-[#6B786D] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#79A95A]" />
                    <span>{mandi.district}, {mandi.state}</span>
                  </p>
                </div>
                <button
                  onClick={() => onRemoveSaved(mandi.id)}
                  className="p-1.5 rounded-lg text-[#6B786D] hover:text-[#B93838] hover:bg-red-50 transition-colors"
                  title="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-[#F3F8EF] p-3 rounded-2xl border border-[#E1E9DC] my-3">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-[11px] text-[#6B786D] block">{mandi.commodity} ({mandi.variety})</span>
                    <strong className="text-lg font-bold text-[#2F6B3F]">
                      {formatINR(mandi.modalPrice)}
                      <span className="text-xs font-normal text-[#6B786D]">{t.perQuintal}</span>
                    </strong>
                  </div>
                  <span className="text-[10px] text-[#8B6848] font-medium bg-white px-2 py-0.5 rounded-full border border-[#E1E9DC]">
                    {mandi.source}
                  </span>
                </div>
              </div>

              {mandi.facilities && mandi.facilities.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {mandi.facilities.map((fac, idx) => (
                    <span key={idx} className="text-[10px] bg-[#FFFDF5] text-[#8B6848] px-2 py-0.5 rounded-md border border-[#E9B949]/30">
                      ✓ {fac}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => onCompareWithMandi(mandi)}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#2F6B3F] hover:bg-[#22512F] text-white text-xs font-bold transition-colors shadow-xs"
            >
              <span>{language === 'hi' ? 'इस मंडी का हिसाब लगाएं' : 'Compare Rates & Haulage'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
