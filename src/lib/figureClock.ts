// Figure 1 timeline: one clock drives the marker and the station reveals.

export const STATION_COUNT = 5;
export const SEGMENT_MS = 1500;
export const HOLD_MS = 2000;
export const LOOP_MS = SEGMENT_MS * (STATION_COUNT - 1) + HOLD_MS;

export interface FigureFrame {
  /** Segment the marker travels on: 0..STATION_COUNT - 2. */
  segment: number;
  /** Eased position within that segment, 0..1. */
  fraction: number;
  /** Station marked as next (the current one while holding). */
  active: number;
  /** How many stations have shown their value. */
  revealed: number;
}

export const FINAL_FRAME: FigureFrame = {
  segment: STATION_COUNT - 2,
  fraction: 1,
  active: STATION_COUNT - 1,
  revealed: STATION_COUNT,
};

// Ease in and out of every station so the call reads as one continuous move.
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

export function frameAt(elapsedMs: number): FigureFrame {
  const t = ((elapsedMs % LOOP_MS) + LOOP_MS) % LOOP_MS;
  const travel = SEGMENT_MS * (STATION_COUNT - 1);
  if (t >= travel) return FINAL_FRAME;
  const segment = Math.floor(t / SEGMENT_MS);
  const fraction = easeInOut((t - segment * SEGMENT_MS) / SEGMENT_MS);
  return { segment, fraction, active: segment + 1, revealed: segment + 1 };
}
