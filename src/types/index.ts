export type OceanZone = 
  | 'SURFACE' 
  | 'SHALLOW' 
  | 'MID_WATER' 
  | 'DEEP_WATER' 
  | 'ABYSS' 
  | 'DEEP_CORE' 
  | 'SURFACE_RETURN';

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  depthMeters: number;
  description: string;
  concept: string;
  technologies: string[];
  algorithms: string[];
  visualMetaphor: string;
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  status: 'ACTIVE' | 'EXPERIMENTAL' | 'RESEARCH' | 'PROTOTYPE';
  interactiveMode: 'graph' | 'map' | 'sonar' | 'argo' | 'convergence' | 'neural' | 'agent';
}

export interface SkillNode {
  name: string;
  category: 'AI / DATA' | 'DEVELOPMENT' | 'SYSTEMS' | 'CLOUD / DEVOPS' | 'AI STACK';
  proficiencyConcept: string;
  tags: string[];
  energyLevel: number;
  x: number;
  y: number;
  z: number;
}

export interface LabExperiment {
  id: string;
  title: string;
  tag: 'EXPERIMENT' | 'RESEARCH' | 'PROTOTYPE' | 'BUILDING' | 'EXPLORING';
  focus: string;
  description: string;
  tech: string[];
  progress: number;
  interactiveLog: string[];
}

export interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  topLanguages: { name: string; percentage: number; color: string }[];
  pinnedRepos: {
    name: string;
    description: string;
    stars: number;
    forks: number;
    language: string;
    url: string;
  }[];
}
