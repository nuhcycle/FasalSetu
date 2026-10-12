import React, { useState } from 'react';
import { FarmerProfile, Language, WeightUnit, UserSubscription } from '../../types';
import { STATES_AND_DISTRICTS } from '../../data/locations';
import { CROPS } from '../../data/crops';
import { VEHICLE_OPTIONS } from '../../data/vehicles';
import { getTranslation } from '../../services/i18n';
import { 
  User, 
  MapPin, 
  Sprout, 
  Truck, 
  Save, 
  CheckCircle2, 
  ShieldCheck,
  Tractor,
  CreditCard,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface MyFarmViewProps {
  profile: FarmerProfile;
  onSaveProfile: (profile: FarmerProfile) => void;
  language: Language;
  subscription: UserSubscription;
  onOpenPlans: () => void;
}

export const MyFarmView: React.FC<MyFarmViewProps> = ({
  profile,
  onSaveProfile,
  language,
  subscription,
  onOpenPlans,
}) => {
  const t = getTranslation(language);
  const [formData, setFormData] = useState<FarmerProfile>({ ...profile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const selectedStateObj = STATES_AND_DISTRICTS.find(s => s.id === formData.state) || STATES_AND_DISTRICTS[0];
  const districts = selectedStateObj.districts;

  const handleStateChange = (stateId: string) => {
    const newState = STATES_AND_DISTRICTS.find(s => s.id === stateId) || STATES_AND_DISTRICTS[0];
    const defaultDistrict = newState.districts[0]?.id || 'general';
    setFormData({
      ...formData,
      state: stateId,
      district: defaultDistrict,
    });
  };

  const handleToggleCrop = (cropId: string) => {
    const list = formData.primaryCrops || [];
    if (list.includes(cropId)) {
      setFormData({ ...formData, primaryCrops: list.filter(id => id !== cropId) });
    } else {
      setFormData({ ...formData, primaryCrops: [...list, cropId] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E1E9DC] shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF5EE] text-[#2F6B3F] flex items-center justify-center">
            <Tractor className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#26352A]">{t.myFarmTitle}</h1>
            <p className="text-xs text-[#6B786D]">{t.myFarmSubtitle}</p>
          </div>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EBF5EE] text-[#2F6B3F] text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>{t.profileSavedSuccess}</span>
          </div>
        )}
      </div>

      {/* Subscription Card in Profile */}
      <div className="bg-gradient-to-r from-white via-[#FFFDF5] to-[#F3F8EF] p-5 rounded-3xl border border-[#E9B949]/50 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#EBF5EE] text-[#2F6B3F] flex items-center justify-center text-xl shrink-0">
            {subscription.plan === 'plus' ? '⭐' : subscription.plan === 'fpo' ? '🏢' : '🌾'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#26352A]">
                {subscription.plan === 'free'
                  ? t.planBadgeFree
                  : subscription.plan === 'plus'
                  ? t.planBadgePlus
                  : t.planBadgeFpo}
              </span>
              <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-[#E1E9DC] font-semibold text-[#6B786D] uppercase">
                {subscription.status}
              </span>
            </div>
            <p className="text-xs text-[#6B786D] mt-0.5">
              {subscription.plan === 'free'
                ? `${subscription.dailyComparisonsUsed} / 5 comparisons used today`
                : `Renews: ${subscription.renewalDate ? new Date(subscription.renewalDate).toLocaleDateString() : 'Active'}`}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenPlans}
          className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#2F6B3F] hover:bg-[#22512F] text-white text-xs font-bold shadow-xs transition-colors whitespace-nowrap"
        >
          <span>{subscription.plan === 'free' ? t.upgradeToPlus : t.managePlanBtn}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl border border-[#E1E9DC] shadow-xs space-y-6">
        {/* Name and Basic Info */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-[#26352A] flex items-center gap-2 pb-2 border-b border-[#E1E9DC]">
            <User className="w-4 h-4 text-[#79A95A]" />
            <span>{language === 'hi' ? '1. व्यक्तिगत / संगठन जानकारी' : '1. Personal or Group Information'}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#26352A] block mb-1">
                {t.farmerName} (Optional)
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ramesh Patil / Krishi Vikas FPO"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E9DC] bg-[#F3F8EF]/40 text-sm font-medium focus:outline-none focus:border-[#2F6B3F]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#26352A] block mb-1">
                Preferred Language / भाषा
              </label>
              <select
                value={formData.preferredLanguage}
                onChange={e => setFormData({ ...formData, preferredLanguage: e.target.value as Language })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E9DC] bg-[#F3F8EF]/40 text-sm font-medium focus:outline-none focus:border-[#2F6B3F]"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location Preferences */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-[#26352A] flex items-center gap-2 pb-2 border-b border-[#E1E9DC]">
            <MapPin className="w-4 h-4 text-[#79A95A]" />
            <span>{language === 'hi' ? '2. गाँव एवं जिला (स्थान)' : '2. Village & District Location'}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#26352A] block mb-1">{t.selectState}</label>
              <select
                value={formData.state}
                onChange={e => handleStateChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E9DC] bg-[#F3F8EF]/40 text-sm font-medium focus:outline-none focus:border-[#2F6B3F]"
              >
                {STATES_AND_DISTRICTS.map(s => (
                  <option key={s.id} value={s.id}>
                    {language === 'hi' ? s.nameHi : s.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#26352A] block mb-1">{t.selectDistrict}</label>
              <select
                value={formData.district}
                onChange={e => handleStateChange(formData.state)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E9DC] bg-[#F3F8EF]/40 text-sm font-medium focus:outline-none focus:border-[#2F6B3F]"
              >
                {districts.map(d => (
                  <option key={d.id} value={d.id}>
                    {language === 'hi' ? d.nameHi : d.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#26352A] block mb-1">{t.villageName}</label>
              <input
                type="text"
                value={formData.village || ''}
                onChange={e => setFormData({ ...formData, village: e.target.value })}
                placeholder="e.g. Niphad / Nimgaon"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E9DC] bg-[#F3F8EF]/40 text-sm font-medium focus:outline-none focus:border-[#2F6B3F]"
              />
            </div>
          </div>
          <p className="text-[11px] text-[#6B786D]">
            ℹ️ FasalSetu never demands precise GPS location; manual district selection works seamlessly for all transport estimates.
          </p>
        </div>

        {/* Crops Grown */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-[#26352A] flex items-center gap-2 pb-2 border-b border-[#E1E9DC]">
            <Sprout className="w-4 h-4 text-[#79A95A]" />
            <span>{language === 'hi' ? '3. मुख्य फसलें' : '3. Main Crops Grown'}</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CROPS.map(c => {
              const isChecked = (formData.primaryCrops || []).includes(c.id);
              return (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => handleToggleCrop(c.id)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center gap-2 ${
                    isChecked
                      ? 'bg-[#EBF5EE] border-[#2F6B3F] text-[#2F6B3F] font-bold'
                      : 'bg-white border-[#E1E9DC] text-[#6B786D] hover:bg-[#F3F8EF]'
                  }`}
                >
                  <span className="text-lg">{c.icon}</span>
                  <span className="truncate">{language === 'hi' ? c.nameHi.split(' ')[0] : c.nameEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Transport & Harvest Defaults */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-[#26352A] flex items-center gap-2 pb-2 border-b border-[#E1E9DC]">
            <Truck className="w-4 h-4 text-[#79A95A]" />
            <span>{language === 'hi' ? '4. डिफ़ॉल्ट उपज और वाहन' : '4. Default Harvest & Vehicle'}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#26352A] block mb-1">
                Typical Harvest Quantity
              </label>
              <input
                type="number"
                min="1"
                value={formData.typicalQuantity}
                onChange={e => setFormData({ ...formData, typicalQuantity: parseFloat(e.target.value) || 1 })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E9DC] bg-[#F3F8EF]/40 text-sm font-medium focus:outline-none focus:border-[#2F6B3F]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#26352A] block mb-1">
                Preferred Weight Unit
              </label>
              <select
                value={formData.preferredUnit}
                onChange={e => setFormData({ ...formData, preferredUnit: e.target.value as WeightUnit })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E9DC] bg-[#F3F8EF]/40 text-sm font-medium focus:outline-none focus:border-[#2F6B3F]"
              >
                <option value="quintal">Quintal (100 kg)</option>
                <option value="kg">Kilogram (kg)</option>
                <option value="tonne">Tonne (1000 kg)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#26352A] block mb-1">
                Transport Rate (₹/km)
              </label>
              <input
                type="number"
                min="1"
                value={formData.transportRatePerKm}
                onChange={e => setFormData({ ...formData, transportRatePerKm: parseFloat(e.target.value) || 1 })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E9DC] bg-[#F3F8EF]/40 text-sm font-medium focus:outline-none focus:border-[#2F6B3F]"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-[#2F6B3F] hover:bg-[#22512F] text-white font-bold text-sm shadow-md shadow-[#2F6B3F]/25 hover:shadow-lg transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>{t.saveProfileBtn}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
