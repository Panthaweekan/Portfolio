# Resume Synchronization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sync any minor remaining text differences in `portfolio-data.ts` with `cv.tex` and modify the resume component to offer a direct `cv.pdf` download instead of using Javascript `window.print()`.

**Architecture:** We will replace the button's `onClick` handler with an anchor tag linking to `<a href="/cv.pdf" download="Panthaweekan_Somngam_CV.pdf">`. We will also perform minor text syncing in the data file.

**Tech Stack:** React, Tailwind, TypeScript

---

### Task 1: Compile `cv.tex` to `cv.pdf` and place in public

**Files:**
- Modify/Create: `public/cv.pdf`

- [ ] **Step 1: Check for existing pdflatex or tectonic**

Run: `pdflatex --version` or `tectonic --version`
If a local latex compiler exists, run it to build `cv.tex` and move it to `public/cv.pdf`.

- [ ] **Step 2: Fallback (If no compiler exists)**

If the terminal doesn't have a LaTeX compiler, stop and prompt the user to compile their `cv.tex` locally and place the resulting `cv.pdf` into the `public/` directory before proceeding.

### Task 2: Minor Data Sync in `portfolio-data.ts`

**Files:**
- Modify: `src/data/portfolio-data.ts`

- [ ] **Step 1: Update Project Descriptions**

Sync the project descriptions precisely to `cv.tex` (removing trailing periods where omitted, etc).
Change line 273 from:
`"Enterprise asset-tracking platform with request/return workflows, role-based access control."`
to:
`"Enterprise asset-tracking platform with request/return workflows, role-based access control"`

### Task 3: Update `Resume.tsx` Export Button

**Files:**
- Modify: `src/components/Resume.tsx`

- [ ] **Step 1: Replace window.print() logic**

Change the `handlePrint` callback design into a direct download link.
Replace line 17-19:
```typescript
  const handlePrint = useCallback(() => {
    window.print();
  }, []);
```
And replace the button at line 37-40:
```tsx
        <Button asChild>
          <a href="/cv.pdf" download="Panthaweekan_Somngam_CV.pdf">
            <FileDown className="mr-2 h-4 w-4" />
            Export to PDF
          </a>
        </Button>
```

- [ ] **Step 2: Verify application compiles**

Run: `npm run build` or rely on the running dev server without errors.
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/data/portfolio-data.ts src/components/Resume.tsx public/cv.pdf
git commit -m "feat: sync resume data and add native pdf download"
```
