import React, { useState, useEffect, useMemo } from 'react';
import { 
  Language, 
  ComparisonInput, 
  ComparisonResult, 
  MandiRecord, 
  FarmerProfile, 
  NotificationItem,
  UserSubscription,
  SubscriptionTier,
  BillingCycle
} from './types';
import { CROPS } from './data/crops';
import { findDistrictCoordinates } from './data/locations';
import { dataService, DataSourceStatus } from './services/dataService';
import { storageService } from './services/storageService';
import { subscriptionService } from './services/subscriptionService';
import { compareAndRankMandis } from './services/calculationEngine';
import { getTranslation } from './services/i18n';

// Core Components
import { Navbar } from './components/Navbar';
import { Sidebar, NavigationTab } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { WelcomePanel } from './components/Dashboard/WelcomePanel';
import { QuickMarketSummary } from './components/Dashboard/QuickMarketSummary';
import { RecommendedMandiCard } from './components/Dashboard/RecommendedMandiCard';
import { ComparisonForm } from './components/Compare/ComparisonForm';
import { ComparisonResults } from './components/Compare/ComparisonResults';
import { CalculationModal } from './components/Compare/CalculationModal';
import { PriceTrendsView } from './components/Trends/PriceTrendsView';
import { MandiMap } from './components/Map/MandiMap';
import { SavedMandisView } from './components/Saved/SavedMandisView';
import { MyFarmView } from './components/MyFarm/MyFarmView';
import { DataSourceModal } from './components/DataImport/DataSourceModal';
import { HelpFeedbackModal } from './components/Help/HelpFeedbackModal';

// Subscription & Ads Components
import { DashboardBannerAd } from './components/Ads/DashboardBannerAd';
import { SubscriptionPlansView } from './components/Subscription/SubscriptionPlansView';
import { CheckoutModal } from './components/Subscription/CheckoutModal';
import { SubscriptionOnboardingModal } from './components/Subscription/SubscriptionOnboardingModal';

