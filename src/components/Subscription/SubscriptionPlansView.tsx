import React, { useState } from 'react';
import { Language, SubscriptionTier, BillingCycle, UserSubscription } from '../../types';
import { SUBSCRIPTION_PLANS, PLAN_FEATURE_MATRIX } from '../../data/subscriptionPlans';
import { subscriptionService } from '../../services/subscriptionService';
import { getTranslation } from '../../services/i18n';
import { 
  Sparkles, 
  Check, 
  X, 
  ShieldCheck, 
  CreditCard, 
  Calendar, 
  RotateCcw, 
  AlertTriangle,
  Zap,
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

interface SubscriptionPlansViewProps {
  subscription: UserSubscription;
  language: Language;
  onOpenCheckout: (tier: SubscriptionTier, cycle: BillingCycle) => void;
  onSubscriptionUpdated: () => void;
}

export const SubscriptionPlansView: React.FC<SubscriptionPlansViewProps> = ({
  subscription,
  language,
  onOpenCheckout,
  onSubscriptionUpdated,
}) => {
  const t = getTranslation(language);
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle>(
    subscription.billingCycle || 'monthly'
  );
  const [showTestControls, setShowTestControls] = useState(false);

  const handleCancelAutoRenewal = () => {
    subscriptionService.cancelAutoRenewal();
    onSubscriptionUpdated();
  };

  const handleReactivateRenewal = () => {
    subscriptionService.reactivateAutoRenewal();
    onSubscriptionUpdated();
  };

  const handleDowngradeToFree = () => {
    subscriptionService.downgradeToFree();
    onSubscriptionUpdated();
  };

  const handleTestState = (state: 'free' | 'limit_exhausted' | 'plus_active' | 'fpo_active' | 'expired') => {
    subscriptionService.setMockState(state);
    onSubscriptionUpdated();
  };

  return (
    <div className="space-y-6">
      {/* 1. Current Subscription Status Header Card */}
      <div className="bg-white p-6 rounded-3xl border border-[#E1E9DC] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E1E9DC]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-[#EBF5EE] text-[#2F6B3F]">
                <CreditCard className="w-4 h-4" />
              </span>
              <h1 className="text-xl font-bold text-[#26352A]">{t.navPlans}</h1>
            </div>
            <p className="text-xs text-[#6B786D]">{t.subModalSubtitle}</p>
          </div>

          {/* Current Status Pill */}
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 ${
              subscription.plan === 'free'
                ? 'bg-[#F3F8EF] text-[#26352A] border border-[#E1E9DC]'
                : subscription.status === 'expired'
                ? 'bg-red-50 text-[#B93838] border border-red-200'
                : 'bg-[#EBF5EE] text-[#2F6B3F] border border-[#79A95A]'
            }`}>
              {subscription.plan === 'plus' && <Sparkles className="w-3.5 h-3.5 text-[#E9B949]" />}
              <span>
                {subscription.plan === 'free'
                  ? t.planBadgeFree
                  : subscription.plan === 'plus'
                  ? t.planBadgePlus
                  : t.planBadgeFpo}
              </span>
              <span className="text-[10px] uppercase font-bold text-[#6B786D]">
                ({subscription.status})
              </span>
            </span>
          </div>
        </div>

        {/* Plan Details & Management Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#F3F8EF] border border-[#E1E9DC]">
            <span className="text-[#6B786D] block mb-0.5">{t.dailyLimitNotice}</span>
            <strong className="text-base text-[#2F6B3F]">
              {subscription.plan === 'free'
                ? `${subscription.dailyComparisonsUsed} / 5 used today`
                : 'Unlimited Calculations'}
            </strong>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F3F8EF] border border-[#E1E9DC]">
            <span className="text-[#6B786D] block mb-0.5">{t.renewalDateLabel}</span>
            <strong className="text-sm text-[#26352A]">
              {subscription.renewalDate
                ? new Date(subscription.renewalDate).toLocaleDateString()
                : 'No recurring charge (Free Plan)'}
            </strong>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F3F8EF] border border-[#E1E9DC] flex flex-col justify-center">
            {subscription.plan !== 'free' ? (
              subscription.cancelAtPeriodEnd ? (
                <div className="flex items-center justify-between">
                  <span className="text-[#B93838] font-bold text-[11px]">Auto-renewal off</span>
                  <button
                    onClick={handleReactivateRenewal}
                    className="text-xs font-bold text-[#2F6B3F] hover:underline"
                  >
                    Reactivate
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-[#2F6B3F] font-bold text-[11px]">Auto-renewal on</span>
                  <button
                    onClick={handleCancelAutoRenewal}
                    className="text-xs font-semibold text-[#B93838] hover:underline"
                  >
                    Cancel Auto-Renewal
                  </button>
                </div>
              )
            ) : (
              <span className="text-[#6B786D] text-[11px]">
                Always free with standard community limits.
              </span>
            )}
          </div>
        </div>

        {/* Notification when quota exhausted */}
        {subscription.plan === 'free' && subscription.dailyComparisonsUsed >= 5 && (
          <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">{t.dailyLimitExceeded}</p>
              <button
                onClick={() => onOpenCheckout('plus', selectedCycle)}
                className="mt-1 text-xs font-bold text-[#2F6B3F] underline"
              >
                {t.upgradeToPlus} (₹29/mo) →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. Billing Cycle Switcher */}
      <div className="flex justify-center">
        <div className="bg-white p-1 rounded-2xl border border-[#E1E9DC] shadow-xs flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSelectedCycle('monthly')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
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
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedCycle === 'yearly'
                ? 'bg-[#2F6B3F] text-white shadow-xs'
                : 'text-[#6B786D] hover:text-[#26352A]'
            }`}
          >
            <span>{t.billingYearly}</span>
            <span className="text-[10px] bg-[#E9B949] text-[#26352A] px-1.5 py-0.2 rounded font-black">
              SAVE 14%
            </span>
          </button>
        </div>
      </div>

      {/* 3. Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SUBSCRIPTION_PLANS.map(plan => {
          const isCurrentPlan = subscription.plan === plan.id;
          const price = selectedCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;

          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl bg-white border-2 p-6 shadow-xs flex flex-col justify-between transition-all ${
                plan.isPopular
                  ? 'border-[#2F6B3F] ring-2 ring-[#79A95A]/20'
                  : 'border-[#E1E9DC]'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-wider bg-[#E9B949] text-[#26352A] px-3 py-0.5 rounded-full shadow-xs">
                  {plan.badge}
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#26352A]">
                    {language === 'hi' ? plan.nameHi : plan.nameEn}
                  </h3>
                  <p className="text-xs text-[#6B786D] mt-0.5 min-h-[32px]">
                    {language === 'hi' ? plan.taglineHi : plan.taglineEn}
                  </p>
                </div>

                <div className="py-3 border-y border-[#E1E9DC]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#2F6B3F]">
                      ₹{price}
                    </span>
                    <span className="text-xs text-[#6B786D]">
                      {plan.id === 'free' ? '' : selectedCycle === 'yearly' ? '/year' : '/month'}
                    </span>
                  </div>
                  {plan.id === 'plus' && selectedCycle === 'yearly' && (
                    <span className="text-[11px] font-bold text-[#8B6848] block mt-0.5">
                      Equivalent to ₹25 / month
                    </span>
                  )}
                </div>

                {/* Key Plan Bullet Points */}
                <ul className="space-y-2.5 text-xs text-[#26352A]">
                  {plan.id === 'free' && (
                    <>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#2F6B3F] shrink-0" />
                        <span>5 daily mandi comparisons</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#2F6B3F] shrink-0" />
                        <span>Estimated net earnings calculation</span>
                      </li>
                      <li className="flex items-center gap-2 text-[#6B786D]">
                        <span className="text-xs">📢</span>
                        <span>Clearly labelled partner ads</span>
                      </li>
                    </>
                  )}

                  {plan.id === 'plus' && (
                    <>
                      <li className="flex items-center gap-2 font-bold text-[#2F6B3F]">
                        <Check className="w-4 h-4 text-[#2F6B3F] shrink-0" />
                        <span>Unlimited daily comparisons</span>
                      </li>
                      <li className="flex items-center gap-2 font-bold text-[#2F6B3F]">
                        <Sparkles className="w-4 h-4 text-[#E9B949] shrink-0" />
                        <span>100% Ad-Free Experience</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#2F6B3F] shrink-0" />
                        <span>30-day price trends & AI advisory</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#2F6B3F] shrink-0" />
                        <span>Unlimited saved mandis watchlist</span>
                      </li>
                    </>
                  )}

                  {plan.id === 'fpo' && (
                    <>
                      <li className="flex items-center gap-2 font-bold text-[#2F6B3F]">
                        <Check className="w-4 h-4 text-[#2F6B3F] shrink-0" />
                        <span>All Kisan Plus features</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#2F6B3F] shrink-0" />
                        <span>Bulk commodity comparisons</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#2F6B3F] shrink-0" />
                        <span>CSV & PDF comparison reports</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#2F6B3F] shrink-0" />
                        <span>Dedicated agronomist WhatsApp support</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                {isCurrentPlan ? (
                  <button
                    disabled
                    className="w-full py-3 rounded-2xl bg-[#F3F8EF] text-[#2F6B3F] font-bold text-xs border border-[#C4D7BC] cursor-default"
                  >
                    ✓ {t.currentPlan}
                  </button>
                ) : plan.id === 'free' ? (
                  <button
                    onClick={handleDowngradeToFree}
                    className="w-full py-3 rounded-2xl bg-white hover:bg-[#F3F8EF] text-[#6B786D] font-bold text-xs border border-[#E1E9DC] transition-colors"
                  >
                    Switch to Free Plan
                  </button>
                ) : (
                  <button
                    onClick={() => onOpenCheckout(plan.id, selectedCycle)}
                    className="w-full py-3 rounded-2xl bg-[#2F6B3F] hover:bg-[#22512F] text-white font-bold text-xs shadow-md shadow-[#2F6B3F]/25 hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <span>{plan.id === 'plus' ? t.upgradeToPlus : t.upgradeToFpo}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Detailed Feature Matrix Table */}
      <div className="bg-white rounded-3xl border border-[#E1E9DC] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#E1E9DC] bg-[#F3F8EF]">
          <h3 className="font-bold text-sm text-[#26352A]">
            {t.comparisonMatrixTitle}
          </h3>
          <p className="text-xs text-[#6B786D]">
            Transparent feature comparison across tiers for Indian agricultural use cases.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F3F8EF]/60 border-b border-[#E1E9DC] text-[#26352A] font-bold">
              <tr>
                <th className="p-3.5">Feature</th>
                <th className="p-3.5 text-center">Free Kisan</th>
                <th className="p-3.5 text-center text-[#2F6B3F]">Kisan Plus</th>
                <th className="p-3.5 text-center">FPO / Group</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E9DC]">
              {PLAN_FEATURE_MATRIX.map(item => (
                <tr key={item.id} className="hover:bg-[#F3F8EF]/40 transition-colors">
                  <td className="p-3.5 font-medium text-[#26352A]">
                    {language === 'hi' ? item.titleHi : item.titleEn}
                  </td>
                  <td className="p-3.5 text-center text-[#6B786D]">
                    {typeof item.free === 'boolean' ? (
                      item.free ? <Check className="w-4 h-4 text-[#2F6B3F] mx-auto" /> : <X className="w-4 h-4 text-[#B93838] mx-auto" />
                    ) : (
                      item.free
                    )}
                  </td>
                  <td className="p-3.5 text-center font-bold text-[#2F6B3F]">
                    {typeof item.plus === 'boolean' ? (
                      item.plus ? <Check className="w-4 h-4 text-[#2F6B3F] mx-auto stroke-[2.5]" /> : <X className="w-4 h-4 text-[#B93838] mx-auto" />
                    ) : (
                      item.plus
                    )}
                  </td>
                  <td className="p-3.5 text-center font-semibold text-[#26352A]">
                    {typeof item.fpo === 'boolean' ? (
                      item.fpo ? <Check className="w-4 h-4 text-[#2F6B3F] mx-auto stroke-[2.5]" /> : <X className="w-4 h-4 text-[#B93838] mx-auto" />
                    ) : (
                      item.fpo
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. QA & Test Mode Controls Panel for Hackathon Demo */}
      <div className="bg-[#FFFDF5] p-5 rounded-3xl border border-[#E9B949]/40 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">🧪</span>
            <span className="font-bold text-xs text-[#8B6848] uppercase tracking-wider">
              Hackathon Evaluation & State Testing Controls
            </span>
          </div>
          <button
            onClick={() => setShowTestControls(!showTestControls)}
            className="text-xs text-[#2F6B3F] font-bold underline"
          >
            {showTestControls ? 'Hide Controls' : 'Show Test Triggers'}
          </button>
        </div>
        <p className="text-xs text-[#6B786D]">
          Instantly simulate free tier limits, active plus subscription, FPO plan, and expired state to verify UI and access enforcement.
        </p>

        {showTestControls && (
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => handleTestState('free')}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#E1E9DC] text-xs font-semibold text-[#26352A] hover:bg-[#F3F8EF]"
            >
              1. Free Tier (1/5 used)
            </button>
            <button
              onClick={() => handleTestState('limit_exhausted')}
              className="px-3 py-1.5 rounded-xl bg-amber-100 border border-amber-300 text-xs font-semibold text-amber-900 hover:bg-amber-200"
            >
              2. Quota Exhausted (5/5 used)
            </button>
            <button
              onClick={() => handleTestState('plus_active')}
              className="px-3 py-1.5 rounded-xl bg-emerald-100 border border-emerald-300 text-xs font-semibold text-emerald-900 hover:bg-emerald-200"
            >
              3. Kisan Plus Active (Ad-free)
            </button>
            <button
              onClick={() => handleTestState('fpo_active')}
              className="px-3 py-1.5 rounded-xl bg-blue-100 border border-blue-300 text-xs font-semibold text-blue-900 hover:bg-blue-200"
            >
              4. FPO Group Active
            </button>
            <button
              onClick={() => handleTestState('expired')}
              className="px-3 py-1.5 rounded-xl bg-red-100 border border-red-300 text-xs font-semibold text-red-900 hover:bg-red-200"
            >
              5. Expired Subscription
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
