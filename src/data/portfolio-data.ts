// ============================================================================
// Portfolio Data — Single Source of Truth
// ============================================================================
// All portfolio content lives here. Update this file to update the entire site.
// Facts are synchronized with cv.tex (cv.tex wording wins). The site may show
// extra showcase items the 1-page CV omits (e.g. TTS Bot, thesis).
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
  /** One-line positioning shown first on the home page. */
  positioning: string;
  /** First-person introduction under the positioning line. */
  intro: string;
  /** Month the CV PDF was last updated, shown on /resume. */
  cvUpdated: string;
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

export interface ArchNode {
  label: string;
  sublabel?: string;
}

export interface ArchLayer {
  name: string;
  nodes: ArchNode[];
}

export interface Project {
  /** Stable anchor id for deep links, e.g. "finops" → /#finops */
  id: string;
  title: string;
  subtitle?: string;
  dateRange: string;
  status?: string;
  technologies: string[];
  description: string;
  highlights?: string[];
  impact?: string;
  github?: string;
  demo?: string;
  visualArch?: ArchLayer[];
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
  bio: "Associate Software Engineer at SCB TechX, building the FinOps cost engine for its agentic AI platform. Specializing in Go platform services, API gateway migration, and full-stack development with Go, Ruby on Rails, and React/TypeScript.",
  aboutSummary:
    "I am an Associate Software Engineer at SCB TechX building the FinOps cost engine for its agentic AI platform — pricing every LLM call and showing customers where their AI spend goes. I focus on building maintainable systems, from Go services on Kafka and behind Kong to complex workflow engines using Ruby on Rails and React/TypeScript. Passionate about Hexagonal Architecture, strict layer separation, and SOLID principles—creating robust, testable applications that teams can evolve with confidence.",
  positioning: "I take systems from a written spec to running code.",
  intro:
    "I'm an Associate Software Engineer at SCB TechX in Bangkok. Since September 2026 I've been building the FinOps engine for TechX's agentic AI platform: it works out what every LLM call costs and shows customers where that money went.",
  cvUpdated: "October 2026",
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
    technologies: ["Go", "Kafka", "OpenTelemetry", "PostgreSQL", "AWS", "Kong", "Rails", "Next.js", "TypeScript"],
    highlights: [
      {
        text: "Ran discovery for the FinOps (AI cost management) module of SCB TechX's agentic AI platform: wrote the requirements, module spec, and service design for the product owner and engineering manager, and won agreement that budget enforcement should stay inside the platform.",
      },
      {
        text: "Built, with two teammates, the engine that works out what each customer's AI usage costs, down to team and project level: a Go service consuming OpenTelemetry usage events from Kafka, with exact-money pricing at the price and FX rate in force, retry and dead-letter handling so no charge is lost or double-counted, and multi-tenant PostgreSQL with AWS IAM auth.",
      },
      {
        text: "Built the AI cost dashboard in the platform's Next.js console, drilling from organisation down to team, project, workflow, run, and step (in review), over a typed reporting interface to the engine.",
      },
      {
        text: "Set the team's engineering practices (architecture decision records, test-first development with a coverage gate, lint-enforced hexagonal layering) and built an AI-assisted code review workflow, adopted team-wide, whose reviewer agents and verifier catch bugs human reviewers missed.",
      },
      {
        text: "Built a new Go service behind Kong for token validation, authentication, and request routing, part of moving SCB Easy (10M+ users) off its legacy on-premise API gateway; handed over to the team in Sep 2026 as the migration continued.",
      },
      {
        text: "Designed the gateway's plugin system, routing engine, and Prometheus monitoring, and prototyped safer rollout across the migration's 30+ services: YAML config sync with diff and rollback (Kong decK pattern) and per-service circuit breaking.",
      },
      {
        text: "Replaced spreadsheet- and email-based asset tracking with an internal platform running four request lifecycles through per-role approval chains, with Azure AD single sign-on, six user roles, and reporting with Excel/CSV export.",
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
        text: "Built and launched two production web applications used across the faculty, owning everything from stakeholder requirements to containerized deployment (Go, React/TypeScript, PostgreSQL), including a multi-stage workflow that digitized paper-based certificate approvals and cut turnaround from weeks to days.",
      },
      {
        text: "Built SD-Booking, the room reservation system the faculty uses for daily scheduling, still in active use today: real-time booking with conflict detection, role-based access, an admin dashboard, and mobile push notifications.",
      },
    ],
  },
];

// ── Key Projects ────────────────────────────────────────────────────────────