export const App: React.FC = () => {
  // 1. Persistent State
  const [language, setLanguage] = useState<Language>(() => storageService.getLanguage());
  const [profile, setProfile] = useState<FarmerProfile>(() => storageService.getProfile());
  const [savedMandiIds, setSavedMandiIds] = useState<string[]>(() => storageService.getSavedMandiIds());
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => storageService.getNotifications());
  const [subscription, setSubscription] = useState<UserSubscription>(() => subscriptionService.getSubscription());

  // 2. Navigation State
  const [currentTab, setCurrentTab] = useState<NavigationTab>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 3. Data Service State
  const [dataStatus, setDataStatus] = useState<DataSourceStatus>(() => dataService.getStatus());
  const [allMandis, setAllMandis] = useState<MandiRecord[]>([]);
  const [isDataSourceModalOpen, setIsDataSourceModalOpen] = useState(false);

  // 4. Subscription & Checkout Modal States
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTier, setCheckoutTier] = useState<SubscriptionTier>('plus');
  const [checkoutCycle, setCheckoutCycle] = useState<BillingCycle>('monthly');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => !profile.isOnboarded);

  // 5. Calculation State
  const [selectedCalculation, setSelectedCalculation] = useState<ComparisonResult | null>(null);

  const initialCropId = profile.primaryCrops?.[0] || 'onion';
  const [comparisonInput, setComparisonInput] = useState<ComparisonInput>({
    cropId: initialCropId,
    quantity: profile.typicalQuantity || 35,
    unit: profile.preferredUnit || 'quintal',
    state: profile.state || 'maharashtra',
    district: profile.district || 'nashik',
    village: profile.village || 'Niphad',
    maxDistanceKm: 120,
    vehicleId: profile.vehicleType || 'bolero',
    transportRatePerKm: profile.transportRatePerKm || 22,
    isRoundTrip: false,
    loadingCostPerQuintal: 15,
    unloadingCostPerQuintal: 10,
    mandiFeePercent: 1.0,
    otherDeductions: 100,
  });

  // Load Mandis
  const refreshMandis = async () => {
    const list = await dataService.getMandiRecords();
    setAllMandis(list);
    setDataStatus(dataService.getStatus());
  };

  useEffect(() => {
    refreshMandis();
  }, []);

  const refreshSubscription = () => {
    setSubscription(subscriptionService.getSubscription());
  };

  // Language change
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    storageService.setLanguage(lang);
  };

  // Farmer profile updates
  const handleSaveProfile = (updated: FarmerProfile) => {
    setProfile(updated);
    storageService.saveProfile(updated);
    setComparisonInput(prev => ({
      ...prev,
      state: updated.state,
      district: updated.district,
      village: updated.village,
      quantity: updated.typicalQuantity,
      unit: updated.preferredUnit,
      transportRatePerKm: updated.transportRatePerKm,
    }));
  };

  // Toggle Saved Mandi
  const handleToggleSaved = (id: string) => {
    // If on Free plan and already has 2 saved mandis, prompt upgrade to Kisan Plus
    if (subscription.plan === 'free' && !savedMandiIds.includes(id) && savedMandiIds.length >= 2) {
      handleOpenCheckout('plus', 'monthly');
      return;
    }
    const updated = storageService.toggleSavedMandi(id);
    setSavedMandiIds(updated);
  };

  // Mark notification read
  const handleMarkNotificationRead = (id: string) => {
    const updated = storageService.markNotificationAsRead(id);
    setNotifications(updated);
  };

  // Open checkout modal
  const handleOpenCheckout = (tier: SubscriptionTier, cycle: BillingCycle) => {
    setCheckoutTier(tier);
    setCheckoutCycle(cycle);
    setIsCheckoutOpen(true);
  };

  // Checkout successful
  const handleCheckoutSuccess = () => {
    refreshSubscription();
    // Notification for successful upgrade
    const newNotif: NotificationItem = {
      id: `sub_success_${Date.now()}`,
      titleEn: 'Subscription Activated',
      titleHi: 'सब्सक्रिप्शन सक्रिय हो गया',
      messageEn: `Welcome to ${checkoutTier === 'plus' ? 'Kisan Plus' : 'FPO Group'}! Enjoy ad-free and unlimited comparisons.`,
      messageHi: `${checkoutTier === 'plus' ? 'किसान प्लस' : 'FPO ग्रुप'} में स्वागत है! असीमित तुलना व विज्ञापन-मुक्त अनुभव का आनंद लें।`,
      type: 'market_update',
      date: 'Just now',
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Onboarding Plan Selection
  const handleOnboardingSelectPlan = (tier: SubscriptionTier, cycle: BillingCycle) => {
    setIsOnboardingOpen(false);
    const updatedProfile = { ...profile, isOnboarded: true };
    setProfile(updatedProfile);
    storageService.saveProfile(updatedProfile);
    handleOpenCheckout(tier, cycle);
  };

  const handleOnboardingContinueFree = () => {
    setIsOnboardingOpen(false);
    const updatedProfile = { ...profile, isOnboarded: true };
    setProfile(updatedProfile);
    storageService.saveProfile(updatedProfile);
  };

  // Calculate execution with quota enforcement
  const handlePerformCalculation = () => {
    const check = subscriptionService.canPerformComparison();
    if (!check.allowed) {
      handleOpenCheckout('plus', 'monthly');
      return;
    }
    subscriptionService.recordComparison();
    refreshSubscription();
  };

  // Farmer's Origin Coordinates
  const originCoords = useMemo(() => {
    return findDistrictCoordinates(comparisonInput.state, comparisonInput.district);
  }, [comparisonInput.state, comparisonInput.district]);

  // Comparison Results computation
  const comparisonResults = useMemo(() => {
    return compareAndRankMandis(allMandis, comparisonInput, originCoords);
  }, [allMandis, comparisonInput, originCoords]);

  // Top recommended mandi
  const topRecommended = comparisonResults.find(r => r.isRecommended) || comparisonResults[0];

  // Selected crop details
  const selectedCrop = CROPS.find(c => c.id === comparisonInput.cropId) || CROPS[0];

  // Saved Mandis records
  const savedMandisRecords = useMemo(() => {
    return allMandis.filter(m => savedMandiIds.includes(m.id));
  }, [allMandis, savedMandiIds]);

  const handleSelectTab = (tab: NavigationTab) => {
    setCurrentTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompareWithMandi = (mandi: MandiRecord) => {
    setComparisonInput(prev => ({
      ...prev,
      cropId: mandi.commodityId,
      state: mandi.state.toLowerCase().replace(/\s+/g, '_'),
      district: mandi.district.toLowerCase().replace(/\s+/g, '_'),
    }));
    handlePerformCalculation();
    setCurrentTab('compare');
  };

  const t = getTranslation(language);

  return (
    <div className="min-h-screen bg-[#F3F8EF] flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        dataStatus={dataStatus}
        onOpenDataSourceModal={() => setIsDataSourceModalOpen(true)}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        profile={profile}
        onOpenProfile={() => handleSelectTab('myfarm')}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
        subscription={subscription}
        onOpenPlans={() => handleSelectTab('plans')}
      />

      {/* Main Layout Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto pb-16 md:pb-6">
        {/* Desktop Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={handleSelectTab}
          language={language}
          savedCount={savedMandiIds.length}
          subscription={subscription}
        />

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex">
            <div className="w-72 bg-white h-full p-4 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E1E9DC]">
                  <span className="font-bold text-[#2F6B3F] text-base">FasalSetu Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 rounded-lg text-[#6B786D]"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => handleSelectTab('overview')}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium ${
                      currentTab === 'overview' ? 'bg-[#2F6B3F] text-white font-bold' : 'text-[#26352A]'
                    }`}
                  >
                    {t.navOverview}
                  </button>
                  <button
                    onClick={() => handleSelectTab('compare')}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium ${
                      currentTab === 'compare' ? 'bg-[#2F6B3F] text-white font-bold' : 'text-[#26352A]'
                    }`}
                  >
                    {t.navCompare}
                  </button>
                  <button
                    onClick={() => handleSelectTab('plans')}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium ${
                      currentTab === 'plans' ? 'bg-[#2F6B3F] text-white font-bold' : 'text-[#26352A]'
                    }`}
                  >
                    {t.navPlans} ({subscription.plan.toUpperCase()})
                  </button>
                  <button
                    onClick={() => handleSelectTab('trends')}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium ${
                      currentTab === 'trends' ? 'bg-[#2F6B3F] text-white font-bold' : 'text-[#26352A]'
                    }`}
                  >
                    {t.navTrends}
                  </button>
                  <button
                    onClick={() => handleSelectTab('map')}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium ${
                      currentTab === 'map' ? 'bg-[#2F6B3F] text-white font-bold' : 'text-[#26352A]'
                    }`}
                  >
                    {t.mapTitle}
                  </button>
                  <button
                    onClick={() => handleSelectTab('saved')}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium ${
                      currentTab === 'saved' ? 'bg-[#2F6B3F] text-white font-bold' : 'text-[#26352A]'
                    }`}
                  >
                    {t.navSaved} ({savedMandiIds.length})
                  </button>
                  <button
                    onClick={() => handleSelectTab('myfarm')}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium ${
                      currentTab === 'myfarm' ? 'bg-[#2F6B3F] text-white font-bold' : 'text-[#26352A]'
                    }`}
                  >
                    {t.navMyFarm}
                  </button>
                  <button
                    onClick={() => {
                      setIsDataSourceModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-[#26352A]"
                  >
                    {t.navDataSource}
                  </button>
                  <button
                    onClick={() => handleSelectTab('help')}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium ${
                      currentTab === 'help' ? 'bg-[#2F6B3F] text-white font-bold' : 'text-[#26352A]'
                    }`}
                  >
                    {t.navHelp}
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E1E9DC] text-center text-xs text-[#6B786D]">
                FasalSetu Hackathon Prototype
              </div>
            </div>
            <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
          </div>
        )}

        {/* Dynamic Main Workspace Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {currentTab === 'overview' && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <WelcomePanel
                language={language}
                profile={profile}
                onNavigate={tab => handleSelectTab(tab)}
              />

              {/* Reserved Dashboard Banner Ad (Hidden completely for paid subscribers) */}
              <DashboardBannerAd
                subscription={subscription}
                language={language}
                onUpgradeClick={() => handleOpenCheckout('plus', 'monthly')}
              />

              {/* 4 Summary Metric Cards */}
              <QuickMarketSummary
                selectedCrop={selectedCrop}
                latestDate="12 Oct 2026"
                usableMandisCount={comparisonResults.length}
                bestResult={topRecommended}
                language={language}
              />

              {/* Recommended Mandi Card (Primary Decision Feature) */}
              {topRecommended && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-base font-bold text-[#26352A] flex items-center gap-2">
                      <span>🏆 {t.recommendedTitle}</span>
                    </h2>
                    <button
                      onClick={() => handleSelectTab('compare')}
                      className="text-xs font-semibold text-[#2F6B3F] hover:underline"
                    >
                      {language === 'hi' ? 'सभी मंडियां देखें →' : 'View all options →'}
                    </button>
                  </div>
                  <RecommendedMandiCard
                    result={topRecommended}
                    language={language}
                    onOpenCalculationModal={res => setSelectedCalculation(res)}
                    onSaveMandi={handleToggleSaved}
                    isSaved={savedMandiIds.includes(topRecommended.mandi.id)}
                  />
                </div>
              )}

              {/* Quick Comparison Section Embedded */}
              <div className="pt-2">
                <ComparisonForm
                  input={comparisonInput}
                  onChangeInput={setComparisonInput}
                  onCalculate={() => {
                    handlePerformCalculation();
                    handleSelectTab('compare');
                  }}
                  language={language}
                  subscription={subscription}
                  onOpenUpgrade={() => handleOpenCheckout('plus', 'monthly')}
                />
              </div>
            </div>
          )}

          {/* TAB 2: COMPARE MANDIS (CORE FEATURE) */}
          {currentTab === 'compare' && (
            <div className="space-y-6">
              <ComparisonForm
                input={comparisonInput}
                onChangeInput={setComparisonInput}
                onCalculate={handlePerformCalculation}
                language={language}
                subscription={subscription}
                onOpenUpgrade={() => handleOpenCheckout('plus', 'monthly')}
              />

              <ComparisonResults
                results={comparisonResults}
                language={language}
                onOpenCalculationModal={res => setSelectedCalculation(res)}
                onSaveMandi={handleToggleSaved}
                savedMandiIds={savedMandiIds}
                subscription={subscription}
                onOpenUpgrade={() => handleOpenCheckout('fpo', 'monthly')}
              />
            </div>
          )}

          {/* TAB 3: PRICE TRENDS */}
          {currentTab === 'trends' && (
            <PriceTrendsView language={language} />
          )}

          {/* TAB 4: INTERACTIVE MAP */}
          {currentTab === 'map' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-[#E1E9DC] shadow-xs">
                <h1 className="text-lg font-bold text-[#26352A]">{t.mapTitle}</h1>
                <p className="text-xs text-[#6B786D]">{t.mapSubtitle}</p>
              </div>

              <MandiMap
                results={comparisonResults}
                originCoords={originCoords}
                originLabel={`${profile.village || 'Farm'}, ${comparisonInput.district}`}
                language={language}
                onSelectMandi={res => setSelectedCalculation(res)}
              />
            </div>
          )}

          {/* TAB 5: SAVED MANDIS */}
          {currentTab === 'saved' && (
            <SavedMandisView
              savedMandis={savedMandisRecords}
              onRemoveSaved={handleToggleSaved}
              onCompareWithMandi={handleCompareWithMandi}
              language={language}
            />
          )}

          {/* TAB 6: MY FARM & PROFILE */}
          {currentTab === 'myfarm' && (
            <MyFarmView
              profile={profile}
              onSaveProfile={handleSaveProfile}
              language={language}
              subscription={subscription}
              onOpenPlans={() => handleSelectTab('plans')}
            />
          )}

          {/* TAB 7: SUBSCRIPTION & PLANS (NEW) */}
          {currentTab === 'plans' && (
            <SubscriptionPlansView
              subscription={subscription}
              language={language}
              onOpenCheckout={handleOpenCheckout}
              onSubscriptionUpdated={refreshSubscription}
            />
          )}

          {/* TAB 8: DATA SOURCES & CSV IMPORT */}
          {currentTab === 'datasource' && (
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="bg-white p-6 rounded-3xl border border-[#E1E9DC] shadow-xs">
                <h1 className="text-xl font-bold text-[#26352A]">{t.dataSourceTitle}</h1>
                <p className="text-xs text-[#6B786D] mt-1">{t.dataSourceDesc}</p>
                <button
                  onClick={() => setIsDataSourceModalOpen(true)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#2F6B3F] text-white text-xs font-bold hover:bg-[#22512F] transition-colors"
                >
                  Open Data Integration Console
                </button>
              </div>
            </div>
          )}

          {/* TAB 9: HELP & KNOWLEDGE */}
          {currentTab === 'help' && (
            <HelpFeedbackModal language={language} />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        language={language}
      />

      {/* Transparent Calculation Breakdown Modal */}
      <CalculationModal
        result={selectedCalculation}
        language={language}
        onClose={() => setSelectedCalculation(null)}
      />

      {/* Data Source & CSV Import Modal */}
      <DataSourceModal
        isOpen={isDataSourceModalOpen}
        onClose={() => setIsDataSourceModalOpen(false)}
        language={language}
        onDataUpdated={refreshMandis}
      />

      {/* Subscription Onboarding Screen Modal */}
      <SubscriptionOnboardingModal
        isOpen={isOnboardingOpen}
        onSelectPlan={handleOnboardingSelectPlan}
        onContinueFree={handleOnboardingContinueFree}
        language={language}
        onLanguageChange={handleLanguageChange}
      />

      {/* Checkout & Payment Gateway Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        tier={checkoutTier}
        cycle={checkoutCycle}
        language={language}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={handleCheckoutSuccess}
      />
    </div>
  );
};

export default App;
