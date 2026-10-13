# CLAUDE.md

Portfolio site for Panthaweekan Somngam: React 19, TypeScript, Vite, Tailwind 3, served from GitHub Pages under `/Portfolio/`. Scripts live in `package.json`.

## Read first

- **`PRODUCT.md`** before changing any user-facing copy: audience, positioning, the facts that may be stated, and the public-disclosure boundary for SCB TechX work.
- **`DESIGN.md`** (mirrored in `.impeccable/design.json`) before any UI change: "The Engineer's Annual Report" system for `/`, `/resume` and `/present`, covering tokens, the web and slide type scales, components, and rules.
- `docs/superpowers/specs/` and `docs/superpowers/plans/` record why past redesigns look the way they do.

## Facts

All content lives in `src/data/portfolio-data.ts`. `cv.tex` (built to `public/cv.pdf`) is the source of truth: its wording wins on any conflict, and every claim on the site traces back to it. In docs, refer to Panthaweekan by name.

## Map

- `/` is `components/report/ReportHome.tsx`, built from `Masthead`, `Chapter`, `FigureOne` and `LayerFigure`.
- `/resume` is `components/Resume.tsx`, which embeds `public/cv.pdf`.
- `/present` is `components/Present.tsx` (the stage, keys, chrome and `?slide=N`) plus `components/present/`:
  - `outline.ts`: slide order;
  - `slides.tsx`: the slides;
  - `SlideFrame.tsx`: margins and folio;
  - `Divider.tsx`: chapter openers.
- `hooks/useTheme.ts` keeps one `theme` key in localStorage for every route and falls back to the OS setting.
- `lib/figureClock.ts` drives Figure 1's animation.

## Gotchas

- `index.html` sets `<base href="/Portfolio/">`, so a bare `#id` href reloads the page. Build in-page links from `window.location.pathname + search`, as `Masthead` does.
- **Deck page numbers:** the contents page and every folio derive from `outline.ts`. Add or move slides there, never type a page number, and update `scripts/check-deck.mjs` to match.
- **Deck canvas:** slides render on a fixed 1920×1080 canvas scaled to fit, so slide markup uses fixed px classes. `sm:`/`md:` prefixes follow the viewport, not the canvas, and reflow slides on phones. `FigureOne slide` and `LayerFigure size="slide"` are the breakpoint-free variants.
- **`FigureOne` geometry:** each class set in `SIZES` ties `dotOffset` to its dot and text classes, so change them together. The home page's Figure 1 must render unchanged.
- **Tailwind:** it keeps only class names that appear whole in source, so write class strings as literals and never assemble them from fragments.
- **`career-ops/`** is a separate nested repo, untracked here. Stage explicit paths; never `git add -A` at the root.
- **Legacy files:** `resume.html`, `index.html.backup` and `DEPLOYMENT.md` are leftovers from the pre-React site and are not part of the build.

## Verify

- `npx tsc --noEmit -p tsconfig.json`, then `npm run build`, `npm run check:deck` and `npm run check:figure`.
- **Preview:**
  - Run `pkill -f "vite preview"` first, because stale previews serve old builds.
  - Then `npm run build && npx vite preview --port 4173 --strictPort`.
  - Open `http://localhost:4173/Portfolio/`.
  - In a browser session, go to `about:blank` before loading a URL that differs only by `#hash` or `?query`; otherwise the old bundle stays loaded.
- **Screenshots:** the repo has no Playwright of its own. Use `career-ops/node_modules/.bin/playwright screenshot`. A 1920×1186 viewport renders a slide at scale 1.
- **CV:** rebuild with `tectonic -o public cv.tex`.

## Git

Use conventional commits (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`). Pushing `main` deploys the site via `.github/workflows/deploy.yml`, so work on a branch and open a PR.
