import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Sun, Moon, Maximize2, Minimize2, X } from 'lucide-react';
import { DECK_SLIDES } from '@/data/present-slides';

const DESIGN_W = 1920;
const DESIGN_H = 1080;
const TOTAL = DECK_SLIDES.length;

// Design tokens + fonts, ported from the Claude Design deck. Scoped to the deck
// root via .present-deck so they don't leak into the rest of the site, plus the
// :hover the design expressed with its non-standard style-hover attribute.
const DECK_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
.present-deck {
  --t-display:122px; --t-title:72px; --t-h2:48px; --t-sub:34px; --t-body:30px; --t-label:24px;
  --pad-x:104px; --pad-y:78px; --gap:28px;
  --bg:#06060E; --card:#101022; --card-2:#0B0B18; --line:#26264a; --fg:#F2F2F0;
  --muted:#969ccb; --blue:#5b78ff; --blue-2:#9bb0ff; --grid:rgba(91,120,255,.06); --mark:#5b78ff;
  --glow:rgba(40,60,255,.30);
}
.present-deck.theme-light {
  --bg:#ECE9DF; --card:#F5F3EB; --card-2:#E9E5D9; --line:#D3CDBC; --fg:#0B0B0B;
  --muted:#5d5b50; --blue:#0000F2; --blue-2:#0000F2; --grid:rgba(0,0,242,.05); --mark:#0000F2;
  --glow:rgba(0,0,242,.07);
}
.present-canvas a { transition: background .15s; }
.present-canvas a:hover { background: rgba(255,255,255,.12); }
`;

export default function Present() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(() => {
    const n = parseInt(new URLSearchParams(window.location.search).get('slide') ?? '', 10);
    return Number.isFinite(n) && n >= 1 && n <= TOTAL ? n - 1 : 0;
  });
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [lightbox, setLightbox] = useState<{ slide: number; index: number } | null>(null);
  // Standalone image lookup (side-projects slide). Carries a ready-to-use src,
  // so it feeds the same lightbox JSX as the gallery without the gallery model.
  const [lookbox, setLookbox] = useState<{ src: string; cap: string } | null>(null);
  const [stackTop, setStackTop] = useState(0); // front card of the gallery stack on the current slide
  const stageRef = useRef<HTMLDivElement>(null);

  const lbItems = lightbox ? DECK_SLIDES[lightbox.slide].gallery ?? [] : [];
  const lbNext = useCallback(() => setLightbox(lb => lb ? { ...lb, index: (lb.index + 1) % (DECK_SLIDES[lb.slide].gallery?.length ?? 1) } : lb), []);
  const lbPrev = useCallback(() => setLightbox(lb => lb ? { ...lb, index: (lb.index - 1 + (DECK_SLIDES[lb.slide].gallery?.length ?? 1)) % (DECK_SLIDES[lb.slide].gallery?.length ?? 1) } : lb), []);

  const galleryLen = DECK_SLIDES[slide].gallery?.length ?? 0;
  const stackNext = useCallback((n: number) => setStackTop(t => (t + n + galleryLen) % galleryLen), [galleryLen]);
  // reset the stack to the first card whenever we land on a new slide
  useEffect(() => { setStackTop(0); }, [slide]);

  // Theme bootstrap (mirrors site behaviour; design uses a .theme-light class).
  useEffect(() => {
    const saved = (localStorage.getItem('theme') ?? 'dark') as 'dark' | 'light';
    setTheme(saved);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      return next;
    });
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  const go = useCallback((index: number) => setSlide(Math.max(0, Math.min(TOTAL - 1, index))), []);
  const next = useCallback(() => setSlide(s => Math.min(TOTAL - 1, s + 1)), []);
  const prev = useCallback(() => setSlide(s => Math.max(0, s - 1)), []);

  // Scale the fixed 1920x1080 canvas to fit the available stage, letterboxed.
  useEffect(() => {
    function fit() {
      const el = stageRef.current;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      setScale(Math.min(width / DESIGN_W, height / DESIGN_H));
    }
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      // Lightbox open: arrows cycle within the gallery, Esc closes; deck nav is suppressed.
      if (lightbox) {
        switch (e.key) {
          case 'ArrowRight': case 'ArrowDown': case ' ': e.preventDefault(); lbNext(); break;
          case 'ArrowLeft': case 'ArrowUp': e.preventDefault(); lbPrev(); break;
          case 'Escape': e.preventDefault(); setLightbox(null); break;
        }
        return;
      }
      // Single-image lookup (side-projects): Esc closes, deck nav suppressed.
      if (lookbox) {
        if (e.key === 'Escape') { e.preventDefault(); setLookbox(null); }
        return;
      }
      // On a gallery slide, Up/Down rotate the card stack (Left/Right stay slide nav).
      if (galleryLen > 0) {
        if (e.key === 'ArrowDown') { e.preventDefault(); stackNext(1); return; }
        if (e.key === 'ArrowUp')   { e.preventDefault(); stackNext(-1); return; }
      }
      switch (e.key) {
        case 'ArrowRight': case 'ArrowDown': case ' ': case 'PageDown':
          e.preventDefault(); next(); break;
        case 'ArrowLeft': case 'ArrowUp': case 'PageUp':
          e.preventDefault(); prev(); break;
        case 'Home': e.preventDefault(); go(0); break;
        case 'End': e.preventDefault(); go(TOTAL - 1); break;
        case 'f': case 'F': toggleFullscreen(); break;
        default:
          if (e.key >= '1' && e.key <= '9') {
            const idx = parseInt(e.key, 10) - 1;
            if (idx < TOTAL) go(idx);
          }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [next, prev, go, toggleFullscreen, lightbox, lookbox, lbNext, lbPrev, galleryLen, stackNext]);

  useEffect(() => {
    function onFSChange() { setIsFullscreen(!!document.fullscreenElement); }
    document.addEventListener('fullscreenchange', onFSChange);
    return () => document.removeEventListener('fullscreenchange', onFSChange);
  }, []);

  return (
    <div className={`present-deck ${theme === 'light' ? 'theme-light' : ''} h-screen w-full flex flex-col overflow-hidden`}
         style={{ background: 'var(--bg)' }}>
      <style>{DECK_CSS}</style>

      {/* Progress bar */}
      <div className="h-0.5 w-full shrink-0" style={{ background: 'var(--line)' }}>
        <div className="h-full transition-[width] duration-300 ease-out"
             style={{ width: `${((slide + 1) / TOTAL) * 100}%`, background: 'var(--blue)' }} />
      </div>

      {/* Top chrome */}
      <header className="flex-none h-12 flex items-center justify-between px-4 lg:px-6 shrink-0"
              style={{ borderBottom: '1px solid var(--line)' }}>
        <button onClick={() => navigate('/')}
                className="flex items-center gap-1.5 text-sm transition-colors"
                style={{ color: 'var(--muted)' }}>
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back to Portfolio</span>
        </button>

        <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
          {String(slide + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
          <span className="hidden md:inline"> · {DECK_SLIDES[slide].label}</span>
        </span>

        <div className="flex items-center gap-1">
          <button onClick={toggleTheme} title="Toggle theme"
                  className="p-2 rounded-lg transition-colors" style={{ color: 'var(--muted)' }}>
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button onClick={toggleFullscreen} title="Fullscreen (F)"
                  className="p-2 rounded-lg transition-colors" style={{ color: 'var(--muted)' }}>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Stage — fixed 1920x1080 canvas scaled to fit. Click advances. */}
      <main ref={stageRef} className="flex-1 relative overflow-hidden cursor-pointer flex items-center justify-center"
            onClick={next}>
        <div className="present-canvas relative shrink-0"
             style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})`, transformOrigin: 'center center' }}
             onClickCapture={e => {
               // Delegated: data-lookup triggers in the injected slide HTML open the lightbox.
               const t = (e.target as HTMLElement).closest('[data-lookup-src]') as HTMLElement | null;
               if (t) {
                 e.stopPropagation();  // don't let the stage's onClick advance the slide
                 setLookbox({ src: t.dataset.lookupSrc!, cap: t.dataset.lookupCap ?? '' });
               }
             }}>
          {DECK_SLIDES.map((s, i) => (
            <div
              key={i}
              aria-hidden={i !== slide}
              style={{
                position: 'absolute', inset: 0, boxSizing: 'border-box', overflow: 'hidden',
                opacity: i === slide ? 1 : 0,
                visibility: i === slide ? 'visible' : 'hidden',
                pointerEvents: i === slide ? 'auto' : 'none',
                transition: 'opacity .35s ease',
              }}
            >
              {/* Slide root carries the design's authored style; inner is design HTML.
                  position:relative + full size makes it the containing block for the
                  design's absolutely-positioned corner marks. Gallery slides render the
                  HTML as header chrome, then a real-React thumbnail grid below it. */}
              <div style={{ position: 'relative', width: '100%', height: '100%', boxSizing: 'border-box', ...cssTextToObject(s.style) }}>
                {/* display:contents so the authored HTML's children participate directly in
                    the slide root's flex layout — a wrapping div would break the flex:1
                    body that vertically centres every slide. */}
                <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: s.html }} />
                {s.gallery && (() => {
                  const gal = s.gallery;
                  const len = gal.length;
                  const top = i === slide ? stackTop : 0;
                  const front = gal[top];
                  return (
                    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', marginTop: 18 }}>
                      {/* Floating card stack — ↑/↓ rotate, click front to expand */}
                      <div style={{ flex: 1, minHeight: 0, position: 'relative', perspective: 1600 }}>
                        {gal.map((g, gi) => {
                          // signed offset from the front card, wrapped to nearest (±len/2)
                          let off = gi - top;
                          if (off > len / 2) off -= len;
                          if (off < -len / 2) off += len;
                          const abs = Math.abs(off);
                          const visible = abs <= 2;          // tidy stack: only 2 cards peek behind
                          const isFront = off === 0;
                          return (
                            <button
                              key={gi}
                              onClick={e => {
                                e.stopPropagation();
                                if (isFront) setLightbox({ slide: i, index: gi });
                                else if (i === slide) setStackTop(gi);
                              }}
                              aria-hidden={!visible}
                              aria-label={isFront ? `Expand: ${g.cap}` : `Bring forward: ${g.cap}`}
                              style={{
                                position: 'absolute', top: '50%', left: '50%',
                                width: '58%', height: '86%',
                                margin: 0, padding: 0, border: 'none', background: '#fff',
                                boxShadow: isFront ? '0 30px 80px rgba(0,0,0,.40)' : '0 14px 38px rgba(0,0,0,.22)',
                                outline: isFront ? '2px solid var(--blue)' : '1px solid var(--line)',
                                cursor: isFront ? 'zoom-in' : 'pointer',
                                overflow: 'hidden',
                                // back cards peek out to the side (clearly a flippable stack) but stay
                                // tidy: no rotation, gentle dim + slight blur so the front card leads.
                                opacity: visible ? (isFront ? 1 : 0.7 - (abs - 1) * 0.18) : 0,
                                filter: isFront ? 'none' : 'brightness(.96) blur(1px)',
                                zIndex: 100 - abs,
                                transform: `translate(-50%,-50%) translateX(${off * 22}%) scale(${1 - abs * 0.07})`,
                                transformOrigin: 'center center',
                                transition: 'transform .4s cubic-bezier(.22,1,.36,1), opacity .4s ease, filter .4s ease',
                                pointerEvents: isFront ? 'auto' : 'none',  // only the front card is interactive
                              }}>
                              <img src={`/Portfolio/present-icons/present-inventory-service/${encodeURIComponent(g.src)}`}
                                   alt={g.cap} draggable={false}
                                   style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'top', display: 'block' }} />
                            </button>
                          );
                        })}
                        {/* Side affordances on the stack itself — the clearest 'this slides' cue */}
                        <button onClick={e => { e.stopPropagation(); if (i === slide) stackNext(-1); }}
                                aria-label="Previous card"
                                style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
                                         zIndex: 200, width: 56, height: 56, borderRadius: '50%',
                                         display: 'flex', alignItems: 'center', justifyContent: 'center',
                                         background: 'var(--card)', border: '1px solid var(--line)',
                                         color: 'var(--blue)', boxShadow: '0 6px 20px rgba(0,0,0,.18)', cursor: 'pointer' }}>
                          <ChevronLeft className="h-7 w-7" />
                        </button>
                        <button onClick={e => { e.stopPropagation(); if (i === slide) stackNext(1); }}
                                aria-label="Next card"
                                style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                                         zIndex: 200, width: 56, height: 56, borderRadius: '50%',
                                         display: 'flex', alignItems: 'center', justifyContent: 'center',
                                         background: 'var(--card)', border: '1px solid var(--line)',
                                         color: 'var(--blue)', boxShadow: '0 6px 20px rgba(0,0,0,.18)', cursor: 'pointer' }}>
                          <ChevronRight className="h-7 w-7" />
                        </button>
                      </div>
                      {/* Caption + dot indicator under the stack */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 16 }}>
                        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 19, color: 'var(--fg)', letterSpacing: '.02em', minWidth: 0 }}>
                          <span style={{ color: 'var(--blue)' }}>{String(top + 1).padStart(2, '0')}/{String(len).padStart(2, '0')}</span>
                          {'  '}▸ {front.cap}
                        </div>
                        <div style={{ display: 'flex', gap: 7, marginLeft: 18 }}>
                          {gal.map((_, di) => (
                            <span key={di} style={{ width: di === top ? 18 : 7, height: 7, borderRadius: 4,
                              background: di === top ? 'var(--blue)' : 'var(--line)', transition: 'all .25s' }} />
                          ))}
                        </div>
                        <span style={{ marginLeft: 'auto', fontFamily: "'Space Mono',monospace", fontSize: 15, color: 'var(--muted)', letterSpacing: '.04em' }}>
                          ‹ › or ↑ ↓ to slide · click to expand
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom chrome */}
      <footer className="flex-none h-14 flex items-center justify-between px-4 lg:px-6 shrink-0"
              style={{ borderTop: '1px solid var(--line)' }}>
        <button onClick={e => { e.stopPropagation(); prev(); }} disabled={slide === 0}
                className="p-2 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ color: 'var(--muted)' }}>
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          {DECK_SLIDES.map((_, i) => (
            <button key={i} onClick={e => { e.stopPropagation(); go(i); }}
                    aria-label={`Go to slide ${i + 1}`}
                    className="rounded-full transition-all duration-200"
                    style={i === slide
                      ? { width: 20, height: 8, background: 'var(--blue)' }
                      : { width: 8, height: 8, background: 'var(--line)' }} />
          ))}
        </div>

        <button onClick={e => { e.stopPropagation(); next(); }} disabled={slide === TOTAL - 1}
                className="p-2 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ color: 'var(--muted)' }}>
          <ChevronRight className="h-5 w-5" />
        </button>
      </footer>

      {/* Lightbox — full-viewport, outside the scaled canvas so the image is crisp.
          Click backdrop or ✕ to close; ‹ › cycle within this slide's gallery. */}
      {lightbox && lbItems.length > 0 && (
        <div onClick={() => setLightbox(null)}
             style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(3,3,8,.92)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      padding: '48px 80px', cursor: 'zoom-out' }}>
          <button onClick={e => { e.stopPropagation(); setLightbox(null); }} title="Close (Esc)"
                  style={{ position: 'absolute', top: 24, right: 28, padding: 8, color: '#fff', opacity: .8 }}>
            <X className="h-7 w-7" />
          </button>
          <button onClick={e => { e.stopPropagation(); lbPrev(); }} title="Previous (←)"
                  style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', padding: 12, color: '#fff', opacity: .8 }}>
            <ChevronLeft className="h-10 w-10" />
          </button>
          <img src={`/Portfolio/present-icons/present-inventory-service/${encodeURIComponent(lbItems[lightbox.index].src)}`}
               alt={lbItems[lightbox.index].cap}
               onClick={e => e.stopPropagation()}
               style={{ maxWidth: '100%', maxHeight: 'calc(100% - 56px)', objectFit: 'contain',
                        border: '1px solid var(--line)', background: '#fff', cursor: 'default' }} />
          <button onClick={e => { e.stopPropagation(); lbNext(); }} title="Next (→)"
                  style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', padding: 12, color: '#fff', opacity: .8 }}>
            <ChevronRight className="h-10 w-10" />
          </button>
          <div style={{ marginTop: 18, fontFamily: "'Space Mono',monospace", fontSize: 16, color: 'rgba(255,255,255,.85)', letterSpacing: '.04em' }}>
            {String(lightbox.index + 1).padStart(2, '0')} / {String(lbItems.length).padStart(2, '0')} · {lbItems[lightbox.index].cap}
          </div>
        </div>
      )}

      {/* Single-image lookup overlay (side-projects). Same look as the gallery
          lightbox, minus the ‹ › nav — it's one image, not a gallery. */}
      {lookbox && (
        <div onClick={() => setLookbox(null)}
             style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(3,3,8,.92)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      padding: '48px 80px', cursor: 'zoom-out' }}>
          <button onClick={e => { e.stopPropagation(); setLookbox(null); }} title="Close (Esc)"
                  style={{ position: 'absolute', top: 24, right: 28, padding: 8, color: '#fff', opacity: .8 }}>
            <X className="h-7 w-7" />
          </button>
          <img src={lookbox.src} alt={lookbox.cap} onClick={e => e.stopPropagation()}
               style={{ maxWidth: '100%', maxHeight: 'calc(100% - 56px)', objectFit: 'contain',
                        border: '1px solid var(--line)', background: '#fff', cursor: 'default' }} />
          <div style={{ marginTop: 18, fontFamily: "'Space Mono',monospace", fontSize: 16, color: 'rgba(255,255,255,.85)', letterSpacing: '.04em' }}>
            {lookbox.cap}
          </div>
        </div>
      )}
    </div>
  );
}

// The design authored slide roots with a CSS `style` string; React needs a style
// object. Parse the simple `prop:value;` declarations the design uses.
function cssTextToObject(css: string): React.CSSProperties {
  const obj: Record<string, string> = {};
  for (const decl of css.split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    const val = decl.slice(i + 1).trim();
    if (!prop) continue;
    const key = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    obj[key] = val;
  }
  return obj as React.CSSProperties;
}
