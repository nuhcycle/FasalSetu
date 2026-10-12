import React, { useState } from 'react';
import { ComparisonResult, Language, UserSubscription } from '../../types';
import { getTranslation } from '../../services/i18n';
import { formatINR } from '../../services/calculationEngine';
import { SponsoredAgriCard } from '../Ads/SponsoredAgriCard';
import { 
  ArrowUpDown, 
  LayoutGrid, 
  Table as TableIcon, 
  MapPin, 
  Truck, 
  Clock, 
  ShieldCheck, 
  ShieldAlert, 
  AlertCircle,
  HelpCircle,
  Bookmark,
  Download,
  Lock
} from 'lucide-react';

interface ComparisonResultsProps {
  results: ComparisonResult[];
  language: Language;
  onOpenCalculationModal: (result: ComparisonResult) => void;
  onSaveMandi: (id: string) => void;
  savedMandiIds: string[];
  subscription: UserSubscription;
  onOpenUpgrade: () => void;
}

export type SortField = 'netProceeds' | 'modalPrice' | 'distance' | 'transportCost' | 'freshness';

export const ComparisonResults: React.FC<ComparisonResultsProps> = ({
  results,
  language,
  onOpenCalculationModal,
  onSaveMandi,
  savedMandiIds,
  subscription,
  onOpenUpgrade,
}) => {
  const t = getTranslation(language);
  const [sortField, setSortField] = useState<SortField>('netProceeds');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Sorted list
  const sortedResults = [...results].sort((a, b) => {
    switch (sortField) {
      case 'netProceeds':
        return b.estimatedNetProceeds - a.estimatedNetProceeds;
      case 'modalPrice':
        return b.mandi.modalPrice - a.mandi.modalPrice;
      case 'distance':
        return a.distanceKm - b.distanceKm;
      case 'transportCost':
        return a.transportCost - b.transportCost;
      case 'freshness':
        return a.daysOld - b.daysOld;
      default:
        return 0;
    }
  });

  const handleExportCsv = () => {
    if (subscription.plan !== 'fpo') {
      onOpenUpgrade();
      return;
    }

    // Export CSV for FPO tier
    const headers = 'Mandi,District,State,Variety,DistanceKm,ModalPrice_Per_Q,GrossProceeds,TransportCost,TotalDeductions,EstimatedNetProceeds\n';
    const rows = sortedResults.map(r => 
      `"${r.mandi.mandiName}","${r.mandi.district}","${r.mandi.state}","${r.mandi.variety}",${r.distanceKm},${r.reportedModalPricePerQuintal},${r.grossProceeds},${r.transportCost},${r.totalSellingCosts},${r.estimatedNetProceeds}`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `FasalSetu_Mandi_Comparison_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (results.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-[#E1E9DC] p-10 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#FFFDF5] border border-[#E9B949]/30 text-[#E9B949] flex items-center justify-center mx-auto mb-3">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-[#26352A] mb-1">
          {t.noMandisFound}
        </h3>
        <p className="text-xs text-[#6B786D] max-w-md mx-auto">
          {language === 'hi'
            ? 'अधिकतम दूरी का दायरा (स्लाइडर) बढ़ाएं या अन्य प्रमुख फसल का चयन करके पुनः खोजें।'
            : 'Try expanding your maximum distance slider or choose another commodity to view active markets.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls Bar: Sort & View Toggle & FPO Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E1E9DC]">
        <div>
          <h2 className="text-base font-bold text-[#26352A]">{t.resultsTitle}</h2>
          <p className="text-xs text-[#6B786D]">{t.resultsSubtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* FPO Export Button */}
          <button
            onClick={handleExportCsv}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              subscription.plan === 'fpo'
                ? 'bg-[#EBF5EE] text-[#2F6B3F] border-[#79A95A] hover:bg-[#D8ECDD]'
                : 'bg-white text-[#6B786D] border-[#E1E9DC] hover:text-[#26352A]'
            }`}
            title={subscription.plan === 'fpo' ? 'Export to CSV' : 'Upgrade to FPO Plan to Export CSV'}
          >
            {subscription.plan === 'fpo' ? (
              <Download className="w-3.5 h-3.5 text-[#2F6B3F]" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-[#E9B949]" />
            )}
            <span>Export CSV</span>
            {subscription.plan !== 'fpo' && (
              <span className="text-[9px] bg-blue-50 text-blue-700 px-1 py-0.2 rounded font-extrabold">
                FPO
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-[#6B786D]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#2F6B3F]" />
            <select
              value={sortField}
              onChange={e => setSortField(e.target.value as SortField)}
              className="px-2.5 py-1.5 rounded-xl border border-[#E1E9DC] bg-[#F3F8EF] font-semibold text-[#26352A] text-xs focus:outline-none"
            >
              <option value="netProceeds">{t.sortNetProceeds}</option>
              <option value="modalPrice">{t.sortModalPrice}</option>
              <option value="distance">{t.sortDistance}</option>
              <option value="transportCost">{t.sortTransportCost}</option>
              <option value="freshness">{t.sortFreshness}</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-[#F3F8EF] p-1 rounded-xl border border-[#E1E9DC]">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'cards' ? 'bg-white shadow-xs text-[#2F6B3F]' : 'text-[#6B786D]'
              }`}
              title={t.viewCards}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'table' ? 'bg-white shadow-xs text-[#2F6B3F]' : 'text-[#6B786D]'
              }`}
              title={t.viewTable}
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards View */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedResults.map((item, index) => {
            const { mandi } = item;
            const isSaved = savedMandiIds.includes(mandi.id);

            return (
              <div
                key={mandi.id}
                className={`relative rounded-3xl bg-white border p-5 shadow-xs transition-all hover:shadow-md ${
                  item.isRecommended
                    ? 'border-[#79A95A] ring-2 ring-[#79A95A]/20'
                    : 'border-[#E1E9DC]'
                }`}
              >
                {/* Header with rank badge and save button */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#F3F8EF] text-[#2F6B3F] text-xs font-bold flex items-center justify-center border border-[#E1E9DC]">
                      #{index + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-[#26352A] text-base leading-snug">
                        {language === 'hi' ? mandi.mandiNameHi : mandi.mandiName}
                      </h3>
                      <p className="text-xs text-[#6B786D] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#79A95A]" />
                        <span>{mandi.district}, {mandi.state}</span>
                        <span className="font-semibold text-[#2F6B3F]">({item.distanceKm} km)</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onSaveMandi(mandi.id)}
                    className={`p-1.5 rounded-lg text-xs border transition-colors ${
                      isSaved
                        ? 'bg-[#EBF5EE] text-[#2F6B3F] border-[#79A95A]'
                        : 'bg-white text-[#6B786D] border-[#E1E9DC] hover:text-[#26352A]'
                    }`}
                    title={isSaved ? t.savedMandiBtn : t.saveMandiBtn}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#2F6B3F]' : ''}`} />
                  </button>
                </div>

                {/* Price and Deductions Grid */}
                <div className="grid grid-cols-2 gap-2 bg-[#F3F8EF] p-3 rounded-2xl border border-[#E1E9DC] mb-3 text-xs">
                  <div>
                    <span className="text-[#6B786D] block">{t.modalPriceLabel}</span>
                    <strong className="text-base text-[#2F6B3F]">
                      {formatINR(mandi.modalPrice)}
                      <span className="text-[10px] font-normal text-[#6B786D]">{t.perQuintal}</span>
                    </strong>
                    <span className="text-[10px] text-[#8B6848] block">
                      Range: {formatINR(mandi.minPrice)} - {formatINR(mandi.maxPrice)}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#6B786D] block">{t.transportCostLabel}</span>
                    <strong className="text-sm text-[#B93838]">
                      - {formatINR(item.transportCost)}
                    </strong>
                    <span className="text-[10px] text-[#6B786D] block">
                      Other fees: - {formatINR(item.totalSellingCosts - item.transportCost)}
                    </span>
                  </div>
                </div>

                {/* Net Earnings Highlight Box */}
                <div className="bg-[#FFFDF5] p-3.5 rounded-2xl border border-[#E9B949]/30 flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[11px] font-bold text-[#8B6848] uppercase tracking-wider block">
                      {t.netInPocket} ({item.quantityQuintals} q)
                    </span>
                    <span className="text-xl font-extrabold text-[#2F6B3F]">
                      {formatINR(item.estimatedNetProceeds)}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold bg-[#2F6B3F] text-white px-2 py-0.5 rounded-md">
                      {formatINR(item.effectiveNetPerQuintal)}{t.perQuintal} net
                    </span>
                    {item.profitDifferenceVsFirst !== 0 && (
                      <span className={`text-[10px] font-semibold block mt-1 ${
                        item.profitDifferenceVsFirst > 0 ? 'text-[#2F6B3F]' : 'text-[#B93838]'
                      }`}>
                        {item.profitDifferenceVsFirst > 0 ? '+' : ''}
                        {formatINR(item.profitDifferenceVsFirst)} vs nearest
                      </span>
                    )}
                  </div>
                </div>

                {/* Reliability & Confidence Explanation */}
                <div className="flex items-center justify-between text-[11px] text-[#6B786D] pb-3 border-b border-[#E1E9DC]">
                  <div className="flex items-center gap-1.5">
                    {item.confidence === 'high' ? (
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2F6B3F]" />
                    ) : item.confidence === 'medium' ? (
                      <Clock className="w-3.5 h-3.5 text-[#E9B949]" />
                    ) : (
                      <ShieldAlert className="w-3.5 h-3.5 text-[#B93838]" />
                    )}
                    <span>
                      {item.daysOld === 0
                        ? (language === 'hi' ? 'आज का भाव' : "Today's rate")
                        : `${item.daysOld} ${language === 'hi' ? 'दिन पुराना' : 'days ago'}`}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#8B6848] font-medium">
                    {mandi.source}
                  </span>
                </div>

                {/* Action CTA */}
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-[10px] text-[#6B786D] italic truncate max-w-[180px]">
                    {language === 'hi' ? item.confidenceReasonHi : item.confidenceReasonEn}
                  </p>
                  <button
                    onClick={() => onOpenCalculationModal(item)}
                    className="flex items-center gap-1 text-xs font-bold text-[#2F6B3F] hover:text-[#22512F] transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-[#E9B949]" />
                    <span>{t.detailsBtn}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-3xl border border-[#E1E9DC] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F3F8EF] border-b border-[#E1E9DC] text-[#26352A] font-bold">
                <tr>
                  <th className="p-3.5">Mandi & District</th>
                  <th className="p-3.5">Distance</th>
                  <th className="p-3.5">Modal Rate</th>
                  <th className="p-3.5">Transport Cost</th>
                  <th className="p-3.5">Gross Proceeds</th>
                  <th className="p-3.5 text-[#2F6B3F]">Net Earnings</th>
                  <th className="p-3.5">Freshness</th>
                  <th className="p-3.5 text-center">Breakdown</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E1E9DC]">
                {sortedResults.map((item, index) => {
                  const { mandi } = item;
                  return (
                    <tr key={mandi.id} className="hover:bg-[#F3F8EF]/50 transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-[#26352A]">
                          #{index + 1} {language === 'hi' ? mandi.mandiNameHi : mandi.mandiName}
                        </div>
                        <div className="text-[11px] text-[#6B786D]">
                          {mandi.district}, {mandi.state} • {mandi.variety}
                        </div>
                      </td>
                      <td className="p-3.5 font-semibold text-[#26352A]">
                        {item.distanceKm} km
                      </td>
                      <td className="p-3.5 font-bold text-[#2F6B3F]">
                        {formatINR(mandi.modalPrice)}
                        <span className="text-[10px] text-[#6B786D] block font-normal">
                          {formatINR(mandi.minPrice)} - {formatINR(mandi.maxPrice)}
                        </span>
                      </td>
                      <td className="p-3.5 font-semibold text-[#B93838]">
                        - {formatINR(item.transportCost)}
                      </td>
                      <td className="p-3.5 font-medium text-[#26352A]">
                        {formatINR(item.grossProceeds)}
                      </td>
                      <td className="p-3.5">
                        <div className="font-extrabold text-[#2F6B3F] text-sm">
                          {formatINR(item.estimatedNetProceeds)}
                        </div>
                        <div className="text-[10px] text-[#6B786D]">
                          {formatINR(item.effectiveNetPerQuintal)}/q net
                        </div>
                      </td>
                      <td className="p-3.5 text-[11px]">
                        <span className={`px-2 py-0.5 rounded-full font-semibold ${
                          item.dataFreshness === 'fresh'
                            ? 'bg-[#EBF5EE] text-[#2F6B3F]'
                            : item.dataFreshness === 'moderate'
                            ? 'bg-amber-50 text-amber-800'
                            : 'bg-red-50 text-red-800'
                        }`}>
                          {item.daysOld === 0 ? 'Today' : `${item.daysOld}d ago`}
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => onOpenCalculationModal(item)}
                          className="px-2.5 py-1 rounded-lg bg-[#F3F8EF] hover:bg-[#E4EEDC] text-[#2F6B3F] font-semibold text-[11px] transition-colors"
                        >
                          {t.detailsBtn}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contextual Sponsored Agri Partner Card (Rendered ONLY for Free Kisan tier) */}
      <SponsoredAgriCard
        subscription={subscription}
        language={language}
        adIndex={1}
      />
    </div>
  );
};
