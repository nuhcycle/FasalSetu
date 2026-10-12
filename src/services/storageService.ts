import { FarmerProfile, Language, NotificationItem } from '../types';

const PROFILE_KEY = 'fasalsetu_farmer_profile';
const SAVED_MANDIS_KEY = 'fasalsetu_saved_mandis';
const NOTIFICATIONS_KEY = 'fasalsetu_notifications';

export const DEFAULT_PROFILE: FarmerProfile = {
  name: 'Ramesh Patil',
  state: 'maharashtra',
  district: 'nashik',
  village: 'Niphad',
  preferredLanguage: 'en',
  primaryCrops: ['onion', 'soybean', 'tomato'],
  typicalQuantity: 35,
  preferredUnit: 'quintal',
  transportRatePerKm: 22,
  vehicleType: 'bolero',
  isOnboarded: true,
  savedMandiIds: ['mandi_lasalgaon_onion', 'mandi_pimpalgaon_onion'],
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    titleEn: 'Lasalgaon Mandi: Onion Price Jump',
    titleHi: 'लासलगांव मंडी: प्याज भाव में उछाल',
    messageEn: 'Modal prices reached ₹2,450/q (+₹120 today) due to northern festive orders.',
    messageHi: 'उत्तर भारतीय मांग के कारण आज मॉडल भाव ₹2,450/क्विंटल (+₹120) तक पहुंचे।',
    type: 'price_surge',
    date: 'Today, 09:30 AM',
    read: false,
    mandiId: 'mandi_lasalgaon_onion',
  },
  {
    id: 'notif_2',
    titleEn: 'MSP Reference Alert: Soybean',
    titleHi: 'एमएसपी अलर्ट: सोयाबीन',
    messageEn: 'Government MSP is ₹4,892/q. Indore spot prices currently trading above MSP at ₹4,980/q.',
    messageHi: 'सरकारी समर्थन मूल्य ₹4,892/क्विंटल है। इंदौर मंडी में वर्तमान भाव ₹4,980 चल रहा है।',
    type: 'msp_announcement',
    date: 'Yesterday',
    read: true,
  },
  {
    id: 'notif_3',
    titleEn: 'Weather & Haulage Advisory',
    titleHi: 'मौसम एवं परिवहन सूचना',
    messageEn: 'Clear dry highways towards Pune & Nashik. Best transit conditions for perishable crops.',
    messageHi: 'पुणे व नासिक मार्ग पर मौसम साफ। सब्जियों के सुरक्षित परिवहन के लिए अनुकूल समय।',
    type: 'market_update',
    date: '2 days ago',
    read: true,
  }
];

export const storageService = {
  getProfile(): FarmerProfile {
    try {
      const data = localStorage.getItem(PROFILE_KEY);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return DEFAULT_PROFILE;
  },

  saveProfile(profile: FarmerProfile): void {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  },

  getSavedMandiIds(): string[] {
    try {
      const data = localStorage.getItem(SAVED_MANDIS_KEY);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return DEFAULT_PROFILE.savedMandiIds;
  },

  toggleSavedMandi(mandiId: string): string[] {
    const list = this.getSavedMandiIds();
    const idx = list.indexOf(mandiId);
    let updated: string[];
    if (idx >= 0) {
      updated = list.filter(id => id !== mandiId);
    } else {
      updated = [...list, mandiId];
    }
    localStorage.setItem(SAVED_MANDIS_KEY, JSON.stringify(updated));
    return updated;
  },

  getNotifications(): NotificationItem[] {
    try {
      const data = localStorage.getItem(NOTIFICATIONS_KEY);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return INITIAL_NOTIFICATIONS;
  },

  markNotificationAsRead(id: string): NotificationItem[] {
    const notifs = this.getNotifications().map(n => (n.id === id ? { ...n, read: true } : n));
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifs));
    return notifs;
  },

  getLanguage(): Language {
    return (localStorage.getItem('fasalsetu_lang') as Language) || 'en';
  },

  setLanguage(lang: Language): void {
    localStorage.setItem('fasalsetu_lang', lang);
  }
};
