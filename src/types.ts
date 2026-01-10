export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
  details: string;
}

export interface Project {
  title: string;
  subtitle: string;
  year: string;
  description: string[];
  technologies: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}