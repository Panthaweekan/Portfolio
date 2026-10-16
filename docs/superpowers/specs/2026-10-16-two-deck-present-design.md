# Two decks for /present: About me and Technical deep dive

Date: 2026-10-16 · Branch: `feat/two-deck-present`

## Goal

Split `/present` into two talks, so Panthaweekan can open the one that fits the interview round:

- **About me** (`/present/recruiter`): 11 slides, about 10 minutes, for recruiter and HR rounds. It is about Panthaweekan as a person: why Panthaweekan builds software, how the skills were learned, how the work with people and AI goes, life outside work, and what comes next. Stack is visible but secondary.
- **Technical deep dive** (`/present/technical`): the existing 12-slide deck, unchanged.

Related documents:
- **Product truth:** `PRODUCT.md`
- **Visual system:** `DESIGN.md`
- **Previous deck spec:** `docs/superpowers/specs/2026-10-12-present-deck-redesign-design.md`

## Decisions already made

- **Two separate decks**, not one deck with two parts. Each has its own page count, folios and URL.
- **Path routes** (`/present/recruiter`, `/present/technical`) sharing one stage component, not a query parameter and not a copied component.
- **`/present` is a deck chooser.** Old shared links of the form `/present?slide=N` redirect to `/present/technical?slide=N`.
- **The recruiter deck has no contents page and no chapter dividers.** It is a 10-minute talk, and dividers would add three slides with no content.
- **Stack in the recruiter deck:** one Toolkit slide, plus a muted "Built with" line under the two story slides that describe built systems (slides 4 and 5).
- **Slide copy is English** (`PRODUCT.md`: English only). Plain first person, short sentences, no hype words, no specific role name on slide 10.

## Sources for the recruiter deck

Every claim traces to one of these:

1. **CV:** `cv.tex`.
2. **Showcase items** already in `src/data/portfolio-data.ts`: FitJourney and the Twitch TTS Bot.
3. **Statements Panthaweekan made and approved in the 2026-10-16 brainstorming session**:
   - **Why Panthaweekan builds software:** to build products that solve users' real problems, can be extended and scaled, and have lasting value.
   - **At CMU, Panthaweekan chose to practise two things:** working with product owners to turn pain points into requirements and design, and building the full stack (back end, front end, Docker infrastructure, networking).
   - **The CMU team:** two people. Panthaweekan was full-stack developer and PM; a friend was UX/UI designer and BA. Together they delivered both faculty apps.
   - **The team's way of working at SCB TechX:**
     - It runs AI-first with a human in the loop, to move fast with a small team and give everyone a shared understanding of scope and of how each feature is tested.
     - The flow, confirmed by Panthaweekan: Requirement → PRD → Design spec → Stories with acceptance criteria → Tasks → Tests → Code → Review → Deliver, looping by sprint.
     - People approve at three points: the PRD (PO and EM), the design (the team) and the merge (a reviewer).
     - ADRs are written whenever a significant decision comes up, not as a single stage.
   - **Reusable AI skills:** Panthaweekan writes them for repeated work and shares them with the team as a standard. The open question Panthaweekan works on is how to keep code correct when AI writes it faster than people can review.
   - **Outside work:** Twitch game streaming. Panthaweekan built the Twitch TTS Bot for those streams, and builds side projects to fix personal pain points.
   - **What Panthaweekan wants next:** works AI-first today, believes this is how software work will be done from now on, and wants a role that brings AI into teams' daily work.
   - **AI tools:** Claude Code (main, daily); has also used Codex and Gemini.

**Left out:**
- The story of persuading the PO/EM (Panthaweekan asked to skip it).
- Any number the CV does not state.
- Any SCB TechX internal detail beyond the public-disclosure boundary in `PRODUCT.md`.
- Any claim that FinOps is in production.
- "Still in use" for the certificate app; the CV says it only of SD-Booking.

**Follow-up, outside this work:** the PM role at CMU and the AI tools are not in `cv.tex`. Add them there in a separate change so the CV and site agree.

## Recruiter deck: slides and copy

The page count is 11, and folios read "p. N / 11". The folio's left side reads "Panthaweekan Somngam" on every content slide.

