---
phase: 03-case-study-template-project-content
plan: 04
subsystem: data-science-case-studies
tags: [content, mdx, astro-content-collections, github-api]
dependency_graph:
  requires:
    - "Extended projects Content Collection schema (03-01)"
    - "src/pages/projects/[slug].astro dynamic case study route (03-01)"
    - "src/components/ProjectCard.astro (03-01)"
  provides:
    - "DS case study content for Sales_Real_Time (pet-product sales monitoring dashboard)"
    - "DS case study content for Postgres-Clean-Process-SuperStore (data-quality pipeline)"
    - "Real thumbnail image reused from Sales_Real_Time repo (PowerBI_2.png)"
    - "Real ERD diagram image reused from Postgres-Clean-Process-SuperStore repo (SuperStore_ERD.png)"
  affects:
    - "Gallery page (/projects/) now lists both DS case studies"
    - "Site-wide navigation and card image rendering (BASE_URL bug fix affects every project card and case study page)"
tech_stack:
  added: []
  patterns:
    - "GitHub Contents API (api.github.com/repos/<owner>/<repo>/contents/) used to discover and download real repo screenshots/diagrams for reuse as case study assets"
    - "Self-directed impact framing pattern: tie personal/practice projects to real disclosed employer experience (Pet Premium, AI Studio) without fabricating production claims"
key_files:
  created:
    - src/content/projects/sales-real-time.mdx
    - src/content/projects/postgres-clean-process-superstore.mdx
    - public/projects/sales-real-time/thumbnail.png
    - public/projects/postgres-clean-process-superstore/diagram.png
  modified:
    - src/components/ProjectCard.astro
    - src/pages/projects/[slug].astro
    - src/components/Nav.astro
decisions:
  - "Both DS case studies use category: data-science, which is exempt from the superRefine diagramPath enforcement — diagramPath was still included for postgres-clean-process-superstore because a real ERD asset was available and fetchable"
  - "Fixed a pre-existing BASE_URL path-concatenation bug (missing '/' separator) in ProjectCard.astro, [slug].astro, and Nav.astro's Projects link, discovered while verifying this plan's thumbnail/diagram images rendered without broken <img> tags"
metrics:
  duration: "~20min"
  completed: "2026-07-04"
---

# Phase 3 Plan 4: Data Science Case Studies (Sales_Real_Time & SuperStore) Summary

Authored the two Data Science case studies closing out the 5-project featured set: a pet-product sales monitoring dashboard (`Sales_Real_Time`) and a PostgreSQL data-quality/cleaning pipeline (`Postgres-Clean-Process-SuperStore`), both with real images reused directly from their source GitHub repos, and fixed a site-wide broken-URL bug discovered during verification.

## What Was Built

