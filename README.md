# Portfolio

Personal site of Panthaweekan Somngam, Associate Software Engineer at SCB TechX.

**Live:** [panthaweekan.github.io/Portfolio](https://panthaweekan.github.io/Portfolio/)

The site reads as "The Engineer's Annual Report": a short report on the systems Panthaweekan has built, from a written spec to running code.

| Route | What it is |
|---|---|
| `/` | The report: Figure 1 (one LLM call becomes money), a chapter per system with an architecture figure, the record, skills and contact. |
| `/resume` | The CV as a PDF (`public/cv.pdf`, built from `cv.tex`). |
| `/present` | A 12-slide talk for a live "walk me through your work" screen share. Use the arrow keys, Space, Home/End, 1–9, or F for fullscreen; `?slide=N` opens a given slide. |

## Stack

React 19, TypeScript, Vite 7, Tailwind CSS 3, React Router 7, framer-motion, lucide-react, and Archivo as the only typeface. It deploys to GitHub Pages.

## Develop

```bash
npm install
npm run dev            # http://localhost:5173/Portfolio/
npm run build          # production build in dist/ (type-check with npx tsc --noEmit)
npm run preview        # serve the build
npm run check:deck     # deck outline: slide order, contents, folios
npm run check:figure   # Figure 1 animation clock
```

## Where things live

- `src/data/portfolio-data.ts` holds all site content, kept in step with `cv.tex`.
- `src/components/report/` is the home page; `src/components/present/` and `Present.tsx` are the deck.
- `PRODUCT.md` covers audience, positioning and what may be stated publicly.
- `DESIGN.md` is the design system for every route.

## Deploy

Pushing to `main` builds and deploys through `.github/workflows/deploy.yml`. The Vite `base` and the `<base href>` in `index.html` are both `/Portfolio/`.

## License

ISC (see `package.json`).

## Contact

- GitHub: [@Panthaweekan](https://github.com/Panthaweekan)
- LinkedIn: [panthaweekan](https://www.linkedin.com/in/panthaweekan/)
- Email: panthaweekansomngam@gmail.com
