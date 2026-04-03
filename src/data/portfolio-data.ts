// ============================================================================
// Portfolio Data — Single Source of Truth
// ============================================================================
// All portfolio content lives here. Update this file to update the entire site.
// Baseline: cv.tex | Portfolio may include extra items not on the CV.
// ============================================================================

// ── Type Definitions ────────────────────────────────────────────────────────

export interface PersonalInfo {
  name: string;
  shortName: string;
  initials: string;
  title: string;
  location: string;
  timezone: string;
  availability: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  portfolio: string;
  spokenLanguages: string[];
  bio: string;
  aboutSummary: string;
}

export interface SkillItem {
  label: string;
  /** Whether this is a primary/highlighted skill */
  highlight?: boolean;
  /** Optional subtitle (e.g. "Learning", "Intermediate") */
  subtitle?: string;
}

export interface SkillCategory {
  name: string;
  items: SkillItem[];
}

export interface ExperienceBullet {
  text: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  technologies: string[];
  highlights: ExperienceBullet[];
}

export interface Project {
  title: string;
  dateRange: string;
  technologies: string[];
  description: string;
  /** Optional impact metric (e.g. "10M+ users") */
  impact?: string;
}

export interface Education {
  degree: string;
  school: string;
  graduated: string;
  honours: string;
  gpa: string;
  thesis: string;
}

// ── Personal Info ───────────────────────────────────────────────────────────

export const personalInfo: PersonalInfo = {
  name: "Panthaweekan Somngam",
  shortName: "Panthaweekan S.",
  initials: "PS",
  title: "Software Engineer",
  location: "Bangkok, Thailand (GMT+7)",
  timezone: "Asia/Bangkok",
  availability: "Open to Remote",
  email: "panthaweekansomngam@gmail.com",
  phone: "+66 946359510",
  github: "https://github.com/Panthaweekan",
  linkedin: "https://www.linkedin.com/in/panthaweekan/",
  portfolio: "https://panthaweekan.github.io/Portfolio/",
  spokenLanguages: ["English (Intermediate)", "Thai (Native)"],
  bio: "Associate Software Engineer at SCB TechX. Specializing in API gateway infrastructure, cloud-native solutions, and full-stack development with Go and TypeScript.",
  aboutSummary:
    "I focus on enterprise API gateway infrastructure and cloud migration at SCB TechX. Passionate about Hexagonal Architecture, Domain-Driven Design, and SOLID principles—they create systems teams can evolve with confidence. Looking for environments where engineering excellence is valued.",
};

// ── Technical Skills ────────────────────────────────────────────────────────
// 9 categories matching CV + portfolio extras

export const technicalSkills: SkillCategory[] = [
  {
    name: "Languages",
    items: [
      { label: "Go", highlight: true, subtitle: "primary" },
      { label: "TypeScript", highlight: true },
      { label: "JavaScript" },
      { label: "Ruby" },
      { label: "Python" },
      { label: "SQL" },
      { label: "HTML/CSS" },
      { label: "Haskell" },
      { label: "Java" },
      { label: "C++" },
      { label: "Rust", subtitle: "Learning" },
    ],
  },
  {
    name: "Backend",
    items: [
      { label: "Fiber/Gin", highlight: true },
      { label: "Ruby on Rails" },
      { label: "NodeJS" },
      { label: "RESTful APIs" },
      { label: "gRPC" },
      { label: "Microservices Architecture" },
    ],
  },
  {
    name: "Frontend",
    items: [
      { label: "React", highlight: true },
      { label: "TypeScript", highlight: true },
      { label: "Vite" },
      { label: "Tailwind CSS" },
      { label: "PWA" },
      { label: "TanStack" },
      { label: "Shadcn" },
      { label: "NextJS" },
    ],
  },
  {
    name: "API Gateway",
    items: [
      { label: "Kong API Gateway", highlight: true },
      { label: "API Routing" },
      { label: "Rate Limiting" },
      { label: "Zero-Downtime Deployment" },
    ],
  },
  {
    name: "Databases",
    items: [
      { label: "PostgreSQL", highlight: true },
      { label: "Redis", highlight: true },
      { label: "MySQL" }, // portfolio extra
      { label: "Database Design" },
      { label: "Indexing" },
      { label: "Database-Driven Architecture" },
    ],
  },
  {
    name: "Cloud/DevOps",
    items: [
      { label: "Kubernetes", highlight: true },
      { label: "Docker", highlight: true },
      { label: "AWS" },
      { label: "Jenkins CI/CD" },
      { label: "HashiCorp Vault" },
      { label: "Linux" },
    ],
  },
  {
    name: "Monitoring",
    items: [
      { label: "Prometheus" },
      { label: "Grafana" },
      { label: "Kibana (ELK Stack)" },
    ],
  },
  {
    name: "AI Agent Tooling",
    items: [
      { label: "Prompt Engineering" },
      { label: "Agentic Workflow Design" },
    ],
  },
  {
    name: "Practices",
    items: [
      { label: "Agile/Scrum" },
      { label: "TDD" },
      { label: "Code Review" },
      { label: "Git" },
      { label: "AI-Driven Development" },
      { label: "SDLC" },
      { label: "Functional Programming" },
    ],
  },
];

