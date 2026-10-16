// Slide order for both /present decks. Contents pages and every folio derive from it.

// A coda sums up every chapter, so like Close it stands outside them.
export type SlideKind = 'title' | 'contents' | 'divider' | 'content' | 'coda' | 'close';

interface OutlineEntry {
  id: string;
  kind: SlideKind;
  /** Chapter numeral, set on dividers only. */
  chapter?: string;
  title: string;
}

// Ids are unique across decks, so a slide id alone names its deck.
export const DECKS = {
  recruiter: [
    { id: 'about-title', kind: 'title', title: 'Panthaweekan Somngam' },
    { id: 'about-why', kind: 'content', title: 'Why I build software' },
    { id: 'about-start', kind: 'content', title: 'Where I started' },
    { id: 'about-users', kind: 'content', title: 'Built for real users' },
    { id: 'about-spec', kind: 'content', title: 'Shared understanding first' },
    { id: 'about-flow', kind: 'content', title: 'AI drafts, people decide' },
    { id: 'about-review', kind: 'content', title: 'When AI outpaces review' },
    { id: 'about-toolkit', kind: 'content', title: 'What I build with' },
    { id: 'about-outside', kind: 'content', title: 'Outside work' },
    { id: 'about-next', kind: 'content', title: "What I'm looking for" },
    { id: 'about-close', kind: 'close', title: 'Questions?' },
  ],
  technical: [
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
  ],
} as const satisfies Record<string, readonly OutlineEntry[]>;

export type DeckId = keyof typeof DECKS;
export type DeckSlideId<D extends DeckId> = (typeof DECKS)[D][number]['id'];
export type SlideId = DeckSlideId<DeckId>;

export function isDeckId(x: string): x is DeckId {
  return Object.prototype.hasOwnProperty.call(DECKS, x);
}

function locate(id: string): { deck: readonly OutlineEntry[]; index: number } {
  for (const deck of Object.values(DECKS) as readonly (readonly OutlineEntry[])[]) {
    const index = deck.findIndex((s) => s.id === id);
    if (index >= 0) return { deck, index };
  }
  throw new Error(`unknown slide: ${id}`);
}

export function pageOf(id: string): number {
  return locate(id).index + 1;
}

export function totalOf(id: string): number {
  return locate(id).deck.length;
}

// The divider that owns a slide. Title, contents, coda and close sit outside chapters.
export function chapterOf(id: string): { numeral: string; title: string } | null {
  const { deck, index } = locate(id);
  for (let i = index; i >= 0; i--) {
    const s = deck[i];
    if (s.kind === 'divider' && s.chapter) return { numeral: s.chapter, title: s.title };
    if (s.kind !== 'divider' && s.kind !== 'content') return null;
  }
  return null;
}

export function contents(deck: DeckId): { numeral: string; title: string; page: number }[] {
  const slides: readonly OutlineEntry[] = DECKS[deck];
  return slides
    .filter((s) => s.kind === 'divider' || s.kind === 'coda' || s.kind === 'close')
    .map((s) => ({
      numeral: s.chapter ?? '',
      title: s.kind === 'close' ? 'Close' : s.title,
      page: pageOf(s.id),
    }));
}
