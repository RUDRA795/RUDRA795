import type { SkillNode } from '../types';

export const skillsData: SkillNode[] = [
  // AI / DATA
  { name: "Python", category: "AI / DATA", proficiencyConcept: "Core language for algorithmic modeling, pipelines & data structures", tags: ["Data Science", "Backend", "AI"], energyLevel: 0.95, x: -3, y: 2, z: 0 },
  { name: "Machine Learning", category: "AI / DATA", proficiencyConcept: "Supervised/Unsupervised models, regression, classification, clustering", tags: ["Scikit-Learn", "Feature Eng"], energyLevel: 0.88, x: -2, y: 3, z: -1 },
  { name: "Data Science", category: "AI / DATA", proficiencyConcept: "Statistical analysis, exploratory data analysis, hypothesis testing", tags: ["Statistics", "Analytics"], energyLevel: 0.90, x: -4, y: 1, z: 1 },
  { name: "Pandas & NumPy", category: "AI / DATA", proficiencyConcept: "High-performance vector operations and matrix manipulations", tags: ["ETL", "Matrix Ops"], energyLevel: 0.92, x: -2.5, y: 1.5, z: -0.5 },
  { name: "Matplotlib & Seaborn", category: "AI / DATA", proficiencyConcept: "Visual distribution plots, heatmaps, statistical charts", tags: ["Data Viz", "Plots"], energyLevel: 0.85, x: -3.5, y: 2.8, z: 0.5 },
  { name: "Generative AI", category: "AI / DATA", proficiencyConcept: "LLM integration, prompting architectures, RAG pipelines", tags: ["Embeddings", "Transformers"], energyLevel: 0.89, x: -1.5, y: 2.5, z: 1 },

  // DEVELOPMENT
  { name: "React", category: "DEVELOPMENT", proficiencyConcept: "Component lifecycles, custom hooks, state machines, performance", tags: ["Frontend", "UI Architecture"], energyLevel: 0.94, x: 2, y: 2.5, z: 0 },
  { name: "TypeScript", category: "DEVELOPMENT", proficiencyConcept: "Strict type safety, generics, union discriminating architectures", tags: ["Clean Code", "Enterprise"], energyLevel: 0.91, x: 3, y: 2, z: -1 },
  { name: "JavaScript", category: "DEVELOPMENT", proficiencyConcept: "Modern ES6+, event loops, asynchronous programming, Web APIs", tags: ["Core Web", "Async"], energyLevel: 0.95, x: 1.5, y: 1.2, z: 0.5 },
  { name: "Kotlin", category: "DEVELOPMENT", proficiencyConcept: "Modern Android development, coroutines, Flow, Jetpack Compose", tags: ["Mobile", "Android"], energyLevel: 0.86, x: 3.5, y: 1.2, z: 1 },
  { name: "Jetpack Compose", category: "DEVELOPMENT", proficiencyConcept: "Declarative UI patterns, state hoisting, Material 3 theming", tags: ["Android", "Declarative"], energyLevel: 0.84, x: 2.5, y: 0.5, z: -0.5 },
  { name: "Next.js", category: "DEVELOPMENT", proficiencyConcept: "Server-side rendering, API routing, dynamic caching", tags: ["Full-Stack", "SSR"], energyLevel: 0.85, x: 4, y: 2.8, z: 0.5 },

  // SYSTEMS
  { name: "Algorithms & DS", category: "SYSTEMS", proficiencyConcept: "Graph traversal, dynamic programming, divide-and-conquer, trees", tags: ["CS Core", "Complexity"], energyLevel: 0.92, x: 0, y: 3.5, z: -2 },
  { name: "System Design", category: "SYSTEMS", proficiencyConcept: "Scalability, caching layers, load balancing, relational schemas", tags: ["Architecture", "Resilience"], energyLevel: 0.83, x: 1, y: 4, z: -1 },
  { name: "Java", category: "SYSTEMS", proficiencyConcept: "Object-oriented design, collections framework, multithreading", tags: ["OOP", "Enterprise"], energyLevel: 0.87, x: -1, y: 3.8, z: -1.5 },
  { name: "C Programming", category: "SYSTEMS", proficiencyConcept: "Memory management, pointers, low-level data structures", tags: ["Low Level", "Pointers"], energyLevel: 0.85, x: 0, y: 2.2, z: -2 },
  { name: "SQL & DBMS", category: "SYSTEMS", proficiencyConcept: "Query optimization, indexing, ACID transactions, normalization", tags: ["Databases", "PostgreSQL"], energyLevel: 0.89, x: -1.5, y: 1, z: -2 },

  // CLOUD / DEVOPS
  { name: "Git & GitHub", category: "CLOUD / DEVOPS", proficiencyConcept: "Branching workflows, rebasing, open-source collaboration, CI actions", tags: ["Version Control", "Ops"], energyLevel: 0.95, x: 2, y: -1.5, z: 1 },
  { name: "Firebase", category: "CLOUD / DEVOPS", proficiencyConcept: "Firestore, authentication, real-time database, cloud functions", tags: ["BaaS", "Realtime"], energyLevel: 0.88, x: 3, y: -2, z: 0 },
  { name: "Docker", category: "CLOUD / DEVOPS", proficiencyConcept: "Containerization, multi-stage Dockerfiles, compose environments", tags: ["Containers", "DevOps"], energyLevel: 0.80, x: 1, y: -2.5, z: -1 },
  { name: "CI / CD Pipelines", category: "CLOUD / DEVOPS", proficiencyConcept: "Automated linting, test runners, build verifications", tags: ["Automation", "Testing"], energyLevel: 0.82, x: 2.5, y: -3, z: -0.5 },

  // AI STACK
  { name: "Gemini API & SDK", category: "AI STACK", proficiencyConcept: "Multimodal prompts, structured JSON schema outputs, function calling", tags: ["Google AI", "Multimodal"], energyLevel: 0.94, x: -2, y: -1.5, z: 1.5 },
  { name: "Intelligent Agents", category: "AI STACK", proficiencyConcept: "Autonomous planning, tool dispatching, verification feedback loops", tags: ["Agentic AI", "Orchestration"], energyLevel: 0.90, x: -1, y: -2.5, z: 1 },
  { name: "LLM App Architectures", category: "AI STACK", proficiencyConcept: "Vector stores, semantic chunking, prompt engineering, context windows", tags: ["RAG", "Embeddings"], energyLevel: 0.88, x: -3, y: -2, z: 0.5 }
];

export const explorationJourney = [
  { stage: "01", title: "Computer Science Foundations", desc: "C, Java, Data Structures & Algorithmic complexity", icon: "code" },
  { stage: "02", title: "Data Science & Statistics", desc: "Pandas, NumPy, EDA, predictive modeling & ML regressions", icon: "database" },
  { stage: "03", title: "Modern Full-Stack Development", desc: "React, TypeScript, Next.js, Kotlin & declarative UI paradigms", icon: "layers" },
  { stage: "04", title: "Generative AI & LLM Systems", desc: "Multimodal reasoning, function calling, vector similarity search", icon: "cpu" },
  { stage: "05", title: "Intelligent Autonomous Agents", desc: "Closed-loop planning, tool dispatch, verification & self-healing code", icon: "bot" },
  { stage: "06", title: "Scalable Cloud & Systems Engineering", desc: "Micro-architectures, distributed reliability, Docker & automation", icon: "server" }
];
