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
      title: "Custom Hybrid API Gateway Solution",
      subtitle:
        "API Gateway microservice bridging on-premise CA Layer 7 with cloud-native Kong for zero-downtime deployment",
      dateRange: "2025 - Present",
      status: "Production",
      impact: "Enabling zero-downtime deployment for SCB Easy (10M+ users)",
      description:
        "Designed and developed an API Gateway microservice in Go (Fiber/FastHTTP) to replace legacy CA Layer 7 gateway on-premise, preserving complex routing logic while integrating with Kong upstream. Architected with hexagonal architecture and DDD for independent testing and safer deployments.",
      highlights: [
        "Bridged on-premise CA Layer 7 logic with cloud-native Kong",
        "Enabled incremental deployment with zero downtime",
        "Architected with hexagonal architecture and DDD, decoupling routing, authentication, and logging into SOLID-aligned domains",
      ],
      technologies: [
        "Go",
        "Fiber/FastHTTP",
        "PostgreSQL",
        "Redis",
        "Kong",
        "Kubernetes",
        "Microservice",
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
      title: "Inventory Asset Management System",
      subtitle:
        "Enterprise asset-tracking platform with request/return workflows and role-based access control",
      dateRange: "2025",
      status: "Production",
      impact: "Streamlined asset tracking for enterprise workforce",
      description:
        "Designed and developed an internal enterprise Inventory Asset Management platform with asset requests, RBAC, financial reporting, and centralized asset data. Built with Ruby on Rails backend and React frontend with PostgreSQL.",
      highlights: [
        "Built complete asset lifecycle management with request/return workflows",
        "Implemented role-based access control for admins and employees",
        "Integrated financial reporting and centralized asset data",
      ],
      technologies: [
        "Ruby on Rails",
        "React",
        "PostgreSQL",
        "REST APIs",
        "Docker",
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
      title: "SD-Booking — Room Reservation System",
      subtitle:
        "Real-time room booking platform with role-based access, admin dashboard, and push notifications via webhooks",
      dateRange: "2023 - 2024",
      status: "Production",
      impact: "Serving 500+ active users",
      description:
        "Real-time room booking platform with role-based access, admin dashboard, and push notifications via webhooks. Built with Go and React/TypeScript frontend with PWA support for real-time notifications.",
      highlights: [
        "Implemented real-time PWA push notifications via webhooks",
        "Built complete booking lifecycle with admin approval workflows",
        "Applied Hexagonal Architecture for clean separation of concerns",
      ],
      technologies: [
        "Go",
        "React",
        "TypeScript",
        "PWA",
        "Webhooks",
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
