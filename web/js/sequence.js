/**
 * Cinematic Sequence Controller (Phases 01 to 06)
 * Orchestrates timings, camera shake, screen flash, sound triggers & identity reveals
 */

class SequenceController {
  constructor(particleEngine, characterRenderer) {
    this.particles = particleEngine;
    this.renderer = characterRenderer;
    this.currentPhase = 'VOID';
    this.characterAlpha = 0;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.timers = [];
    this.onPhaseChangeCallbacks = [];
  }

  onPhaseChange(cb) {
    this.onPhaseChangeCallbacks.push(cb);
  }

  notifyPhaseChange(phase) {
    this.currentPhase = phase;
    this.particles.setPhase(phase);
    this.onPhaseChangeCallbacks.forEach(cb => cb(phase));
  }

  start(character) {
    this.clearTimers();
    this.character = character;
    this.particles.setCharacter(character);
    this.characterAlpha = 0;

    const flash = document.getElementById('screenFlash');
    const container = document.getElementById('shakeContainer');
    const hudPhase = document.getElementById('hudPhaseText');
    const identityOverlay = document.getElementById('identityRevealOverlay');

    if (identityOverlay) {
      identityOverlay.classList.remove('active', 'step-1', 'step-2', 'step-3');
    }

    if (this.isReducedMotion) {
      // Jump directly to reveal for accessibility
      this.characterAlpha = 1;
      this.notifyPhaseChange('REVEAL');
      if (hudPhase) hudPhase.textContent = 'PHASE 06 // IDENTITY REVEAL';
      if (identityOverlay) identityOverlay.classList.add('active', 'step-1', 'step-2', 'step-3');
      return;
    }

    // PHASE 01: VOID (0 - 1.2s)
    this.notifyPhaseChange('VOID');
    if (hudPhase) hudPhase.textContent = 'PHASE 01 // VOID INITIATION';

    // PHASE 02: ENERGY CORE (1.2s - 2.8s)
    this.timers.push(setTimeout(() => {
      this.notifyPhaseChange('CORE');
      if (hudPhase) hudPhase.textContent = 'PHASE 02 // ENERGY CORE CONVERGENCE';
      if (window.soundEngine) window.soundEngine.playChargeHum(1.6);
    }, 1200));

    // PHASE 03: BOOM (2.8s)
    this.timers.push(setTimeout(() => {
      this.notifyPhaseChange('BOOM');
      if (hudPhase) hudPhase.textContent = 'PHASE 03 // SUPERNOVA BOOM';
      
      // Screen Flash
      if (flash) {
        flash.classList.add('flash-active');
        setTimeout(() => flash.classList.remove('flash-active'), 400);
      }

      // Camera Shake
      if (container) {
        container.classList.add('shake-active');
        setTimeout(() => container.classList.remove('shake-active'), 600);
      }

      // Sound Boom
      if (window.soundEngine) window.soundEngine.playBoom();
    }, 2800));

    // PHASE 04: AURA FORMATION (3.4s)
    this.timers.push(setTimeout(() => {
      this.notifyPhaseChange('AURA');
      if (hudPhase) hudPhase.textContent = 'PHASE 04 // AURA RESONANCE';
      if (window.soundEngine) window.soundEngine.startAuraLoop(220);
    }, 3400));

    // PHASE 05: CHARACTER MATERIALIZATION (4.6s)
    this.timers.push(setTimeout(() => {
      this.notifyPhaseChange('MATERIALIZATION');
      if (hudPhase) hudPhase.textContent = 'PHASE 05 // WARRIOR MATERIALIZATION';
      
      // Smooth fade-in of character
      const fadeInInterval = setInterval(() => {
        this.characterAlpha += 0.05;
        if (this.characterAlpha >= 1) {
          this.characterAlpha = 1;
          clearInterval(fadeInInterval);
        }
      }, 30);
    }, 4600));

    // PHASE 06: IDENTITY REVEAL (5.8s)
    this.timers.push(setTimeout(() => {
      this.notifyPhaseChange('REVEAL');
      if (hudPhase) hudPhase.textContent = 'PHASE 06 // IDENTITY REVEAL';

      if (identityOverlay) {
        identityOverlay.classList.add('active');
        setTimeout(() => identityOverlay.classList.add('step-1'), 200);
        setTimeout(() => identityOverlay.classList.add('step-2'), 700);
        setTimeout(() => identityOverlay.classList.add('step-3'), 1200);
      }

      if (window.soundEngine) window.soundEngine.playChirp(1046);
    }, 5800));
  }

  skip() {
    this.clearTimers();
    this.characterAlpha = 1;
    this.notifyPhaseChange('REVEAL');

    const flash = document.getElementById('screenFlash');
    const container = document.getElementById('shakeContainer');
    const hudPhase = document.getElementById('hudPhaseText');
    const identityOverlay = document.getElementById('identityRevealOverlay');

    if (flash) flash.classList.remove('flash-active');
    if (container) container.classList.remove('shake-active');
    if (hudPhase) hudPhase.textContent = 'PHASE 06 // IDENTITY REVEAL';

    if (identityOverlay) {
      identityOverlay.classList.add('active', 'step-1', 'step-2', 'step-3');
    }
  }

  clearTimers() {
    this.timers.forEach(t => clearTimeout(t));
    this.timers = [];
  }
}

window.SequenceController = SequenceController;
