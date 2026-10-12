import React, { useState } from 'react';
import { Language } from '../../types';
import { getTranslation } from '../../services/i18n';
import { 
  HelpCircle, 
  BookOpen, 
  Scale, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Info,
  ShieldCheck,
  Coins
} from 'lucide-react';

interface HelpFeedbackModalProps {
  language: Language;
}

export const HelpFeedbackModal: React.FC<HelpFeedbackModalProps> = ({ language }) => {
  const t = getTranslation(language);
  const [feedbackCategory, setFeedbackCategory] = useState('data_feedback');
  const [feedbackText, setFeedbackText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setSubmitted(true);
    setFeedbackText('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  const mspData = [
    { crop: 'Wheat (गेहूँ)', msp: '₹ 2,275', note: 'Procurement via FCI & State agencies' },
    { crop: 'Paddy Common (धान)', msp: '₹ 2,300', note: 'A Grade: ₹2,320/q' },
    { crop: 'Soybean Yellow (सोयाबीन)', msp: '₹ 4,892', note: 'Yellow grade oilseed' },
    { crop: 'Cotton Medium Staple (कपास)', msp: '₹ 7,121', note: 'Long Staple: ₹7,521/q' },
    { crop: 'Mustard / Rapeseed (सरसों)', msp: '₹ 5,650', note: '42% oil baseline' },
    { crop: 'Gram / Chana (चना)', msp: '₹ 5,440', note: 'NAFED procurement link' },
    { crop: 'Maize (मक्का)', msp: '₹ 2,090', note: 'Feed & starch industry' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E1E9DC] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF5EE] text-[#2F6B3F] flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#26352A]">
              {language === 'hi' ? 'मंडी ज्ञानकोश एवं किसान सहायता' : 'Mandi Knowledge Base & Farmer Advisory'}
            </h1>
            <p className="text-xs text-[#6B786D]">
              {language === 'hi'
                ? 'सरकारी समर्थन मूल्य (MSP), तौल अधिकार और मंडी में सही हिसाब की सम्पूर्ण जानकारी'
                : 'Government MSP references, weighbridge rights, and selling cost calculation guidelines'}
            </p>
          </div>
        </div>
      </div>

      {/* Grid: MSP Table & Rights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* MSP Reference Table */}
        <div className="bg-white p-6 rounded-3xl border border-[#E1E9DC] shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-[#E9B949]" />
            <h2 className="text-base font-bold text-[#26352A]">
              {language === 'hi' ? 'सरकारी न्यूनतम समर्थन मूल्य (MSP)' : 'Government MSP Reference (2026)'}
            </h2>
          </div>
          <p className="text-xs text-[#6B786D]">
            {language === 'hi'
              ? 'यदि आपकी निकटतम मंडी में खुली बोली MSP से कम हो, तो सरकारी खरीद केंद्र या e-NAM पर संपर्क करें।'
              : 'Benchmark rates established by Govt of India. Spot mandi auctions should ideally exceed these.'}
          </p>

          <div className="overflow-hidden rounded-2xl border border-[#E1E9DC]">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F3F8EF] font-bold text-[#26352A]">
                <tr>
                  <th className="p-2.5">Crop</th>
                  <th className="p-2.5">MSP Rate</th>
                  <th className="p-2.5">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E1E9DC]">
                {mspData.map((item, i) => (
                  <tr key={i} className="hover:bg-[#F3F8EF]/40">
                    <td className="p-2.5 font-bold text-[#26352A]">{item.crop}</td>
                    <td className="p-2.5 font-extrabold text-[#2F6B3F]">{item.msp}</td>
                    <td className="p-2.5 text-[11px] text-[#6B786D]">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Farmer Rights & Mandi Best Practices */}
        <div className="bg-white p-6 rounded-3xl border border-[#E1E9DC] shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2F6B3F]" />
            <h2 className="text-base font-bold text-[#26352A]">
              {language === 'hi' ? 'मंडी में किसान के 4 मुख्य अधिकार' : '4 Essential Farmer Rights in Mandis'}
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-2xl bg-[#F3F8EF] border border-[#E1E9DC]">
              <strong className="text-[#2F6B3F] block mb-1">
                1. {language === 'hi' ? 'कंप्यूटरीकृत तौल पर्ची (Digital Weighing)' : 'Computerized Weight Slip'}
              </strong>
              <p className="text-[#6B786D]">
                {language === 'hi'
                  ? 'इलेक्ट्रॉनिक धर्मकांटे पर तौल करवाएं और मुहर लगी पर्ची (J-Form / वजन पर्ची) तुरंत प्राप्त करें।'
                  : 'Always insist on verified electronic weighbridge weighing with a stamped slip before unloading.'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-[#F3F8EF] border border-[#E1E9DC]">
              <strong className="text-[#2F6B3F] block mb-1">
                2. {language === 'hi' ? 'उसी दिन भुगतान अधिकार (Same Day Payment)' : 'Prompt Payment Rights'}
              </strong>
              <p className="text-[#6B786D]">
                {language === 'hi'
                  ? 'APMC नियमों के तहत आढ़ती/खरीदार को बिक्री के उसी दिन अथवा 24 घंटे के अंदर DBT बैंक ट्रांसफर या चेक देना अनिवार्य है।'
                  : 'Under APMC bylaws, commission agents are obligated to settle payments within 24 hours via DBT or cheque.'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-[#F3F8EF] border border-[#E1E9DC]">
              <strong className="text-[#2F6B3F] block mb-1">
                3. {language === 'hi' ? 'अवैध कटौती की मनाही' : 'No Unauthorized Deductions'}
              </strong>
              <p className="text-[#6B786D]">
                {language === 'hi'
                  ? 'सफाई या नमूने (नमूना कट) के नाम पर मनमानी फसल नहीं काटी जा सकती। केवल अधिकृत हम्माली ही देय है।'
                  : 'Traders cannot arbitrarily deduct extra sample weight. Only scheduled loading rates apply.'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-[#F3F8EF] border border-[#E1E9DC]">
              <strong className="text-[#2F6B3F] block mb-1">
                4. {language === 'hi' ? 'बोली अस्वीकार करने की स्वतंत्रता' : 'Right to Refuse Low Bid'}
              </strong>
              <p className="text-[#6B786D]">
                {language === 'hi'
                  ? 'यदि खुली नीलामी में आपको भाव पसंद न आए, तो आप अपनी फसल बेचने से मना कर सकते हैं।'
                  : 'If the auction bid does not meet your expectation, you are free to withdraw your lot without penalty.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Feedback Form */}
      <div className="bg-white p-6 rounded-3xl border border-[#E1E9DC] shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#2F6B3F]" />
          <h2 className="text-base font-bold text-[#26352A]">
            {language === 'hi' ? 'किसान सुझाव एवं मंडी रिपोर्ट' : 'Farmer Feedback & Mandi Report'}
          </h2>
        </div>
        <p className="text-xs text-[#6B786D]">
          {language === 'hi'
            ? 'क्या आपकी स्थानीय मंडी में भाव अलग चल रहा है या कोई नई मंडी जोड़नी है? हमें तुरंत बताएं।'
            : 'Notice price deviations at your local APMC, or want a new mandi added? Share your feedback with the FasalSetu team.'}
        </p>

        {submitted ? (
          <div className="p-4 rounded-2xl bg-[#EBF5EE] border border-[#C4D7BC] text-xs font-bold text-[#2F6B3F] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>
              {language === 'hi'
                ? 'धन्यवाद किसान भाई! आपका सुझाव दर्ज कर लिया गया है।'
                : 'Thank you! Your feedback has been received and will improve FasalSetu data models.'}
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#26352A] block mb-1">Category</label>
                <select
                  value={feedbackCategory}
                  onChange={e => setFeedbackCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E1E9DC] bg-[#F3F8EF]/40 text-xs font-medium text-[#26352A]"
                >
                  <option value="data_feedback">Report Mandi Price Discrepancy</option>
                  <option value="new_mandi">Request New Mandi Addition</option>
                  <option value="transport_rates">Transport Rates Suggestion</option>
                  <option value="app_feedback">General App Experience</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#26352A] block mb-1">Your Contact / Phone (Optional)</label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 rounded-xl border border-[#E1E9DC] bg-[#F3F8EF]/40 text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#26352A] block mb-1">Your Note or Report</label>
              <textarea
                rows={3}
                value={feedbackText}
                onChange={e => setFeedbackText(e.target.value)}
                placeholder="e.g. Lasalgaon today had high onion arrivals and rates opened at ₹2,500/q for top grade..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E9DC] bg-[#F3F8EF]/40 text-xs font-medium focus:outline-none focus:border-[#2F6B3F]"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2F6B3F] hover:bg-[#22512F] text-white font-bold text-xs shadow-xs transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'सुझाव भेजें' : 'Submit Feedback'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
