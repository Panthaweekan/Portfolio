// ============================================================================
// Portfolio Data — Single Source of Truth
// ============================================================================
// All portfolio content lives here. Update this file to update the entire site.
// Strictly synchronized with cv.tex.
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
  subtitle?: string;
  dateRange: string;
  status?: string;
  technologies: string[];
  description: string;
  highlights?: string[];
  /** Optional impact metric (e.g. "10M+ users") */
  impact?: string;
  github?: string;
  demo?: string;
  architecture?: string;
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
  availability: "Open to Remote / Hybrid",
  email: "panthaweekansomngam@gmail.com",
  phone: "+66 946359510",
  github: "https://github.com/Panthaweekan",
  linkedin: "https://www.linkedin.com/in/panthaweekan/",
  portfolio: "https://panthaweekan.github.io/Portfolio/",
  spokenLanguages: ["EN (Intermediate)", "TH (Native)"],
  bio: "Associate Software Engineer at SCB TechX. Specializing in enterprise API gateways, cloud migration, and full-stack development with Go, Ruby on Rails, and modern cloud-native architectures.",
  aboutSummary:
    "I am an Associate Software Engineer at SCB TechX specializing in enterprise API gateways, cloud migration, and full-stack development. I focus on building scalable systems, from high-throughput Go microservices behind Kong to complex workflow engines using Ruby on Rails and React/TypeScript. Passionate about Hexagonal Architecture, strict layer separation, and SOLID principles—creating robust, testable applications that teams can evolve with confidence.",
};

// ── Technical Skills ────────────────────────────────────────────────────────

export const technicalSkills: SkillCategory[] = [
  {
    name: "Languages",
    items: [
      { label: "Go", highlight: true },
      { label: "TypeScript", highlight: true },
      { label: "JavaScript" },
      { label: "Ruby" },
      { label: "Python" },
      { label: "SQL" },
      { label: "Java" },
      { label: "HTML/CSS" },
      { label: "Haskell" },
    ],
  },
  {
    name: "Frameworks",
    items: [
      { label: "Fiber", highlight: true },
      { label: "Gin" },
      { label: "Ruby on Rails" },
      { label: "React", highlight: true },
      { label: "Next.js" },
      { label: "Node.js" },
      { label: "Vite" },
      { label: "Tailwind CSS" },
      { label: "MUI" },
      { label: "TanStack Query" },
    ],
  },
  {
    name: "Infrastructure",
    items: [
      { label: "PostgreSQL", highlight: true },
      { label: "Redis" },
      { label: "Docker", highlight: true },
      { label: "Kubernetes" },
      { label: "AWS" },
      { label: "Kong API Gateway", highlight: true },
      { label: "CA Layer 7" },
      { label: "Nginx" },
      { label: "Supabase" },
      { label: "Vercel" },
      { label: "Linux" },
    ],
  },
  {
    name: "Observability",
    items: [
      { label: "Prometheus" },
      { label: "Grafana" },
      { label: "ELK Stack" },
    ],
  },
  {
    name: "Tools",
    items: [
      { label: "Git" },
      { label: "GitHub Actions" },
      { label: "Jenkins" },
      { label: "HashiCorp Vault" },
    ],
  },
  {
    name: "Practices",
    items: [
      { label: "System Design", highlight: true },
      { label: "Data Structures & Algorithms" },
      { label: "REST APIs" },
      { label: "Microservices" },
      { label: "CI/CD" },
      { label: "TDD" },
      { label: "SOLID" },
      { label: "OOP" },
      { label: "Agile/Scrum" },
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
        text: "Developed a Go microservice handling token validation, authentication, and request routing for SCB Easy's 10M+ user platform, integrated behind Kong as part of a phased migration away from a legacy on-premise gateway.",
      },
      {
        text: "Designed the plugin system, routing engine, caching layer, and observability infrastructure for the new gateway, with Prometheus metrics and structured logging ready for production rollout.",
      },
      {
        text: "Designed and developed an enterprise asset management platform with multi-stage approval workflows, role-based access control for six user roles, financial reporting dashboards, and real-time notifications, used across the organization.",
      },
      {
        text: "Leveraged AI-assisted development tools across code generation, unit-testing, refactoring, architecture review, and documentation to accelerate delivery on complex features.",
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
        text: "Designed and deployed two production web applications serving 500+ active users, owning the full lifecycle from stakeholder requirements through containerized deployment.",
      },
      {
        text: "Developed a real-time room reservation system with role-based access, admin dashboard, and mobile push notifications, adopted by the faculty for daily scheduling.",
      },
      {
        text: "Developed a multi-stage certificate approval workflow that digitized a paper-based process, reducing turnaround from days to hours.",
      },
      {
        text: "Applied hexagonal architecture across all projects, building RESTful APIs in Go with React/TypeScript frontends and PostgreSQL.",
      },
    ],
  },
];

