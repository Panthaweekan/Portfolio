import { m } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { H2, Body } from './ui/typography';
import { Code2, Database, Server, GraduationCap, Users, Lightbulb } from 'lucide-react';
import { FloatingShapes3D } from './FloatingShapes3D';

export function About() {
  // Vibrant color scheme with purple, cyan, and orange accents
  const programmingSkills = [
    { label: 'Go (Primary)', color: 'bg-primary text-primary-foreground border-2 border-primary/20 shadow-lg hover:shadow-primary/30' },
    { label: 'TypeScript (Primary)', color: 'bg-primary text-primary-foreground border-2 border-primary/20 shadow-lg hover:shadow-primary/30' },
    { label: 'Ruby', color: 'bg-secondary/90 text-secondary-foreground border-2 border-secondary/20 shadow-lg hover:shadow-secondary/30' },
    { label: 'Python', color: 'bg-accent/90 text-accent-foreground border-2 border-accent/20 shadow-lg hover:shadow-accent/30' },
    { label: 'Java', color: 'bg-primary/80 text-primary-foreground border-2 border-primary/20 shadow-md' },
    { label: 'C++', color: 'bg-secondary/80 text-secondary-foreground border-2 border-secondary/20 shadow-md' },
    { label: 'Haskell', color: 'bg-accent/80 text-accent-foreground border-2 border-accent/20 shadow-md' },
    { label: 'OCaml', color: 'bg-primary/70 text-primary-foreground border-2 border-primary/20 shadow-md' },
    { label: 'Rust (Learning)', color: 'bg-gradient-to-r from-secondary to-primary text-white border-2 border-primary/20 shadow-md' },
  ];

  const webDevSkills = [
    { label: 'React', color: 'bg-accent text-accent-foreground border-2 border-accent/20 shadow-lg hover:shadow-accent/30' },
    { label: 'Ruby on Rails', color: 'bg-secondary text-secondary-foreground border-2 border-secondary/20 shadow-lg hover:shadow-secondary/30' },
    { label: 'Go Fiber', color: 'bg-primary text-primary-foreground border-2 border-primary/20 shadow-lg hover:shadow-primary/30' },
    { label: 'Node.js', color: 'bg-accent/85 text-accent-foreground border-2 border-accent/20 shadow-md' },
    { label: 'Express.js', color: 'bg-primary/85 text-primary-foreground border-2 border-primary/20 shadow-md' },
    { label: 'Tailwind CSS', color: 'bg-accent/75 text-accent-foreground border-2 border-accent/20 shadow-md' },
    { label: 'Vite', color: 'bg-gradient-to-r from-primary to-accent text-white border-2 border-primary/20 shadow-md' },
  ];

  const databaseSkills = [
    { label: 'PostgreSQL', color: 'bg-accent text-accent-foreground border-2 border-accent/20 shadow-lg hover:shadow-accent/30' },
    { label: 'MySQL', color: 'bg-secondary text-secondary-foreground border-2 border-secondary/20 shadow-lg hover:shadow-secondary/30' },
  ];

  const devopsSkills = [
    { label: 'Docker', color: 'bg-accent text-accent-foreground border-2 border-accent/20 shadow-lg hover:shadow-accent/30' },
    { label: 'Basic CI/CD (Github action)', color: 'bg-primary text-primary-foreground border-2 border-primary/20 shadow-lg hover:shadow-primary/30' },
  ];

  const softSkills = [
    { label: 'Effective Communication', color: 'bg-gradient-to-r from-primary/80 to-accent/80 text-white border border-primary/30 shadow-md' },
    { label: 'Active Listening', color: 'bg-gradient-to-r from-accent/80 to-secondary/80 text-white border border-accent/30 shadow-md' },
    { label: 'Respect & Support', color: 'bg-gradient-to-r from-secondary/80 to-primary/80 text-white border border-secondary/30 shadow-md' },
    { label: 'Teamwork', color: 'bg-gradient-to-r from-primary/80 to-secondary/80 text-white border border-primary/30 shadow-md' },
    { label: 'Adaptive', color: 'bg-gradient-to-r from-accent/80 to-primary/80 text-white border border-accent/30 shadow-md' },
    { label: 'Problem-Solving', color: 'bg-gradient-to-r from-secondary/80 to-accent/80 text-white border border-secondary/30 shadow-md' },
    { label: 'Abstract Thinking', color: 'bg-gradient-to-r from-primary/80 to-accent/80 text-white border border-primary/30 shadow-md' },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Vibrant Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 -z-10" />
      <div className="absolute inset-0 bg-stripes -z-10" />
      <div className="absolute inset-0 bg-grid opacity-40 -z-10" />

      {/* 3D Floating Shapes */}
      <FloatingShapes3D />

      <div className="container mx-auto px-4">
        <m.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <H2 className="text-center mb-12">
            About Me
          </H2>
        </m.div>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <Body className="text-lg mb-4" variant="muted">
            Associate Software Engineer with expertise in enterprise API gateway infrastructure, cloud migration, and full-stack web development. Currently contributing to SCB TechX's digital transformation initiatives, specializing in hybrid cloud architecture and API gateway solutions using CA Layer 7 and Kong API Gateway. Experienced in building scalable web applications with modern technologies including Go, TypeScript, Ruby on Rails, and React.
          </Body>
          <Body className="text-lg" variant="muted">
            Passionate about clean code architecture and sustainable software design, with extensive experience implementing Hexagonal Architecture, Domain-Driven Design, and SOLID principles across production systems. Strong advocate for microservices patterns, with hands-on experience building production-grade systems that serve real users.
          </Body>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mb-12"
        >
          <Card className="glass-card hover:shadow-2xl hover:border-primary/50 hover:glow-primary transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Education</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-1">
                Chiang Mai University | B.Eng. Computer Engineering (GPA: 3.32)
              </p>
              <p className="font-bold text-gradient">Second-Class Honour</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover:shadow-2xl hover:border-secondary/50 hover:glow-secondary transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center shadow-lg">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Interests</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Full-Stack Development, Cloud Architecture, DevSecOps
              </p>
            </CardContent>
          </Card>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Code2 className="h-6 w-6 text-primary" />
              Programming Skills
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3 text-muted-foreground">Core Development</h4>
                <div className="flex flex-wrap gap-3">
                  {programmingSkills.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium hover:scale-105 transition-transform ${skill.color}`}
                    >
                      {skill.label}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-muted-foreground">Web Development</h4>
                <div className="flex flex-wrap gap-3">
                  {webDevSkills.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium hover:scale-105 transition-transform ${skill.color}`}
                    >
                      {skill.label}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-muted-foreground">Databases</h4>
                <div className="flex flex-wrap gap-3">
                  {databaseSkills.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium hover:scale-105 transition-transform ${skill.color}`}
                    >
                      {skill.label}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-muted-foreground">DevOps</h4>
                <div className="flex flex-wrap gap-3">
                  {devopsSkills.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium hover:scale-105 transition-transform ${skill.color}`}
                    >
                      {skill.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Soft Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {softSkills.map((skill, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm font-medium hover:scale-105 transition-transform ${skill.color}`}
                >
                  {skill.label}
                </span>
              ))}
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
