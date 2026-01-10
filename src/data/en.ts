import type { Experience, Education, Project } from "@/types";

export const PERSONAL_INFO = {
  name: "Bettahar Samir",
  title: "Software Engineer",
  summary:
    "Full-stack software engineer specialized in modern web and mobile application development with React, React Native, Next.js, TypeScript, and Tailwind CSS. Experienced in designing and integrating REST APIs using NestJS and Fastify, implementing authentication, and building fast, maintainable, and user-friendly interfaces.",
  available: "Available for opportunities",
  contactMe: "Contact Me",
  downloadCV: "Download CV",
};

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
  contact: "Get in Touch",
  contactSubtitle:
    "Have a project in mind or want to discuss opportunities? Let's connect!",
};

export const CONTACT_FORM = {
  name: "Your Name",
  email: "Your Email",
  message: "Your Message",
  send: "Send Message",
};
