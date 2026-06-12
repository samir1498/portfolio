import type { Experience, Education, Project } from "@/types";
import {
  PERSONAL_INFO as SHARED_PERSONAL_INFO,
  EXPERIENCE as SHARED_EXPERIENCE,
  EDUCATION as SHARED_EDUCATION,
  ACADEMIC_PROJECTS as SHARED_ACADEMIC_PROJECTS,
} from "@/shared-data";

export const PERSONAL_INFO = {
  ...SHARED_PERSONAL_INFO,
  available: "Available for opportunities",
  downloadCV: "Download CV",
};

export const EXPERIENCE: Experience[] = [
  ...SHARED_EXPERIENCE,
  {
    company: "Self-Employed",
    role: "Freelance Full-Stack / Mobile Developer",
    period: "Sep. 2025 – Present",
    location: "Remote / Algiers",
    description: [
      "Developed mobile applications using React Native and web applications with Next.js, integrating with backend APIs.",
      "Built reusable and performant UI components, focusing on responsive and intuitive user experiences.",
    ],
  },
];

export const EDUCATION = SHARED_EDUCATION;

export const ACADEMIC_PROJECTS = SHARED_ACADEMIC_PROJECTS;

export const SECTIONS = {
  skills: "Technical Arsenal",
  skillsSubtitle:
    "A comprehensive toolset I use to build scalable, high-performance applications.",
  experience: "Work Experience",
  education: "Education",
  academicProjects: "Research & Academic Projects",
  portfolio: "Portfolio",
  portfolioSubtitle: "Check back soon for featured projects!",
};
