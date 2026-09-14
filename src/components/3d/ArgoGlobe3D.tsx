import React, { useEffect, useRef, useState } from 'react';
import { oceanAudio } from '../../utils/audio';

export const ArgoGlobe3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeFloat, setActiveFloat] = useState<{ id: string; lat: number; lon: number; depth: number; salinity: number; temp: number } | null>({
    id: "FLOAT-5904845",
    lat: 18.4,
    lon: 67.2,
    depth: 1840,
    salinity: 35.8,
    temp: 4.2
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rot = 0;
    let animId: number;

    const floats = [
      { id: "FLOAT-5904845", lat: 18.4, lon: 67.2, depth: 1840, salinity: 35.8, temp: 4.2 },
      { id: "FLOAT-2902781", lat: -12.1, lon: 74.8, depth: 2000, salinity: 34.6, temp: 2.8 },
      { id: "FLOAT-6903211", lat: 8.5, lon: 88.3, depth: 1250, salinity: 33.9, temp: 6.5 },
      { id: "FLOAT-1901192", lat: -25.6, lon: 95.1, depth: 1950, salinity: 35.1, temp: 3.1 }
    ];

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(cx, cy) - 25;

      ctx.clearRect(0, 0, w, h);

      // Globe background sphere
      const sphereGrad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.1, cx, cy, r);
      sphereGrad.addColorStop(0, '#0c4a6e');
      sphereGrad.addColorStop(0.7, '#031a30');
      sphereGrad.addColorStop(1, '#010814');

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Atmospheric Glow
      const glowGrad = ctx.createRadialGradient(cx, cy, r * 0.9, cx, cy, r * 1.15);
      glowGrad.addColorStop(0, 'rgba(34, 211, 238, 0.25)');
      glowGrad.addColorStop(1, 'rgba(34, 211, 238, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.15, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // Lat/Lon Wireframe Grid
      rot += 0.008;
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.15)';
      ctx.lineWidth = 0.8;

      // Parallels
      for (let lat = -60; lat <= 60; lat += 30) {
        const y = cy + Math.sin((lat * Math.PI) / 180) * r;
        const radY = Math.cos((lat * Math.PI) / 180) * r;
        ctx.beginPath();
        ctx.ellipse(cx, y, radY, radY * 0.35, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Meridians
      for (let i = 0; i < 8; i++) {
        const meridianAngle = rot + (i * Math.PI) / 4;
        const xOffset = Math.sin(meridianAngle) * r;
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(xOffset), r, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // ARGO Float Markers
      floats.forEach(f => {
        const lonAngle = ((f.lon + rot * 50) * Math.PI) / 180;
        const isFront = Math.cos(lonAngle) > 0;
        if (!isFront) return;

        const fx = cx + Math.sin(lonAngle) * Math.cos((f.lat * Math.PI) / 180) * r;
        const fy = cy - Math.sin((f.lat * Math.PI) / 180) * r;

        ctx.beginPath();
        ctx.arc(fx, fy, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#22d3ee';
        ctx.fill();

        // Pulsing radio wave
        ctx.beginPath();
        ctx.arc(fx, fy, 8 + Math.sin(rot * 5) * 4, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = '#e0f2fe';
        ctx.font = '9px JetBrains Mono';
        ctx.fillText(f.id.replace('FLOAT-', '#'), fx + 8, fy - 4);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-2xl bg-[#020b18]/90 border border-cyan-500/20 rounded-2xl p-4">
      <canvas ref={canvasRef} width={280} height={280} className="rounded-full shadow-inner" />

      <div className="flex-1 space-y-3 font-mono text-xs">
        <div className="text-cyan-400 font-bold border-b border-cyan-500/20 pb-2 flex items-center justify-between">
          <span>ARGO TELEMETRY INGESTION</span>
          <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">ONLINE</span>
        </div>

        {activeFloat && (
          <div className="space-y-1.5 bg-cyan-950/30 p-3 rounded-lg border border-cyan-500/15 text-slate-300">
            <div className="flex justify-between text-cyan-200 font-semibold">
              <span>ACTIVE FLOAT:</span>
              <span className="text-white">{activeFloat.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">COORDINATES:</span>
              <span>{activeFloat.lat}°N, {activeFloat.lon}°E</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">MAX PROFILING DEPTH:</span>
              <span>{activeFloat.depth} m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">SALINITY MEASUREMENT:</span>
              <span className="text-cyan-300">{activeFloat.salinity} PSU</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">ABYSSAL TEMPERATURE:</span>
              <span className="text-cyan-300">{activeFloat.temp} °C</span>
            </div>
          </div>
        )}

        <button
          onClick={() => {
            oceanAudio.playBubblePop();
            const list = [
              { id: "FLOAT-5904845", lat: 18.4, lon: 67.2, depth: 1840, salinity: 35.8, temp: 4.2 },
              { id: "FLOAT-2902781", lat: -12.1, lon: 74.8, depth: 2000, salinity: 34.6, temp: 2.8 },
              { id: "FLOAT-6903211", lat: 8.5, lon: 88.3, depth: 1250, salinity: 33.9, temp: 6.5 }
            ];
            setActiveFloat(list[Math.floor(Math.random() * list.length)]);
          }}
          className="w-full py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 rounded-lg transition-all cursor-pointer text-center"
        >
          🔄 Query Next Profiling Float
        </button>
      </div>
    </div>
  );
};
