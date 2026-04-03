# Resume Data Synchronization & PDF Direct Download Design

## Overview
The goal of this design is to update the portfolio's Resume page so that it exactly matches the data inside the `cv.tex` file, without resorting to embedding the LaTeX-generated PDF directly into the DOM (which is bad for mobile and dark mode). We will also upgrade the "Export to PDF" button to link directly to a pre-compiled `cv.pdf` for a pure high-fidelity document download.

## Approach: Native React Component + Direct PDF Download

### 1. Data Synchronization
**File:** `src/data/portfolio-data.ts`
- **Technical Skills:** Update the arrays to match the `cv.tex` rows (Languages, Backend, Frontend, API Gateway, Databases, Cloud/DevOps, Monitoring, AI Agent Tooling, Practices).
- **Professional Experience:** Replace or update existing job bullets and tech stacks for "Associate Software Engineer" at SCB TechX and "Full Stack Developer" at CMU to match the `cv.tex` word-for-word.
- **Projects:** Bring the "Custom Hybrid API Gateway Solution", "Inventory Asset Management System", and "SD-Booking" project descriptions and tech stacks strictly in line with the `.tex` files.
- **Education:** Refresh the GPA, honours string, and thesis description.

### 2. PDF Export Button Update
**File:** `src/components/Resume.tsx`
- **Action:** Instead of invoking `window.print()` (which attempts to print the React DOM in A4 layout via CSS, often resulting in margin issues depending on the user's browser), the button will be changed to a `<a href="/cv.pdf" download="Panthaweekan_Somngam_CV.pdf">` link. 
- **User Requirement:** You will just need to make sure there is a pre-compiled `cv.pdf` inside your `/public/` directory eventually. This provides exact visual fidelity for recruiters when they click "Download".

### 3. Cleanup & Polish
**File:** `src/styles/resume.css`
- If we eliminate the `window.print()` dependency, we can potentially drop some `print` media query hacks that existed just to format the React DOM for paper printing. However, to keep scope contained and safe, we can leave the print styles and just prioritize the new native PDF download flow.

## Timeline / Implementation Steps
1. Translate `cv.tex` fields manually into the `portfolio-data.ts` JSON schema.
2. Edit `Resume.tsx` to handle the direct PDF download.
3. Test layout to ensure `Resume.tsx` still renders correctly with the new strings.
