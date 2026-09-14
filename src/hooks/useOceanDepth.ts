import { useState, useEffect } from 'react';
import type { OceanZone } from '../types';

export function useOceanDepth() {
  const [depthPercent, setDepthPercent] = useState<number>(0);
  const [depthMeters, setDepthMeters] = useState<number>(0);
  const [currentZone, setCurrentZone] = useState<OceanZone>('SURFACE');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrolled = window.scrollY;
          const percent = docHeight > 0 ? Math.min(1, Math.max(0, scrolled / docHeight)) : 0;
          
          setDepthPercent(percent);
          const meters = Math.round(percent * 11000);
          setDepthMeters(meters);

          if (percent < 0.12) {
            setCurrentZone('SURFACE');
          } else if (percent < 0.28) {
            setCurrentZone('SHALLOW');
          } else if (percent < 0.48) {
            setCurrentZone('MID_WATER');
          } else if (percent < 0.72) {
            setCurrentZone('DEEP_WATER');
          } else if (percent < 0.88) {
            setCurrentZone('ABYSS');
          } else if (percent < 0.96) {
            setCurrentZone('DEEP_CORE');
          } else {
            setCurrentZone('SURFACE_RETURN');
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { depthPercent, depthMeters, currentZone };
}
