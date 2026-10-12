# Annual Report Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the bento home page and restyle `/resume` as "The Engineer's Annual Report": a strict-grid, one-colour-field report whose first viewport shows one LLM call becoming money (Figure 1).

**Architecture:** One home route (`ReportHome`) composed from small report components (`Masthead`, `FigureOne`, `Chapter`, `LayerFigure`) that read only `src/data/portfolio-data.ts`. Figure 1's timing is a pure function (`src/lib/figureClock.ts`) checked by a Node script; the component only measures positions and renders frames. Theme, tokens and the font are global (`useTheme`, `src/index.css`, `tailwind.config.js`).

**Tech Stack:** React 19, TypeScript (strict, `noUnusedLocals`), Vite 7, Tailwind CSS 3, React Router 7, framer-motion (only `useReducedMotion` and the existing route fades), lucide-react icons, `@fontsource-variable/archivo`.

**Spec:** `docs/superpowers/specs/2026-10-12-annual-report-redesign-design.md`. Product truth: `PRODUCT.md`. Direction contract: `.impeccable/surfaces/src-app-tsx.md`. Read all three before Task 1.

## Global Constraints

- Repo root for every command: `/Users/xanta999flyhigh/Learning-space/Portfolio`. Branch: `feat/annual-report-redesign`. Never push.
- Light tokens: ground `#FAFAFA`, ink `#16181D`, muted `#555A66`, rule `#C9CDD6`, field `#1F3BD6`, on-field `#FFFFFF`, on-field-muted `#C7D0FF`.
- Dark tokens: ground `#0E1016`, ink `#E8EAF0`, muted `#A0A6B4`, rule `#2A2F3A`, field `#3550E8`, on-field `#FFFFFF`, on-field-muted `#D3DAFF`.
- Colour is committed: the field colour fills whole regions (Figure 1 panel, the contact close, primary buttons). Never use it for scattered accents, gradients or glows.
- One face: Archivo (`"Archivo Variable"`), flush left, body ≥ 16px, prose ≤ `68ch`. Use `tabular-nums` on dates and figures.
- No emoji, no icon tiles, no tech-logo grids, no gradient text, no cards with shadows, no kicker labels above headings. lucide-react icons only for the theme toggle and download.
- Copy: plain first person, short factual sentences, no hype words. Facts come only from `src/data/portfolio-data.ts`; `cv.tex` wording wins on any conflict.
- Public boundary for FinOps: employer, product, stack, what was built. Never write internal repo names, ticket IDs, colleagues' names, security internals, PR counts or deployment state. The dashboard is "in review".
- Figure 1 numbers are authored constants, labelled "Illustrative example".
- `/present` must not change: `npm run check:deck` passes and its screenshot matches the Task 1 baseline.
- Assets resolve under the `/Portfolio/` base path: use `${import.meta.env.BASE_URL}cv.pdf`, never `/cv.pdf`.
- Never copy text from the direction contract into source, comments, DOM, `data-*` attributes or metadata.
- The only new dependency is `@fontsource-variable/archivo`. CI builds with Node 20, so source and build config must not need anything newer.
- Every commit message ends with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **Deep link on first load:** opening `/Portfolio/#gateway` should scroll to the gateway chapter, already expanded, with its title not hidden under the sticky masthead. Check: Task 7, Step 6.
2. **Reduced motion:** with `prefers-reduced-motion: reduce`, Figure 1 should show the final state with all five values at full opacity, and no moving marker. Check: Task 6, Step 5.
3. **Theme choice survives reloads and routes:** the saved choice wins over the OS setting, with no light flash before dark on reload. `/present` keeps reading the same `theme` key. Check: Task 2, Step 7.
4. **390px phone:**
   - The masthead fits on one row with the CV button visible.
   - Figure 1's wrapped value text keeps the marker on the station dots.
   - Check: Task 5, Step 6 and Task 6, Step 5.
5. **Figure off-screen or tab hidden:** the animation stops, so it costs no CPU, and resumes on return. Check: Task 6, Step 5.

## Shared verification commands

- **Typecheck:** `npx tsc --noEmit -p tsconfig.json`. Expected: no output, exit 0. From Task 1 onward, any error is a failure.
- **Build:** `npm run build`. Expected: ends with `✓ built in`.
- **Deck guard:** `npm run check:deck`. Expected: `✓ deck equivalence OK — 16 slides match golden`.
- **Preview server:** run `npm run build && npx vite preview --port 4173 --strictPort` in the background. The site is then at `http://localhost:4173/Portfolio/`. Stop it at the end of each task.
- **Screenshot CLI:** `career-ops/node_modules/.bin/playwright` (relative to the repo root) exists on this machine. As a shorthand, define `PW=career-ops/node_modules/.bin/playwright`.
  - Desktop: `$PW screenshot --viewport-size=1440,900 --full-page --wait-for-timeout=1500 <url> <file>`
  - Dark theme: add `--color-scheme=dark`.
- **Behaviour checks:** use the Playwright MCP browser tools (`browser_navigate`, `browser_resize`, `browser_emulate_media`, `browser_evaluate`, `browser_take_screenshot`) with the exact snippets given in each task.

---

### Task 1: Remove dead code and unused heavy dependencies

The live import graph is `App → PortfolioBento → ui/Badge, ui/BentoCard`, `App → Resume → ui/button` and `App → Present`. Everything below is imported by nothing live. Deleting it now makes the typecheck clean (today it fails only inside `ThreeBackground.tsx`) and removes Three.js, GSAP and Mermaid.

**Files:**
- Delete: `src/components/Hero.tsx`, `About.tsx`, `Projects.tsx`, `Experience.tsx`, `Navbar.tsx`, `Footer.tsx`, `ThreeBackground.tsx`, `Particles.tsx`, `FloatingShapes3D.tsx`, `MermaidDiagram.tsx`, `AnimatedTimeline.tsx`, `AnimatedSkillBar.tsx`, `VisualArchDiagram.tsx`
- Delete: `src/components/ui/TechIcon.tsx`, `src/components/ui/typography.tsx`, `src/components/ui/card.tsx`, `src/hooks/use3DTilt.ts`
- Delete: `DESIGN_SYSTEM.md`
- Modify: `package.json`, `package-lock.json` (CI runs `npm ci`; leave `yarn.lock` alone)
- Create: `.impeccable/review/baseline-present-light.png`, `.impeccable/review/baseline-present-dark.png`

**Interfaces:**
- Consumes: none.
- Produces: a clean typecheck baseline that every later task keeps clean.

- [ ] **Step 1: Capture the `/present` baseline before any change**

```bash
mkdir -p .impeccable/review
npm run build && (npx vite preview --port 4173 --strictPort > /tmp/preview.log 2>&1 &) && sleep 3
PW=career-ops/node_modules/.bin/playwright
$PW screenshot --viewport-size=1440,900 --wait-for-timeout=1500 http://localhost:4173/Portfolio/present .impeccable/review/baseline-present-light.png
$PW screenshot --viewport-size=1440,900 --wait-for-timeout=1500 --color-scheme=dark http://localhost:4173/Portfolio/present .impeccable/review/baseline-present-dark.png
pkill -f "vite preview --port 4173"
```

