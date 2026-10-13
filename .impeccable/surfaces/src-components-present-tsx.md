---
version: 1
slug: "src-components-present-tsx"
primary_target: "src/components/Present.tsx"
related_targets: []
---

# Surface brief: presentation deck (`/present`)

## Scope and mode

Redesign of `/present` inside the established Annual Report world (DESIGN.md). Visitor mode: Read, presenter-led. Panthaweekan presents it live in a 10–15 minute "walk me through your work" slot; slides support the voice and need not stand alone.

## Audience, job, action

Interviewers and hiring panels watching a screen share. They should leave knowing the FinOps engine story, the gateway work, and the earlier systems, believing "takes systems from a written spec to running code", with a clear way to make contact.

## Proof and constraints

- 12 slides, outline approved: title, contents, three chapters (FinOps, API Gateway, Earlier systems) with dividers, close.
- Facts only from `src/data/portfolio-data.ts` and the CV; the public-disclosure boundary in PRODUCT.md applies. Figure numbers in the FinOps figure are illustrative and labelled.
- Keep: the portrait illustration (`public/present-icons/portrait.jpg`). Everything else from the old deck is free to go.
- Slides are React components reading portfolio data; the HTML-string slide files and their golden snapshot are retired.

## Memorable moment

The FinOps figure slide: the call lands on the dashboard as USD 0.0081, the same figure the home page shows, now at projection scale.

## Direction contract

THESIS: The talk is a short annual report: a contents page the presenter can point back to, an ultramarine divider opening each chapter, and numbered pages. It refuses the dark developer-talk deck of neon glyph tiles, mono labels and terminal prompts.

OWN-WORLD: DESIGN.md unchanged: #FAFAFA ground and #16181D ink, ultramarine #1F3BD6 filling whole divider slides and the one landing figure only, hairline rules, Archivo with tabular folios ("p. 3 / 12"). The portrait plate is the only image.

STORY: The audience learns what Panthaweekan builds, watches one call become money, sees the same discipline in the gateway and the earlier systems, and ends on the contact slide.

FIRST VIEWPORT: Title slide at 1920×1080. Columns 1–7: name at display scale, "I take systems from a written spec to running code.", role and employer, talk folio at the foot. Columns 8–12: the portrait plate, full height, bleeding to the right edge. Next/previous keys and the progress rule live in a thin chrome bar outside the slide.

FORM: Contents and Chapters (annual-report contents page and chapter dividers), position 3 of 6 on the ordered list; seed key 5fec8989.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