| p. | id | Kind | Content |
|---|---|---|---|
| 1 | `about-title` | title | Same layout as the technical title slide: name, positioning line, "Associate Software Engineer · SCB TechX · Bangkok", portrait. Footer: "About me · {cvUpdated}" |
| 2 | `about-why` | content | **I want to build products that solve a real problem, and keep growing.** Three points: *Solve the user's problem.* Start from what actually hurts. · *Built to grow.* Easy to extend and scale as needs change. · *Worth keeping.* Software with lasting value, not a one-off. |
| 3 | `about-start` | content | **I practised working with product owners while I was still a student.** Meta: "Work-study scholarship · Faculty of Engineering, Chiang Mai University · 2023 – 2025". Points: I wanted to learn two things: turning a pain point into requirements and a design, and building the whole stack: back end, front end, Docker and networking. · We were a team of two. I was the full-stack developer and PM; a friend was the UX/UI designer and BA. Caption: "B.Eng. Computer Engineering · Second-Class Honours · 2025" |
| 4 | `about-users` | content | **We shipped two apps the faculty used.** Two columns. *Certificate approvals:* a paper process became a multi-stage online workflow. Turnaround went from weeks to days. *SD-Booking:* the room booking system the faculty uses for daily scheduling, still in use today. It stops two people booking the same room. Built-with line: "Built with Go · React · TypeScript · PostgreSQL · Docker" |
| 5 | `about-spec` | content | **First, everyone agrees on what we are building.** Points: At SCB TechX I ran discovery for the AI cost management module of our agentic AI platform. · I wrote the requirements, module spec and service design for the product owner and engineering manager. · Every feature has acceptance criteria, so we know how to check it is right before we build it. Built-with line: "Built with Go · Kafka · PostgreSQL · AWS · Next.js" |
| 6 | `about-flow` | content | **AI drafts. People decide.** A horizontal flow: Requirement → PRD → Design spec → Stories → Tasks → Tests → Code → Review → Deliver, with a loop arrow back to the start. Filled markers sit at the three human gates, labelled "PRD: product owner, engineering manager", "Design: the team" and "Merge: a reviewer". Caption: "With a small team, AI agents do the drafting. A person signs off at each gate, and each sprint repeats the loop." |
| 7 | `about-review` | content | **What happens when AI writes code faster than people can review it?** Three points: *One standard.* I wrote reusable AI skills for repeated work and shared them with the team. · *Tests come first.* Every change must pass its tests and a coverage gate. · *AI reviews, people verify.* I built an AI-assisted review workflow, reviewer agents plus a verifier. The team adopted it, and it catches bugs human reviewers missed. |
| 8 | `about-toolkit` | content | **What I build with.** Five rows, each with the tools and a plain-language gloss. *Back end:* Go · Ruby on Rails · PostgreSQL · Kafka (the services and data behind a product). *Front end:* React · Next.js · TypeScript (the screens people use). *Cloud & ops:* AWS · Docker · Kubernetes · Kong (where it runs, and how it stays up). *Quality:* Test-first · CI/CD · OpenTelemetry · Prometheus (how we know it works). *AI tools:* Claude Code (daily) · also used Codex and Gemini (how I plan, build and review with AI). Caption: "Full list in my CV" |
| 9 | `about-outside` | content | **Outside work, I stream games and build tools for my own problems.** Points: *Twitch game streaming*, and a chat text-to-speech bot I built for it, with Thai and English voices. · *FitJourney*: a fitness app I built because no single tool tracked my workouts, meals and body metrics together. |
| 10 | `about-next` | content | **Next, I want to help teams bring AI into real work.** Points: I already work AI-first: AI helps me find ideas, plan, write specs, build, test and deliver. · I believe this is how most software work will be done from now on. · I want a role where I bring that into other teams' daily work. |
| 11 | `about-close` | close | Same layout as the technical close: "Thank you. Questions?", email, LinkedIn, GitHub, portfolio, CV. An extra caption reads "Technical deep dive: panthaweekan.github.io/Portfolio/present/technical" |

**Rules that apply to every slide in this deck:**
- No stack names in headlines or story copy. Stack appears only in the built-with lines and on the Toolkit slide.
- The built-with line is a caption: 22px, muted, set above the folio rule.
- Type, margins and grid follow `DESIGN.md`'s slide scale: headline about 72px, body at least 32px, captions 22px.

## Technical deck

The existing 12 slides keep their ids, order, copy and assertions. Its address moves to `/present/technical`. Its close slide is unchanged.

## Code structure

