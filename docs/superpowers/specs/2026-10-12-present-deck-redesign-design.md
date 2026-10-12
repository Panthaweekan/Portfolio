# Presentation deck redesign: Contents and Chapters

Date: 2026-10-12 · Branch: `feat/annual-report-redesign` (continues on the same branch)

## Goal

Rebuild `/present` as a 12-slide, presenter-led talk in the Annual Report world, so a 10–15 minute "walk me through your work" lands on the FinOps story, shows one call becoming money, and ends on contact.

Related documents:
- **Product truth:** `PRODUCT.md`
- **Visual system:** `DESIGN.md`
- **Direction contract:** `.impeccable/surfaces/src-components-present-tsx.md`. The contract is never copied into source.

## Decisions already made

- **Use:** presented live by screen share. Slides support the voice and need not stand alone.
- **Content:** restyle plus refresh. FinOps leads, the gateway is marked as handed over (Sep 2026), and stale content is trimmed.
- **Keep:** the portrait illustration `public/present-icons/portrait.jpg`. Everything else from the old deck is free to go: the Inventory gallery, glyph icons, Space Grotesk/Mono and the dark neon chrome.
- **Structure:** Contents and Chapters (seed `5fec8989`).
- **Build:** slides are React components that read `src/data/portfolio-data.ts`.

## Slides

Each line gives the slide's page number, its purpose, and where its facts come from. Copy is plain first person, short sentences.

| p. | Slide | Content | Source |
|---|---|---|---|
| 1 | Title | Name; positioning line; "Associate Software Engineer, SCB TechX"; portrait plate in columns 8–12, bleeding off the right edge | `personalInfo` |
| 2 | Contents | I FinOps engine · p. 3; II API gateway · p. 7; III Earlier systems · p. 9; Close · p. 12. Page numbers are computed from the slide list, never typed | slide list |
| 3 | Chapter I divider | Full ultramarine. "I" · "FinOps engine" · "One LLM call becomes money" · "Sep 2026 – now" | FinOps project |
| 4 | Discovery | "I started with the spec." The requirements, module spec and service topology I wrote for the product owner and engineering manager. The design call: budget enforcement stays inside the platform; the engine observes and reports | FinOps highlight 1 |
| 5 | Figure | "Figure 1 · One LLM call becomes money": the five stations on one line, landing as USD 0.0081 on the dashboard row, at projection scale. Static final state, captioned "Illustrative example" | `FigureOne` station data |
| 6 | Built, and how we work | Two columns. Built: Go cost engine with two teammates (Kafka, OpenTelemetry, exact integer money, organisation tree, multi-tenant PostgreSQL) and the console dashboard drill path (in review). How we work: ADRs, test-first with a coverage gate, lint-enforced hexagon, AI-assisted PR review | FinOps highlights 2–4 |
| 7 | Chapter II divider | "II" · "API gateway" · "Replacing a legacy gateway behind Kong" · "2025 – Sep 2026 · handed over" | gateway project |
| 8 | Pain → fix | Left: the pain with CA Layer7 (licence-bound scaling, vendor lock-in, token logic trapped in the appliance, hard to test). Right: the fix, a Go token service behind Kong with declarative config sync and per-service circuit breaking, prototyped toward a phased rollout across 30+ services. Below: Figure 2, the request-flow layer figure | gateway project + the old deck's pain list (user-authored), held to CV claims |
| 9 | Chapter III divider | "III" · "Earlier systems" · "From faculty tools to enterprise workflows" · "2023 – 2025" | experiences |
| 10 | Two-up | Asset platform (four request lifecycles, approval chains per role, six-role RBAC with Azure AD SSO, reporting with Excel/CSV export; it replaced Excel and MS Forms) and SD-Booking (real-time room booking, conflict detection, still in daily use) | assets + SD-Booking projects; Excel/MS Forms background from the old deck |
| 11 | How I work | Four steps, set as a numbered sequence because order matters: write the spec · keep the core hexagonal and tested · ship in small reviewed steps · own it in production. Each step carries one example from the chapters above | chapters |
| 12 | Close | "Questions?" plus email, LinkedIn, GitHub, the portfolio URL and "CV: panthaweekan.github.io/Portfolio/resume" | `personalInfo` |

