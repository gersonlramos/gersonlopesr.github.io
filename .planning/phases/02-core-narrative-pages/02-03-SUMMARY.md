---
phase: 02-core-narrative-pages
plan: 03
subsystem: ui
tags: [astro, tailwind, footer, resume, base-url]

# Dependency graph
requires:
  - phase: 02-core-narrative-pages (02-02)
    provides: Homepage narrative structure (About/Experience/Contact sections) to attach the resume CTA and profile links to
provides:
  - Real, non-placeholder LinkedIn/Kaggle links in Footer.astro
  - BASE_URL-safe EN/PT resume download CTAs on the homepage hero section
  - public/resume.pdf and public/resume-pt.pdf published resume assets
affects: [02-04 (deployment/live verification), any future phase touching Footer.astro or the homepage hero]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "BASE_URL-safe internal asset links: `${import.meta.env.BASE_URL}/path` (note the explicit `/` — BASE_URL itself has no trailing slash in this project's astro.config, unlike Nav.astro's fragment-only usage which doesn't need one)"

key-files:
  created:
    - public/resume.pdf
    - public/resume-pt.pdf
  modified:
    - src/components/Footer.astro
    - src/pages/index.astro
    - .gitignore

key-decisions:
  - "Offered both EN and PT resume downloads as two distinct, clearly labeled CTAs (per explicit user request) rather than a single link or a language toggle"
  - "Added *.docx to .gitignore to keep the raw resume source documents (which contain more personal detail than the published PDF) out of the public repo"

patterns-established:
  - "Resume/asset links under public/ must be built as `${import.meta.env.BASE_URL}/filename.ext` — verified via build output that BASE_URL has no trailing slash in this project"

requirements-completed: [NARR-03, NARR-04]

# Metrics
duration: 15min
completed: 2026-07-03
---

# Phase 02 Plan 03: Finalize Profile Links & Resume Download Summary

**Real LinkedIn/Kaggle profile links and a working EN/PT resume download CTA wired into the homepage hero, with BASE_URL-safe paths verified against actual Astro build output.**

## Performance

- **Duration:** ~15 min (continuation agent only; checkpoint task was resolved by orchestrator prior to this session)
- **Started:** 2026-07-03T21:38:00Z
- **Completed:** 2026-07-03T21:44:11Z
- **Tasks:** 1 (Task 2 — Task 1 was the checkpoint, resolved before this agent started)
- **Files modified:** 5 (Footer.astro, index.astro, public/resume.pdf, public/resume-pt.pdf, .gitignore)

## Accomplishments
- Replaced placeholder LinkedIn (`/in/PLACEHOLDER-confirm-phase-2`) and Kaggle (`/PLACEHOLDER-confirm-phase-2`) URLs in `Footer.astro` with the user's real profiles
- Added a prominent, accessible "Download Resume (PDF)" / "Baixar Currículo (PT)" CTA pair to the About/hero section of the homepage, above the fold
- Published both language versions of the resume PDF to `public/`, verified as valid PDF 1.7 documents in the build output
- Caught and fixed a BASE_URL path bug during build verification (see Deviations below)

## Task Commits

Each task was committed atomically:

1. **Task 1: Provide final profile URLs and resume PDF source** — checkpoint, resolved by orchestrator (no code commit; user-provided data only)
2. **Task 2: Implement links and resume download CTA** — `f8b7b30` (feat)

**Plan metadata:** pending (this commit, created after this summary)

