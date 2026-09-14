/**
 * Main Application Script - Rohit Lakas (RUDRA795)
 * Coordinates character randomization, UI interactions & interactive project demos
 */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('heroCanvas');
  const particleEngine = new ParticleEngine(canvas);
  const characterRenderer = new CharacterRenderer();
  const sequence = new SequenceController(particleEngine, characterRenderer);

  // 1. Random Character Selection on Initialization
  const characters = CONFIG.characters;
  const randomIndex = Math.floor(Math.random() * characters.length);
  let activeChar = characters[randomIndex];

  // 2. Setup HUD & Canvas Rendering Loop
  function renderLoop() {
    particleEngine.render();
    
    // Render character in Phase 05 & 06
    if (sequence.currentPhase === 'MATERIALIZATION' || sequence.currentPhase === 'REVEAL') {
      const charScale = window.innerWidth < 768 ? 0.75 : 1;
      const charY = particleEngine.centerY - (window.innerWidth < 768 ? 40 : 20);
      characterRenderer.render(
        particleEngine.ctx,
        activeChar,
        particleEngine.centerX,
        charY,
        charScale,
        sequence.characterAlpha
      );
    }

    requestAnimationFrame(renderLoop);
  }
  requestAnimationFrame(renderLoop);

  // 3. Start Opening Transformation Sequence
  sequence.start(activeChar);
  updateThemeColors(activeChar);
  updateCharacterDockActive(activeChar.id);

  // 4. Character Switcher Dock
  const dockButtons = document.querySelectorAll('.char-dock-btn');
  dockButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const charId = btn.getAttribute('data-char');
      const found = characters.find(c => c.id === charId);
      if (found && found.id !== activeChar.id) {
        if (window.soundEngine) window.soundEngine.playChirp(720);
        switchCharacter(found);
      }
    });
  });

  function switchCharacter(char) {
    activeChar = char;
    updateThemeColors(char);
    updateCharacterDockActive(char.id);
    // Restart sequence with newly chosen warrior
    sequence.start(char);
  }

  function updateCharacterDockActive(charId) {
    dockButtons.forEach(btn => {
      if (btn.getAttribute('data-char') === charId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function updateThemeColors(char) {
    document.documentElement.style.setProperty('--primary-glow', char.primaryColor);
    document.documentElement.style.setProperty('--secondary-glow', char.secondaryColor);
    document.documentElement.style.setProperty('--accent-glow', char.accentColor);

    const activeBadge = document.getElementById('activeWarriorBadge');
    if (activeBadge) {
      activeBadge.textContent = `${char.name} // ${char.weapon}`;
      activeBadge.style.borderColor = char.primaryColor;
      activeBadge.style.color = char.primaryColor;
    }
  }

  // 5. Controls: Skip Sequence, Replay, Sound Toggle
  const btnSkip = document.getElementById('btnSkipIntro');
  if (btnSkip) {
    btnSkip.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playChirp(600);
      sequence.skip();
    });
  }

  const btnReplay = document.getElementById('btnReplayIntro');
  if (btnReplay) {
    btnReplay.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playChirp(800);
      sequence.start(activeChar);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const btnSound = document.getElementById('btnSoundToggle');
  const soundIcon = document.getElementById('soundIcon');
  const soundLabel = document.getElementById('soundLabel');
  if (btnSound) {
    btnSound.addEventListener('click', () => {
      const isMuted = window.soundEngine.toggleMute();
      if (soundLabel) soundLabel.textContent = isMuted ? 'SOUND: OFF' : 'SOUND: ON';
      if (soundIcon) soundIcon.textContent = isMuted ? '🔇' : '🔊';
      btnSound.classList.toggle('active', !isMuted);
    });
  }

  // 6. Interactive Dhammu Pipeline Stepper
  const pipelineSteps = document.querySelectorAll('.pipeline-step');
  const pipelineLog = document.getElementById('pipelineConsoleLog');
  
  const stepLogs = {
    voice: "> [VOICE_ENGINE]: Audio stream buffer active. Frequency 16kHz PCM. Processing natural speech token stream...",
    understand: "> [SEMANTIC_EXTRACTOR]: Multi-turn context parsed. Intent: 'Inspect project build status and schedule triage'. Safety level: CLEAR.",
    plan: "> [AGENTIC_PLANNER]: Decomposing into Directed Acyclic Graph (DAG): [Step 1: Check git diff] -> [Step 2: Run linter] -> [Step 3: Notify UI].",
    execute: "> [DESKTOP_ORCHESTRATOR]: Dispatching sandbox API calls to local OS tools. Reading file manifests and verifying process IDs...",
    verify: "> [SAFETY_VALIDATOR]: Boundary Gate check passed. Zero destructive system commands detected. Verifying artifact integrity...",
    result: "> [EXECUTION_COMPLETE]: Goal state reached with status code 0. UI telemetry updated in real-time."
  };

  pipelineSteps.forEach(step => {
    step.addEventListener('click', () => {
      pipelineSteps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
      const stepId = step.getAttribute('data-step');
      if (pipelineLog && stepLogs[stepId]) {
        pipelineLog.textContent = stepLogs[stepId];
      }
      if (window.soundEngine) window.soundEngine.playChirp(900);
    });
  });

  // 7. Interactive OptiCure Dynamic Programming Simulator
  const btnRunOpticure = document.getElementById('btnRunOpticure');
  const opticureOutput = document.getElementById('opticureOutput');
  if (btnRunOpticure && opticureOutput) {
    btnRunOpticure.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playChirp(750);
      btnRunOpticure.disabled = true;
      opticureOutput.textContent = "Calculating Multistage Graph costs: C(Stage_3) -> C(Stage_2) -> C(Stage_1)...";

      setTimeout(() => {
        opticureOutput.innerHTML = `
          <span style="color:#34d399">&gt; [DYNAMIC PROGRAMMING CONVERGED]:</span><br>
          Optimal Path: [Patient P_0] &rarr; [Specialist B (Wait: 4m)] &rarr; [Optimal Slot 11:30 AM]<br>
          Total Latency Cost: <strong style="color:#6ee7b7">8.4 mins</strong> (Reduced from standard 42.0 mins avg).
        `;
        btnRunOpticure.disabled = false;
      }, 700);
    });
  }

  // 8. Interactive NagariX Geospatial Incident Triage
  const btnTriageNagarix = document.getElementById('btnTriageNagarix');
  const nagarixOutput = document.getElementById('nagarixOutput');
  if (btnTriageNagarix && nagarixOutput) {
    btnTriageNagarix.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playChirp(840);
      btnTriageNagarix.disabled = true;
      nagarixOutput.textContent = "Scanning Ward 42 telemetry & clustering image incident reports...";

      setTimeout(() => {
        nagarixOutput.innerHTML = `
          <span style="color:#c084fc">&gt; [CLUSTER IDENTIFIED #CL-892]:</span><br>
          Incident: Road Drainage Overflow • Reports: 14 citizen images<br>
          AI Image Triage Confidence: <strong style="color:#a855f7">94.8%</strong> • SLA Breach Risk: <span style="color:#f87171">ELEVATED (1.8 hrs remaining)</span><br>
          Cross-Department Dispatch: Roads &amp; Public Works unified ticket created.
        `;
        btnTriageNagarix.disabled = false;
      }, 700);
    });
  }

  // 9. Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.code === 'Space') {
      e.preventDefault();
      sequence.start(activeChar);
    } else if (e.code === 'KeyM') {
      if (btnSound) btnSound.click();
    } else if (e.key >= '1' && e.key <= '5') {
      const idx = parseInt(e.key) - 1;
      if (characters[idx]) switchCharacter(characters[idx]);
    }
  });

  // 10. Smooth Scroll for Jump Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
