import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { OceanCanvas } from './components/3d/OceanCanvas';
import { MinimalNav } from './components/navigation/MinimalNav';
import { DepthGauge } from './components/navigation/DepthGauge';
import { Hero } from './components/hero/Hero';
import { AboutSection } from './components/about/AboutSection';
import { ProjectSection } from './components/projects/ProjectSection';
import { SkillConstellation } from './components/skills/SkillConstellation';
import { LabSection } from './components/lab/LabSection';
import { GitHubAbyssPortal } from './components/github/GitHubAbyssPortal';
import { EngineeringMindset } from './components/mindset/EngineeringMindset';
import { Footer } from './components/footer/Footer';
import { LoadingSequence } from './components/loading/LoadingSequence';

export function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#020914] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {loading && <LoadingSequence onComplete={() => setLoading(false)} />}

      <OceanCanvas />

      <MinimalNav />
      <DepthGauge />

      <main className="relative z-10 flex flex-col w-full">
        <Hero />
        <AboutSection />
        <ProjectSection />
        <SkillConstellation />
        <LabSection />
        <GitHubAbyssPortal />
        <EngineeringMindset />
        <Footer />
      </main>
    </div>
  );
}

export default App;
