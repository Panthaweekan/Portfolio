# Presentation Deck Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 22-slide dark HTML-string deck at `/present` with a 12-slide, presenter-led "Contents and Chapters" talk built from React components in the Annual Report style.

**Architecture:**
- A pure outline module (`src/components/present/outline.ts`) owns slide order, chapters and page numbers. A Node check verifies it.
- Slide components render inside a shared `SlideFrame`, with a full-field `Divider` for chapters, and read facts from `src/data/portfolio-data.ts`.
- `Present.tsx` keeps the deck engine and renders the new slides: 1920×1080 fit-to-viewport scaling, keys, fullscreen, `?slide=N`.
- The old HTML-string data, its golden snapshot and the unused icons are deleted.

**Tech Stack:** React 19, TypeScript (strict, `noUnusedLocals`), Vite 7, Tailwind 3 with the report tokens (`ground`, `ink`, `muted`, `rule`, `field`, `on-field`, `on-field-muted`, `max-w-measure`), lucide-react, the existing `useTheme`, `FigureOne`, `LayerFigure`.

**Spec:** `docs/superpowers/specs/2026-10-12-present-deck-redesign-design.md`. Also read before Task 1: `PRODUCT.md`, `DESIGN.md`, `.impeccable/surfaces/src-components-present-tsx.md` (the direction contract).

## Global Constraints

- **Repo and branch:** repo root `/Users/xanta999flyhigh/Learning-space/Portfolio`. Stack on branch `feat/annual-report-redesign`; the CV update, the home redesign and this deck ship as **one PR** (Task 7). Don't push before Task 7.
- **Canvas:** 1920×1080. 120px side margins, 96px top padding, 56px bottom padding, 24px gutter on a 12-column grid.
- **Type, at slide scale:**
  - Display: 140–220px. Slide headline: 72px.
  - **Body: at least 32px.**
  - Captions and folio: 22px.
  - Archivo only (already loaded globally). Use tabular figures for page numbers and dates.
- **Ultramarine** (`bg-field`) fills only the three chapter dividers and Figure 1. It is never an accent: no field-coloured buttons, rules, dots, progress fill or text.
- **Images:** the portrait (`public/present-icons/portrait.jpg`, 826×1240) is the only image. No emoji, no icon tiles, no mono "terminal" labels, no kicker labels above headings.
- **Copy:** plain first person, short sentences.
  - Facts must match `cv.tex` / `portfolio-data.ts`. Never use the old deck's extra claims: "rollout from Q1 2027", "HPA 3→10", "almost the full Kong Admin API", "zero-restart", "PT/UAT → prod", "FCM".
  - Public boundary: no internal repo names, ticket IDs, colleagues' names, security internals beyond what the CV states, or deployment state. The FinOps dashboard is "in review".
- **Contract:** never copy direction-contract text into source, comments or the DOM.
- **Commits:** every commit message ends with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **Deep link `?slide=N`:** `/Portfolio/present?slide=5` should open slide 5. Out-of-range or garbage values (`0`, `13`, `abc`) should open slide 1, not crash. Check: Task 5, Step 2.
2. **Contents numbers stay true:** if a slide is inserted later, the contents page and every folio must still show the real positions, so no number may be typed by hand. Check: Task 1 (outline check) and Task 5, Step 2 (DOM check).
3. **Small screens:** at 1280×720, a laptop with the browser chrome showing, the scaled 1920×1080 canvas must fit inside the stage with no scrollbars. The 32px body renders at about 18px there (the stage is about 614px tall, so the scale is about 0.57); record the measured value. Check: Task 5, Step 2.
4. **Hidden slides stay hidden from keyboard and screen reader:** off-screen slides are `inert`, so Tab never lands on a link inside an invisible slide. Check: Task 5, Step 2.
5. **Theme shared with the site:** toggling dark in the deck persists to `/` and back. With nothing saved, the deck follows the OS. Check: Task 5, Step 2.

## Shared commands

- **Typecheck:** `npx tsc --noEmit -p tsconfig.json`. Expected: no output, exit 0.
- **Build:** `npm run build`. Expected: ends with `✓ built in`.
- **Checks:**
  - `npm run check:figure` → `✓ figure clock OK`.
  - `npm run check:deck` → `✓ deck outline OK` from Task 1 on.
