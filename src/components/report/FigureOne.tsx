import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { FINAL_FRAME, frameAt, type FigureFrame } from '@/lib/figureClock';

// Illustrative values, labelled as such in the caption. Not computed.
const STATIONS = [
  { name: 'Agent step', value: '1,200 input · 300 output tokens' },
  { name: 'Collector', value: 'Usage signal received' },
  { name: 'Kafka', value: 'Queued, in order, for the engine' },
  { name: 'Engine', value: '1,200 × $3/M + 300 × $15/M = USD 0.0081' },
  { name: 'Dashboard', value: 'Team › Project › Run › Step' },
] as const;

// Station dot centre, measured from the top of each list item.
const DOT_OFFSET = 15;

export function FigureOne() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [frame, setFrame] = useState<FigureFrame>(FINAL_FRAME);
  const [centers, setCenters] = useState<number[]>([]);

  // Value text wraps at any width, so measure where each station really is.
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () =>
      setCenters(Array.from(list.children, (li) => (li as HTMLElement).offsetTop + DOT_OFFSET));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  // One clock. Runs only while the figure is on screen, the tab is visible,
  // and motion is allowed. ponytail: restarts the loop on resume; resume
  // mid-loop only if someone notices.
  useEffect(() => {
    if (reduceMotion) {
      setFrame(FINAL_FRAME);
      return;
    }
    const root = rootRef.current;
    if (!root) return;
    let raf = 0;
    let start = 0;
    let onScreen = false;
    const tick = (now: number) => {
      if (!start) start = now;
      setFrame(frameAt(now - start));
      raf = requestAnimationFrame(tick);
    };
    const run = () => {
      cancelAnimationFrame(raf);
      if (onScreen && !document.hidden) {
        start = 0;
        raf = requestAnimationFrame(tick);
      }
    };
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      run();
    });
    io.observe(root);
    document.addEventListener('visibilitychange', run);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener('visibilitychange', run);
    };
  }, [reduceMotion]);

  const measured = centers.length === STATIONS.length;
  const markerTop = measured
    ? centers[frame.segment] + frame.fraction * (centers[frame.segment + 1] - centers[frame.segment])
    : 0;

  return (
    <figure ref={rootRef} className="on-field flex h-full flex-col bg-field p-8 text-on-field md:p-12">
      <figcaption className="mb-10">
        <span className="block text-sm font-semibold tabular-nums">Figure 1</span>
        <span className="mt-1 block text-2xl font-semibold leading-tight md:text-3xl">
          One LLM call becomes money
        </span>
      </figcaption>

      <div className="relative my-auto">
        {measured && (
          <>
            <div
              aria-hidden
              className="absolute left-[7px] w-0.5 bg-on-field-muted"
              style={{ top: centers[0], height: centers[STATIONS.length - 1] - centers[0] }}
            />
            {!reduceMotion && (
              <div
                aria-hidden
                className="absolute left-0 z-10 h-4 w-4 -translate-y-1/2 rounded-full bg-on-field"
                style={{ top: markerTop }}
              />
            )}
          </>
        )}
        <ol ref={listRef} className="relative space-y-7">
          {STATIONS.map((station, i) => {
            const reached = i < frame.revealed;
            const next = i === frame.active && !reached;
            const dot = next
              ? 'border-on-field bg-field'
              : reached
                ? 'border-on-field bg-on-field'
                : 'border-on-field-muted bg-field';
            return (
              <li key={station.name} className="pl-10">
                <span aria-hidden className={`absolute left-[3px] mt-[10px] h-2.5 w-2.5 rounded-full border-2 ${dot}`} />
                <span className="block font-semibold">{station.name}</span>
                <span
                  className={`block tabular-nums transition-opacity duration-500 ${reached ? 'opacity-100' : 'opacity-40'}`}
                >
                  {station.value}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="mt-10 text-sm text-on-field-muted">
        Illustrative example · FinOps engine, SCB TechX agentic AI platform
      </p>
    </figure>
  );
}
