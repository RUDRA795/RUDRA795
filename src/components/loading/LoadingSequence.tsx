import React, { useState, useEffect } from 'react';

interface LoadingSequenceProps {
  onComplete: () => void;
}

export const LoadingSequence: React.FC<LoadingSequenceProps> = ({ onComplete }) => {
  const [statusIndex, setStatusIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(10);

  const statuses = [
    "INITIALIZING HYDRODYNAMIC ENGINE...",
    "CALIBRATING THREE.JS OCEANIC SHADERS...",
    "INGESTING ARGO TELEMETRY & SUBSEA NODES...",
    "SYSTEMS SYNCHRONIZED // ROHIT LAKAS"
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => { setStatusIndex(1); setProgress(45); }, 350);
    const timer2 = setTimeout(() => { setStatusIndex(2); setProgress(80); }, 750);
    const timer3 = setTimeout(() => { setStatusIndex(3); setProgress(100); }, 1150);
    const timer4 = setTimeout(() => { onComplete(); }, 1550);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#010712] text-slate-100 font-mono p-6 select-none">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* Spinning Oceanic Reticle */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
          <div className="text-2xl">🌊</div>
        </div>

        <div className="space-y-2">
          <div className="text-lg font-display font-extrabold text-white tracking-wider">
            ROHIT LAKAS
          </div>
          <div className="text-xs text-cyan-400 tracking-widest uppercase">
            {statuses[statusIndex]}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-[10px] text-slate-500">
          DATA SCIENCE &bull; ARTIFICIAL INTELLIGENCE &bull; FULL-STACK ARCHITECTURES
        </div>
      </div>
    </div>
  );
};