- **Preview:** `npm run build && npx vite preview --port 4173 --strictPort` in the background. URL: `http://localhost:4173/Portfolio/present`. Stop it with `pkill -f "vite preview"`.
- **Screenshots:** with `PW=career-ops/node_modules/.bin/playwright`, run `$PW screenshot --viewport-size=1920,1186 --wait-for-timeout=1200 "<url>" <file>`. The 1186px height is 1080 plus the chrome, so the slide renders at scale 1.
- **Browser checks:** use the Playwright MCP tools (`browser_navigate`, `browser_resize`, `browser_evaluate`, `browser_press_key`). Before a check that needs a fresh load, navigate to `about:blank` first. Same-URL hash or query navigation does not reload the bundle.

---

### Task 1: Deck outline and its check

**Files:**
- Create: `src/components/present/outline.ts`
- Modify: `scripts/check-deck.mjs` (full rewrite; the old golden check goes away)

**Interfaces:**
- Consumes: nothing.
- Produces, from `@/components/present/outline`:
  - `OUTLINE`: a readonly array of `{ id, kind, chapter?, title }`.
  - `type SlideId` (union of ids) and `type SlideKind = 'title' | 'contents' | 'divider' | 'content' | 'close'`.
  - `TOTAL_PAGES: number`.
  - `pageOf(id: SlideId | string): number`, 1-based; it throws on an unknown id.
  - `contents(): { numeral: string; title: string; page: number }[]`.
  - `chapterOf(id: SlideId): { numeral: string; title: string } | null`, the divider that owns a slide.

- [ ] **Step 1: Write the failing check — replace `scripts/check-deck.mjs`**

```js
// Deck outline check: slide order, chapters and page numbers.
// Contents and folios derive from this outline, so this is what keeps them true.
// Run: npm run check:deck
import { execFileSync } from 'child_process';
import { strict as assert } from 'assert';

execFileSync('node_modules/.bin/esbuild', [
  'src/components/present/outline.ts', '--format=esm', '--outfile=/tmp/deck-outline-check.mjs',
], { stdio: 'inherit' });

const { OUTLINE, TOTAL_PAGES, pageOf, contents, chapterOf } =
  await import('/tmp/deck-outline-check.mjs?' + Date.now());

assert.equal(TOTAL_PAGES, 12, 'a 10–15 minute talk: 12 slides');
assert.equal(new Set(OUTLINE.map((s) => s.id)).size, OUTLINE.length, 'slide ids are unique');
assert.equal(OUTLINE[0].kind, 'title');
assert.equal(OUTLINE[1].kind, 'contents');
assert.equal(OUTLINE.at(-1).kind, 'close');

assert.deepEqual(contents(), [
  { numeral: 'I', title: 'FinOps engine', page: 3 },
  { numeral: 'II', title: 'API gateway', page: 7 },
  { numeral: 'III', title: 'Earlier systems', page: 9 },
  { numeral: '', title: 'Close', page: 12 },
]);

// Every content slide belongs to the chapter of the divider before it.
for (const s of OUTLINE.filter((x) => x.kind === 'content')) {
  assert.ok(chapterOf(s.id), `${s.id} has a chapter`);
}
assert.deepEqual(chapterOf('finops-figure'), { numeral: 'I', title: 'FinOps engine' });
assert.deepEqual(chapterOf('how-i-work'), { numeral: 'III', title: 'Earlier systems' });
assert.equal(chapterOf('title'), null);

assert.equal(pageOf('close'), 12);
assert.throws(() => pageOf('nope'), /unknown slide/);

console.log('✓ deck outline OK');
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm run check:deck`
Expected: FAIL with esbuild `Could not resolve "src/components/present/outline.ts"`.

- [ ] **Step 3: Implement `src/components/present/outline.ts`**

```ts
// Slide order for /present. The contents page and every folio derive from it.

export type SlideKind = 'title' | 'contents' | 'divider' | 'content' | 'close';

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
  { id: 'earlier-two-up', kind: 'content', title: 'Two systems people use every day' },
  { id: 'how-i-work', kind: 'content', title: 'How I work' },
  { id: 'close', kind: 'close', title: 'Questions?' },
] as const satisfies readonly OutlineEntry[];

export type SlideId = (typeof OUTLINE)[number]['id'];

export const TOTAL_PAGES = OUTLINE.length;

export function pageOf(id: string): number {
  const index = OUTLINE.findIndex((s) => s.id === id);
  if (index < 0) throw new Error(`unknown slide: ${id}`);
  return index + 1;
}

export function chapterOf(id: string): { numeral: string; title: string } | null {
  const page = pageOf(id);
  for (let i = page - 1; i >= 0; i--) {
    const s: OutlineEntry = OUTLINE[i];
    if (s.kind === 'divider' && s.chapter) return { numeral: s.chapter, title: s.title };
    if (s.kind === 'title' || s.kind === 'contents') return null;
  }
  return null;
}

export function contents(): { numeral: string; title: string; page: number }[] {
  const chapters = OUTLINE.filter((s: OutlineEntry) => s.kind === 'divider').map((s: OutlineEntry) => ({
    numeral: s.chapter ?? '',
    title: s.title,
    page: pageOf(s.id),
  }));
  return [...chapters, { numeral: '', title: 'Close', page: pageOf('close') }];
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npm run check:deck`, then the typecheck.
Expected: `✓ deck outline OK`, and the typecheck is clean.