1. **`src/content/projects/sales-real-time.mdx`** — Problem/Approach/Impact case study for the pet-product sales monitoring dashboard. Frontmatter matches the schema exactly (`category: "data-science"`, `repoUrl`, `thumbnail`, `order: 4`). Impact section explicitly frames this as mirroring the disclosed Pet Premium Distribuidora executive KPI dashboard pattern, without fabricating a specific revenue figure.
2. **`public/projects/sales-real-time/thumbnail.png`** — Real dashboard screenshot (`screenshots/PowerBI_2.png`, 102,330 bytes) downloaded directly from the `Sales_Real_Time` GitHub repo via the Contents API and raw download URL; confirmed as a valid 950x541 PNG.
3. **`src/content/projects/postgres-clean-process-superstore.mdx`** — Problem/Approach/Impact case study for the SuperStore data-quality pipeline. Frontmatter includes `diagramPath` since a real ERD image was fetchable (optional for `data-science` category, not enforced by the schema's `superRefine`, but included because reusing a real asset was possible). Impact section ties the work to the disclosed Pet Premium/AI Studio data-quality discipline without claiming production usage.
4. **`public/projects/postgres-clean-process-superstore/diagram.png`** — Real ERD image (`SuperStore_ERD.png`, 124,204 bytes) downloaded directly from the source repo root; confirmed as a valid 1550x1232 PNG.
5. **Bug fix (Rule 1):** `src/components/ProjectCard.astro`, `src/pages/projects/[slug].astro`, and `src/components/Nav.astro` had a pre-existing BASE_URL string-concatenation bug — missing a `/` separator between `import.meta.env.BASE_URL` (which resolves without a trailing slash, e.g. `/gersonlopesr.github.io`) and the appended relative path (e.g. `projects/`), producing malformed URLs like `/gersonlopesr.github.ioprojects/` and `/gersonlopesr.github.ioprojects/sales-real-time/thumbnail.png`. This broke every project card link, the Projects nav link, every card thumbnail image, and this plan's own diagram image. Fixed by adding an explicit `/` in the three template-string interpolations.

## Verification Performed

- `npm run build` exits 0 after both content files were added (5 pages generated: home, projects index, 2 case studies, 404).
- Confirmed via `grep` on the built `dist/` HTML that both case study pages contain `<h2 id="problem">Problem</h2>`, `<h2 id="approach">Approach</h2>`, `<h2 id="impact">Impact</h2>`, and the phrase "Pet Premium" in their Impact sections.
- Confirmed neither Impact section fabricates a revenue/sales figure or claims production usage — both frame the work as self-directed practice mirroring real disclosed experience.
- Confirmed both `repoUrl` links (`github.com/gersonlramos/Sales_Real_Time`, `github.com/gersonlramos/Postgres-Clean-Process-SuperStore`) render correctly in the built HTML footer.
- After the BASE_URL fix, confirmed via `grep` on rebuilt `dist/` HTML that all project card hrefs, the Projects nav link, the sales-real-time thumbnail `<img src>`, and the postgres-clean-process-superstore diagram `<img src>` all resolve to well-formed paths (e.g. `/gersonlopesr.github.io/projects/sales-real-time/thumbnail.png`) with no double slashes and no missing separators.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed BASE_URL path-concatenation bug affecting every project card, nav link, and case-study image**
- **Found during:** Task 2 verification (checking that the newly added diagram image rendered without a broken `<img>` tag)
- **Issue:** `ProjectCard.astro` (`${baseUrl}projects/${project.id}/` and `${baseUrl}${project.data.thumbnail...}`), `[slug].astro` (`${baseUrl}${project.data.diagramPath...}`), and `Nav.astro` (`${homeHref}projects/`) all concatenated `import.meta.env.BASE_URL` directly against a relative path with no `/` separator. Since `BASE_URL` resolves to `/gersonlopesr.github.io` (no trailing slash) in this project's config, this produced malformed URLs like `/gersonlopesr.github.ioprojects/sales-real-time/thumbnail.png` — a 404 in production.
- **Fix:** Added an explicit `/` in each of the four affected template-string interpolations, matching the already-correct pattern used elsewhere in the codebase (`src/pages/index.astro`'s `${baseUrl}/resume.pdf`).
- **Files modified:** `src/components/ProjectCard.astro`, `src/pages/projects/[slug].astro`, `src/components/Nav.astro`
- **Commit:** `00b5aeb`

## Known Stubs

None. Both case studies have real, fetched images (not placeholders) and real GitHub repo links, and both build and render correctly.

## Self-Check: PASSED

- FOUND: src/content/projects/sales-real-time.mdx
- FOUND: src/content/projects/postgres-clean-process-superstore.mdx
- FOUND: public/projects/sales-real-time/thumbnail.png
- FOUND: public/projects/postgres-clean-process-superstore/diagram.png
- FOUND commit 886ed1a: feat(03-04): author Sales_Real_Time case study with real thumbnail
- FOUND commit 00b5aeb: feat(03-04): author Postgres-Clean-Process-SuperStore case study; fix BASE_URL path bug
