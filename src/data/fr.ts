import type { Experience, Education, Project } from "@/types";

export const PERSONAL_INFO = {
  name: "Bettahar Samir",
  title: "Ingénieur Logiciel",
  summary:
    "Ingénieur logiciel full-stack spécialisé dans le développement d'applications web et mobiles modernes avec React, React Native, Next.js, TypeScript et Tailwind CSS. Expérimenté dans la conception et l'intégration d'API REST avec NestJS et Fastify, l'implémentation d'authentification, et la création d'interfaces rapides, maintenables et conviviales.",
  available: "Disponible pour opportunités",
  contactMe: "Contactez-moi",
  downloadCV: "Télécharger CV",
};

export const EXPERIENCE: Experience[] = [
  {
    company: "Indépendant",
    role: "Développeur Full-Stack / Mobile Freelance",
    period: "Sept. 2025 – Présent",
    location: "Télétravail / Alger",
    description: [
      "Développement d'applications mobiles avec React Native et d'applications web avec Next.js, intégrées à des API backend Fastify.",
      "Création de composants UI réutilisables et performants, axés sur des expériences utilisateur réactives et intuitives.",
    ],
  },
  {
    company: "Omnivya",
    role: "Développeur Full-Stack",
    period: "Fév. 2024 – Août 2025",
    location: "Télétravail",
    description: [
      "Conception et refonte d'interfaces web réactives avec React, TypeScript, AstroJS et TanStack Router.",
      "Création de composants UI maintenables et performants avec Tailwind CSS.",
      "Développement de flux d'authentification sécurisés et gestion des rôles avec Zitadel et BetterAuth.",
      "Développement et optimisation d'API RESTful avec NestJS et Spring Boot pour les besoins frontend SaaS.",
      "Amélioration des performances frontend et collaboration étroite avec les équipes produit et backend.",
      "Implémentation de tests unitaires, d'intégration et end-to-end (Vitest, Playwright, TestContainers) pour garantir la qualité.",
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    institution: "Université Saad Dahlab de Blida",
    degree: "Master en Génie Logiciel",
    period: "2020 – 2022",
    location: "Blida, Algérie",
    details:
      "Spécialisation en architecture logicielle, méthodologies de développement et développement full-stack",
  },
  {
    institution: "Université Saad Dahlab de Blida",
    degree: "Licence en Systèmes d'Information et Génie Logiciel",
    period: "2016 – 2020",
    location: "Blida, Algérie",
    details:
      "Fondamentaux en informatique, algorithmes, bases de données et programmation orientée objet.",
  },
];

export const ACADEMIC_PROJECTS: Project[] = [
  {
    title: "Ligne de Produits Logiciels pour l'e-Banking",
    subtitle: "Mémoire de Master (Java EE, Ontologies)",
    year: "2022",
    description: [
      "Conception et développement d'une ligne de produits logiciels pour générer automatiquement des applications e-Banking basées sur des ontologies et des feature models.",
      "Implémentation d'un configurateur desktop en Java Swing pour sélectionner les fonctionnalités et générer les applications.",
      "Développement d'applications web complètes (portails Client et Admin) avec Java EE (Servlets, JSP, JDBC) et déployées sur Tomcat/Glassfish.",
    ],
    technologies: ["Java EE", "Ontologies", "Java Swing", "Tomcat"],
  },
  {
    title: "Détection de la Maladie de Parkinson",
    subtitle: "Projet de Licence (Python, Machine Learning)",
    year: "2020",
    description: [
      "Développement d'un système d'aide au diagnostic médical en Python pour détecter la maladie de Parkinson via des tests d'écriture spirale et vague.",
      "Implémentation de modèles de machine learning (KNN, SVM, Forêt aléatoire) avec scikit-learn, atteignant une précision de 90%.",
      "Application de techniques de prétraitement d'images et d'extraction de caractéristiques avec OpenCV (LBP, Haralick, moments de Hu).",
      "Création d'une interface graphique Tkinter permettant aux médecins de tester des images et visualiser matrices de confusion et courbes ROC.",
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
  skills: "Arsenal Technique",
  skillsSubtitle:
    "Un ensemble d'outils complet pour créer des applications évolutives et performantes.",
  experience: "Expérience Professionnelle",
  education: "Formation",
  academicProjects: "Recherche & Projets Académiques",
  portfolio: "Portfolio",
  portfolioSubtitle: "Des projets seront bientôt présentés !",
  contact: "Me Contacter",
  contactSubtitle:
    "Vous avez un projet en tête ou souhaitez discuter d'opportunités ? Contactez-moi !",
};

export const CONTACT_FORM = {
  name: "Votre Nom",
  email: "Votre Email",
  message: "Votre Message",
  send: "Envoyer",
};
