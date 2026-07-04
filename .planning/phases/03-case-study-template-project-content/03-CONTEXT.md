# Phase 3: Case Study Template & Project Content - Context

**Gathered:** 2026-07-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 3 delivers the core value of the entire site: a projects gallery and a locked problem→approach→impact case-study template applied to the user's real DS/DE projects, with explicit business-impact framing, static architecture diagrams for DE work, and links out to full code/notebooks on GitHub.

Out of scope in this phase: narrative/about/experience content (Phase 2, done), broad polish/performance/SEO hardening (Phase 4). The flagship interactive-demo requirement (PROJ-06) is in this phase's scope per the roadmap, but its specifics were not discussed this round (see Deferred).

</domain>

<decisions>
## Implementation Decisions

### Project Selection & Scope

- **D-01:** Feature 3-5 projects in v1 — matches research (FEATURES.md) that recruiters prefer a few deep, varied projects over a long shallow list.
- **D-02:** Roughly even DS/DE split across featured projects, reinforcing the hybrid Data Scientist + Data Engineer positioning established in Phase 2.
- **D-03:** Specific project selection is deferred to research/planning, not decided by the user upfront. The phase researcher should scan the user's real GitHub repos (github.com/gersonlopesr) and resume-referenced work (CompassUOL/Stellantis, Pottencial Seguros, AI Studio, Outlier AI, Pet Premium) to propose concrete candidates. Toy/tutorial datasets (Titanic/Iris/MNIST) are explicitly out of scope per REQUIREMENTS.md.

### Gallery Layout & Tagging

- **D-04:** Grid of cards layout — thumbnail + title + tech-stack tags + 1-line summary per card. Consistent with the dark tech theme established in Phase 1.
- **D-05:** No filter/sort UI for v1. A single well-ordered list is enough at 3-5 projects; filtering interactivity isn't worth the added complexity at this scale. Revisit if project count grows in a future milestone.

### Case Study Content Sourcing

- **D-06:** Case study narrative should be drafted primarily from the user's existing GitHub repos, notebooks, and READMEs. Research should mine these for problem/approach/impact material rather than starting from a blank page or asking the user to write full narratives from scratch.
- **D-07:** Architecture diagrams for DE case studies (PROJ-04) do not exist yet and need to be created during this phase. Use a simple static diagram (Mermaid or Excalidraw export) per FEATURES.md's recommendation — static image/SVG is sufficient, no interactivity required.
- **D-08:** Business-impact framing (PROJ-03) should be extracted and proposed by research from available evidence (repo README claims, commit history, resume-level metrics like "cut worker blockage 99%, +35% throughput"), then confirmed with the user — not supplied upfront by the user in this discussion.

### Claude's Discretion

- Exact routing/URL structure for case study pages (e.g., `/projects/[slug]`)
- Content Collection schema extensions needed to support the problem/approach/impact structure, DS/DE category, diagram path, and demo URL fields (the existing schema in `src/content.config.ts` only has `title`, `summary`, `stack`, `role`, `repoUrl`, `notebookUrl`, `thumbnail`, `order` — it will need extending)
- Diagram tool choice (Mermaid vs. Excalidraw vs. draw.io export) — pick whichever fits the Astro build pipeline best
- Card visual design details within the existing dark tech theme tokens

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Case Study Approach (Primary)
- `.planning/research/FEATURES.md` — Case Study Framing section (problem→approach→impact structure), anti-patterns to avoid (toy datasets, metric-only endings, unlabeled screenshots), MVP feature list and prioritization — the primary reference for this phase's content approach

### Requirements & Roadmap
- `.planning/REQUIREMENTS.md` — PROJ-01 through PROJ-06 (this phase's requirements)
- `.planning/ROADMAP.md` — Phase 3 goal and success criteria
- `.planning/PROJECT.md` — Core value statement, constraints, Out of Scope list (no toy datasets, no embedded notebooks)

### Current Implementation
- `src/content.config.ts` — existing (partial) `projects` Content Collection Zod schema; needs extending for this phase's fields
- `src/content/projects/` — empty directory (only `.gitkeep`) where case study content files will live
- `src/layouts/BaseLayout.astro`, `src/components/Nav.astro`, `src/components/Footer.astro` — existing persistent shell; Nav will need a new "Projects" link
- `src/pages/index.astro` — established BASE_URL-safe link pattern (`${baseUrl}/path`) and dark-tech Tailwind token usage (foreground/muted-foreground/accent/surface/border) to follow for new pages

### Prior Phase Context
- `.planning/phases/02-core-narrative-pages/02-CONTEXT.md` — narrative structure, BASE_URL-safe conventions
- `.planning/phases/01-foundation-deployment-pipeline/01-CONTEXT.md` — dark tech theme (single theme, no toggle), English-only v1 content language

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `BaseLayout.astro` — persistent shell (nav/footer) usable as-is for gallery and case study pages
- BASE_URL-safe href pattern established in `src/pages/index.astro` (`${baseUrl}/resume.pdf` style) — reuse for internal project links
- Dark tech Tailwind design tokens already in use (`text-foreground`, `text-muted-foreground`, `bg-surface`, `border-border`, `text-accent`) — reuse for card/gallery styling consistency

### Established Patterns
- Astro Content Collections with Zod schema validation (`astro:content` + `astro/loaders` glob loader) — the `projects` collection already exists but is unused (empty content directory)
- Section-anchored single-page pattern used in Phase 2 (`#about`, `#experience`, `#contact`) — Phase 3 introduces genuinely new pages/routes instead (gallery + per-project dynamic route), a shift from the single-page pattern

### Integration Points
- `src/content/projects/` needs real `.md`/`.mdx` entries (currently empty)
- `src/content.config.ts` schema needs new fields (category DS/DE, problem/approach/impact structure or MDX body sections, diagram path, demo URL)
- A new gallery page (likely `src/pages/projects/index.astro` or similar) becomes the entry point
- A new dynamic route (e.g. `src/pages/projects/[slug].astro`) for individual case studies — does not exist yet
- `src/components/Nav.astro` needs a "Projects" link added

</code_context>

<specifics>
## Specific Ideas

- The user's real display name is **"Gerson Ramos"** (corrected during Phase 2 execution from an earlier, incorrect "Gerson Lopes" assumption in Phase 1's context) — carry this forward across all Phase 3 content, do not revert to "Gerson Lopes."
- Research should specifically scan `github.com/gersonlopesr` for real repos to propose as case study candidates, and cross-reference the resume-level project mentions already known from Phase 2 (Stellantis migration dashboard, GCP→AWS pipeline migration, Pottencial Seguros medallion architecture, AI Studio ML models, Pet Premium forecasting) as strong candidates given they already have quantified impact framing.

</specifics>

<deferred>
## Deferred Ideas

- **Flagship interactive demo (PROJ-06) specifics** — which project, whether an external demo (e.g., Streamlit Community Cloud) already exists or needs to be built/deployed. This requirement stays in Phase 3 scope per the roadmap, but the user did not select this area for discussion this round. Needs a decision during planning or a follow-up discuss round before this requirement can be implemented.
- **Full tag-based filtering** — user chose no filtering for v1 at the 3-5 project scale; could be revisited in a future milestone if the project count grows significantly.
- **"Last updated" indicator / GitHub activity badge** — noted in FEATURES.md as v1.x/v2 candidates, out of Phase 3 scope.

### Reviewed Todos (not folded)
None — no pending todos matched Phase 3 during cross-reference.

</deferred>

---

*Phase: 03-case-study-template-project-content*
*Context gathered: 2026-07-04*
