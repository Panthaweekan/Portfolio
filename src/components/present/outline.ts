// Slide order for /present. The contents page and every folio derive from it.

// A coda sums up every chapter, so like Close it stands outside them.
export type SlideKind = 'title' | 'contents' | 'divider' | 'content' | 'coda' | 'close';

interface OutlineEntry {
  id: string;
  kind: SlideKind;
  /** Chapter numeral, set on dividers only. */
  chapter?: string;
  title: string;
}

export const OUTLINE = [
  { id: 'title', kind: 'title', title: 'Panthaweekan Somngam' },
  { id: 'contents', kind: 'contents', title: 'Contents' },
  { id: 'finops', kind: 'divider', chapter: 'I', title: 'FinOps engine' },
  { id: 'finops-discovery', kind: 'content', title: 'I started with the spec' },
  { id: 'finops-figure', kind: 'content', title: 'One LLM call becomes money' },
  { id: 'finops-built', kind: 'content', title: 'What I built, and how we work' },
  { id: 'gateway', kind: 'divider', chapter: 'II', title: 'API gateway' },
  { id: 'gateway-fix', kind: 'content', title: 'From an appliance to a service' },
  { id: 'earlier', kind: 'divider', chapter: 'III', title: 'Earlier systems' },
  { id: 'earlier-two-up', kind: 'content', title: 'Two systems I built before FinOps' },
  { id: 'how-i-work', kind: 'coda', title: 'How I work' },
  { id: 'close', kind: 'close', title: 'Questions?' },
] as const satisfies readonly OutlineEntry[];

export type SlideId = (typeof OUTLINE)[number]['id'];

export const TOTAL_PAGES = OUTLINE.length;

export function pageOf(id: string): number {
  const index = OUTLINE.findIndex((s) => s.id === id);
  if (index < 0) throw new Error(`unknown slide: ${id}`);
  return index + 1;
}

// The divider that owns a slide. Title, contents, coda and close sit outside chapters.
export function chapterOf(id: string): { numeral: string; title: string } | null {
  const page = pageOf(id);
  for (let i = page - 1; i >= 0; i--) {
    const s: OutlineEntry = OUTLINE[i];
    if (s.kind === 'divider' && s.chapter) return { numeral: s.chapter, title: s.title };
    if (s.kind !== 'divider' && s.kind !== 'content') return null;
  }
  return null;
}

export function contents(): { numeral: string; title: string; page: number }[] {
  return OUTLINE.filter((s: OutlineEntry) => s.kind === 'divider' || s.kind === 'coda' || s.kind === 'close').map(
    (s: OutlineEntry) => ({
      numeral: s.chapter ?? '',
      title: s.kind === 'close' ? 'Close' : s.title,
      page: pageOf(s.id),
    }),
  );
}
