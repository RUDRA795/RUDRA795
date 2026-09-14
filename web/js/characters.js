/**
 * Anime Character Manager & Renderer
 * Preloads high-resolution anime warrior images and renders them with intense animated energy auras
 */

class CharacterRenderer {
  constructor() {
    this.images = {};
    this.loadedCount = 0;
    this.preload();
  }

  preload() {
    CONFIG.characters.forEach(char => {
      const img = new Image();
      img.src = char.image;
      img.onload = () => {
        this.images[char.id] = img;
        this.loadedCount++;
      };
    });
  }

  render(ctx, character, x, y, scale = 1, alpha = 1) {
    if (!character || alpha <= 0) return;

    const img = this.images[character.id];
    ctx.save();
    ctx.globalAlpha = Math.min(1, Math.max(0, alpha));

    const pri = character.primaryColor;
    const sec = character.secondaryColor;
    const acc = character.accentColor;

    // Levitation floating motion
    const floatY = y + Math.sin(Date.now() * 0.003) * 10;

    // 1. Intense Pulsing Aura Glow behind character
    const time = Date.now() * 0.003;
    const auraPulse = Math.sin(time) * 15;
    const glowRadius = (window.innerWidth < 768 ? 220 : 320) + auraPulse;

    const auraGrad = ctx.createRadialGradient(x, floatY, 80, x, floatY, glowRadius);
    auraGrad.addColorStop(0, pri);
    auraGrad.addColorStop(0.4, sec);
    auraGrad.addColorStop(0.8, 'rgba(0, 0, 0, 0.4)');
    auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = auraGrad;
    ctx.beginPath();
    ctx.arc(x, floatY, glowRadius, 0, Math.PI * 2);
    ctx.fill();

    // 2. Swirling Energy Aura Rings
    ctx.save();
    ctx.translate(x, floatY);
    ctx.rotate(time * 0.5);
    ctx.strokeStyle = pri;
    ctx.lineWidth = 2;
    ctx.shadowBlur = 20;
    ctx.shadowColor = pri;
    ctx.beginPath();
    ctx.ellipse(0, 0, glowRadius * 0.75, glowRadius * 0.45, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.rotate(-time * 0.9);
    ctx.strokeStyle = acc;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([16, 12]);
    ctx.beginPath();
    ctx.ellipse(0, 0, glowRadius * 0.85, glowRadius * 0.55, 0.4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 3. Render High-Resolution Anime Warrior Card with Holographic Cyber Frame
    const cardWidth = window.innerWidth < 768 ? 320 : 540;
    const cardHeight = cardWidth * (9 / 16);
    const cardX = x - cardWidth / 2;
    const cardY = floatY - cardHeight / 2;

    if (img && img.complete) {
      ctx.save();
      // Rounded Card Clip with cyber-corner cutouts
      ctx.beginPath();
      const r = 16;
      ctx.moveTo(cardX + r, cardY);
      ctx.lineTo(cardX + cardWidth - r, cardY);
      ctx.quadraticCurveTo(cardX + cardWidth, cardY, cardX + cardWidth, cardY + r);
      ctx.lineTo(cardX + cardWidth, cardY + cardHeight - r);
      ctx.quadraticCurveTo(cardX + cardWidth, cardY + cardHeight, cardX + cardWidth - r, cardY + cardHeight);
      ctx.lineTo(cardX + r, cardY + cardHeight);
      ctx.quadraticCurveTo(cardX, cardY + cardHeight, cardX, cardY + cardHeight - r);
      ctx.lineTo(cardX, cardY + r);
      ctx.quadraticCurveTo(cardX, cardY, cardX + r, cardY);
      ctx.closePath();
      ctx.clip();

      // Draw the anime image
      ctx.drawImage(img, cardX, cardY, cardWidth, cardHeight);

      // Cyber scanline & gradient overlay
      const overlayGrad = ctx.createLinearGradient(cardX, cardY, cardX, cardY + cardHeight);
      overlayGrad.addColorStop(0, 'rgba(0,0,0,0.1)');
      overlayGrad.addColorStop(0.7, 'rgba(0,0,0,0.2)');
      overlayGrad.addColorStop(1, 'rgba(0,0,0,0.7)');
      ctx.fillStyle = overlayGrad;
      ctx.fillRect(cardX, cardY, cardWidth, cardHeight);
      ctx.restore();

      // 4. Glowing Holographic Border
      ctx.save();
      ctx.strokeStyle = pri;
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 25;
      ctx.shadowColor = pri;
      ctx.strokeRect(cardX, cardY, cardWidth, cardHeight);

      // Corner tech decals
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      const cornerSize = 20;
      // Top Left
      ctx.beginPath();
      ctx.moveTo(cardX - 4, cardY + cornerSize); ctx.lineTo(cardX - 4, cardY - 4); ctx.lineTo(cardX + cornerSize, cardY - 4);
      ctx.stroke();
      // Top Right
      ctx.beginPath();
      ctx.moveTo(cardX + cardWidth - cornerSize, cardY - 4); ctx.lineTo(cardX + cardWidth + 4, cardY - 4); ctx.lineTo(cardX + cardWidth + 4, cardY + cornerSize);
      ctx.stroke();
      // Bottom Left
      ctx.beginPath();
      ctx.moveTo(cardX - 4, cardY + cardHeight - cornerSize); ctx.lineTo(cardX - 4, cardY + cardHeight + 4); ctx.lineTo(cardX + cornerSize, cardY + cardHeight + 4);
      ctx.stroke();
      // Bottom Right
      ctx.beginPath();
      ctx.moveTo(cardX + cardWidth - cornerSize, cardY + cardHeight + 4); ctx.lineTo(cardX + cardWidth + 4, cardY + cardHeight + 4); ctx.lineTo(cardX + cardWidth + 4, cardY + cardHeight - cornerSize);
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();
  }
}

window.CharacterRenderer = CharacterRenderer;