Expected: both PNGs exist and show the first slide. Open them to confirm they are not blank.

- [ ] **Step 2: Prove that nothing live imports the files to delete**

```bash
for n in Hero About Projects Experience Navbar Footer ThreeBackground Particles FloatingShapes3D MermaidDiagram AnimatedTimeline AnimatedSkillBar VisualArchDiagram TechIcon typography card use3DTilt; do
  hits=$(grep -rlE "from ['\"][^'\"]*/$n['\"]" src | grep -vE "/(Hero|About|Projects|Experience|Navbar|Footer|ThreeBackground|Particles|FloatingShapes3D|MermaidDiagram|AnimatedTimeline|AnimatedSkillBar|VisualArchDiagram|TechIcon|typography|card|use3DTilt)\.tsx?$")
  echo "$n: ${hits:-none}"
done
```

Expected: every line ends with `none`. If any file is listed, stop and report it. Do not delete that component.

- [ ] **Step 3: Delete the files**

```bash
git rm -q src/components/{Hero,About,Projects,Experience,Navbar,Footer,ThreeBackground,Particles,FloatingShapes3D,MermaidDiagram,AnimatedTimeline,AnimatedSkillBar,VisualArchDiagram}.tsx \
  src/components/ui/{TechIcon,typography,card}.tsx src/hooks/use3DTilt.ts DESIGN_SYSTEM.md
```

- [ ] **Step 4: Uninstall the dependencies nothing imports any more**

```bash
grep -rlE "from ['\"](three|@react-three/|gsap|@gsap/|mermaid)" src || echo "no importers"
npm uninstall three @react-three/fiber @react-three/drei gsap @gsap/react mermaid
grep -nE "\"(three|@react-three|gsap|@gsap|mermaid|@types/three)" package.json || echo "removed"
```

Expected: `no importers`, then `removed`. If `@types/three` is listed, also run `npm uninstall @types/three`.

- [ ] **Step 5: Verify**

Run the typecheck, build and deck guard. Expected: the typecheck prints nothing and exits 0, the build succeeds, and the deck check passes.

- [ ] **Step 6: Commit**

```bash
git add -A src package.json package-lock.json; git add .impeccable/review/baseline-present-*.png
git commit -q -m "chore: remove unused components and Three.js/GSAP/Mermaid dependencies

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Report tokens, Archivo, and a shared theme hook

The page that still renders (`PortfolioBento`) will look unstyled after this task, because its old token classes disappear. That is expected on this branch: Task 5 replaces it.

**Files:**
- Modify: `src/index.css` (full rewrite)
- Modify: `tailwind.config.js` (full rewrite)
- Modify: `index.html` (meta copy, font links, pre-paint theme script)
- Modify: `src/main.tsx` (font import)
- Create: `src/hooks/useTheme.ts`
- Modify: `package.json` (add `@fontsource-variable/archivo`)

**Interfaces:**
- Consumes: none.
- Produces:
  - `useTheme(): { theme: 'light' | 'dark'; toggle: () => void }` from `@/hooks/useTheme`.
  - Tailwind colours `ground`, `ink`, `muted`, `rule`, `field`, `on-field`, `on-field-muted`.
  - `maxWidth.measure` (`68ch`) and `fontFamily.sans` (Archivo).
  - The CSS class `.on-field`, which switches focus rings to white inside field-coloured regions.

- [ ] **Step 1: Install the font**

```bash
npm install @fontsource-variable/archivo
```

Expected: `package.json` lists `"@fontsource-variable/archivo"` under `dependencies`.

- [ ] **Step 2: Replace `src/index.css` with the report tokens**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --ground: #FAFAFA;
    --ink: #16181D;
    --muted: #555A66;
    --rule: #C9CDD6;
    --field: #1F3BD6;
    --on-field: #FFFFFF;
    --on-field-muted: #C7D0FF;
    color-scheme: light;
  }

  .dark {
    --ground: #0E1016;
    --ink: #E8EAF0;
    --muted: #A0A6B4;
    --rule: #2A2F3A;
    --field: #3550E8;
    --on-field: #FFFFFF;
    --on-field-muted: #D3DAFF;
    color-scheme: dark;
  }

  html {
    scroll-padding-top: 4.5rem; /* sticky masthead (3.5rem) + breathing room */
    scrollbar-color: var(--rule) var(--ground);
  }

  body {
    background-color: var(--ground);
    color: var(--ink);
    font-family: theme('fontFamily.sans');
    font-size: 1rem;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    background-color: var(--field);
    color: var(--on-field);
  }

  :focus-visible {
    outline: 2px solid var(--field);
    outline-offset: 3px;
  }

  .on-field :focus-visible {
    outline-color: var(--on-field);
  }

  a {
    text-underline-offset: 0.2em;
    text-decoration-thickness: 1px;
  }
}
```

- [ ] **Step 3: Replace `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Archivo Variable"', 'Archivo', 'system-ui', 'sans-serif'],
      },
      colors: {
        ground: 'var(--ground)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        rule: 'var(--rule)',
        field: 'var(--field)',
        'on-field': 'var(--on-field)',
        'on-field-muted': 'var(--on-field-muted)',
      },
      maxWidth: {
        measure: '68ch',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 4: Load the font in `src/main.tsx`**

Add this line directly above `import './index.css'`:

```ts
import '@fontsource-variable/archivo';
```

- [ ] **Step 5: Update `index.html`**

1. Replace the `description`, `og:description` and `twitter:description` `content` values with:
   `Panthaweekan Somngam, software engineer in Bangkok. I take systems from a written spec to running code: Go services, data pipelines and the dashboards on top.`
2. Replace `<meta name="theme-color" content="#9C83FF" />` with `<meta name="theme-color" content="#1F3BD6" />`.
3. Delete the whole Google Fonts block: the comment `<!-- Google Fonts: Montserrat & Roboto - Async Loading -->`, both `preconnect` links, the `<link ... media="print" ...>`, and the `<noscript>` block. `/present` loads its own fonts and is unaffected.
4. Directly after `<meta name="viewport" ... />`, add the pre-paint theme script:

```html
    <script>
      // Apply the saved theme (or the OS preference) before first paint.
      try {
        var t = localStorage.getItem('theme');
        if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
        }
      } catch (e) {}
    </script>
```

- [ ] **Step 6: Create `src/hooks/useTheme.ts`**

```ts
import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

// Same `theme` key the /present deck reads, so one choice follows the visitor.
function initialTheme(): Theme {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme(): { theme: Theme; toggle: () => void } {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggle = () =>
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      return next;
    });

  return { theme, toggle };
}
```

- [ ] **Step 7: Verify, including Review Focus 3**

Run the typecheck, build and deck guard. Then start the preview server and run these checks with the Playwright MCP tools:

1. `browser_navigate` to `http://localhost:4173/Portfolio/`, then `browser_evaluate`:
   `() => { localStorage.setItem('theme','dark'); return true }`
