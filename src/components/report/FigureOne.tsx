import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { FINAL_FRAME, frameAt, type FigureFrame } from '@/lib/figureClock';

// Illustrative values, labelled as such in the caption. Not computed.
const STATIONS: { name: string; value: string; amount?: string }[] = [
  { name: 'Agent step', value: '1,200 input · 300 output tokens' },
  { name: 'Collector', value: 'Usage signal received' },
  { name: 'Kafka', value: 'Queued, in order, for the engine' },
  { name: 'Engine', value: '1,200 × $3/M + 300 × $15/M' },
  // The call lands as a priced, attributed line item.
  { name: 'Dashboard', value: 'Team › Project › Run › Step', amount: 'USD 0.0081' },
];

// Class sets for the web page and the deck slide. The slide canvas is 1920px wide
// whatever the viewport, so its set carries no breakpoint prefixes.
// dotOffset: station dot centre from the top of each list item, the dot's top
// margin plus half its height. Change those classes and it together.
const SIZES = {
  page: {
    figure: 'p-6 sm:p-8 md:p-12',
    caption: 'mb-8 text-2xl md:mb-10 md:text-3xl',
    list: 'space-y-7',
    item: 'pl-10',
    name: 'block',
    value: 'block',
    dot: 'left-[3px] mt-[10px] h-2.5 w-2.5',
    rail: 'left-[7px]',
    note: 'mt-10 text-sm',
    dotOffset: 15,
  },
  slide: {
    figure: 'p-12',
    caption: 'mb-10 text-[48px]',
    list: 'space-y-7 text-[32px] leading-snug',
    item: 'grid grid-cols-12 items-baseline gap-x-6 pl-14',
    name: 'col-span-3',
    value: 'col-span-9',
    dot: 'left-[2px] mt-[14px] h-4 w-4',
    rail: 'left-[9px]',
    note: 'mt-10 text-[22px]',
    dotOffset: 22,
  },
};

interface FigureOneProps {
  /** Deck slide: the final frame, no animation, at projection type sizes. */
  slide?: boolean;
}

export function FigureOne({ slide = false }: FigureOneProps) {
  const size = slide ? SIZES.slide : SIZES.page;
  const reduceMotion = useReducedMotion() || slide;
  const rootRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [frame, setFrame] = useState<FigureFrame>(FINAL_FRAME);
  const [centers, setCenters] = useState<number[]>([]);

  // Value text wraps at any width, so measure where each station really is.
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () =>
      setCenters(Array.from(list.children, (li) => (li as HTMLElement).offsetTop + size.dotOffset));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [size.dotOffset]);

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
    <figure ref={rootRef} className={`on-field flex h-full flex-col bg-field text-on-field ${size.figure}`}>
      <figcaption className={`font-semibold leading-tight ${size.caption}`}>
        <span className="tabular-nums">Figure 1</span> · One LLM call becomes money
      </figcaption>

      <div className="relative my-auto">
        {measured && (
          <>
            <div
              aria-hidden
              className={`absolute w-0.5 bg-on-field opacity-30 ${size.rail}`}
              style={{ top: centers[0], height: centers[STATIONS.length - 1] - centers[0] }}
            />
            {/* The travelled path is the call itself: solid up to the marker. */}
            <div
              aria-hidden
              className={`absolute w-0.5 bg-on-field ${size.rail}`}
              style={{ top: centers[0], height: markerTop - centers[0] }}
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
        <ol ref={listRef} className={`relative ${size.list}`}>
          {STATIONS.map((station, i) => {
            const reached = i < frame.revealed;
            const next = i === frame.active && !reached;
            const tone = reached ? 'text-on-field' : 'text-on-field-muted';
            const dot = next
              ? 'border-on-field bg-field'
              : reached
                ? 'border-on-field bg-on-field'
                : 'border-on-field-muted bg-field';
            return (
              <li key={station.name} className={size.item}>
                <span aria-hidden className={`absolute rounded-full border-2 ${size.dot} ${dot}`} />
                <span className={`${size.name} font-semibold`}>{station.name}</span>
                {station.amount && slide ? (
                  // On the slide the amount lands on its own line at display scale.
                  <>
                    <span className={`${size.value} ${tone}`}>{station.value}</span>
                    <span className="col-span-9 col-start-4 mt-4 text-right text-[120px] font-semibold leading-none tabular-nums">
                      {station.amount}
                    </span>
                  </>
                ) : station.amount ? (
                  <span className={`flex flex-wrap items-baseline justify-between gap-x-6 transition-colors duration-500 ${tone}`}>
                    <span>{station.value}</span>
                    <span className="whitespace-nowrap text-2xl font-semibold tabular-nums md:text-3xl">{station.amount}</span>
                  </span>
                ) : (
                  <span className={`${size.value} tabular-nums transition-colors duration-500 ${tone}`}>{station.value}</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <p className={`text-on-field-muted ${size.note}`}>
        Illustrative example · FinOps engine, SCB TechX agentic AI platform
      </p>
    </figure>
  );
}
