import React, { useState } from 'react';
import { Language, SubscriptionTier, BillingCycle, UserSubscription } from '../../types';
import { SUBSCRIPTION_PLANS, PLAN_FEATURE_MATRIX } from '../../data/subscriptionPlans';
import { getTranslation } from '../../services/i18n';
import { 
  Sprout, 
  Check, 
  Sparkles, 
  Globe2, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Zap,
  HelpCircle
} from 'lucide-react';

interface SubscriptionOnboardingModalProps {
  isOpen: boolean;
  onSelectPlan: (tier: SubscriptionTier, cycle: BillingCycle) => void;
  onContinueFree: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const SubscriptionOnboardingModal: React.FC<SubscriptionOnboardingModalProps> = ({
  isOpen,
  onSelectPlan,
  onContinueFree,
  language,
  onLanguageChange,
}) => {
  if (!isOpen) return null;

  const t = getTranslation(language);
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle>('monthly');
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>('free');

  const toggleLanguage = () => {
    onLanguageChange(language === 'en' ? 'hi' : 'en');
  };

  const handleProceed = () => {
    if (selectedTier === 'free') {
      onContinueFree();
    } else {
      onSelectPlan(selectedTier, selectedCycle);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E1E9DC] overflow-hidden my-6">
        {/* Top Header */}
        <div className="bg-[#F3F8EF] px-5 sm:px-8 py-5 border-b border-[#E1E9DC] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2F6B3F] text-white flex items-center justify-center shadow-xs">
              <Sprout className="w-5 h-5 text-[#FFFDF5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[#2F6B3F] text-lg">FasalSetu</span>
                <span className="text-[10px] font-bold bg-[#EBF5EE] text-[#2F6B3F] px-2 py-0.5 rounded-full border border-[#C4D7BC]">
                  {language === 'hi' ? 'स्वागत है' : 'Welcome'}
                </span>
              </div>
              <p className="text-xs text-[#6B786D]">{t.tagline}</p>
            </div>
          </div>

          {/* Language Switcher in Header */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-[#2F6B3F] border border-[#E1E9DC] hover:bg-[#EBF5EE] transition-colors"
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>{t.changeLanguage}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Welcome Text */}
          <div className="text-center max-w-xl mx-auto space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-black text-[#26352A]">
              {t.subModalTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#6B786D]">
              {t.subModalSubtitle}
            </p>
          </div>

          {/* Billing Cycle Toggle */}
          <div className="flex justify-center">
            <div className="bg-[#F3F8EF] p-1 rounded-2xl border border-[#E1E9DC] flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSelectedCycle('monthly')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCycle === 'monthly'
                    ? 'bg-[#2F6B3F] text-white shadow-xs'
                    : 'text-[#6B786D] hover:text-[#26352A]'
                }`}
              >
                {t.billingMonthly}
              </button>
              <button
                type="button"
                onClick={() => setSelectedCycle('yearly')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedCycle === 'yearly'
                    ? 'bg-[#2F6B3F] text-white shadow-xs'
                    : 'text-[#6B786D] hover:text-[#26352A]'
                }`}
              >
                <span>{t.billingYearly}</span>
                <span className="text-[10px] bg-[#E9B949] text-[#26352A] px-1.5 py-0.2 rounded-md font-extrabold">
                  -14%
                </span>
              </button>
            </div>
          </div>

          {/* 3 Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SUBSCRIPTION_PLANS.map(plan => {
              const isSelected = selectedTier === plan.id;
              const price = selectedCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;

              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedTier(plan.id)}
                  className={`relative cursor-pointer rounded-3xl p-5 border-2 transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#2F6B3F] bg-white ring-4 ring-[#79A95A]/20 shadow-md'
                      : 'border-[#E1E9DC] bg-[#F3F8EF]/40 hover:bg-white hover:border-[#79A95A]'
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-wider bg-[#E9B949] text-[#26352A] px-2.5 py-0.5 rounded-full shadow-xs">
                      {plan.badge}
                    </span>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base text-[#26352A]">
                        {language === 'hi' ? plan.nameHi : plan.nameEn}
                      </h3>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-[#2F6B3F] bg-[#2F6B3F] text-white' : 'border-[#C4D7BC]'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>

                    <p className="text-xs text-[#6B786D] min-h-[32px]">
                      {language === 'hi' ? plan.taglineHi : plan.taglineEn}
                    </p>

                    {/* Price Header */}
                    <div className="py-2 border-y border-[#E1E9DC]">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-[#2F6B3F]">
                          ₹{price}
                        </span>
                        <span className="text-xs text-[#6B786D]">
                          {plan.id === 'free' ? '' : selectedCycle === 'yearly' ? '/year' : '/month'}
                        </span>
                      </div>
                      {plan.id === 'plus' && selectedCycle === 'yearly' && (
                        <p className="text-[10px] text-[#8B6848] font-bold mt-0.5">
                          Only ₹25/month billed annually
                        </p>
                      )}
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2 text-xs text-[#26352A]">
                      {plan.id === 'free' && (
                        <>
                          <li className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-[#2F6B3F] shrink-0" />
                            <span>5 mandi comparisons per day</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-[#2F6B3F] shrink-0" />
                            <span>Estimated net earnings calculation</span>
                          </li>
                          <li className="flex items-center gap-2 text-[#6B786D]">
                            <span className="text-xs">📢</span>
                            <span>Labelled partner ads displayed</span>
                          </li>
                        </>
                      )}

                      {plan.id === 'plus' && (
                        <>
                          <li className="flex items-center gap-2 font-semibold">
                            <Check className="w-3.5 h-3.5 text-[#2F6B3F] shrink-0" />
                            <span>Unlimited daily comparisons</span>
                          </li>
                          <li className="flex items-center gap-2 font-semibold text-[#2F6B3F]">
                            <Sparkles className="w-3.5 h-3.5 text-[#E9B949] shrink-0" />
                            <span>100% Ad-free experience</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-[#2F6B3F] shrink-0" />
                            <span>30-day price trends & advisories</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-[#2F6B3F] shrink-0" />
                            <span>Unlimited saved mandis</span>
                          </li>
                        </>
                      )}

                      {plan.id === 'fpo' && (
                        <>
                          <li className="flex items-center gap-2 font-semibold">
                            <Check className="w-3.5 h-3.5 text-[#2F6B3F] shrink-0" />
                            <span>All Kisan Plus features</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-[#2F6B3F] shrink-0" />
                            <span>Bulk commodity comparisons</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-[#2F6B3F] shrink-0" />
                            <span>Export reports to CSV & PDF</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-[#2F6B3F] shrink-0" />
                            <span>Dedicated WhatsApp agronomist support</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div className="pt-4 mt-2">
                    <button
                      type="button"
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-[#2F6B3F] text-white shadow-xs'
                          : 'bg-white text-[#26352A] border border-[#E1E9DC]'
                      }`}
                    >
                      {plan.id === 'free'
                        ? t.continueFree
                        : `${language === 'hi' ? 'चुनें' : 'Select'} ${language === 'hi' ? plan.nameHi.split(' ')[0] : plan.nameEn}`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Privacy & No Forced Payment Guarantee */}
          <div className="bg-[#FFFDF5] p-3.5 rounded-2xl border border-[#E9B949]/30 text-xs text-[#8B6848] flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#2F6B3F] shrink-0" />
            <p className="leading-relaxed">
              <strong>{language === 'hi' ? 'किसान-प्रथम नीति' : 'Farmer-First Transparency'}:</strong>{' '}
              {language === 'hi'
                ? 'मूल सुविधाएं उपयोग करने के लिए कभी भी भुगतान अनिवार्य नहीं है। आप किसी भी समय फ्री प्लान का आनंद ले सकते हैं।'
                : 'Payment is never forced before accessing essential mandi comparison features. You can freely proceed with Free Kisan.'}
            </p>
          </div>
        </div>

        {/* Footer with Clear "Continue with Free Plan" Option */}
        <div className="bg-[#F3F8EF] px-5 sm:px-8 py-4 border-t border-[#E1E9DC] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onContinueFree}
            className="text-xs font-bold text-[#6B786D] hover:text-[#26352A] transition-colors order-2 sm:order-1"
          >
            ← {t.continueFree}
          </button>

          <button
            type="button"
            onClick={handleProceed}
            className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-[#2F6B3F] hover:bg-[#22512F] text-white font-bold text-xs shadow-md shadow-[#2F6B3F]/25 hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 order-1 sm:order-2"
          >
            <span>
              {selectedTier === 'free'
                ? t.continueFree
                : `${language === 'hi' ? 'आगे बढ़ें' : 'Proceed with'} ${selectedTier === 'plus' ? 'Kisan Plus' : 'FPO Plan'}`}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