- [ ] **Step 5: Commit**

```bash
git add src/components/present/outline.ts scripts/check-deck.mjs
git commit -q -m "feat: add deck outline with derived contents and folios

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: A still Figure 1 for the slide

**Files:**
- Modify: `src/components/report/FigureOne.tsx`

**Interfaces:**
- Consumes: none new.
- Produces: `FigureOne({ still }: { still?: boolean })`. When `still` is true it renders `FINAL_FRAME` with no marker and no animation, exactly like reduced motion. The home page call `<FigureOne />` is unchanged.

- [ ] **Step 1: Write the failing check**

Run: `npx tsc --noEmit -p tsconfig.json` after adding this temporary line to the end of `src/components/report/FigureOne.tsx`:

```tsx
export const __stillCheck = <FigureOne still />;
```

Expected: FAIL with `Property 'still' does not exist on type 'IntrinsicAttributes'`. Delete the temporary line afterwards.

- [ ] **Step 2: Add the prop**

Change the signature and the motion flag:

```tsx
interface FigureOneProps {
  /** Render the final frame without animation (used on the deck slide). */
  still?: boolean;
}

export function FigureOne({ still = false }: FigureOneProps) {
  const reduceMotion = useReducedMotion() || still;
```

Leave the rest of the component as is: every use of `reduceMotion` already gives the static final state.

- [ ] **Step 3: Verify**

Run the typecheck, build and `npm run check:figure`. All clean. Then add the temporary line from Step 1 again, run the typecheck, and expect a pass. Delete the line.

- [ ] **Step 4: Commit**

```bash
git add src/components/report/FigureOne.tsx
git commit -q -m "feat: let Figure 1 render still for the deck

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Slide frame, chapter divider and the 12 slides

**Files:**
- Create: `src/components/present/SlideFrame.tsx`
- Create: `src/components/present/Divider.tsx`
- Create: `src/components/present/slides.tsx`

**Interfaces:**
- Consumes:
  - `OUTLINE`, `SlideId`, `TOTAL_PAGES`, `pageOf`, `chapterOf`, `contents` (Task 1);
  - `FigureOne({ still })` (Task 2);
  - `LayerFigure({ number, title, layers })` (existing);
  - `personalInfo`, `projects` from `@/data/portfolio-data`.
- Produces:
  - `SLIDES: { id: SlideId; title: string; Component: () => JSX.Element }[]`, in outline order;
  - `SlideFrame({ id, children })`;
  - `Divider({ id, subtitle, dates })`.

- [ ] **Step 1: Write the failing check**

Run: `npx tsc --noEmit -p tsconfig.json` after creating `src/components/present/slides.tsx` with only:

```tsx
import type { ComponentType } from 'react';
import type { SlideId } from './outline';

const COMPONENTS: Record<SlideId, ComponentType> = {};
export default COMPONENTS;
```

Expected: FAIL, because type `{}` is missing properties `title`, `contents`, `finops`, … The outline forces one component per slide.

- [ ] **Step 2: Create `src/components/present/SlideFrame.tsx`**

```tsx
import type { ReactNode } from 'react';
import { chapterOf, pageOf, TOTAL_PAGES, type SlideId } from './outline';

interface SlideFrameProps {
  id: SlideId;
  children: ReactNode;
}

// Content slide: margins, then a folio line with chapter and page number.
export function SlideFrame({ id, children }: SlideFrameProps) {
  const chapter = chapterOf(id);
  return (
    <div className="flex h-full flex-col bg-ground px-[120px] pb-[56px] pt-[96px] text-ink">
      <div className="min-h-0 flex-1">{children}</div>
      <div className="mt-10 flex items-baseline justify-between border-t border-rule pt-5 text-[22px] tabular-nums text-muted">
        <span>{chapter ? `${chapter.numeral} · ${chapter.title}` : 'Panthaweekan Somngam'}</span>
        <span>
          p. {pageOf(id)} / {TOTAL_PAGES}
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/present/Divider.tsx`**

```tsx
import { chapterOf, pageOf, TOTAL_PAGES, type SlideId } from './outline';

interface DividerProps {
  id: SlideId;
  subtitle: string;
  dates: string;
}

// Chapter opener: the ultramarine field fills the whole slide.
export function Divider({ id, subtitle, dates }: DividerProps) {
  const chapter = chapterOf(id);
  return (
    <div className="on-field flex h-full flex-col justify-between bg-field px-[120px] pb-[56px] pt-[96px] text-on-field">
      <span className="text-[220px] font-semibold leading-none tabular-nums">{chapter?.numeral}</span>
      <div>
        <h2 className="text-[112px] font-semibold leading-[1.02] tracking-tight">{chapter?.title}</h2>
        <p className="mt-6 max-w-[28ch] text-[44px] leading-snug">{subtitle}</p>
      </div>
      <div className="flex items-baseline justify-between border-t border-on-field-muted pt-5 text-[22px] tabular-nums text-on-field-muted">
        <span>{dates}</span>
        <span>
          p. {pageOf(id)} / {TOTAL_PAGES}
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Replace `src/components/present/slides.tsx` with the full slide set**

```tsx
import type { ComponentType, ReactNode } from 'react';
import { personalInfo, projects } from '@/data/portfolio-data';
import { FigureOne } from '@/components/report/FigureOne';
import { LayerFigure } from '@/components/report/LayerFigure';
import { Divider } from './Divider';
import { contents, OUTLINE, pageOf, TOTAL_PAGES, type SlideId } from './outline';
import { SlideFrame } from './SlideFrame';

const project = (id: string) => {
  const p = projects.find((x) => x.id === id);
  if (!p) throw new Error(`missing project ${id}`);
  return p;
};
const strip = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');
const PORTRAIT = `${import.meta.env.BASE_URL}present-icons/portrait.jpg`;

const Headline = ({ children }: { children: ReactNode }) => (
  <h2 className="text-[72px] font-semibold leading-[1.05] tracking-tight">{children}</h2>
);

function Column({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border-t border-ink pt-6">
      <h3 className="text-[40px] font-semibold">{title}</h3>
      <ul className="mt-6 space-y-5 text-[32px] leading-snug">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function TitleSlide() {
  return (
    <div className="relative h-full bg-ground text-ink">
      <div className="flex h-full w-[1200px] flex-col justify-between px-[120px] pb-[56px] pt-[96px]">
        <span className="text-[22px] tabular-nums text-muted">Portfolio talk · {personalInfo.cvUpdated}</span>
        <div>
          <h1 className="text-[140px] font-semibold leading-[0.98] tracking-tight">
            Panthaweekan
            <br />
            Somngam
          </h1>
          <p className="mt-10 max-w-[22ch] text-[52px] leading-tight">{personalInfo.positioning}</p>
          <p className="mt-8 text-[32px] text-muted">Associate Software Engineer · SCB TechX · Bangkok</p>
        </div>
        <span className="text-[22px] tabular-nums text-muted">
          p. {pageOf('title')} / {TOTAL_PAGES}
        </span>
      </div>
      <img
        src={PORTRAIT}
        alt="Illustrated portrait of Panthaweekan Somngam"
        className="absolute right-0 top-0 h-full w-[720px] object-cover"
      />
    </div>
  );
}

function ContentsSlide() {
  return (
    <SlideFrame id="contents">
      <Headline>Contents</Headline>
      <ol className="mt-14 border-t border-ink">
        {contents().map((c) => (
          <li key={c.title} className="grid grid-cols-12 items-baseline gap-x-6 border-b border-rule py-7">
            <span className="col-span-1 text-[40px] tabular-nums text-muted">{c.numeral}</span>
            <span className="col-span-9 text-[56px] font-semibold tracking-tight">{c.title}</span>
            <span className="col-span-2 text-right text-[40px] tabular-nums">p. {c.page}</span>
          </li>
        ))}
      </ol>
    </SlideFrame>
  );
}

function FinopsDivider() {
  return <Divider id="finops" subtitle="One LLM call becomes money" dates={`${project('finops').dateRange} · SCB TechX`} />;
}

function FinopsDiscovery() {
  return (
    <SlideFrame id="finops-discovery">
      <Headline>I started with the spec.</Headline>
      <div className="mt-14 grid grid-cols-12 gap-x-6">
        <p className="col-span-6 text-[40px] leading-snug">
          Before any code, I wrote the requirements, the module spec and the service topology for the product owner and
          the engineering manager.
        </p>
        <div className="col-span-5 col-start-8 border-t border-ink pt-6">
          <h3 className="text-[32px] font-semibold">The design call</h3>
          <p className="mt-4 text-[32px] leading-snug">
            Budget enforcement stays inside the platform. Only the platform can stop a step before it runs, so the
            engine observes and reports.
          </p>
        </div>
      </div>
    </SlideFrame>
  );
}

function FinopsFigure() {
  // FigureOne is sized for the web page; scale it to projection size.
  return (
    <SlideFrame id="finops-figure">
      <div className="origin-top-left scale-[1.3]" style={{ width: 1680 / 1.3, height: `${100 / 1.3}%` }}>
        <FigureOne still />
      </div>
    </SlideFrame>
  );
}

function FinopsBuilt() {
  return (
    <SlideFrame id="finops-built">
      <Headline>What I built, and how we work</Headline>
      <div className="mt-14 grid grid-cols-2 gap-x-16">
        <Column
          title="Built, with two teammates"
          items={[
            'A Go cost engine: OpenTelemetry usage signals from Kafka, priced with exact integer money at the rate in force.',
            "Attribution to each customer's organisation tree, multi-tenant on PostgreSQL.",
            'The console dashboard, from organisation down to one step of one run (in review).',
          ]}
        />
        <Column
          title="How we work"
          items={[
            'Architecture decision records',
            'Test-first, with a coverage gate',
            'Hexagonal layers held by lint',
            'AI-assisted pull-request review',
          ]}
        />
      </div>
    </SlideFrame>
  );
}

function GatewayDivider() {
  return (
    <Divider
      id="gateway"
      subtitle="Replacing a legacy gateway behind Kong"
      dates={`${project('gateway').dateRange} · handed over Sep 2026`}
    />
  );
}

function GatewayFix() {
  const gateway = project('gateway');
  return (
    <SlideFrame id="gateway-fix">
      <Headline>From an appliance to a service</Headline>
      <div className="mt-12 grid grid-cols-2 gap-x-16">
        <Column
          title="The pain with CA Layer7"
          items={[
            'Licences, not pods: capacity cost money',
            'A proprietary appliance, no GitOps',
            'Token logic trapped inside the gateway',
          ]}
        />
        <Column
          title="The fix I worked on"
          items={[
            'A Go token service behind Kong',
            'Config sync with diff and rollback (prototyped)',
            "Phased rollout across the migration's 30+ services",
          ]}
        />
      </div>
      {gateway.visualArch && (
        <div className="mt-6 origin-top-left scale-[1.25]" style={{ width: 1680 / 1.25 }}>
          <LayerFigure number={2} title="API gateway" layers={gateway.visualArch} />
        </div>
      )}
    </SlideFrame>
  );
}

function EarlierDivider() {
  return <Divider id="earlier" subtitle="From faculty tools to enterprise workflows" dates="2023 – 2025" />;
}

function EarlierTwoUp() {
  const assets = project('assets');
  const booking = project('sd-booking');
  return (
    <SlideFrame id="earlier-two-up">
      <Headline>Two systems people use every day</Headline>
      <div className="mt-14 grid grid-cols-2 gap-x-16">
        <div>
          <p className="text-[22px] tabular-nums text-muted">
            {assets.subtitle} · {assets.dateRange}
          </p>
          <Column
            title="Enterprise asset platform"
            items={[
              'Replaced Excel and MS Forms with one platform for the asset lifecycle',
              'Four request lifecycles, approval chains per role and step',
              'Six roles on Azure AD single sign-on; Excel and CSV reports',
            ]}
          />
        </div>
        <div>
          <p className="text-[22px] tabular-nums text-muted">
            {booking.subtitle} · {booking.dateRange} · still in daily use
          </p>
          <Column
            title="SD-Booking"
            items={[
              'Real-time room booking for the whole faculty',
              'Booking conflict detection and role-based access',
              'From stakeholder requirements to containerized deployment',
            ]}
          />
        </div>
      </div>
    </SlideFrame>
  );
}

const STEPS = [
  ['Write the spec first', 'FinOps: requirements, module spec and topology before the engine.'],
  ['Keep the core hexagonal and tested', 'Gateway, FinOps and SD-Booking keep business logic free of infrastructure.'],
  ['Ship in small, reviewed steps', 'A phased rollout for the gateway; test-first changes for FinOps.'],
  ['Own it after it ships', 'SD-Booking: from requirements to a tool still in daily use.'],
] as const;

function HowIWork() {
  return (
    <SlideFrame id="how-i-work">
      <Headline>How I work</Headline>
      <ol className="mt-12 border-t border-ink">
        {STEPS.map(([step, example], i) => (
          <li key={step} className="grid grid-cols-12 items-baseline gap-x-6 border-b border-rule py-6">
            <span className="col-span-1 text-[40px] tabular-nums text-muted">{i + 1}</span>
            <span className="col-span-5 text-[40px] font-semibold leading-tight">{step}</span>
            <span className="col-span-6 text-[32px] leading-snug text-muted">{example}</span>
          </li>
        ))}
      </ol>
    </SlideFrame>
  );
}

function CloseSlide() {
  return (
    <SlideFrame id="close">
      <div className="grid h-full grid-cols-12 gap-x-6">
        <h2 className="col-span-6 self-center text-[180px] font-semibold leading-none tracking-tight">Questions?</h2>
        <ul className="col-span-5 col-start-8 self-center space-y-6 text-[36px]">
          <li>{personalInfo.email}</li>
          <li>{strip(personalInfo.linkedin)}</li>
          <li>{strip(personalInfo.github)}</li>
          <li>{strip(personalInfo.portfolio)}</li>
          <li className="text-muted">CV: {strip(personalInfo.portfolio)}/resume</li>
        </ul>
      </div>
    </SlideFrame>
  );
}

const COMPONENTS: Record<SlideId, ComponentType> = {
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

export const SLIDES = OUTLINE.map((s) => ({ id: s.id, title: s.title, Component: COMPONENTS[s.id] }));
```

- [ ] **Step 5: Verify**

Run the typecheck and build. Both clean. Then `grep -nE "Q1 2027|HPA|Admin API|zero-restart|PT/UAT|FCM|TXAAP|nonprod" src/components/present` must print nothing.

- [ ] **Step 6: Commit**

```bash
git add src/components/present
git commit -q -m "feat: add deck slide frame, chapter divider and the 12 slides

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Rebuild `Present.tsx` around the new slides; delete the old deck

**Files:**
- Modify: `src/components/Present.tsx` (full rewrite)
- Delete: `src/data/present-slides.ts`, `src/data/present-chrome.ts`, `src/data/deck.golden.json`, `scripts/dump-golden.mjs`, `scripts/gen-slides.mjs`, and every file in `public/present-icons/` except `portrait.jpg`
- Modify: `package.json` (remove the `dump:deck-golden` script)

**Interfaces:**
- Consumes: `SLIDES` (Task 3), `useTheme` (existing).
- Produces: the default export `Present`, lazy-loaded by `App.tsx`, unchanged.

- [ ] **Step 1: Write the failing check**

Run: `grep -c "DECK_SLIDES\|present-slides" src/components/Present.tsx`
Expected: a count above 0, so the old deck is still wired in.

- [ ] **Step 2: Rewrite `src/components/Present.tsx`**

```tsx
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
        <div className="h-full bg-ink transition-[width] duration-300 ease-out" style={{ width: `${((slide + 1) / TOTAL) * 100}%` }} />
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
              className={`h-2 rounded-full transition-all ${i === slide ? 'w-5 bg-ink' : 'w-2 bg-rule'}`}
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
```

- [ ] **Step 3: Delete the old deck**

```bash
git rm -q src/data/present-slides.ts src/data/present-chrome.ts src/data/deck.golden.json scripts/dump-golden.mjs scripts/gen-slides.mjs
grep -rln "present-icons" src scripts index.html
```

Expected: only `src/components/present/slides.tsx`, because it references `portrait.jpg`. Then:

```bash
find public/present-icons -mindepth 1 -maxdepth 1 ! -name portrait.jpg -print0 | xargs -0 git rm -rq
ls public/present-icons
```

Expected: `portrait.jpg` only. In `package.json`, delete the line `"dump:deck-golden": "node scripts/dump-golden.mjs",`. Keep `check:deck`, which Task 1 rewrote.

- [ ] **Step 4: Verify**

Run the typecheck, build, `npm run check:deck` and `npm run check:figure`. All pass. `grep -rn "DECK_SLIDES\|present-slides\|present-chrome\|Space Grotesk" src` must print nothing.

- [ ] **Step 5: Commit**

```bash
git add -A src scripts public/present-icons package.json
git commit -q -m "feat: rebuild /present as a 12-slide report talk; remove the old deck

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Behaviour checks in the browser

**Files:**
- None, unless a check fails. A fix goes into the file that owns the behaviour, as its own commit.

**Interfaces:**
- Consumes: the built deck.
- Produces: verified behaviour for Review Focus 1–5.

- [ ] **Step 1: Start the preview**

Run: `npm run build && (npx vite preview --port 4173 --strictPort > /tmp/preview.log 2>&1 &) && sleep 3`

- [ ] **Step 2: Run the checks with the Playwright MCP tools**

1. **Deep link (Focus 1).** For each of `?slide=5`, `?slide=0`, `?slide=13`, `?slide=abc`: `browser_navigate` to `about:blank`, then to `http://localhost:4173/Portfolio/present<query>`, then `browser_evaluate`:
   `() => document.querySelector('section[aria-roledescription="slide"]:not([inert])').getAttribute('aria-label')`
   Expected: `5 of 12: One LLM call becomes money`, then `1 of 12: …` for each of the three invalid values.
2. **Contents true (Focus 2).** `browser_evaluate`:
   ```js
   () => {
     const labels = [...document.querySelectorAll('section[aria-roledescription="slide"]')].map((s) => s.getAttribute('aria-label'));
     const pageOfTitle = (t) => labels.findIndex((l) => l.endsWith(': ' + t)) + 1;
     const rows = [...document.querySelectorAll('section[aria-label^="2 of"] ol li')];
     return rows.map((li) => {
       const title = li.children[1].textContent;
       const shown = parseInt(li.children[2].textContent.replace('p. ', ''), 10);
       return { title, shown, real: title === 'Close' ? labels.length : pageOfTitle(title) };
     });
   }
   ```
   Expected: `shown === real` on every row.
3. **Keys.** Press `End` with `browser_press_key`, then evaluate the active label: expect `12 of 12: Questions?`. Then `Home` gives `1 of 12`, `3` gives `3 of 12`, `ArrowRight` gives `4 of 12`.
4. **Fit (Focus 3).** `browser_resize` to 1280×720, reload, then `browser_evaluate`:
   ```js
   () => {
     const stage = document.querySelector('main').getBoundingClientRect();
     const canvas = document.querySelector('main > div').getBoundingClientRect();
     const scale = canvas.width / 1920;
     return {
       fits: canvas.width <= stage.width + 1 && canvas.height <= stage.height + 1,
       scroll: document.documentElement.scrollHeight > innerHeight || document.documentElement.scrollWidth > innerWidth,
       bodyPx: +(32 * scale).toFixed(1),
     };
   }
   ```
   Expected: `fits: true`, `scroll: false`, `bodyPx` ≥ 18. Record the value. At 1280×720 the stage is about 612px tall, so the scale is about 0.57 and `bodyPx` is about 18. If it is lower, report it rather than shrinking the slides.
5. **Inert (Focus 4).** At slide 1, `browser_evaluate`:
   `() => [...document.querySelectorAll('section[aria-roledescription="slide"]')].filter((s) => !s.inert).length`
   Expected: `1`. Press `Tab` five times, then evaluate `document.activeElement.closest('section[inert]') === null`. Expected: `true`.
6. **Theme (Focus 5).** `browser_evaluate`: `() => { localStorage.removeItem('theme'); return true }`. Then `browser_emulate_media` `colorScheme: 'dark'`, navigate to `about:blank` and back to `/Portfolio/present`, and evaluate `document.documentElement.classList.contains('dark')`. Expected: `true`. Click the theme toggle and navigate to `/Portfolio/`. The `dark` class should be absent there. Reset with `browser_emulate_media` `colorScheme: null` and remove the saved theme.

- [ ] **Step 3: Stop the preview and record the results**

Run `pkill -f "vite preview"`. If any check failed, fix it in the owning file with a check that fails first, then rerun that check, then commit with message `fix: <what>` plus the trailer.

---

### Task 6: Inspect, review and document (Impeccable)

**Files:**
- Create: `.impeccable/review/deck-01.png` … `deck-12.png`, `deck-dark-01.png`, `deck-dark-03.png`, `deck-dark-05.png`
- Modify (via the documenter): `DESIGN.md`, `.impeccable/design.json`

- [ ] **Step 1: Capture every slide**

```bash
npm run build && (npx vite preview --port 4173 --strictPort > /tmp/preview.log 2>&1 &) && sleep 3
PW=career-ops/node_modules/.bin/playwright
for n in $(seq 1 12); do $PW screenshot --viewport-size=1920,1186 --wait-for-timeout=1200 "http://localhost:4173/Portfolio/present?slide=$n" .impeccable/review/deck-$(printf %02d $n).png >/dev/null 2>&1; done
for n in 1 3 5; do $PW screenshot --viewport-size=1920,1186 --wait-for-timeout=1200 --color-scheme=dark "http://localhost:4173/Portfolio/present?slide=$n" .impeccable/review/deck-dark-$(printf %02d $n).png >/dev/null 2>&1; done
```

Open every file once. Confirm each shows its slide fully, with nothing blank and no overflow past the folio line.

- [ ] **Step 2: Inspection round 1**

Critique the captures against the deck's direction contract and the spec's slide table:
- slides 5 and 8: do the scaled figures fit above the folio?
- slide 1: the portrait crop;
- body sizes of at least 32px.

Fix every material gap in one batch. Re-run the typecheck, build, `check:deck` and `check:figure`. Recapture.

- [ ] **Step 3: Detector**

Run:

```bash
"/Users/xanta999flyhigh/.claude/plugins/cache/impeccable/impeccable/4.3.1/skills/impeccable/scripts/impeccable" detect --json src/components/present src/components/Present.tsx
```

Fix the mechanical findings. List any you leave, with reasons.

- [ ] **Step 4: Inspection round 2 (the last)**

Confirm the round-1 fixes held. Then stop polishing.

- [ ] **Step 5: Finish reviewer**

Spawn `impeccable:impeccable-finish-reviewer` fresh, with no history. Give it:
- the request (redesign `/present` as the Contents and Chapters talk);
- the confirmed answers (live 10–15 minute talk, restyle and refresh, keep the portrait, the approved 12-slide outline, React components);
- the artifact paths;
- all 15 screenshot paths, all required;
- the direction contract `.impeccable/surfaces/src-components-present-tsx.md`;
- the detector leftovers;
- the craft floor at `/Users/xanta999flyhigh/.claude/plugins/cache/impeccable/impeccable/4.3.1/skills/impeccable/reference/craft-floor.md`;
- a note that this is a code-led build with no comp.

Act on its disposition (recapture, fix, rebuild or ship). Use at most two rounds, then put any open items to the user.

- [ ] **Step 6: Documenter**

Spawn `impeccable:impeccable-documenter`. Give it:
- the project root;
- the artifact paths;
- the deck contract;
- `PRODUCT.md`;
- the reference `/Users/xanta999flyhigh/.claude/plugins/cache/impeccable/impeccable/4.3.1/skills/impeccable/reference/document.md`;
- this instruction: update the existing `DESIGN.md` and `.impeccable/design.json` to add the deck surface (slide canvas, divider, folio, slide type scale). The write boundary is those two files only.

- [ ] **Step 7: Commit**

```bash
pkill -f "vite preview"
git add DESIGN.md .impeccable/design.json .impeccable/review/deck-*.png src
git commit -q -m "docs: record the deck in the design system; finish review fixes

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: One combined pull request

The user asked for the CV update, the home redesign and the deck to ship as one PR from `feat/annual-report-redesign` into `main`. Run this task **after** the executor's final whole-branch review and its fix pass, so the PR carries reviewed code.

**Files:** none.

- [ ] **Step 1: Final suite on the tree being shipped**

Run the typecheck, build, `npm run check:deck` and `npm run check:figure`. All pass. `git status --short` must list only the untracked `career-ops/` and `.impeccable/questions/`.

- [ ] **Step 2: Push the branch**

```bash
git push -u origin feat/annual-report-redesign
```

If the push is rejected, stop and report it. Never force-push.

- [ ] **Step 3: Open the PR**

```bash
gh pr create --base main --head feat/annual-report-redesign \
  --title "CV refresh, annual-report site redesign and new presentation deck" \
  --body "$(cat <<'EOF'
## Summary
- CV (cv.tex → public/cv.pdf): 1-page Oct 2026 update with FinOps work, gateway handover, ATS-safe typesetting; site data aligned to CV wording and unverified claims removed.
- Home and /resume: redesigned as "The Engineer's Annual Report" — Figure 1 (one LLM call becomes money), system chapters with architecture figures and deep links, record, skills, contact; theme shared with the deck.
- /present: rebuilt as a 12-slide Contents and Chapters talk (FinOps, API gateway, earlier systems) from React components reading portfolio data.
- Cleanup: unused components and Three.js, GSAP, Mermaid, Radix, CVA, clsx, tailwind-merge removed; old HTML-string deck and golden snapshot removed.
- Docs: PRODUCT.md, DESIGN.md, specs and plans under docs/superpowers/.

## Test plan
- [x] npx tsc --noEmit · npm run build · npm run check:figure · npm run check:deck
- [x] Browser checks: deep links (#gateway, ?slide=N), reduced motion, theme persistence, 390px phone, figure pause off-screen, deck keys and fit at 1280×720
- [x] Impeccable finish review (ship) and whole-branch code review
- [ ] Check /resume PDF renders in a real browser (headless Chromium has no PDF viewer)
- [ ] Merging deploys to GitHub Pages via the main-branch workflow

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Report the PR URL to the user. Do not merge: merging `main` deploys the site.
