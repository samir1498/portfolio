import type { Experience, Education, Project } from "@/types";

export const PERSONAL_INFO = {
  name: "Bettahar Samir",
  title: "Software Engineer",
  summary:
    "Full-stack software engineer specialized in modern web and mobile application development with React, React Native, Next.js, TypeScript, and Tailwind CSS. Experienced in designing and integrating REST APIs using NestJS, implementing authentication, and building fast, maintainable, and user-friendly interfaces.",
  available: "Available for opportunities",
  downloadCV: "Download CV",
};

export const EXPERIENCE: Experience[] = [
  {
    company: "ObserveOne",
    role: "Full-Stack Engineer",
    period: "Nov. 2025 – Present",
    location: "Remote",
    description: [
      "Refactored and shipped features across the React (Vite) frontend — autopilot UI, demo recording pipeline, component extraction, dev mocks, and e2e test suites.",
      "Built features for the TypeScript CLI (npm package) — API key rotation, suite CI integration, incident management, lossless export/import, and multiple releases.",
      "Contributed to the Express.js backend — comprehensive security audit (Supabase RLS policies, RPC hardening), autopilot refactor, team resource sharing, and suite APIs.",
      "Developed a Next.js marketing site with semantic color tokens, branded component library, light-mode fixes, and a /workers sub-landing page.",
      "Architected a self-hosted distributed monitoring engine in Bun/Hono — 8 probe types, multi-region master-agent architecture, Redis pub/sub SSE replacing dashboard polling.",
      "Built an admin dashboard (React) — Google indexing dashboard, creators/invites management, alerts history, and demo secret code system.",
      "Built a programmatic video generation pipeline with Remotion — story-aware zoom strategy, per-clip transitions, and click sound effects.",
    ],
  },
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
  {
    company: "Omnivya",
    role: "Full-Stack Developer",
    period: "Feb. 2024 – Aug. 2025",
    location: "Remote",
    description: [
      "Designed and refactored responsive web interfaces using React, TypeScript, AstroJS, and TanStack Router.",
      "Built maintainable and performant UI components with Tailwind CSS.",
      "Developed secure authentication flows and role management with Zitadel and BetterAuth.",
      "Developed and optimized RESTful APIs with NestJS and Spring Boot to support SaaS frontend needs.",
      "Improved frontend performance and collaborated closely with product and backend teams to ensure smooth delivery.",
      "Implemented unit, integration, and end-to-end tests (Vitest, Playwright, TestContainers) to ensure code reliability and production quality.",
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    institution: "University of Saad Dahlab Blida",
    degree: "Master's in Software Engineering",
    period: "2020 – 2022",
    location: "Blida, Algeria",
    details:
      "Focus on software architecture, development methodologies, and full-stack development",
  },
  {
    institution: "University of Saad Dahlab Blida",
    degree: "Bachelor's in Information Systems and Software Engineering",
    period: "2016 – 2020",
    location: "Blida, Algeria",
    details:
      "Foundation in computer science fundamentals, algorithms, databases, and object-oriented programming.",
  },
];

export const ACADEMIC_PROJECTS: Project[] = [
  {
    title: "Software Product Line for e-Banking Applications",
    subtitle: "Master Thesis (Java EE, Ontologies)",
    year: "2022",
    description: [
      "Designed and developed a software product line for automatically generating e-Banking applications based on ontologies and feature models.",
      "Implemented a desktop configurator in Java Swing for selecting features and generating applications.",
      "Developed full web applications (Client and Admin portals) with Java EE (Servlets, JSP, JDBC) and deployed on Tomcat/Glassfish.",
    ],
    technologies: ["Java EE", "Ontologies", "Java Swing", "Tomcat"],
  },
  {
    title: "Parkinson's Disease Detection",
    subtitle: "Bachelor Project (Python, Machine Learning)",
    year: "2020",
    description: [
      "Developed a medical decision support system in Python for detecting Parkinson's disease using spiral and wave handwriting tests.",
      "Implemented machine learning models (KNN, SVM, Random Forest) with scikit-learn, achieving up to 90% accuracy.",
      "Applied image preprocessing and feature extraction techniques with OpenCV, including LBP, Haralick, and Hu moments.",
      "Built a Tkinter GUI enabling doctors to test images and visualize confusion matrices and ROC curves.",
    ],
    technologies: [
      "Python",
      "Scikit-learn",
      "OpenCV",
      "Tkinter",
      "Machine Learning",
    ],
  },
];

// Section titles
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
