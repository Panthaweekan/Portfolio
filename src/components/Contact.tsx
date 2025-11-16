import { m } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Mail, MapPin, Phone, Github, Linkedin } from 'lucide-react';
import { FluentEmoji } from '@lobehub/ui';

export function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'panthaweekansomngam@gmail.com',
      href: 'mailto:panthaweekansomngam@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+66 946359510',
      href: 'tel:+66946359510',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Bangkok, Thailand',
      href: null,
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/Panthaweekan',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/panthaweekan/',
    },
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 -z-10" />

      <div className="container mx-auto px-4">
        <m.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <FluentEmoji emoji="👋" size={50} type="3d" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Get In Touch
            </h2>
          </div>
        </m.div>
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="shadow-2xl backdrop-blur-md bg-card/95 border-primary/10">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Let's Work Together</CardTitle>
              <CardDescription className="text-base">
                Feel free to reach out for collaborations or just a friendly hello
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex flex-col items-center text-center p-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{info.label}</h3>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{info.value}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="border-t pt-8">
                <h3 className="text-center font-semibold mb-4">Connect With Me</h3>
                <div className="flex justify-center gap-4">
                  {socialLinks.map((link, index) => (
                    <Button key={index} variant="outline" size="lg" asChild>
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        <link.icon className="mr-2 h-5 w-5" />
                        {link.label}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </m.div>
      </div>
    </section>
  );
}
