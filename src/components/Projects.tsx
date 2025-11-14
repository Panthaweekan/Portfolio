import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Github } from 'lucide-react';

export function Projects() {
  const projects = [
    {
      title: 'SD-Booking',
      description:
        'Room Reservation System with role-based access control. Supports status checks, bookings, and admin approvals with real-time updates. Integrated Web Hook-based PWA notifications via SDQueue to reduce user wait time.',
      technologies: ['Go', 'Fiber', 'TypeScript', 'React', 'Vite', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'PWA'],
      github: 'https://github.com/Panthaweekan',
      demo: '#',
      image: '/imgs/sdbook_pj.svg',
    },
    {
      title: 'LongPlan',
      description:
        'Study Plan Validator for curriculum compliance. Validates subject prerequisites, credits, and graduation rules following student\'s enrolled courses and curriculum. Provides a user-friendly interface for students to view their study plan.',
      technologies: ['Go', 'Fiber', 'TypeScript', 'React', 'PostgreSQL', 'Hexagonal Architecture', 'Docker'],
      github: 'https://github.com/Panthaweekan',
      demo: '#',
      image: '/imgs/lp_pj.svg',
    },
    {
      title: 'SD-Letter',
      description:
        'Certificate Request System with admin workflows. Supports interaction between Admin and Student about Certificate Request (Approved, Rejected, Resubmitted, Published). Uses Web Hooks to push notifications via SDQueue.',
      technologies: ['Go', 'Fiber', 'TypeScript', 'React', 'PostgreSQL', 'WebHooks', 'Docker'],
      github: 'https://github.com/Panthaweekan',
      demo: '#',
      image: '/imgs/letter_pj.svg',
    },
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card key={index} className="flex flex-col hover:shadow-xl transition-shadow overflow-hidden group">
              {project.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-sm">Click to learn more</span>
                  </div>
                </div>
              )}
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </a>
                </Button>
                <Button size="sm" asChild>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
