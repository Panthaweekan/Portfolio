import { m } from 'framer-motion';
import { AnimatedTimeline } from './AnimatedTimeline';
import { FloatingShapes3D } from './FloatingShapes3D';

export function Experience() {
  const experiences = [
    {
      title: 'Associate Software Engineer',
      company: 'SCB TechX',
      period: 'May 2025 - Present',
      location: 'Bangkok, Thailand (Hybrid)',
      technologies: 'Go • Fiber/FastHTTP • Kong API Gateway • PostgreSQL • Redis • Kubernetes • Ruby on Rails • React • TypeScript • Microservices',
      description: [
        'Designed and developed an API Gateway microservice in Go (Fiber/FastHTTP) to replace legacy CA Layer 7 gateway on-premise, preserving complex routing logic while integrating with Kong upstream, enabling zero-downtime deployment for SCB Easy (10M+ users)',
        'Architected the gateway with hexagonal architecture and DDD, decoupling routing, authentication, and logging into SOLID-aligned domains for independent testing and safer deployments',
        'Integrated AI agent tools as a core part of the engineering workflow, applying them across code generation, refactoring, architecture review, and documentation to accelerate delivery on complex features',
        'Designed and developed internal enterprise tools, including an Inventory Asset Management platform with asset requests, RBAC, financial reporting, and centralized asset data',
        'Maintained internal service tools such as Overtime Request and Employee Timesheet workflows, streamlining HR operations across the organization',
      ],
    },
    {
      title: 'Full Stack Developer (Work-Study Scholarship)',
      company: 'Chiang Mai University - Faculty of Engineering',
      period: '2023 - 2025',
      location: 'Chiang Mai, Thailand',
      technologies: 'Go • Fiber Framework • TypeScript • React • PostgreSQL • Docker • Hexagonal Architecture • TDD • PWA',
      description: [
        'Designed and deployed production web applications serving 500+ active users, from stakeholder requirements through Docker-based deployment',
        'Built RESTful backend APIs in Go (Fiber) with React/TypeScript frontend and PostgreSQL, consistently applying hexagonal architecture and TDD',
        'Developed SD-Booking (room reservation with real-time PWA notifications), SD-Letter (multi-stage certificate approval workflow), and LongPlan (algorithmic study-plan validator using graph algorithms)',
      ],
    },
  ];

  const floatingShapesConfig = [
    {
      type: 'sphere' as const,
      position: [-2.5, 0.5, -2] as [number, number, number],
      scale: 0.7,
      color: '#FF9051',
      wireframe: false,
    },
    {
      type: 'octahedron' as const,
      position: [2, -1.5, -2.5] as [number, number, number],
      scale: 0.9,
      color: '#2DBBEE',
      wireframe: true,
    },
    {
      type: 'box' as const,
      position: [0, 1.5, -3] as [number, number, number],
      scale: 0.5,
      color: '#9C83FF',
      wireframe: true,
    },
  ];

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Vibrant Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5 -z-10" />
      <div className="absolute inset-0 bg-grid opacity-40 -z-10" />
      <div className="absolute inset-0 bg-stripes -z-10" />

      {/* 3D Floating Shapes */}
      <FloatingShapes3D shapes={floatingShapesConfig} />

      <div className="container mx-auto px-4">
        <m.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Professional Experience
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Building scalable solutions and driving innovation across enterprise systems and academic platforms
          </p>
        </m.div>
        <div className="max-w-5xl mx-auto">
          <AnimatedTimeline items={experiences} />
        </div>
      </div>
    </section>
  );
}
