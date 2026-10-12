import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { ComparisonResult, Language } from '../../types';
import { getTranslation } from '../../services/i18n';
import { formatINR } from '../../services/calculationEngine';

interface MandiMapProps {
  results: ComparisonResult[];
  originCoords: { lat: number; lng: number };
  originLabel?: string;
  language: Language;
  onSelectMandi?: (result: ComparisonResult) => void;
}

export const MandiMap: React.FC<MandiMapProps> = ({
  results,
  originCoords,
  originLabel,
  language,
  onSelectMandi,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const t = getTranslation(language);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy existing instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Leaflet map
    const map = L.map(mapContainerRef.current, {
      center: [originCoords.lat, originCoords.lng],
      zoom: 9,
      zoomControl: true,
      scrollWheelZoom: true,
    });
    mapInstanceRef.current = map;

    // OpenStreetMap standard tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // Custom Icon for Farmer's Origin
    const farmerIcon = L.divIcon({
      className: 'custom-farmer-pin',
      html: `
        <div style="background-color: #26352A; color: #FFFDF5; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; border: 3px solid #FFF; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
          🏡
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
    });

    // Add Farmer Marker
    const originMarker = L.marker([originCoords.lat, originCoords.lng], { icon: farmerIcon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: inherit; font-size: 12px; padding: 4px;">
          <strong style="color: #2F6B3F; font-size: 13px;">${originLabel || t.originLabel}</strong>
          <p style="margin: 4px 0 0; color: #6B786D;">Your Starting Point for Transport Calculation</p>
        </div>
      `);

    // Radius circle (50 km)
    L.circle([originCoords.lat, originCoords.lng], {
      color: '#79A95A',
      fillColor: '#79A95A',
      fillOpacity: 0.08,
      radius: 50000,
      weight: 1.5,
      dashArray: '6, 6',
    }).addTo(map);

    const bounds = L.latLngBounds([[originCoords.lat, originCoords.lng]]);

    // Add Mandi Markers
    results.forEach((item, index) => {
      const { mandi } = item;
      const isTop = item.isRecommended;

      const mandiIcon = L.divIcon({
        className: 'custom-mandi-pin',
        html: `
          <div style="
            background: ${isTop ? '#2F6B3F' : '#FFFFFF'}; 
            color: ${isTop ? '#FFFDF5' : '#26352A'}; 
            border: 2px solid ${isTop ? '#E9B949' : '#79A95A'}; 
            padding: 4px 8px; 
            border-radius: 12px; 
            box-shadow: 0 4px 12px rgba(0,0,0,0.18); 
            font-size: 11px; 
            font-weight: 700; 
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 4px;
          ">
            <span>${isTop ? '⭐ ' : ''}${formatINR(mandi.modalPrice)}</span>
          </div>
        `,
        iconSize: [80, 28],
        iconAnchor: [40, 14],
      });

      const marker = L.marker([mandi.coordinates.lat, mandi.coordinates.lng], { icon: mandiIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: inherit; font-size: 12px; min-width: 180px; padding: 2px;">
            <div style="font-weight: 700; color: #26352A; font-size: 13px; margin-bottom: 2px;">
              ${language === 'hi' ? mandi.mandiNameHi : mandi.mandiName}
            </div>
            <div style="color: #6B786D; font-size: 11px; margin-bottom: 6px;">
              ${mandi.district}, ${mandi.state} • ${item.distanceKm} km
            </div>
            <div style="background: #F3F8EF; padding: 6px; border-radius: 8px; margin-bottom: 6px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                <span>Modal Rate:</span>
                <strong style="color: #2F6B3F;">${formatINR(mandi.modalPrice)}/q</strong>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 2px; color: #B93838;">
                <span>Transport:</span>
                <strong>- ${formatINR(item.transportCost)}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; border-top: 1px solid #E1E9DC; padding-top: 4px;">
                <span style="font-weight: 700;">Net In Hand:</span>
                <strong style="color: #2F6B3F; font-size: 13px;">${formatINR(item.estimatedNetProceeds)}</strong>
              </div>
            </div>
            ${isTop ? '<div style="color: #8B6848; font-size: 10px; font-weight: 700; text-align: center;">⭐ Top Recommended Choice</div>' : ''}
          </div>
        `);

      // Draw dotted connection line from origin to mandi
      L.polyline(
        [
          [originCoords.lat, originCoords.lng],
          [mandi.coordinates.lat, mandi.coordinates.lng],
        ],
        {
          color: isTop ? '#2F6B3F' : '#C4D7BC',
          weight: isTop ? 2.5 : 1.5,
          dashArray: isTop ? undefined : '5, 5',
          opacity: 0.8,
        }
      ).addTo(map);

      bounds.extend([mandi.coordinates.lat, mandi.coordinates.lng]);
    });

    if (results.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
    }

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [results, originCoords, language]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-[#E1E9DC] shadow-xs">
      <div
        ref={mapContainerRef}
        className="w-full h-[450px] sm:h-[520px] bg-[#F3F8EF]"
      />

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-xs p-3 rounded-2xl shadow-md border border-[#E1E9DC] text-xs space-y-1.5 pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-[#26352A] text-white flex items-center justify-center text-[10px]">
            🏡
          </span>
          <span className="text-[#26352A] font-medium">{originLabel || t.originLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded bg-[#2F6B3F] border border-[#E9B949]" />
          <span className="text-[#26352A] font-medium">Top Recommended Mandi</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded bg-white border border-[#79A95A]" />
          <span className="text-[#6B786D]">Other Mandis</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[#79A95A] font-semibold pt-0.5">
          <span>⭕ 50 km Travel Radius Ring</span>
        </div>
      </div>
    </div>
  );
};
