import React from 'react';
import { Language, FarmerProfile } from '../../types';
import { getTranslation } from '../../services/i18n';
import { Scale, TrendingUp, MapPin, Sparkles } from 'lucide-react';

interface WelcomePanelProps {
  language: Language;
  profile: FarmerProfile;
  onNavigate: (tab: 'compare' | 'trends' | 'map') => void;
}

export const WelcomePanel: React.FC<WelcomePanelProps> = ({
  language,
  profile,
  onNavigate,
}) => {
  const t = getTranslation(language);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#E1E9DC] bg-white shadow-sm mb-6">
      {/* Background illustration with soft mint/cream gradient */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: `url('/assets/hero-bg.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF5] via-[#F3F8EF]/95 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 p-6 sm:p-8 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF5EE] border border-[#C4D7BC] text-[#2F6B3F] text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#E9B949]" />
          <span>{language === 'hi' ? 'स्मार्ट मंडी तुलना प्लेटफॉर्म' : 'Smart Mandi Decision Platform'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#26352A] tracking-tight leading-tight">
          {language === 'hi' 
            ? `नमस्ते, ${profile.name || 'किसान भाई'}!` 
            : `Namaste, ${profile.name || 'Farmer'}!`}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#6B786D] leading-relaxed">
          {t.welcomeDesc}
        </p>

        {/* Action CTAs */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('compare')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2F6B3F] hover:bg-[#22512F] text-white font-semibold text-sm shadow-md shadow-[#2F6B3F]/25 hover:shadow-lg transition-all transform active:scale-95"
          >
            <Scale className="w-4 h-4" />
            <span>{t.ctaCompare}</span>
          </button>

          <button
            onClick={() => onNavigate('trends')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#F3F8EF] text-[#26352A] font-medium text-sm border border-[#E1E9DC] shadow-xs hover:border-[#79A95A] transition-all"
          >
            <TrendingUp className="w-4 h-4 text-[#79A95A]" />
            <span>{t.ctaTrends}</span>
          </button>

          <button
            onClick={() => onNavigate('map')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#F3F8EF] text-[#26352A] font-medium text-sm border border-[#E1E9DC] shadow-xs hover:border-[#79A95A] transition-all"
          >
            <MapPin className="w-4 h-4 text-[#8B6848]" />
            <span>{t.ctaMap}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
