import { ComparisonInput, ComparisonResult, MandiRecord, WeightUnit } from '../types';

/**
 * Calculates Haversine distance in kilometers between two lat/lng points.
 * Multiplied by 1.25 road-factor to approximate Indian highway/rural road route.
 */
export function calculateRoadDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightLine = R * c;

  // Real road multiplier (Indian highways/rural access roads average ~1.22x straight-line)
  const roadKm = Math.round(straightLine * 1.22);
  return Math.max(roadKm, 3); // Minimum 3 km floor
}

/**
 * Converts any weight unit to Kilograms
 */
export function convertToKg(quantity: number, unit: WeightUnit): number {
  switch (unit) {
    case 'kg':
      return quantity;
    case 'quintal':
      return quantity * 100;
    case 'tonne':
      return quantity * 1000;
  }
}

/**
 * Formats Indian Currency (e.g. ₹ 1,23,450)
 */
export function formatINR(val: number): string {
  const rounded = Math.round(val);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(rounded);
}

/**
 * Calculate difference in days from a reference date (defaulting to Oct 12, 2026)
 */
export function getDaysOld(dateStr: string): number {
  try {
    const recordDate = new Date(dateStr);
    const currentDate = new Date('2026-10-12T00:00:00Z');
    const diffTime = Math.abs(currentDate.getTime() - recordDate.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  } catch {
    return 3;
  }
}

/**
 * Comprehensive Net Earnings and Mandi Comparison Engine
 */
export function computeMandiComparison(
  mandi: MandiRecord,
  input: ComparisonInput,
  originCoords: { lat: number; lng: number }
): ComparisonResult {
  // 1. Strict Unit Normalization
  const quantityKg = convertToKg(input.quantity, input.unit);
  const quantityQuintals = quantityKg / 100;

  // 2. Distance Computation
  const calculatedDistance = calculateRoadDistanceKm(
    originCoords.lat,
    originCoords.lng,
    mandi.coordinates.lat,
    mandi.coordinates.lng
  );

  // 3. Gross Proceeds
  // modalPrice is in ₹/quintal (100 kg) -> price per kg = modalPrice / 100
  const pricePerKg = mandi.modalPrice / 100;
  const grossProceeds = quantityKg * pricePerKg; // equivalently: quantityQuintals * mandi.modalPrice

  // 4. Selling Deductions Breakdown
  // Transport Cost
  const billableDistance = input.isRoundTrip ? calculatedDistance * 2 : calculatedDistance;
  const transportCost = Math.round(billableDistance * input.transportRatePerKm);

  // Loading & Unloading Costs
  const loadingCost = Math.round(quantityQuintals * (input.loadingCostPerQuintal || 0));
  const unloadingCost = Math.round(quantityQuintals * (input.unloadingCostPerQuintal || 0));

  // Mandi Fee / Cess (APMC cess, typically 1% to 1.5% of gross sale)
  const mandiFeeCost = Math.round(grossProceeds * ((input.mandiFeePercent || 0) / 100));

  // Other entered costs (gunny bags, weightment receipt, cleaning)
  const otherCosts = Math.round(input.otherDeductions || 0);

  const totalSellingCosts = transportCost + loadingCost + unloadingCost + mandiFeeCost + otherCosts;

  // 5. Estimated Net Proceeds
  const estimatedNetProceeds = Math.round(grossProceeds - totalSellingCosts);
  const effectiveNetPerQuintal = quantityQuintals > 0 
    ? Math.round(estimatedNetProceeds / quantityQuintals)
    : mandi.modalPrice;

  // 6. Data Freshness and Reliability Evaluation
  const daysOld = getDaysOld(mandi.arrivalDate);
  let dataFreshness: 'fresh' | 'moderate' | 'stale' = 'fresh';
  if (daysOld <= 2) {
    dataFreshness = 'fresh';
  } else if (daysOld <= 6) {
    dataFreshness = 'moderate';
  } else {
    dataFreshness = 'stale';
  }

  let confidence: 'high' | 'medium' | 'low' = 'high';
  let confidenceReasonEn = 'Verified market arrivals reported within the last 24-48 hours.';
  let confidenceReasonHi = 'पिछले 24-48 घंटों में सरकारी पोर्टल पर सत्यापित मंडी आवक रिपोर्ट।';

  if (dataFreshness === 'moderate') {
    confidence = 'medium';
    confidenceReasonEn = `Data reported ${daysOld} days ago. Rates may have adjusted slightly.`;
    confidenceReasonHi = `डेटा ${daysOld} दिन पहले रिपोर्ट हुआ था। दरों में मामूली उतार-चढ़ाव संभव है।`;
  } else if (dataFreshness === 'stale') {
    confidence = 'low';
    confidenceReasonEn = `Data is ${daysOld} days old. Mandi arrivals may not reflect today's spot rate.`;
    confidenceReasonHi = `डेटा ${daysOld} दिन पुराना है। आज के हाजिर भाव अलग हो सकते हैं।`;
  }

  // Recommendation score (prioritizing net proceeds while discounting stale data)
  const freshnessPenalty = dataFreshness === 'stale' ? 0.75 : (dataFreshness === 'moderate' ? 0.95 : 1.0);
  const recommendationScore = estimatedNetProceeds * freshnessPenalty;

  return {
    mandi,
    distanceKm: calculatedDistance,
    quantityKg,
    quantityQuintals,
    reportedModalPricePerQuintal: mandi.modalPrice,
    pricePerKg,
    grossProceeds,
    transportCost,
    loadingCost,
    unloadingCost,
    mandiFeeCost,
    otherCosts,
    totalSellingCosts,
    estimatedNetProceeds,
    effectiveNetPerQuintal,
    profitDifferenceVsFirst: 0, // Populated after sorting
    daysOld,
    dataFreshness,
    confidence,
    confidenceReasonEn,
    confidenceReasonHi,
    isRecommended: false,
    recommendationScore,
    recommendationExplanationEn: '',
    recommendationExplanationHi: '',
  };
}

/**
 * Compare all mandis, filter by distance, sort, and tag the top recommended choice
 */
export function compareAndRankMandis(
  mandis: MandiRecord[],
  input: ComparisonInput,
  originCoords: { lat: number; lng: number }
): ComparisonResult[] {
  // Filter for matching crop/commodity
  const cropMandis = mandis.filter(m => 
    m.commodityId.toLowerCase() === input.cropId.toLowerCase() ||
    m.commodity.toLowerCase().includes(input.cropId.toLowerCase())
  );

  if (cropMandis.length === 0) {
    return [];
  }

  // Compute metrics for each mandi
  const results = cropMandis.map(m => computeMandiComparison(m, input, originCoords));

  // Filter by maximum travel distance
  const filtered = results.filter(r => r.distanceKm <= input.maxDistanceKm);

  // If none within distance, keep at least the 3 nearest mandis so user doesn't see a blank screen
  const pool = filtered.length > 0 ? filtered : results.sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 3);

  // Sort by recommendation score (highest net proceeds with freshness weighting)
  pool.sort((a, b) => b.recommendationScore - a.recommendationScore);

  if (pool.length > 0) {
    // Top ranked is recommended
    pool[0].isRecommended = true;

    // Find nearest mandi for baseline comparison
    const nearestMandi = [...pool].sort((a, b) => a.distanceKm - b.distanceKm)[0];
    const topMandi = pool[0];

    // Compute profit difference vs nearest
    for (const item of pool) {
      item.profitDifferenceVsFirst = item.estimatedNetProceeds - nearestMandi.estimatedNetProceeds;
    }

    // Generate bilingual explanation for the recommended mandi
    if (topMandi.mandi.id === nearestMandi.mandi.id) {
      topMandi.recommendationExplanationEn = 
        `This is your nearest mandi (${topMandi.distanceKm} km). Minimal transport cost of ${formatINR(topMandi.transportCost)} maximizes your net proceeds to ${formatINR(topMandi.estimatedNetProceeds)}.`;
      topMandi.recommendationExplanationHi = 
        `यह आपकी सबसे नज़दीकी मंडी है (${topMandi.distanceKm} किमी)। केवल ${formatINR(topMandi.transportCost)} परिवहन खर्च होने से आपको सर्वाधिक शुद्ध आय ${formatINR(topMandi.estimatedNetProceeds)} मिल रही है।`;
    } else {
      const netGain = topMandi.estimatedNetProceeds - nearestMandi.estimatedNetProceeds;
      const extraTransport = topMandi.transportCost - nearestMandi.transportCost;
      const priceDiffPerQ = topMandi.reportedModalPricePerQuintal - nearestMandi.reportedModalPricePerQuintal;

      topMandi.recommendationExplanationEn = 
        `${topMandi.mandi.mandiName} offers ₹${priceDiffPerQ}/q higher rate (${formatINR(topMandi.reportedModalPricePerQuintal)} vs ${formatINR(nearestMandi.reportedModalPricePerQuintal)}). Even after ${formatINR(extraTransport)} additional transport for ${topMandi.distanceKm} km, you gain ${formatINR(netGain)} MORE net in your pocket!`;
      topMandi.recommendationExplanationHi = 
        `${topMandi.mandi.mandiNameHi} में ₹${priceDiffPerQ}/क्विंटल अधिक भाव है (${formatINR(topMandi.reportedModalPricePerQuintal)} बनाम ${formatINR(nearestMandi.reportedModalPricePerQuintal)})। अतिरिक्त ${formatINR(extraTransport)} परिवहन खर्च के बावजूद आपको ${formatINR(netGain)} ज्यादा शुद्ध मुनाफा होगा!`;
    }
  }

  return pool;
}
