import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Code2, Database, Server, Smartphone } from 'lucide-react';

export function About() {
  const skills = [
    {
      icon: Code2,
      title: 'Frontend Development',
      description: 'React, TypeScript, Next.js, TailwindCSS',
    },
    {
      icon: Server,
      title: 'Backend Development',
      description: 'Go, Node.js, Express, RESTful APIs',
    },
    {
      icon: Database,
      title: 'Database',
      description: 'PostgreSQL, MongoDB, Redis',
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'React Native, Flutter',
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          About Me
        </h2>
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-lg text-muted-foreground text-center leading-relaxed">
            I'm a passionate Full-Stack Developer with expertise in building modern web
            applications. I love working with cutting-edge technologies and constantly
            learning new skills to deliver high-quality solutions. My goal is to create
            efficient, scalable, and user-friendly applications that make a difference.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <skill.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{skill.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{skill.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
