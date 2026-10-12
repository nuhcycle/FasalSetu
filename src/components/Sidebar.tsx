import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../services/i18n';
import { 
  LayoutDashboard, 
  Scale, 
  TrendingUp, 
  MapPin, 
  Bookmark, 
  Tractor, 
  Database, 
  HelpCircle,
  ChevronRight
} from 'lucide-react';

export type NavigationTab = 
  | 'overview' 
  | 'compare' 
  | 'trends' 
  | 'map' 
  | 'saved' 
  | 'myfarm' 
  | 'datasource' 
  | 'help';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  language: Language;
  savedCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  language,
  savedCount,
}) => {
  const t = getTranslation(language);

  const navItems = [
    { id: 'overview' as NavigationTab, label: t.navOverview, icon: LayoutDashboard },
    { id: 'compare' as NavigationTab, label: t.navCompare, icon: Scale, badge: 'Core' },
    { id: 'trends' as NavigationTab, label: t.navTrends, icon: TrendingUp },
    { id: 'map' as NavigationTab, label: t.mapTitle, icon: MapPin },
    { id: 'saved' as NavigationTab, label: t.navSaved, icon: Bookmark, count: savedCount },
    { id: 'myfarm' as NavigationTab, label: t.navMyFarm, icon: Tractor },
    { id: 'datasource' as NavigationTab, label: t.navDataSource, icon: Database },
    { id: 'help' as NavigationTab, label: t.navHelp, icon: HelpCircle },
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:block bg-white border-r border-[#E1E9DC] p-4 min-h-[calc(100vh-4rem)]">
      <div className="space-y-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-[#2F6B3F] text-white shadow-xs font-semibold'
                  : 'text-[#26352A] hover:bg-[#F3F8EF] hover:text-[#2F6B3F]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-105 ${
                  isActive ? 'text-[#FFFDF5]' : 'text-[#6B786D] group-hover:text-[#2F6B3F]'
                }`} />
                <span className="truncate">{item.label}</span>
              </div>

              <div className="flex items-center gap-1.5">
                {item.badge && !isActive && (
                  <span className="text-[10px] font-bold bg-[#E9B949]/20 text-[#8B6848] px-1.5 py-0.5 rounded-md">
                    {item.badge}
                  </span>
                )}
                {typeof item.count === 'number' && item.count > 0 && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#EBF5EE] text-[#2F6B3F]'
                  }`}>
                    {item.count}
                  </span>
                )}
                {isActive && <ChevronRight className="w-4 h-4 text-white/80" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Helpful Agri Tip Banner */}
      <div className="mt-8 p-3.5 rounded-2xl bg-gradient-to-br from-[#F3F8EF] to-[#E4EEDC] border border-[#E1E9DC] text-xs">
        <div className="flex items-center gap-1.5 text-[#2F6B3F] font-bold mb-1">
          <span className="text-base">💡</span>
          <span>{language === 'hi' ? 'किसान मित्र सुझाव' : 'Kisan Smart Tip'}</span>
        </div>
        <p className="text-[#6B786D] leading-relaxed">
          {language === 'hi' 
            ? 'केवल ऊँचा भाव न देखें! 50 किमी अधिक जाने पर ₹1,500 भाड़ा लग सकता है। फसलसेतु का शुद्ध मुनाफा (Net In Hand) देखकर ही मंडी चुनें।'
            : 'Do not decide on modal price alone! Extra 50 km can cost ₹1,500 in diesel. Always check FasalSetu Net In Hand earnings.'}
        </p>
      </div>
    </aside>
  );
};
