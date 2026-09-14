import React, { useState } from 'react';
import { socialsData } from '../../data/socials';
import { MultilingualMorph } from '../typography/MultilingualMorph';
import { oceanAudio } from '../../utils/audio';
import { Copy, Check, ArrowUp, Send } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyEmail = () => {
    oceanAudio.playBubblePop();
    navigator.clipboard.writeText(socialsData.directEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    oceanAudio.playHydroPing();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative pt-24 pb-16 px-6 z-10 border-t border-cyan-500/20">
      <div className="w-full max-w-6xl mx-auto space-y-16">
        <div className="ocean-glass-deep p-8 sm:p-12 rounded-3xl border border-cyan-400/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
            SURFACE TRANSMISSION // FINAL INITIATION
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white">
            <MultilingualMorph translationKey="contactTitle" highlightClass="text-gradient-cyan" />
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-body max-w-2xl mx-auto leading-relaxed">
            I am always exploring the intersection of code, data, AI and intelligent systems. Let's engineer something meaningful.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <a
              href={socialsData.email}
              onClick={() => oceanAudio.playBubblePop()}
              className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/30 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>SEND DIRECT TRANSMISSION</span>
            </a>

            <button
              onClick={copyEmail}
              className="px-6 py-3.5 rounded-xl ocean-glass text-slate-200 hover:text-cyan-300 font-mono text-xs tracking-wider flex items-center gap-2 border border-cyan-500/30 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
              <span>{copied ? 'EMAIL COPIED TO CLIPBOARD' : 'COPY EMAIL ADDRESS'}</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-slate-400 border-t border-slate-800/80 pt-8">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-white font-bold">ROHIT LAKAS // RUDRA795</div>
            <div>{socialsData.location} • TGPCET</div>
            <div className="text-[11px] text-cyan-400/80">"THE DIVE DOESN'T END HERE. KEEP BUILDING."</div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={socialsData.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => oceanAudio.playBubblePop()}
              className="p-2.5 rounded-xl ocean-glass hover:text-cyan-300 transition-colors"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Ascend to Surface"
            >
              <ArrowUp className="w-4 h-4" />
              <span>ASCEND</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