// ── Key Projects ────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    title: "API Gateway Microservice",
    subtitle: "SCB TechX",
    dateRange: "2025 – Present",
    status: "Production",
    impact: "Enabling phase rollout for SCB Easy",
    description: "Built a token service and routing migration layer in Go behind Kong to incrementally replace a legacy gateway, implementing token authentication, plugin-based request transformation, and per-service circuit breaking with retry and exponential backoff across 30+ microservices.",
    highlights: [
      "Built a token service and routing migration layer in Go behind Kong to incrementally replace a legacy gateway, implementing token authentication, plugin-based request transformation, and per-service circuit breaking with retry and exponential backoff across 30+ microservices.",
      "Developed a declarative config sync system based on the Kong decK pattern, using YAML route definitions with diff, rollback, and response caching — enabling GitOps-style config management and safe phased rollouts.",
      "Structured the service using Hexagonal Architecture with strict layer separation, dependency injection, and interface-driven design — keeping core business logic fully testable and decoupled from Kong, Redis, and all infrastructure dependencies."
    ],
    technologies: ["Go", "Fiber", "PostgreSQL", "Redis", "Kong", "Prometheus", "Kubernetes"],
    github: "https://github.com/Panthaweekan",
    demo: "#",
    architecture: `graph LR
    subgraph "Client Applications"
        App1[Mobile App]
        App2[Web App]
        App3[Partner APIs]
    end

    subgraph "Hybrid API Gateway - Go Fiber"
        GW[API Gateway<br/>Request Router]
        L7Logic[CA Layer 7<br/>Logic Engine]
        KongPolicy[Kong<br/>Policy Engine]
        EventDB[(PostgreSQL<br/>Event Store)]
    end

    subgraph "Backend Microservices"
        Auth[Auth Service]
        User[User Service]
        Payment[Payment Service]
        Catalog[Catalog Service]
    end

    App1 -->|HTTPS| GW
    App2 -->|HTTPS| GW
    App3 -->|HTTPS| GW

    GW -->|Route Logic| L7Logic
    GW -->|Apply Policies| KongPolicy
    GW -->|Log Events| EventDB

    GW -->|Forward| Auth
    GW -->|Forward| User
    GW -->|Forward| Payment
    GW -->|Forward| Catalog

    style GW fill:#FF9051,stroke:#fff,color:#fff
    style L7Logic fill:#9C83FF,stroke:#fff,color:#fff
    style KongPolicy fill:#9C83FF,stroke:#fff,color:#fff
    style EventDB fill:#1e293b,stroke:#9C83FF,color:#fff`
  },
  {
    title: "Inventory Asset Management System",
    subtitle: "SCB TechX",
    dateRange: "2025",
    status: "Production",
    impact: "Used across the organization",
    description: "Built a database-driven workflow engine to handle complex request lifecycles across four parallel workflows (request, spare, repair, return), enforcing approval chains per role and step.",
    highlights: [
      "Built a database-driven workflow engine to handle complex request lifecycles across four parallel workflows (request, spare, repair, return), enforcing approval chains per role and step.",
      "Implemented role-based access control for six user roles with Azure AD single sign-on.",
      "Built reporting dashboards aggregating asset requests, utilization, financial summaries, and processing efficiency, with Excel and CSV export.",
      "Developed the frontend with reusable components, type-safe API clients generated from the backend specification, and full offline-capable PWA support with push notifications."
    ],
    technologies: ["Ruby on Rails", "React", "TypeScript", "PostgreSQL", "Azure AD", "Docker"],
    github: "https://github.com/Panthaweekan",
    demo: "#",
    architecture: `graph TB
    subgraph "Client Layer"
        UI[React + TypeScript UI]
    end

    subgraph "Application Layer"
        Rails[Ruby on Rails API]
        Auth[Authentication Service]
    end

    subgraph "Data Layer"
        DB[(PostgreSQL<br/>Asset Database)]
        Cache[(Redis Cache)]
    end

    UI -->|HTTP/REST| Rails
    Rails -->|Auth Check| Auth
    Rails -->|CRUD Operations| DB
    Rails -->|Session Data| Cache

    style UI fill:#9C83FF,stroke:#fff,color:#fff
    style Rails fill:#FF9051,stroke:#fff,color:#fff
    style DB fill:#1e293b,stroke:#9C83FF,color:#fff
    style Cache fill:#1e293b,stroke:#FF9051,color:#fff`
  },
  {
    title: "SD-Booking — Room Reservation System",
    subtitle: "Chiang Mai University",
    dateRange: "2023 – 2024",
    status: "Production",
    impact: "Serving 500+ active users",
    description: "Built a real-time room booking platform serving 500+ faculty users with role-based access, booking conflict detection, and mobile push notifications, adopted for daily operations.",
    highlights: [
      "Built a real-time room booking platform serving 500+ faculty users with role-based access, booking conflict detection, and mobile push notifications, adopted for daily operations."
    ],
    technologies: ["Go", "React", "TypeScript", "PostgreSQL", "PWA", "Docker"],
    github: "https://github.com/Panthaweekan",
    demo: "#",
    architecture: `graph TB
    subgraph "Adapters - Driving Side"
        REST[REST API<br/>Go Fiber]
        WebUI[React UI<br/>Vite + Tailwind]
    end

    subgraph "Application Core - Hexagonal Architecture"
        Ports[Ports/Interfaces]
        Domain[Domain Logic<br/>Booking Rules]
        UseCases[Use Cases<br/>Book/Approve/Cancel]
    end

    subgraph "Adapters - Driven Side"
        DBAdapter[PostgreSQL<br/>Repository]
        WebHook[WebHook<br/>Notifier]
        PWA[PWA Push<br/>Service]
    end

    WebUI -->|HTTP| REST
    REST -->|Inbound| Ports
    Ports -->|Execute| UseCases
    UseCases -->|Business Rules| Domain
    Domain -->|Outbound| Ports
    Ports -->|Persist| DBAdapter
    Ports -->|Notify| WebHook
    Ports -->|Push| PWA

    style Domain fill:#FF9051,stroke:#fff,color:#fff
    style UseCases fill:#9C83FF,stroke:#fff,color:#fff
    style Ports fill:#9C83FF,stroke:#fff,color:#fff
    style REST fill:#1e293b,stroke:#9C83FF,color:#fff
    style DBAdapter fill:#1e293b,stroke:#9C83FF,color:#fff`
  },
  {
    title: "FitJourney — Fitness Tracking Platform",
    subtitle: "Side Project",
    dateRange: "2026",
    status: "Completed",
    description: "Shipped a full-stack fitness PWA addressing a personal gap in daily tracking — consolidating workout logging, nutrition, body metrics, and AI-powered meal scanning into a single self-hosted tool.",
    highlights: [
      "Shipped a full-stack fitness PWA addressing a personal gap in daily tracking — consolidating workout logging, nutrition, body metrics, and AI-powered meal scanning into a single self-hosted tool.",
      "Designed analytics dashboards for performance trends and calorie tracking; architected as a monorepo with Supabase (auth, DB, storage) and Vercel edge deployment for fast cold starts."
    ],
    technologies: ["Next.js", "Supabase", "Tailwind CSS", "OpenAI API", "Vercel"],
    github: "https://github.com/Panthaweekan/silver-octo-palm-tree",
    demo: "https://github.com/Panthaweekan/silver-octo-palm-tree",
  },
  {
    title: "Twitch Chat TTS Bot",
    subtitle: "Side Project",
    dateRange: "2026",
    status: "Completed",
    description: "Engineered a real-time Twitch TTS bot that pipes synthesized audio directly from memory to playback, eliminating disk I/O and reducing per-message overhead versus file-based approaches — supporting Thai and English neural voices via Microsoft Edge TTS.",
    highlights: [
      "Engineered a real-time Twitch TTS bot that pipes synthesized audio directly from memory to playback, eliminating disk I/O and reducing per-message overhead versus file-based approaches — supporting Thai and English neural voices via Microsoft Edge TTS.",
      "Built a message priority queue with anti-spam filtering and automated OAuth token refresh to handle high-volume chat reliably without manual intervention."
    ],
    technologies: ["Bun", "Microsoft Edge TTS", "tmi.js", "FFplay"],
    github: "https://github.com/Panthaweekan/tts",
    demo: "https://github.com/Panthaweekan/tts",
  }
];

// ── Education ───────────────────────────────────────────────────────────────

export const education: Education = {
  degree: "Bachelor of Engineering in Computer Engineering",
  school: "Chiang Mai University",
  graduated: "2025",
  honours: "Second-Class Honours",
  gpa: "3.32/4.00",
  thesis:
    "LongPlan — Study plan validator using graph algorithms (topological sort, cycle detection) and curriculum rule enforcement. Built in Go with React frontend.",
};

// ── Bento Grid Display Helpers ──────────────────────────────────────────────
// Categories that show as icon grids in the bento layout vs. badge lists

/** Skill categories rendered as icon grids in PortfolioBento */
export const bentoGridSkillCategories = [
  "Languages",
  "Frameworks",
  "Infrastructure",
  "Observability",
  "Tools",
] as const;

/** Skill categories rendered as badge lists in PortfolioBento */
export const bentoBadgeSkillCategories = [
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
