import { useState, useEffect } from 'react';

export function useDeviceTier() {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [particleMultiplier, setParticleMultiplier] = useState(1);

  useEffect(() => {
    const checkMedia = () => {
      const mobile = window.innerWidth < 768;
      const tablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      setIsMobile(mobile);
      setPrefersReducedMotion(reduced);

      if (reduced) {
        setParticleMultiplier(0.15);
      } else if (mobile) {
        setParticleMultiplier(0.35);
      } else if (tablet) {
        setParticleMultiplier(0.65);
      } else {
        setParticleMultiplier(1.0);
      }
    };

    checkMedia();
    window.addEventListener('resize', checkMedia);
    return () => window.removeEventListener('resize', checkMedia);
  }, []);

  return { isMobile, prefersReducedMotion, particleMultiplier };
}
