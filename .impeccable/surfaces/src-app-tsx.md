---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: ["src/components/Resume.tsx"]
---

# Surface brief: home (`/`) and resume viewer (`/resume`)

## Scope and mode

Redesign of `/` (currently `PortfolioBento`) and `/resume` (PDF viewer). `/present` is out of scope. Visitor mode: Experience (portfolio), with a Persuade obligation: every viewport keeps a way to download the CV and make contact.

## Audience, job, action

Hiring screeners from the CV or LinkedIn, 1–3 minutes, laptop in daylight, sometimes phone. They must leave believing "takes a system from a written spec to running code", then contact, download the CV, read one deep dive, or open `/present`.

## Proof and constraints

- Proof: FinOps engine (lead), API gateway migration, enterprise asset platform, SD-Booking, FitJourney, TTS Bot; facts from `src/data/portfolio-data.ts` only.
- Keep: light/dark toggle, per-project architecture diagrams (redrawn as report figures), a visible link to `/present`.
- Feels wrong: generic dev template (bento, logo grids, gradient name), slow or showy effects, stiff corporate tone, over-claiming.
- Figure 1 numbers are an illustrative example and are labelled as such.

## Memorable moment

Figure 1: one LLM call travels the pipeline as a single continuous line and arrives as a priced, attributed line item.

## Unresolved

- Whether each system gets its own deep-dive route or an expandable section on the home page.

## Direction contract

THESIS: The portfolio is a one-person annual report: each system Panthaweekan built is a chapter with one exact, living figure. It refuses the dev-portfolio arrangement of gradient hero, bento cards and tech-logo grids.

OWN-WORLD: Bright white stock (#FAFAFA) with graphite type (#16181D); one ultramarine field (#1F3BD6) owns a whole region per spread, never sprinkled as accents; cool grey hairlines (#C9CDD6). Archivo grotesk throughout, flush left, tabular figures; a strict 12-column grid; captions and figure numbers set like an annual report. Dark theme is the same report at night: ink ground, ultramarine lifted to stay legible.

STORY: The screener sees what Panthaweekan does, watches it happen once in Figure 1, scans chapters by system, and leaves with the CV or a message.

FIRST VIEWPORT: 12 columns. Columns 1–5: name, the line "I take systems from a written spec to running code.", current role and employer, then Download CV (default, primary), Email, LinkedIn. Columns 6–12, full height on an ultramarine field: "Figure 1", one illustrative call drawn as one continuous line through Agent step → Collector → Kafka → Engine → Dashboard, on one shared clock, the next station marked before arrival, damped easing; caption labels it illustrative. Download CV stays reachable in every later viewport.

FORM: The Engineer's Annual Report (Swiss International Typographic Style annual reports), position 5 of 7 on the ordered list; seed key aab0f460.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
