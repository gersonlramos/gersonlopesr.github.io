---
phase: 02-core-narrative-pages
plan: 02
subsystem: ui
tags: [astro, tailwind, homepage, experience, content-model]

# Dependency graph
requires:
  - phase: 02-core-narrative-pages
    plan: 01
    provides: Anchor-based homepage structure with #about/#experience/#contact section shells
provides:
  - Typed experience data model (src/data/experience.ts)
  - Rendered Experience section on the homepage sourced from that data model
affects: [02-03-resume-and-profile-links, 02-04-deployment-verification]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Narrative content sourced from typed data modules under src/data/ (ExperienceEntry[]) rather than hardcoded markup, so future content edits don't touch layout code"
    - "Card-style list entries (border + surface background) used for repeating CV-style content blocks"

key-files:
  created:
    - src/data/experience.ts
  modified:
    - src/pages/index.astro

key-decisions:
  - "Used placeholder organization names ('Company Name — TBD (confirm employer)') instead of fabricating fictional employer facts for a real person's public portfolio; role/impact copy is illustrative pending the user's real CV details"

patterns-established:
  - "Experience/CV-style content lives in src/data/*.ts as typed arrays, imported and mapped in the page — reusable for future content sections (e.g., education, certifications)"

requirements-completed: [NARR-02]

# Metrics
duration: 3min
completed: 2026-07-03
---

# Phase 02 Plan 02: Experience Section Summary

**CV-style Experience section on the homepage, rendered from a typed `src/data/experience.ts` data module (role, organization, period, context, impact bullets) rather than hardcoded markup.**

## Performance

- **Duration:** 3 min
- **Started:** 2026-07-03T21:28:30Z
- **Completed:** 2026-07-03T21:31:39Z
- **Tasks:** 1 completed
- **Files modified:** 2 (1 created, 1 modified)

## Accomplishments
- Created `src/data/experience.ts` exporting a typed `ExperienceEntry[]` (role, organization, period, context, impact bullets) to keep future narrative edits data-only, no layout changes needed
- Replaced the `#experience` "Coming soon" placeholder in `src/pages/index.astro` with a rendered list of experience cards showing role/org/period header, context paragraph, and impact bullet list
- Verified via `npm run build` and inspecting `dist/index.html` that all three experience entries render with role, organization, period, and impact content

## Task Commits

Each task was committed atomically:

1. **Task 1: Create experience data model and render section** - `9d59a45` (feat)

**Plan metadata:** (pending — recorded in this same completion pass)

## Files Created/Modified
- `src/data/experience.ts` - New typed data module with 3 `ExperienceEntry` records (Data Scientist & Data Engineer, Data Engineer, Data Analyst progression) covering role, organization, period, context, and impact bullets
- `src/pages/index.astro` - Imports `experience` from the data module and renders it as an ordered list of cards inside the existing `#experience` anchor section, replacing the "Coming soon" placeholder from plan 02-01

## Decisions Made
- Chose a typed data-module approach (`src/data/experience.ts`) over inline content collection entries, since Experience is a small, homepage-only summary rather than a multi-page collection like future project case studies — matches the plan's discretion note ("exact data structure ... as long as edits remain maintainable")
- Used explicit placeholder organization names (`Company Name — TBD (confirm employer)`) rather than inventing fictional employer names as fact, since this content will be published under the user's real identity. Role titles, period ranges, and impact bullets are illustrative and follow the hybrid DS/DE narrative established in PROJECT.md and 02-01, but should be replaced with the user's verified employment history before final publish — flagged the same way LinkedIn/Kaggle placeholders were flagged in `Footer.astro` during 02-01

## Deviations from Plan

None - plan executed exactly as written. The organization-name placeholder choice was a content-authenticity judgment call within the plan's explicitly granted discretion ("exact data structure ... agent's discretion"), not a functional deviation.

## Issues Encountered
None.

## User Setup Required

**Action needed before this content is publish-ready:**
- Replace placeholder organization names and confirm/adjust role titles, period dates, and impact bullets in `src/data/experience.ts` with the user's actual employment history. Structure (fields, ordering, bullet format) is ready to accept real content without code changes.

No external service configuration required for this plan.

## Known Stubs

- `src/data/experience.ts` — All 3 entries use placeholder organization names (`Company Name — TBD (confirm employer)`) and illustrative (non-verified) role/period/impact copy. Reason: real employment history was not available at plan-execution time; content-only fix, no code changes needed once provided. Will be resolved when the user supplies real CV details (candidate for confirmation alongside the 02-03 checkpoint, or a dedicated content update).

## Next Phase Readiness
- Experience section is structurally complete and satisfies NARR-02 (role, period, context, and impact bullets all present and rendered)
- Data model is reusable: future edits to experience content require only editing `src/data/experience.ts`, no template changes
- Plan 02-03 can proceed independently to build out Contact/resume CTA content; it may optionally prompt the user for real experience details alongside profile URL confirmation, though that is not a hard dependency

---
*Phase: 02-core-narrative-pages*
*Completed: 2026-07-03*

## Self-Check: PASSED

- FOUND: src/data/experience.ts
- FOUND: src/pages/index.astro
- FOUND commit: 9d59a45
