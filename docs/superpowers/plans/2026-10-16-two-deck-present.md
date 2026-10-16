# Two-Deck /present Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split `/present` into an 11-slide "About me" deck for recruiter rounds (`/present/recruiter`) and the existing 12-slide technical deck (`/present/technical`), with a chooser page at `/present`.

**Architecture:**
- `outline.ts` holds both decks in one `DECKS` record. Slide ids are unique across decks, so `pageOf`, `chapterOf` and the new `totalOf` find the owning deck from the id alone.
- `slides.tsx` maps each deck's outline to components.
- `Present.tsx` becomes a route wrapper that reads `:deck` and renders the unchanged stage for that deck.
- A new `DeckChooser.tsx` serves `/present` and redirects legacy `?slide=N` links to the technical deck.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind 3, react-router-dom 7. Checks are plain Node `assert` scripts run through esbuild (`scripts/check-deck.mjs`), and screenshots use `career-ops/node_modules/.bin/playwright`.

**Spec:** `docs/superpowers/specs/2026-10-16-two-deck-present-design.md`. Read it before starting. It holds the approved slide copy, which is reproduced verbatim in Task 2.

## Global Constraints

- **Repo root:** `/Users/xanta999flyhigh/Learning-space/Portfolio`. Run every command from there.
- **Branch:** `feat/two-deck-present`.
- **Staging:** stage explicit paths only. Never `git add -A` or `git add .`, because `career-ops/` is a separate nested repo.
- **Commits:** conventional commits (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`), each ending with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- **Tailwind:** write every class string as a literal. Never assemble class names from fragments.
- **Slide canvas:** slide markup is fixed px on a 1920×1080 canvas. No `sm:` or `md:` prefixes inside slides.
- **Type sizes:** headline 72px, running text 32px minimum, nothing below 22px (the Projection Floor Rule).
- **Recruiter deck copy:** English only, plain first person, no hype words, no specific role name.
- **Stack names** appear only in the built-with captions (slides 4, 5) and on the Toolkit slide (8).
- **Technical deck:** ids, order, copy and every existing `check-deck` assertion stay unchanged.
- **Out of scope:** do not edit `cv.tex`. Do not touch `FigureOne` or `LayerFigure`. The home page's Figure 1 must render unchanged.

## Review Focus

1. **A GitHub Pages deep link gains a trailing slash.** `public/404.html` turns `/Portfolio/present/recruiter` into `/present/recruiter/`, which must still open the recruiter deck. Task 3 checks this in the preview.
2. **Unknown deck names.** `/present/foo` must go to the chooser, not crash or show a blank stage. Task 3 checks this.
3. **Out-of-range `?slide=`.** `/present/recruiter?slide=12`, which is past the 11 recruiter pages, and `?slide=abc` must open page 1, not render nothing. The range has to be checked against the deck's own total. Task 3 checks this.
4. **Legacy links.** `/present?slide=5` must land on technical p. 5 via a replace navigation, so Back does not loop. Task 3 checks this.
5. **Text overflow.** Slide 6 (the nine-stage flow) and slide 8 (five toolkit rows) are the densest slides, and their copy must not overflow the canvas in either theme. The screenshots in Task 5 check this.

---

## File map

| File | Responsibility | Task |
|---|---|---|
| `src/components/present/outline.ts` | Both decks' slide order plus page, chapter and total helpers | 1 |
| `scripts/check-deck.mjs` | Asserts both outlines | 1 |
| `src/components/present/SlideFrame.tsx` | Folio uses the deck total; optional caption above the folio | 1 (total), 2 (caption) |
| `src/components/present/Divider.tsx` | Folio uses the deck total | 1 |
| `src/components/present/slides.tsx` | Slide components; `slidesFor(deck)` | 1 (minimal), 2 (recruiter slides) |
| `src/components/Present.tsx` | Route wrapper plus deck stage | 3 |
| `src/components/present/DeckChooser.tsx` | `/present` page and legacy redirect | 3 |
| `src/App.tsx` | Routes | 3 |
| `PRODUCT.md`, `CLAUDE.md`, `DESIGN.md`, `.impeccable/design.json` | Docs | 4 |

---

### Task 1: Multi-deck outline

**Files:**
- Modify: `src/components/present/outline.ts` (whole file)
- Modify: `scripts/check-deck.mjs` (whole file)
- Modify: `src/components/present/SlideFrame.tsx`
- Modify: `src/components/present/Divider.tsx`
- Modify: `src/components/present/slides.tsx` (imports, `TitleSlide` folio, `ContentsSlide`, the tail `COMPONENTS`/`SLIDES`)

**Interfaces:**
- Produces, from `outline.ts`:
  - `DECKS: { recruiter: readonly OutlineEntry[]; technical: readonly OutlineEntry[] }`, declared `as const`;
  - `type DeckId = 'recruiter' | 'technical'`;
  - `isDeckId(x: string): x is DeckId`;
  - `type SlideId` (the union of every id in both decks);
  - `type DeckSlideId<D extends DeckId>`;
  - `pageOf(id: string): number`;
  - `totalOf(id: string): number`;
  - `chapterOf(id: string): { numeral: string; title: string } | null`;
  - `contents(deck: DeckId): { numeral: string; title: string; page: number }[]`.

  `OUTLINE` and `TOTAL_PAGES` are removed.
- Produces, from `slides.tsx`: `slidesFor(deck: DeckId): { id: string; title: string; Component: ComponentType }[]`. In this task it only works for `'technical'`; Task 2 completes `'recruiter'`. `SLIDES` stays exported (`= slidesFor('technical')`) until Task 3 removes it.

- [ ] **Step 1: Write the failing check.** Replace `scripts/check-deck.mjs` with:

```js
// Deck outline check: slide order, chapters and page numbers for both decks.
// Contents and folios derive from these outlines, so this is what keeps them true.
// Run: npm run check:deck
import { execFileSync } from 'child_process';
import { strict as assert } from 'assert';

execFileSync('node_modules/.bin/esbuild', [
  'src/components/present/outline.ts', '--format=esm', '--outfile=/tmp/deck-outline-check.mjs',
], { stdio: 'inherit' });

const { DECKS, isDeckId, pageOf, totalOf, contents, chapterOf } =
  await import('/tmp/deck-outline-check.mjs?' + Date.now());

const all = [...DECKS.recruiter, ...DECKS.technical];
assert.equal(new Set(all.map((s) => s.id)).size, all.length, 'slide ids are unique across both decks');
assert.deepEqual(Object.keys(DECKS).sort(), ['recruiter', 'technical']);
assert.ok(isDeckId('recruiter') && isDeckId('technical'));
assert.ok(!isDeckId('foo') && !isDeckId('') && !isDeckId('toString'), 'only real deck names');

// ── Technical: the 12-slide Contents and Chapters talk, unchanged ──
const T = DECKS.technical;
assert.equal(T.length, 12, 'a 10–15 minute talk: 12 slides');
assert.equal(T[0].kind, 'title');
assert.equal(T[1].kind, 'contents');
assert.equal(T.at(-1).kind, 'close');

assert.deepEqual(contents('technical'), [
  { numeral: 'I', title: 'FinOps engine', page: 3 },
  { numeral: 'II', title: 'API gateway', page: 7 },
  { numeral: 'III', title: 'Earlier systems', page: 9 },
  { numeral: '', title: 'How I work', page: 11 },
  { numeral: '', title: 'Close', page: 12 },
]);

// Every content slide belongs to the chapter of the divider before it.
for (const s of T.filter((x) => x.kind === 'content')) {
  assert.ok(chapterOf(s.id), `${s.id} has a chapter`);
}
assert.deepEqual(chapterOf('finops-figure'), { numeral: 'I', title: 'FinOps engine' });
assert.deepEqual(chapterOf('earlier-two-up'), { numeral: 'III', title: 'Earlier systems' });
// How I work sums up every chapter, so it stands outside them, like Close.
assert.equal(T.find((s) => s.id === 'how-i-work').kind, 'coda');
assert.equal(chapterOf('how-i-work'), null);
assert.equal(chapterOf('title'), null);
// The contents page lists Close on its own, outside chapter III.
assert.equal(chapterOf('close'), null);

assert.equal(pageOf('close'), 12);
assert.equal(totalOf('close'), 12);
assert.throws(() => pageOf('nope'), /unknown slide/);
assert.throws(() => totalOf('nope'), /unknown slide/);

// ── Recruiter: 11 slides, no chapters ──
const R = DECKS.recruiter;
assert.deepEqual(R.map((s) => s.id), [
  'about-title', 'about-why', 'about-start', 'about-users', 'about-spec', 'about-flow',
  'about-review', 'about-toolkit', 'about-outside', 'about-next', 'about-close',
]);
assert.equal(R[0].kind, 'title');
assert.equal(R.at(-1).kind, 'close');
assert.ok(R.every((s) => s.kind !== 'divider' && s.kind !== 'contents'), 'a 10-minute talk has no chapters');
for (const s of R) assert.equal(chapterOf(s.id), null, `${s.id} sits outside any chapter`);
assert.deepEqual(contents('recruiter'), [{ numeral: '', title: 'Close', page: 11 }]);

// Each deck counts its own pages.
assert.equal(pageOf('about-close'), 11);
assert.equal(totalOf('about-flow'), 11);
assert.equal(totalOf('finops-figure'), 12);

console.log('✓ deck outlines OK');
```

- [ ] **Step 2: Run it and confirm it fails.**

Run: `npm run check:deck`
Expected: FAIL, because `DECKS` is undefined. You will see a `TypeError` reading `recruiter` of undefined.

- [ ] **Step 3: Rewrite `src/components/present/outline.ts`.**

```ts
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
  return Object.hasOwn(DECKS, x);
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
```

Note on `chapterOf`: walking back from a recruiter content slide reaches `about-title` (kind `title`), so it returns null. That is the intended "outside any chapter" result.

`Object.hasOwn` is ES2022. If `tsc` complains about the lib target, use `Object.prototype.hasOwnProperty.call(DECKS, x)` instead.

- [ ] **Step 4: Run the check and confirm it passes.**

Run: `npm run check:deck`
Expected: `✓ deck outlines OK`

- [ ] **Step 5: Point the folios at `totalOf`.**

In `src/components/present/SlideFrame.tsx`:
- change the import to `import { chapterOf, pageOf, totalOf, type SlideId } from './outline';`;
- replace `p. {pageOf(id)} / {TOTAL_PAGES}` with `p. {pageOf(id)} / {totalOf(id)}`.

In `src/components/present/Divider.tsx`, make the same two changes: the import becomes `import { chapterOf, pageOf, totalOf, type SlideId } from './outline';` and the folio becomes `p. {pageOf(id)} / {totalOf(id)}`.

- [ ] **Step 6: Make `slides.tsx` compile against the new outline (technical only for now).**

In `src/components/present/slides.tsx`:

1. Change the outline import to:
```ts
import { contents, DECKS, pageOf, totalOf, type DeckId, type DeckSlideId } from './outline';
```
2. In `TitleSlide`, change the folio span to `p. {pageOf('title')} / {totalOf('title')}`.
3. In `ContentsSlide`, change `contents()` to `contents('technical')`.
4. Replace the tail of the file (from `const COMPONENTS` to the end) with:
```ts
const TECHNICAL: Record<DeckSlideId<'technical'>, ComponentType> = {
  title: TitleSlide,
  contents: ContentsSlide,
  finops: FinopsDivider,
  'finops-discovery': FinopsDiscovery,
  'finops-figure': FinopsFigure,
  'finops-built': FinopsBuilt,
  gateway: GatewayDivider,
  'gateway-fix': GatewayFix,
  earlier: EarlierDivider,
  'earlier-two-up': EarlierTwoUp,
  'how-i-work': HowIWork,
  close: CloseSlide,
};

const COMPONENTS: Partial<Record<DeckId, Record<string, ComponentType>>> = { technical: TECHNICAL };

export function slidesFor(deck: DeckId) {
  const components = COMPONENTS[deck];
  if (!components) throw new Error(`deck not built yet: ${deck}`);
  const slides: readonly { id: string; title: string }[] = DECKS[deck];
  return slides.map((s) => ({ id: s.id, title: s.title, Component: components[s.id] }));
}

export const SLIDES = slidesFor('technical');
```
The `Partial` and the throw exist only until Task 2 adds the recruiter record. Task 2 removes both.

5. If the `SlideId` type import is now unused in `slides.tsx`, remove it.

- [ ] **Step 7: Typecheck, build and run all checks.**

Run: `npx tsc --noEmit -p tsconfig.json && npm run build && npm run check:deck && npm run check:figure`
Expected: all pass. `/present` behaves exactly as before, because `Present.tsx` still imports `SLIDES`.

- [ ] **Step 8: Commit.**

```bash
git add src/components/present/outline.ts scripts/check-deck.mjs src/components/present/SlideFrame.tsx src/components/present/Divider.tsx src/components/present/slides.tsx
git commit -m "refactor: hold both /present decks in one outline

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Recruiter slides

**Files:**
- Modify: `src/components/present/SlideFrame.tsx` (add `caption`)
- Modify: `src/components/present/slides.tsx` (shared title and close, new helpers, 9 new slide components, recruiter record)

**Interfaces:**
- Consumes: `DECKS`, `DeckId`, `DeckSlideId`, `pageOf` and `totalOf` from Task 1.
- Produces:
  - `SlideFrame` props become `{ id: SlideId; caption?: string; children: ReactNode }`;
  - `slidesFor('recruiter')` returns all 11 slides;
  - `SLIDES` is still exported for `Present.tsx` until Task 3.

- [ ] **Step 1: Add the caption to `SlideFrame`.** Replace the component body in `src/components/present/SlideFrame.tsx` with:

```tsx
interface SlideFrameProps {
  id: SlideId;
  /** Muted 22px line above the folio rule, e.g. "Built with …". */
  caption?: string;
  children: ReactNode;
}

// Content slide: margins, an optional caption, then a folio line with chapter and page number.
export function SlideFrame({ id, caption, children }: SlideFrameProps) {
  const chapter = chapterOf(id);
  return (
    <div className="flex h-full flex-col bg-ground px-[120px] pb-[56px] pt-[96px] text-ink">
      <div className="min-h-0 flex-1">{children}</div>
      {caption && <p className="mt-8 text-[22px] text-muted">{caption}</p>}
      <div className="mt-10 flex items-baseline justify-between border-t border-rule pt-5 text-[22px] tabular-nums text-muted">
        <span>{chapter ? `${chapter.numeral} · ${chapter.title}` : 'Panthaweekan Somngam'}</span>
        <span>
          p. {pageOf(id)} / {totalOf(id)}
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Share the title slide between decks.** In `slides.tsx`:
  - give `TitleSlide` the props `{ id, label }: { id: 'title' | 'about-title'; label: string }`;
  - replace the footer's `<span>Portfolio talk · {personalInfo.cvUpdated}</span>` with `<span>{label} · {personalInfo.cvUpdated}</span>`;
  - change the folio span to `p. {pageOf(id)} / {totalOf(id)}`.

  In the `TECHNICAL` record, replace `title: TitleSlide,` with:
```tsx
  title: () => <TitleSlide id="title" label="Portfolio talk" />,
```

- [ ] **Step 3: Share the close slide.** Replace `CloseSlide` with:

```tsx
function CloseSlide({ id, headline, note }: { id: 'close' | 'about-close'; headline: ReactNode; note?: string }) {
  return (
    <SlideFrame id={id}>
      <div className="grid h-full grid-cols-12 gap-x-6">
        <h2 className="col-span-6 self-center text-[140px] font-semibold leading-none tracking-tight">{headline}</h2>
        <ul className="col-span-6 col-start-7 self-center space-y-6 whitespace-nowrap text-[36px]">
          <li>{personalInfo.email}</li>
          <li>{strip(personalInfo.linkedin)}</li>
          <li>{strip(personalInfo.github)}</li>
          <li>{strip(personalInfo.portfolio)}</li>
          <li className="text-muted">CV: {strip(personalInfo.portfolio)}/resume</li>
          {note && <li className="whitespace-normal pt-4 text-[22px] text-muted">{note}</li>}
        </ul>
      </div>
    </SlideFrame>
  );
}
```

In `TECHNICAL`, replace `close: CloseSlide,` with:
```tsx
  close: () => <CloseSlide id="close" headline="Questions?" />,
```

- [ ] **Step 4: Add the `Points` helper** next to `Column`:

```tsx
// A ruled list of short statements, each with an optional bold lead-in.
function Points({ items }: { items: readonly { lead?: string; text: string }[] }) {
  return (
    <ul className="mt-14 border-t border-ink">
      {items.map(({ lead, text }) => (
        <li key={text} className="border-b border-rule py-6 text-[32px] leading-snug">
          {lead && <span className="font-semibold">{lead} </span>}
          {text}
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 5: Add the recruiter slides.** Paste these above the `TECHNICAL` record. The copy is verbatim from the spec, so do not reword it.

```tsx
// ── About me deck (/present/recruiter) ──

function AboutWhy() {
  return (
    <SlideFrame id="about-why">
      <Headline>I want to build products that solve a real problem, and keep growing.</Headline>
      <Points
        items={[
          { lead: "Solve the user's problem.", text: 'Start from what actually hurts.' },
          { lead: 'Built to grow.', text: 'Easy to extend and scale as needs change.' },
          { lead: 'Worth keeping.', text: 'Software with lasting value, not a one-off.' },
        ]}
      />
    </SlideFrame>
  );
}

function AboutStart() {
  return (
    <SlideFrame id="about-start" caption="B.Eng. Computer Engineering · Second-Class Honours · 2025">
      <Headline>I practised working with product owners while I was still a student.</Headline>
      <p className="mt-6 text-[22px] tabular-nums text-muted">
        Work-study scholarship · Faculty of Engineering, Chiang Mai University · 2023 – 2025
      </p>
      <Points
        items={[
          {
            text: 'I wanted to learn two things: turning a pain point into requirements and a design, and building the whole stack: back end, front end, Docker and networking.',
          },
          {
            text: 'We were a team of two. I was the full-stack developer and PM; a friend was the UX/UI designer and BA.',
          },
        ]}
      />
    </SlideFrame>
  );
}

function AboutUsers() {
  return (
    <SlideFrame id="about-users" caption="Built with Go · React · TypeScript · PostgreSQL · Docker">
      <Headline>We shipped two apps the faculty used.</Headline>
      <div className="mt-14 grid grid-cols-2 gap-x-16">
        <Column
          title="Certificate approvals"
          items={['A paper process became a multi-stage online workflow.', 'Turnaround went from weeks to days.']}
        />
        <Column
          title="SD-Booking"
          items={[
            'The room booking system the faculty uses for daily scheduling, still in use today.',
            'It stops two people booking the same room.',
          ]}
        />
      </div>
    </SlideFrame>
  );
}

function AboutSpec() {
  return (
    <SlideFrame id="about-spec" caption="Built with Go · Kafka · PostgreSQL · AWS · Next.js">
      <Headline>First, everyone agrees on what we are building.</Headline>
      <Points
        items={[
          { text: 'At SCB TechX I ran discovery for the AI cost management module of our agentic AI platform.' },
          { text: 'I wrote the requirements, module spec and service design for the product owner and engineering manager.' },
          { text: 'Every feature has acceptance criteria, so we know how to check it is right before we build it.' },
        ]}
      />
    </SlideFrame>
  );
}

// Stage, and who signs it off when a person does.
const FLOW = [
  ['Requirement'],
  ['PRD', 'Product owner, engineering manager'],
  ['Design spec', 'The team'],
  ['Stories'],
  ['Tasks'],
  ['Tests'],
  ['Code'],
  ['Review', 'Merge: a reviewer'],
  ['Deliver ↺'],
] as const;

function AboutFlow() {
  return (
    <SlideFrame
      id="about-flow"
      caption="With a small team, AI agents do the drafting. A person signs off at each gate, and each sprint repeats the loop."
    >
      <Headline>AI drafts. People decide.</Headline>
      <ol className="mt-16 grid grid-cols-9 gap-x-3">
        {FLOW.map(([stage, gate], i) => (
          <li key={stage} className="border-t border-ink pt-4">
            <span className="block text-[22px] tabular-nums text-muted">{i + 1}</span>
            <span className={gate ? 'mt-2 block text-[28px] font-semibold leading-tight' : 'mt-2 block text-[28px] font-medium leading-tight text-muted'}>
              {stage}
            </span>
            {gate && (
              <span className="mt-6 block border-t border-rule pt-3 text-[22px] leading-snug">
                <span className="block font-semibold">Signed off</span>
                {gate}
              </span>
            )}
          </li>
        ))}
      </ol>
    </SlideFrame>
  );
}

function AboutReview() {
  return (
    <SlideFrame id="about-review">
      <Headline>What happens when AI writes code faster than people can review it?</Headline>
      <Points
        items={[
          { lead: 'One standard.', text: 'I wrote reusable AI skills for repeated work and shared them with the team.' },
          { lead: 'Tests come first.', text: 'Every change must pass its tests and a coverage gate.' },
          {
            lead: 'AI reviews, people verify.',
            text: 'I built an AI-assisted review workflow, reviewer agents plus a verifier. The team adopted it, and it catches bugs human reviewers missed.',
          },
        ]}
      />
    </SlideFrame>
  );
}

const TOOLKIT = [
  ['Back end', 'Go · Ruby on Rails · PostgreSQL · Kafka', 'The services and data behind a product'],
  ['Front end', 'React · Next.js · TypeScript', 'The screens people use'],
  ['Cloud & ops', 'AWS · Docker · Kubernetes · Kong', 'Where it runs, and how it stays up'],
  ['Quality', 'Test-first · CI/CD · OpenTelemetry · Prometheus', 'How we know it works'],
  ['AI tools', 'Claude Code (daily) · also used Codex and Gemini', 'How I plan, build and review with AI'],
] as const;

function AboutToolkit() {
  return (
    <SlideFrame id="about-toolkit" caption="Full list in my CV">
      <Headline>What I build with</Headline>
      <ul className="mt-10 border-t border-ink">
        {TOOLKIT.map(([area, tools, gloss]) => (
          <li key={area} className="grid grid-cols-12 items-baseline gap-x-6 border-b border-rule py-4">
            <span className="col-span-3 text-[40px] font-semibold">{area}</span>
            <span className="col-span-9">
              <span className="block text-[32px] leading-snug">{tools}</span>
              <span className="block text-[22px] text-muted">{gloss}</span>
            </span>
          </li>
        ))}
      </ul>
    </SlideFrame>
  );
}

function AboutOutside() {
  return (
    <SlideFrame id="about-outside">
      <Headline>Outside work, I stream games and build tools for my own problems.</Headline>
      <Points
        items={[
          { lead: 'Twitch game streaming,', text: 'and a chat text-to-speech bot I built for it, with Thai and English voices.' },
          {
            lead: 'FitJourney:',
            text: 'a fitness app I built because no single tool tracked my workouts, meals and body metrics together.',
          },
        ]}
      />
    </SlideFrame>
  );
}

function AboutNext() {
  return (
    <SlideFrame id="about-next">
      <Headline>Next, I want to help teams bring AI into real work.</Headline>
      <Points
        items={[
          { text: 'I already work AI-first: AI helps me find ideas, plan, write specs, build, test and deliver.' },
          { text: 'I believe this is how most software work will be done from now on.' },
          { text: "I want a role where I bring that into other teams' daily work." },
        ]}
      />
    </SlideFrame>
  );
}

const RECRUITER: Record<DeckSlideId<'recruiter'>, ComponentType> = {
  'about-title': () => <TitleSlide id="about-title" label="About me" />,
  'about-why': AboutWhy,
  'about-start': AboutStart,
  'about-users': AboutUsers,
  'about-spec': AboutSpec,
  'about-flow': AboutFlow,
  'about-review': AboutReview,
  'about-toolkit': AboutToolkit,
  'about-outside': AboutOutside,
  'about-next': AboutNext,
  'about-close': () => (
    <CloseSlide
      id="about-close"
      headline={
        <>
          Thank you.
          <br />
          Questions?
        </>
      }
      note={`Technical deep dive: ${strip(personalInfo.portfolio)}/present/technical`}
    />
  ),
};
```

The flow slide's stage labels are real text in an `<ol>`, so screen readers read the figure as an ordered list. That covers the spec's text-equivalent requirement without a hidden duplicate.

- [ ] **Step 6: Complete `slidesFor`.** Replace the `COMPONENTS` and `slidesFor` block from Task 1 with:

```tsx
const COMPONENTS: Record<DeckId, Record<string, ComponentType>> = { recruiter: RECRUITER, technical: TECHNICAL };

export function slidesFor(deck: DeckId) {
  const slides: readonly { id: string; title: string }[] = DECKS[deck];
  return slides.map((s) => ({ id: s.id, title: s.title, Component: COMPONENTS[deck][s.id] }));
}

export const SLIDES = slidesFor('technical');
```

- [ ] **Step 7: Typecheck, build and run all checks.**

Run: `npx tsc --noEmit -p tsconfig.json && npm run build && npm run check:deck && npm run check:figure`
Expected: all pass. The `Record<DeckSlideId<'recruiter'>, …>` type makes `tsc` fail if any recruiter slide lacks a component.

- [ ] **Step 8: Commit.**

```bash
git add src/components/present/SlideFrame.tsx src/components/present/slides.tsx
git commit -m "feat: add the About me slides for recruiter rounds

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Routes, deck stage and chooser

**Files:**
- Modify: `src/components/Present.tsx` (whole file)
- Create: `src/components/present/DeckChooser.tsx`
- Modify: `src/App.tsx` (lazy imports; the `/present` route)
- Modify: `src/components/present/slides.tsx` (remove `SLIDES`)

**Interfaces:**
- Consumes: `slidesFor(deck: DeckId)` and `DECKS`/`isDeckId` from Tasks 1–2.
- Produces:
  - `Present.tsx`'s default export becomes the route component for `/present/:deck`;
  - `DeckChooser.tsx` exports `default function DeckChooser()`.

- [ ] **Step 1: Rewrite `src/components/Present.tsx`.** The stage logic is unchanged except for three things:
  - `TOTAL` and `SLIDES` become per-deck values;
  - `initialSlide` takes the total;
  - the default export reads the route parameter.

```tsx
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Maximize2, Minimize2, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { isDeckId, type DeckId } from './present/outline';
import { slidesFor } from './present/slides';

const DESIGN_W = 1920;
const DESIGN_H = 1080;

function initialSlide(total: number): number {
  const n = parseInt(new URLSearchParams(window.location.search).get('slide') ?? '', 10);
  return Number.isFinite(n) && n >= 1 && n <= total ? n - 1 : 0;
}

const chromeButton = 'grid h-9 w-9 place-items-center text-muted hover:text-ink disabled:opacity-30';

// /present/:deck. An unknown deck name goes back to the chooser.
export default function PresentRoute() {
  const { deck = '' } = useParams();
  return isDeckId(deck) ? <Present deck={deck} /> : <Navigate to="/present" replace />;
}

function Present({ deck }: { deck: DeckId }) {
  const slides = useMemo(() => slidesFor(deck), [deck]);
  const TOTAL = slides.length;
  const { theme, toggle } = useTheme();
  const [slide, setSlide] = useState(() => initialSlide(TOTAL));
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const stageRef = useRef<HTMLDivElement>(null);

  // Keep the place across a reload mid-talk.
  useEffect(() => {
    const { pathname, hash } = window.location;
    window.history.replaceState(window.history.state, '', `${pathname}?slide=${slide + 1}${hash}`);
  }, [slide]);

  const go = useCallback((index: number) => setSlide(Math.max(0, Math.min(TOTAL - 1, index))), [TOTAL]);
  const next = useCallback(() => setSlide((s) => Math.min(TOTAL - 1, s + 1)), [TOTAL]);
  const prev = useCallback(() => setSlide((s) => Math.max(0, s - 1)), []);
```

From here to the end of the component, keep the current file's body exactly as it is: the fullscreen toggle, the fit effect, the key handler and the JSX. Make only these four textual replacements inside it:
  - `SLIDES[slide].title` → `slides[slide].title`;
  - `{SLIDES.map(({ id, title, Component }, i) => (` → `{slides.map(({ id, title, Component }, i) => (`;
  - `{SLIDES.map(({ id }, i) => (` → `{slides.map(({ id }, i) => (`;
  - in the key-handler effect's dependency array, `[next, prev, go, toggleFullscreen]` → `[next, prev, go, toggleFullscreen, TOTAL]`, because the `End` key uses `TOTAL`.

- [ ] **Step 2: Remove `export const SLIDES = slidesFor('technical');`** from `slides.tsx`. Nothing imports it now.

- [ ] **Step 3: Create `src/components/present/DeckChooser.tsx`.**

```tsx
import { Link, Navigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { DECKS, type DeckId } from './outline';

const TALKS: { deck: DeckId; title: string; audience: string; detail: string }[] = [
  { deck: 'recruiter', title: 'About me', audience: 'For recruiter rounds', detail: 'about 10 minutes' },
  { deck: 'technical', title: 'Technical deep dive', audience: 'For technical rounds', detail: 'FinOps, API gateway, earlier systems' },
];

// /present: pick a talk. Links shared before the split (/present?slide=N) meant the technical deck.
export default function DeckChooser() {
  const { theme, toggle } = useTheme();
  const slide = new URLSearchParams(useLocation().search).get('slide');
  if (slide) return <Navigate to={`/present/technical?slide=${encodeURIComponent(slide)}`} replace />;

  return (
    <div className="min-h-screen bg-ground text-ink">
      <header className="flex h-12 items-center justify-between border-b border-rule px-4 lg:px-6">
        <Link to="/" className="flex items-center gap-1.5 text-sm text-muted hover:text-ink">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          <span>Portfolio</span>
        </Link>
        <button
          type="button"
          onClick={toggle}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          className="grid h-9 w-9 place-items-center text-muted hover:text-ink"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </header>
      <main className="mx-auto max-w-[1280px] px-4 py-12 md:px-6 md:py-16">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Two talks</h1>
        <ul className="mt-10 grid gap-10 md:grid-cols-2 md:gap-6">
          {TALKS.map((t) => (
            <li key={t.deck}>
              <Link to={`/present/${t.deck}`} className="group block border-t border-ink pt-6">
                <h2 className="text-2xl font-semibold tracking-tight">{t.title}</h2>
                <p className="mt-2 tabular-nums text-muted">
                  {t.audience} · {DECKS[t.deck].length} slides · {t.detail}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold group-hover:underline">
                  Open the talk
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
```

Focus styles come from the global `:focus-visible` rule in `src/index.css`, so the cards need no focus classes.

- [ ] **Step 4: Wire the routes in `src/App.tsx`.**
  - Under the existing `const Present = lazy(...)`, add:
```tsx
const DeckChooser = lazy(() => import('./components/present/DeckChooser'));
```
  - Replace the single `<Route path="/present" … />` block with the two routes below. They use the same `m.div` fade wrapper as the other routes, and a catch-all `:deck` route handles unknown names inside `PresentRoute`.
```tsx
              <Route
                path="/present"
                element={
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <DeckChooser />
                  </m.div>
                }
              />
              <Route
                path="/present/:deck"
                element={
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Present />
                  </m.div>
                }
              />
```

- [ ] **Step 5: Typecheck, build and run all checks.**

Run: `npx tsc --noEmit -p tsconfig.json && npm run build && npm run check:deck && npm run check:figure`
Expected: all pass.

- [ ] **Step 6: Verify routing in the preview (covers Review Focus 1–4).**

Run: `pkill -f "vite preview"; npm run build && npx vite preview --port 4173 --strictPort` (in the background).

Then save this as `$SCRATCH/routes.mjs` (any scratch directory outside the repo) and run it with `node $SCRATCH/routes.mjs`. It uses career-ops' Playwright install via `createRequire`:

```js
import { createRequire } from 'module';
const require = createRequire('/Users/xanta999flyhigh/Learning-space/Portfolio/career-ops/package.json');
const { chromium } = require('playwright');
const B = 'http://localhost:4173/Portfolio';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1186 } });
const visit = async (path) => {
  await page.goto('about:blank');
  await page.goto(B + path);
  await page.waitForTimeout(600);
  return { url: page.url().replace(B, ''), label: await page.locator('header [aria-live]').textContent().catch(() => null), h1: await page.locator('h1').first().textContent().catch(() => null) };
};
const cases = [
  ['/present', (r) => r.h1 === 'Two talks'],
  ['/present?slide=5', (r) => r.url.startsWith('/present/technical?slide=5') && r.label.includes('p. 5 / 12')],
  ['/present/recruiter', (r) => r.label.includes('p. 1 / 11')],
  ['/present/recruiter/', (r) => r.label.includes('p. 1 / 11')],
  ['/present/recruiter?slide=11', (r) => r.label.includes('p. 11 / 11')],
  ['/present/recruiter?slide=12', (r) => r.label.includes('p. 1 / 11')],
  ['/present/recruiter?slide=abc', (r) => r.label.includes('p. 1 / 11')],
  ['/present/technical?slide=12', (r) => r.label.includes('p. 12 / 12')],
  ['/present/foo', (r) => r.h1 === 'Two talks'],
];
let failed = 0;
for (const [path, ok] of cases) {
  const r = await visit(path);
  const pass = ok(r);
  if (!pass) failed++;
  console.log(pass ? '✓' : '✗', path, JSON.stringify(r));
}
await browser.close();
process.exit(failed ? 1 : 0);
```

Expected: nine `✓` lines and exit code 0.

Then press Back once after loading `/present?slide=5`, and check it does not return to `/present`. The redirect uses `replace`, so Back leaves the site or returns to the previous page.

The `/present/recruiter/` case covers the trailing slash that `public/404.html` adds on GitHub Pages. If it fails, change the route path to `/present/:deck/*`. Do not edit `404.html`.

- [ ] **Step 7: Commit.**

```bash
git add src/components/Present.tsx src/components/present/DeckChooser.tsx src/App.tsx src/components/present/slides.tsx
git commit -m "feat: serve the two talks at /present/recruiter and /present/technical

/present becomes a chooser. Old /present?slide=N links redirect to the
technical deck, which is what they pointed at.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Docs

**Files:**
- Modify: `PRODUCT.md:34` (Routes bullet), `PRODUCT.md:51` (Evidence on Hand)
- Modify: `CLAUDE.md` (Map, Gotchas)
- Modify: `DESIGN.md` (lines 189, 197, 300–306 and the slide components)
- Modify: `.impeccable/design.json` (lines 472 and 464, the deck sentences)

**Interfaces:** none. These are text edits.

- [ ] **Step 1: Edit `PRODUCT.md`.**
  - Replace the `/present` part of the Routes bullet (line 34) with: `` `/present` (a chooser for two talks on a fixed 1920×1080 canvas, built from React components: `/present/recruiter`, an 11-slide "About me" talk for recruiter rounds, and `/present/technical`, the 12-slide Contents and Chapters talk; both outlines are checked by `scripts/check-deck.mjs`) ``.
  - Under Evidence on Hand, add the bullet: `- Statements Panthaweekan approved on 2026-10-16 for the About me deck (why he builds software, the CMU work-study team and his PM role, the team's AI-first flow, reusable AI skills, Twitch streaming, what he wants next, AI tools used): recorded in docs/superpowers/specs/2026-10-16-two-deck-present-design.md. The PM role and AI tools are not yet in cv.tex.`

- [ ] **Step 2: Edit `CLAUDE.md`.**
  - In Map, replace the `/present` bullet's first line with: ``- `/present` is `components/present/DeckChooser.tsx`; `/present/recruiter` and `/present/technical` are `components/Present.tsx` (the stage, keys, chrome and `?slide=N`) plus `components/present/`:``.
  - In that bullet's sub-list, change `` `outline.ts`: slide order; `` to `` `outline.ts`: both decks' slide order (`DECKS`); ``.
  - In Gotchas, change "the contents page and every folio derive from `outline.ts`. Add or move slides there" to "contents pages and every folio derive from each deck's outline in `outline.ts` (`DECKS`). Slide ids must be unique across decks. Add or move slides there".

- [ ] **Step 3: Edit `DESIGN.md`.**
  - Line 189: change `The deck is a fixed 1920×1080 page with folios ("p. N / 12") and ultramarine chapter dividers.` to `Two decks share a fixed 1920×1080 page with folios ("p. N / {deck total}"): the technical talk has ultramarine chapter dividers; the About me talk has none.`
  - Line 197: change "in the deck, the three chapter dividers" to "in the technical deck, the three chapter dividers".
  - In Slide Folio (around line 300), after "Slides outside a chapter (contents, the "How I work" coda, close) carry the name instead;", add `as does every slide of the About me deck, which has no chapters;`.
  - After the Figure Slide Variants section, add:
```markdown
### About me Slides
- **Built-with caption:** a 22px muted line set above the folio rule ("Built with Go · React · …"). It is the only place a story slide names tools.
- **Toolkit rows:** under an ink rule, one hairline row per area: the area at 40px semibold in 3 columns, then the tools at 32px with a 22px muted gloss below in 9 columns.
- **Flow figure:** nine stages in a 9-column ordered list, each under an ink rule with a 22px muted number. Stages a person signs off are 28px semibold with a hairline-ruled 22px sign-off note; AI-drafted stages are 28px medium in muted. No arrows, dots or field: order comes from the numbers.
- **Points:** a ruled 32px list whose items may open with a semibold lead-in.
```

- [ ] **Step 4: Mirror the changes in `.impeccable/design.json`.**
  - Replace the string at line 472 with the new line-189 sentence from Step 3.
  - In the overview string on line 464, change `The deck is the report read aloud: numbered pages, a contents page, and an ultramarine divider opening each chapter.` to `The technical deck is the report read aloud: numbered pages, a contents page, and an ultramarine divider opening each chapter; the About me deck is the same page without chapters.`
  - Validate the JSON: `node -e "JSON.parse(require('fs').readFileSync('.impeccable/design.json','utf8'))"`. Expected: no output, exit code 0.

- [ ] **Step 5: Commit.**

```bash
git add PRODUCT.md CLAUDE.md DESIGN.md .impeccable/design.json
git commit -m "docs: record the two /present decks

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Visual verification

**Files:**
- Modify only if a screenshot shows a defect: `src/components/present/slides.tsx`, `src/components/present/DeckChooser.tsx`.

**Interfaces:** none.

- [ ] **Step 1: Start a fresh preview.**

Run: `pkill -f "vite preview"; npm run build && npx vite preview --port 4173 --strictPort` (in the background).

- [ ] **Step 2: Screenshot every recruiter slide in both themes (covers Review Focus 5).** Save this as `$SCRATCH/shots.mjs` and run `node $SCRATCH/shots.mjs $SCRATCH/shots`:

```js
import { createRequire } from 'module';
import { mkdirSync } from 'fs';
const require = createRequire('/Users/xanta999flyhigh/Learning-space/Portfolio/career-ops/package.json');
const { chromium } = require('playwright');
const out = process.argv[2];
mkdirSync(out, { recursive: true });
const B = 'http://localhost:4173/Portfolio';
const browser = await chromium.launch();
for (const theme of ['light', 'dark']) {
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1186 }, colorScheme: theme });
  const page = await ctx.newPage();
  await page.goto(B + '/present');
  await page.evaluate((t) => localStorage.setItem('theme', t), theme);
  for (let n = 1; n <= 11; n++) {
    await page.goto('about:blank');
    await page.goto(`${B}/present/recruiter?slide=${n}`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${out}/recruiter-${theme}-${String(n).padStart(2, '0')}.png` });
  }
  for (const [name, width] of [['chooser-375', 375], ['chooser-1280', 1280]]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('about:blank');
    await page.goto(`${B}/present`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${out}/${name}-${theme}.png`, fullPage: true });
    if (width === 375) {
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      console.log(overflow ? `✗ ${name}-${theme} scrolls horizontally` : `✓ ${name}-${theme} no horizontal scroll`);
    }
  }
  await page.setViewportSize({ width: 1920, height: 1186 });
  await ctx.close();
}
await browser.close();
```

`useTheme` stores the choice under the `theme` key. If the screenshots show it ignored, read `src/hooks/useTheme.ts` for the exact key and stored values, and fix the `localStorage.setItem` line.

- [ ] **Step 3: Read every PNG and check these points.**
  - **Text:** no text is clipped or overflows the 120px margins. Slide 6 must show all nine stages on one row, with no word cut. Slide 8 must keep all five rows above the caption and folio.
  - **Folios:** every content slide reads "Panthaweekan Somngam … p. N / 11".
  - **Captions:** built-with captions appear on slides 4 and 5 only. "Full list in my CV" appears on slide 8. The honours line appears on slide 3.
  - **Close slide:** slide 11 shows "Thank you. / Questions?" and the technical-deck line, with that line inside the right margin.
  - **Dark theme:** all text is legible.
  - **Chooser:** at 375px the cards stack with no horizontal scroll, and at 1280px they sit side by side.

- [ ] **Step 4: Fix defects, if any.**
  - **Slide 6:** if a stage label overflows its column, change `gap-x-3` to `gap-x-2` on the `<ol>`. If it still overflows, change the stage label size from `text-[28px]` to `text-[26px]` in both class strings. Do not go below 22px.
  - **Slide 8:** if the rows push into the caption, change `py-4` to `py-3` and the area label from `text-[40px]` to `text-[36px]`.
  - After any fix, rerun Task 3 Step 5 and Steps 2–3 here.

- [ ] **Step 5: Confirm the technical deck is unchanged.** Screenshot `/present/technical?slide=1`, `?slide=5` and `?slide=12` (light theme), then compare them against `main`:
  - run `git stash` (if needed) and `git switch main`;
  - build and preview, then take `/present?slide=1`, `?slide=5` and `?slide=12`;
  - switch back with `git switch feat/two-deck-present`.

  There must be no visible difference. Also confirm the home page's Figure 1 still animates.

- [ ] **Step 6: Commit fixes (only if Step 4 changed files).**

```bash
git add src/components/present/slides.tsx src/components/present/DeckChooser.tsx
git commit -m "fix: fit the About me flow and toolkit slides on the canvas

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 7: Final full check.**

Run: `npx tsc --noEmit -p tsconfig.json && npm run build && npm run check:deck && npm run check:figure && git status --short`
Expected: all checks pass, and `git status` shows only the pre-existing untracked `.impeccable/questions/` and `career-ops/`.
