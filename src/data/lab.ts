import type { LabExperiment } from '../types';

export const labExperiments: LabExperiment[] = [
  {
    id: "exp-01",
    title: "Self-Healing Agent Verification Loop",
    tag: "EXPERIMENT",
    focus: "Autonomous Tool Orchestration & Dynamic Error Recovery",
    description: "Testing deterministic rollback strategies when an autonomous agent encounters unexpected terminal exit codes or API quota throttle.",
    tech: ["Python", "AsyncIO", "AST Parsing", "Gemini SDK"],
    progress: 82,
    interactiveLog: [
      "[PLANNER] Decomposing goal into 4 atomic subtasks...",
      "[DISPATCH] Tool 'run_linter' invoked on target tree.",
      "[WARN] Syntax anomaly detected in AST branch #3.",
      "[AUTO-CORRECT] Generating patched diff & re-verifying...",
      "[VERIFIED] Subtask passed with 0 regression faults."
    ]
  },
  {
    id: "exp-02",
    title: "Hydrodynamic Three.js Custom Shader",
    tag: "PROTOTYPE",
    focus: "Volumetric Caustics & GPU Particle Physics",
    description: "Experimenting with GLSL fragment shaders calculating Snell-Descartes light refraction through animated Perlin noise water meshes.",
    tech: ["GLSL", "Three.js", "WebGL 2.0", "ShaderMaterial"],
    progress: 94,
    interactiveLog: [
      "[SHADER] Compiling caustic fragment pipeline...",
      "[BUFFER] 1,200 instanced particle points bound to VBO.",
      "[PHYSICS] Applying buoyant drift vector [0.0, 0.04, 0.0].",
      "[PERF] Sustained 60.1 FPS under dynamic cursor disturbance."
    ]
  },
  {
    id: "exp-03",
    title: "Civic Hotspot Clustering with DBSCAN",
    tag: "RESEARCH",
    focus: "Unsupervised Spatial Pattern Discovery",
    description: "Evaluating spatial density algorithms to cluster geo-tagged citizen grievance reports into automated maintenance zones.",
    tech: ["Python", "Scikit-Learn", "GeoPandas", "Shapely"],
    progress: 76,
    interactiveLog: [
      "[DATASET] Loaded 14,200 municipal grievance nodes (Nagpur).",
      "[SPATIAL] Epsilon radius: 450m | Min samples: 8.",
      "[RESULT] 23 critical road & water infrastructure clusters isolated.",
      "[INDEX] SLA risk index calculated: 0.84 (High urgency)."
    ]
  },
  {
    id: "exp-04",
    title: "ARGO Profile Vectorization & Semantic Search",
    tag: "EXPLORING",
    focus: "Multimodal Oceanographic Retrieval",
    description: "Converting multidimensional ocean salinity/temperature NetCDF depth profiles into high-dimensional embeddings for conversational retrieval.",
    tech: ["Python", "NetCDF4", "Vector Embeddings", "FastAPI"],
    progress: 68,
    interactiveLog: [
      "[ARGO] Ingested Float #5904845 trajectory data.",
      "[DEPTH] 0m to 2,000m vertical profile normalized.",
      "[EMBED] Vectorizing thermocline gradient features...",
      "[QUERY] 'Identify salinity inversion in Arabian Sea' -> Match 97.4%"
    ]
  }
];
