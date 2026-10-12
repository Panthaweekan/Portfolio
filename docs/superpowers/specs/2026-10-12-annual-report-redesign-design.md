# Portfolio redesign: The Engineer's Annual Report

Date: 2026-10-12 · Branch: `feat/annual-report-redesign`, based on `feat/cv-oct-2026-update`

## Goal

Replace the bento home page and restyle the resume viewer so a hiring screener, in one to three minutes, sees what Panthaweekan does, watches one system work, and leaves with the CV or a message. Product truth lives in `PRODUCT.md`; the visual direction contract lives in `.impeccable/surfaces/src-app-tsx.md` and is never copied into source.

## Scope

- **In:** `/` (replaces `PortfolioBento`), `/resume` (restyled frame around the existing PDF), global tokens and fonts, theme toggle, dead-code and dependency cleanup, `index.html` meta copy.
- **Out:** `/present` (unchanged, still guarded by `npm run check:deck`), CV content, career-ops.

## Page structure: `/`

One route, read top to bottom like a report.

1. **Masthead bar** (thin, sticky): "Panthaweekan S.", anchor links (Systems, Record, Skills, Contact), Present link, theme toggle, and **Download CV** as the primary button. On phones the anchors collapse into a menu; Download CV stays visible.
2. **First viewport** (12 columns):
   - Columns 1–5: name, "I take systems from a written spec to running code.", current role and employer, then Download CV, Email and LinkedIn.
   - Columns 6–12: Figure 1 on a full-height ultramarine field (see below).
   - On phones the identity block comes first and Figure 1 follows as a vertical pipeline.
3. **Systems**: one chapter per system, newest first: FinOps engine, API gateway migration, enterprise asset platform, SD-Booking, FitJourney, Twitch TTS Bot.
   - A chapter shows its title, dates, employer or "Side project", a 2–3 sentence summary, and one figure.
   - "Read the full chapter" is a button with `aria-expanded`. It expands the highlights and stack in place.
   - Each chapter has an anchor (`#finops`, `#gateway`, `#assets`, `#sd-booking`, `#fitjourney`, `#tts`) so interviewers can be sent a link. Loading a URL with a hash opens that chapter.
4. **Record**: experience as a table (role, employer, dates, location).
5. **Skills**: an index by category, plain text.
6. **Education**: one line.
7. **Close**: an ultramarine field with Email, LinkedIn, GitHub, Download CV and the Present link.

## Figure 1: one LLM call becomes money

- **What it is:** an SVG figure with five stations (Agent step → Collector → Kafka → Engine → Dashboard) on one continuous path. A marker travels the path on a single clock of about 8 seconds per loop.
- **Motion:**
  - Each station is marked just before the marker arrives, and the easing is damped.
  - Values appear station by station: tokens in and out, then price, cost and attribution.
- **Example values (illustrative):**
  - 1,200 input and 300 output tokens.
  - USD 3 and USD 15 per million tokens.
  - Cost: USD 0.0081.
  - Attributed to "Team › Project › Run › Step".
  - The caption reads: "Illustrative example · FinOps engine, SCB TechX agentic AI platform". The numbers are authored constants, not computed at runtime.
- **Accessibility and performance:**
  - The figure is a `<figure>` with a `<figcaption>`. The steps are also an ordered list in visible text.
  - Under `prefers-reduced-motion` it shows the final state statically.
  - It pauses when off-screen (IntersectionObserver).
  - Animation uses `framer-motion`, which is already installed.
- **Public boundary:** this generic flow is allowed by `PRODUCT.md`. It shows no internal names, topics or security details.

## Chapter figures

The other chapters render the existing `visualArch` layer data from `portfolio-data.ts` as report figures: horizontal bands with hairline rules and tabular labels, numbered Figure 2 onward. No figure uses emoji or icon tiles; the layer and node labels are the figure.

FinOps gets a new project entry, using the CV wording plus a short summary, and its own public-safe `visualArch`: Platform → Collector → Kafka → Engine → Postgres / Reports → Console dashboard.

The live site renders none of the existing `visualArch` data today, because `VisualArchDiagram.tsx` is unused. This redesign is what makes the diagrams visible again.

## Visual system

- **Tokens:** CSS custom properties in `src/index.css`, replacing the old ones and mapped into Tailwind.
  - Light: ground `#FAFAFA`, ink `#16181D`, field `#1F3BD6`, rule `#C9CDD6`, muted ink for metadata.
  - Dark: an ink ground, with the field and rules lifted to stay readable at AA contrast.
- **Type:** Archivo, self-hosted via `@fontsource-variable/archivo`, with tabular numerals for figures and dates.
  - Remove the Montserrat/Roboto/Inter links and declarations.
  - Body text at least 16px, line length 65–75 characters, flush left.
- **Colour strategy:** committed. The ultramarine field owns whole regions (Figure 1, the close) and is never scattered as small accents.
- **Theme:** use the saved choice if there is one, otherwise the OS preference. The logic moves from `PortfolioBento` into a `useTheme` hook shared by the home page and `/resume`.
- **Browser surfaces:** text selection, focus rings, link underline offset and the scrollbar all use the palette.

## `/resume`

The same masthead bar, then the existing PDF `<object>`/`<iframe>` viewer framed like a report appendix ("Appendix: Curriculum Vitae, October 2026") with Download PDF. The viewer behaviour stays the same.

## Data changes (`src/data/portfolio-data.ts`)

- Add the FinOps project with its `visualArch`, following the public boundary.
- Add the positioning line and the anchor `id` for each project.
- No other content changes. `cv.tex` wording still wins.

## Cleanup

- **Delete unused components:** `Hero`, `About`, `Projects`, `Experience`, `Navbar`, `Footer`, `ThreeBackground`, `Particles`, `FloatingShapes3D`, `MermaidDiagram`, `AnimatedTimeline`, `AnimatedSkillBar`, `PortfolioBento`, `ui/BentoCard`, `ui/TechIcon`, `ui/typography`, `ui/card`, `hooks/use3DTilt`. Also delete `VisualArchDiagram`, which is replaced by the new figure component. Each is checked with a grep before deletion.
- **Remove dependencies** once nothing imports them: `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`, `@gsap/react`, `mermaid`. `/present` imports none of them.
- **Delete `DESIGN_SYSTEM.md`.** It is stale, and the finish step writes `DESIGN.md` from the built site.
- **Update the `index.html` description and OG/Twitter descriptions** to the positioning line.

## Verification

- **Code checks:**
  - `npx tsc --noEmit` and `npm run build` pass.
  - `npm run check:deck` passes, so `/present` is unchanged.
  - `impeccable detect --json` runs on the changed files and its findings are fixed or explained.
- **Screenshots:** desktop at 1440px and mobile at 390px into `.impeccable/review/`, with a check at 1280px. Light and dark mode, Figure 1 with reduced motion, an expanded chapter, and `/resume`. At most two inspection rounds.
- **Finish review:** the Impeccable finish reviewer reviews the build against the direction contract.
- **Documentation:** the documenter writes `DESIGN.md` and `.impeccable/design.json`.
- **No unit-test framework is added.** The only logic is display state; the figure's numbers are constants.

## Risks

- **Cold or corporate tone.** The first-person voice and the moving figure carry the warmth. The finish review checks this explicitly.
- **Figure 1 cost.** One SVG and one animated marker, paused off-screen. No canvas, no WebGL.
