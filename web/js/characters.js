/**
 * Original Anime-Inspired AI Warriors - Procedural Vector Canvas Renderer
 * Renders distinct silhouettes, armor plates, weapons & glowing visors
 */

class CharacterRenderer {
  constructor() {
    this.floatOffset = 0;
  }

  render(ctx, character, x, y, scale = 1, alpha = 1) {
    if (!character || alpha <= 0) return;

    ctx.save();
    ctx.globalAlpha = Math.min(1, Math.max(0, alpha));
    ctx.translate(x, y + Math.sin(Date.now() * 0.003) * 8); // subtle levitation
    ctx.scale(scale, scale);

    const pri = character.primaryColor;
    const sec = character.secondaryColor;
    const acc = character.accentColor;

    // Dispatch to specific character renderer
    switch (character.id) {
      case 'blue-warrior':
        this.renderBlueWarrior(ctx, pri, sec, acc);
        break;
      case 'golden-warrior':
        this.renderGoldenWarrior(ctx, pri, sec, acc);
        break;
      case 'void-warrior':
        this.renderVoidWarrior(ctx, pri, sec, acc);
        break;
      case 'cyber-warrior':
        this.renderCyberWarrior(ctx, pri, sec, acc);
        break;
      case 'celestial-warrior':
        this.renderCelestialWarrior(ctx, pri, sec, acc);
        break;
      default:
        this.renderBlueWarrior(ctx, pri, sec, acc);
    }

    ctx.restore();
  }

  /**
   * 1. CYAN WARRIOR (Dual kinetic photon blades & cybernetic high-speed mantle)
   */
  renderBlueWarrior(ctx, pri, sec, acc) {
    // Weapons: Dual Sabers
    ctx.strokeStyle = pri;
    ctx.lineWidth = 4;
    ctx.shadowBlur = 18;
    ctx.shadowColor = pri;
    ctx.beginPath();
    ctx.moveTo(-110, 80); ctx.lineTo(-45, -110);
    ctx.moveTo(110, 80); ctx.lineTo(45, -110);
    ctx.stroke();

    ctx.strokeStyle = acc;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Cyber Mantle Wings
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = pri;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-45, -10); ctx.lineTo(-90, -60); ctx.lineTo(-60, -5); ctx.lineTo(-100, 35); ctx.lineTo(-40, 15); ctx.closePath();
    ctx.fill(); ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(45, -10); ctx.lineTo(90, -60); ctx.lineTo(60, -5); ctx.lineTo(100, 35); ctx.lineTo(40, 15); ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Body Armor
    this.renderCommonExosuit(ctx, pri, sec, acc);

