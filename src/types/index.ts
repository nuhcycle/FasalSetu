export type Language = 'en' | 'hi';

export type WeightUnit = 'kg' | 'quintal' | 'tonne';

export interface Crop {
  id: string;
  nameEn: string;
  nameHi: string;
  category: 'cereal' | 'vegetable' | 'pulse' | 'oilseed' | 'commercial';
  icon: string;
  standardSeason: 'Kharif' | 'Rabi' | 'Zaid' | 'All Season';
  typicalPricePerQuintal: {
    min: number;
    max: number;
    modal: number;
  };
  mspPricePerQuintal?: number; // Minimum Support Price if applicable (Govt of India)
  shelfLifeDays?: number;
}

export interface MandiRecord {
  id: string;
  mandiName: string;
  mandiNameHi: string;
  district: string;
  districtHi: string;
  state: string;
  stateHi: string;
  commodity: string;
  commodityId: string;
  variety: string;
  minPrice: number; // in ₹/quintal
  maxPrice: number; // in ₹/quintal
  modalPrice: number; // in ₹/quintal
  priceUnit: string; // e.g., '₹/Quintal'
  arrivalDate: string; // YYYY-MM-DD
  arrivalsTonnes?: number;
  source: 'Agmarknet' | 'e-NAM' | 'data.gov.in API' | 'Custom CSV';
  coordinates: {
    lat: number;
    lng: number;
  };
  contactPhone?: string;
  facilities: string[];
}

export interface VehicleOption {
  id: string;
  nameEn: string;
  nameHi: string;
  capacityQuintals: number;
  defaultRatePerKm: number; // ₹ per km
  icon: string;
  descriptionEn: string;
  descriptionHi: string;
}

export interface ComparisonInput {
  cropId: string;
  quantity: number;
  unit: WeightUnit;
  state: string;
  district: string;
  village?: string;
  farmerCoordinates?: {
    lat: number;
    lng: number;
  };
  maxDistanceKm: number;
  vehicleId: string;
  transportRatePerKm: number;
  isRoundTrip: boolean;
  loadingCostPerQuintal: number;
  unloadingCostPerQuintal: number;
  mandiFeePercent: number; // APMC market fee (usually 1% to 1.5%)
  otherDeductions: number; // Gunny bags / cleaning flat ₹
}

export interface ComparisonResult {
  mandi: MandiRecord;
  distanceKm: number;
  quantityKg: number;
  quantityQuintals: number;
  reportedModalPricePerQuintal: number;
  pricePerKg: number;
  grossProceeds: number;
  transportCost: number;
  loadingCost: number;
  unloadingCost: number;
  mandiFeeCost: number;
  otherCosts: number;
  totalSellingCosts: number;
  estimatedNetProceeds: number;
  effectiveNetPerQuintal: number;
  profitDifferenceVsFirst: number; // ₹ difference vs benchmark / nearest
  daysOld: number;
  dataFreshness: 'fresh' | 'moderate' | 'stale'; // Fresh <= 2 days, moderate <= 6 days, stale > 6
  confidence: 'high' | 'medium' | 'low';
  confidenceReasonEn: string;
  confidenceReasonHi: string;
  isRecommended: boolean;
  recommendationScore: number;
  recommendationExplanationEn: string;
  recommendationExplanationHi: string;
}

export interface FarmerProfile {
  name: string;
  state: string;
  district: string;
  village: string;
  preferredLanguage: Language;
  primaryCrops: string[];
  typicalQuantity: number;
  preferredUnit: WeightUnit;
  transportRatePerKm: number;
  vehicleType: string;
  isOnboarded: boolean;
  savedMandiIds: string[];
}

export interface PriceTrendPoint {
  date: string;
  modalPrice: number;
  minPrice: number;
  maxPrice: number;
  arrivalsTonnes?: number;
}

export interface NotificationItem {
  id: string;
  titleEn: string;
  titleHi: string;
  messageEn: string;
  messageHi: string;
  type: 'price_surge' | 'mandi_alert' | 'market_update' | 'msp_announcement';
  date: string;
  read: boolean;
  mandiId?: string;
}
