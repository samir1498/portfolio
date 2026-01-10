import type { Experience, Education, Project, SkillCategory } from "./types";


// Simple SVG icon components for brands (Lucide deprecated brand icons)
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export const PERSONAL_INFO = {
  name: "Bettahar Samir",
  title: "Software Engineer",
  summary:
    "Full-stack software engineer specialized in modern web and mobile application development with React, React Native, Next.js, TypeScript, and Tailwind CSS. Experienced in designing and integrating REST APIs using NestJS and Fastify, implementing authentication, and building fast, maintainable, and user-friendly interfaces.",
  contact: {
    phone: "(+213) 675 24 84 41",
    email: "Bettahar.Samir@outlook.com",
    github: "samir1498",
    linkedin: "samir-bettahar",
    location: "Algiers, Algeria",
    whatsapp: "(+213) 675 24 84 41",
  },
};

export const SOCIAL_LINKS = [
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    href: `https://linkedin.com/in/${PERSONAL_INFO.contact.linkedin}`,
    value: PERSONAL_INFO.contact.linkedin,
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    href: `https://github.com/${PERSONAL_INFO.contact.github}`,
    value: PERSONAL_INFO.contact.github,
  },
];

export const EXPERIENCE: Experience[] = [
  {
    company: "Self-Employed",
    role: "Freelance Full-Stack / Mobile Developer",
    period: "Sep. 2025 – Present",
    location: "Remote / Algiers",
    description: [
      "Developed mobile applications using React Native and web applications with Next.js, integrating with Fastify backend APIs.",
      "Built reusable and performant UI components, focusing on responsive and intuitive user experiences.",
    ],
  },
  {
    company: "Omnivya",
    role: "Full-Stack Developer",
    period: "Jan. 2024 – Aug. 2025",
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

export const SKILLS: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "TypeScript", icon: "/icons/typescript.svg" },
      { name: "JavaScript", icon: "/icons/javascript.svg" },
      { name: "Java", icon: "/icons/openjdk.svg" },
      { name: "Go", icon: "/icons/go.svg" },
    ],
  },
  {
    name: "Frontend",
    skills: [
      { name: "React.js", icon: "/icons/react.svg" },
      { name: "Next.js", icon: "/icons/nextdotjs.svg" },
      { name: "React Native", icon: "/icons/react.svg" },
      { name: "AstroJS", icon: "/icons/astro.svg" },
      { name: "SvelteKit", icon: "/icons/svelte.svg" },
      { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "NestJS", icon: "/icons/nestjs.svg" },
      { name: "Fastify", icon: "/icons/fastify.svg" },
      { name: "Spring Boot", icon: "/icons/springboot.svg" },
      { name: "Go (API)", icon: "/icons/go.svg" },
    ],
  },
  {
    name: "Database",
    skills: [
      { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
      { name: "Spring Data JPA", icon: "/icons/spring.svg" },
      { name: "TypeORM", icon: "/icons/typeorm.svg" },
      { name: "Flyway", icon: "/icons/flyway.svg" },
    ],
  },
  {
    name: "DevOps & Infra",
    skills: [
      { name: "Docker", icon: "/icons/docker.svg" },
      { name: "GraalVM", icon: "/icons/graalvm.svg" },
    ],
  },
  {
    name: "Auth",
    skills: [
      { name: "Zitadel", icon: "/icons/zitadel.svg" },
      { name: "Clerk", icon: "/icons/clerk.svg" },
      { name: "BetterAuth", icon: "/icons/betterauth.svg" },
      { name: "Fastify OAuth", icon: "/icons/fastify.svg" },
    ],
  },
  {
    name: "Testing",
    skills: [
      { name: "Vitest", icon: "/icons/vitest.svg" },
      { name: "TestContainers", icon: "/icons/testcontainers.svg" },
      { name: "Playwright", icon: "/icons/playwright.svg" },
    ],
  },
  {
    name: "Observability",
    skills: [
      { name: "Prometheus", icon: "/icons/prometheus.svg" },
      { name: "OpenTelemetry", icon: "/icons/opentelemetry.svg" },
    ],
  },
];