- **`src/components/present/outline.ts`:**
  - `OUTLINE` becomes `DECKS = { recruiter: [...], technical: [...] } as const`, with a `DeckId` type.
  - Slide ids are unique across both decks: technical keeps its ids, recruiter uses the `about-` prefix.
  - `pageOf(id)`, `chapterOf(id)` and a new `totalOf(id)` find the owning deck from the id, so their callers need no deck argument.
  - `contents(deck)` takes the deck.
  - `TOTAL_PAGES` is replaced by `totalOf(id)`.
- **`src/components/present/slides.tsx`:**
  - Adds the recruiter slide components.
  - The title and close components take the slide id, so both decks reuse them; the recruiter close renders the extra caption.
  - Exports `slidesFor(deck)`, which maps a deck's outline to `{ id, title, Component }`.
  - Uses the existing `Headline`/`Column` helpers. Adds a small `BuiltWith` caption component and the flow figure for slide 6. The flow figure is fixed-px with no breakpoint prefixes, per the deck-canvas rule in `CLAUDE.md`.
- **`src/components/present/SlideFrame.tsx`:** uses `totalOf(id)` and takes an optional `caption` that renders above the folio, for the built-with lines.
- **`src/components/Present.tsx`:**
  - Takes a `deck: DeckId` prop and renders `slidesFor(deck)`.
  - Everything else is unchanged: stage scaling, keys, click to advance, progress rule, dots, theme, fullscreen and `?slide=N`.
- **`src/components/present/DeckChooser.tsx`** (new): the `/present` page.
- **`src/App.tsx`:**
  - Routes `/present` (the chooser, or the redirect described below), `/present/recruiter` and `/present/technical`.
  - Any other `/present/*` path goes to the chooser, including deeper paths like `/present/foo/bar`.

## /present chooser

- **Page type:** a normal responsive page, not the 1920×1080 canvas. It uses the site tokens and Archivo.
- **Chrome:** "← Portfolio" link and the theme toggle (`useTheme`).
- **Content:** heading "Two talks", then two link cards:
  - **About me:** "For recruiter rounds · {n} slides · about 10 minutes".
  - **Technical deep dive:** "For technical rounds · {n} slides · FinOps, API gateway, earlier systems".
  - `{n}` comes from `DECKS`, never typed.
- **Layout:** cards sit side by side on desktop and stack on phones, with a 16px gutter and no horizontal scroll.
- **Redirect:** when `/present` carries `?slide=N`, it redirects (replace, not push) to `/present/technical?slide=N`.
- **Links:** the home page's existing link to `/present` stays as is.

## Docs to update

- **`PRODUCT.md`:**
  - Capabilities: describe the two decks and the chooser.
  - Evidence on Hand: add that the recruiter deck carries user-approved statements from 2026-10-16 (see this spec).
- **`CLAUDE.md`:**
  - Map: add the routes and `DeckChooser.tsx`.
  - Deck page numbers gotcha: say "each deck's outline in `DECKS`".
- **`DESIGN.md`:** add the built-with caption, the Toolkit rows and the flow figure to the slide components.

## Accessibility

- Each slide keeps `<section aria-roledescription="slide" aria-label="N of {total}: title">`, with the deck's own total. Off-screen slides stay `inert`.
- The chooser cards are plain links with visible focus styles. Each card's accessible name includes its deck title.
- The flow figure on slide 6 has a text equivalent: the stages as an ordered list, visually hidden. A presenter-only diagram must not be invisible to screen readers.

## Verification

- `npx tsc --noEmit -p tsconfig.json`, `npm run build` and `npm run check:figure` pass.
- `npm run check:deck` checks both decks:
  - **technical:** every existing assertion, unchanged.
  - **recruiter:** 11 pages, first slide `title`, last slide `close`, no `divider` or `contents` slides, and `chapterOf` returns null for every recruiter slide.
  - **both:** ids are unique across both decks, and `totalOf` returns each deck's own length.
- Playwright screenshots (`career-ops/node_modules/.bin/playwright screenshot`):
  - all 11 recruiter slides at 1920×1186, in light and dark themes;
  - the chooser at 375px wide and at desktop width.

  Check that no text overflows, especially on slides 6 and 8.
- **Manual checks:**
  - `/present?slide=5` lands on technical p. 5.
  - `/present/technical` renders all 12 slides as before.
  - `/present/recruiter?slide=11` shows the close slide.
  - Keys and the theme toggle work on both decks.

## Out of scope

- Changing any technical slide.
- Editing `cv.tex`; that is the follow-up above.
- Speaker notes, slide transitions and a print/PDF export of either deck.
