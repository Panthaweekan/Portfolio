# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: hiring screeners (recruiters and hiring managers) who reached the site from Panthaweekan's CV or LinkedIn and are spending one to three minutes deciding whether to interview them. Secondary, served on demand: technical interviewers who want depth on a specific system before or during an interview.

## Product Purpose

A personal portfolio for Panthaweekan Somngam, Associate Software Engineer at SCB TechX (Bangkok). It exists to turn a CV click into a next step. A visit succeeds when the visitor does any of the following:

- makes contact (email or LinkedIn);
- opens or downloads the CV PDF;
- reads a project deep dive and understands one system Panthaweekan built;
- goes through the `/present` deck.

## Positioning

An end-to-end owner who takes a system from discovery to running code. The current proof is the FinOps engine on SCB TechX's agentic AI platform: Panthaweekan ran discovery and wrote the module spec, built the Go cost engine with two teammates, then built the console integration and AI cost dashboard. Earlier proof follows the same shape: the API gateway migration at SCB TechX, and two faculty web apps at Chiang Mai University taken from stakeholder requirements to deployment.

## Operating Context

- Visitors arrive from a CV PDF, a LinkedIn profile or a job application, usually on a laptop during screening, sometimes on a phone.
- Target roles: Forward Deployed AI Engineer at BCG X (Bangkok) as the current focus, plus full-stack and generalist software engineering roles.
- The site is read alongside the CV; any mismatch between them is noticed.

## Capabilities and Constraints

- Routes: `/` (home, in redesign scope), `/resume` (PDF viewer for `public/cv.pdf`, in scope), `/present` (a chooser for two talks on a fixed 1920×1080 canvas, built from React components: `/present/recruiter`, a 15-slide "About me" talk for recruiter rounds, told from now back to university, and `/present/technical`, the 12-slide Contents and Chapters talk; both outlines are checked by `scripts/check-deck.mjs`).
- Existing stack: React 19, TypeScript, Vite, Tailwind CSS, React Router, framer-motion; deployed to GitHub Pages under base path `/Portfolio/` on push to `main`.
- Content lives in `src/data/portfolio-data.ts`, whose facts are synchronized with `cv.tex`; `cv.tex` wording wins on any conflict. The site may show showcase items the 1-page CV omits (Twitch TTS Bot, FitJourney, the LongPlan thesis).
- `src/components/Experience.tsx`, `About.tsx` and `Projects.tsx` are unused and still carry claims that were removed as unverified; they must not be revived.
- Public-disclosure boundary for SCB TechX work, FinOps especially: employer, product, stack and what Panthaweekan built, matching the CV and LinkedIn text. A generic flow diagram is allowed (agent → collector → Kafka → engine → dashboard). Never show internal repo names, ticket IDs, colleagues' names, security internals, PR counts or deployment state. The AI cost dashboard carries no status label; nothing in FinOps is described as production.
- English only.

## Brand Commitments

- Voice: plain first person ("I build…"), short factual sentences, no hype words.
- Name: Panthaweekan Somngam; short form "Panthaweekan S."; initials "PS".
- `DESIGN_SYSTEM.md` describes an older monochrome system the current site no longer follows; it is not binding.

## Evidence on Hand

- `public/cv.pdf` and `cv.tex`: the 1-page CV (Oct 2026).
- `src/data/portfolio-data.ts`: experience, projects (with architecture layer data), skills, education.
- `/present` deck and its assets under `public/present-icons` and `public/imgs`.
- Statements Panthaweekan approved on 2026-10-16 for the About me deck (why Panthaweekan builds software, the CMU work-study team and Panthaweekan's PM role, the team's AI-first flow, reusable AI skills, Twitch streaming, the next role sought, AI tools used): recorded in docs/superpowers/specs/2026-10-16-two-deck-present-design.md. The PM role and AI tools are not yet in cv.tex.
- Public GitHub repos: FitJourney, Twitch TTS Bot.
- Quantities that are safe to state, because the CV states them: SCB Easy's 10M+ user platform (the gateway migration target), the migration's 30+ services, six user roles and four request lifecycles in the asset platform.
- Absent, and not to be fabricated: testimonials, user counts for the CMU apps (an earlier "500+ users" claim was removed as unverified), organisation-wide adoption of the asset platform, production status for the gateway migration or FinOps, performance benchmarks.

## Product Principles

1. **The CV and the site never disagree.** Every claim on the site traces to `cv.tex` or to a showcase item the user approved.
2. **Respect the screener's minute.** Role, current work, the strongest proof and a way to make contact are reachable without scrolling far or reading paragraphs.
3. **Depth on demand.** Deep dives exist for interviewers but never block the quick scan.
4. **Show the system, not adjectives.** Prefer a diagram, a concrete mechanism or an artifact over a claim about being skilled.
5. **Public-safe by default.** When unsure whether employer detail may be shown, leave it out.