export const projects: Project[] = [
  {
    id: "finops",
    title: "FinOps Engine — Agentic AI Platform",
    subtitle: "SCB TechX",
    dateRange: "Sep 2026 – Present",
    status: "In progress",
    technologies: ["Go", "Kafka", "OpenTelemetry", "PostgreSQL", "AWS", "Next.js", "TypeScript"],
    description: "Ran discovery for the FinOps module of SCB TechX's agentic AI platform, then built, with two teammates, the Go engine that prices every LLM call and the console dashboard that shows customers where that money went.",
    highlights: [
      "Ran discovery for the FinOps (AI cost management) module of SCB TechX's agentic AI platform: wrote the requirements, module spec, and service design for the product owner and engineering manager, and won agreement that budget enforcement should stay inside the platform.",
      "Built, with two teammates, the engine that works out what each customer's AI usage costs, down to team and project level: a Go service consuming OpenTelemetry usage events from Kafka, with exact-money pricing at the price and FX rate in force, retry and dead-letter handling so no charge is lost or double-counted, and multi-tenant PostgreSQL with AWS IAM auth.",
      "Built the AI cost dashboard in the platform's Next.js console, drilling from organisation down to team, project, workflow, run, and step (in review), over a typed reporting interface to the engine.",
      "Set the team's engineering practices (architecture decision records, test-first development with a coverage gate, lint-enforced hexagonal layering) and built an AI-assisted code review workflow, adopted team-wide, whose reviewer agents and verifier catch bugs human reviewers missed."
    ],
    visualArch: [
      { name: "Platform", nodes: [{ label: "Agent step", sublabel: "emits a usage signal per LLM call" }] },
      { name: "Ingestion", nodes: [{ label: "Collector" }, { label: "Kafka", sublabel: "usage, retry and dead-letter topics" }] },
      { name: "FinOps engine (Go)", nodes: [{ label: "Pricing", sublabel: "price and FX rate in force" }, { label: "Attribution", sublabel: "organisation tree" }, { label: "Reports API" }] },
      { name: "Data", nodes: [{ label: "PostgreSQL", sublabel: "multi-tenant" }] },
      { name: "Console", nodes: [{ label: "AI cost dashboard", sublabel: "organisation down to one step (in review)" }] },
    ],
  },
  {
    id: "gateway",
    title: "API Gateway Microservice",
    subtitle: "SCB TechX",
    dateRange: "2025 – 2026",
    status: "Handed off",
    impact: "Phased migration toward SCB Easy's 10M+ user platform",
    description: "Built a token service and routing layer in Go behind Kong to incrementally replace a legacy gateway, implementing token authentication and plugin-based request transformation.",
    highlights: [
      "Built a token service and routing layer in Go behind Kong to incrementally replace a legacy gateway, implementing token authentication and plugin-based request transformation.",
      "Designed and prototyped a declarative config-sync approach (Kong decK pattern: YAML route definitions with diff and rollback) and a per-service circuit-breaking strategy, targeting GitOps-style config management and safe phased rollout across the migration's 30+ services.",
      "Structured the service using Hexagonal Architecture with strict layer separation, dependency injection, and interface-driven design — keeping core business logic fully testable and decoupled from Kong, Redis, and all infrastructure dependencies."
    ],
    technologies: ["Go", "Fiber", "PostgreSQL", "Redis", "Kong", "Prometheus", "Kubernetes"],
    visualArch: [
      {
        name: "Clients",
        nodes: [
          { label: "Mobile App" },
          { label: "Web App" },
          { label: "Partner APIs" },
        ],
      },
      {
        name: "API Gateway",
        nodes: [
          { label: "Kong",     sublabel: "Policy Engine" },
          { label: "Go · Fiber", sublabel: "Token Service" },
        ],
      },
      {
        name: "Backend services",
        nodes: [
          { label: "30+ services", sublabel: "migration continuing after handover" },
        ],
      },
      {
        name: "Data & Observability",
        nodes: [
          { label: "PostgreSQL" },
          { label: "Redis" },
          { label: "Prometheus" },
          { label: "Kubernetes" },
        ],
      },
    ],
  },
  {
    id: "assets",
    title: "Inventory Asset Management System",
    subtitle: "SCB TechX",
    dateRange: "2025",
    description: "Replaced spreadsheet- and email-based asset tracking with an internal platform: built a database-driven workflow engine to handle complex request lifecycles across four parallel workflows (request, spare, repair, return), enforcing approval chains per role and step.",
    highlights: [
      "Built a database-driven workflow engine to handle complex request lifecycles across four parallel workflows (request, spare, repair, return), enforcing approval chains per role and step.",
      "Implemented role-based access control for six user roles with Azure AD single sign-on.",
      "Built reporting dashboards aggregating asset requests, utilization, financial summaries, and processing efficiency, with Excel and CSV export.",
      "Developed the frontend with reusable components, partially generated type-safe API clients, and an installable PWA with push notifications."
    ],
    technologies: ["Ruby on Rails", "React", "TypeScript", "PostgreSQL", "Azure AD", "Docker"],
    visualArch: [
      {
        name: "Identity",
        nodes: [
          { label: "Azure AD", sublabel: "SSO" },
        ],
      },
      {
        name: "Frontend",
        nodes: [
          { label: "React" },
          { label: "TypeScript" },
        ],
      },
      {
        name: "Backend API",
        nodes: [
          { label: "Ruby on Rails" },
          { label: "Docker" },
        ],
      },
      {
        name: "Data",
        nodes: [
          { label: "PostgreSQL" },
          { label: "Redis" },
        ],
      },
    ],
  },
  {
    id: "sd-booking",
    title: "SD-Booking — Room Reservation System",
    subtitle: "Chiang Mai University",
    dateRange: "2023 – 2024",
    status: "Production",
    impact: "Still in daily use by the faculty",
    description: "Built a real-time room booking platform used across the faculty, with role-based access, booking conflict detection, and mobile push notifications — adopted for daily operations and still in use today.",
    highlights: [
      "Built a real-time room booking platform used across the faculty, with role-based access, booking conflict detection, and mobile push notifications — adopted for daily operations and still in use today."
    ],
    technologies: ["Go", "React", "TypeScript", "PostgreSQL", "PWA", "Docker"],
    visualArch: [
      {
        name: "Frontend",
        nodes: [
          { label: "React" },
          { label: "TypeScript" },
          { label: "PWA" },
        ],
      },
      {
        name: "API Layer",
        nodes: [
          { label: "Go · Fiber" },
        ],
      },
      {
        name: "Core (Hexagonal)",
        nodes: [
          { label: "Ports" },
          { label: "Domain" },
          { label: "Use Cases" },
        ],
      },
      {
        name: "Data & Notifications",
        nodes: [
          { label: "PostgreSQL" },
          { label: "Docker" },
          { label: "Push" },
        ],
      },
    ],
  },
  {
    id: "fitjourney",
    title: "FitJourney — Fitness Tracking Platform",
    subtitle: "Side Project",
    dateRange: "2026",
    status: "Completed",
    description: "Shipped a full-stack fitness PWA addressing a personal gap in daily tracking — consolidating workout logging, nutrition, body metrics, and AI-powered meal scanning into a single personal tool.",
    highlights: [
      "Built with Next.js App Router + Supabase (auth, DB, storage) — Google SSO via Supabase Auth for zero-friction sign-in.",
      "Designed analytics dashboards for performance trends and calorie tracking; deployed to Vercel Edge for fast global cold starts.",
      "Integrated OpenAI Vision API for AI-powered meal scanning — point camera at food, get instant macro breakdown."
    ],
    technologies: ["Next.js", "Supabase", "Tailwind CSS", "OpenAI API", "Vercel", "Google SSO"],
    github: "https://github.com/Panthaweekan/FitJourney",
    visualArch: [
      {
        name: "Client",
        nodes: [
          { label: "Next.js",  sublabel: "App Router" },
          { label: "PWA" },
          { label: "Vercel",   sublabel: "Edge" },
        ],
      },
      {
        name: "Auth",
        nodes: [
          { label: "Supabase Auth", sublabel: "Google SSO" },
          { label: "Google OAuth" },
        ],
      },
      {
        name: "Backend as a Service",
        nodes: [
          { label: "PostgreSQL", sublabel: "+ RLS" },
          { label: "Storage" },
        ],
      },
      {
        name: "AI",
        nodes: [
          { label: "OpenAI Vision", sublabel: "Meal Scanner" },
        ],
      },
    ],
  },
  {
    id: "tts",
    title: "Twitch Chat TTS Bot",
    subtitle: "Side Project",
    dateRange: "2026",
    status: "Completed",
    description: "Engineered a real-time Twitch TTS bot that pipes synthesized audio directly from memory to playback, eliminating disk I/O and reducing per-message overhead versus file-based approaches — supporting Thai and English neural voices via Microsoft Edge TTS.",
    highlights: [
      "Pipes synthesized audio directly from memory to playback — no disk I/O — reducing per-message latency versus file-based approaches.",
      "Built a priority message queue with anti-spam filtering and automated OAuth token refresh to handle high-volume chat reliably.",
      "Supports Thai and English neural voices via Microsoft Edge TTS with language auto-detection per message."
    ],
    technologies: ["Bun", "Microsoft Edge TTS", "tmi.js", "FFplay"],
    github: "https://github.com/Panthaweekan/tts",
    visualArch: [
      {
        name: "Input",
        nodes: [
          { label: "Twitch Chat" },
          { label: "tmi.js",      sublabel: "IRC Client" },
        ],
      },
      {
        name: "Processing (Bun Runtime)",
        nodes: [
          { label: "Anti-Spam" },
          { label: "Queue",       sublabel: "Priority" },
          { label: "Lang Detect" },
        ],
      },
      {
        name: "Synthesis",
        nodes: [
          { label: "Edge TTS",    sublabel: "TH / EN" },
          { label: "In-Memory",   sublabel: "Buffer" },
        ],
      },
      {
        name: "Output",
        nodes: [
          { label: "FFplay", sublabel: "Playback" },
        ],
      },
    ],
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
