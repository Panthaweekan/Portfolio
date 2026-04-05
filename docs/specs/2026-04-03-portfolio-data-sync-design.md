# Portfolio Data Sync — Centralized Data Layer

## Goal

Create a single source of truth (`src/data/portfolio-data.ts`) for all portfolio content, then refactor the two active components (`PortfolioBento.tsx` and `Resume.tsx`) to import from it. Fix all data discrepancies so the portfolio matches the CV, while allowing the portfolio to include extra items not on the CV.

## Data Source Rules

- **CV (`cv.tex`) is the baseline** — all CV content must appear in the portfolio
- **Portfolio can be a superset** — items like MySQL, CA Layer 7, etc. that are in the portfolio but not the CV are kept
- **No portfolio-only data may contradict the CV** — e.g. "2,000+ users" must become "500+" to match

## Proposed Changes

---

### New File: `src/data/portfolio-data.ts`

Single TypeScript module exporting typed data objects:

#### Personal Info
```
name: "Panthaweekan Somngam"
title: "Software Engineer"  (CV line 39, currently "Full-Stack Developer" in meta tags)
location: "Bangkok, Thailand (GMT+7)"
availability: "Open to Remote"
email: "panthaweekansomngam@gmail.com"
phone: "+66 946359510"
github: "https://github.com/Panthaweekan"
linkedin: "https://www.linkedin.com/in/panthaweekan/"
portfolio: "https://panthaweekan.github.io/Portfolio/"
spokenLanguages: ["English (Intermediate)", "Thai (Native)"]
```

#### Technical Skills (9 categories, CV-aligned + portfolio extras)

| Category | Items (from CV + portfolio extras) |
|---|---|
| Languages | Go (primary), TypeScript, JavaScript, Ruby, Python, SQL, HTML/CSS, Haskell, Java, C++, Rust (Learning) |
| Backend | Fiber/Gin, Ruby on Rails, NodeJS, RESTful APIs, gRPC, Microservices Architecture, Rust (Intermediate), Haskell |
| Frontend | React, TypeScript, Vite, Tailwind CSS, PWA, TanStack, Shadcn, NextJS |
| API Gateway | Kong API Gateway Best Practices, API Routing, Rate Limiting, Zero-Downtime Deployment |
| Databases | PostgreSQL, Redis, MySQL, Database Design, Indexing, Database-Driven Architecture |
| Cloud/DevOps | Kubernetes, Docker, AWS, Jenkins CI/CD, HashiCorp Vault, Linux |
| Monitoring | Prometheus, Grafana, Kibana (ELK Stack) |
| AI Agent Tooling | Prompt Engineering, Agentic Workflow Design |
| Practices | Agile/Scrum, TDD, Code Review, Git, AI-Driven Development, SDLC, Functional Programming |

> MySQL is a portfolio extra (not in CV). Rust (Learning) kept in Languages as portfolio extra.

#### Work Experience (2 entries)

**SCB TechX — Associate Software Engineer** (May 2025 – Present)
- Location: Bangkok, Thailand (Hybrid)
- Technologies: Go, Fiber, Kong, Rails, React, TypeScript
- 5 bullet points exactly matching CV lines 63-67

**Chiang Mai University — Full Stack Developer (Work-Study Scholarship)** (2023 – 2025)
- Location: Chiang Mai, Thailand
- Technologies: Go, Fiber, React, TypeScript, PostgreSQL, Docker
- 3 bullet points exactly matching CV lines 73-75
- Note: "500+ active users" (CV), not "2,000+"

#### Key Projects (3 entries from CV + 2 portfolio extras)

1. **Custom Hybrid API Gateway Solution** (2025 – Present)
   - Tech: Go, Fiber/FastHTTP, PostgreSQL, Redis, Kong, Kubernetes, Microservice
   - Description: from CV line 84

2. **Inventory Asset Management System** (2025)
   - Tech: Ruby on Rails, React, PostgreSQL, REST APIs, Docker
   - Description: from CV line 92

3. **SD-Booking (Room Reservation System)** (2023 – 2024)
   - Tech: Go, React, TypeScript, PWA, Webhooks
   - Description: from CV line 100

4. **LongPlan Validator** (portfolio extra, from thesis)
   - Tech: Go, React, Graph Algorithms
   - Description: Senior thesis validating 200+ curriculum rules

5. **SD-Letter** (portfolio extra, from experience bullets)
   - Tech: Go, React, TypeScript, WebHooks
   - Description: Certificate request workflow with multi-stage approval

#### Education

```
degree: "Bachelor of Engineering in Computer Engineering"
school: "Chiang Mai University"
graduated: "2025"
honours: "Second-Class Honours"
gpa: "3.32/4.00"
thesis: "LongPlan — Study Plan Validator (algorithmic validation with graph algorithms and curriculum rule enforcement)"
```

---

### Modify: `PortfolioBento.tsx`

- Remove all hardcoded `experiences`, `projects` arrays
- Import from `@/data/portfolio-data`
- Update tech stack section to render all 9 CV categories (currently only shows 4: Languages, Backend & Frameworks, Data & DevOps, Architecture & Practices)
- The bento grid visual layout stays identical
- Fix: CMU title from "Full Stack Developer" → "Full Stack Developer (Work-Study Scholarship)"
- Fix: CMU location from "Chiang Mai" → "Chiang Mai, Thailand"  
- Fix: CMU highlights use "500+" not "2,000+"
- Add missing experience bullet points from CV

---

### Modify: `Resume.tsx`

- Remove all hardcoded content (header, skills grid, experience, education, projects)
- Import everything from `@/data/portfolio-data`
- Layout and CSS remain exactly the same
- All text content now comes from the centralized data

---

### Modify: `index.html`

- Fix `<title>` from "Full-Stack Developer" → "Software Engineer"
- Fix `og:title` and `twitter:title` similarly
- Fix `og:description` and `twitter:description` to match current role description
- Fix `meta description` and `meta keywords`

---

## Files Changed

| File | Action |
|---|---|
| `src/data/portfolio-data.ts` | **NEW** — centralized data |
| `src/components/PortfolioBento.tsx` | **MODIFY** — import from data, fix discrepancies |
| `src/components/Resume.tsx` | **MODIFY** — import from data |
| `index.html` | **MODIFY** — fix meta tags |

## Out of Scope

- No changes to visual layout/design of bento grid
- No changes to unused components (Hero, About, Projects, Experience)
- No changes to routing, build config, or dependencies
- No new npm packages

## Verification

1. `npm run build` succeeds with no TypeScript errors
2. Dev server shows identical bento layout with corrected data
3. Resume page renders with all CV data
4. Meta tags reflect "Software Engineer" title
