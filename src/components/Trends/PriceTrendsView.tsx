import React, { useState } from 'react';
import { Language } from '../../types';
import { getTranslation } from '../../services/i18n';
import { HISTORICAL_PRICE_TRENDS, CropTrendData } from '../../data/historicalTrends';
import { CROPS } from '../../data/crops';
import { formatINR } from '../../services/calculationEngine';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Sparkles, 
  Calendar, 
  Store, 
  BarChart3, 
  Info,
  Lightbulb
} from 'lucide-react';

interface PriceTrendsViewProps {
  language: Language;
}

export const PriceTrendsView: React.FC<PriceTrendsViewProps> = ({ language }) => {
  const t = getTranslation(language);
  const [selectedCropId, setSelectedCropId] = useState<string>('onion');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  const trendData: CropTrendData = HISTORICAL_PRICE_TRENDS[selectedCropId] || HISTORICAL_PRICE_TRENDS['onion'];
  const points = trendData.points;

  // Chart dimensions & calculations
  const width = 640;
  const height = 260;
  const padding = { top: 20, right: 30, bottom: 40, left: 60 };

  const prices = points.map(p => p.modalPrice);
  const minPrices = points.map(p => p.minPrice);
  const maxPrices = points.map(p => p.maxPrice);

  const yMin = Math.floor(Math.min(...minPrices) * 0.95 / 100) * 100;
  const yMax = Math.ceil(Math.max(...maxPrices) * 1.05 / 100) * 100;

  const getX = (idx: number) => padding.left + (idx / (points.length - 1)) * (width - padding.left - padding.right);
  const getY = (val: number) => height - padding.bottom - ((val - yMin) / (yMax - yMin)) * (height - padding.top - padding.bottom);

  // SVG Path for modal price line
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.modalPrice)}`).join(' ');

  // SVG Area path for fill
  const areaPath = `${linePath} L ${getX(points.length - 1)} ${height - padding.bottom} L ${getX(0)} ${height - padding.bottom} Z`;

  // Range area (between min and max price)
  const rangePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.maxPrice)}`).join(' ') +
    points.slice().reverse().map((p, i) => ` L ${getX(points.length - 1 - i)} ${getY(p.minPrice)}`).join('') + ' Z';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E1E9DC] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-[#EBF5EE] text-[#2F6B3F]">
                <TrendingUp className="w-4 h-4" />
              </span>
              <h1 className="text-xl font-bold text-[#26352A]">{t.trendsTitle}</h1>
            </div>
            <p className="text-xs text-[#6B786D]">{t.trendsSubtitle}</p>
          </div>

          {/* Crop Selector Pills */}
          <div className="flex flex-wrap gap-1.5">
            {Object.keys(HISTORICAL_PRICE_TRENDS).map(cropId => {
              const c = CROPS.find(cr => cr.id === cropId);
              const isSelected = selectedCropId === cropId;
              return (
                <button
                  key={cropId}
                  onClick={() => setSelectedCropId(cropId)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-[#2F6B3F] text-white shadow-xs'
                      : 'bg-[#F3F8EF] text-[#26352A] hover:bg-[#E4EEDC]'
                  }`}
                >
                  <span>{c?.icon}</span>
                  <span>{language === 'hi' ? c?.nameHi.split(' ')[0] : c?.nameEn}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Chart Card */}
      <div className="bg-white p-6 rounded-3xl border border-[#E1E9DC] shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E1E9DC]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-[#26352A]">
                {formatINR(points[points.length - 1].modalPrice)}
                <span className="text-xs font-normal text-[#6B786D]">{t.perQuintal}</span>
              </h2>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ${
                trendData.trendDirection === 'rising'
                  ? 'bg-[#EBF5EE] text-[#2F6B3F]'
                  : trendData.trendDirection === 'falling'
                  ? 'bg-red-50 text-[#B93838]'
                  : 'bg-amber-50 text-amber-800'
              }`}>
                {trendData.trendDirection === 'rising' && <TrendingUp className="w-3.5 h-3.5" />}
                {trendData.trendDirection === 'falling' && <TrendingDown className="w-3.5 h-3.5" />}
                {trendData.trendDirection === 'stable' && <Minus className="w-3.5 h-3.5" />}
                <span>
                  {trendData.percentChange30d > 0 ? '+' : ''}{trendData.percentChange30d}% (30d)
                </span>
              </span>
            </div>
            <p className="text-xs text-[#6B786D] mt-0.5">
              30-Day Average Modal Rate: <strong>{formatINR(trendData.averageModal)}/q</strong>
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#6B786D]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#2F6B3F]" />
              <span>Reported Modal Price</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#E9B949]/30 border border-[#E9B949]" />
              <span>Min - Max Price Range</span>
            </div>
          </div>
        </div>

        {/* SVG Interactive Chart */}
        <div className="relative w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto min-w-[540px] select-none"
          >
            {/* Horizontal Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
              const yVal = Math.round(yMin + pct * (yMax - yMin));
              const yPos = getY(yVal);
              return (
                <g key={i}>
                  <line
                    x1={padding.left}
                    y1={yPos}
                    x2={width - padding.right}
                    y2={yPos}
                    stroke="#E1E9DC"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={padding.left - 8}
                    y={yPos + 4}
                    textAnchor="end"
                    fontSize="10"
                    fill="#6B786D"
                  >
                    ₹{yVal}
                  </text>
                </g>
              );
            })}

            {/* Min-Max Range shaded area */}
            <path d={rangePath} fill="#E9B949" fillOpacity="0.12" />

            {/* Gradient for modal fill */}
            <defs>
              <linearGradient id="modalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#79A95A" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#79A95A" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Modal fill area */}
            <path d={areaPath} fill="url(#modalGradient)" />

            {/* Modal Price Line */}
            <path
              d={linePath}
              fill="none"
              stroke="#2F6B3F"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Interactive Data points */}
            {points.map((p, i) => {
              const cx = getX(i);
              const cy = getY(p.modalPrice);
              const isHovered = hoveredPointIndex === i;

              return (
                <g key={i} className="cursor-pointer">
                  {/* Vertical hover guide */}
                  {isHovered && (
                    <line
                      x1={cx}
                      y1={padding.top}
                      x2={cx}
                      y2={height - padding.bottom}
                      stroke="#2F6B3F"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />
                  )}

                  {/* Circular point */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 6 : 4}
                    fill={isHovered ? '#E9B949' : '#2F6B3F'}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    onMouseEnter={() => setHoveredPointIndex(i)}
                    onMouseLeave={() => setHoveredPointIndex(null)}
                  />

                  {/* Date labels on X-axis */}
                  <text
                    x={cx}
                    y={height - padding.bottom + 18}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight={isHovered ? '700' : '500'}
                    fill={isHovered ? '#2F6B3F' : '#6B786D'}
                  >
                    {p.date}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Floating Hover Tooltip */}
          {hoveredPointIndex !== null && (
            <div
              className="absolute pointer-events-none bg-white p-2.5 rounded-xl shadow-lg border border-[#E1E9DC] text-xs z-20 space-y-0.5"
              style={{
                left: `${(getX(hoveredPointIndex) / width) * 100}%`,
                top: `${(getY(points[hoveredPointIndex].modalPrice) / height) * 60}%`,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <p className="font-bold text-[#26352A]">{points[hoveredPointIndex].date}</p>
              <p className="text-[#2F6B3F] font-extrabold">
                Modal: {formatINR(points[hoveredPointIndex].modalPrice)}/q
              </p>
              <p className="text-[10px] text-[#6B786D]">
                Range: {formatINR(points[hoveredPointIndex].minPrice)} - {formatINR(points[hoveredPointIndex].maxPrice)}
              </p>
              {points[hoveredPointIndex].arrivalsTonnes && (
                <p className="text-[10px] text-[#8B6848]">
                  Arrivals: {points[hoveredPointIndex].arrivalsTonnes} tonnes
                </p>
              )}
            </div>
          )}
        </div>

        {/* AI Market Advisory & Intelligence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-[#F3F8EF] border border-[#E1E9DC] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#2F6B3F]">
              <Sparkles className="w-4 h-4 text-[#E9B949]" />
              <span>{t.aiAdvisorTitle}</span>
            </div>
            <p className="text-xs text-[#26352A] leading-relaxed">
              {language === 'hi' ? trendData.marketSentimentHi : trendData.marketSentimentEn}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFFDF5] border border-[#E9B949]/30 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#8B6848]">
              <Lightbulb className="w-4 h-4 text-[#E9B949]" />
              <span>{language === 'hi' ? 'विक्री रणनीति (सुझाव)' : 'Selling Strategy Recommendation'}</span>
            </div>
            <p className="text-xs text-[#26352A] leading-relaxed">
              {language === 'hi' ? trendData.sellingTipHi : trendData.sellingTipEn}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
