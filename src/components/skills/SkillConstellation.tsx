import React, { useState } from 'react';
import { skillsData, explorationJourney } from '../../data/skills';
import { MultilingualMorph } from '../typography/MultilingualMorph';
import { oceanAudio } from '../../utils/audio';

export const SkillConstellation: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = ['ALL', 'AI / DATA', 'DEVELOPMENT', 'SYSTEMS', 'CLOUD / DEVOPS', 'AI STACK'] as const;

  const filteredSkills = activeCategory === 'ALL'
    ? skillsData
    : skillsData.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-28 px-6 z-10">
      <div className="w-full max-w-6xl mx-auto space-y-12">
        <div className="space-y-3 text-center md:text-left">
          <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase flex items-center justify-center md:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            MID-WATER LAYER // TECHNOLOGY CONSTELLATION
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white">
            <MultilingualMorph translationKey="skillsTitle" highlightClass="text-gradient-bioluminescent" />
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl font-mono">
            An interconnected ocean ecosystem of engineering nodes. No fake percentages—pure architectural capability.
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                oceanAudio.playBubblePop();
                setActiveCategory(cat);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25 border border-cyan-400'
                  : 'ocean-glass text-slate-300 hover:text-cyan-300 border border-cyan-500/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map(skill => {
            const isHovered = hoveredSkill === skill.name;
            return (
              <div
                key={skill.name}
                onMouseEnter={() => {
                  setHoveredSkill(skill.name);
                  oceanAudio.playHydroPing();
                }}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`p-5 rounded-2xl ocean-glass border transition-all duration-300 flex flex-col justify-between space-y-3 cursor-pointer ${
                  isHovered
                    ? 'border-cyan-400 bg-cyan-950/60 shadow-xl shadow-cyan-500/20 scale-[1.03]'
                    : 'border-cyan-500/15 hover:border-cyan-500/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-display font-bold text-white group-hover:text-cyan-300">
                    {skill.name}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                    {skill.category}
                  </span>
                </div>

                <p className="text-xs text-slate-400 font-body leading-relaxed">
                  {skill.proficiencyConcept}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {skill.tags.map(t => (
                    <span key={t} className="text-[10px] font-mono text-cyan-300/80 bg-slate-900/60 px-2 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="ocean-glass-deep p-8 rounded-3xl border border-cyan-500/25 space-y-6 mt-12 shadow-2xl">
          <div className="space-y-1">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              CONTINUOUS EVOLUTION &amp; EXPLORATION
            </div>
            <h3 className="text-2xl font-display font-bold text-white">
              The Engineering Growth Vector
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {explorationJourney.map(item => (
              <div key={item.stage} className="p-4 rounded-2xl bg-cyan-950/25 border border-cyan-500/15 space-y-2">
                <div className="text-xs font-mono text-cyan-400 font-bold">
                  STAGE {item.stage} //
                </div>
                <div className="text-sm font-display font-bold text-slate-100">
                  {item.title}
                </div>
                <p className="text-xs text-slate-400 font-body leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
