# Phase 1: Foundation & Deployment Pipeline - Context

**Gathered:** 2026-07-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Technical scaffold + CI/CD deploy pipeline for the portfolio site, and a persistent base layout (nav/footer). This phase delivers a real, verified, live GitHub Pages URL that every later phase builds content on top of. It does NOT include narrative content (Phase 2) or project case studies (Phase 3).

</domain>

<decisions>
## Implementation Decisions

### GitHub & Hosting
- **D-01:** GitHub username is `gersonlopesr` — repo is a User Pages repo: `gersonlopesr.github.io`
- **D-02:** Use the default GitHub Pages URL (`gersonlopesr.github.io`) for v1. Custom domain is explicitly deferred (already tracked as v2 requirement EXP-01) — avoids DNS/HTTPS propagation delay risk in this phase.
- **D-03:** Starting 100% from scratch — no prior repository or code to migrate/preserve.

### Language
- **D-04:** All v1 content is in **English**. Portuguese is deferred to v2 as a bilingual addition (not launched simultaneously) — this resolves the language blocker noted in STATE.md.
- **D-05:** User already has English versions of CV/LinkedIn material available to draw from in later phases (relevant for Phase 2, noted here since it surfaced during this discussion).

### Visual Identity
- **D-06:** Site name/title: **"Gerson Lopes — Data Scientist & Data Engineer"** — used in header and browser tab title.
- **D-07:** Color theme: **dark tech** (dark background, modern/technical feel). No light/dark toggle for v1 — single dark theme only.

### Stack
- **D-08 (not revisited):** User did not select "Stack técnica" for discussion — the research-recommended stack (Astro 6 + MDX + Tailwind CSS v4, deployed via `withastro/action` to GitHub Pages) stands as-is from PROJECT.md. Not explicitly re-confirmed by the user, but not objected to either.

### Claude's Discretion
- Exact CI/CD workflow implementation (GitHub Actions config, `upload-pages-artifact` + `deploy-pages` steps)
- Exact color palette values within the "dark tech" direction (specific hex values, contrast ratios)
- Font choices, spacing, and other visual details not explicitly specified
- Internal repo/file structure conventions (within Astro's standard project layout)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Stack & Setup
- `.planning/research/STACK.md` — Astro 6 + MDX + Tailwind v4 stack recommendation, versions, installation commands, alternatives considered
- `.planning/research/SUMMARY.md` — Research synthesis; explicitly flags that ARCHITECTURE.md's concrete examples use Jekyll as reference while STACK.md recommends Astro — patterns transfer, syntax needs translation to Astro's Content Collections/.astro conventions during this phase's planning

### Architecture & Pitfalls
- `.planning/research/ARCHITECTURE.md` — Component boundaries, repo/file structure, build/deploy data flow (written against Jekyll — translate patterns to Astro, do not copy syntax as-is)
- `.planning/research/PITFALLS.md` — Critical pitfalls to avoid in this phase: baseurl/path misconfiguration, silent build failures, verifying the actual deployed URL (not just local dev server)

### Project Context
- `.planning/PROJECT.md` — Project vision, constraints, key decisions
- `.planning/REQUIREMENTS.md` — SETUP-01, SETUP-02, SETUP-03 (this phase's requirements)
- `.planning/ROADMAP.md` — Phase 1 goal and success criteria

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
None — greenfield project, no existing code or repository.

### Established Patterns
None yet — this phase establishes the first patterns (project structure, layout conventions, CI/CD).

### Integration Points
N/A for this phase — this phase creates the integration points (nav, layout shell, content collection schema) that Phases 2-4 will build on.

</code_context>

<specifics>
## Specific Ideas

- Site title exactly as: "Gerson Lopes — Data Scientist & Data Engineer"
- Dark tech color theme — no toggle, single theme for v1
- Repo must be `gersonlopesr.github.io` (User Pages repo, not a project-page repo) — required for the root-domain, no-baseurl setup that PITFALLS.md and ARCHITECTURE.md both recommend

</specifics>

<deferred>
## Deferred Ideas

- **Custom domain + HTTPS** — deferred to v2 (already tracked as EXP-01 in REQUIREMENTS.md)
- **Portuguese / bilingual content** — deferred to v2, English-only for v1 launch
- **Light/dark theme toggle** — not selected; v1 ships with dark theme only, toggle could be revisited later if desired

### Reviewed Todos (not folded)
None — no pending todos matched Phase 1 during cross-reference.

</deferred>

---

*Phase: 01-foundation-deployment-pipeline*
*Context gathered: 2026-07-03*
