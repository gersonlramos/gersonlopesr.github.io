---
phase: 04-polish-performance-launch
plan: 02
subsystem: assets
tags: [sharp, images, performance, astro, cls]

# Dependency graph
requires:
  - phase: 03-case-study-template-project-content
    provides: ProjectCard.astro and [slug].astro img tags rendering the 2 raster project images via the BASE_URL string convention
provides:
  - Recompressed sales-real-time/thumbnail.png and postgres-clean-process-superstore/diagram.png (63-76% smaller, unchanged dimensions)
  - Re-runnable scripts/optimize-images.mjs for future raster image additions
  - width/height/loading/decoding attributes on both raster img tags to prevent layout shift and defer offscreen loads
affects: [04-05 (final comprehensive human-verify checkpoint / Lighthouse-style spot check will observe the smaller page weight and no layout shift)]

# Tech tracking
tech-stack:
  added: []
  patterns: [one-off author-time Sharp recompression script, kept in scripts/ for future reuse; conditional width/height only applied to the one PNG diagram among otherwise-SVG diagrams]

key-files:
  created: [scripts/optimize-images.mjs]
  modified: [public/projects/sales-real-time/thumbnail.png, public/projects/postgres-clean-process-superstore/diagram.png, src/components/ProjectCard.astro, "src/pages/projects/[slug].astro"]

key-decisions:
  - "Fixed a bug in the plan's own two-step Sharp buffer/toFile script: the second sharp(buf).toFile(file) call was re-encoding without reapplying the png() quality/compressionLevel options, undoing most of the compression gained in the first pass (63KB/63KB instead of the expected ~37KB/~34KB). Fix: pass the same .png({ quality: 85, compressionLevel: 9 }) options to both the toBuffer() and the toFile() calls."

patterns-established:
  - "One-off Sharp recompression: read+encode to buffer, then re-encode+write that buffer to the same file path with the SAME encode options applied at both steps (sharp cannot read and write the same file path in one pipeline, so double-encoding is required, and the options must not be dropped on the second pass)"

requirements-completed: [POLISH-02]

# Metrics
duration: 7min
completed: 2026-07-05
---

# Phase 4 Plan 2: Image Compression & Layout-Shift Hardening Summary

**Sharp-recompressed the site's 2 oversized PNGs in place (66%/76% smaller, same pixel dimensions) and hardened their img tags with explicit width/height/loading/decoding attributes.**

## Performance

- **Duration:** 7 min
- **Started:** 2026-07-05T00:13:00Z (approx, per session continuity)
- **Completed:** 2026-07-05T00:20:18Z
- **Tasks:** 2
- **Files modified:** 5 (1 created, 4 modified)

## Accomplishments
- Created `scripts/optimize-images.mjs`, a re-runnable one-off Sharp recompression script for the site's 2 oversized raster PNGs
- `public/projects/sales-real-time/thumbnail.png`: 102,330 -> 35,035 bytes (-66%), pixel dimensions unchanged (950x541, verified via PNG header byte offsets)
- `public/projects/postgres-clean-process-superstore/diagram.png`: 124,204 -> 30,424 bytes (-76%), pixel dimensions unchanged (1550x1232, verified via PNG header byte offsets)
- `ProjectCard.astro`'s thumbnail `<img>` now carries `width="950" height="541" loading="lazy" decoding="async"`
- `[slug].astro`'s diagram `<img>` now conditionally carries `width="1550" height="1232"` only when `diagramPath` ends in `.png` (the single postgres-clean-process-superstore case), while all 5 projects' diagrams (3 SVG + 1 PNG) get `loading="lazy" decoding="async"`
- Verified via built HTML output (`dist/`) that Astro correctly omits the `width`/`height` attributes entirely for the 3 SVG-diagram projects (no literal `"undefined"` string leaked into markup) while applying them correctly for the PNG diagram
- `npm run build` completes cleanly, all 8 pages including all 5 project case studies build without error

## Task Commits

Each task was committed atomically:

