import { useEffect, useState, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { Button } from './ui/button';
import { H1, Body } from './ui/typography';
import { Particles } from './Particles';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';

// Lazy load ThreeBackground (Three.js) to reduce initial bundle size
const ThreeBackground = lazy(() => import('./ThreeBackground').then(m => ({ default: m.ThreeBackground })));


export function Hero() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = ['Full-Stack Developer', 'Go Developer', 'Software Engineer'];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-mesh-gradient"
    >
      {/* Animated Background Layers */}
      <div className="absolute inset-0" style={{ zIndex: -10 }}>
        {/* 3D Background Layer - Behind everything */}
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          <Suspense fallback={null}>
            <ThreeBackground />
          </Suspense>
        </div>

        {/* Particles Layer */}
        <div className="absolute inset-0" style={{ zIndex: 2 }}>
          <Particles />
        </div>

        {/* Vibrant Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-animated" style={{ zIndex: 3 }} />

        {/* Spotlight Effect */}
        <div className="absolute inset-0 bg-spotlight" style={{ zIndex: 4 }} />

        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 bg-dots opacity-50" style={{ zIndex: 5 }} />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <H1 className="mb-2 font-black animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Panthaweekan Somngam
          </H1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
            Building scalable systems with clean architecture and attention to detail
          </p>
          <div className="text-2xl md:text-4xl font-heading font-semibold mb-6 h-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            <span className="text-gradient">{text}</span>
            <span className="animate-pulse text-primary">|</span>
          </div>
          
          {/* Achievement Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-250">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium">
              <span>🎓</span> Second-Class Honours
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm font-medium">
              <span>🚀</span> 5+ Production Systems
            </span>
          </div>
          
          {/* Availability Indicator */}
          <div className="flex justify-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-275">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-sm font-medium text-green-600 dark:text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Open to new opportunities
            </span>
          </div>
          
          <Body className="text-lg md:text-xl mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300" variant="muted">
            Passionate about building scalable web applications and solving complex problems
            with modern technologies.
          </Body>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <Button size="lg" onClick={scrollToContact}>
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/resume">
                <FileText className="mr-2 h-5 w-5" />
                View Resume
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://github.com/Panthaweekan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </a>
            </Button>
          </div>
          <div className="flex gap-6 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
            <m.a
              href="https://github.com/Panthaweekan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all hover:glow-primary"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="h-7 w-7" />
            </m.a>
            <m.a
              href="https://www.linkedin.com/in/panthaweekan/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-all hover:glow-primary"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin className="h-7 w-7" />
            </m.a>
            <m.a
              href="mailto:panthaweekansomngam@gmail.com"
              className="text-muted-foreground hover:text-secondary transition-all hover:glow-secondary"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail className="h-7 w-7" />
            </m.a>
          </div>
        </div>
      </div>
    </section>
  );
}
