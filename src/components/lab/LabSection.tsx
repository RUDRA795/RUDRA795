import React from 'react';
import { labExperiments } from '../../data/lab';
import { MultilingualMorph } from '../typography/MultilingualMorph';
import { Terminal } from 'lucide-react';

export const LabSection: React.FC = () => {
  return (
    <section id="lab" className="relative py-28 px-6 z-10">
      <div className="w-full max-w-6xl mx-auto space-y-12">
        <div className="space-y-3 text-center md:text-left">
          <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase flex items-center justify-center md:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            ABYSSAL RESEARCH // THE EXPERIMENTAL LAB
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white">
            <MultilingualMorph translationKey="labTitle" highlightClass="text-gradient-cyan" />
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl font-mono">
            Unfinished research, autonomous multi-agent pipelines, WebGL physics experiments &amp; algorithmic prototypes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {labExperiments.map(exp => (
            <div
              key={exp.id}
              className="ocean-glass-deep p-6 sm:p-7 rounded-3xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-cyan-500/15 pb-3">
                <span className="text-xs font-mono text-slate-400">{exp.id.toUpperCase()}</span>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold ${
                  exp.tag === 'EXPERIMENT' ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30' :
                  exp.tag === 'RESEARCH' ? 'bg-purple-950/60 text-purple-300 border border-purple-500/30' :
                  exp.tag === 'PROTOTYPE' ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30' :
                  'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {exp.tag}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-display font-bold text-white">
                  {exp.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400">
                  {exp.focus}
                </p>
              </div>

              <p className="text-slate-300 text-xs font-body leading-relaxed">
                {exp.description}
              </p>

              <div className="bg-[#010712] p-3.5 rounded-xl border border-cyan-500/20 font-mono text-[10px] space-y-1 text-slate-300">
                <div className="text-slate-500 mb-1 flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-cyan-400" /> ACTIVE TELEMETRY TRACE:
                </div>
                {exp.interactiveLog.map((log, i) => (
                  <div key={i} className="text-cyan-200/90 truncate">{log}</div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {exp.tech.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-cyan-950/40 text-cyan-300 border border-cyan-500/20 text-[10px] font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
