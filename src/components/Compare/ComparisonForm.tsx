import React, { useState } from 'react';
import { ComparisonInput, Crop, Language, WeightUnit, UserSubscription } from '../../types';
import { CROPS } from '../../data/crops';
import { STATES_AND_DISTRICTS } from '../../data/locations';
import { VEHICLE_OPTIONS } from '../../data/vehicles';
import { getTranslation } from '../../services/i18n';
import { 
  Scale, 
  MapPin, 
  Truck, 
  Settings2, 
  ChevronDown, 
  ChevronUp,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

interface ComparisonFormProps {
  input: ComparisonInput;
  onChangeInput: (newInput: ComparisonInput) => void;
  onCalculate: () => void;
  language: Language;
  subscription: UserSubscription;
  onOpenUpgrade: () => void;
}

export const ComparisonForm: React.FC<ComparisonFormProps> = ({
  input,
  onChangeInput,
  onCalculate,
  language,
  subscription,
  onOpenUpgrade,
}) => {
  const t = getTranslation(language);
  const [showAdvancedCosts, setShowAdvancedCosts] = useState(false);

  // Active state's districts
  const selectedStateObj = STATES_AND_DISTRICTS.find(s => s.id === input.state) || STATES_AND_DISTRICTS[0];
  const districts = selectedStateObj.districts;

  const isLimitReached = subscription.plan === 'free' && subscription.dailyComparisonsUsed >= 5;

  const handleCropChange = (cropId: string) => {
    onChangeInput({ ...input, cropId });
  };

  const handleStateChange = (stateId: string) => {
    const newState = STATES_AND_DISTRICTS.find(s => s.id === stateId) || STATES_AND_DISTRICTS[0];
    const defaultDistrict = newState.districts[0]?.id || 'general';
    onChangeInput({
      ...input,
      state: stateId,
      district: defaultDistrict,
    });
  };

  const handleVehicleChange = (vehicleId: string) => {
    const vehicle = VEHICLE_OPTIONS.find(v => v.id === vehicleId);
    onChangeInput({
      ...input,
      vehicleId,
      transportRatePerKm: vehicle ? vehicle.defaultRatePerKm : input.transportRatePerKm,
    });
  };

  const handleCalculateClick = () => {
    if (isLimitReached) {
      onOpenUpgrade();
      return;
    }
    onCalculate();
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E1E9DC] p-5 sm:p-6 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-[#E1E9DC] gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#EBF5EE] text-[#2F6B3F]">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#26352A]">{t.formTitle}</h2>
            <p className="text-xs text-[#6B786D]">{t.subtitle}</p>
          </div>
        </div>

        {/* Free Plan Daily Usage Counter Pill */}
        {subscription.plan === 'free' ? (
          <div className="flex items-center gap-2 text-xs self-start sm:self-auto">
            <span className={`px-2.5 py-1 rounded-xl font-bold border ${
              isLimitReached 
                ? 'bg-amber-100 text-amber-900 border-amber-300' 
                : 'bg-[#F3F8EF] text-[#26352A] border-[#E1E9DC]'
            }`}>
              {subscription.dailyComparisonsUsed} / 5 comparisons used today
            </span>
            <button
              type="button"
              onClick={onOpenUpgrade}
              className="text-[#2F6B3F] font-bold text-xs hover:underline flex items-center gap-0.5"
            >
              <Sparkles className="w-3 h-3 text-[#E9B949]" />
              <span>Get Unlimited</span>
            </button>
          </div>
        ) : (
          <span className="text-xs font-bold text-[#2F6B3F] bg-[#EBF5EE] px-2.5 py-1 rounded-xl border border-[#79A95A] self-start sm:self-auto">
            ⭐ Unlimited Comparisons Active
          </span>
        )}
      </div>

      {/* Quota Reached Alert */}
      {isLimitReached && (
        <div className="mb-5 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">{t.dailyLimitExceeded}</p>
            <button
              type="button"
              onClick={onOpenUpgrade}
              className="mt-1 font-bold text-[#2F6B3F] underline inline-block"
            >
              {t.upgradeToPlus} (₹29/mo) →
            </button>
          </div>
        </div>
      )}

      <div className="space-y-5">
        {/* 1. Crop Selector (Visual buttons / quick pills) */}
        <div>
          <label className="block text-xs font-bold text-[#26352A] mb-2 uppercase tracking-wider">
            1. {t.selectCrop}
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {CROPS.map(crop => {
              const isSelected = input.cropId === crop.id;
              return (
                <button
                  key={crop.id}
                  type="button"
                  onClick={() => handleCropChange(crop.id)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border text-xs transition-all ${
                    isSelected
                      ? 'bg-[#2F6B3F] text-white border-[#2F6B3F] shadow-sm font-semibold'
                      : 'bg-[#F3F8EF]/70 hover:bg-[#F3F8EF] text-[#26352A] border-[#E1E9DC]'
                  }`}
                >
                  <span className="text-xl mb-1">{crop.icon}</span>
                  <span className="truncate w-full text-center">
                    {language === 'hi' ? crop.nameHi.split(' ')[0] : crop.nameEn}
                  </span>
                  {crop.mspPricePerQuintal && (
                    <span className={`text-[9px] mt-0.5 ${isSelected ? 'text-amber-200' : 'text-[#8B6848]'}`}>
                      MSP ₹{crop.mspPricePerQuintal}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Harvest Quantity & Unit Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-7">
            <label className="block text-xs font-bold text-[#26352A] mb-1.5 uppercase tracking-wider">
              2. {t.harvestQuantity}
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="10000"
                value={input.quantity}
                onChange={e => onChangeInput({ ...input, quantity: Math.max(1, parseFloat(e.target.value) || 1) })}
                className="w-full pl-3.5 pr-12 py-2.5 rounded-xl border border-[#E1E9DC] bg-[#F3F8EF]/40 text-[#26352A] font-semibold text-base focus:outline-none focus:border-[#2F6B3F] focus:ring-2 focus:ring-[#79A95A]/20"
                placeholder="e.g. 35"
              />
              <span className="absolute right-3.5 top-3 text-xs font-bold text-[#6B786D] uppercase">
                {input.unit}
              </span>
            </div>
          </div>

          <div className="sm:col-span-5">
            <label className="block text-xs font-bold text-[#26352A] mb-1.5 uppercase tracking-wider">
              {t.selectUnit}
            </label>
            <div className="grid grid-cols-3 gap-1 bg-[#F3F8EF] p-1 rounded-xl border border-[#E1E9DC]">
              {(['quintal', 'kg', 'tonne'] as WeightUnit[]).map(unit => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => onChangeInput({ ...input, unit })}
                  className={`py-2 text-xs font-bold rounded-lg transition-all capitalize ${
                    input.unit === unit
                      ? 'bg-[#2F6B3F] text-white shadow-xs'
                      : 'text-[#6B786D] hover:text-[#26352A]'
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Location (State, District, Village) */}
        <div>
          <label className="block text-xs font-bold text-[#26352A] mb-1.5 uppercase tracking-wider">
            3. {t.locationHeader}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] text-[#6B786D] block mb-1">{t.selectState}</label>
              <select
                value={input.state}
                onChange={e => handleStateChange(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E1E9DC] bg-[#F3F8EF]/40 text-xs font-medium text-[#26352A] focus:outline-none focus:border-[#2F6B3F]"
              >
                {STATES_AND_DISTRICTS.map(s => (
                  <option key={s.id} value={s.id}>
                    {language === 'hi' ? s.nameHi : s.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] text-[#6B786D] block mb-1">{t.selectDistrict}</label>
              <select
                value={input.district}
                onChange={e => onChangeInput({ ...input, district: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#E1E9DC] bg-[#F3F8EF]/40 text-xs font-medium text-[#26352A] focus:outline-none focus:border-[#2F6B3F]"
              >
                {districts.map(d => (
                  <option key={d.id} value={d.id}>
                    {language === 'hi' ? d.nameHi : d.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] text-[#6B786D] block mb-1">{t.villageName}</label>
              <input
                type="text"
                value={input.village || ''}
                onChange={e => onChangeInput({ ...input, village: e.target.value })}
                placeholder="e.g. Niphad / Nimgaon"
                className="w-full px-3 py-2 rounded-xl border border-[#E1E9DC] bg-[#F3F8EF]/40 text-xs font-medium text-[#26352A] focus:outline-none focus:border-[#2F6B3F]"
              />
            </div>
          </div>
        </div>

        {/* 4. Transport & Vehicle Options */}
        <div className="bg-[#F3F8EF]/60 p-4 rounded-2xl border border-[#E1E9DC] space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#26352A] uppercase tracking-wider flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#79A95A]" />
              <span>4. {t.transportOptions}</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="roundTrip"
                checked={input.isRoundTrip}
                onChange={e => onChangeInput({ ...input, isRoundTrip: e.target.checked })}
                className="w-4 h-4 accent-[#2F6B3F] rounded cursor-pointer"
              />
              <label htmlFor="roundTrip" className="text-xs text-[#26352A] font-medium cursor-pointer">
                {t.roundTrip}
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {VEHICLE_OPTIONS.map(v => {
              const isSelected = input.vehicleId === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => handleVehicleChange(v.id)}
                  className={`p-2 rounded-xl border text-left text-xs transition-all ${
                    isSelected
                      ? 'bg-white border-[#2F6B3F] ring-2 ring-[#79A95A]/30 font-semibold'
                      : 'bg-white/60 border-[#E1E9DC] text-[#6B786D] hover:bg-white'
                  }`}
                >
                  <span className="text-base">{v.icon}</span>
                  <p className="font-semibold text-[#26352A] truncate mt-0.5">
                    {language === 'hi' ? v.nameHi.split(' ')[0] : v.nameEn.split(' ')[0]}
                  </p>
                  <p className="text-[10px] text-[#79A95A] font-bold">₹{v.defaultRatePerKm}/km</p>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <div className="flex justify-between text-xs text-[#6B786D] mb-1">
                <span>{t.maxDistance}</span>
                <strong className="text-[#2F6B3F]">{input.maxDistanceKm} km</strong>
              </div>
              <input
                type="range"
                min="20"
                max="250"
                step="5"
                value={input.maxDistanceKm}
                onChange={e => onChangeInput({ ...input, maxDistanceKm: parseInt(e.target.value) })}
                className="w-full accent-[#2F6B3F] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#6B786D] mb-1">
                <span>{t.ratePerKm}</span>
                <strong className="text-[#2F6B3F]">₹{input.transportRatePerKm} / km</strong>
              </div>
              <input
                type="number"
                min="5"
                max="100"
                value={input.transportRatePerKm}
                onChange={e => onChangeInput({ ...input, transportRatePerKm: Math.max(1, parseFloat(e.target.value) || 1) })}
                className="w-full px-3 py-1.5 rounded-lg border border-[#E1E9DC] bg-white text-xs font-semibold text-[#26352A]"
              />
            </div>
          </div>
        </div>

        {/* 5. Advanced Optional Mandi Costs Accordion */}
        <div>
          <button
            type="button"
            onClick={() => setShowAdvancedCosts(!showAdvancedCosts)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#2F6B3F] hover:text-[#22512F]"
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span>{t.additionalCosts}</span>
            {showAdvancedCosts ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showAdvancedCosts && (
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FFFDF5] p-3.5 rounded-2xl border border-[#E9B949]/30">
              <div>
                <label className="text-[11px] text-[#8B6848] block mb-1">{t.loadingCost}</label>
                <input
                  type="number"
                  min="0"
                  value={input.loadingCostPerQuintal}
                  onChange={e => onChangeInput({ ...input, loadingCostPerQuintal: parseFloat(e.target.value) || 0 })}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-[#E1E9DC] bg-white text-xs font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#8B6848] block mb-1">{t.unloadingCost}</label>
                <input
                  type="number"
                  min="0"
                  value={input.unloadingCostPerQuintal}
                  onChange={e => onChangeInput({ ...input, unloadingCostPerQuintal: parseFloat(e.target.value) || 0 })}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-[#E1E9DC] bg-white text-xs font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#8B6848] block mb-1">{t.mandiFee}</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={input.mandiFeePercent}
                  onChange={e => onChangeInput({ ...input, mandiFeePercent: parseFloat(e.target.value) || 0 })}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-[#E1E9DC] bg-white text-xs font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#8B6848] block mb-1">{t.otherFee}</label>
                <input
                  type="number"
                  min="0"
                  value={input.otherDeductions}
                  onChange={e => onChangeInput({ ...input, otherDeductions: parseFloat(e.target.value) || 0 })}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-[#E1E9DC] bg-white text-xs font-medium"
                />
              </div>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleCalculateClick}
            className={`w-full sm:w-auto px-8 py-3 rounded-2xl font-bold text-sm shadow-md transition-all active:scale-95 ${
              isLimitReached
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-[#2F6B3F] hover:bg-[#22512F] text-white shadow-[#2F6B3F]/25 hover:shadow-lg'
            }`}
          >
            {isLimitReached ? 'Daily Limit Reached - Upgrade' : t.calculateBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
