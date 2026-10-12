import { Language } from '../types';

export const TRANSLATIONS = {
  en: {
    appName: 'FasalSetu',
    tagline: 'Know the Market. Calculate Your Costs. Sell Smarter.',
    subtitle: 'AI-Powered Mandi Comparison & Net Earnings Platform for Indian Farmers',

    // Nav
    navOverview: 'Overview',
    navCompare: 'Compare Mandis',
    navTrends: 'Price Trends',
    navSaved: 'Saved Mandis',
    navMyFarm: 'My Farm & Profile',
    navDataSource: 'Data Sources & CSV',
    navHelp: 'Help & Knowledge',
    navPlans: 'Plans & Pricing',

    // Header
    demoBadge: 'Demo Mode (Agmarknet)',
    liveBadge: 'Live Gov API Active',
    csvBadge: 'Custom CSV Loaded',
    switchDataSource: 'Manage Source',
    notifications: 'Notifications',
    profile: 'Farmer Profile',
    changeLanguage: 'हिंदी',
    planBadgeFree: 'Free Kisan',
    planBadgePlus: 'Kisan Plus ⭐',
    planBadgeFpo: 'FPO Group 🏢',

    // Dashboard
    namaste: 'Namaste, Kisan Bhai!',
    welcomeDesc: 'Find the nearby mandi that delivers the highest net cash in your pocket after all transport and loading costs.',
    ctaCompare: 'Compare Mandis Now',
    ctaTrends: 'View Price Trends',
    ctaMap: 'View Mandi Map',

    // Summary tiles
    summarySelectedCrop: 'Selected Crop',
    summaryDate: 'Latest Market Date',
    summaryMandisCount: 'Mandis Compared',
    summaryBestNet: 'Best Net Return',
    summaryFreshness: 'Data Freshness',
    freshLabel: 'Verified Fresh (24-48h)',
    moderateLabel: 'Moderate (3-5 days)',
    staleLabel: 'Stale (> 6 days)',

    // Recommended card
    recommendedTitle: 'Top Recommended Mandi',
    recommendedBadge: 'Highest Net Earnings',
    seeWhyRecommended: 'See Why This Mandi is Recommended',
    modalPriceLabel: 'Reported Modal Price',
    minMaxLabel: 'Min - Max Range',
    distanceLabel: 'Estimated Distance',
    transportCostLabel: 'Estimated Transport Cost',
    grossProceedsLabel: 'Gross Sale Value',
    netProceedsLabel: 'Estimated Net In Pocket',
    extraGainVsNearest: 'Extra Profit vs Nearest Mandi',
    mandiSource: 'Source',
    marketArrivals: 'Daily Arrivals',
    tonnes: 'tonnes',

    // Comparison Form
    formTitle: 'Enter Crop & Transport Details',
    selectCrop: 'Select Crop',
    harvestQuantity: 'Harvest Quantity',
    selectUnit: 'Unit',
    unitKg: 'Kilograms (kg)',
    unitQuintal: 'Quintals (100 kg)',
    unitTonne: 'Tonnes (1000 kg)',
    locationHeader: 'Your Location / Origin',
    selectState: 'State',
    selectDistrict: 'District',
    villageName: 'Village / Town (Optional)',
    maxDistance: 'Maximum Travel Distance',
    transportOptions: 'Transport & Vehicle Cost',
    vehicleType: 'Vehicle Type',
    ratePerKm: 'Rate per km (₹)',
    roundTrip: 'Calculate Round Trip (Both Ways)',
    oneWay: 'One-Way Transit',
    additionalCosts: 'Additional Selling Costs (Optional)',
    loadingCost: 'Loading Cost (₹/Quintal)',
    unloadingCost: 'Unloading Cost (₹/Quintal)',
    mandiFee: 'Mandi Cess / APMC Fee (%)',
    otherFee: 'Gunny Bags / Cleaning (₹ flat)',
    calculateBtn: 'Calculate & Compare Mandis',
    resetBtn: 'Reset to Defaults',

    // Comparison Results
    resultsTitle: 'Mandi Comparison Results',
    resultsSubtitle: 'Ranked by highest estimated net earnings after all transport and mandi deductions',
    sortBy: 'Sort By',
    sortNetProceeds: 'Highest Net Earnings',
    sortModalPrice: 'Highest Modal Price',
    sortDistance: 'Shortest Distance',
    sortTransportCost: 'Lowest Transport Cost',
    sortFreshness: 'Most Recent Data',
    viewCards: 'Card View',
    viewTable: 'Data Table',
    noMandisFound: 'No mandis found matching your criteria. Try increasing your maximum distance slider.',

    // Card Details
    netInPocket: 'Net In Pocket',
    deductionsTotal: 'Total Deductions',
    detailsBtn: 'View Cost Breakdown',
    saveMandiBtn: 'Save Mandi',
    savedMandiBtn: 'Saved',

    // Calculation Breakdown Modal
    breakdownTitle: 'Transparent Net Earnings Calculation',
    breakdownSubtitle: 'Step-by-step mathematical breakdown for',
    step1Gross: 'Step 1: Gross Crop Proceeds',
    step2Transport: 'Step 2: Transport & Haulage Cost',
    step3Loading: 'Step 3: Loading & Unloading Labor',
    step4Cess: 'Step 4: Mandi Cess & Additional Charges',
    step5Net: 'Step 5: Final Estimated Net Earnings',
    effectivePerQuintal: 'Effective Net Price Realized',
    disclaimerTitle: 'Important Advisory for Farmers',
    disclaimerText: 'All figures are estimates. Realized price can vary based on crop grading, moisture content, daily supply-demand shifts, and live bidding at the mandi auction platform.',

    // Trends view
    trendsTitle: 'Price Trends & Market Intelligence',
    trendsSubtitle: 'Historical 30-day modal price movement across major APMC markets',
    trendRising: 'Rising (+ Demand Strong)',
    trendFalling: 'Falling (- Supply Heavy)',
    trendStable: 'Stable (Consistent)',
    aiAdvisorTitle: 'FasalSetu Market Intelligence & Advisory',
    priceSpreadTitle: 'APMC Inter-Mandi Price Spread',

    // Data Source Modal
    dataSourceTitle: 'Government Market Data Integration',
    dataSourceDesc: 'FasalSetu uses standardized schemas matching Government of India Agmarknet and e-NAM portals.',
    currentSource: 'Current Active Data Source',
    uploadCsv: 'Import Government / APMC CSV File',
    uploadCsvDesc: 'Upload a legitimate CSV export from Agmarknet or data.gov.in',
    downloadSampleCsv: 'Download Sample CSV Template',
    apiKeySection: 'Connect Live data.gov.in API',
    apiKeyDesc: 'Enter your free Open Government Data (data.gov.in) API key for real-time live price updates.',
    saveApiKey: 'Save API Key & Connect',

    // Map
    mapTitle: 'Interactive Mandi Route & Price Map',
    mapSubtitle: 'Visualize nearby mandis, distance radius, and net profit differences',
    originLabel: 'Your Location',

    // My Farm / Profile
    myFarmTitle: 'My Farm & Farmer Profile',
    myFarmSubtitle: 'Save your standard crops, harvest sizes, and transport rates to speed up daily checks.',
    farmerName: 'Farmer Name / FPO Name',
    saveProfileBtn: 'Save Profile Changes',
    profileSavedSuccess: 'Profile saved successfully!',

    // Subscription & Plans
    subModalTitle: 'Choose Your FasalSetu Plan',
    subModalSubtitle: 'Fair, transparent pricing for Indian farmers and cooperatives. No hidden charges.',
    billingMonthly: 'Monthly Billing',
    billingYearly: 'Annual Plan (Save 14%)',
    continueFree: 'Continue with Free Plan',
    currentPlan: 'Your Current Plan',
    upgradeToPlus: 'Upgrade to Kisan Plus',
    upgradeToFpo: 'Choose FPO Group Plan',
    manageSubscription: 'Manage Subscription',
    comparisonMatrixTitle: 'Detailed Plan Feature Comparison',
    activePlanStatus: 'Active Plan',
    cancelledPlanStatus: 'Auto-Renewal Cancelled',
    expiredPlanStatus: 'Subscription Expired',
    renewalDateLabel: 'Next Renewal / Expiry',
    dailyLimitNotice: 'Free Tier Daily Comparisons',
    dailyLimitExceeded: 'You have reached the 5 daily comparisons on Free Kisan. Resets tomorrow, or upgrade to Plus for unlimited comparisons.',
    managePlanBtn: 'Manage Plan & Billing',

    // Checkout
    checkoutTitle: 'Secure Subscription Checkout',
    checkoutTestNotice: 'Sandbox Test Mode (Razorpay Test Gateway)',
    orderSummary: 'Order Summary',
    planSelected: 'Selected Plan',
    billingCycle: 'Billing Interval',
    totalPayable: 'Total Payable (Incl. taxes)',
    testPaySuccessBtn: 'Complete Test Payment (Simulate Success)',
    testPayFailureBtn: 'Simulate Bank Decline (Test Failure)',
    paymentSuccessTitle: 'Subscription Activated Successfully!',
    paymentSuccessMsg: 'Your plan has been upgraded with all premium agricultural capabilities.',
    paymentFailedTitle: 'Payment Could Not Be Completed',
    paymentFailedMsg: 'The issuing bank declined this transaction. No amount was deducted.',
    retryPayment: 'Try Again',
    transactionIdLabel: 'Transaction ID',
    supportContact: 'Kisan Support: 1800-180-1551 (Toll-Free) or help@fasalsetu.in',

    // Ads
    sponsoredAdLabel: 'Sponsored Agri Partner',
    adDisclosure: 'Sponsored listings do not influence mandi rates, distances, or algorithm rankings.',
    removeAdsWithPlus: 'Remove all ads with Kisan Plus (₹29/mo)',

    // Common
    rupees: '₹',
    perQuintal: '/q',
    km: 'km',
    close: 'Close',
  },

  hi: {
    appName: 'फसलसेतु',
    tagline: 'मंडी को जानें। लागत घटाएं। मुनाफा बढ़ाएं।',
    subtitle: 'भारतीय किसान भाइयों के लिए AI-संचालित मंडी तुलना और शुद्ध मुनाफा कैलकुलेटर',

    // Nav
    navOverview: 'मुख्य पृष्ठ (डैशबोर्ड)',
    navCompare: 'मंडी तुलना करें',
    navTrends: 'भाव का रुझान',
    navSaved: 'पसंदीदा मंडियां',
    navMyFarm: 'मेरा खेत व प्रोफाइल',
    navDataSource: 'डेटा स्रोत व CSV',
    navHelp: 'मदद एवं जानकारी',
    navPlans: 'प्लान व सब्सक्रिप्शन',

    // Header
    demoBadge: 'नमूना डेटा (Agmarknet)',
    liveBadge: 'लाइव सरकारी API सक्रिय',
    csvBadge: 'कस्टम CSV लोड है',
    switchDataSource: 'स्रोत बदलें',
    notifications: 'सूचनाएं',
    profile: 'किसान प्रोफाइल',
    changeLanguage: 'English',
    planBadgeFree: 'फ्री किसान',
    planBadgePlus: 'किसान प्लस ⭐',
    planBadgeFpo: 'FPO समूह 🏢',

    // Dashboard
    namaste: 'नमस्ते, किसान भाई!',
    welcomeDesc: 'जानें किस मंडी में बेचने पर परिवहन और हम्माली खर्च काटने के बाद आपकी जेब में सबसे ज्यादा शुद्ध मुनाफा बचेगा।',
    ctaCompare: 'अभी मंडी तुलना करें',
    ctaTrends: 'भाव के रुझान देखें',
    ctaMap: 'मंडी का नक्शा देखें',

    // Summary tiles
    summarySelectedCrop: 'चुनी गई फसल',
    summaryDate: 'ताजा भाव की तारीख',
    summaryMandisCount: 'कुल तुलना मंडियां',
    summaryBestNet: 'अधिकतम शुद्ध कमाई',
    summaryFreshness: 'डेटा की स्थिति',
    freshLabel: 'ताजा सत्यापित (24-48 घंटे)',
    moderateLabel: 'सामान्य (3-5 दिन पुराना)',
    staleLabel: 'पुराना (> 6 दिन)',

    // Recommended card
    recommendedTitle: 'सबसे ज्यादा फायदे वाली मंडी',
    recommendedBadge: 'सर्वाधिक शुद्ध आय',
    seeWhyRecommended: 'देखें यह मंडी क्यों अनुशंसित है',
    modalPriceLabel: 'मॉडल (औसत) भाव',
    minMaxLabel: 'न्यूनतम - अधिकतम भाव',
    distanceLabel: 'अनुमानित सड़क दूरी',
    transportCostLabel: 'अनुमानित भाड़ा (किराया)',
    grossProceedsLabel: 'कुल बिक्री मूल्य (ग्रॉस)',
    netProceedsLabel: 'जेब में शुद्ध बचत (नेट)',
    extraGainVsNearest: 'नज़दीकी मंडी से अतिरिक्त लाभ',
    mandiSource: 'डेटा स्रोत',
    marketArrivals: 'दैनिक आवक',
    tonnes: 'टन',

    // Comparison Form
    formTitle: 'फसल और परिवहन की जानकारी भरें',
    selectCrop: 'फसल चुनें',
    harvestQuantity: 'फसल की कुल मात्रा',
    selectUnit: 'माप की इकाई',
    unitKg: 'किलोग्राम (kg)',
    unitQuintal: 'क्विंटल (100 kg)',
    unitTonne: 'टन (1000 kg)',
    locationHeader: 'आपका गाँव / क्षेत्र',
    selectState: 'राज्य',
    selectDistrict: 'जिला',
    villageName: 'गाँव / कस्बा (वैकल्पिक)',
    maxDistance: 'अधिकतम दूरी (किमी)',
    transportOptions: 'वाहन और भाड़ा दर',
    vehicleType: 'वाहन का प्रकार',
    ratePerKm: 'प्रति किमी दर (₹)',
    roundTrip: 'आना-जाना दोनों तरफ का भाड़ा जोड़ें',
    oneWay: 'केवल एक तरफ का भाड़ा',
    additionalCosts: 'अन्य मंडी खर्चे (वैकल्पिक)',
    loadingCost: 'लदाई / हम्माली (₹/क्विंटल)',
    unloadingCost: 'उतराई खर्च (₹/क्विंटल)',
    mandiFee: 'मंडी टैक्स / यूजर शुल्क (%)',
    otherFee: 'बोरी / सफाई / तौल पर्ची (₹ कुल)',
    calculateBtn: 'मंडियों की तुलना करें',
    resetBtn: 'डिफ़ॉल्ट रीसेट करें',

    // Comparison Results
    resultsTitle: 'मंडी तुलना परिणाम',
    resultsSubtitle: 'भाड़ा और सभी खर्चे काटने के बाद शुद्ध बचत के आधार पर रैंक की गई सूची',
    sortBy: 'क्रमबद्ध करें',
    sortNetProceeds: 'सर्वाधिक शुद्ध कमाई (नेट)',
    sortModalPrice: 'सर्वाधिक मॉडल भाव',
    sortDistance: 'सबसे कम दूरी',
    sortTransportCost: 'सबसे कम भाड़ा',
    sortFreshness: 'सबसे ताजा डेटा',
    viewCards: 'कार्ड दृश्य',
    viewTable: 'तालिका दृश्य',
    noMandisFound: 'इस दूरी में कोई मंडी नहीं मिली। कृपया दूरी का दायरा बढ़ाएं।',

    // Card Details
    netInPocket: 'जेब में शुद्ध बचत',
    deductionsTotal: 'कुल कुल खर्चे',
    detailsBtn: 'हिसाब-किताब देखें',
    saveMandiBtn: 'सेव करें',
    savedMandiBtn: 'सेव्ड',

    // Calculation Breakdown Modal
    breakdownTitle: 'पारदर्शी शुद्ध कमाई का हिसाब',
    breakdownSubtitle: 'पूरी गणितीय गणना',
    step1Gross: 'चरण 1: फसल का कुल मूल्य (ग्रॉस)',
    step2Transport: 'चरण 2: परिवहन भाड़ा (किराया)',
    step3Loading: 'चरण 3: लदाई और उतराई मजदूरी',
    step4Cess: 'चरण 4: मंडी शुल्क व अन्य खर्चे',
    step5Net: 'चरण 5: जेब में कुल शुद्ध बचत (नेट)',
    effectivePerQuintal: 'वास्तविक प्रति क्विंटल शुद्ध मिला भाव',
    disclaimerTitle: 'किसान भाइयों के लिए जरूरी सलाह',
    disclaimerText: 'यह गणना अनुमानित है। वास्तविक भाव फसल की गुणवत्ता (क्वालिटी), नमी, ग्रेडिंग और मंडी की खुली बोली (नीलामी) पर निर्भर करता है।',

    // Trends view
    trendsTitle: 'भाव का रुझान एवं बाजार सलाह',
    trendsSubtitle: 'विगत 30 दिनों में प्रमुख मंडियों में मॉडल भाव का उतार-चढ़ाव',
    trendRising: 'बढ़ रहा है (+ मांग तेज)',
    trendFalling: 'घट रहा है (- आवक भारी)',
    trendStable: 'स्थिर (सामान्य भाव)',
    aiAdvisorTitle: 'फसलसेतु बाजार सलाह एवं सुझाव',
    priceSpreadTitle: 'मंडियों के बीच भाव का अंतर',

    // Data Source Modal
    dataSourceTitle: 'सरकारी मंडी डेटा प्रणाली',
    dataSourceDesc: 'फसलसेतु भारत सरकार के एगमार्कनेट (Agmarknet) और e-NAM पोर्टल के डेटा मानकों का उपयोग करता है।',
    currentSource: 'वर्तमान सक्रिय डेटा स्रोत',
    uploadCsv: 'सरकारी / मंडी CSV फाइल अपलोड करें',
    uploadCsvDesc: 'Agmarknet या data.gov.in से डाउनलोड की गई वैध CSV फ़ाइल अपलोड करें',
    downloadSampleCsv: 'नमूना CSV टेम्पलेट डाउनलोड करें',
    apiKeySection: 'लाइव data.gov.in API जोड़ें',
    apiKeyDesc: 'रियल-टाइम सरकारी भाव प्राप्त करने के लिए अपनी निःशुल्क data.gov.in API Key दर्ज करें।',
    saveApiKey: 'API Key सुरक्षित करें व जोड़ें',

    // Map
    mapTitle: 'मंडी मार्ग एवं भाव का नक्शा',
    mapSubtitle: 'नक्शे पर देखें निकटतम मंडियों की दूरी और मुनाफे का अंतर',
    originLabel: 'आपका स्थान',

    // My Farm / Profile
    myFarmTitle: 'मेरा खेत एवं किसान प्रोफाइल',
    myFarmSubtitle: 'अपनी मुख्य फसलें, औसत उपज और वाहन प्राथमिकताएं सुरक्षित रखें।',
    farmerName: 'किसान भाई / FPO का नाम',
    saveProfileBtn: 'प्रोफाइल सुरक्षित करें',
    profileSavedSuccess: 'प्रोफाइल सफलतापूर्वक सुरक्षित हो गई!',

    // Subscription & Plans
    subModalTitle: 'अपनी पसंद का फसलसेतु प्लान चुनें',
    subModalSubtitle: 'भारतीय किसान भाइयों और FPO के लिए पारदर्शी व किफायती योजनाएं।',
    billingMonthly: 'मासिक बिलिंग',
    billingYearly: 'वार्षिक प्लान (14% छूट)',
    continueFree: 'फ्री प्लान के साथ आगे बढ़ें',
    currentPlan: 'आपका वर्तमान प्लान',
    upgradeToPlus: 'किसान प्लस में अपग्रेड करें',
    upgradeToFpo: 'FPO ग्रुप प्लान चुनें',
    manageSubscription: 'सब्सक्रिप्शन प्रबंधन',
    comparisonMatrixTitle: 'विस्तृत प्लान सुविधा तुलना',
    activePlanStatus: 'सक्रिय प्लान',
    cancelledPlanStatus: 'स्वतः रिन्यूअल रद्द है',
    expiredPlanStatus: 'प्लान समाप्त हो गया',
    renewalDateLabel: 'अगली रिन्यूअल / समाप्ति तिथि',
    dailyLimitNotice: 'फ्री प्लान दैनिक तुलना सीमा',
    dailyLimitExceeded: 'आपने आज की 5 फ्री तुलनाएं पूरी कर ली हैं। मध्यरात्रि में रीसेट होगी, अथवा असीमित तुलना के लिए प्लस लें।',
    managePlanBtn: 'प्लान व बिलिंग देखें',

    // Checkout
    checkoutTitle: 'सुरक्षित सब्सक्रिप्शन चेकआउट',
    checkoutTestNotice: 'सैंडबॉक्स टेस्ट मोड (रेज़रपे टेस्ट गेटवे)',
    orderSummary: 'ऑर्डर विवरण',
    planSelected: 'चुना गया प्लान',
    billingCycle: 'बिलिंग चक्र',
    totalPayable: 'कुल देय राशि (करों सहित)',
    testPaySuccessBtn: 'सफल भुगतान टेस्ट करें (Simulate Success)',
    testPayFailureBtn: 'बैंक अस्वीकृति टेस्ट करें (Simulate Failure)',
    paymentSuccessTitle: 'सब्सक्रिप्शन सफलतापूर्वक सक्रिय!',
    paymentSuccessMsg: 'आपके खाते में सभी प्रीमियम सुविधाएं तुरंत सक्रिय कर दी गई हैं।',
    paymentFailedTitle: 'भुगतान पूरा नहीं हो सका',
    paymentFailedMsg: 'बैंक द्वारा लेनदेन अस्वीकार कर दिया गया। खाते से कोई राशि नहीं कटी।',
    retryPayment: 'पुनः प्रयास करें',
    transactionIdLabel: 'लेनदेन आईडी (Transaction ID)',
    supportContact: 'किसान सहायता: 1800-180-1551 (टोल-फ्री) या help@fasalsetu.in',

    // Ads
    sponsoredAdLabel: 'प्रायोजित कृषि सेवा (विज्ञापन)',
    adDisclosure: 'प्रायोजित विज्ञापन मंडी भाव या शुद्ध बचत की गणना को बिल्कुल प्रभावित नहीं करते।',
    removeAdsWithPlus: 'किसान प्लस के साथ विज्ञापन हटाएं (₹29/माह)',

    // Common
    rupees: '₹',
    perQuintal: '/क्विंटल',
    km: 'किमी',
    close: 'बंद करें',
  }
};

export function getTranslation(lang: Language) {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}
