import React from 'react';
import { useOceanDepth } from '../../hooks/useOceanDepth';

export const DepthGauge: React.FC = () => {
  const { depthMeters, depthPercent, currentZone } = useOceanDepth();

  const zoneLabels: Record<string, string> = {
    SURFACE: 'SURFACE LAYER (0m)',
    SHALLOW: 'EPIPELAGIC ZONE (200m - 1,000m)',
    MID_WATER: 'MESOPELAGIC ZONE (1,000m - 3,500m)',
    DEEP_WATER: 'BATHYPELAGIC TRENCH (3,500m - 6,000m)',
    ABYSS: 'ABYSSOPELAGIC DEPTH (6,000m - 9,000m)',
    DEEP_CORE: 'HADAL ZONE AI CORE (11,000m)',
    SURFACE_RETURN: 'ASCENT TOWARD TRANSMISSION'
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-3 ocean-glass px-4 py-2.5 rounded-full text-xs font-mono border border-cyan-500/20 shadow-xl pointer-events-auto">
      <div className="relative w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${depthPercent * 100}%` }}
        />
      </div>

      <div className="flex flex-col text-right">
        <div className="text-cyan-300 font-bold text-sm tracking-wider">
          {depthMeters.toLocaleString()} <span className="text-[10px] text-slate-400">METERS</span>
        </div>
        <div className="text-[9px] text-slate-400 uppercase tracking-tight">
          {zoneLabels[currentZone] || currentZone}
        </div>
      </div>
    </div>
  );
};
