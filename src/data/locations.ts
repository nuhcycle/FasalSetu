export interface DistrictInfo {
  id: string;
  nameEn: string;
  nameHi: string;
  lat: number;
  lng: number;
}

export interface StateInfo {
  id: string;
  nameEn: string;
  nameHi: string;
  districts: DistrictInfo[];
}

export const STATES_AND_DISTRICTS: StateInfo[] = [
  {
    id: 'maharashtra',
    nameEn: 'Maharashtra',
    nameHi: 'महाराष्ट्र',
    districts: [
      { id: 'nashik', nameEn: 'Nashik', nameHi: 'नासिक', lat: 19.9975, lng: 73.7898 },
      { id: 'ahmednagar', nameEn: 'Ahmednagar', nameHi: 'अहमदनगर', lat: 19.0948, lng: 74.7480 },
      { id: 'pune', nameEn: 'Pune', nameHi: 'पुणे', lat: 18.5204, lng: 73.8567 },
      { id: 'solapur', nameEn: 'Solapur', nameHi: 'सोलापुर', lat: 17.6599, lng: 75.9064 },
      { id: 'nagpur', nameEn: 'Nagpur', nameHi: 'नागपुर', lat: 21.1458, lng: 79.0882 },
      { id: 'jalgaon', nameEn: 'Jalgaon', nameHi: 'जलगांव', lat: 21.0077, lng: 75.5626 },
      { id: 'chhatrapati_sambhajinagar', nameEn: 'Chhatrapati Sambhajinagar', nameHi: 'छत्रपति संभाजीनगर', lat: 19.8762, lng: 75.3433 },
    ]
  },
  {
    id: 'madhya_pradesh',
    nameEn: 'Madhya Pradesh',
    nameHi: 'मध्य प्रदेश',
    districts: [
      { id: 'indore', nameEn: 'Indore', nameHi: 'इंदौर', lat: 22.7196, lng: 75.8577 },
      { id: 'mandsaur', nameEn: 'Mandsaur', nameHi: 'मंदसौर', lat: 24.0722, lng: 75.0682 },
      { id: 'ujjain', nameEn: 'Ujjain', nameHi: 'उज्जैन', lat: 23.1765, lng: 75.7885 },
      { id: 'dewas', nameEn: 'Dewas', nameHi: 'देवास', lat: 22.9676, lng: 76.0534 },
      { id: 'harda', nameEn: 'Harda', nameHi: 'हरदा', lat: 22.3395, lng: 77.0988 },
      { id: 'chhindwara', nameEn: 'Chhindwara', nameHi: 'छिंदवाड़ा', lat: 22.0574, lng: 78.9382 },
      { id: 'bhopal', nameEn: 'Bhopal', nameHi: 'भोपाल', lat: 23.2599, lng: 77.4126 },
      { id: 'sehore', nameEn: 'Sehore', nameHi: 'सीहोर', lat: 23.2031, lng: 77.0844 },
    ]
  },
  {
    id: 'uttar_pradesh',
    nameEn: 'Uttar Pradesh',
    nameHi: 'उत्तर प्रदेश',
    districts: [
      { id: 'agra', nameEn: 'Agra', nameHi: 'आगरा', lat: 27.1767, lng: 78.0081 },
      { id: 'aligarh', nameEn: 'Aligarh', nameHi: 'अलीगढ़', lat: 27.8974, lng: 78.0880 },
      { id: 'meerut', nameEn: 'Meerut', nameHi: 'मेरठ', lat: 28.9845, lng: 77.7064 },
      { id: 'kanpur_nagar', nameEn: 'Kanpur Nagar', nameHi: 'कानपुर नगर', lat: 26.4499, lng: 80.3319 },
      { id: 'bareilly', nameEn: 'Bareilly', nameHi: 'बरेली', lat: 28.3670, lng: 79.4304 },
      { id: 'varanasi', nameEn: 'Varanasi', nameHi: 'वाराणसी', lat: 25.3176, lng: 82.9739 },
      { id: 'mathura', nameEn: 'Mathura', nameHi: 'मथुरा', lat: 27.4924, lng: 77.6737 },
    ]
  },
  {
    id: 'rajasthan',
    nameEn: 'Rajasthan',
    nameHi: 'राजस्थान',
    districts: [
      { id: 'kota', nameEn: 'Kota', nameHi: 'कोटा', lat: 25.2138, lng: 75.8648 },
      { id: 'baran', nameEn: 'Baran', nameHi: 'बारां', lat: 25.1011, lng: 76.5132 },
      { id: 'jodhpur', nameEn: 'Jodhpur', nameHi: 'जोधपुर', lat: 26.2389, lng: 73.0243 },
      { id: 'jaipur', nameEn: 'Jaipur', nameHi: 'जयपुर', lat: 26.9124, lng: 75.7873 },
      { id: 'alwar', nameEn: 'Alwar', nameHi: 'अलवर', lat: 27.5530, lng: 76.6346 },
      { id: 'sriganganagar', nameEn: 'Sri Ganganagar', nameHi: 'श्रीगंगानगर', lat: 29.9038, lng: 73.8772 },
    ]
  },
  {
    id: 'gujarat',
    nameEn: 'Gujarat',
    nameHi: 'गुजरात',
    districts: [
      { id: 'rajkot', nameEn: 'Rajkot', nameHi: 'राजकोट', lat: 22.3039, lng: 70.8022 },
      { id: 'surat', nameEn: 'Surat', nameHi: 'सूरत', lat: 21.1702, lng: 72.8311 },
      { id: 'junagadh', nameEn: 'Junagadh', nameHi: 'जूनागढ़', lat: 21.5222, lng: 70.4579 },
      { id: 'ahmedabad', nameEn: 'Ahmedabad', nameHi: 'अहमदाबाद', lat: 23.0225, lng: 72.5714 },
      { id: 'mehsana', nameEn: 'Mehsana (Unjha)', nameHi: 'मेहसाणा (ऊंझा)', lat: 23.5880, lng: 72.3693 },
    ]
  },
  {
    id: 'punjab',
    nameEn: 'Punjab',
    nameHi: 'पंजाब',
    districts: [
      { id: 'ludhiana', nameEn: 'Ludhiana (Khanna)', nameHi: 'लुधियाना (खन्ना)', lat: 30.7046, lng: 76.2167 },
      { id: 'patiala', nameEn: 'Patiala', nameHi: 'पटियाला', lat: 30.3398, lng: 76.3869 },
      { id: 'bathinda', nameEn: 'Bathinda', nameHi: 'बठिंडा', lat: 30.2110, lng: 74.9455 },
      { id: 'amritsar', nameEn: 'Amritsar', nameHi: 'अमृतसर', lat: 31.6340, lng: 74.8723 },
    ]
  },
  {
    id: 'haryana',
    nameEn: 'Haryana',
    nameHi: 'हरियाणा',
    districts: [
      { id: 'karnal', nameEn: 'Karnal', nameHi: 'करनाल', lat: 29.6857, lng: 76.9905 },
      { id: 'sirsa', nameEn: 'Sirsa', nameHi: 'सिरसा', lat: 29.5349, lng: 75.0298 },
      { id: 'kurukshetra', nameEn: 'Kurukshetra', nameHi: 'कुरुक्षेत्र', lat: 29.9695, lng: 76.8783 },
      { id: 'hisar', nameEn: 'Hisar', nameHi: 'हिसार', lat: 29.1492, lng: 75.7217 },
    ]
  },
  {
    id: 'karnataka',
    nameEn: 'Karnataka',
    nameHi: 'कर्नाटक',
    districts: [
      { id: 'kolar', nameEn: 'Kolar', nameHi: 'कोलार', lat: 13.1378, lng: 78.1291 },
      { id: 'belagavi', nameEn: 'Belagavi', nameHi: 'बेलगावी', lat: 15.8497, lng: 74.4977 },
      { id: 'hubli_dharwad', nameEn: 'Hubballi-Dharwad', nameHi: 'हुबली-धारवाड़', lat: 15.3647, lng: 75.1240 },
      { id: 'bengaluru_rural', nameEn: 'Bengaluru Rural', nameHi: 'बेंगलुरु ग्रामीण', lat: 13.2382, lng: 77.5878 },
    ]
  }
];

export function findDistrictCoordinates(stateId: string, districtId: string): { lat: number; lng: number } {
  const state = STATES_AND_DISTRICTS.find(s => s.id === stateId || s.nameEn.toLowerCase() === stateId.toLowerCase());
  if (state) {
    const district = state.districts.find(d => d.id === districtId || d.nameEn.toLowerCase() === districtId.toLowerCase());
    if (district) {
      return { lat: district.lat, lng: district.lng };
    }
  }
  // Fallback central India
  return { lat: 20.5937, lng: 78.9629 };
}
