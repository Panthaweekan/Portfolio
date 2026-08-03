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

export interface ArchNode {
  label: string;
  sublabel?: string;
  iconUrl?: string;
  iconEmoji?: string;
  color: string;
}

export interface ArchLayer {
  name: string;
  nodes: ArchNode[];
}

export interface Project {
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
        text: "Building the Go token-validation and routing service that sits behind Kong to replace a legacy on-premise gateway, letting SCB Easy's 10M+ user platform move service by service instead of through one high-risk cutover.",
      },
      {
        text: "Designed the gateway's plugin system, routing engine, and observability stack (Prometheus, structured logging), giving the migration team per-route visibility before rollout.",
      },
      {
        text: "Structured the service in hexagonal architecture with dependency injection and interface-driven design, keeping business logic fully unit-testable and decoupled from Kong, Redis, and every infrastructure dependency.",
      },
      {
        text: "Prototyped declarative config sync (Kong decK pattern: YAML route definitions with diff and rollback) and per-service circuit breaking, targeting GitOps-style config management and safe phased rollout across the migration's 30+ services.",
      },
      {
        text: "Delivered an enterprise asset management platform end to end: a database-driven workflow engine covering four parallel lifecycles (request, spare, repair, return), enforcing approval chains per role and step for six user roles under Azure AD SSO.",
      },
      {
        text: "Built its reporting dashboards (utilization, financial summaries, processing efficiency, Excel/CSV export) and an installable PWA with push notifications, so asset managers self-serve reports.",
      },
      {
        text: "Applied AI-assisted development across code generation, testing, refactoring, and architecture review to speed delivery.",
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
        text: "Shipped two production web applications adopted across the faculty, owning each from requirements through containerized deployment.",
      },
      {
        text: "Built SD-Booking, a real-time room reservation system with booking-conflict detection, role-based access, an admin dashboard, and mobile push notifications — adopted for daily faculty scheduling and still in active use today.",
      },
      {
        text: "Digitized a paper-based certificate process into a multi-stage approval workflow, removing manual routing between offices and cutting turnaround on every request.",
      },
      {
        text: "Applied hexagonal architecture across both systems, building RESTful Go APIs against React/TypeScript frontends on PostgreSQL.",
      },
    ],
  },
];

// ── Key Projects ────────────────────────────────────────────────────────────

const DI = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons';
const di = (name: string, variant = 'original') => `${DI}/${name}/${name}-${variant}.svg`;

