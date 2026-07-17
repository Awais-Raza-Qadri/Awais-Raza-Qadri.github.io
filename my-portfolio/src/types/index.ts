export interface Skill {
  name: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface Project {
  title: string;
  description: string;
  bullets: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Course {
  title: string;
  provider: string;
  duration: string;
  description: string;
}

export interface Education {
  institution: string;
  period: string;
  degree: string;
  details: string;
}