import { useEffect, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { Button } from './ui/button';
import { H1, Body } from './ui/typography';
import { Particles } from './Particles';
import { ThreeBackground } from './ThreeBackground';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';

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
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated Background - Monochromatic */}
      <div className="absolute inset-0 -z-10">
        <Suspense fallback={<Particles />}>
          <ThreeBackground />
        </Suspense>
        <Particles />
        <div className="absolute inset-0 bg-gradient-to-br from-mono-100 via-background to-mono-200" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <H1 className="mb-6 font-black animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Panthaweekan Somngam
          </H1>
          <div className="text-2xl md:text-4xl font-heading font-semibold mb-8 h-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            <span className="text-mono-900 dark:text-mono-100">{text}</span>
            <span className="animate-pulse text-mono-700 dark:text-mono-300">|</span>
          </div>
          <Body className="text-lg md:text-xl mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300" variant="muted">
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
              className="text-mono-600 hover:text-mono-1100 dark:text-mono-400 dark:hover:text-mono-50 transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="h-6 w-6" />
            </m.a>
            <m.a
              href="https://www.linkedin.com/in/panthaweekan/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mono-600 hover:text-mono-1100 dark:text-mono-400 dark:hover:text-mono-50 transition-colors"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin className="h-6 w-6" />
            </m.a>
            <m.a
              href="mailto:panthaweekansomngam@gmail.com"
              className="text-mono-600 hover:text-mono-1100 dark:text-mono-400 dark:hover:text-mono-50 transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail className="h-6 w-6" />
            </m.a>
          </div>
        </div>
      </div>
    </section>
  );
}