// ── Work Experience ─────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    title: "Associate Software Engineer",
    company: "SCB TechX",
    period: "May 2025 – Present",
    location: "Bangkok, Thailand (Hybrid)",
    technologies: ["Go", "Fiber", "Kong", "Rails", "React", "TypeScript"],
    highlights: [
      {
        text: "Designed and developed an API Gateway microservice in Go (Fiber/FastHTTP) to replace legacy CA Layer 7 gateway on-premise, preserving complex routing logic while integrating with Kong upstream, enabling zero-downtime deployment for SCB Easy (10M+ users).",
      },
      {
        text: "Architected the gateway with hexagonal architecture and DDD, decoupling routing, authentication, and logging into SOLID-aligned domains for independent testing and safer deployments.",
      },
      {
        text: "Integrated AI agent tools as a core part of the engineering workflow, applying them across code generation, refactoring, architecture review, and documentation to accelerate delivery on complex features.",
      },
      {
        text: "Designed and developed internal enterprise tools, including an Inventory Asset Management platform with asset requests, RBAC, financial reporting, and centralized asset data.",
      },
      {
        text: "Maintained internal service tools such as Overtime Request and Employee Timesheet workflows, streamlining HR operations across the organization.",
      },
    ],
  },
  {
    title: "Full Stack Developer (Work-Study Scholarship)",
    company: "Chiang Mai University, Faculty of Engineering",
    period: "2023 – 2025",
    location: "Chiang Mai, Thailand",
    technologies: ["Go", "Fiber", "React", "TypeScript", "PostgreSQL", "Docker"],
    highlights: [
      {
        text: "Designed and deployed production web applications serving 500+ active users, from stakeholder requirements through Docker-based deployment.",
      },
      {
        text: "Built RESTful backend APIs in Go (Fiber) with React/TypeScript frontend and PostgreSQL, consistently applying hexagonal architecture and TDD.",
      },
      {
        text: "Developed SD-Booking (room reservation with real-time PWA notifications), SD-Letter (multi-stage certificate approval workflow), and LongPlan (algorithmic study-plan validator using graph algorithms).",
      },
    ],
  },
];

// ── Key Projects ────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    title: "Custom Hybrid API Gateway Solution",
    dateRange: "2025 – Present",
    technologies: [
      "Go",
      "Fiber/FastHTTP",
      "PostgreSQL",
      "Redis",
      "Kong",
      "Kubernetes",
      "Microservice",
    ],
    description:
      "Bridged on-premise CA Layer 7 logic with cloud-native Kong, enabling incremental deployment with zero downtime.",
    impact: "Handle all Easy App Requests",
  },
  {
    title: "Inventory Asset Management System",
    dateRange: "2025",
    technologies: [
      "Ruby on Rails",
      "React",
      "PostgreSQL",
      "REST APIs",
      "Docker",
    ],
    description:
      "Enterprise asset-tracking platform with request/return workflows, role-based access control",
    impact: "800+ employees",
  },
  {
    title: "SD-Booking (Room Reservation System)",
    dateRange: "2023 – 2024",
    technologies: ["Go", "React", "TypeScript", "PWA", "Webhooks"],
    description:
      "Real-time room booking platform with role-based access, admin dashboard, and push notifications via webhooks.",
    impact: "500+ active users",
  },
  {
    title: "LongPlan Validator",
    dateRange: "2023 – 2025",
    technologies: ["Go", "React", "Graph Algorithms"],
    description:
      "Senior thesis validating 200+ curriculum rules for prerequisites and graduation.",
    impact: "Senior Thesis",
  },
  {
    title: "SD-Letter",
    dateRange: "2023 – 2025",
    technologies: ["Go", "React", "TypeScript", "WebHooks"],
    description:
      "Certificate request workflow with multi-stage approval, reducing processing time by 40%.",
    impact: "500+ requests/semester",
  },
];

// ── Education ───────────────────────────────────────────────────────────────

export const education: Education = {
  degree: "Bachelor of Engineering in Computer Engineering",
  school: "Chiang Mai University",
  graduated: "2025",
  honours: "Second-Class Honours",
  gpa: "3.32/4.00",
  thesis:
    "LongPlan — Study Plan Validator (algorithmic validation with graph algorithms and curriculum rule enforcement)",
};

// ── Bento Grid Display Helpers ──────────────────────────────────────────────
// Categories that show as icon grids in the bento layout vs. badge lists

/** Skill categories rendered as icon grids in PortfolioBento */
export const bentoGridSkillCategories = [
  "Languages",
  "Backend",
  "Frontend",
  "API Gateway",
  "Databases",
  "Cloud/DevOps",
  "Monitoring",
] as const;

/** Skill categories rendered as badge lists in PortfolioBento */
export const bentoBadgeSkillCategories = [
  "AI Agent Tooling",
  "Practices",
] as const;

/** Interests shown in the bento Interests card */
export const interests = [
  "System Design",
  "Clean Architecture",
  "API Design",
  "DevOps",
  "Functional Programming",
];
