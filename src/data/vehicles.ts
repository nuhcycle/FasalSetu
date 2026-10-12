import { VehicleOption } from '../types';

export const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'bolero',
    nameEn: 'Bolero / Pickup Camper',
    nameHi: 'बोलेरो पिकअप (15-20 क्विंटल)',
    capacityQuintals: 20,
    defaultRatePerKm: 22,
    icon: '🛻',
    descriptionEn: 'Ideal for medium loads (up to 20 quintals). Quick transit.',
    descriptionHi: 'मध्यम लोड (20 क्विंटल तक) के लिए सबसे उपयुक्त। तेज़ परिवहन।'
  },
  {
    id: 'tractor',
    nameEn: 'Tractor Trolley',
    nameHi: 'ट्रैक्टर ट्रॉली (30-45 क्विंटल)',
    capacityQuintals: 40,
    defaultRatePerKm: 28,
    icon: '🚜',
    descriptionEn: 'Economical for nearby mandis (< 50 km) and bulk loads.',
    descriptionHi: 'नज़दीकी मंडियों (< 50 किमी) और भारी वजन के लिए किफायती।'
  },
  {
    id: 'mini_truck',
    nameEn: 'Mini Truck (Tata Ace / Chhota Hathi)',
    nameHi: 'छोटा हाथी / टाटा ऐस (8-10 क्विंटल)',
    capacityQuintals: 10,
    defaultRatePerKm: 18,
    icon: '🚐',
    descriptionEn: 'Best for smaller harvests, vegetables, and quick mandi trips.',
    descriptionHi: 'कम मात्रा, सब्जियों और नज़दीकी मंडी के लिए उपयुक्त।'
  },
  {
    id: 'eicher_407',
    nameEn: 'Light Truck (Tata 407 / Eicher 14ft)',
    nameHi: 'बड़ा ट्रक (टाटा 407 / आयशर 50 क्विंटल)',
    capacityQuintals: 60,
    defaultRatePerKm: 36,
    icon: '🚛',
    descriptionEn: 'Best for long-distance mandi sales and large quantities.',
    descriptionHi: 'लंबी दूरी की मंडियों और भारी उपज के लिए सर्वश्रेष्ठ।'
  },
  {
    id: 'ape_auto',
    nameEn: '3-Wheeler Cargo Auto',
    nameHi: 'थ्री-व्हीलर कार्गो ऑटो (5 क्विंटल)',
    capacityQuintals: 6,
    defaultRatePerKm: 14,
    icon: '🛺',
    descriptionEn: 'Economical for very small lots and local town APMC.',
    descriptionHi: 'छोटी उपज और स्थानीय शहर की मंडी के लिए सबसे सस्ता।'
  }
];
