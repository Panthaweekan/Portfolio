import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { Moon, Sun, Menu, X, FileText } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Portfolio
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <m.button
              onClick={() => scrollToSection('hero')}
              whileHover={{ scale: 1.05, color: 'hsl(var(--primary))' }}
              whileTap={{ scale: 0.95 }}
              className="text-foreground transition-colors relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </m.button>
            <m.button
              onClick={() => scrollToSection('about')}
              whileHover={{ scale: 1.05, color: 'hsl(var(--primary))' }}
              whileTap={{ scale: 0.95 }}
              className="text-foreground transition-colors relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </m.button>
            <m.button
              onClick={() => scrollToSection('projects')}
              whileHover={{ scale: 1.05, color: 'hsl(var(--primary))' }}
              whileTap={{ scale: 0.95 }}
              className="text-foreground transition-colors relative group"
            >
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </m.button>
            <m.button
              onClick={() => scrollToSection('experience')}
              whileHover={{ scale: 1.05, color: 'hsl(var(--primary))' }}
              whileTap={{ scale: 0.95 }}
              className="text-foreground transition-colors relative group"
            >
              Experience
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </m.button>
            <m.button
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05, color: 'hsl(var(--primary))' }}
              whileTap={{ scale: 0.95 }}
              className="text-foreground transition-colors relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </m.button>
            <Button variant="default" size="sm" asChild>
              <Link to="/resume">
                <FileText className="mr-2 h-4 w-4" />
                Resume
              </Link>
            </Button>
            <m.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </m.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-foreground hover:text-primary transition-colors text-left"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-colors text-left"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-foreground hover:text-primary transition-colors text-left"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="text-foreground hover:text-primary transition-colors text-left"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-colors text-left"
            >
              Contact
            </button>
            <Button variant="default" className="w-full justify-start" asChild>
              <Link to="/resume">
                <FileText className="mr-2 h-4 w-4" />
                View Resume
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
