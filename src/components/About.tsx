import { m } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Code2, Database, Server, GraduationCap, Users, Lightbulb } from 'lucide-react';

export function About() {
  const programmingSkills = [
    { label: 'Go (Primary)', color: 'bg-primary/10 text-primary' },
    { label: 'TypeScript (Primary)', color: 'bg-primary/10 text-primary' },
    { label: 'Ruby', color: 'bg-primary/10 text-primary' },
    { label: 'Python', color: 'bg-primary/10 text-primary' },
    { label: 'Java', color: 'bg-primary/10 text-primary' },
    { label: 'C++', color: 'bg-primary/10 text-primary' },
    { label: 'Haskell', color: 'bg-primary/10 text-primary' },
    { label: 'OCaml', color: 'bg-primary/10 text-primary' },
    { label: 'Rust (Learning)', color: 'bg-primary/10 text-primary' },
  ];

  const webDevSkills = [
    { label: 'React', color: 'bg-secondary/10 text-secondary' },
    { label: 'Ruby on Rails', color: 'bg-secondary/10 text-secondary' },
    { label: 'Go Fiber', color: 'bg-secondary/10 text-secondary' },
    { label: 'Node.js', color: 'bg-secondary/10 text-secondary' },
    { label: 'Express.js', color: 'bg-secondary/10 text-secondary' },
    { label: 'Tailwind CSS', color: 'bg-secondary/10 text-secondary' },
    { label: 'Vite', color: 'bg-secondary/10 text-secondary' },
  ];

  const databaseSkills = [
    { label: 'PostgreSQL', color: 'bg-purple-500/10 text-purple-500' },
    { label: 'MySQL', color: 'bg-purple-500/10 text-purple-500' },
  ];

  const devopsSkills = [
    { label: 'Docker', color: 'bg-emerald-500/10 text-emerald-500' },
    { label: 'Basic CI/CD (Github action)', color: 'bg-emerald-500/10 text-emerald-500' },
  ];

  const softSkills = [
    { label: 'Effective Communication', color: 'bg-yellow-500/10 text-yellow-500' },
    { label: 'Active Listening', color: 'bg-yellow-500/10 text-yellow-500' },
    { label: 'Respect & Support', color: 'bg-yellow-500/10 text-yellow-500' },
    { label: 'Teamwork', color: 'bg-yellow-500/10 text-yellow-500' },
    { label: 'Adaptive', color: 'bg-yellow-500/10 text-yellow-500' },
    { label: 'Problem-Solving', color: 'bg-yellow-500/10 text-yellow-500' },
    { label: 'Abstract Thinking', color: 'bg-yellow-500/10 text-yellow-500' },
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <m.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          About Me
        </m.h2>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Associate Software Engineer with expertise in enterprise API gateway infrastructure, cloud migration, and full-stack web development. Currently contributing to SCB TechX's digital transformation initiatives, specializing in hybrid cloud architecture and API gateway solutions using CA Layer 7 and Kong API Gateway. Experienced in building scalable web applications with modern technologies including Go, TypeScript, Ruby on Rails, and React.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Passionate about clean code architecture and sustainable software design, with extensive experience implementing Hexagonal Architecture, Domain-Driven Design, and SOLID principles across production systems. Strong advocate for microservices patterns, with hands-on experience building production-grade systems that serve real users.
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mb-12"
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Education</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-1">
                Chiang Mai University | B.Eng. Computer Engineering (GPA: 3.32)
              </p>
              <p className="font-bold text-primary">Second-Class Honour</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Lightbulb className="h-5 w-5 text-primary" />
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
