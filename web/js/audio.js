/**
 * Web Audio API Procedural Sound Engine
 * Zero external audio dependencies - 100% synthesized in real-time
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // Start muted for accessibility & autoplay policies
    this.auraOsc = null;
    this.auraGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.init();
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.auraGain) {
      this.auraGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  /**
   * Phase 02: Resonant drone ascending in frequency as core expands
   */
  playChargeHum(duration = 1.6) {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(70, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + duration);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(150, now);
      filter.frequency.exponentialRampToValueAtTime(1800, now + duration);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.2, now + duration * 0.8);
      gain.gain.linearRampToValueAtTime(0.35, now + duration);
      gain.gain.setValueAtTime(0, now + duration + 0.05);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  /**
   * Phase 03: Dramatic Supernova BOOM (Sub-bass punch + explosive filtered noise)
   */
  playBoom() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;

      // 1. Sub-bass punch (sine wave 120Hz -> 25Hz)
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(140, now);
      subOsc.frequency.exponentialRampToValueAtTime(28, now + 1.2);

      subGain.gain.setValueAtTime(0.8, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 1.5);

      // 2. White noise explosion burst
      const bufferSize = this.ctx.sampleRate * 1.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.25));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(2500, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(120, now + 1.2);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.6, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 1.3);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  /**
   * Phase 04-05: Radiant Aura Resonance
   */
  startAuraLoop(freq = 180) {
    if (this.isMuted || !this.ctx) return;
    try {
      this.stopAuraLoop();
      const now = this.ctx.currentTime;
      this.auraOsc = this.ctx.createOscillator();
      this.auraGain = this.ctx.createGain();

      this.auraOsc.type = 'sine';
      this.auraOsc.frequency.setValueAtTime(freq, now);

      this.auraGain.gain.setValueAtTime(0.01, now);
      this.auraGain.gain.linearRampToValueAtTime(0.06, now + 1);

      this.auraOsc.connect(this.auraGain);
      this.auraGain.connect(this.ctx.destination);

      this.auraOsc.start(now);
    } catch (e) {}
  }

  stopAuraLoop() {
    if (this.auraOsc) {
      try {
        this.auraOsc.stop();
        this.auraOsc.disconnect();
      } catch (e) {}
      this.auraOsc = null;
    }
  }

  /**
   * High-tech UI click chirp
   */
  playChirp(freq = 880) {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.06);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }
}

window.soundEngine = new SoundEngine();
