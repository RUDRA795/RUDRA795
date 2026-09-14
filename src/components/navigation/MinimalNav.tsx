import React, { useState, useEffect } from 'react';
import { oceanAudio } from '../../utils/audio';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';

export const MinimalNav: React.FC = () => {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const muted = oceanAudio.toggleMute();
    setIsMuted(muted);
  };

  const navItems = [
    { label: 'IDENTITY', href: '#hero' },
    { label: 'ABOUT', href: '#about' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'THE LAB', href: '#lab' },
    { label: 'GITHUB', href: '#github' },
    { label: 'CONTACT', href: '#contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 transition-all duration-500 ${isScrolled ? 'py-3' : 'py-5'}`}>
      <nav className={`w-full max-w-6xl flex items-center justify-between ocean-glass px-5 py-3 rounded-2xl border transition-all duration-500 ${
        isScrolled
          ? 'bg-[#020b18]/85 border-cyan-500/30 shadow-2xl shadow-cyan-950/50 scale-[0.98]'
          : 'bg-[#031528]/50 border-cyan-500/15'
      }`}>
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={() => oceanAudio.playBubblePop()}
          className="flex items-center gap-2.5 text-slate-100 hover:text-cyan-300 transition-colors group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-mono font-bold text-sm group-hover:scale-105 group-hover:border-cyan-400 transition-all shadow-md shadow-cyan-500/10">
            RL
          </div>
          <div className="flex flex-col font-mono">
            <span className="text-xs font-bold tracking-wider text-slate-100">ROHIT LAKAS</span>
            <span className="text-[9px] text-cyan-400/80 tracking-widest">RUDRA795</span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1.5 font-mono text-xs text-slate-300">
          {navItems.map(item => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => oceanAudio.playBubblePop()}
              className="px-3 py-1.5 rounded-lg hover:text-cyan-300 hover:bg-cyan-500/10 transition-all cursor-pointer tracking-wider"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Action controls (Audio + GitHub) */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleSound}
            aria-label="Toggle underwater hydrophone audio"
            className={`p-2 rounded-xl border font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              !isMuted
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-md shadow-cyan-500/25'
                : 'bg-slate-900/60 text-slate-400 border-slate-700/60 hover:text-slate-200'
            }`}
            title={isMuted ? "Enable Sub-surface Acoustics" : "Mute Soundscape"}
          >
            {!isMuted ? <Volume2 className="w-4 h-4 text-cyan-300 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline text-[10px] uppercase">{isMuted ? 'Muted' : 'Acoustics On'}</span>
          </button>

          <a
            href="https://github.com/RUDRA795"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => oceanAudio.playBubblePop()}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/40 text-xs font-mono transition-all cursor-pointer shadow-sm"
          >
            <GithubIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>GITHUB</span>
          </a>

          <button
            onClick={() => setMobileOpen(o => !o)}
            className="p-2 md:hidden text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-x-4 top-20 ocean-glass-deep p-6 rounded-2xl border border-cyan-500/30 flex flex-col gap-4 font-mono text-sm md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          {navItems.map(item => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => {
                oceanAudio.playBubblePop();
                setMobileOpen(false);
              }}
              className="py-2 px-3 rounded-lg text-slate-200 hover:bg-cyan-500/20 hover:text-cyan-300 transition-all border-b border-slate-800/60"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://github.com/RUDRA795"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-center font-bold"
          >
            VIEW GITHUB // @RUDRA795
          </a>
        </div>
      )}
    </header>
  );
};