**Claims left out:** anything the CV does not state, such as "phased rollout from Q1 2027", "HPA 3→10", "almost the full Kong Admin API", "zero-restart", "PT/UAT → prod" and FCM push. Under PRODUCT.md, the CV and the site never disagree.

## Slide system

- **Canvas:** 1920×1080 on the 12-column grid of `DESIGN.md`, with 120px margins and a 24px gutter.
- **Folio:** every slide except the dividers has a thin folio line at the foot: chapter name on the left, "p. N / 12" on the right in tabular figures, over a hairline rule.
- **Dividers:** the ultramarine field fills the whole slide, with the chapter numeral at display scale and the title, subtitle and dates in `on-field` and `on-field-muted`.
- **Type:** Archivo only.
  - Display: about 160px for the title-slide name and the divider numerals.
  - Slide headline: about 72px.
  - Body: 32px minimum, so it reads on a shared screen.
  - Captions and folio: 22px.
- **Figures:** slide 5 renders `FigureOne` with a `static` prop (final state, no animation) at slide scale. Slide 8 uses `LayerFigure` at slide scale.
- **Themes:** light and dark come from the shared tokens, and `useTheme` replaces the deck's own theme logic. With no saved choice, the deck now follows the OS like the home page.

## Code structure

- `src/components/present/slides.tsx`: the 12 slide components plus a `SLIDES` array of `{ id, chapter, render }`. Page numbers and the contents page derive from the array.
- `src/components/present/SlideFrame.tsx`: the grid, margins and folio for content slides.
- `src/components/present/Divider.tsx`: the full-field chapter divider.
- `src/components/Present.tsx`, kept and slimmed. It renders `SLIDES` in place of HTML strings and keeps:
  - fit-to-viewport scaling of the 1920×1080 stage;
  - keys `→ ↓ Space PageDown` / `← ↑ PageUp` / `Home` / `End` / `F` (fullscreen) / `1`–`9` (jump);
  - click to advance;
  - the progress rule and dot navigation with `aria-label`s;
  - "Back to portfolio", now via `Masthead`-style chrome in report styling;
  - the theme toggle.

  It drops the gallery, lightbox, card stack and the Google Fonts import.
- `FigureOne` gains an optional `static?: boolean` prop, which renders `FINAL_FRAME` with no animation.
- **Deleted:**
  - `src/data/present-slides.ts`, `src/data/present-chrome.ts` and `src/data/deck.golden.json`;
  - `scripts/check-deck.mjs`, `scripts/dump-golden.mjs` and `scripts/gen-slides.mjs`, after confirming each is deck-only;
  - the `check:deck` and `dump:deck-golden` package scripts;
  - `public/present-icons/*` except `portrait.jpg`, after a grep confirms nothing else references them.

## Accessibility

- Each slide is a `<section aria-roledescription="slide" aria-label="N of 12: title">`.
- Off-screen slides are `inert`.
- Slide text is real text.
- Contrast follows the DESIGN.md pairs: at least 4.5:1 for body and 3:1 for display.
- Keyboard navigation works without a mouse. Focus stays visible on the chrome controls.

## Verification

- `npx tsc --noEmit`, `npm run build` and `npm run check:figure` pass.
- **Screenshots** of all 12 slides at 1920×1080 in light mode, plus slides 1, 3 and 5 in dark, saved to `.impeccable/review/deck-*.png`.
- **Behaviour checks in the browser:**
  - the next and previous keys, `Home`, `End` and number jumps;
  - the contents page numbers match the real positions;
  - the scaled stage fits 1280×720 and 1440×900 without overflow.
- **Detector and review:**
  - Impeccable's detector runs over the new files.
  - The finish reviewer judges the screenshots against the deck's direction contract.
  - The documenter adds the deck to `DESIGN.md`.

## Risks

- **Three dividers out of 12 slides.** Keep them fast to talk over: one breath each.
- **Losing the old deck's deep gateway diagrams.** The gateway chapter is deliberately one slide in a 10–15 minute talk. The old deck stays in git history if a longer talk is needed.