## Files Created/Modified
- `src/components/Footer.astro` - Real LinkedIn (`https://www.linkedin.com/in/gersonlramos/`) and Kaggle (`https://www.kaggle.com/gersonramos`) URLs replace placeholders; GitHub and email links were already correct and left untouched
- `src/pages/index.astro` - Added `baseUrl` const and a two-button CTA group (EN/PT resume downloads) in the About/hero section, using `download` attribute and existing design tokens (`bg-accent`, `border-border`, focus-visible outlines)
- `public/resume.pdf` - English resume PDF (converted from user's DOCX source, 3 pages, PDF 1.7)
- `public/resume-pt.pdf` - Portuguese resume PDF (converted from user's DOCX source, 3 pages, PDF 1.7)
- `.gitignore` - Added `*.docx` to prevent the raw resume source documents from being committed to the public repo

## Decisions Made
- **Two separate resume CTAs (EN + PT)** rather than one: the user explicitly asked for both languages to be offered as separate download links. Labeled "Download Resume (PDF)" (primary, filled `accent` button, matches UI-SPEC's required copy exactly) and "Baixar Currículo (PT)" (secondary, outlined button) so the primary/English CTA remains visually dominant, consistent with the site's English-first content decision, while still surfacing the Portuguese option clearly.
- **`*.docx` added to `.gitignore`**: the DOCX source files landed at the project root during the orchestrator's PDF-conversion step. These contain the same or more personal detail than the published PDF and were never part of the plan's `files_modified` list, so they were excluded from version control rather than committed (Rule 2 — missing critical functionality/security: avoiding accidental PII leakage into a public repo).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed broken resume link paths caused by incorrect BASE_URL concatenation**
- **Found during:** Task 2, build verification step
- **Issue:** Initial implementation used `` `${baseUrl}resume.pdf` `` (following the pattern `${homeHref}#about` seen in `Nav.astro`). This produced a malformed href `/gersonlopesr.github.io/resume.pdf` → but literally rendered as `/gersonlopesr.github.ioresume.pdf` because `import.meta.env.BASE_URL` in this project's config (`base: '/gersonlopesr.github.io'`, no trailing slash) does not append one — unlike the `#fragment` case in Nav.astro, which doesn't need a separator.
- **Fix:** Changed to `` `${baseUrl}/resume.pdf` `` and `` `${baseUrl}/resume-pt.pdf` ``, explicitly inserting the `/` separator.
- **Files modified:** `src/pages/index.astro`
- **Verification:** Re-ran `npm run build` and inspected `dist/index.html` — hrefs now correctly resolve to `/gersonlopesr.github.io/resume.pdf` and `/gersonlopesr.github.io/resume-pt.pdf`, matching the actual `dist/resume.pdf` and `dist/resume-pt.pdf` output paths (both confirmed `%PDF-1.7` valid PDFs).
- **Committed in:** `f8b7b30` (Task 2 commit)

**2. [Rule 2 - Missing Critical] Excluded raw resume DOCX source files from version control**
- **Found during:** Task 2, pre-commit `git status` check
- **Issue:** Two DOCX files (`Gerson_Ramos_Resume_Updated_2026.docx`, `Gerson_Ramos_Resume_Updated_2026_pt.docx`) were present as untracked files at the repo root — these are personal source documents not intended for the public portfolio repo and were outside this plan's `files_modified` scope.
- **Fix:** Added `*.docx` to `.gitignore` so these (and any future resume source docs) are never accidentally committed.
- **Files modified:** `.gitignore`
- **Verification:** `git status --short` after the change shows a clean tree with no untracked DOCX files.
- **Committed in:** `f8b7b30` (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (1 bug, 1 missing-critical/security)
**Impact on plan:** Both fixes were necessary for correctness (working download links) and security/hygiene (no PII source docs in a public repo). No scope creep — no architectural changes.

## Issues Encountered
- The plan's original `<verify>` step included a live `curl` check against the deployed GitHub Pages resume URL (`https://gersonlramos.github.io/gersonlopesr.github.io/resume.pdf`). This check was **not run** — the site has not yet been deployed with this content; deployment happens in plan 02-04. Local verification was substituted instead: `npm run build` exits 0, and `dist/resume.pdf` / `dist/resume-pt.pdf` are present as valid PDF 1.7 files at the exact paths referenced by the built `index.html`. **Live URL verification is deferred to plan 02-04** and should be added to that plan's verification checklist if not already present.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Phase 02 core narrative content (About, Experience, resume CTA, real profile links) is functionally complete and build-verified locally.
- Plan 02-04 (deployment and live verification) should include a live check of both resume PDF URLs (`/resume.pdf` and `/resume-pt.pdf`) and the footer LinkedIn/Kaggle/GitHub/email links once deployed, since the original NARR-03 acceptance criterion ("Resume URL returns 200 after deploy") was not exercised in this plan.

---
*Phase: 02-core-narrative-pages*
*Completed: 2026-07-03*

## Self-Check: PASSED

- FOUND: public/resume.pdf
- FOUND: public/resume-pt.pdf
- FOUND: src/components/Footer.astro
- FOUND: src/pages/index.astro
- FOUND: commit f8b7b30