    // Spiky High-Speed Anime Crest
    ctx.fillStyle = '#0c192e';
    ctx.strokeStyle = pri;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -105); ctx.lineTo(-12, -75); ctx.lineTo(-30, -88); ctx.lineTo(-20, -65); ctx.lineTo(-36, -60); ctx.lineTo(-16, -50);
    ctx.lineTo(0, -62);
    ctx.lineTo(16, -50); ctx.lineTo(36, -60); ctx.lineTo(20, -65); ctx.lineTo(30, -88); ctx.lineTo(12, -75);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Cyan Visor Glow
    ctx.fillStyle = pri;
    ctx.shadowBlur = 14;
    ctx.shadowColor = pri;
    ctx.fillRect(-16, -48, 32, 4);
    ctx.fillStyle = acc;
    ctx.fillRect(-8, -47, 16, 2);
  }

  /**
   * 2. GOLDEN WARRIOR (Solar flare corona & solar energy glaive)
   */
  renderGoldenWarrior(ctx, pri, sec, acc) {
    // Solar Crest Halo
    ctx.strokeStyle = pri;
    ctx.lineWidth = 2;
    ctx.shadowBlur = 15;
    ctx.shadowColor = pri;
    ctx.beginPath();
    ctx.arc(0, -60, 42, 0, Math.PI * 2);
    ctx.stroke();

    // Solar Glaive Staff
    ctx.strokeStyle = pri;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(85, 120); ctx.lineTo(-85, -125);
    ctx.stroke();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Solar Energy Flares
    ctx.fillStyle = '#2d1500';
    ctx.strokeStyle = pri;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-45, -10); ctx.lineTo(-115, -60); ctx.lineTo(-75, 10); ctx.lineTo(-120, 70); ctx.lineTo(-40, 20); ctx.closePath();
    ctx.fill(); ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(45, -10); ctx.lineTo(115, -60); ctx.lineTo(75, 10); ctx.lineTo(120, 70); ctx.lineTo(40, 20); ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Body Armor
    this.renderCommonExosuit(ctx, pri, sec, acc, '#1a0d03', '#451a03');

    // Solar Ascendant Crown
    ctx.fillStyle = '#2d1500';
    ctx.strokeStyle = pri;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, -118); ctx.lineTo(-15, -80); ctx.lineTo(-35, -92); ctx.lineTo(-22, -68); ctx.lineTo(-40, -60); ctx.lineTo(-18, -50);
    ctx.lineTo(0, -65);
    ctx.lineTo(18, -50); ctx.lineTo(40, -60); ctx.lineTo(22, -68); ctx.lineTo(35, -92); ctx.lineTo(15, -80);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Golden Visor
    ctx.fillStyle = acc;
    ctx.shadowBlur = 16;
    ctx.shadowColor = acc;
    ctx.fillRect(-16, -48, 32, 4);
  }

  /**
   * 3. VOID WARRIOR (Quantum singularity mantle & dimensional scythe)
   */
  renderVoidWarrior(ctx, pri, sec, acc) {
    // Void Scythe Curve
    ctx.strokeStyle = pri;
    ctx.lineWidth = 3.5;
    ctx.shadowBlur = 16;
    ctx.shadowColor = pri;
    ctx.beginPath();
    ctx.moveTo(75, -110);
    ctx.quadraticCurveTo(110, -60, 80, 120);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(75, -110);
    ctx.quadraticCurveTo(35, -130, -15, -105);
    ctx.stroke();

    // Dimensional Rift Shards
    ctx.fillStyle = '#180728';
    ctx.strokeStyle = pri;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-50, -10); ctx.lineTo(-110, -65); ctx.lineTo(-70, 5); ctx.lineTo(-120, 50); ctx.lineTo(-45, 18); ctx.closePath();
    ctx.fill(); ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(50, -10); ctx.lineTo(110, -65); ctx.lineTo(70, 5); ctx.lineTo(120, 50); ctx.lineTo(45, 18); ctx.closePath();
    ctx.fill(); ctx.stroke();

    this.renderCommonExosuit(ctx, pri, sec, acc, '#0b0213', '#2e1065');

    // Void Horns
    ctx.fillStyle = '#1e0c38';
    ctx.strokeStyle = pri;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(0, -115); ctx.lineTo(-14, -75); ctx.lineTo(-34, -88); ctx.lineTo(-24, -66); ctx.lineTo(-42, -58); ctx.lineTo(-18, -48);
    ctx.lineTo(0, -64);
    ctx.lineTo(18, -48); ctx.lineTo(42, -58); ctx.lineTo(24, -66); ctx.lineTo(34, -88); ctx.lineTo(14, -75);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Purple Visor
    ctx.fillStyle = acc;
    ctx.shadowBlur = 15;
    ctx.shadowColor = pri;
    ctx.fillRect(-15, -48, 30, 4);
  }

  /**
   * 4. CYBER WARRIOR (Hexagonal matrix aegis shields)
   */
  renderCyberWarrior(ctx, pri, sec, acc) {
    // Floating Holographic Aegis Shields
    ctx.fillStyle = 'rgba(8, 51, 68, 0.8)';
    ctx.strokeStyle = pri;
    ctx.lineWidth = 2;
    ctx.shadowBlur = 14;
    ctx.shadowColor = pri;

    ctx.beginPath();
    ctx.moveTo(-100, -35); ctx.lineTo(-140, -10); ctx.lineTo(-120, 45); ctx.lineTo(-85, 20); ctx.closePath();
    ctx.fill(); ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, -35); ctx.lineTo(140, -10); ctx.lineTo(120, 45); ctx.lineTo(85, 20); ctx.closePath();
    ctx.fill(); ctx.stroke();

    this.renderCommonExosuit(ctx, pri, sec, acc, '#031922', '#0e7490');

    // Matrix Helm
    ctx.fillStyle = '#083344';
    ctx.strokeStyle = pri;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(0, -110); ctx.lineTo(-14, -75); ctx.lineTo(-30, -86); ctx.lineTo(-20, -65); ctx.lineTo(-38, -58); ctx.lineTo(-16, -48);
    ctx.lineTo(0, -62);
    ctx.lineTo(16, -48); ctx.lineTo(38, -58); ctx.lineTo(20, -65); ctx.lineTo(30, -86); ctx.lineTo(14, -75);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Cyan Matrix Visor
    ctx.fillStyle = '#a5f3fc';
    ctx.shadowBlur = 15;
    ctx.shadowColor = pri;
    ctx.fillRect(-16, -48, 32, 4);
  }

  /**
   * 5. CELESTIAL WARRIOR (Astral starlight wings & twin orbital halos)
   */
  renderCelestialWarrior(ctx, pri, sec, acc) {
    // Twin Halos
    ctx.strokeStyle = pri;
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 14;
    ctx.shadowColor = acc;
    ctx.beginPath();
    ctx.ellipse(0, -65, 34, 10, -0.2, 0, Math.PI * 2);
    ctx.stroke();

    // Astral Starlight Wings
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#bfdbfe';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-50, -15); ctx.lineTo(-130, -80); ctx.lineTo(-80, 5); ctx.lineTo(-135, 60); ctx.lineTo(-50, 20); ctx.closePath();
    ctx.fill(); ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(50, -15); ctx.lineTo(130, -80); ctx.lineTo(80, 5); ctx.lineTo(135, 60); ctx.lineTo(50, 20); ctx.closePath();
    ctx.fill(); ctx.stroke();

    this.renderCommonExosuit(ctx, pri, sec, acc, '#0a1329', '#1e3a8a');

    // Angelic Anime Spikes
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(0, -120); ctx.lineTo(-15, -80); ctx.lineTo(-34, -92); ctx.lineTo(-22, -68); ctx.lineTo(-42, -60); ctx.lineTo(-18, -50);
    ctx.lineTo(0, -65);
    ctx.lineTo(18, -50); ctx.lineTo(42, -60); ctx.lineTo(22, -68); ctx.lineTo(34, -92); ctx.lineTo(15, -80);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Pure Starlight Visor
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 18;
    ctx.shadowColor = '#ffffff';
    ctx.fillRect(-16, -48, 32, 4);
  }

  /**
   * Common Exosuit Base (Chest, Pauldrons, Core Reactor)
   */
  renderCommonExosuit(ctx, pri, sec, acc, darkFill = '#070d18', midFill = '#111827') {
    // Torso Plate
    ctx.fillStyle = darkFill;
    ctx.strokeStyle = sec;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-25, -25); ctx.lineTo(25, -25); ctx.lineTo(34, 35); ctx.lineTo(18, 95); ctx.lineTo(-18, 95); ctx.lineTo(-34, 35);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Inner Inset Plate
    ctx.fillStyle = midFill;
    ctx.strokeStyle = pri;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-15, -15); ctx.lineTo(15, -15); ctx.lineTo(22, 28); ctx.lineTo(0, 52); ctx.lineTo(-22, 28);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Chest Arc Reactor Core
    ctx.fillStyle = pri;
    ctx.shadowBlur = 16;
    ctx.shadowColor = pri;
    ctx.beginPath();
    ctx.moveTo(0, 5); ctx.lineTo(-10, 22); ctx.lineTo(10, 22);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = acc;
    ctx.beginPath();
    ctx.arc(0, 16, 4, 0, Math.PI * 2);
    ctx.fill();

    // Pauldrons
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = pri;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-25, -25); ctx.lineTo(-50, -38); ctx.lineTo(-58, -10); ctx.lineTo(-30, -6);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(25, -25); ctx.lineTo(50, -38); ctx.lineTo(58, -10); ctx.lineTo(30, -6);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Neck & Head Mask Base
    ctx.fillStyle = darkFill;
    ctx.strokeStyle = sec;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-18, -58); ctx.lineTo(18, -58); ctx.lineTo(14, -35); ctx.lineTo(-14, -35);
    ctx.closePath();
    ctx.fill(); ctx.stroke();
  }
}

window.CharacterRenderer = CharacterRenderer;
