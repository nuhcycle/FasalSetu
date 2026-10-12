import { PriceTrendPoint } from '../types';

export interface CropTrendData {
  cropId: string;
  cropNameEn: string;
  cropNameHi: string;
  trendDirection: 'rising' | 'stable' | 'falling';
  percentChange30d: number;
  averageModal: number;
  marketSentimentEn: string;
  marketSentimentHi: string;
  sellingTipEn: string;
  sellingTipHi: string;
  points: PriceTrendPoint[];
}

export const HISTORICAL_PRICE_TRENDS: Record<string, CropTrendData> = {
  onion: {
    cropId: 'onion',
    cropNameEn: 'Onion',
    cropNameHi: 'प्याज़',
    trendDirection: 'rising',
    percentChange30d: +14.2,
    averageModal: 2320,
    marketSentimentEn: 'Strong demand from northern wholesale buyers with steady export clearance.',
    marketSentimentHi: 'उत्तर भारत के थोक खरीदारों से मजबूत मांग और निर्यात में सुधार।',
    sellingTipEn: 'Prices in Lasalgaon & Pimpalgaon are premium. Consider selling quality lots within 7-10 days before new kharif arrivals peak.',
    sellingTipHi: 'लासलगांव और पिंपलगांव में कीमतें ऊंची हैं। खरीफ की नई आवक तेज होने से पहले 7-10 दिनों में बेचना फायदेमंद हो सकता है।',
    points: [
      { date: 'Sep 13', modalPrice: 2050, minPrice: 1600, maxPrice: 2350, arrivalsTonnes: 920 },
      { date: 'Sep 18', modalPrice: 2120, minPrice: 1650, maxPrice: 2420, arrivalsTonnes: 1050 },
      { date: 'Sep 23', modalPrice: 2180, minPrice: 1700, maxPrice: 2500, arrivalsTonnes: 1150 },
      { date: 'Sep 28', modalPrice: 2260, minPrice: 1750, maxPrice: 2600, arrivalsTonnes: 1280 },
      { date: 'Oct 03', modalPrice: 2340, minPrice: 1820, maxPrice: 2720, arrivalsTonnes: 1390 },
      { date: 'Oct 08', modalPrice: 2410, minPrice: 1900, maxPrice: 2800, arrivalsTonnes: 1440 },
      { date: 'Oct 12', modalPrice: 2450, minPrice: 1950, maxPrice: 2850, arrivalsTonnes: 1420 },
    ]
  },
  tomato: {
    cropId: 'tomato',
    cropNameEn: 'Tomato',
    cropNameHi: 'टमाटर',
    trendDirection: 'falling',
    percentChange30d: -11.8,
    averageModal: 1880,
    marketSentimentEn: 'Daily arrivals increasing across Kolar and Nashik belts as harvest expands.',
    marketSentimentHi: 'कोलार और नासिक क्षेत्रों से दैनिक आवक बढ़ने के कारण भाव में हल्का दबाव।',
    sellingTipEn: 'Tomato has a short shelf life. Avoid hoarding; dispatch ripe harvest immediately to the nearest high-volume mandi (Kolar or Pimpalgaon).',
    sellingTipHi: 'टमाटर जल्दी खराब होता है। रोक कर न रखें; पकी फसल को तुरंत निकटतम बड़ी मंडी भेजें।',
    points: [
      { date: 'Sep 13', modalPrice: 2250, minPrice: 1800, maxPrice: 2700, arrivalsTonnes: 850 },
      { date: 'Sep 18', modalPrice: 2180, minPrice: 1700, maxPrice: 2600, arrivalsTonnes: 960 },
      { date: 'Sep 23', modalPrice: 2050, minPrice: 1550, maxPrice: 2450, arrivalsTonnes: 1100 },
      { date: 'Sep 28', modalPrice: 1950, minPrice: 1450, maxPrice: 2350, arrivalsTonnes: 1300 },
      { date: 'Oct 03', modalPrice: 1840, minPrice: 1300, maxPrice: 2250, arrivalsTonnes: 1500 },
      { date: 'Oct 08', modalPrice: 1780, minPrice: 1250, maxPrice: 2150, arrivalsTonnes: 1600 },
      { date: 'Oct 12', modalPrice: 1750, minPrice: 1200, maxPrice: 2100, arrivalsTonnes: 1650 },
    ]
  },
  soybean: {
    cropId: 'soybean',
    cropNameEn: 'Soybean',
    cropNameHi: 'सोयाबीन',
    trendDirection: 'rising',
    percentChange30d: +6.4,
    averageModal: 4860,
    marketSentimentEn: 'Crushers and solvent plants aggressively bidding above MSP for low-moisture dry beans.',
    marketSentimentHi: 'कम नमी वाले सूखे सोयाबीन के लिए तेल मिलें एमएसपी से ऊपर आक्रामक बोली लगा रही हैं।',
    sellingTipEn: 'Ensure moisture level is below 10% to get premium grade prices above ₹5,000/q at Indore and Kota.',
    sellingTipHi: 'इंदौर और कोटा में ₹5,000/क्विंटल से अधिक भाव पाने के लिए नमी 10% से कम रखें।',
    points: [
      { date: 'Sep 13', modalPrice: 4620, minPrice: 4200, maxPrice: 4850, arrivalsTonnes: 1800 },
      { date: 'Sep 18', modalPrice: 4680, minPrice: 4250, maxPrice: 4900, arrivalsTonnes: 2100 },
      { date: 'Sep 23', modalPrice: 4740, minPrice: 4320, maxPrice: 4980, arrivalsTonnes: 2500 },
      { date: 'Sep 28', modalPrice: 4810, minPrice: 4400, maxPrice: 5050, arrivalsTonnes: 2900 },
      { date: 'Oct 03', modalPrice: 4890, minPrice: 4480, maxPrice: 5120, arrivalsTonnes: 3100 },
      { date: 'Oct 08', modalPrice: 4940, minPrice: 4520, maxPrice: 5180, arrivalsTonnes: 3150 },
      { date: 'Oct 12', modalPrice: 4980, minPrice: 4550, maxPrice: 5200, arrivalsTonnes: 3200 },
    ]
  },
  wheat: {
    cropId: 'wheat',
    cropNameEn: 'Wheat',
    cropNameHi: 'गेहूँ',
    trendDirection: 'stable',
    percentChange30d: +1.8,
    averageModal: 2580,
    marketSentimentEn: 'Stable flour mill buying and strong govt reserve buffers keeping prices firm.',
    marketSentimentHi: 'आटा मिलों की स्थिर मांग और पर्याप्त सरकारी बफर स्टॉक से भाव स्थिर बना हुआ है।',
    sellingTipEn: 'Sharbati varieties in Sehore command a massive ₹800/q premium over standard wheat. Transporting to Sehore pays off.',
    sellingTipHi: 'सीहोर में शरबती किस्म साधारण गेहूं से ₹800/क्विंटल अधिक बिकती है। सीहोर ले जाना लाभदायक है।',
    points: [
      { date: 'Sep 13', modalPrice: 2540, minPrice: 2280, maxPrice: 2750, arrivalsTonnes: 3800 },
      { date: 'Sep 18', modalPrice: 2550, minPrice: 2290, maxPrice: 2760, arrivalsTonnes: 3900 },
      { date: 'Sep 23', modalPrice: 2560, minPrice: 2300, maxPrice: 2770, arrivalsTonnes: 4100 },
      { date: 'Sep 28', modalPrice: 2570, minPrice: 2310, maxPrice: 2780, arrivalsTonnes: 4200 },
      { date: 'Oct 03', modalPrice: 2590, minPrice: 2330, maxPrice: 2790, arrivalsTonnes: 4400 },
      { date: 'Oct 08', modalPrice: 2610, minPrice: 2340, maxPrice: 2800, arrivalsTonnes: 4450 },
      { date: 'Oct 12', modalPrice: 2620, minPrice: 2350, maxPrice: 2800, arrivalsTonnes: 4500 },
    ]
  },
  cotton: {
    cropId: 'cotton',
    cropNameEn: 'Cotton',
    cropNameHi: 'कपास',
    trendDirection: 'rising',
    percentChange30d: +5.2,
    averageModal: 7350,
    marketSentimentEn: 'Spinning mills in Gujarat and Maharashtra stocking up on Shankar-6 variety.',
    marketSentimentHi: 'गुजरात और महाराष्ट्र की कताई मिलें शंकर-6 किस्म का स्टॉक बढ़ा रही हैं।',
    sellingTipEn: 'Rajkot Bedi yard is offering peak prices. If travel is under 90 km, direct transport delivers highest net return.',
    sellingTipHi: 'राजकोट बेड़ी यार्ड में सबसे अच्छे दाम हैं। यदि दूरी 90 किमी से कम है तो वहां सीधे भेजना सबसे फायदेमंद है।',
    points: [
      { date: 'Sep 13', modalPrice: 7100, minPrice: 6600, maxPrice: 7600, arrivalsTonnes: 2600 },
      { date: 'Sep 18', modalPrice: 7180, minPrice: 6680, maxPrice: 7680, arrivalsTonnes: 2900 },
      { date: 'Sep 23', modalPrice: 7260, minPrice: 6750, maxPrice: 7750, arrivalsTonnes: 3200 },
      { date: 'Sep 28', modalPrice: 7330, minPrice: 6800, maxPrice: 7820, arrivalsTonnes: 3500 },
      { date: 'Oct 03', modalPrice: 7390, minPrice: 6850, maxPrice: 7860, arrivalsTonnes: 3700 },
      { date: 'Oct 08', modalPrice: 7420, minPrice: 6880, maxPrice: 7890, arrivalsTonnes: 3780 },
      { date: 'Oct 12', modalPrice: 7450, minPrice: 6900, maxPrice: 7900, arrivalsTonnes: 3800 },
    ]
  },
  mustard: {
    cropId: 'mustard',
    cropNameEn: 'Mustard',
    cropNameHi: 'सरसों',
    trendDirection: 'stable',
    percentChange30d: +2.4,
    averageModal: 5780,
    marketSentimentEn: 'Festive edible oil crushing season is keeping mustard mandis in Rajasthan active.',
    marketSentimentHi: 'त्योहारी सीजन में खाद्य तेल पेराई के कारण राजस्थान की सरसों मंडियों में अच्छी तेजी है।',
    sellingTipEn: 'Alwar APMC has dedicated oil-content grading machines that reward high-oil seeds with ₹200/q extra bonus.',
    sellingTipHi: 'अलवर मंडी में तेल परीक्षण मशीनें हैं, जहां अधिक तेल वाले दानों पर ₹200/क्विंटल तक अतिरिक्त बोनस मिलता है।',
    points: [
      { date: 'Sep 13', modalPrice: 5650, minPrice: 5150, maxPrice: 5950, arrivalsTonnes: 1600 },
      { date: 'Sep 18', modalPrice: 5680, minPrice: 5180, maxPrice: 5980, arrivalsTonnes: 1750 },
      { date: 'Sep 23', modalPrice: 5720, minPrice: 5220, maxPrice: 6020, arrivalsTonnes: 1900 },
      { date: 'Sep 28', modalPrice: 5770, minPrice: 5280, maxPrice: 6080, arrivalsTonnes: 2050 },
      { date: 'Oct 03', modalPrice: 5820, minPrice: 5310, maxPrice: 6120, arrivalsTonnes: 2150 },
      { date: 'Oct 08', modalPrice: 5850, minPrice: 5330, maxPrice: 6140, arrivalsTonnes: 2180 },
      { date: 'Oct 12', modalPrice: 5880, minPrice: 5350, maxPrice: 6150, arrivalsTonnes: 2200 },
    ]
  }
};
