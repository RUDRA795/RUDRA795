import React, { useState } from 'react';
import { oceanAudio } from '../../utils/audio';

export const UrbanMap3D: React.FC = () => {
  const [activeWard, setActiveWard] = useState<number>(3);
  const [layer, setLayer] = useState<'civic' | 'hotspots' | 'sla'>('hotspots');

  const wards = [
    { id: 1, name: "Dharampeth Ward #01", grievances: 42, slaRisk: "LOW (12%)", healthScore: 91, status: "Normal" },
    { id: 2, name: "Sitabuldi Central #02", grievances: 118, slaRisk: "ELEVATED (48%)", healthScore: 74, status: "Alert" },
    { id: 3, name: "Laxmi Nagar Hub #03", grievances: 184, slaRisk: "CRITICAL (84%)", healthScore: 58, status: "Action Required" },
    { id: 4, name: "Gandhibagh Sector #04", grievances: 96, slaRisk: "MODERATE (34%)", healthScore: 82, status: "Normal" },
    { id: 5, name: "Hanuman Nagar #05", grievances: 64, slaRisk: "LOW (18%)", healthScore: 88, status: "Normal" }
  ];

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl bg-[#010916]/95 border border-cyan-500/25 rounded-2xl p-5 shadow-2xl font-mono text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-500/20 pb-3">
        <div className="flex items-center gap-2 text-cyan-300 font-bold">
          <span className="text-base">🏙️</span> NAGARIX // NAGPUR URBAN COMMAND TELEMETRY
        </div>
        <div className="flex gap-1.5">
          {(['civic', 'hotspots', 'sla'] as const).map(l => (
            <button
              key={l}
              onClick={() => {
                oceanAudio.playBubblePop();
                setLayer(l);
              }}
              className={`px-2.5 py-1 rounded text-[11px] uppercase transition-all cursor-pointer ${
                layer === l
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Ward Grid Visualizer */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-2">
        {wards.map(w => {
          const isSelected = activeWard === w.id;
          return (
            <div
              key={w.id}
              onClick={() => {
                oceanAudio.playHydroPing();
                setActiveWard(w.id);
              }}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-cyan-950/60 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                  : 'bg-slate-900/50 border-slate-800 hover:border-cyan-500/40'
              }`}
            >
              <div className="flex justify-between items-center text-slate-300 mb-1">
                <span className="font-semibold">{w.name}</span>
                <span className={`w-2 h-2 rounded-full ${w.status === 'Action Required' ? 'bg-red-400 animate-ping' : w.status === 'Alert' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
              </div>
              <div className="text-slate-400 text-[10px]">Grievance Load: <span className="text-white font-bold">{w.grievances}</span></div>
              <div className="text-slate-400 text-[10px]">Health Index: <span className="text-cyan-300 font-bold">{w.healthScore}/100</span></div>
            </div>
          );
        })}
      </div>

      {/* Active Ward Telemetry Banner */}
      {wards.find(w => w.id === activeWard) && (
        <div className="bg-cyan-950/40 border border-cyan-500/20 p-3 rounded-xl flex flex-wrap justify-between items-center gap-3">
          <div>
            <div className="text-cyan-200 font-bold">{wards.find(w => w.id === activeWard)?.name}</div>
            <div className="text-slate-400 text-[11px]">SLA Breach Risk: <span className="text-red-400 font-semibold">{wards.find(w => w.id === activeWard)?.slaRisk}</span></div>
          </div>
          <button
            onClick={() => oceanAudio.playBubblePop()}
            className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-lg cursor-pointer"
          >
            ⚡ Dispatch Municipal Taskforce
          </button>
        </div>
      )}
    </div>
  );
};
