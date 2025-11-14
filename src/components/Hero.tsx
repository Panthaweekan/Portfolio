import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Github, Linkedin, Mail } from 'lucide-react';

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
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(156,131,255,0.1),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Panthaweekan Somngam
          </h1>
          <div className="text-2xl md:text-4xl font-semibold mb-8 h-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            <span className="text-foreground">{text}</span>
            <span className="animate-pulse">|</span>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            Passionate about building scalable web applications and solving complex problems
            with modern technologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <Button size="lg" onClick={scrollToContact}>
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
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
            <a
              href="https://github.com/Panthaweekan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/panthaweekan-somngam-a96b1b253/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:panthaweekan.som@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
