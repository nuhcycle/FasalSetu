import React from 'react';
import { Language, UserSubscription } from '../../types';
import { SPONSORED_AGRI_ADS } from '../../data/subscriptionPlans';
import { getTranslation } from '../../services/i18n';
import { Phone, ExternalLink, ShieldCheck } from 'lucide-react';

interface SponsoredAgriCardProps {
  subscription: UserSubscription;
  language: Language;
  adIndex?: number;
}

export const SponsoredAgriCard: React.FC<SponsoredAgriCardProps> = ({
  subscription,
  language,
  adIndex = 1,
}) => {
  // Hide completely for paid subscribers
  if (subscription.plan !== 'free' && subscription.status === 'active') {
    return null;
  }

  const t = getTranslation(language);
  const ad = SPONSORED_AGRI_ADS[adIndex % SPONSORED_AGRI_ADS.length];

  return (
    <div className="rounded-3xl bg-white border border-[#E9B949]/40 p-4 sm:p-5 shadow-xs my-4 space-y-3">
      <div className="flex items-center justify-between text-[11px] pb-2 border-b border-[#E1E9DC]">
        <div className="flex items-center gap-1.5 font-bold text-[#8B6848]">
          <span className="px-1.5 py-0.5 rounded bg-[#E9B949]/20 text-[9px] uppercase tracking-wider border border-[#E9B949]/40">
            {language === 'hi' ? 'प्रायोजित' : 'Sponsored'}
          </span>
          <span className="truncate max-w-[200px]">{ad.sponsorName}</span>
        </div>
        <span className="text-[10px] text-[#6B786D]">{ad.categoryEn}</span>
      </div>

      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-2xl bg-[#FFFDF5] border border-[#E9B949]/30 flex items-center justify-center text-xl shrink-0">
          {ad.icon}
        </div>
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-[#26352A]">
            {language === 'hi' ? ad.titleHi : ad.titleEn}
          </h4>
          <p className="text-xs text-[#6B786D] mt-0.5 leading-relaxed">
            {language === 'hi' ? ad.descriptionHi : ad.descriptionEn}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <span className="text-[10px] text-[#8B6848] italic">
          {t.adDisclosure}
        </span>

        {ad.phoneContact ? (
          <a
            href={`tel:${ad.phoneContact}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EBF5EE] hover:bg-[#D8ECDD] text-[#2F6B3F] text-xs font-bold transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{ad.phoneContact}</span>
          </a>
        ) : (
          <a
            href={ad.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#2F6B3F] hover:bg-[#22512F] text-white text-xs font-bold transition-colors"
          >
            <span>{language === 'hi' ? ad.ctaTextHi : ad.ctaTextEn}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
};