2. `browser_navigate` to the same URL again, then `browser_evaluate`:
   `() => document.documentElement.classList.contains('dark')`
   Expected: `true`. The pre-paint script applied the saved choice.
3. `browser_evaluate`:
   `() => getComputedStyle(document.body).fontFamily`
   Expected: the string starts with `"Archivo Variable"`.
4. `browser_evaluate`:
   `() => { localStorage.removeItem('theme'); return true }`

Stop the preview server.

- [ ] **Step 8: Commit**

```bash
git add src/index.css tailwind.config.js index.html src/main.tsx src/hooks/useTheme.ts package.json package-lock.json
git commit -q -m "feat: add annual-report tokens, Archivo and shared theme hook

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Figure 1 clock (pure timing function)

**Files:**
- Create: `src/lib/figureClock.ts`
- Create: `scripts/check-figure-clock.mjs`
- Modify: `package.json` (script `check:figure`)

**Interfaces:**
- Consumes: none.
- Produces, from `@/lib/figureClock`:
  - `STATION_COUNT` (5), `SEGMENT_MS` (1500), `HOLD_MS` (2000), `LOOP_MS` (8000)
  - `interface FigureFrame { segment: number; fraction: number; active: number; revealed: number }`
  - `FINAL_FRAME: FigureFrame`
  - `frameAt(elapsedMs: number): FigureFrame`

- [ ] **Step 1: Write the failing check `scripts/check-figure-clock.mjs`**

```js
// Figure 1 clock check: the timeline that drives the marker and the reveals.
// Run: npm run check:figure
import { execFileSync } from 'child_process';
import { strict as assert } from 'assert';

execFileSync('node_modules/.bin/esbuild', [
  'src/lib/figureClock.ts', '--format=esm', '--outfile=/tmp/figure-clock-check.mjs',
], { stdio: 'inherit' });

const { frameAt, FINAL_FRAME, LOOP_MS, SEGMENT_MS, STATION_COUNT } =
  await import('/tmp/figure-clock-check.mjs?' + Date.now());

assert.equal(STATION_COUNT, 5);
assert.equal(LOOP_MS, 8000);

// Start: on segment 0, the first station shown, the second one marked next.
assert.deepEqual(frameAt(0), { segment: 0, fraction: 0, active: 1, revealed: 1 });

// Damped easing: past halfway at half the segment time, not yet arrived.
const mid = frameAt(SEGMENT_MS / 2);
assert.equal(mid.segment, 0);
assert.ok(mid.fraction > 0.5 && mid.fraction < 1, `eased fraction was ${mid.fraction}`);

// Arrival at station 1 reveals it and marks station 2.
assert.deepEqual(frameAt(SEGMENT_MS), { segment: 1, fraction: 0, active: 2, revealed: 2 });

// Hold: everything shown until the loop restarts.
assert.deepEqual(frameAt(4 * SEGMENT_MS), FINAL_FRAME);
assert.deepEqual(frameAt(LOOP_MS - 1), FINAL_FRAME);
assert.deepEqual(FINAL_FRAME, { segment: 3, fraction: 1, active: 4, revealed: 5 });

// Loop and negative time both wrap.
assert.deepEqual(frameAt(LOOP_MS), frameAt(0));
assert.deepEqual(frameAt(-1), FINAL_FRAME);

// The marker never moves backwards within one loop.
let previous = -1;
for (let t = 0; t < 4 * SEGMENT_MS; t += 50) {
  const f = frameAt(t);
  const position = f.segment + f.fraction;
  assert.ok(position >= previous, `marker moved backwards at ${t}ms`);
  previous = position;
}

console.log('✓ figure clock OK');
```

Add the script to `package.json` under `"scripts"`, after `"check:deck"`:

```json
    "check:figure": "node scripts/check-figure-clock.mjs",
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm run check:figure`
Expected: FAIL. esbuild reports `Could not resolve "src/lib/figureClock.ts"`, or the file is reported as not found.

- [ ] **Step 3: Implement `src/lib/figureClock.ts`**

```ts
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

// Damped: quick start, long settle, no overshoot.
const easeOut = (x: number) => 1 - Math.pow(1 - x, 4);

export function frameAt(elapsedMs: number): FigureFrame {
  const t = ((elapsedMs % LOOP_MS) + LOOP_MS) % LOOP_MS;
  const travel = SEGMENT_MS * (STATION_COUNT - 1);
  if (t >= travel) return FINAL_FRAME;
  const segment = Math.floor(t / SEGMENT_MS);
  const fraction = easeOut((t - segment * SEGMENT_MS) / SEGMENT_MS);
  return { segment, fraction, active: segment + 1, revealed: segment + 1 };
}
```

- [ ] **Step 4: Run it to verify it passes**

Run `npm run check:figure`, then the typecheck.
Expected: `✓ figure clock OK`, and the typecheck is clean.

- [ ] **Step 5: Commit**

```bash
git add src/lib/figureClock.ts scripts/check-figure-clock.mjs package.json
git commit -q -m "feat: add Figure 1 clock with a runnable check

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Data for the report

**Files:**
- Modify: `src/data/portfolio-data.ts`

**Interfaces:**
- Consumes: none.
- Produces:
  - `PersonalInfo` gains `positioning: string`, `intro: string` and `cvUpdated: string`.
  - `Project` gains `id: string`, a stable anchor.
  - `projects` starts with the FinOps entry (`id: "finops"`). The other ids, in order, are `gateway`, `assets`, `sd-booking`, `fitjourney`, `tts`.

- [ ] **Step 1: Write the failing check**

Run:

```bash
grep -c 'id: "' src/data/portfolio-data.ts; npx tsc --noEmit -p tsconfig.json; echo exit $?
```

Expected: `0` ids, so the requirement is not met yet. Record that.

- [ ] **Step 2: Extend the interfaces**

In `PersonalInfo`, add these lines after `aboutSummary: string;`:

```ts
  /** One-line positioning shown first on the home page. */
  positioning: string;
  /** First-person introduction under the positioning line. */
  intro: string;
  /** Month the CV PDF was last updated, shown on /resume. */
  cvUpdated: string;
```

In `Project`, add this as the first field:

```ts
  /** Stable anchor id for deep links, e.g. "finops" → /#finops */
  id: string;
```

- [ ] **Step 3: Fill the new personal fields**

In `personalInfo`, after `aboutSummary: ...,` add:

```ts
  positioning: "I take systems from a written spec to running code.",
  intro:
    "I'm an Associate Software Engineer at SCB TechX in Bangkok. Since September 2026 I've been building the FinOps engine for TechX's agentic AI platform: it works out what every LLM call costs and shows customers where that money went.",
  cvUpdated: "October 2026",
```

