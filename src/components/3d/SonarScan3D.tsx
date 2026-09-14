import React, { useEffect, useRef, useState } from 'react';
import { oceanAudio } from '../../utils/audio';

export const SonarScan3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanSpeed, setScanSpeed] = useState<number>(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;
    let animId: number;

    const targets = [
      { id: 'ANOMALY_01', distance: 0.65, angle: 1.2, type: 'hazard' },
      { id: 'ANOMALY_02', distance: 0.35, angle: 3.8, type: 'pipeline' },
      { id: 'ANOMALY_03', distance: 0.82, angle: 5.1, type: 'bio' }
    ];

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(cx, cy) - 20;

      ctx.fillStyle = 'rgba(2, 10, 24, 0.18)';
      ctx.fillRect(0, 0, w, h);

      for (let r = 1; r <= 4; r++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (radius / 4) * r, 0, Math.PI * 2);
        ctx.strokeStyle = r === 4 ? 'rgba(34, 211, 238, 0.3)' : 'rgba(56, 189, 248, 0.12)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.stroke();

      angle = (angle + 0.025 * scanSpeed) % (Math.PI * 2);

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, 'rgba(34, 211, 238, 0.4)');
      grad.addColorStop(1, 'rgba(6, 182, 212, 0)');

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, angle - 0.45, angle);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
      ctx.strokeStyle = 'rgba(165, 243, 252, 0.9)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      targets.forEach(t => {
        const tx = cx + Math.cos(t.angle) * (radius * t.distance);
        const ty = cy + Math.sin(t.angle) * (radius * t.distance);
        const diff = (angle - t.angle + Math.PI * 2) % (Math.PI * 2);
        const intensity = diff < 0.6 ? 1 - diff / 0.6 : 0.2;

        ctx.beginPath();
        ctx.arc(tx, ty, 5 + intensity * 3, 0, Math.PI * 2);
        ctx.fillStyle = t.type === 'hazard' 
          ? `rgba(239, 68, 68, ${0.4 + intensity * 0.6})` 
          : `rgba(34, 211, 238, ${0.4 + intensity * 0.6})`;
        ctx.fill();

        ctx.strokeStyle = `rgba(255, 255, 255, ${intensity * 0.8})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (intensity > 0.7) {
          ctx.fillStyle = 'rgba(165, 243, 252, 0.9)';
          ctx.font = '10px JetBrains Mono';
          ctx.fillText(t.id, tx + 8, ty - 8);
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [scanSpeed]);

  const pingRadar = () => {
    oceanAudio.playSonarBeep();
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="relative border border-cyan-500/20 rounded-2xl p-4 bg-[#010814]/90 shadow-2xl overflow-hidden">
        <div className="absolute top-3 left-4 text-xs font-mono text-cyan-400 tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          SIDE-SCAN SONAR TELEMETRY // 360° ACOUSTIC SWEEP
        </div>
        <canvas ref={canvasRef} width={420} height={320} className="max-w-full rounded-xl" />
        <div className="absolute bottom-3 right-4 text-[10px] font-mono text-slate-400">
          SWEEP FREQ: 455 kHz | RANGE: 120m
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center text-xs font-mono">
        <button
          onClick={pingRadar}
          className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>📡</span> Trigger Acoustic Pulse
        </button>
        <button
          onClick={() => setScanSpeed(s => (s === 1 ? 2 : 1))}
          className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-600/40 transition-all cursor-pointer"
        >
          Sweep Speed: {scanSpeed}x
        </button>
      </div>
    </div>
  );
};
