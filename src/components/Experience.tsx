import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Briefcase } from 'lucide-react';

export function Experience() {
  const experiences = [
    {
      title: 'Fullstack Developer',
      company: 'CMU Engineering (Work-study scholarship)',
      period: '2023 - Present',
      description: [
        'Work-study scholarship at Chiang Mai University',
        'Developed and maintained internal web applications',
        'Collaborated with stakeholders to gather requirements and provide technical solutions for internal systems',
        'Gained hands-on experience in full-stack development, including front-end and back-end technologies and database management',
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Experience
        </h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {experiences.map((experience, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <CardTitle className="text-xl">{experience.title}</CardTitle>
                      <span className="text-sm text-muted-foreground">{experience.period}</span>
                    </div>
                    <CardDescription className="text-base mt-1">
                      {experience.company}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 ml-16">
                  {experience.description.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-muted-foreground flex items-start">
                      <span className="mr-2 text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
