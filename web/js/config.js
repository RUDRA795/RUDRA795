/**
 * ROHIT LAKAS (RUDRA795) - SYSTEM CONFIGURATION
 * Original Anime-Inspired AI Warriors & Project Universe
 */

const CONFIG = {
  profile: {
    name: "Rohit Lakas",
    handle: "RUDRA795",
    role: "AI Engineer in the Making",
    subtitle: "AI • ML • DATA SCIENCE • AGENTIC AI",
    tagline: "Building intelligent systems, experimenting with AI, and turning ideas into real-world products.",
    email: "lakasrohit34@gmail.com",
    githubUrl: "https://github.com/RUDRA795"
  },

  characters: [
    {
      id: "blue-warrior",
      name: "CYAN WARRIOR",
      title: "Blue Striker // Kinetic High-Speed",
      tagline: "Ultra-fast kinetic plasma blade stance",
      affinity: "AGENTIC AI & REAL-TIME INTERFACES",
      primaryColor: "#00f0ff",
      secondaryColor: "#38bdf8",
      accentColor: "#7000ff",
      glowColor: "rgba(0, 240, 255, 0.8)",
      bgGradient: "radial-gradient(circle, #0284c7 0%, #031525 60%, #020408 100%)",
      weapon: "Dual Kinetic Photon Sabers",
      auraType: "plasma-stream"
    },
    {
      id: "golden-warrior",
      name: "GOLDEN WARRIOR",
      title: "Solar Ascendant // Coronal Flare",
      tagline: "Ascended solar crest with radiating halo",
      affinity: "MACHINE LEARNING & OPTIMIZATION",
      primaryColor: "#ffb703",
      secondaryColor: "#fb8500",
      accentColor: "#fde047",
      glowColor: "rgba(255, 183, 3, 0.85)",
      bgGradient: "radial-gradient(circle, #d97706 0%, #201004 60%, #060301 100%)",
      weapon: "Solar Energy Glaive",
      auraType: "solar-corona"
    },
    {
      id: "void-warrior",
      name: "VOID WARRIOR",
      title: "Void Monarch // Dimensional Rift",
      tagline: "Quantum singularity mantle with event horizon arcs",
      affinity: "DEEP REASONING & ALGORITHMS",
      primaryColor: "#a855f7",
      secondaryColor: "#7e22ce",
      accentColor: "#c084fc",
      glowColor: "rgba(168, 85, 247, 0.85)",
      bgGradient: "radial-gradient(circle, #6b21a8 0%, #170427 60%, #04010a 100%)",
      weapon: "Gravitational Void Scythe",
      auraType: "quantum-singularity"
    },
    {
      id: "cyber-warrior",
      name: "CYBER WARRIOR",
      title: "Cyber Aegis // Holographic Lattice",
      tagline: "Matrix polyhedron core with holographic shields",
      affinity: "SYSTEM ARCHITECTURE & CLOUD",
      primaryColor: "#06b6d4",
      secondaryColor: "#22d3ee",
      accentColor: "#ffffff",
      glowColor: "rgba(34, 211, 238, 0.85)",
      bgGradient: "radial-gradient(circle, #0891b2 0%, #041d24 60%, #01080a 100%)",
      weapon: "Hexagonal Aegis Orbiters",
      auraType: "matrix-lattice"
    },
    {
      id: "celestial-warrior",
      name: "CELESTIAL WARRIOR",
      title: "Celestial Herald // Cosmic Supernova",
      tagline: "Astral starlight wings with cosmic nebula resonance",
      affinity: "UNIFIED INTELLIGENT SYSTEMS",
      primaryColor: "#60a5fa",
      secondaryColor: "#93c5fd",
      accentColor: "#ffffff",
      glowColor: "rgba(147, 197, 253, 0.9)",
      bgGradient: "radial-gradient(circle, #3b82f6 0%, #0c1c38 60%, #020611 100%)",
      weapon: "Twin Astral Crest Halos",
      auraType: "stellar-nebula"
    }
  ],

  systemStatuses: [
    { name: "AI ENGINEERING", status: "ONLINE", type: "online" },
    { name: "MACHINE LEARNING", status: "ONLINE", type: "online" },
    { name: "DATA SCIENCE", status: "ONLINE", type: "online" },
    { name: "AGENTIC AI", status: "EXPLORING", type: "exploring" },
    { name: "AI AUTOMATION", status: "EXPLORING", type: "exploring" },
    { name: "3D AI INTERFACES", status: "EXPERIMENTAL", type: "experimental" },
    { name: "DSA / ALGORITHMS", status: "LEARNING", type: "learning" },
    { name: "SYSTEM BUILDING", status: "ACTIVE", type: "active" }
  ],

  projects: {
    dhammu: {
      title: "Dhammu — Personal Desktop AI Assistant",
      tagline: "A desktop AI assistant designed to treat the computer as its home.",
      status: "FLAGSHIP // ACTIVE R&D",
      description: "Moving beyond chat-window limitations: Dhammu is architected as an agentic system that understands desktop context, autonomously creates plans, operates tools and verifies actions while enforcing strict safety boundaries.",
      stages: [
        { id: "voice", label: "01. VOICE", desc: "Audio capture, streaming transcription & intent parsing", state: "Completed" },
        { id: "understand", label: "02. UNDERSTAND", desc: "LLM semantic comprehension & desktop context extraction", state: "Completed" },
        { id: "plan", label: "03. PLAN", desc: "Agentic DAG decomposition & tool selection", state: "In Development" },
        { id: "execute", label: "04. EXECUTE", desc: "App interaction, file manipulation & desktop actions", state: "In Development" },
        { id: "verify", label: "05. VERIFY", desc: "Safety boundary gating & visual state validation", state: "Experimental" },
        { id: "result", label: "06. RESULT", desc: "Task goal achievement & conversational telemetry", state: "Future Vision" }
      ],
      tags: ["Agentic AI", "Desktop Automation", "Planning & DAGs", "Voice AI", "Safety Boundaries", "3D Avatar"]
    },
    opticure: {
      title: "OptiCure AI",
      tagline: "Intelligent Healthcare Scheduling & Waiting Optimization",
      status: "CORE ALGORITHM VERIFIED",
      description: "Formulates doctor appointment scheduling as a Multistage Graph Optimization problem solved via Dynamic Programming. Drastically minimizes patient waiting latency and schedules optimal consultation windows.",
      tags: ["Dynamic Programming", "Multistage Graphs", "Optimization", "Android", "Firebase", "AI Scheduling"]
    },
    nagarix: {
      title: "NagariX",
      tagline: "AI Urban Intelligence & Municipal Command Platform",
      status: "PROTOTYPE ARCHITECTURE",
      description: "Pioneering civic intelligence by combining computer vision image triage for civic hazards with spatial DBSCAN clustering to detect recurring neighborhood infrastructure failures and municipal SLA risks.",
      tags: ["Civic Intelligence", "Geospatial Clustering", "AI Image Triage", "SLA Risk Radar", "Urban Analytics"]
    },
    nereus: {
      title: "Nereus AI",
      tagline: "Conversational Intelligence for Oceanographic / ARGO Telemetry",
      status: "RESEARCH EXPLORATION",
      description: "Translating high-dimensional global ARGO float sensors (salinity, pressure, ocean thermoclines) into conversational query answers and interactive scientific waveforms.",
      tags: ["ARGO Float Data", "Conversational AI", "Scientific Telemetry", "Bathymetric Analytics"]
    },
    dsaura: {
      title: "DSphere / DSAURA",
      tagline: "AI Event Intelligence & 3D Spatial Aura Assistant",
      status: "EXPERIMENTAL CONCEPT",
      description: "Conceptual exploration of futuristic spatial event coordination and attendee networking using an interactive 3D aura orb that reflects real-time conversational and contextual system states.",
      tags: ["Spatial AI", "3D Aura Orb", "Event Intelligence", "Kinetic Interfaces"]
    }
  },

  skills: {
    languages: [
      { name: "Python", level: 90, color: "#38bdf8" },
      { name: "C++", level: 80, color: "#00f0ff" },
      { name: "C", level: 80, color: "#94a3b8" },
      { name: "Java", level: 75, color: "#f59e0b" },
      { name: "JavaScript", level: 85, color: "#facc15" },
      { name: "TypeScript", level: 80, color: "#60a5fa" }
    ],
    aiData: [
      { name: "Python AI Ecosystem", level: 90, color: "#38bdf8" },
      { name: "NumPy & Pandas", level: 85, color: "#34d399" },
      { name: "scikit-learn", level: 80, color: "#fb923c" },
      { name: "TensorFlow", level: 75, color: "#f97316" },
      { name: "Machine Learning", level: 85, color: "#a855f7" },
      { name: "Agentic Systems", level: 70, color: "#ec4899" }
    ],
    web: [
      { name: "React", level: 85, color: "#38bdf8" },
      { name: "Next.js", level: 80, color: "#ffffff" },
      { name: "Vite", level: 85, color: "#a855f7" },
      { name: "Tailwind CSS", level: 90, color: "#06b6d4" },
      { name: "HTML5 / CSS3 / Canvas", level: 90, color: "#f97316" }
    ],
    backendCloud: [
      { name: "Firebase", level: 85, color: "#f59e0b" },
      { name: "Supabase", level: 80, color: "#10b981" },
      { name: "MySQL", level: 80, color: "#0284c7" },
      { name: "SQLite", level: 85, color: "#38bdf8" },
      { name: "AWS / Cloud", level: 70, color: "#fbbf24" },
      { name: "Linux / Git", level: 85, color: "#f43f5e" }
    ]
  }
};
