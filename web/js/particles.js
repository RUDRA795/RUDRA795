/**
 * Cinematic Particle Engine - High-Performance Canvas 2D
 * Handles Void, Core Charging, Supernova Shockwaves & Persistent Energy Aura
 */

class ParticleEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;

    this.particles = [];
    this.shockwaves = [];
    this.lightningArcs = [];
    this.activeCharacter = null;
    this.phase = 'VOID'; // 'VOID' | 'CORE' | 'BOOM' | 'AURA' | 'REVEAL'
    this.coreRadius = 2;
    this.coreMaxRadius = 45;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.maxParticles = window.innerWidth < 768 ? 120 : 250;
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
  }

  setCharacter(char) {
    this.activeCharacter = char;
  }

  setPhase(phase) {
    this.phase = phase;
    if (phase === 'BOOM') {
      this.triggerExplosion();
    }
  }

  triggerExplosion() {
    const primary = this.activeCharacter ? this.activeCharacter.primaryColor : '#00f0ff';
    const accent = this.activeCharacter ? this.activeCharacter.accentColor : '#ffffff';

    // 1. Expanding shockwave rings
    this.shockwaves.push({
      radius: 5,
      maxRadius: Math.max(this.width, this.height) * 0.9,
      speed: 28,
      lineWidth: 8,
      color: accent,
      opacity: 1
    });
    this.shockwaves.push({
      radius: 1,
      maxRadius: Math.max(this.width, this.height) * 0.75,
      speed: 20,
      lineWidth: 16,
      color: primary,
      opacity: 0.9
    });

    // 2. High-speed radial explosive fragments
    const count = this.isReducedMotion ? 40 : (window.innerWidth < 768 ? 80 : 180);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 22 + 4;
      this.particles.push({
        x: this.centerX,
        y: this.centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 1.5,
        color: Math.random() > 0.4 ? primary : accent,
        alpha: 1,
        decay: Math.random() * 0.025 + 0.012,
        type: 'fragment'
      });
    }
  }

  update() {
    const primary = this.activeCharacter ? this.activeCharacter.primaryColor : '#00f0ff';
    const secondary = this.activeCharacter ? this.activeCharacter.secondaryColor : '#38bdf8';
    const accent = this.activeCharacter ? this.activeCharacter.accentColor : '#ffffff';

    // Spawn Phase-specific particles
    if (this.phase === 'VOID') {
      if (Math.random() < 0.25 && this.particles.length < 30) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 0.5,
          color: primary,
          alpha: Math.random() * 0.5 + 0.2,
          decay: 0.002,
          type: 'void-ember'
        });
      }
    } else if (this.phase === 'CORE') {
      // Inward spiraling energy particles
      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 220 + 80;
        this.particles.push({
          x: this.centerX + Math.cos(angle) * dist,
          y: this.centerY + Math.sin(angle) * dist,
          targetX: this.centerX,
          targetY: this.centerY,
          speed: Math.random() * 0.06 + 0.03,
          size: Math.random() * 2.5 + 1,
          color: Math.random() > 0.5 ? primary : accent,
          alpha: 1,
          type: 'core-inflow'
        });
      }

      // Random electromagnetic lightning arcs
      if (Math.random() < 0.35) {
        this.lightningArcs.push({
          angle: Math.random() * Math.PI * 2,
          length: Math.random() * 70 + 40,
          color: accent,
          alpha: 1
        });
      }
    } else if (this.phase === 'AURA' || this.phase === 'REVEAL') {
      // Ascending plasma aura stream
      const auraLimit = this.isReducedMotion ? 40 : (window.innerWidth < 768 ? 70 : 140);
      if (this.particles.length < auraLimit) {
        for (let i = 0; i < 2; i++) {
          const spawnX = this.centerX + (Math.random() - 0.5) * 180;
          this.particles.push({
            x: spawnX,
            y: this.centerY + 160 + (Math.random() - 0.5) * 40,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -(Math.random() * 4 + 2),
            baseX: spawnX,
            time: Math.random() * 10,
            size: Math.random() * 3 + 1,
            color: Math.random() > 0.35 ? primary : (Math.random() > 0.5 ? secondary : accent),
            alpha: Math.random() * 0.8 + 0.2,
            decay: Math.random() * 0.012 + 0.008,
            type: 'aura-flame'
          });
        }
      }
    }

    // Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      if (p.type === 'core-inflow') {
        p.x += (p.targetX - p.x) * p.speed;
        p.y += (p.targetY - p.y) * p.speed;
        const dist = Math.hypot(p.targetX - p.x, p.targetY - p.y);
        if (dist < 10) {
          this.particles.splice(i, 1);
          continue;
        }
      } else if (p.type === 'aura-flame') {
        p.time += 0.06;
        p.x = p.baseX + Math.sin(p.time) * 16;
        p.y += p.vy;
        p.alpha -= p.decay;
        if (p.alpha <= 0 || p.y < this.centerY - 220) {
          this.particles.splice(i, 1);
          continue;
        }
      } else {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.alpha -= p.decay;
        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
          continue;
        }
      }
    }

    // Update Shockwaves
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const s = this.shockwaves[i];
      s.radius += s.speed;
      s.opacity = 1 - (s.radius / s.maxRadius);
      if (s.opacity <= 0 || s.radius >= s.maxRadius) {
        this.shockwaves.splice(i, 1);
      }
    }

    // Update Lightning Arcs
    for (let i = this.lightningArcs.length - 1; i >= 0; i--) {
      const arc = this.lightningArcs[i];
      arc.alpha -= 0.15;
      if (arc.alpha <= 0) {
        this.lightningArcs.splice(i, 1);
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    const primary = this.activeCharacter ? this.activeCharacter.primaryColor : '#00f0ff';
    const accent = this.activeCharacter ? this.activeCharacter.accentColor : '#ffffff';

    // 1. Draw Phase 01: The Void Singularity
    if (this.phase === 'VOID') {
      this.ctx.save();
      const grad = this.ctx.createRadialGradient(this.centerX, this.centerY, 0, this.centerX, this.centerY, 18);
      grad.addColorStop(0, accent);
      grad.addColorStop(0.3, primary);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      this.ctx.fillStyle = grad;
      this.ctx.beginPath();
      this.ctx.arc(this.centerX, this.centerY, 18, 0, Math.PI * 2);
      this.ctx.fill();

      // Core point
      this.ctx.fillStyle = accent;
      this.ctx.beginPath();
      this.ctx.arc(this.centerX, this.centerY, 2.5, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // 2. Draw Phase 02: Resonating Energy Core
    if (this.phase === 'CORE') {
      this.ctx.save();
      // Outer glow
      const grad = this.ctx.createRadialGradient(this.centerX, this.centerY, 0, this.centerX, this.centerY, 140);
      grad.addColorStop(0, accent);
      grad.addColorStop(0.25, primary);
      grad.addColorStop(0.7, 'rgba(0, 240, 255, 0.2)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      this.ctx.fillStyle = grad;
      this.ctx.beginPath();
      this.ctx.arc(this.centerX, this.centerY, 140, 0, Math.PI * 2);
      this.ctx.fill();

      // Energy rings
      const time = Date.now() * 0.003;
      this.ctx.strokeStyle = primary;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(this.centerX, this.centerY, 50 + Math.sin(time) * 10, 0, Math.PI * 2);
      this.ctx.stroke();

      this.ctx.strokeStyle = accent;
      this.ctx.lineWidth = 1.5;
      this.ctx.setLineDash([12, 8]);
      this.ctx.beginPath();
      this.ctx.arc(this.centerX, this.centerY, 75 + Math.cos(time) * 8, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.setLineDash([]);

      // Lightning Arcs
      this.lightningArcs.forEach(arc => {
        this.ctx.strokeStyle = arc.color;
        this.ctx.globalAlpha = arc.alpha;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        let currX = this.centerX;
        let currY = this.centerY;
        this.ctx.moveTo(currX, currY);
        const steps = 4;
        const stepDist = arc.length / steps;
        for (let s = 1; s <= steps; s++) {
          const jitter = (Math.random() - 0.5) * 18;
          currX = this.centerX + Math.cos(arc.angle) * (s * stepDist) + jitter;
          currY = this.centerY + Math.sin(arc.angle) * (s * stepDist) + jitter;
          this.ctx.lineTo(currX, currY);
        }
        this.ctx.stroke();
      });
      this.ctx.restore();
    }

    // 3. Draw Shockwaves (Phase 03 Boom)
    this.shockwaves.forEach(s => {
      this.ctx.save();
      this.ctx.strokeStyle = s.color;
      this.ctx.lineWidth = s.lineWidth * (1 - s.radius / s.maxRadius);
      this.ctx.globalAlpha = Math.max(0, s.opacity);
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = s.color;
      this.ctx.beginPath();
      this.ctx.arc(this.centerX, this.centerY, s.radius, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.restore();
    });

    // 4. Draw Particles
    this.particles.forEach(p => {
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    // 5. Draw Active Energy Aura Field (Phases 04 & 05)
    if (this.phase === 'AURA' || this.phase === 'REVEAL') {
      this.ctx.save();
      const auraGrad = this.ctx.createRadialGradient(
        this.centerX, this.centerY + 20, 40,
        this.centerX, this.centerY + 20, 240
      );
      auraGrad.addColorStop(0, primary);
      auraGrad.addColorStop(0.5, 'rgba(0, 240, 255, 0.15)');
      auraGrad.addColorStop(1, 'rgba(0,0,0,0)');
      this.ctx.fillStyle = auraGrad;
      this.ctx.beginPath();
      this.ctx.arc(this.centerX, this.centerY + 20, 240, 0, Math.PI * 2);
      this.ctx.fill();

      // Orbiting energetic ellipses
      const t = Date.now() * 0.002;
      this.ctx.strokeStyle = primary;
      this.ctx.lineWidth = 1.5;
      this.ctx.globalAlpha = 0.4;
      this.ctx.beginPath();
      this.ctx.ellipse(this.centerX, this.centerY + 160, 140, 22, 0, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.restore();
    }
  }

  render() {
    this.update();
    this.draw();
  }
}

window.ParticleEngine = ParticleEngine;