1. **Task 1: Create and run the Sharp recompression script** - `26aeb68` (feat) — includes the inline bug fix described below
2. **Task 2: Add width/height/loading/decoding attributes to raster img tags** - `28f0e1e` (feat)

## Files Created/Modified
- `scripts/optimize-images.mjs` - New one-off Sharp recompression script (reads each file, re-encodes to a buffer at `png({ quality: 85, compressionLevel: 9 })`, then re-encodes that buffer to the same file path with the same options, logging before/after byte counts and percent reduction)
- `public/projects/sales-real-time/thumbnail.png` - Recompressed in place, 102,330 -> 35,035 bytes, dimensions unchanged
- `public/projects/postgres-clean-process-superstore/diagram.png` - Recompressed in place, 124,204 -> 30,424 bytes, dimensions unchanged
- `src/components/ProjectCard.astro` - Thumbnail `<img>` gained `width="950" height="541" loading="lazy" decoding="async"`
- `src/pages/projects/[slug].astro` - Added `const isPngDiagram = project.data.diagramPath?.endsWith('.png');` in frontmatter; diagram `<img>` gained conditional `width`/`height` (PNG only) plus unconditional `loading="lazy" decoding="async"`

## Decisions Made

- Fixed a real bug found during Task 1 execution: the plan's exact-content script (also verified in 04-RESEARCH.md) produced a `sharp(buf).toFile(file)` second step with no encode options, which silently re-encoded the already-compressed buffer using Sharp's default PNG compression level rather than `compressionLevel: 9`. First run produced 63,015/63,552 bytes (both over the plan's 60KB verification ceiling) instead of the expected ~37KB/~34KB. Reverted the images via `git checkout`, added the same `.png({ quality: 85, compressionLevel: 9 })` options to the second `.toFile()` call, and re-ran — this produced the expected 35,035/30,424 byte results, both well under the 60KB ceiling and matching 04-RESEARCH.md's measured expectations.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Sharp double-encode script dropped compression options on the second pass**
- **Found during:** Task 1
- **Issue:** The plan's `scripts/optimize-images.mjs` content (copied verbatim from 04-RESEARCH.md's Code Examples) calls `sharp(buf).toFile(file)` without re-specifying `.png({ quality: 85, compressionLevel: 9 })` on that second pipeline. Since Sharp resets to default encode options for each new pipeline instance, this silently discarded the compression settings and re-encoded at default PNG compression, producing files at 63,015/63,552 bytes — both over the plan's 60,000-byte verification ceiling and far short of the ~37KB/~34KB the research measured (that research measurement only tested the single `toBuffer()` step in isolation, never the full read-buffer-then-toFile round trip actually used by the script).
- **Fix:** Reapplied `.png({ quality: 85, compressionLevel: 9 })` to the second `sharp(buf)...toFile(file)` call, matching the first call's options exactly.
- **Files modified:** `scripts/optimize-images.mjs`, `public/projects/sales-real-time/thumbnail.png`, `public/projects/postgres-clean-process-superstore/diagram.png` (reverted and re-recompressed with the fixed script)
- **Commit:** `26aeb68`

## Issues Encountered

None beyond the auto-fixed script bug above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- POLISH-02 is fully satisfied: both oversized PNGs recompressed (66%/76% smaller) with unchanged pixel dimensions, and both raster img tags hardened against layout shift with `width`/`height`/`loading`/`decoding` attributes.
- `npm run build` passes cleanly with no regressions across all 5 case studies (3 SVG-diagram projects unaffected, confirmed via built HTML inspection).
- No blockers for the remaining Phase 4 plans (link verification, SEO meta tags, final comprehensive human-verify checkpoint).

---
*Phase: 04-polish-performance-launch*
*Completed: 2026-07-05*

## Self-Check: PASSED

- FOUND: scripts/optimize-images.mjs
- FOUND: public/projects/sales-real-time/thumbnail.png
- FOUND: public/projects/postgres-clean-process-superstore/diagram.png
- FOUND: src/components/ProjectCard.astro
- FOUND: src/pages/projects/[slug].astro
- FOUND: commit 26aeb68
- FOUND: commit 28f0e1e
