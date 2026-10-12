import React, { useState } from 'react';
import { Language, NotificationItem, FarmerProfile } from '../types';
import { getTranslation } from '../services/i18n';
import { DataSourceStatus } from '../services/dataService';
import { 
  Sprout, 
  Globe2, 
  Bell, 
  User, 
  Database, 
  Check, 
  TrendingUp, 
  AlertCircle,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  dataStatus: DataSourceStatus;
  onOpenDataSourceModal: () => void;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  profile: FarmerProfile;
  onOpenProfile: () => void;
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  dataStatus,
  onOpenDataSourceModal,
  notifications,
  onMarkNotificationRead,
  profile,
  onOpenProfile,
  onToggleMobileMenu,
  isMobileMenuOpen,
}) => {
  const t = getTranslation(language);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleLanguage = () => {
    onLanguageChange(language === 'en' ? 'hi' : 'en');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E1E9DC] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-[#26352A] hover:bg-[#F3F8EF] transition-colors"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-[#2F6B3F] text-white flex items-center justify-center shadow-sm shadow-[#2F6B3F]/20">
              <Sprout className="w-6 h-6 text-[#FFFDF5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-[#2F6B3F]">
                  {language === 'hi' ? 'फसलसेतु' : 'FasalSetu'}
                </span>
                <span className="text-[10px] font-semibold bg-[#EBF5EE] text-[#2F6B3F] px-1.5 py-0.5 rounded-full border border-[#C4D7BC]">
                  AI Beta
                </span>
              </div>
              <p className="text-[11px] text-[#6B786D] hidden sm:block leading-none mt-0.5">
                {t.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Data Source Pill */}
          <button
            onClick={onOpenDataSourceModal}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              dataStatus.isDemo
                ? 'bg-[#FFFDF5] text-[#8B6848] border-[#E9B949]/50 hover:bg-[#FFF9E6]'
                : dataStatus.mode === 'custom_csv'
                ? 'bg-[#EBF5EE] text-[#2F6B3F] border-[#79A95A]/50 hover:bg-[#E0F0E4]'
                : 'bg-emerald-50 text-emerald-800 border-emerald-300'
            }`}
            title="Click to manage data source or import CSV"
          >
            <Database className="w-3.5 h-3.5 text-[#E9B949]" />
            <span className="truncate max-w-[140px]">
              {dataStatus.isDemo ? t.demoBadge : dataStatus.mode === 'custom_csv' ? t.csvBadge : t.liveBadge}
            </span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#F3F8EF] hover:bg-[#E4EEDC] text-[#2F6B3F] border border-[#E1E9DC] transition-colors"
            title="Switch Language"
          >
            <Globe2 className="w-3.5 h-3.5 text-[#2F6B3F]" />
            <span>{t.changeLanguage}</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 rounded-lg text-[#26352A] hover:bg-[#F3F8EF] border border-transparent hover:border-[#E1E9DC] transition-all"
              aria-label="Notifications"
            >
              <Bell className="w-4.5 h-4.5 text-[#26352A]" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#B93838] ring-2 ring-white animate-pulse" />
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-[#E1E9DC] p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E1E9DC]">
                  <div className="flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-[#2F6B3F]" />
                    <span className="font-semibold text-sm text-[#26352A]">{t.notifications}</span>
                  </div>
                  {unreadCount > 0 && (
                    <span className="text-[11px] bg-[#EBF5EE] text-[#2F6B3F] font-medium px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {notifications.map(notif => (
                    <div
                      key={notif.id}
                      onClick={() => onMarkNotificationRead(notif.id)}
                      className={`p-2.5 rounded-lg text-xs cursor-pointer transition-colors ${
                        notif.read ? 'bg-[#F3F8EF]/50 hover:bg-[#F3F8EF]' : 'bg-[#EBF5EE] border-l-3 border-[#2F6B3F]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="font-semibold text-[#26352A]">
                          {language === 'hi' ? notif.titleHi : notif.titleEn}
                        </span>
                        <span className="text-[10px] text-[#6B786D] whitespace-nowrap">{notif.date}</span>
                      </div>
                      <p className="text-[#6B786D] mt-1 line-clamp-2">
                        {language === 'hi' ? notif.messageHi : notif.messageEn}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 mt-2 border-t border-[#E1E9DC] text-center">
                  <button
                    onClick={() => setShowNotifMenu(false)}
                    className="text-xs text-[#2F6B3F] font-medium hover:underline"
                  >
                    {t.close}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Farmer Profile Chip */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg bg-[#F3F8EF] hover:bg-[#E4EEDC] border border-[#E1E9DC] transition-all"
            title="View or Edit Farmer Profile"
          >
            <div className="w-6 h-6 rounded-full bg-[#79A95A] text-white flex items-center justify-center text-xs font-semibold">
              {profile.name ? profile.name.charAt(0).toUpperCase() : 'K'}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-[#26352A] leading-tight truncate max-w-[110px]">
                {profile.name || 'Kisan Bhai'}
              </p>
              <p className="text-[10px] text-[#6B786D] leading-none capitalize">
                {profile.district}
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
