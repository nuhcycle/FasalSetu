import React, { useState } from 'react';
import { Language, SubscriptionTier, BillingCycle, UserSubscription } from '../../types';
import { SUBSCRIPTION_PLANS } from '../../data/subscriptionPlans';
import { subscriptionService, VerificationResult } from '../../services/subscriptionService';
import { getTranslation } from '../../services/i18n';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  Lock, 
  ArrowRight,
  Sparkles,
  HelpCircle,
  QrCode
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  tier: SubscriptionTier;
  cycle: BillingCycle;
  language: Language;
  onClose: () => void;
  onSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  tier,
  cycle,
  language,
  onClose,
  onSuccess,
}) => {
  if (!isOpen) return null;

  const t = getTranslation(language);
  const plan = SUBSCRIPTION_PLANS.find(p => p.id === tier) || SUBSCRIPTION_PLANS[1];
  const amount = cycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;

  const [paymentState, setPaymentState] = useState<'checkout' | 'verifying' | 'success' | 'failure'>('checkout');
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  const handleProcessPayment = async (simulateDecline: boolean = false) => {
    setPaymentState('verifying');
    try {
      const res = await subscriptionService.verifyPayment(tier, cycle, amount, simulateDecline);
      setVerificationResult(res);
      if (res.success) {
        setPaymentState('success');
      } else {
        setPaymentState('failure');
      }
    } catch {
      setPaymentState('failure');
      setVerificationResult({
        success: false,
        errorCode: 'NETWORK_TIMEOUT',
        errorMessage: 'Connection to payment gateway timed out. Please check internet connection.',
      });
    }
  };

  const handleFinishSuccess = () => {
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E1E9DC] overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#F3F8EF] px-6 py-5 border-b border-[#E1E9DC] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2F6B3F] text-white flex items-center justify-center">
              <Lock className="w-4 h-4 text-[#FFFDF5]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#26352A]">
                {t.checkoutTitle}
              </h3>
              <p className="text-[11px] text-[#6B786D]">
                256-bit Encrypted Checkout • RBI & UPI Compliant
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#6B786D] hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* STATE 1: CHECKOUT VIEW */}
          {paymentState === 'checkout' && (
            <div className="space-y-5">
              {/* Sandbox Test Banner */}
              <div className="p-3.5 rounded-2xl bg-[#FFFDF5] border border-[#E9B949]/40 text-xs text-[#8B6848] space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <span className="text-sm">🧪</span>
                  <span>{t.checkoutTestNotice}</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  {language === 'hi'
                    ? 'यह एक टेस्ट वातावरण है। आपके बैंक खाते या कार्ड से कोई वास्तविक राशि नहीं काटी जाएगी।'
                    : 'This prototype runs in test mode. No actual charges will be deducted from your bank or card.'}
                </p>
              </div>

              {/* Order Summary Table */}
              <div className="bg-[#F3F8EF] p-4 rounded-2xl border border-[#E1E9DC] space-y-2.5 text-xs">
                <span className="font-bold text-[#26352A] block uppercase tracking-wider text-[11px]">
                  {t.orderSummary}
                </span>

                <div className="flex items-center justify-between py-1 border-b border-[#E1E9DC]/60">
                  <span className="text-[#6B786D]">{t.planSelected}:</span>
                  <strong className="text-[#26352A]">{language === 'hi' ? plan.nameHi : plan.nameEn}</strong>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#E1E9DC]/60">
                  <span className="text-[#6B786D]">{t.billingCycle}:</span>
                  <span className="font-semibold text-[#26352A] capitalize">
                    {cycle === 'yearly' ? 'Annual (12 Months)' : 'Monthly (1 Month)'}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#E1E9DC]/60">
                  <span className="text-[#6B786D]">Agri Software Cess / GST:</span>
                  <span className="text-[#2F6B3F] font-semibold">₹0.00 (Exempt)</span>
                </div>

                <div className="flex items-baseline justify-between pt-1 text-sm font-extrabold text-[#2F6B3F]">
                  <span>{t.totalPayable}:</span>
                  <span className="text-2xl font-black">₹{amount}</span>
                </div>
              </div>

              {/* Payment Methods preview */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#26352A] block">Supported Payment Channels:</span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl border border-[#E1E9DC] bg-white font-medium text-[#26352A]">
                    <span className="text-lg block mb-0.5">📱</span>
                    <span>UPI / GPay / PhonePe</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-[#E1E9DC] bg-white font-medium text-[#26352A]">
                    <span className="text-lg block mb-0.5">💳</span>
                    <span>RuPay & Debit Cards</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-[#E1E9DC] bg-white font-medium text-[#26352A]">
                    <span className="text-lg block mb-0.5">🏦</span>
                    <span>Net Banking</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Simulate Success vs Simulate Bank Failure */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleProcessPayment(false)}
                  className="w-full py-3 rounded-2xl bg-[#2F6B3F] hover:bg-[#22512F] text-white font-bold text-xs shadow-md shadow-[#2F6B3F]/25 hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#E9B949]" />
                  <span>{t.testPaySuccessBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleProcessPayment(true)}
                  className="w-full py-2.5 rounded-2xl bg-white hover:bg-red-50 text-[#B93838] border border-red-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>{t.testPayFailureBtn}</span>
                </button>
              </div>
            </div>
          )}

          {/* STATE 2: VERIFYING BACKEND SIMULATION */}
          {paymentState === 'verifying' && (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 border-4 border-[#2F6B3F] border-t-transparent rounded-full animate-spin mx-auto" />
              <div>
                <h4 className="font-bold text-[#26352A] text-base">
                  Verifying Payment with Gateway...
                </h4>
                <p className="text-xs text-[#6B786D] mt-1 max-w-xs mx-auto">
                  Validating cryptographic transaction signature on backend. Please do not close or refresh this window.
                </p>
              </div>
            </div>
          )}

          {/* STATE 3: PAYMENT SUCCESS */}
          {paymentState === 'success' && (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 rounded-full bg-[#EBF5EE] text-[#2F6B3F] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div>
                <h4 className="text-lg font-black text-[#26352A]">
                  {t.paymentSuccessTitle}
                </h4>
                <p className="text-xs text-[#6B786D] mt-1">
                  {t.paymentSuccessMsg}
                </p>
              </div>

              <div className="bg-[#F3F8EF] p-4 rounded-2xl border border-[#E1E9DC] text-xs text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#6B786D]">{t.transactionIdLabel}:</span>
                  <span className="font-mono font-bold text-[#26352A]">
                    {verificationResult?.transactionId || 'pay_test_verified'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B786D]">Plan:</span>
                  <strong className="text-[#2F6B3F]">{language === 'hi' ? plan.nameHi : plan.nameEn}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B786D]">Status:</span>
                  <span className="font-bold text-[#2F6B3F] bg-white px-2 py-0.5 rounded border border-[#C4D7BC]">
                    Active & Verified
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinishSuccess}
                className="w-full py-3 rounded-2xl bg-[#2F6B3F] hover:bg-[#22512F] text-white font-bold text-xs shadow-md transition-all"
              >
                {language === 'hi' ? 'फसलसेतु का उपयोग शुरू करें' : 'Start Using FasalSetu Premium'}
              </button>
            </div>
          )}

          {/* STATE 4: PAYMENT FAILURE */}
          {paymentState === 'failure' && (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 rounded-full bg-red-50 text-[#B93838] flex items-center justify-center mx-auto">
                <AlertCircle className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div>
                <h4 className="text-lg font-black text-[#26352A]">
                  {t.paymentFailedTitle}
                </h4>
                <p className="text-xs text-[#6B786D] mt-1">
                  {verificationResult?.errorMessage || t.paymentFailedMsg}
                </p>
              </div>

              <div className="bg-red-50/60 p-3.5 rounded-2xl border border-red-200 text-xs text-left text-red-900 space-y-1">
                <p className="font-bold">Error Details: {verificationResult?.errorCode || 'BANK_DECLINED'}</p>
                <p className="text-[11px] text-[#6B786D]">
                  No money has been debited. You can safely try again or select another payment option.
                </p>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setPaymentState('checkout')}
                  className="w-full py-3 rounded-2xl bg-[#2F6B3F] text-white font-bold text-xs hover:bg-[#22512F] transition-all flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t.retryPayment}</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 rounded-2xl bg-white text-[#6B786D] font-semibold text-xs border border-[#E1E9DC] hover:text-[#26352A]"
                >
                  {t.close}
                </button>
              </div>
            </div>
          )}

          {/* Support Line */}
          <div className="pt-2 text-center text-[10px] text-[#6B786D] border-t border-[#E1E9DC]">
            {t.supportContact}
          </div>
        </div>
      </div>
    </div>
  );
};
