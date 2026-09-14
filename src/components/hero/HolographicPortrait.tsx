import React, { useState, useRef } from 'react';
import { oceanAudio } from '../../utils/audio';

export const HolographicPortrait: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        oceanAudio.playHydroPing();
      }}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center p-4 transition-transform duration-300 ease-out"
      style={{ perspective: 1000 }}
    >
      {/* Outer Holographic Glow Frame */}
      <div
        className="relative w-72 sm:w-80 md:w-96 aspect-square rounded-3xl p-3 ocean-glass-deep border border-cyan-500/40 shadow-2xl transition-all duration-300 group"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.03 : 1})`,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? '0 25px 60px -15px rgba(6, 182, 212, 0.4), 0 0 35px rgba(56, 189, 248, 0.3)'
            : '0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 0 20px rgba(6, 182, 212, 0.15)'
        }}
      >
        {/* Real Portrait Image Container */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#010915] border border-cyan-400/20">
          <img
            src="/assets/portrait.jpg"
            alt="Rohit Lakas - Developer Portrait"
            className="w-full h-full object-cover object-center filter saturate-[1.1] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
            loading="eager"
          />

          {/* Holographic scanning overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent pointer-events-none opacity-60 animate-pulse-glow" />

          {/* Subtle underwater caustic glass refraction */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.25)_0%,transparent_65%)] pointer-events-none" />

          {/* Micro HUD Telemetry Badge */}
          <div className="absolute bottom-3 inset-x-3 ocean-glass px-3 py-1.5 rounded-xl flex items-center justify-between text-[10px] font-mono text-slate-200 border border-cyan-400/30">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-cyan-300 font-bold">ROHIT LAKAS</span>
            </div>
            <span className="text-slate-400">TGPCET // NAGPUR</span>
          </div>
        </div>

        {/* Floating corner reticle accents */}
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none"></div>
        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none"></div>
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400 pointer-events-none"></div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400 pointer-events-none"></div>
      </div>
    </div>
  );
};