export const projects: Project[] = [
  {
    title: "API Gateway Microservice",
    subtitle: "SCB TechX",
    dateRange: "2025 – Present",
    status: "Production",
    impact: "Enabling phase rollout for SCB Easy",
    description: "Built a token service and routing layer in Go behind Kong to incrementally replace a legacy gateway, implementing token authentication and plugin-based request transformation.",
    highlights: [
      "Built a token service and routing layer in Go behind Kong to incrementally replace a legacy gateway, implementing token authentication and plugin-based request transformation.",
      "Designed and prototyped a declarative config-sync approach (Kong decK pattern: YAML route definitions with diff and rollback) and a per-service circuit-breaking strategy, targeting GitOps-style config management and safe phased rollout across the migration's 30+ services.",
      "Structured the service using Hexagonal Architecture with strict layer separation, dependency injection, and interface-driven design — keeping core business logic fully testable and decoupled from Kong, Redis, and all infrastructure dependencies."
    ],
    technologies: ["Go", "Fiber", "PostgreSQL", "Redis", "Kong", "Prometheus", "Kubernetes"],
    github: "https://github.com/Panthaweekan",
    demo: "#",
    visualArch: [
      {
        name: "Clients",
        nodes: [
          { label: "Mobile App",   iconEmoji: "📱", color: "#9C83FF" },
          { label: "Web App",      iconEmoji: "🌐", color: "#9C83FF" },
          { label: "Partner APIs", iconEmoji: "🔌", color: "#9C83FF" },
        ],
      },
      {
        name: "API Gateway",
        nodes: [
          { label: "Kong",     sublabel: "Policy Engine",  iconEmoji: "🔷", color: "#003459" },
          { label: "Go · Fiber", sublabel: "Token Service", iconUrl: di("go"), color: "#00ADD8" },
        ],
      },
      {
        name: "Microservices",
        nodes: [
          { label: "Auth",    iconEmoji: "🔐", color: "#FF9051" },
          { label: "User",    iconEmoji: "👤", color: "#FF9051" },
          { label: "Payment", iconEmoji: "💳", color: "#FF9051" },
          { label: "Catalog", iconEmoji: "📦", color: "#FF9051" },
        ],
      },
      {
        name: "Data & Observability",
        nodes: [
          { label: "PostgreSQL", iconUrl: di("postgresql"), color: "#336791" },
          { label: "Redis",      iconUrl: di("redis"),      color: "#DC382D" },
          { label: "Prometheus", iconEmoji: "🔥",           color: "#E6522C" },
          { label: "Kubernetes", iconUrl: di("kubernetes", "plain"), color: "#326CE5" },
        ],
      },
    ],
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
      "Developed the frontend with reusable components, partially generated type-safe API clients, and an installable PWA with push notifications."
    ],
    technologies: ["Ruby on Rails", "React", "TypeScript", "PostgreSQL", "Azure AD", "Docker"],
    github: "https://github.com/Panthaweekan",
    demo: "#",
    visualArch: [
      {
        name: "Identity",
        nodes: [
          { label: "Azure AD", sublabel: "SSO", iconUrl: di("azure"), color: "#0078D4" },
        ],
      },
      {
        name: "Frontend",
        nodes: [
          { label: "React",      iconUrl: di("react"),      color: "#61DAFB" },
          { label: "TypeScript", iconUrl: di("typescript"), color: "#3178C6" },
        ],
      },
      {
        name: "Backend API",
        nodes: [
          { label: "Ruby on Rails", iconUrl: di("ruby"),   color: "#CC342D" },
          { label: "Docker",        iconUrl: di("docker"), color: "#2496ED" },
        ],
      },
      {
        name: "Data",
        nodes: [
          { label: "PostgreSQL", iconUrl: di("postgresql"), color: "#336791" },
          { label: "Redis",      iconUrl: di("redis"),      color: "#DC382D" },
        ],
      },
    ],
  },
  {
    title: "SD-Booking — Room Reservation System",
    subtitle: "Chiang Mai University",
    dateRange: "2023 – 2024",
    status: "Production",
    impact: "Still in daily use across the faculty",
    description: "Built a real-time room booking platform used across the faculty, with role-based access, booking conflict detection, and mobile push notifications — adopted for daily operations and still in use today.",
    highlights: [
      "Built a real-time room booking platform used across the faculty, with role-based access, booking conflict detection, and mobile push notifications — adopted for daily operations and still in use today."
    ],
    technologies: ["Go", "React", "TypeScript", "PostgreSQL", "PWA", "Docker"],
    github: "https://github.com/Panthaweekan",
    demo: "#",
    visualArch: [
      {
        name: "Frontend",
        nodes: [
          { label: "React",      iconUrl: di("react"),      color: "#61DAFB" },
          { label: "TypeScript", iconUrl: di("typescript"), color: "#3178C6" },
          { label: "PWA",        iconEmoji: "📲",           color: "#9C83FF" },
        ],
      },
      {
        name: "API Layer",
        nodes: [
          { label: "Go · Fiber", iconUrl: di("go"), color: "#00ADD8" },
        ],
      },
      {
        name: "Core (Hexagonal)",
        nodes: [
          { label: "Ports",      iconEmoji: "🔌", color: "#9C83FF" },
          { label: "Domain",     iconEmoji: "⚙️", color: "#FF9051" },
          { label: "Use Cases",  iconEmoji: "📋", color: "#9C83FF" },
        ],
      },
      {
        name: "Data & Notifications",
        nodes: [
          { label: "PostgreSQL", iconUrl: di("postgresql"), color: "#336791" },
          { label: "Docker",     iconUrl: di("docker"),     color: "#2496ED" },
          { label: "Push",       iconEmoji: "🔔",           color: "#FF9051" },
        ],
      },
    ],
  },
  {
    title: "FitJourney — Fitness Tracking Platform",
    subtitle: "Side Project",
    dateRange: "2026",
    status: "Completed",
    description: "Shipped a full-stack fitness PWA addressing a personal gap in daily tracking — consolidating workout logging, nutrition, body metrics, and AI-powered meal scanning into a single self-hosted tool.",
    highlights: [
      "Built with Next.js App Router + Supabase (auth, DB, storage) — Google SSO via Supabase Auth for zero-friction sign-in.",
      "Designed analytics dashboards for performance trends and calorie tracking; deployed to Vercel Edge for fast global cold starts.",
      "Integrated OpenAI Vision API for AI-powered meal scanning — point camera at food, get instant macro breakdown."
    ],
    technologies: ["Next.js", "Supabase", "Tailwind CSS", "OpenAI API", "Vercel", "Google SSO"],
    github: "https://github.com/Panthaweekan/FitJourney",
    demo: "https://github.com/Panthaweekan/FitJourney",
    visualArch: [
      {
        name: "Client",
        nodes: [
          { label: "Next.js",  sublabel: "App Router", iconEmoji: "▲", color: "#000000" },
          { label: "PWA",      iconEmoji: "📲",         color: "#9C83FF" },
          { label: "Vercel",   sublabel: "Edge",        iconEmoji: "▲", color: "#000000" },
        ],
      },
      {
        name: "Auth",
        nodes: [
          { label: "Supabase Auth", sublabel: "Google SSO", iconEmoji: "⚡", color: "#3ECF8E" },
          { label: "Google OAuth",  iconEmoji: "🔑",          color: "#4285F4" },
        ],
      },
      {
        name: "Backend as a Service",
        nodes: [
          { label: "PostgreSQL", sublabel: "+ RLS",  iconUrl: di("postgresql"), color: "#336791" },
          { label: "Storage",    iconEmoji: "🗄️",    color: "#3ECF8E" },
        ],
      },
      {
        name: "AI",
        nodes: [
          { label: "OpenAI Vision", sublabel: "Meal Scanner", iconEmoji: "🤖", color: "#10A37F" },
        ],
      },
    ],
  },
  {
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
    demo: "https://github.com/Panthaweekan/tts",
    visualArch: [
      {
        name: "Input",
        nodes: [
          { label: "Twitch Chat", iconEmoji: "💬", color: "#9146FF" },
          { label: "tmi.js",      sublabel: "IRC Client", iconEmoji: "🔗", color: "#9146FF" },
        ],
      },
      {
        name: "Processing (Bun Runtime)",
        nodes: [
          { label: "Anti-Spam",   iconEmoji: "🛡️", color: "#334155" },
          { label: "Queue",       sublabel: "Priority", iconEmoji: "📋", color: "#FF9051" },
          { label: "Lang Detect", iconEmoji: "🌐",        color: "#9C83FF" },
        ],
      },
      {
        name: "Synthesis",
        nodes: [
          { label: "Edge TTS",    sublabel: "TH / EN", iconEmoji: "🔊", color: "#0078D4" },
          { label: "In-Memory",   sublabel: "Buffer",  iconEmoji: "💾", color: "#334155" },
        ],
      },
      {
        name: "Output",
        nodes: [
          { label: "FFplay", sublabel: "Playback", iconEmoji: "▶️", color: "#FF9051" },
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
