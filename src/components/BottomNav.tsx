import React from 'react';
import { NavigationTab } from './Sidebar';
import { Language } from '../types';
import { getTranslation } from '../services/i18n';
import { LayoutDashboard, Scale, TrendingUp, MapPin, User } from 'lucide-react';

interface BottomNavProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  language: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  language,
}) => {
  const t = getTranslation(language);

  const items = [
    { id: 'overview' as NavigationTab, label: language === 'hi' ? 'होम' : 'Home', icon: LayoutDashboard },
    { id: 'compare' as NavigationTab, label: language === 'hi' ? 'तुलना' : 'Compare', icon: Scale },
    { id: 'trends' as NavigationTab, label: language === 'hi' ? 'रुझान' : 'Trends', icon: TrendingUp },
    { id: 'map' as NavigationTab, label: language === 'hi' ? 'नक्शा' : 'Map', icon: MapPin },
    { id: 'myfarm' as NavigationTab, label: language === 'hi' ? 'प्रोफाइल' : 'Profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E1E9DC] px-2 py-1 shadow-lg flex items-center justify-around safe-area-bottom">
      {items.map(item => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
              isActive ? 'text-[#2F6B3F] font-bold' : 'text-[#6B786D] hover:text-[#26352A]'
            }`}
          >
            <div className={`p-1 rounded-lg ${isActive ? 'bg-[#EBF5EE]' : ''}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[11px] mt-0.5 tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