- [ ] **Step 4: Add the FinOps project first, and ids for the others**

Insert this object as the first element of `projects`, directly after `export const projects: Project[] = [`:

```ts
  {
    id: "finops",
    title: "FinOps Engine — Agentic AI Platform",
    subtitle: "SCB TechX",
    dateRange: "Sep 2026 – Present",
    status: "In progress",
    technologies: ["Go", "Kafka", "OpenTelemetry", "PostgreSQL", "AWS", "Next.js", "TypeScript"],
    description: "Ran discovery for the FinOps module of SCB TechX's agentic AI platform, then built, with two teammates, the Go engine that prices every LLM call and the console dashboard that shows customers where that money went.",
    highlights: [
      "Ran discovery for the FinOps module of SCB TechX's agentic AI platform: wrote the requirements, module spec, and service topology for the product owner and engineering manager, and made the case that budget enforcement must stay inside the platform.",
      "Designed and built, with two teammates, a Go cost engine that ingests OpenTelemetry LLM-usage signals from Kafka, prices each call with exact integer money at the price and FX rate in force, and attributes it to the customer's organisation tree — redelivery-safe, with retry and dead-letter topics, multi-tenant on PostgreSQL with AWS IAM database authentication.",
      "Built the platform side of the integration: a typed reports port in the Next.js console and an AI cost dashboard that drills from organisation to team, project, workflow, run, and step-level trace (in review).",
      "Set the team's engineering practices: architecture decision records, test-first development with a coverage gate, lint-enforced hexagonal layering, and an AI-assisted pull-request review workflow (multiple reviewer agents plus a verifier) used on teammates' changes."
    ],
    visualArch: [
      { name: "Platform", nodes: [{ label: "Agent step", sublabel: "emits a usage signal per LLM call", color: "#1F3BD6" }] },
      { name: "Ingestion", nodes: [{ label: "Collector", color: "#1F3BD6" }, { label: "Kafka", sublabel: "usage, retry and dead-letter topics", color: "#1F3BD6" }] },
      { name: "FinOps engine (Go)", nodes: [{ label: "Pricing", sublabel: "price and FX rate in force", color: "#1F3BD6" }, { label: "Attribution", sublabel: "organisation tree", color: "#1F3BD6" }, { label: "Reports API", color: "#1F3BD6" }] },
      { name: "Data", nodes: [{ label: "PostgreSQL", sublabel: "multi-tenant", color: "#1F3BD6" }] },
      { name: "Console", nodes: [{ label: "AI cost dashboard", sublabel: "organisation down to one step (in review)", color: "#1F3BD6" }] },
    ],
  },
```

`ArchNode.color` is still required here; Task 7 strips `color`, `iconUrl` and `iconEmoji` from every node and from the type.

Then add an `id` line as the first field of each existing project. Match by its `title`:

| `title` starts with | add |
| --- | --- |
| `"API Gateway Microservice"` | `id: "gateway",` |
| `"Inventory Asset Management System"` | `id: "assets",` |
| `"SD-Booking` | `id: "sd-booking",` |
| `"FitJourney` | `id: "fitjourney",` |
| `"Twitch Chat TTS Bot"` | `id: "tts",` |

- [ ] **Step 5: Remove placeholder links**

The internal projects link to the bare GitHub profile and `"#"`, which misleads visitors. The side projects use the same URL for `demo` and `github`. Delete these exact lines:

```bash
perl -0pi -e 's/\n\s*github: "https:\/\/github\.com\/Panthaweekan",//g; s/\n\s*demo: "#",//g; s/\n\s*demo: "https:\/\/github\.com\/Panthaweekan\/(FitJourney|tts)",//g' src/data/portfolio-data.ts
grep -nE 'demo:|github: "https://github.com/Panthaweekan"' src/data/portfolio-data.ts || echo "clean"
```

Expected: `clean`. FitJourney keeps `github: ".../FitJourney"` and the TTS bot keeps `github: ".../tts"`.

- [ ] **Step 6: Verify**

```bash
grep -c '^    id: "' src/data/portfolio-data.ts
grep -nE 'repo|TXAAP|Supitcha|Supachok|Siriwat|nonprod|RLS|row-level' src/data/portfolio-data.ts || echo "boundary ok"
```

Expected: `6`, then `boundary ok`. Then run the typecheck and build: both clean.

- [ ] **Step 7: Commit**

