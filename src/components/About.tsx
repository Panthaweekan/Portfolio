import { m } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { H2, Body } from './ui/typography';
import { Code2, Database, Server, GraduationCap, Users, Lightbulb } from 'lucide-react';
import { AnimatedSkillBar } from './AnimatedSkillBar';
import { FluentEmoji } from '@lobehub/ui';

export function About() {
  // Monochromatic color scheme with varying grey tones for visual hierarchy
  const programmingSkills = [
    { label: 'Go (Primary)', color: 'bg-mono-900 text-white dark:bg-mono-100 dark:text-mono-1000' },
    { label: 'TypeScript (Primary)', color: 'bg-mono-900 text-white dark:bg-mono-100 dark:text-mono-1000' },
    { label: 'Ruby', color: 'bg-mono-800 text-white dark:bg-mono-200 dark:text-mono-900' },
    { label: 'Python', color: 'bg-mono-800 text-white dark:bg-mono-200 dark:text-mono-900' },
    { label: 'Java', color: 'bg-mono-700 text-white dark:bg-mono-300 dark:text-mono-900' },
    { label: 'C++', color: 'bg-mono-700 text-white dark:bg-mono-300 dark:text-mono-900' },
    { label: 'Haskell', color: 'bg-mono-600 text-white dark:bg-mono-400 dark:text-mono-900' },
    { label: 'OCaml', color: 'bg-mono-600 text-white dark:bg-mono-400 dark:text-mono-900' },
    { label: 'Rust (Learning)', color: 'bg-mono-500 text-white dark:bg-mono-500 dark:text-white' },
  ];

  const webDevSkills = [
    { label: 'React', color: 'bg-mono-900 text-white dark:bg-mono-100 dark:text-mono-1000' },
    { label: 'Ruby on Rails', color: 'bg-mono-800 text-white dark:bg-mono-200 dark:text-mono-900' },
    { label: 'Go Fiber', color: 'bg-mono-800 text-white dark:bg-mono-200 dark:text-mono-900' },
    { label: 'Node.js', color: 'bg-mono-700 text-white dark:bg-mono-300 dark:text-mono-900' },
    { label: 'Express.js', color: 'bg-mono-700 text-white dark:bg-mono-300 dark:text-mono-900' },
    { label: 'Tailwind CSS', color: 'bg-mono-600 text-white dark:bg-mono-400 dark:text-mono-900' },
    { label: 'Vite', color: 'bg-mono-600 text-white dark:bg-mono-400 dark:text-mono-900' },
  ];

  const databaseSkills = [
    { label: 'PostgreSQL', color: 'bg-mono-800 text-white dark:bg-mono-200 dark:text-mono-900' },
    { label: 'MySQL', color: 'bg-mono-700 text-white dark:bg-mono-300 dark:text-mono-900' },
  ];

  const devopsSkills = [
    { label: 'Docker', color: 'bg-mono-800 text-white dark:bg-mono-200 dark:text-mono-900' },
    { label: 'Basic CI/CD (Github action)', color: 'bg-mono-700 text-white dark:bg-mono-300 dark:text-mono-900' },
  ];

  const softSkills = [
    { label: 'Effective Communication', color: 'bg-mono-600 text-white dark:bg-mono-400 dark:text-mono-900' },
    { label: 'Active Listening', color: 'bg-mono-600 text-white dark:bg-mono-400 dark:text-mono-900' },
    { label: 'Respect & Support', color: 'bg-mono-600 text-white dark:bg-mono-400 dark:text-mono-900' },
    { label: 'Teamwork', color: 'bg-mono-600 text-white dark:bg-mono-400 dark:text-mono-900' },
    { label: 'Adaptive', color: 'bg-mono-600 text-white dark:bg-mono-400 dark:text-mono-900' },
    { label: 'Problem-Solving', color: 'bg-mono-600 text-white dark:bg-mono-400 dark:text-mono-900' },
    { label: 'Abstract Thinking', color: 'bg-mono-600 text-white dark:bg-mono-400 dark:text-mono-900' },
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
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
          <Card className="hover:shadow-2xl hover:border-primary/50 transition-all duration-300 backdrop-blur-sm bg-card/95">
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

          <Card className="hover:shadow-2xl hover:border-primary/50 transition-all duration-300 backdrop-blur-sm bg-card/95">
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

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-4xl mx-auto mt-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <FluentEmoji emoji="📊" size={40} type="3d" />
            <h3 className="text-2xl font-bold">Skill Proficiency</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <AnimatedSkillBar skill="Go / Golang" percentage={90} color="bg-primary" delay={0} />
              <AnimatedSkillBar skill="TypeScript" percentage={90} color="bg-primary" delay={0.1} />
              <AnimatedSkillBar skill="React" percentage={85} color="bg-secondary" delay={0.2} />
              <AnimatedSkillBar skill="Ruby on Rails" percentage={80} color="bg-secondary" delay={0.3} />
            </div>
            <div className="space-y-4">
              <AnimatedSkillBar skill="PostgreSQL" percentage={85} color="bg-purple-500" delay={0.4} />
              <AnimatedSkillBar skill="Docker" percentage={80} color="bg-emerald-500" delay={0.5} />
              <AnimatedSkillBar skill="API Gateway Design" percentage={85} color="bg-primary" delay={0.6} />
              <AnimatedSkillBar skill="Hexagonal Architecture" percentage={85} color="bg-secondary" delay={0.7} />
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
