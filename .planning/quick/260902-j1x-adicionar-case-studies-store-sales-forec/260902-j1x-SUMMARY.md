---
phase: quick-260902-j1x
plan: 01
subsystem: content
tags: [astro, mdx, content-collections, svg, rag, forecasting, lightgbm, i18n]

requires:
  - phase: 03-case-study-template-and-content
    provides: projects/projectsPt content collections, Zod schema, [slug].astro renderer, ProjectCard, diagram-style SVG convention
provides:
  - EN + PT case study for store-sales-forecasting (Kaggle time-series forecasting)
  - EN + PT case study for finance-notes-rag (local-first RAG over financial PDFs)
  - Hand-authored dark-theme SVG architecture diagrams for both new projects
  - Vendored Streamlit interface screenshot for finance-notes-rag
  - Home featured grid (EN + PT) promoted to store-sales-forecasting / analise-cenarios / finance-notes-rag
affects: [future case-study additions, homepage curation]

tech-stack:
  added: []
  patterns:
    - "Branch/converge SVG diagrams on a taller canvas reusing the exact redshift-dbt token set (#0a0e14 bg, #111827 boxes, #1e293b stroke, #22d3ee arrows, ui-sans-serif font, arrowhead marker)"
    - "One language-neutral SVG per project, referenced by both EN and PT MDX via diagramPath"

key-files:
  created:
    - public/projects/store-sales-forecasting/diagram.svg
    - public/projects/finance-notes-rag/diagram.svg
    - public/projects/finance-notes-rag/interface.png
    - src/content/projects/store-sales-forecasting.mdx
    - src/content/projects/finance-notes-rag.mdx
    - src/content/projects-pt/store-sales-forecasting.mdx
    - src/content/projects-pt/finance-notes-rag.mdx
  modified:
    - src/pages/index.astro
    - src/pages/pt/index.astro

key-decisions:
  - "Used `npm run build` as the authoritative frontmatter-validation gate instead of `npx astro check` (the @astrojs/check package is not installed and its install prompt is interactive; the glob content collections + Zod schema fail the build on any malformed frontmatter, so build coverage is equivalent for this change)"
  - "Kept both new case studies' Impact/Impacto sections in the established honest 'self-directed practice project' framing (ties to disclosed employers, no fabricated business/revenue numbers); only real competition/eval metrics used (RMSLE, hit@k, MRR, abstention rate)"

patterns-established:
  - "Multi-lane / branching SVG pipeline diagrams: taller viewBox (1040x340, 1040x360) with the unchanged redshift-dbt visual tokens"

requirements-completed: [QUICK-260902-j1x]

duration: ~12min
completed: 2026-09-02
---

# Phase quick-260902-j1x: Add store-sales-forecasting and finance-notes-rag case studies Summary

**Two new bilingual case studies (Kaggle time-series forecasting + local-first financial-statement RAG) added with hand-authored dark-theme SVG diagrams and promoted to the homepage featured grid, replacing sales-real-time and sql-pyspark-translator.**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-09-02T13:47:00Z
- **Completed:** 2026-09-02T13:55:00Z
- **Tasks:** 3 completed
- **Files modified:** 9 (7 created, 2 edited)

## Accomplishments
- Authored 4 MDX case studies (EN + PT) with schema-valid frontmatter; production build validates all four against the Zod content-collection schema
- Hand-wrote 2 branch/converge SVG diagrams that reuse the exact existing diagram token set, plus vendored a real 78 KB Streamlit screenshot for finance-notes-rag
- Repointed both homepage featured grids (EN + PT) to store-sales-forecasting / analise-cenarios / finance-notes-rag; the two dropped projects remain in the full /projects/ gallery

## Task Commits

Each task was committed atomically:

1. **Task 1: Vendor the screenshot and author both SVG diagrams** - `95c9d77` (feat)
2. **Task 2: Author the four MDX case studies (EN + PT)** - `fa1518a` (feat)
3. **Task 3: Promote both projects to the home featured grid and verify the full build** - `bd37242` (feat)

