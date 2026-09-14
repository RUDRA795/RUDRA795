import React from 'react';
import { HolographicPortrait } from './HolographicPortrait';
import { MultilingualMorph } from '../typography/MultilingualMorph';
import { profileData } from '../../data/profile';
import { oceanAudio } from '../../utils/audio';
import { Compass, ArrowDown } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-16 overflow-hidden z-10"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        {/* Left Column: Identity & Typography */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          {/* Micro Status Beacon */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ocean-glass border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="tracking-wider uppercase">{profileData.status}</span>
          </div>

          {/* Master Name Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white">
              {profileData.name}
            </h1>
            <div className="text-lg sm:text-xl font-mono text-cyan-400 font-semibold tracking-wide">
              {profileData.title}
            </div>
          </div>

          {/* Multilingual Morphing Statement */}
          <div className="p-4 rounded-2xl ocean-glass border border-cyan-500/20 max-w-xl text-left w-full shadow-inner">
            <MultilingualMorph
              translationKey="heroTagline"
              className="text-xl sm:text-2xl font-bold tracking-tight"
              showLanguageBadge={true}
              cycleIntervalMs={4000}
            />
            <div className="mt-2 text-xs font-mono text-slate-400">
              {profileData.supportingStatement}
            </div>
          </div>

          {/* Vision Statement */}
          <blockquote className="border-l-2 border-cyan-400 pl-4 text-slate-300 text-sm italic font-body max-w-lg">
            "{profileData.vision}"
          </blockquote>

          {/* Primary & Secondary Call to Actions */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <a
              href="#projects"
              onClick={() => oceanAudio.playBubblePop()}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold font-mono text-xs tracking-wider flex items-center gap-2 hover:from-cyan-400 hover:to-sky-400 transition-all shadow-lg shadow-cyan-500/30 hover:scale-[1.03] cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>EXPLORE MY WORLD</span>
            </a>

            <a
              href="https://github.com/RUDRA795"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => oceanAudio.playBubblePop()}
              className="px-6 py-3.5 rounded-xl ocean-glass-interactive text-slate-200 hover:text-cyan-300 font-mono text-xs tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <GithubIcon className="w-4 h-4 text-cyan-400" />
              <span>VIEW GITHUB</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 w-full">
            {profileData.stats.map(s => (
              <div key={s.label} className="ocean-glass p-3 rounded-xl border border-cyan-500/15 text-center">
                <div className="text-cyan-300 font-mono font-bold text-base sm:text-lg">{s.value}</div>
                <div className="text-[10px] font-mono text-slate-400 tracking-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Holographic Portrait Asset */}
        <div className="flex-1 flex justify-center items-center">
          <HolographicPortrait />
        </div>
      </div>

      {/* Downward Descent Indicator */}
      <a
        href="#about"
        onClick={() => oceanAudio.playBubblePop()}
        className="mt-16 flex flex-col items-center gap-2 text-cyan-400/80 hover:text-cyan-300 font-mono text-xs tracking-widest transition-colors animate-bounce cursor-pointer"
      >
        <span>DESCEND INTO THE SHALLOWS</span>
        <ArrowDown className="w-4 h-4" />
      </a>
    </section>
  );
};
