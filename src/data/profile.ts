export interface ProfileData {
  name: string;
  githubUsername: string;
  title: string;
  tagline: string;
  supportingStatement: string;
  location: string;
  college: string;
  degree: string;
  vision: string;
  philosophy: string[];
  coreInterests: string[];
  status: string;
  stats: {
    label: string;
    value: string;
    sublabel: string;
  }[];
}

export const profileData: ProfileData = {
  name: "Rohit Lakas",
  githubUsername: "RUDRA795",
  title: "AI & Full-Stack Systems Builder",
  tagline: "BUILDING INTELLIGENT SYSTEMS BETWEEN CODE, DATA & AI.",
  supportingStatement: "Developer • AI Enthusiast • Data Science • Full-Stack Builder",
  location: "Nagpur, Maharashtra, India",
  college: "Tulsiramji Gaikwad-Patil College of Engineering & Technology (TGPCET)",
  degree: "B.Tech in Computer Science & Engineering (Data Science)",
  vision: "I don't just learn technologies. I build systems with them.",
  philosophy: [
    "I am a Data Science-focused Computer Science student who enjoys turning ideas into intelligent, interactive systems.",
    "I work across AI, data, algorithms, full-stack development, cloud technologies and automation.",
    "My goal is not to collect technologies. My goal is to understand systems deeply enough to build useful ones."
  ],
  coreInterests: [
    "Artificial Intelligence & Machine Learning",
    "Data Science & Predictive Modeling",
    "Generative AI & LLM Systems",
    "Full-Stack Web Architectures",
    "System Design & Multistage Optimization",
    "Autonomous Agent Orchestration",
    "Cloud, DevOps & Automation",
    "Modern Android Development"
  ],
  status: "ENGINEERING IN PROGRESS // NAGPUR, IN",
  stats: [
    { label: "Ocean Depth Level", value: "11,000m", sublabel: "Deep Core AI Abyss" },
    { label: "Engineering Focus", value: "AI + Systems", sublabel: "Data Science & Full-Stack" },
    { label: "Active Prototypes", value: "07+", sublabel: "Autonomous & WebGL Platforms" },
    { label: "Mindset", value: "Builder", sublabel: "Build • Break • Understand • Repeat" }
  ]
};
