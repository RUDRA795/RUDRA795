import React from 'react';

export const EngineeringMindset: React.FC = () => {
  const mantras = [
    "BUILD",
    "BREAK",
    "UNDERSTAND",
    "ITERATE",
    "DEPLOY",
    "LEARN"
  ];

  return (
    <section className="relative py-32 px-6 z-10 overflow-hidden bg-gradient-to-b from-transparent via-[#010610] to-transparent">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center space-y-10">
        <div className="text-xs font-mono text-cyan-400/80 tracking-widest uppercase flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          PHILOSOPHICAL ABYSS // CORE MENTAL MODEL
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 font-display font-black text-2xl sm:text-4xl md:text-5xl text-slate-400/60">
          {mantras.map((word, idx) => (
            <React.Fragment key={word}>
              <span className="hover:text-cyan-300 hover:scale-110 transition-all duration-300 cursor-default">
                {word}
              </span>
              {idx < mantras.length - 1 && (
                <span className="text-cyan-500/40 text-xl sm:text-3xl">•</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-gradient-cyan tracking-tight animate-pulse-glow">
          REPEAT.
        </div>

        <p className="text-slate-400 font-mono text-sm max-w-xl italic">
          "Better systems begin with better questions."
        </p>
      </div>
    </section>
  );
};