```bash
git add src/data/portfolio-data.ts
git commit -q -m "feat: add FinOps project, anchors and report copy to portfolio data

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Masthead and the report home page (without Figure 1 and chapters)

This task swaps the `/` route to `ReportHome` and deletes the bento page. The first viewport's right column is empty until Task 6. The Systems section is an empty heading until Task 7.

**Files:**
- Create: `src/components/report/Masthead.tsx`
- Create: `src/components/report/ReportHome.tsx`
- Modify: `src/App.tsx`
- Delete: `src/components/PortfolioBento.tsx`, `src/components/ui/Badge.tsx`, `src/components/ui/BentoCard.tsx`
- Modify: `src/data/portfolio-data.ts` (delete the bento helpers)

**Interfaces:**
- Consumes: `useTheme` (Task 2); `personalInfo.positioning`, `intro`, `email`, `linkedin`, `github`, `location`, `availability`; `experiences`; `technicalSkills`; `education` (Task 4).
- Produces:
  - `Masthead({ page }: { page: 'home' | 'resume' })`
  - `ReportHome()`
  - Section ids `systems`, `record`, `skills`, `contact`, and `main` for the skip link.

- [ ] **Step 1: Create `src/components/report/Masthead.tsx`**

```tsx
import { Link } from 'react-router-dom';
import { Download, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { personalInfo } from '@/data/portfolio-data';

const CV_URL = `${import.meta.env.BASE_URL}cv.pdf`;

const SECTIONS = [
  { href: '#systems', label: 'Systems' },
  { href: '#record', label: 'Record' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

const linkClass = 'text-sm text-muted hover:text-ink hover:underline';

interface MastheadProps {
  page: 'home' | 'resume';
}

export function Masthead({ page }: MastheadProps) {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-20 border-b border-rule bg-ground">
      <div className="mx-auto flex h-14 max-w-[80rem] items-center gap-6 px-6 md:px-10">
        <Link to="/" className="font-semibold tracking-tight">
          {personalInfo.shortName}
        </Link>

        {page === 'home' && (
          <nav aria-label="Sections" className="hidden items-center gap-5 md:flex">
            {SECTIONS.map((s) => (
              <a key={s.href} href={s.href} className={linkClass}>
                {s.label}
              </a>
            ))}
          </nav>
        )}

        <div className="ml-auto flex items-center gap-4">
          {page === 'home' && (
            <details className="relative md:hidden">
              <summary className={`${linkClass} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}>Menu</summary>
              <nav
                aria-label="Sections"
                className="absolute right-0 mt-3 flex w-44 flex-col gap-3 border border-rule bg-ground p-4"
                onClick={(e) => e.currentTarget.closest('details')?.removeAttribute('open')}
              >
                {SECTIONS.map((s) => (
                  <a key={s.href} href={s.href} className={linkClass}>
                    {s.label}
                  </a>
                ))}
                <Link to="/present" className={linkClass}>
                  Presentation
                </Link>
              </nav>
            </details>
          )}

          {page === 'resume' && (
            <Link to="/" className={linkClass}>
              Portfolio
            </Link>
          )}

          <Link to="/present" className={`${linkClass} hidden md:inline`}>
            Presentation
          </Link>

          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="grid h-9 w-9 place-items-center text-muted hover:text-ink"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href={CV_URL}
            download="Panthaweekan_Somngam_CV.pdf"
            aria-label="Download CV (PDF)"
            className="inline-flex h-9 items-center gap-2 bg-field px-3 text-sm font-semibold text-on-field hover:opacity-90 sm:px-4"
          >
            <Download className="h-4 w-4" aria-hidden />
            <span className="sm:hidden">CV</span>
            <span className="hidden sm:inline">Download CV</span>
          </a>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Create `src/components/report/ReportHome.tsx`**

```tsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { education, experiences, personalInfo, technicalSkills } from '@/data/portfolio-data';
import { Masthead } from './Masthead';

const CV_URL = `${import.meta.env.BASE_URL}cv.pdf`;

const sectionTitle = 'text-3xl font-semibold tracking-tight';

export function ReportHome() {
  // Content renders after load, so the browser's own hash jump misses it.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-30 focus:bg-ground focus:p-2"
      >
        Skip to content
      </a>
      <Masthead page="home" />

      <main id="main">
        <div className="mx-auto max-w-[80rem] px-6 md:px-10">
          <section
            aria-labelledby="intro-title"
            className="grid grid-cols-12 gap-x-6 gap-y-10 py-10 md:min-h-[calc(100svh-3.5rem)] md:py-12"
          >
            <div className="col-span-12 flex flex-col justify-center md:col-span-5">
              <h1 id="intro-title" className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
                {personalInfo.name}
              </h1>
              <p className="mt-6 text-2xl leading-snug md:text-[1.75rem]">{personalInfo.positioning}</p>
              <p className="mt-6 max-w-measure text-muted">{personalInfo.intro}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href={CV_URL}
                  download="Panthaweekan_Somngam_CV.pdf"
                  className="inline-flex h-11 items-center bg-field px-5 font-semibold text-on-field hover:opacity-90"
                >
                  Download CV
                </a>
                <a href={`mailto:${personalInfo.email}`} className="font-semibold underline">
                  Email
                </a>
                <a href={personalInfo.linkedin} className="font-semibold underline">
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">{/* Figure 1: Task 6 */}</div>
          </section>

          <section id="systems" aria-labelledby="systems-title" className="border-t border-ink pt-12">
            <h2 id="systems-title" className={sectionTitle}>
              Systems
            </h2>
            <p className="mt-3 max-w-measure text-muted">Each chapter is one system I worked on, newest first.</p>
            {/* Chapters: Task 7 */}
          </section>

          <section id="record" aria-labelledby="record-title" className="border-t border-ink pb-16 pt-12">
            <h2 id="record-title" className={sectionTitle}>
              Record
            </h2>
            <table className="mt-6 w-full text-left">
              <thead className="text-sm text-muted">
                <tr>
                  <th scope="col" className="py-2 pr-6 font-normal">Role</th>
                  <th scope="col" className="py-2 pr-6 font-normal">Employer</th>
                  <th scope="col" className="hidden py-2 pr-6 font-normal md:table-cell">Location</th>
                  <th scope="col" className="py-2 text-right font-normal">Dates</th>
                </tr>
              </thead>
              <tbody>
                {experiences.map((e) => (
                  <tr key={e.title} className="border-t border-rule align-top">
                    <td className="py-3 pr-6 font-medium">{e.title}</td>
                    <td className="py-3 pr-6">{e.company}</td>
                    <td className="hidden py-3 pr-6 text-muted md:table-cell">{e.location}</td>
                    <td className="whitespace-nowrap py-3 text-right tabular-nums text-muted">{e.period}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section id="skills" aria-labelledby="skills-title" className="border-t border-ink pb-16 pt-12">
            <h2 id="skills-title" className={sectionTitle}>
              Skills
            </h2>
            <dl className="mt-6">
              {technicalSkills.map((c) => (
                <div key={c.name} className="grid grid-cols-12 gap-x-6 border-t border-rule py-3">
                  <dt className="col-span-12 text-sm text-muted sm:col-span-3">{c.name}</dt>
                  <dd className="col-span-12 sm:col-span-9">{c.items.map((i) => i.label).join(', ')}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="education-title" className="border-t border-ink pb-16 pt-12">
            <h2 id="education-title" className={sectionTitle}>
              Education
            </h2>
            <p className="mt-6 font-medium">{education.degree}</p>
            <p className="tabular-nums text-muted">
              {education.school} · {education.honours} · GPA {education.gpa} · {education.graduated}
            </p>
            <p className="mt-3 max-w-measure text-muted">Thesis: {education.thesis}</p>
          </section>
        </div>

        <section id="contact" aria-labelledby="contact-title" className="on-field bg-field text-on-field">
          <div className="mx-auto grid max-w-[80rem] grid-cols-12 gap-x-6 gap-y-8 px-6 py-20 md:px-10">
            <div className="col-span-12 md:col-span-6">
              <h2 id="contact-title" className="text-3xl font-semibold tracking-tight md:text-4xl">
                Contact
              </h2>
              <p className="mt-4 max-w-measure text-on-field-muted">
                I'm based in {personalInfo.location} and open to remote or hybrid roles.
              </p>
            </div>
            <ul className="col-span-12 space-y-3 text-lg md:col-span-6">
              <li><a href={`mailto:${personalInfo.email}`} className="underline">{personalInfo.email}</a></li>
              <li><a href={personalInfo.linkedin} className="underline">LinkedIn</a></li>
              <li><a href={personalInfo.github} className="underline">GitHub</a></li>
              <li><a href={CV_URL} download="Panthaweekan_Somngam_CV.pdf" className="underline">Download CV (PDF)</a></li>
              <li><Link to="/present" className="underline">Open the presentation</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
```

- [ ] **Step 3: Point `/` at `ReportHome` in `src/App.tsx`**

Replace `import { PortfolioBento } from './components/PortfolioBento';` with `import { ReportHome } from './components/report/ReportHome';`. Replace `<PortfolioBento />` with `<ReportHome />`. Replace the `LoadingSpinner` function body with:

```tsx
  return <div className="min-h-screen bg-ground" />;
```

- [ ] **Step 4: Delete the bento page and its helpers**

```bash
git rm -q src/components/PortfolioBento.tsx src/components/ui/Badge.tsx src/components/ui/BentoCard.tsx
grep -rlE "bentoGridSkillCategories|bentoBadgeSkillCategories|interests|ui/Badge|ui/BentoCard" src
```

The only file listed should be `src/data/portfolio-data.ts`. In that file, delete everything from the line `// ── Bento Grid Display Helpers` to the end of the file. That removes `bentoGridSkillCategories`, `bentoBadgeSkillCategories` and `interests`. Re-run the grep. Expected: no output.

- [ ] **Step 5: Typecheck and build**

Expected: both clean.

- [ ] **Step 6: Verify in the browser, including Review Focus 3 and 4**

Start the preview server, then:

1. Capture desktop screenshots:
   - `$PW screenshot --viewport-size=1440,900 --full-page --wait-for-timeout=1500 http://localhost:4173/Portfolio/ /tmp/t5-desktop.png`
   - The same command with `--color-scheme=dark` to `/tmp/t5-dark.png`
   - Open both. Expected: Archivo text on the ground colour, black rules over each section, the contact block in ultramarine, and no leftover purple or zinc styling.
2. Check the phone layout:
   - `browser_resize` to 390×844, `browser_navigate` to the site, then `browser_evaluate`:
     `() => { const h = document.querySelector('header > div'); return { overflow: h.scrollWidth > h.clientWidth, cv: !!document.querySelector('header a[download]')?.getBoundingClientRect().width } }`
   - Expected: `{ overflow: false, cv: true }`.
3. Check the theme toggle:
   - Click it with `browser_click` on the button whose accessible name starts with "Switch to", then `browser_navigate` to `http://localhost:4173/Portfolio/present`.
   - `browser_evaluate`: `() => localStorage.getItem('theme')`. Expected: the value you toggled to.
   - Take a `browser_take_screenshot`. Expected: the deck renders as before.

Stop the preview server.

- [ ] **Step 7: Commit**

```bash
git add -A src
git commit -q -m "feat: replace bento home with annual-report layout and masthead

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Figure 1, one LLM call becomes money

**Files:**
- Create: `src/components/report/FigureOne.tsx`
- Modify: `src/components/report/ReportHome.tsx` (render it in the right column)

**Interfaces:**
- Consumes: `frameAt`, `FINAL_FRAME` and `FigureFrame` from `@/lib/figureClock` (Task 3); `useReducedMotion` from `framer-motion`.
- Produces: `FigureOne()`, a `<figure>` filling its parent's height.

- [ ] **Step 1: Create `src/components/report/FigureOne.tsx`**

```tsx
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
      <figcaption>
        <span className="block text-sm font-semibold tabular-nums">Figure 1</span>
        <span className="mt-1 block text-2xl font-semibold leading-tight md:text-3xl">
          One LLM call becomes money
        </span>
      </figcaption>

      <div className="relative mt-10 flex-1">
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
```

- [ ] **Step 2: Render it in `ReportHome`**

Add `import { FigureOne } from './FigureOne';` and replace `{/* Figure 1: Task 6 */}` with `<FigureOne />`.

- [ ] **Step 3: Typecheck and build**

Expected: both clean.

- [ ] **Step 4: Desktop render**

Start the preview server, then run `$PW screenshot --viewport-size=1440,900 --wait-for-timeout=2500 http://localhost:4173/Portfolio/ /tmp/t6-desktop.png`.

Open it and check:
- Columns 6–12 are a full-height ultramarine panel.
- Five stations are visible on one continuous vertical line.
- The marker sits on the line.
- The caption at the bottom reads "Illustrative example".

- [ ] **Step 5: Behaviour checks (Review Focus 2, 4 and 5)**

Use the Playwright MCP tools:

1. **Reduced motion.** `browser_emulate_media` with `reducedMotion: 'reduce'`, then `browser_navigate` to the home page and `browser_evaluate`:
   ```js
   () => {
     const values = [...document.querySelectorAll('figure ol li span:last-child')];
     return {
       marker: !!document.querySelector('figure .z-10'),
       allShown: values.every((v) => v.classList.contains('opacity-100')),
     };
   }
   ```
   Expected: `{ marker: false, allShown: true }`. Reset with `browser_emulate_media` `reducedMotion: 'no-preference'`.
2. **Phone alignment.** `browser_resize` to 390×844, reload, wait 1s, then `browser_evaluate`:
   ```js
   () => {
     const items = [...document.querySelectorAll('figure ol > li')];
     const dots = items.map((li) => {
       const d = li.querySelector('span[aria-hidden]').getBoundingClientRect();
       return d.top + d.height / 2;
     });
     const line = document.querySelector('figure div[aria-hidden].w-0\\.5').getBoundingClientRect();
     return { firstDotOnLine: Math.abs(dots[0] - line.top) < 3, lastDotOnLine: Math.abs(dots.at(-1) - line.bottom) < 3 };
   }
   ```
   Expected: both `true`.
3. **Pauses off-screen.** At 1440×900, `browser_evaluate`:
   ```js
   async () => {
     const marker = () => document.querySelector('figure .z-10')?.style.top;
     window.scrollTo(0, document.body.scrollHeight);
     await new Promise((r) => setTimeout(r, 300));
     const a = marker();
     await new Promise((r) => setTimeout(r, 1000));
     const b = marker();
     window.scrollTo(0, 0);
     await new Promise((r) => setTimeout(r, 1000));
     const c = marker();
     return { pausedWhileOffscreen: a === b, resumed: c !== b };
   }
   ```
   Expected: both `true`.

Stop the preview server.

- [ ] **Step 6: Commit**

```bash
git add src/components/report/FigureOne.tsx src/components/report/ReportHome.tsx
git commit -q -m "feat: add Figure 1, one LLM call travelling the FinOps pipeline

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: System chapters with layer figures and deep links

**Files:**
- Create: `src/components/report/LayerFigure.tsx`
- Create: `src/components/report/Chapter.tsx`
- Modify: `src/components/report/ReportHome.tsx` (render the chapters)
- Modify: `src/data/portfolio-data.ts` (drop the icon and colour fields from `ArchNode`)

**Interfaces:**
- Consumes: `Project`, `ArchLayer` and `projects` from `@/data/portfolio-data` (Task 4).
- Produces:
  - `LayerFigure({ number, title, layers }: { number: number; title: string; layers: ArchLayer[] })`
  - `Chapter({ project, figureNumber }: { project: Project; figureNumber: number | null })`
  - `ArchNode` becomes `{ label: string; sublabel?: string }`.

- [ ] **Step 1: Strip the decorative fields from the architecture data**

The figures render labels only, with no emoji or icon tiles. Remove `iconUrl`, `iconEmoji` and `color` from the type and from every node, along with the CDN icon helper:

```bash
perl -0pi -e 's/,\s*iconUrl: di\([^)]*\)//g; s/,\s*iconEmoji: "[^"]*"//g; s/,\s*color: "#[0-9A-Fa-f]{6}"//g' src/data/portfolio-data.ts
perl -0pi -e 's/\nconst DI = [^\n]*\nconst di = [^\n]*\n/\n/' src/data/portfolio-data.ts
grep -nE "iconUrl|iconEmoji|color:|\bdi\(|const DI" src/data/portfolio-data.ts || echo "clean"
```

Expected: `clean`. Then replace the `ArchNode` interface with:

```ts
export interface ArchNode {
  label: string;
  sublabel?: string;
}
```

- [ ] **Step 2: Create `src/components/report/LayerFigure.tsx`**

```tsx
import type { ArchLayer } from '@/data/portfolio-data';

interface LayerFigureProps {
  number: number;
  title: string;
  layers: ArchLayer[];
}

// A system's architecture as a report figure: one row per layer, top to bottom
// in the direction data flows.
export function LayerFigure({ number, title, layers }: LayerFigureProps) {
  return (
    <figure className="mt-8">
      <figcaption className="mb-3 text-sm text-muted">
        <span className="font-semibold tabular-nums text-ink">Figure {number}</span> · {title}: architecture
      </figcaption>
      <ol className="border-t border-ink">
        {layers.map((layer) => (
          <li key={layer.name} className="grid grid-cols-12 gap-x-6 border-b border-rule py-3">
            <span className="col-span-12 text-sm text-muted sm:col-span-4">{layer.name}</span>
            <ul className="col-span-12 flex flex-wrap gap-x-6 gap-y-1 sm:col-span-8">
              {layer.nodes.map((node) => (
                <li key={node.label}>
                  <span className="font-medium">{node.label}</span>
                  {node.sublabel && <span className="text-muted"> · {node.sublabel}</span>}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </figure>
  );
}
```

- [ ] **Step 3: Create `src/components/report/Chapter.tsx`**

```tsx
import { useEffect, useState } from 'react';
import type { Project } from '@/data/portfolio-data';
import { LayerFigure } from './LayerFigure';

interface ChapterProps {
  project: Project;
  /** Figure number for this chapter's architecture, or null when it has none. */
  figureNumber: number | null;
}

export function Chapter({ project, figureNumber }: ChapterProps) {
  const anchor = `#${project.id}`;
  const [open, setOpen] = useState(() => window.location.hash === anchor);

  // A link to this chapter opens it, on first load and on later hash changes.
  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === anchor) setOpen(true);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [anchor]);

  const titleId = `${project.id}-title`;
  const bodyId = `${project.id}-full`;

  return (
    <section
      id={project.id}
      aria-labelledby={titleId}
      className="grid grid-cols-12 gap-x-6 gap-y-4 border-t border-rule py-12"
    >
      <header className="col-span-12 md:col-span-4">
        <h3 id={titleId} className="text-2xl font-semibold leading-tight tracking-tight">
          {project.title}
        </h3>
        <p className="mt-2 text-sm tabular-nums text-muted">
          {[project.subtitle, project.dateRange, project.status].filter(Boolean).join(' · ')}
        </p>
        <p className="mt-4 text-sm text-muted">{project.technologies.join(', ')}</p>
      </header>

      <div className="col-span-12 md:col-span-8">
        <p className="max-w-measure text-lg leading-relaxed">{project.description}</p>

        {project.visualArch && figureNumber !== null && (
          <LayerFigure number={figureNumber} title={project.title} layers={project.visualArch} />
        )}

        {project.highlights && (
          <>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={bodyId}
              onClick={() => setOpen((o) => !o)}
              className="mt-6 text-sm font-semibold underline hover:text-field"
            >
              {open ? 'Close the chapter' : 'Read the full chapter'}
            </button>
            <div id={bodyId} hidden={!open} className="mt-4">
              <ul className="max-w-measure list-disc space-y-2 pl-5">
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              {project.github && (
                <p className="mt-4 text-sm">
                  <a href={project.github} className="underline">
                    Source on GitHub
                  </a>
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Render the chapters in `ReportHome`**

1. Change the data import to `import { education, experiences, personalInfo, projects, technicalSkills } from '@/data/portfolio-data';`.
2. Add `import { Chapter } from './Chapter';`.
3. Add these lines above `export function ReportHome()`:

```tsx
// Figure 1 is the hero; chapter figures continue from 2.
let figureCount = 1;
const figureNumbers = projects.map((p) => (p.visualArch ? ++figureCount : null));
```

4. Replace `{/* Chapters: Task 7 */}` with:

```tsx
            <div className="mt-8">
              {projects.map((p, i) => (
                <Chapter key={p.id} project={p} figureNumber={figureNumbers[i]} />
              ))}
            </div>
```

- [ ] **Step 5: Typecheck and build**

Expected: both clean.

- [ ] **Step 6: Behaviour checks, including Review Focus 1**

Start the preview server, then:

1. **Deep link.** `browser_navigate` to `http://localhost:4173/Portfolio/#gateway`, wait 1s, then `browser_evaluate`:
   ```js
   () => {
     const s = document.getElementById('gateway');
     const title = document.getElementById('gateway-title').getBoundingClientRect();
     const masthead = document.querySelector('header').getBoundingClientRect();
     return {
       expanded: s.querySelector('button[aria-expanded]').getAttribute('aria-expanded'),
       bodyVisible: !document.getElementById('gateway-full').hidden,
       titleBelowMasthead: title.top >= masthead.bottom,
     };
   }
   ```
   Expected: `{ expanded: 'true', bodyVisible: true, titleBelowMasthead: true }`.
2. **Toggle.** `browser_click` the FinOps chapter's "Read the full chapter" button, then `browser_evaluate`:
   `() => !document.getElementById('finops-full').hidden`
   Expected: `true`.
3. **Figure numbering.** `browser_evaluate`:
   `() => [...document.querySelectorAll('figcaption .tabular-nums')].map((n) => n.textContent)`
   Expected: `['Figure 1', 'Figure 2', ...]`, with no gaps and no repeats.
4. **Full-page screenshots** at 1440 (light and dark) and at 390, to `/tmp/t7-*.png`. Open them. Expected: six chapters, each with a ruled figure. No emoji.

Stop the preview server.

- [ ] **Step 7: Commit**

```bash
git add src/components/report src/data/portfolio-data.ts
git commit -q -m "feat: add system chapters with architecture figures and deep links

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Resume appendix and the last of the unused UI kit

**Files:**
- Modify: `src/components/Resume.tsx` (full rewrite)
- Delete: `src/components/ui/button.tsx`, `src/lib/utils.ts`
- Modify: `package.json`, `package-lock.json`

**Interfaces:**
- Consumes: `Masthead` (Task 5); `personalInfo.cvUpdated` (Task 4).
- Produces: the default export `Resume` (lazy-loaded by `App.tsx`, unchanged).

- [ ] **Step 1: Rewrite `src/components/Resume.tsx`**

```tsx
import { personalInfo } from '@/data/portfolio-data';
import { Masthead } from './report/Masthead';

const CV_URL = `${import.meta.env.BASE_URL}cv.pdf`;

function Resume() {
  return (
    <div className="flex h-screen flex-col">
      <Masthead page="resume" />
      <main className="mx-auto flex w-full max-w-[80rem] flex-1 flex-col px-6 pb-6 md:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-3 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Appendix: Curriculum Vitae{' '}
            <span className="font-normal tabular-nums text-muted">{personalInfo.cvUpdated}</span>
          </h1>
          <a href={CV_URL} download="Panthaweekan_Somngam_CV.pdf" className="text-sm font-semibold underline">
            Download PDF
          </a>
        </div>
        <div className="relative flex-1 border border-rule bg-white">
          <object data={CV_URL} type="application/pdf" className="h-full w-full">
            <iframe src={CV_URL} title="Curriculum Vitae (PDF)" className="h-full w-full border-0">
              <p className="p-8 text-center text-muted">
                This browser can't show the PDF inline.{' '}
                <a href={CV_URL} download="Panthaweekan_Somngam_CV.pdf" className="underline">
                  Download it instead.
                </a>
              </p>
            </iframe>
          </object>
        </div>
      </main>
    </div>
  );
}

export default Resume;
```

- [ ] **Step 2: Delete the unused UI kit and its dependencies**

```bash
grep -rlE "ui/button|lib/utils|class-variance-authority|@radix-ui/react-slot|clsx|tailwind-merge" src || echo "no importers"
```

Expected: only `src/components/ui/button.tsx` and `src/lib/utils.ts` import each other. If any other file is listed, stop and report it.

```bash
git rm -q src/components/ui/button.tsx src/lib/utils.ts
rmdir src/components/ui 2>/dev/null || true
npm uninstall class-variance-authority @radix-ui/react-slot clsx tailwind-merge
```

- [ ] **Step 3: Typecheck, build and deck guard**

Expected: all three pass.

- [ ] **Step 4: Verify `/resume` and `/present`**

Start the preview server, then:
1. `$PW screenshot --viewport-size=1440,900 --wait-for-timeout=2000 http://localhost:4173/Portfolio/resume /tmp/t8-resume.png`. Open it. Expected: the masthead, "Appendix: Curriculum Vitae October 2026", and the PDF viewer filling the rest.
2. Re-capture `/present` in light and dark exactly as in Task 1 Step 1, to `/tmp/t8-present-{light,dark}.png`. Compare each with `.impeccable/review/baseline-present-*.png` side by side. Expected: no visible difference.

Stop the preview server.

- [ ] **Step 5: Commit**

```bash
git add -A src package.json package-lock.json
git commit -q -m "feat: restyle resume as report appendix; remove unused UI kit

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Inspect, review and document

Follow the Impeccable new-work flow, section 7: two inspection rounds at most, then the finish reviewer, then the documenter.

**Files:**
- Create: `.impeccable/review/desktop.png`, `.impeccable/review/mobile.png`, `.impeccable/review/desktop-dark.png`, `.impeccable/review/desktop-1280.png`
- Create (via the documenter): `DESIGN.md`, `.impeccable/design.json`

**Interfaces:**
- Consumes: the whole built site.
- Produces: a finish verdict and `DESIGN.md`.

- [ ] **Step 1: Capture the review set**

The figure animates, so capture with reduced motion off but after `--wait-for-timeout=8500`, which lands in the hold, with every value shown.

```bash
npm run build && (npx vite preview --port 4173 --strictPort > /tmp/preview.log 2>&1 &) && sleep 3
PW=career-ops/node_modules/.bin/playwright
U=http://localhost:4173/Portfolio/
$PW screenshot --viewport-size=1440,900 --full-page --wait-for-timeout=8500 $U .impeccable/review/desktop.png
$PW screenshot --viewport-size=1440,900 --full-page --wait-for-timeout=8500 --color-scheme=dark $U .impeccable/review/desktop-dark.png
$PW screenshot --viewport-size=1280,800 --wait-for-timeout=8500 $U .impeccable/review/desktop-1280.png
$PW screenshot --viewport-size=390,844 --full-page --wait-for-timeout=8500 $U .impeccable/review/mobile.png
```

Open every file once. Each must show the whole page, with no blank regions and no half-loaded state. Re-capture any that fail.

- [ ] **Step 2: Inspection round 1**

Critique the captures against the direction contract in `.impeccable/surfaces/src-app-tsx.md` and the spec. Fix every material gap in one batch, then run the typecheck, build and `npm run check:figure`. Re-capture the same four files.

- [ ] **Step 3: Run the mechanical detector once**

```bash
"/Users/xanta999flyhigh/.claude/plugins/cache/impeccable/impeccable/4.3.1/skills/impeccable/scripts/impeccable" detect --json src/components/report src/components/Resume.tsx src/index.css
```

Fix the mechanical findings. Keep a list of any finding you leave, with the reason, for the reviewer.

- [ ] **Step 4: Inspection round 2 (the last one)**

Confirm the round 1 fixes held in the re-captures. Make no further polishing passes after this.

- [ ] **Step 5: Spawn the finish reviewer**

Spawn the `impeccable:impeccable-finish-reviewer` agent fresh, with no conversation history, and give it:
- the original request (redesign `/` and `/resume` as The Engineer's Annual Report) and the confirmed answers recorded in `PRODUCT.md` and the spec;
- the artifact paths `src/components/report/`, `src/components/Resume.tsx` and `src/index.css`;
- the screenshot paths from Step 1, all required;
- the direction contract path `.impeccable/surfaces/src-app-tsx.md`;
- the detector findings left open in Step 3;
- the craft floor at `/Users/xanta999flyhigh/.claude/plugins/cache/impeccable/impeccable/4.3.1/skills/impeccable/reference/craft-floor.md`;
- a note that this is a code-led build with no approved comp.

Act on its disposition:
- **recapture:** recapture, then request a full review again.
- **fix:** make the fixes in one batch, recapture, and request a verdict pass.
- **rebuild:** rebuild the named regions, then request a full review again.
- **ship:** continue to Step 6.

Report the verdict in the reviewer's own words and at its own scope.

- [ ] **Step 6: Spawn the documenter**

Spawn the `impeccable:impeccable-documenter` agent with:
- the project root and the artifact paths;
- the direction contract, `PRODUCT.md` and the reference `/Users/xanta999flyhigh/.claude/plugins/cache/impeccable/impeccable/4.3.1/skills/impeccable/reference/document.md`;
- the write boundary: `DESIGN.md` and `.impeccable/design.json` only.

Verify that both files exist and that `DESIGN.md` lists the colour tokens.

- [ ] **Step 7: Final checks and commit**

Run the typecheck, build, `npm run check:deck` and `npm run check:figure`. All must pass. Then stop the preview server and commit:

```bash
git add DESIGN.md .impeccable/design.json .impeccable/review/*.png src
git commit -q -m "docs: record the annual-report design system; finish review fixes

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```
