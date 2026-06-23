import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ChevronLeft, ChevronRight,
  Sun, Moon, Maximize2, Minimize2,
  Mail, Github, Linkedin, Copy, Check,
} from 'lucide-react';
import {
  personalInfo, experiences, projects, education, technicalSkills,
} from '@/data/portfolio-data';

// ── Motion variants ───────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

const stagger = {
  container: {
    hidden: {},
    show: { transition: { delayChildren: 0.1, staggerChildren: 0.08 } },
  },
  item: {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
  },
};

// ── Micro-components ──────────────────────────────────────────────────────────

function Label({ text }: { text: string }) {
  return (
    <span className="font-mono text-xs text-muted-foreground select-none">$ {text}</span>
  );
}

function Tag({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono border ${
      accent
        ? 'bg-primary/10 text-primary border-primary/30'
        : 'bg-card text-muted-foreground border-border'
    }`}>
      {children}
    </span>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <div className="flex gap-3 items-start">
      <span className="text-primary font-mono text-sm mt-0.5 select-none shrink-0">▸</span>
      <p className="text-muted-foreground leading-relaxed text-sm">{text}</p>
    </div>
  );
}

// ── Slides ────────────────────────────────────────────────────────────────────

function S1() {
  return (
    <m.div className="flex flex-col gap-6" variants={stagger.container} initial="hidden" animate="show">
      <m.div variants={stagger.item}><Label text="whoami" /></m.div>
      <m.h1
        variants={stagger.item}
        className="font-heading text-5xl lg:text-7xl font-bold text-foreground tracking-tight leading-none"
      >
        {personalInfo.name}
      </m.h1>
      <m.p variants={stagger.item} className="font-heading text-xl lg:text-2xl text-primary font-semibold">
        {personalInfo.title}
      </m.p>
      <m.p variants={stagger.item} className="text-muted-foreground text-base lg:text-lg max-w-2xl leading-relaxed">
        {personalInfo.bio}
      </m.p>
      <m.div variants={stagger.item} className="flex flex-wrap gap-2">
        <Tag>{personalInfo.location}</Tag>
        <Tag>{personalInfo.availability}</Tag>
        {personalInfo.spokenLanguages.map(l => <Tag key={l}>{l}</Tag>)}
      </m.div>
    </m.div>
  );
}

function S2() {
  const exp = experiences[0];
  return (
    <m.div className="flex flex-col gap-5" variants={stagger.container} initial="hidden" animate="show">
      <m.div variants={stagger.item}><Label text="current_role" /></m.div>
      <m.div variants={stagger.item}>
        <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground">{exp.title}</h2>
        <div className="flex flex-wrap items-center gap-3 mt-1">
          <span className="text-primary font-semibold text-lg">{exp.company}</span>
          <span className="text-muted-foreground text-sm">{exp.period}</span>
        </div>
      </m.div>
      <m.div variants={stagger.item} className="flex flex-col gap-2.5">
        {exp.highlights.slice(0, 3).map((h, i) => <Bullet key={i} text={h.text} />)}
      </m.div>
      <m.div variants={stagger.item} className="flex flex-wrap gap-2">
        {exp.technologies.map(t => <Tag key={t} accent>{t}</Tag>)}
      </m.div>
    </m.div>
  );
}

function S3() {
  const exp = experiences[1];
  return (
    <m.div className="flex flex-col gap-5" variants={stagger.container} initial="hidden" animate="show">
      <m.div variants={stagger.item}><Label text="origin" /></m.div>
      <m.div variants={stagger.item}>
        <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground">{education.school}</h2>
        <p className="text-primary font-semibold text-lg mt-1">{education.degree}</p>
        <p className="text-muted-foreground text-sm">
          {education.graduated} · {education.honours} · GPA {education.gpa}
        </p>
      </m.div>
      <m.div variants={stagger.item} className="bg-card border border-border rounded-xl p-4">
        <p className="font-mono text-xs text-muted-foreground mb-1.5">thesis</p>
        <p className="text-foreground leading-relaxed text-sm">{education.thesis}</p>
      </m.div>
      <m.div variants={stagger.item}>
        <p className="text-foreground font-semibold">{exp.company} · {exp.period}</p>
        <div className="mt-2 flex flex-col gap-2">
          {exp.highlights.slice(0, 2).map((h, i) => <Bullet key={i} text={h.text} />)}
        </div>
      </m.div>
    </m.div>
  );
}

function S4() {
  const proj = projects[0];
  return (
    <m.div className="flex flex-col gap-5" variants={stagger.container} initial="hidden" animate="show">
      <m.div variants={stagger.item}><Label text="the_build" /></m.div>
      <m.div variants={stagger.item}>
        <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground">{proj.title}</h2>
        <p className="text-primary font-semibold mt-1">{proj.subtitle} · {proj.dateRange}</p>
      </m.div>
      <m.div variants={stagger.item} className="flex flex-col gap-2.5">
        {(proj.highlights ?? []).map((h, i) => <Bullet key={i} text={h} />)}
      </m.div>
      <m.div variants={stagger.item} className="flex flex-wrap gap-2">
        {proj.technologies.map(t => <Tag key={t} accent>{t}</Tag>)}
      </m.div>
    </m.div>
  );
}

function S5() {
  return (
    <m.div className="flex flex-col gap-5" variants={stagger.container} initial="hidden" animate="show">
      <m.div variants={stagger.item}><Label text="stack" /></m.div>
      <m.h2 variants={stagger.item} className="font-heading text-2xl lg:text-3xl font-bold text-foreground">
        Technical Skills
      </m.h2>
      <m.div variants={stagger.item} className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {technicalSkills.map(cat => (
          <div key={cat.name} className="bg-card border border-border rounded-xl p-3">
            <p className="font-mono text-xs text-muted-foreground mb-2">{cat.name}</p>
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {cat.items.map(item => (
                <span
                  key={item.label}
                  className={`text-xs font-mono ${item.highlight ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </m.div>
    </m.div>
  );
}

function S6() {
  const builds = [projects[1], projects[3], projects[4]];
  return (
    <m.div className="flex flex-col gap-5" variants={stagger.container} initial="hidden" animate="show">
      <m.div variants={stagger.item}><Label text="selected_builds" /></m.div>
      <m.h2 variants={stagger.item} className="font-heading text-2xl lg:text-3xl font-bold text-foreground">
        Other Work
      </m.h2>
      <m.div variants={stagger.item} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {builds.map(proj => (
          <div key={proj.title} className="bg-card border border-border rounded-xl p-4 flex flex-col gap-2">
            <p className="font-heading font-semibold text-foreground text-sm leading-tight">{proj.title}</p>
            <p className="text-muted-foreground text-xs">{proj.subtitle} · {proj.dateRange}</p>
            <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">{proj.description}</p>
            <div className="flex flex-wrap gap-1 mt-auto pt-1">
              {proj.technologies.slice(0, 3).map(t => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>
        ))}
      </m.div>
    </m.div>
  );
}

const PRINCIPLES = [
  {
    title: 'Architecture first',
    desc: 'Design the system boundary, interfaces, and invariants before writing a line of implementation.',
  },
  {
    title: 'Testable by design',
    desc: 'Hexagonal architecture and DI keep business logic decoupled and verifiable without infrastructure.',
  },
  {
    title: 'Finish what I start',
    desc: 'Ship working, documented, production-ready code — not prototypes that need rewriting.',
  },
];

function S7() {
  return (
    <m.div className="flex flex-col gap-6" variants={stagger.container} initial="hidden" animate="show">
      <m.div variants={stagger.item}><Label text="principles" /></m.div>
      <m.h2 variants={stagger.item} className="font-heading text-2xl lg:text-3xl font-bold text-foreground">
        How I Work
      </m.h2>
      <m.div variants={stagger.item} className="flex flex-col gap-5">
        {PRINCIPLES.map((p, i) => (
          <div key={p.title} className="flex gap-4 items-start">
            <span className="font-mono text-primary text-2xl font-bold select-none leading-none mt-0.5 w-8 shrink-0">
              0{i + 1}
            </span>
            <div>
              <p className="font-heading font-semibold text-foreground text-lg">{p.title}</p>
              <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </m.div>
    </m.div>
  );
}

function S8() {
  const [copied, setCopied] = useState(false);

  function copyEmail(e: React.MouseEvent) {
    e.stopPropagation();
    navigator.clipboard.writeText(personalInfo.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <m.div className="flex flex-col gap-8" variants={stagger.container} initial="hidden" animate="show">
      <m.div variants={stagger.item}><Label text="contact" /></m.div>
      <m.div variants={stagger.item}>
        <h2 className="font-heading text-4xl lg:text-6xl font-bold text-foreground">Let's Talk.</h2>
        <p className="text-muted-foreground text-lg mt-2">
          {personalInfo.availability} · {personalInfo.location}
        </p>
      </m.div>
      <m.div variants={stagger.item} className="flex flex-col gap-4">
        <button
          onClick={copyEmail}
          className="flex items-center gap-3 w-fit bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-xl px-4 py-3 transition-colors"
        >
          {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4 text-primary" />}
          <span className="font-mono text-sm text-primary">{personalInfo.email}</span>
        </button>
        <div className="flex gap-5">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <Mail className="h-4 w-4" /> Email
          </a>
        </div>
      </m.div>
    </m.div>
  );
}

const SLIDES = [S1, S2, S3, S4, S5, S6, S7, S8];
const TOTAL = SLIDES.length;

// ── Main deck component ───────────────────────────────────────────────────────

export default function Present() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Bootstrap theme from localStorage, defaulting to dark (mirrors site behaviour)
  useEffect(() => {
    const saved = (localStorage.getItem('theme') ?? 'dark') as 'dark' | 'light';
    setTheme(saved);
    document.documentElement.classList.toggle('dark', saved !== 'light');
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
      return next;
    });
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  }, []);

  const go = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setSlide(index);
  }, []);

  const next = useCallback(() => {
    if (slide < TOTAL - 1) go(slide + 1, 1);
  }, [slide, go]);

  const prev = useCallback(() => {
    if (slide > 0) go(slide - 1, -1);
  }, [slide, go]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.key) {
        case 'ArrowRight': case 'ArrowDown': case ' ': case 'PageDown':
          e.preventDefault(); next(); break;
        case 'ArrowLeft': case 'ArrowUp': case 'PageUp':
          e.preventDefault(); prev(); break;
        case 'Home': e.preventDefault(); go(0, -1); break;
        case 'End': e.preventDefault(); go(TOTAL - 1, 1); break;
        case 'f': case 'F': toggleFullscreen(); break;
        default:
          if (e.key >= '1' && e.key <= '8') {
            const idx = parseInt(e.key, 10) - 1;
            go(idx, idx > slide ? 1 : -1);
          }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [next, prev, go, slide, toggleFullscreen]);

  useEffect(() => {
    function onFSChange() { setIsFullscreen(!!document.fullscreenElement); }
    document.addEventListener('fullscreenchange', onFSChange);
    return () => document.removeEventListener('fullscreenchange', onFSChange);
  }, []);

  const SlideContent = SLIDES[slide];

  return (
    <div className="h-screen w-full flex flex-col bg-background overflow-hidden">
      {/* Progress bar */}
      <div className="h-0.5 bg-border w-full shrink-0">
        <m.div
          className="h-full bg-primary"
          animate={{ width: `${((slide + 1) / TOTAL) * 100}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* Top chrome */}
      <header className="flex-none h-12 flex items-center justify-between px-4 lg:px-6 border-b border-border bg-background/80 backdrop-blur-md shrink-0">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back to Portfolio</span>
        </button>

        <span className="font-mono text-xs text-muted-foreground">
          {String(slide + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
            title="Fullscreen (F)"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Slide area — click to advance */}
      <main
        className="flex-1 relative overflow-hidden cursor-pointer"
        onClick={next}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <m.div
            key={slide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center"
          >
            <div className="w-full max-w-5xl mx-auto px-6 lg:px-12 py-8">
              <SlideContent />
            </div>
          </m.div>
        </AnimatePresence>
      </main>

      {/* Bottom chrome */}
      <footer className="flex-none h-14 flex items-center justify-between px-4 lg:px-6 border-t border-border bg-background/80 backdrop-blur-md shrink-0">
        <button
          onClick={e => { e.stopPropagation(); prev(); }}
          disabled={slide === 0}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Navigation dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: TOTAL }, (_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); go(i, i > slide ? 1 : -1); }}
              className={`rounded-full transition-all duration-200 ${
                i === slide
                  ? 'w-5 h-2 bg-primary'
                  : 'w-2 h-2 bg-border hover:bg-muted-foreground'
              }`}
            />
          ))}
        </div>

        <button
          onClick={e => { e.stopPropagation(); next(); }}
          disabled={slide === TOTAL - 1}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </footer>
    </div>
  );
}
