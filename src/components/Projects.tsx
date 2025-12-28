import { useEffect, useRef, lazy, Suspense } from "react";
import { m } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Github, ChevronDown } from "lucide-react";
import { FluentEmoji } from "@lobehub/ui";
import { use3DTilt } from "../hooks/use3DTilt";

// Lazy load MermaidDiagram to avoid loading 910KB+ library on initial page load
const MermaidDiagram = lazy(() => import("./MermaidDiagram").then(m => ({ default: m.MermaidDiagram })));

gsap.registerPlugin(ScrollTrigger);


// Project Card Component with 3D Tilt
function ProjectCard({ project }: {
  project: any;
}) {
  const cardRef = use3DTilt<HTMLDivElement>({
    maxTilt: 10,
    perspective: 1000,
    scale: 1.02,
    speed: 400,
    glare: true,
    glareMaxOpacity: 0.15,
  });

  return (
    <div ref={cardRef} style={{ position: 'relative' }}>
      <Card className="project-card glass-card flex flex-col h-full hover:shadow-2xl hover:border-primary/70 hover:glow-primary transition-all duration-300 group">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-xl md:text-2xl group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
            <div className="flex flex-col items-end gap-1">
              {"status" in project && project.status && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  {project.status}
                </span>
              )}
              <span className="text-xs font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full whitespace-nowrap">
                {project.dateRange}
              </span>
            </div>
          </div>
          {"impact" in project && project.impact && (
            <div className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-lg w-fit">
              <span>📊</span> {project.impact}
            </div>
          )}
          <CardDescription className="text-sm font-medium text-foreground/80 italic">
            {project.subtitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>
          
          {/* Key Highlights */}
          {"highlights" in project && project.highlights && (
            <div className="pt-2">
              <p className="text-xs font-semibold text-foreground/70 mb-2">
                Key Highlights:
              </p>
              <ul className="space-y-1.5">
                {project.highlights.map((highlight: string, hIndex: number) => (
                  <li key={hIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="pt-2">
            <p className="text-xs font-semibold text-foreground/70 mb-2">
              Tech Stack:
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string, techIndex: number) => (
                <span
                  key={techIndex}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          {"architecture" in project && project.architecture && (
            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-3">
                <ChevronDown className="h-4 w-4" />
                Architecture Overview
              </div>
              <div className="p-4 rounded-lg bg-muted/30 backdrop-blur-sm overflow-hidden">
                <Suspense fallback={<div className="h-32 flex items-center justify-center text-muted-foreground text-sm">Loading diagram...</div>}>
                  <MermaidDiagram
                    chart={project.architecture}
                    className="my-2"
                  />
                </Suspense>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="gap-3 pt-6">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            asChild
          >
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              View Code
            </a>
          </Button>
          {project.demo !== "#" && (
            <Button size="sm" className="flex-1" asChild>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export function Projects() {
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (projectsRef.current) {
      const cards = projectsRef.current.querySelectorAll('.project-card');

      cards.forEach((card, _) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            rotateX: -15,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const projects = [
    {
      title: "Inventory Asset Management System",
      subtitle:
        "Enterprise-grade full-stack asset management solution with centralized tracking and workflow automation",
      dateRange: "2025",
      status: "Production",
      impact: "Streamlined asset tracking for 100+ employees",
      description:
        "Developed and architected a full-stack Inventory Asset Management System (Ruby on Rails, React, TypeScript) featuring full CRUD operations, asset request/return workflows, and a centralized database serving as a single source of truth for company-wide asset tracking.",
      highlights: [
        "Built complete asset lifecycle management with request/return workflows",
        "Implemented role-based access control for admins and employees",
        "Designed centralized database as single source of truth",
      ],
      technologies: [
        "Ruby on Rails",
        "React",
        "TypeScript",
        "PostgreSQL",
        "RESTful APIs",
      ],
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
    style Cache fill:#1e293b,stroke:#FF9051,color:#fff`,
    },
    {
      title: "Custom Hybrid API Gateway Solution",
      subtitle:
        "Experimental API gateway combining CA Layer 7 and Kong best practices with database-driven architecture",
      dateRange: "2025",
      status: "Production",
      impact: "Processing 10K+ API requests daily",
      description:
        "Led the experimental development of a custom API gateway solution that preserved existing CA Layer 7 logic while integrating Kong API Gateway best practices. Designed a hybrid architecture—implemented in Go using the Fiber (fasthttp) framework—that combined the strengths of both platforms through a database event-driven design.",
      highlights: [
        "Preserved existing CA Layer 7 business logic during migration",
        "Implemented database event-driven design for config propagation",
        "Achieved sub-millisecond routing latency with Go Fiber (fasthttp)",
      ],
      technologies: [
        "Go",
        "Fiber Framework",
        "PostgreSQL",
        "CA Layer 7",
        "Kong API Gateway",
        "Microservices",
      ],
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
    style EventDB fill:#1e293b,stroke:#9C83FF,color:#fff`,
    },
    {
      title: "SD-Booking — Room Reservation System",
      subtitle:
        "Enterprise room booking platform with role-based access control and real-time notification system",
      dateRange: "2023 - 2025",
      status: "Production",
      impact: "Serving 800+ daily active users",
      description:
        "Designed and developed following Hexagonal Architecture principles using Go, TypeScript, React, Vite, Tailwind CSS, and PostgreSQL with production deployment on Docker. Supports status checks, bookings, and admin approvals with real-time updates. Integrated Web Hook-based PWA notifications via SDQueue, reducing user wait time by 60%.",
      highlights: [
        "Implemented real-time PWA notifications reducing user wait time by 60%",
        "Built complete booking lifecycle with admin approval workflows",
        "Applied Hexagonal Architecture for clean separation of concerns",
      ],
      technologies: [
        "Go",
        "Fiber Framework",
        "TypeScript",
        "React",
        "Vite",
        "Tailwind CSS",
        "PostgreSQL",
        "Docker",
        "Hexagonal Architecture",
        "PWA",
        "WebHooks",
      ],
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
    style DBAdapter fill:#1e293b,stroke:#9C83FF,color:#fff`,
    },
    {
      title: "LongPlan — Study Plan Validator",
      subtitle:
        "Algorithmic study plan validation system enforcing complex curriculum rules and graduation requirements",
      dateRange: "2023 - 2025",
      status: "Production",
      impact: "Senior Thesis • Validates 200+ curriculum rules",
      description:
        "Senior Thesis Project that validates subject prerequisites, credits, and graduation rules following student's enrolled courses and curriculum. Provides a user-friendly interface for students to view and plan their academic progression. Used by engineering faculty students for course planning.",
      highlights: [
        "Implemented graph algorithms for prerequisite chain validation",
        "Built custom rule engine for complex graduation requirements",
        "Created intuitive drag-and-drop interface for course planning",
      ],
      technologies: [
        "Go",
        "Fiber Framework",
        "TypeScript",
        "React",
        "PostgreSQL",
        "Graph Algorithms",
        "Rule Engine",
        "Hexagonal Architecture",
        "Docker",
      ],
      github: "https://github.com/Panthaweekan",
      demo: "#",
    },
    {
      title: "SD-Letter — Certificate Request System",
      subtitle:
        "Digital certificate request workflow system with multi-stage approval process and automated notifications",
      dateRange: "2023 - 2025",
      status: "Production",
      impact: "Processing 500+ certificate requests/semester",
      description:
        "Supports interaction between Admin and Student for Certificate Request workflows (Approved, Rejected, Resubmitted, Published). Uses Web Hooks to push notifications via SDQueue for real-time status updates, reducing administrative processing time by 40%.",
      highlights: [
        "Reduced administrative processing time by 40% with automation",
        "Built multi-stage approval workflow with state machine pattern",
        "Integrated WebHook notifications via SDQueue for real-time updates",
      ],
      technologies: [
        "Go",
        "Fiber Framework",
        "TypeScript",
        "React",
        "PostgreSQL",
        "WebHooks",
        "Docker",
        "Hexagonal Architecture",
      ],
      github: "https://github.com/Panthaweekan",
      demo: "#",
    },
  ];

  return (
    <section
      id="projects"
      className="py-20 relative overflow-hidden"
    >
      {/* Vibrant Background Layers */}
      <div className="absolute inset-0 bg-mesh-gradient-intense -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent -z-10" />
      <div className="absolute inset-0 bg-dots opacity-30 -z-10" />

      <div className="container mx-auto px-4">
        <m.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <FluentEmoji emoji="🚀" size={50} type="3d" />
            <h2 className="text-4xl md:text-5xl font-bold text-gradient">
              Key Projects & Portfolio
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A collection of production-grade applications built with modern
            technologies and best practices
          </p>
        </m.div>
        <div ref={projectsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
