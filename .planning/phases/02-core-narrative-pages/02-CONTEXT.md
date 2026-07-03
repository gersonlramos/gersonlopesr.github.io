# Phase 2: Core Narrative Pages - Context

**Gathered:** 2026-07-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 2 delivers narrative clarity for recruiters/clients: clear hybrid positioning (DS + DE), professional experience summary, resume download, and reliable contact/profile access. It builds on the Phase 1 live shell and must preserve deployment stability.

Out of scope in this phase: project gallery/case-study pages (Phase 3), broad polish/SEO hardening (Phase 4).

</domain>

<decisions>
## Implementation Decisions

### Platform and URL

- Keep Astro static architecture and deploy through existing GitHub Actions workflow.
- Live site URL is project-pages style: `https://gersonlramos.github.io/gersonlopesr.github.io/`.
- Internal links must remain `BASE_URL` aware (no root-only `/` assumptions).

### Narrative Structure

- Implement narrative on the home page with anchored sections: About, Experience, Contact.
- Keep nav/footer shell from Phase 1 and extend links without redesigning the shell.

### Content Source and Language

- v1 narrative remains in English (as established in prior context).
- Experience content is curated summary (CV style), not a full resume clone.

### Resume Asset

- Requirement NARR-03 is explicitly PDF.
- If no ready PDF exists, use a human-action checkpoint to provide one or approve a generated conversion path.

### the agent's Discretion

- Section-level wording polish, card layout details, and spacing refinements within existing design tokens.
- Exact data structure for experience entries (array/module/content file), as long as edits remain maintainable.

</decisions>

<canonical_refs>

## Canonical References

### Foundation Outputs

- `.planning/phases/01-foundation-deployment-pipeline/01-02-SUMMARY.md` — shell/layout baseline
- `.planning/phases/01-foundation-deployment-pipeline/01-03-SUMMARY.md` — CI/CD baseline
- `.planning/phases/01-foundation-deployment-pipeline/01-04-SUMMARY.md` — production URL and verification baseline

### Current Implementation

- `src/layouts/BaseLayout.astro` — base layout and global imports
- `src/components/Nav.astro` — navigation behavior and active-link logic
- `src/components/Footer.astro` — persistent contact links
- `src/pages/index.astro` — current placeholder home content
- `astro.config.mjs` — site/base configuration for project pages

### Requirements and Roadmap

- `.planning/REQUIREMENTS.md` — NARR-01, NARR-02, NARR-03, NARR-04
- `.planning/ROADMAP.md` — Phase 2 goal and success criteria

</canonical_refs>

<specifics>
## Specific Ideas

- Introduce About section with a concise hybrid-role statement above the fold.
- Add Experience section with role, period, domain context, and impact bullets.
- Add explicit resume download CTA (PDF) in hero/about region and/or contact section.
- Replace placeholder LinkedIn/Kaggle URLs with real links through checkpoint.

</specifics>

<deferred>
## Deferred Ideas

- Deep project storytelling blocks and project cards (Phase 3).
- SEO metadata expansion and sitemap checks (Phase 4).
- Bilingual narrative support (v2 scope).

</deferred>

---

_Phase: 02-core-narrative-pages_
_Context gathered: 2026-07-03_
