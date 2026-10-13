import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Maximize2, Minimize2, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { SLIDES } from './present/slides';

const DESIGN_W = 1920;
const DESIGN_H = 1080;
const TOTAL = SLIDES.length;

function initialSlide(): number {
  const n = parseInt(new URLSearchParams(window.location.search).get('slide') ?? '', 10);
  return Number.isFinite(n) && n >= 1 && n <= TOTAL ? n - 1 : 0;
}

const chromeButton = 'grid h-9 w-9 place-items-center text-muted hover:text-ink disabled:opacity-30';

export default function Present() {
  const { theme, toggle } = useTheme();
  const [slide, setSlide] = useState(initialSlide);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const stageRef = useRef<HTMLDivElement>(null);

  const go = useCallback((index: number) => setSlide(Math.max(0, Math.min(TOTAL - 1, index))), []);
  const next = useCallback(() => setSlide((s) => Math.min(TOTAL - 1, s + 1)), []);
  const prev = useCallback(() => setSlide((s) => Math.max(0, s - 1)), []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
    else document.exitFullscreen().catch(() => {});
  }, []);

  // Fit the fixed 1920×1080 canvas into the stage, letterboxed.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const fit = () => {
      const { width, height } = el.getBoundingClientRect();
      setScale(Math.min(width / DESIGN_W, height / DESIGN_H));
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      // Space and Enter on a focused control press that control.
      if ((e.key === ' ' || e.key === 'Enter') && (e.target as Element).closest?.('button, a')) return;
      switch (e.key) {
        case 'ArrowRight': case 'ArrowDown': case ' ': case 'PageDown':
          e.preventDefault(); next(); break;
        case 'ArrowLeft': case 'ArrowUp': case 'PageUp':
          e.preventDefault(); prev(); break;
        case 'Home': e.preventDefault(); go(0); break;
        case 'End': e.preventDefault(); go(TOTAL - 1); break;
        case 'f': case 'F': toggleFullscreen(); break;
        default:
          if (e.key >= '1' && e.key <= '9') go(parseInt(e.key, 10) - 1);
      }
    };
    const onFullscreen = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('keydown', onKey);
    document.addEventListener('fullscreenchange', onFullscreen);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('fullscreenchange', onFullscreen);
    };
  }, [next, prev, go, toggleFullscreen]);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-ground text-ink">
      <div className="h-0.5 w-full shrink-0 bg-rule">
        <div className="h-full bg-ink motion-safe:transition-[width] motion-safe:duration-300 motion-safe:ease-out" style={{ width: `${((slide + 1) / TOTAL) * 100}%` }} />
      </div>

      <header className="flex h-12 shrink-0 items-center justify-between border-b border-rule px-4 lg:px-6">
        <Link to="/" className="flex items-center gap-1.5 text-sm text-muted hover:text-ink">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          <span>Portfolio</span>
        </Link>
        <span className="text-sm tabular-nums text-muted" aria-live="polite">
          p. {slide + 1} / {TOTAL}
          <span className="hidden md:inline"> · {SLIDES[slide].title}</span>
        </span>
        <div className="flex items-center gap-1">
          <button type="button" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} className={chromeButton}>
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button type="button" onClick={toggleFullscreen} aria-label="Toggle fullscreen (F)" className={chromeButton}>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Click anywhere on the stage to advance. */}
      <main ref={stageRef} className="relative flex flex-1 cursor-pointer items-center justify-center overflow-hidden" onClick={next}>
        <div
          className="relative shrink-0 ring-1 ring-rule"
          style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})`, transformOrigin: 'center center' }}
        >
          {SLIDES.map(({ id, title, Component }, i) => (
            <section
              key={id}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${TOTAL}: ${title}`}
              inert={i !== slide}
              className="absolute inset-0 overflow-hidden"
              style={{ visibility: i === slide ? 'visible' : 'hidden' }}
            >
              <Component />
            </section>
          ))}
        </div>
      </main>

      <footer className="flex h-14 shrink-0 items-center justify-between border-t border-rule px-4 lg:px-6">
        <button type="button" onClick={prev} disabled={slide === 0} aria-label="Previous slide" className={chromeButton}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-1.5">
          {SLIDES.map(({ id }, i) => (
            <button
              key={id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === slide ? 'step' : undefined}
              className={`h-2 rounded-full motion-safe:transition-all ${i === slide ? 'w-5 bg-ink' : 'w-2 bg-rule'}`}
            />
          ))}
        </div>
        <button type="button" onClick={next} disabled={slide === TOTAL - 1} aria-label="Next slide" className={chromeButton}>
          <ChevronRight className="h-5 w-5" />
        </button>
      </footer>
    </div>
  );
}
