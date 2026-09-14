import React from 'react';
import { useGitHubData } from '../../hooks/useGitHubData';
import { MultilingualMorph } from '../typography/MultilingualMorph';
import { oceanAudio } from '../../utils/audio';
import { Star, GitFork, BookOpen, Radio, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';

export const GitHubAbyssPortal: React.FC = () => {
  const { stats, isLive } = useGitHubData('RUDRA795');

  return (
    <section id="github" className="relative py-28 px-6 z-10">
      <div className="w-full max-w-6xl mx-auto space-y-12">
        <div className="space-y-3 text-center md:text-left">
          <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase flex items-center justify-center md:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            DEEP CORE LAYER // 11,000m HADAL ABYSS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white">
            <MultilingualMorph translationKey="githubTitle" highlightClass="text-gradient-cyan" />
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl font-mono">
            Open-source architecture, repositories &amp; commit stream for <span className="text-cyan-300">@RUDRA795</span>.
          </p>
        </div>

        <div className="ocean-glass-deep p-6 sm:p-8 rounded-3xl border border-cyan-400/30 space-y-8 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-500/20 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                <GithubIcon className="w-7 h-7" />
              </div>
              <div>
                <div className="text-xl font-display font-bold text-white flex items-center gap-2">
                  <span>github.com/RUDRA795</span>
                  {isLive && (
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                      <Radio className="w-3 h-3 animate-pulse" /> LIVE TELEMETRY
                    </span>
                  )}
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Data Science • Artificial Intelligence • Full-Stack Systems
                </div>
              </div>
            </div>

            <a
              href="https://github.com/RUDRA795"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => oceanAudio.playBubblePop()}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-500/25"
            >
              <GithubIcon className="w-4 h-4" />
              <span>EXPLORE ALL REPOSITORIES</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.pinnedRepos.map(repo => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => oceanAudio.playBubblePop()}
                className="p-5 rounded-2xl ocean-glass border border-cyan-500/15 hover:border-cyan-400/40 transition-all space-y-3 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-display font-bold group-hover:text-cyan-300 transition-colors">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span>{repo.name}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 transition-colors" />
                </div>

                <p className="text-xs text-slate-400 font-body line-clamp-2">
                  {repo.description}
                </p>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                  <span className="text-cyan-300">{repo.language}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400" /> {repo.stars}</span>
                    <span className="flex items-center gap-1"><GitFork className="w-3 h-3 text-slate-400" /> {repo.forks}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="space-y-3 pt-2">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              PRIMARY PROGRAMMING SPECTRUM
            </div>
            <div className="flex h-3 w-full rounded-full overflow-hidden bg-slate-900 border border-slate-800">
              {stats.topLanguages.map(lang => (
                <div
                  key={lang.name}
                  style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                  className="h-full transition-all duration-500"
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-300 pt-1">
              {stats.topLanguages.map(lang => (
                <div key={lang.name} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                  <span>{lang.name} <span className="text-slate-500">({lang.percentage}%)</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
