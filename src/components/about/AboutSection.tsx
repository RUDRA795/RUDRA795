import React from 'react';
import { profileData } from '../../data/profile';
import { MultilingualMorph } from '../typography/MultilingualMorph';
import { MapPin, GraduationCap, ArrowRight } from 'lucide-react';
import { oceanAudio } from '../../utils/audio';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-24 px-6 z-10">
      <div className="w-full max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-3 text-center md:text-left">
          <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase flex items-center justify-center md:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            SHALLOW WATER LAYER // 300m - 1,000m
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white">
            <MultilingualMorph translationKey="aboutTitle" highlightClass="text-gradient-ocean" />
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl font-mono">
            {profileData.tagline}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 ocean-glass-deep p-6 sm:p-8 rounded-3xl border border-cyan-500/25 space-y-6 shadow-2xl">
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-cyan-300 border-b border-cyan-500/15 pb-4">
              <div className="flex items-center gap-1.5 bg-cyan-950/40 px-3 py-1.5 rounded-lg border border-cyan-500/20">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{profileData.location}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-cyan-950/40 px-3 py-1.5 rounded-lg border border-cyan-500/20">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                <span>TGPCET Nagpur (CSE Data Science)</span>
              </div>
            </div>

            <div className="space-y-4 text-slate-300 leading-relaxed font-body text-base">
              {profileData.philosophy.map((para, idx) => (
                <p key={idx} className="relative pl-4 border-l-2 border-cyan-500/30">
                  {para}
                </p>
              ))}
            </div>

            <div className="pt-2">
              <div className="text-xs font-mono text-cyan-400 mb-3 tracking-wider uppercase">
                CORE TECHNICAL INTERESTS
              </div>
              <div className="flex flex-wrap gap-2">
                {profileData.coreInterests.map(interest => (
                  <span
                    key={interest}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-200 border border-cyan-500/20 text-xs font-mono hover:bg-cyan-500/20 transition-colors"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="ocean-glass p-6 rounded-3xl border border-cyan-500/20 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  ENGINEERING PRINCIPLE
                </div>
                <div className="text-xl font-display font-bold text-white">
                  "Build. Break. Understand. Repeat."
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-body">
                  True engineering mastery isn't passive knowledge—it's iterative building, debugging edge conditions, and creating resilient digital systems.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-xs font-mono text-cyan-300">
                <div className="flex items-center justify-between mb-1">
                  <span>CURRENT STATUS:</span>
                  <span className="text-emerald-400 font-bold">SHIPPING</span>
                </div>
                <div className="text-slate-400 text-[11px]">
                  Building high-fidelity WebGL platforms & autonomous AI agents.
                </div>
              </div>
            </div>

            <a
              href="#projects"
              onClick={() => oceanAudio.playBubblePop()}
              className="p-5 rounded-2xl bg-gradient-to-r from-cyan-600/30 to-sky-600/30 border border-cyan-400/30 hover:border-cyan-400 flex items-center justify-between group transition-all cursor-pointer shadow-lg"
            >
              <div className="font-mono">
                <div className="text-xs text-cyan-300 font-bold">DIVE TO PROJECTS</div>
                <div className="text-[11px] text-slate-400">1,200m - 10,500m Subsea Discoveries</div>
              </div>
              <ArrowRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
