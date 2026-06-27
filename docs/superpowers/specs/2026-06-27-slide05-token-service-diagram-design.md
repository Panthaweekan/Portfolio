# Slide 05 redesign — Token Service integration diagram

**Date:** 2026-06-27
**Scope:** One slide. The `"API Gateway — High-level"` entry (slide 05) in `src/data/present-slides.ts`.

## Context

Slide 05 currently shows the request flow as a flat single row of 7 equal boxes
(Mobile → F5 → WAF → CA Layer7 → Kong → istio → Microservices). Two problems:

1. It mislabels **Kong** as "my service" — conflating the gateway with the presenter's
   actual work.
2. It doesn't show what the presenter actually built or how it integrates.

The presenter's real responsibility is the **API Gateway MS (Go token service)**, which sits
*behind* Kong and is invoked **conditionally**. The goal of this redesign: keep the deck's
minimalist Space-Mono / grid / blue aesthetic, but restructure into a real architecture diagram
(inspired by a Bold-BI-style reference) that **spotlights the token-service integration** and keeps
Kong / edge / mesh as dimmed context. "Here's the system; here's the piece I own and how it plugs in."

## Corrected topology (the truth being drawn)

Two-phase auth flow:

- **Issue (first request, no token):** Kong plugin sees no token → calls the **Token Service**.
  The token service generates a user token and **upserts auth into BOTH Redis and PostgreSQL**,
  then the token is returned to the client.
- **Validate (subsequent requests, token present):** Kong's own validate plugin **looks up Redis
  only** (fast path) — the token service is **bypassed** — then routes on to istio → microservices.

Kong is treated as a black box (not expanded) — it's context, not the subject.

## Design

### Two-tier layout

**Top tier — context spine** (muted, thin, no glow, recessive):
```
[CLIENT]   [—— EDGE · SECURITY ——]              [GATEWAY]   [MESH]    [SERVICES]
 Mobile  →  F5 → WAF → CA Layer7(legacy)   →       Kong   →  istio  →  Microservices
```
`NLB/ALB` and `mesh` remain small connector labels.

**Bottom tier — the integration (blue, bold, glow)** drops from the **Kong** node:
```
                          Kong
                     ①  ╱  │   ▲  ③
              no token  ╱   │   │  validate · lookup Redis only (bypass)
              → issue  ╱    │   │
            ┌─ MY SERVICE ─┐│   │
              API Gateway  ─┘   │
              MS · token svc    │
              (Go) ← my service │
                    │ ② upsert  │
                    ▼  both     │
            ┌──── AUTH STORE ───┴──┐
              Redis  ·  PostgreSQL
              issue → upsert both · validate → Redis only
```

### The three labeled flows (the narrative)

- **① Kong → Token Service** — label `no token → issue`. Blue solid.
- **② Token Service → Redis · PostgreSQL** — label `upsert both`. Blue solid.
- **③ Redis → Kong** — label `validate · Redis only` (the bypass; token svc not called). Blue.

Markers ① ② ③ on the connectors so the eye follows the integration story.

### Visual treatment

- **Zone group boxes:** thin bordered containers, tiny mono-uppercase label
  (`CLIENT`, `EDGE · SECURITY`, `GATEWAY`, `MESH`, `SERVICES`, `MY SERVICE`, `AUTH STORE`).
  Borrowed from the reference; rendered in the deck's existing tokens.
- **Context tier:** `var(--muted)` borders/text, smaller nodes, no glow.
- **Hero tier:** `var(--blue)` borders, `box-shadow:0 0 24px var(--glow)`, bold — the focal point.
- **Icons** (reuse existing assets; full-color `<img>` for real logos, masked glyphs for concepts —
  per the established slide-05/06/10/13 convention):
  - Real logos: Kong (`kong.svg`), istio (`istio.svg`), Redis (`3c0682cf-…`), PostgreSQL (`eafbca31-…`).
  - Concept glyphs (masked, themeable): Mobile (`glyph-phone`), F5 (`glyph-loadbalancer`),
    WAF & CA Layer7 (`glyph-shield`), Microservices (`glyph-grid`).
  - **Token Service:** Go logo (`a00c02a6-83c9-4045-a5fd-dedebc6a6206.svg`) as full-color `<img>` —
    signals "Go service I wrote."

### Constraints / non-goals

- Only slide 05 changes. No other slide, no `Present.tsx` change.
- No new dependencies. Reuse the `dangerouslySetInnerHTML` HTML-string pattern and existing icons.
- Must fit the fixed 1920×1080 canvas without overflow at the deck's scale.
- Kong internals are NOT expanded — it stays a single context node.

## Verification

1. `npm run build` passes (TS strict).
2. Headless-Chrome screenshot slide 05 (`?slide=5`) in **dark** and **light** themes; confirm:
   - Context spine reads muted/recessive; Token Service + the 3 flows read as the blue hero.
   - ① ② ③ labels legible; nothing overflows the 1920×1080 frame.
   - Real logos full-color, concept glyphs recolor with theme.
3. Eyeball the integration story: issue (①) → upsert both (②) → validate-via-Redis bypass (③).
