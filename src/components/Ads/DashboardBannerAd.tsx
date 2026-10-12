import React, { useState } from 'react';
import { Language, UserSubscription } from '../../types';
import { SPONSORED_AGRI_ADS } from '../../data/subscriptionPlans';
import { getTranslation } from '../../services/i18n';
import { ExternalLink, ShieldCheck, Sparkles, X, ChevronRight, Phone } from 'lucide-react';

interface DashboardBannerAdProps {
  subscription: UserSubscription;
  language: Language;
  onUpgradeClick: () => void;
}

export const DashboardBannerAd: React.FC<DashboardBannerAdProps> = ({
  subscription,
  language,
  onUpgradeClick,
}) => {
  // If user is on a paid plan (Plus or FPO), NEVER render ads
  if (subscription.plan !== 'free' && subscription.status === 'active') {
    return null;
  }

  const [dismissed, setDismissed] = useState(false);
  const t = getTranslation(language);
  // Pick the prime sponsored partner (PM Kusum / Soil Testing)
  const ad = SPONSORED_AGRI_ADS[0];

  if (dismissed) {
    return null;
  }

  return (
    <div className="relative mb-6 rounded-3xl bg-gradient-to-r from-[#FFFDF5] via-[#FFF9E6] to-[#F3F8EF] border border-[#E9B949]/50 p-4 sm:p-5 shadow-xs overflow-hidden">
      {/* Top Tag & Close/Upgrade action */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E9B949]/20 text-[11px]">
        <div className="flex items-center gap-1.5 font-bold text-[#8B6848]">
          <span className="px-1.5 py-0.5 rounded bg-[#E9B949]/20 text-[10px] uppercase tracking-wider border border-[#E9B949]/40">
            {language === 'hi' ? 'विज्ञापन' : 'Ad'}
          </span>
          <span>• {ad.sponsorName}</span>
          {ad.verifiedGovScheme && (
            <span className="hidden sm:inline-flex items-center gap-0.5 text-[#2F6B3F] font-semibold bg-[#EBF5EE] px-1.5 py-0.5 rounded text-[10px]">
              <ShieldCheck className="w-3 h-3" />
              {language === 'hi' ? 'सत्यापित योजना' : 'Verified Initiative'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onUpgradeClick}
            className="text-[11px] font-bold text-[#2F6B3F] hover:underline flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-[#E9B949]" />
            <span className="hidden sm:inline">{t.removeAdsWithPlus}</span>
            <span className="sm:hidden">Remove Ads</span>
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-md text-[#8B6848] hover:bg-[#E9B949]/20 transition-colors"
            title="Dismiss Banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Ad Content */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-white shadow-xs border border-[#E9B949]/30 flex items-center justify-center text-2xl shrink-0">
            {ad.icon}
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#26352A] leading-snug">
              {language === 'hi' ? ad.titleHi : ad.titleEn}
            </h4>
            <p className="text-xs text-[#6B786D] mt-0.5 line-clamp-2 max-w-xl">
              {language === 'hi' ? ad.descriptionHi : ad.descriptionEn}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={ad.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2F6B3F] hover:bg-[#22512F] text-white text-xs font-bold shadow-xs transition-colors"
          >
            <span>{language === 'hi' ? ad.ctaTextHi : ad.ctaTextEn}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Mandatory Ethics & Privacy Disclaimer */}
      <div className="mt-2.5 pt-2 border-t border-[#E9B949]/20 text-[10px] text-[#8B6848] italic flex items-center gap-1">
        <span>🛡️</span>
        <span>{t.adDisclosure}</span>
      </div>
    </div>
  );
};