## Files Created/Modified
- `public/projects/store-sales-forecasting/diagram.svg` - Feature Panel -> direct + recursive LightGBM -> learned blend -> post-process -> 16-day forecast (viewBox 0 0 1040 340)
- `public/projects/finance-notes-rag/diagram.svg` - 7-stage pipeline: offline indexing lane + online query lane converging at retrieval -> generation -> cited answer (viewBox 0 0 1040 360)
- `public/projects/finance-notes-rag/interface.png` - Vendored Streamlit UI screenshot (PNG, 1364x558, ~78 KB)
- `src/content/projects/store-sales-forecasting.mdx` - EN case study, category data-science, order 6, notebookUrl + diagramPath set
- `src/content/projects/finance-notes-rag.mdx` - EN case study, category data-science, order 7, diagramPath + imagePaths set, no notebookUrl/demoUrl
- `src/content/projects-pt/store-sales-forecasting.mdx` - PT translation (## Problema / ## Abordagem / ## Impacto)
- `src/content/projects-pt/finance-notes-rag.mdx` - PT translation (## Problema / ## Abordagem / ## Impacto)
- `src/pages/index.astro` - featuredSlugs -> ['store-sales-forecasting', 'analise-cenarios', 'finance-notes-rag']
- `src/pages/pt/index.astro` - featuredSlugs -> ['store-sales-forecasting', 'analise-cenarios', 'finance-notes-rag']

## Verification

- `npm run build` exits 0; 23 pages built. Zod schema validated all 4 new MDX frontmatters.
- New routes emitted: `dist/projects/store-sales-forecasting/index.html`, `dist/projects/finance-notes-rag/index.html`, and the `dist/pt/projects/...` equivalents.
- `dist/index.html` and `dist/pt/index.html` both contain "Store Sales" and "RAG" featured cards; zero `/projects/sales-real-time/` links remain anywhere on the EN home page; the featured section no longer references sales-real-time or sql-pyspark.
- Both new SVGs use `#0a0e14` background, `#111827` boxes, `#1e293b` stroke, `#22d3ee` arrows/arrowhead, `ui-sans-serif` font — visually consistent with `public/projects/redshift-dbt/diagram.svg`.
- No fabricated business/revenue metrics in any Impact/Impacto section; only real, verifiable competition and evaluation figures (RMSLE 0.38924/0.38469 vs 0.52063 naive; retrieval hit@k 82%, MRR 0.75, 65% correct answers, 100% correct abstention).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] `npx astro check` not runnable non-interactively**
- **Found during:** Task 2 verification
- **Issue:** `@astrojs/check` is not in devDependencies (only `typescript` is). `npx astro check` prompts interactively to install `@astrojs/check typescript` and cannot proceed in this environment.
- **Fix:** Fell back to `npm run build` as the authoritative validation gate, as anticipated by the plan's `<notes>`. The glob-based content collections + Zod schema fail the build on any malformed frontmatter, so this fully covers the intent of the `astro check` step for this change.
- **Files modified:** none
- **Commit:** n/a (verification-only substitution)

**2. [Rule 3 - Blocking] `node_modules` absent in the worktree**
- **Found during:** Task 1 / setup
- **Issue:** The isolated worktree had no installed dependencies, so `astro build` could not run.
- **Fix:** Ran `npm ci` (package-lock.json present) once at the start. No lockfile or dependency changes.
- **Commit:** n/a

## Known Stubs

None. Both case studies render full prose, a diagram, and (for finance-notes-rag) the interface screenshot from real committed assets.

## Post-execution polish (orchestrator)

Three follow-up commits after the worktree merged to `main`:

- `d7011e5` — removed internal `.mdx` filenames that leaked into the visitor-facing Impact copy of `store-sales-forecasting` (EN + PT); tracked `260902-j1x-PLAN.md` (it had lived only in the shared checkout).
- `86945bd` — redrew both SVG diagrams. The executor's first pass had sublabels 2–3× wider than their boxes (verified by rendering to PNG). Rewrote with short sublabels matching `redshift-dbt/diagram.svg`, wider boxes, corrected viewBox (`1200×340` forecasting, `1160×360` RAG), plus offline/online lane headers and a dashed convergence arrow on the RAG diagram.
- `cd8825f` — recorded the quick task in `STATE.md`.

Reverted a spurious `.planning` entry that appeared in `.gitignore` during the run (the repo tracks `.planning/`). Removed the completed worktree + branch.

## Self-Check: PASSED

- FOUND: public/projects/store-sales-forecasting/diagram.svg
- FOUND: public/projects/finance-notes-rag/diagram.svg
- FOUND: public/projects/finance-notes-rag/interface.png
- FOUND: src/content/projects/store-sales-forecasting.mdx
- FOUND: src/content/projects/finance-notes-rag.mdx
- FOUND: src/content/projects-pt/store-sales-forecasting.mdx
- FOUND: src/content/projects-pt/finance-notes-rag.mdx
- FOUND commit: 95c9d77
- FOUND commit: fa1518a
- FOUND commit: bd37242
