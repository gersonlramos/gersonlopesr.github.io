---
phase: 03-case-study-template-project-content
plan: 01
subsystem: projects-infrastructure
tags: [astro, content-collections, routing, schema, nav, footer]
dependency_graph:
  requires: []
  provides:
    - "Extended projects Content Collection schema (category, impactSummary, diagramPath, demoUrl + superRefine)"
    - "src/pages/projects/index.astro gallery route (PROJ-01)"
    - "src/pages/projects/[slug].astro dynamic case study route (PROJ-02)"
    - "src/components/ProjectCard.astro reusable card component"
    - "Projects nav entry and corrected GitHub footer link"
  affects:
    - "Wave 2 plans (03-02..03-05) author MDX content files against this schema and these routes"
tech_stack:
  added: []
  patterns:
    - "Astro Content Layer API (glob loader + Zod schema, getStaticPaths + render())"
    - "BASE_URL-safe internal links (${baseUrl}projects/${project.id}/)"
    - "Dark tech design tokens (border-border, bg-surface, text-accent, text-foreground, text-muted-foreground)"
key_files:
  created:
    - src/components/ProjectCard.astro
    - src/pages/projects/index.astro
    - "src/pages/projects/[slug].astro"
  modified:
    - src/components/Footer.astro
    - src/components/Nav.astro
    - src/content.config.ts
decisions:
  - "Fixed broken GitHub profile link (gersonlopesr -> gersonlramos) per D-09, confirmed by user in 03-CONTEXT.md"
  - "Schema uses superRefine to enforce diagramPath for data-engineering category at build time (PROJ-04), per 03-RESEARCH.md Pattern 1"
  - "No filter/sort UI on the gallery per D-05 — intentionally minimal at 3-5 project scale"
metrics:
  duration: "~15min"
  completed: "2026-07-04"
---

# Phase 3 Plan 1: Projects Infrastructure Summary

Extended the `projects` Content Collection schema and shipped the gallery + dynamic case-study routes that every Wave 2 content plan will render through, plus fixed the broken GitHub footer link and added the Projects nav entry.

## What Was Built

1. **Footer GitHub link fix** — `src/components/Footer.astro`'s `contactLinks` GitHub entry now points to `https://github.com/gersonlramos` (was the broken `gersonlopesr`, which 404s), per D-09.
2. **Projects nav entry** — `src/components/Nav.astro`'s `navLinks` array now reads Home, About, Experience, Projects, Contact, with the new entry using the existing BASE_URL-safe href pattern (`${homeHref}projects/`).
3. **Extended content schema** — `src/content.config.ts` now includes `category` (enum: `data-science` | `data-engineering`), `impactSummary`, `diagramPath` (optional), and `demoUrl` (optional), plus a `superRefine` that fails the build if a `data-engineering` entry lacks `diagramPath` (enforces PROJ-04 at build time, not silently).
4. **ProjectCard component** — `src/components/ProjectCard.astro` renders an optional thumbnail, a category badge, title, summary, and stack tags, linking to the case-study route; matches dark-tech design tokens with a `hover:border-accent` state.
5. **Gallery page** — `src/pages/projects/index.astro` renders a sorted grid of all project entries via `getCollection('projects')`, no filter/sort UI per D-05.
6. **Dynamic case-study route** — `src/pages/projects/[slug].astro` uses `getStaticPaths()` + `render()` (current Astro 7 Content Layer API, `project.id` not `.slug`) to generate one static page per project, rendering category badge, title, impactSummary, stack tags, optional architecture diagram, the MDX body via `<Content />`, and repo/notebook/demo links in the footer.

All three tasks build cleanly with zero content entries (expected "no files found matching" warning from the glob loader); `dist/projects/index.html` is produced and the dynamic route generates 0 pages today, ready to generate 5 once Wave 2 content lands.

## Deviations from Plan

None — plan executed exactly as written. All frontmatter/template blocks were copied verbatim from the plan's `<action>` sections as directed.

## Known Stubs

None. This plan intentionally ships zero content entries — Wave 2 plans (03-02 through 03-05) populate `src/content/projects/` with real `.mdx` case studies. The gallery and case-study routes are infrastructure, not stubs: they correctly render nothing today because there is nothing to render yet, and this is the plan's explicitly stated "done" condition ("Builds cleanly with zero content entries — Wave 2 populates content").

## Self-Check: PASSED

- FOUND: src/components/ProjectCard.astro
- FOUND: src/pages/projects/index.astro
- FOUND: src/pages/projects/[slug].astro
- FOUND: src/components/Footer.astro (contains `github.com/gersonlramos`, no longer contains `github.com/gersonlopesr` in a GitHub URL — the `gersonlopesr@gmail.com` mailto address is the user's real email, unrelated to the GitHub-URL bug)
- FOUND: src/components/Nav.astro (contains Projects nav entry)
- FOUND: src/content.config.ts (contains category, impactSummary, diagramPath, demoUrl, superRefine)
- FOUND commit 92d0c1c: feat(03-01): fix GitHub link, add Projects nav entry, extend content schema
- FOUND commit 22c9861: feat(03-01): build ProjectCard component and gallery page (PROJ-01)
- FOUND commit 999a715: feat(03-01): build dynamic case study route (PROJ-02)
