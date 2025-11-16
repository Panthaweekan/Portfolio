import { m } from 'framer-motion';
import { AnimatedTimeline } from './AnimatedTimeline';

export function Experience() {
  const experiences = [
    {
      title: 'Associate Software Engineer',
      company: 'SCB TechX',
      period: 'May 2025 - Present',
      location: 'Bangkok, Thailand (Hybrid)',
      technologies: 'API Gateway architecture • Kong API Gateway • Go • Fiber Framework • Ruby on Rails • React • TypeScript • Microservices',
      description: [
        'Designed, developed, and maintained enterprise API gateway infrastructure across hybrid environments, including CA Layer 7 API Gateway and Kong API Gateway for both on-premise and cloud-based systems',
        'Collaborated cross-functionally on cloud migration initiatives, ensuring seamless transition of API gateway logic and maintaining service continuity during the migration process',
        'Developed and architected a full-stack Inventory Asset Management System (Ruby on Rails, React, TypeScript) featuring full CRUD operations, asset request/return workflows, and a centralized database serving as a single source of truth for company-wide asset tracking',
        'Led the experimental development of a custom API gateway solution that preserved existing CA Layer 7 logic while integrating Kong API Gateway best practices. Designed a hybrid architecture—implemented in Go using the Fiber (fasthttp) framework—that combined the strengths of both platforms through a database event-driven design',
      ],
    },
    {
      title: 'Full Stack Developer (Work-Study Scholarship)',
      company: 'Chiang Mai University - Faculty of Engineering',
      period: '2023 - 2025',
      location: 'Chiang Mai, Thailand',
      technologies: 'Go • Fiber Framework • TypeScript • React • Vite • Tailwind CSS • PostgreSQL • Docker • Hexagonal Architecture • Event-Driven Design',
      description: [
        'Designed and developed multiple production-grade internal web applications for faculty administration and student services, serving over 2,000 active users across the engineering faculty',
        'Conducted regular meetings with faculty stakeholders, administrators, and end-users to gather requirements, provide technical consultation, and deliver solutions aligned with business needs',
        'Built full-stack applications using Go with Fiber framework for backend RESTful APIs, React with TypeScript for frontend, PostgreSQL for database, and Docker for containerization and deployment',
        'Consistently applied Hexagonal Architecture principles and SOLID design patterns to ensure all applications were maintainable, testable, and scalable for future enhancements',
        'Successfully deployed and maintained multiple applications in production environments, handling incident response and implementing continuous improvements based on user feedback',
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Vibrant Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5 -z-10" />
      <div className="absolute inset-0 bg-grid opacity-40 -z-10" />
      <div className="absolute inset-0 bg-stripes -z-10" />

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
