import type { Experience, Education, Project, SkillCategory } from "./types";
import { Github, Linkedin, Mail, Phone, MessageCircle } from "lucide-react";

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
    icon: Mail,
    label: "Email",
    href: `mailto:${PERSONAL_INFO.contact.email}`,
    value: PERSONAL_INFO.contact.email,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: `https://linkedin.com/in/${PERSONAL_INFO.contact.linkedin}`,
    value: PERSONAL_INFO.contact.linkedin,
  },
  {
    icon: Github,
    label: "GitHub",
    href: `https://github.com/${PERSONAL_INFO.contact.github}`,
    value: PERSONAL_INFO.contact.github,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: `https://wa.me/${PERSONAL_INFO.contact.phone.replace(/\D/g, "")}`,
    value: PERSONAL_INFO.contact.whatsapp,
  },
  {
    icon: Phone,
    label: "Phone",
    href: `tel:${PERSONAL_INFO.contact.phone.replace(/\s/g, "")}`,
    value: PERSONAL_INFO.contact.phone,
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
    technologies: [
      "Java EE",
      "Ontologies",
      "Java Swing",
      "Tomcat",
    ],
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
