import { useEffect, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
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
import { use3DTilt } from "../hooks/use3DTilt";
import { projects } from "../data/portfolio-data";
import { VisualArchDiagram } from "./VisualArchDiagram";

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

  const [archOpen, setArchOpen] = useState(false);

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
          {"visualArch" in project && project.visualArch && (
            <div className="pt-4 border-t border-border">
              <button
                onClick={() => setArchOpen(v => !v)}
                className="flex items-center justify-between w-full text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                aria-expanded={archOpen}
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Architecture Overview
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${archOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {archOpen && (
                  <m.div
                    key="arch"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 p-3 rounded-lg bg-muted/30 backdrop-blur-sm">
                      <VisualArchDiagram layers={project.visualArch} />
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
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
            {/* <FluentEmoji emoji="🚀" size={50} type="3d" /> */}
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
