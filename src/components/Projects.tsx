import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Github } from 'lucide-react';

export function Projects() {
  const projects = [
    {
      title: 'Inventory Asset Management System',
      subtitle: 'Enterprise-grade full-stack asset management solution with centralized tracking and workflow automation',
      dateRange: '2025',
      description: 'Developed and architected a full-stack Inventory Asset Management System (Ruby on Rails, React, TypeScript) featuring full CRUD operations, asset request/return workflows, and a centralized database serving as a single source of truth for company-wide asset tracking',
      technologies: ['Ruby on Rails', 'React', 'TypeScript', 'PostgreSQL', 'RESTful APIs'],
      github: 'https://github.com/Panthaweekan',
      demo: '#',
    },
    {
      title: 'Custom Hybrid API Gateway Solution',
      subtitle: 'Experimental API gateway combining CA Layer 7 and Kong best practices with database-driven architecture',
      dateRange: '2025',
      description: 'Led the experimental development of a custom API gateway solution that preserved existing CA Layer 7 logic while integrating Kong API Gateway best practices. Designed a hybrid architecture—implemented in Go using the Fiber (fasthttp) framework—that combined the strengths of both platforms through a database event-driven design',
      technologies: ['Go', 'Fiber Framework', 'PostgreSQL', 'CA Layer 7', 'Kong API Gateway', 'Microservices'],
      github: 'https://github.com/Panthaweekan',
      demo: '#',
    },
    {
      title: 'SD-Booking — Room Reservation System',
      subtitle: 'Enterprise room booking platform with role-based access control and real-time notification system',
      dateRange: '2023 - 2025',
      description: 'Designed and developed following Hexagonal Architecture principles using Go, TypeScript, React, Vite, Tailwind CSS, and PostgreSQL with production deployment on Docker. Supports status checks, bookings, and admin approvals with real-time updates. Integrated Web Hook-based PWA notifications via SDQueue to reduce user wait time',
      technologies: ['Go', 'Fiber Framework', 'TypeScript', 'React', 'Vite', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'Hexagonal Architecture', 'PWA', 'WebHooks'],
      github: 'https://github.com/Panthaweekan',
      demo: '#',
    },
    {
      title: 'LongPlan — Study Plan Validator',
      subtitle: 'Algorithmic study plan validation system enforcing complex curriculum rules and graduation requirements',
      dateRange: '2023 - 2025',
      description: 'Senior Thesis Project that validates subject prerequisites, credits, and graduation rules following student\'s enrolled courses and curriculum. Provides a user-friendly interface for students to view and plan their academic progression',
      technologies: ['Go', 'Fiber Framework', 'TypeScript', 'React', 'PostgreSQL', 'Graph Algorithms', 'Rule Engine', 'Hexagonal Architecture', 'Docker'],
      github: 'https://github.com/Panthaweekan',
      demo: '#',
    },
    {
      title: 'SD-Letter — Certificate Request System',
      subtitle: 'Digital certificate request workflow system with multi-stage approval process and automated notifications',
      dateRange: '2023 - 2025',
      description: 'Supports interaction between Admin and Student about Certificate Request (Approved, Rejected, Resubmitted, Published). Uses Web Hooks to push notifications via SDQueue for real-time status updates',
      technologies: ['Go', 'Fiber Framework', 'TypeScript', 'React', 'PostgreSQL', 'WebHooks', 'Docker', 'Hexagonal Architecture'],
      github: 'https://github.com/Panthaweekan',
      demo: '#',
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Key Projects & Portfolio
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A collection of production-grade applications built with modern technologies and best practices
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <Card key={index} className="flex flex-col hover:shadow-2xl hover:border-primary/50 transition-all duration-300 group">
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-xl md:text-2xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <span className="text-xs font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full whitespace-nowrap">
                    {project.dateRange}
                  </span>
                </div>
                <CardDescription className="text-sm font-medium text-foreground/80 italic">
                  {project.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <div className="pt-2">
                  <p className="text-xs font-semibold text-foreground/70 mb-2">Tech Stack:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2.5 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="gap-3 pt-6">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </a>
                </Button>
                {project.demo !== '#' && (
                  <Button size="sm" className="flex-1" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
