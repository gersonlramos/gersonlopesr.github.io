---
phase: 04-polish-performance-launch
plan: 03
subsystem: seo
tags: [astro, seo, sitemap, open-graph, meta-tags, astrojs-sitemap]

# Dependency graph
requires:
  - phase: 03-case-study-template-project-content
    provides: project.data.impactSummary and project.data.thumbnail fields used as SEO description/image source
  - phase: 04-polish-performance-launch (04-02)
    provides: ProjectCard.astro and [slug].astro img tag conventions (BASE_URL prefixing pattern) reused for the thumbnail-to-og:image fix
provides:
  - BaseLayout.astro extended with description/image/type props rendering meta description, canonical link, Open Graph, and Twitter card tags
  - @astrojs/sitemap integration generating dist/sitemap-index.xml at build time
  - public/robots.txt referencing the deployed sitemap URL
  - Homepage, projects gallery, and all 5 case study pages passing real per-page descriptions (and image where a thumbnail exists)
affects: [04-04 (link verification will need to confirm sitemap/robots.txt URLs resolve on the live site), 04-05 (final comprehensive human-verify checkpoint will visually confirm meta tags via view-source)]

# Tech tracking
tech-stack:
  added: ["@astrojs/sitemap@3.7.3"]
  patterns: ["BaseLayout description/image/type props with new URL(path, Astro.site) for canonical + og:image absolute URL resolution", "content-collection-relative image paths (e.g. project.data.thumbnail) must be prefixed with BASE_URL before being passed to BaseLayout's image prop, mirroring the existing ProjectCard.astro convention"]

key-files:
  created: [public/robots.txt]
  modified: [package.json, package-lock.json, astro.config.mjs, src/layouts/BaseLayout.astro, src/pages/index.astro, src/pages/projects/index.astro, "src/pages/projects/[slug].astro"]

key-decisions:
  - "Fixed a bug (not in the plan's literal code) where passing project.data.thumbnail directly as BaseLayout's image prop produced an og:image URL missing the /gersonlopesr.github.io/ base path segment, since new URL(path, Astro.site) resolves against Astro.site's origin only and does not know about the base config. Fixed by prefixing the thumbnail path with BASE_URL in [slug].astro before passing it as the image prop, mirroring the exact pattern already used by ProjectCard.astro."

patterns-established:
  - "Any content-collection field used as an absolute-URL-bound image (og:image, etc.) must be pre-resolved through BASE_URL before reaching new URL(path, Astro.site), since Astro.site does not include the configured base path automatically outside of Astro.url."

requirements-completed: [POLISH-04]

# Metrics
duration: 12min
completed: 2026-07-04
---

# Phase 4 Plan 3: SEO Meta Tags & Sitemap Summary

**BaseLayout now emits meta description, canonical link, Open Graph, and Twitter card tags on every page; @astrojs/sitemap generates dist/sitemap-index.xml and public/robots.txt points crawlers to it.**

## Performance

- **Duration:** 12 min
- **Started:** 2026-07-04T21:23:00Z (approx)
- **Completed:** 2026-07-04T21:27:08Z
- **Tasks:** 3
- **Files modified:** 8 (1 created, 7 modified)

## Accomplishments
- Installed and configured `@astrojs/sitemap@3.7.3` in `astro.config.mjs` (filters out `404`); `npm run build` produces `dist/sitemap-index.xml`
- Added `public/robots.txt` referencing the full absolute sitemap URL, resolving 04-RESEARCH.md Pitfall 4 (sitemap present but not discoverable)
- Extended `BaseLayout.astro` with `description`/`image`/`type` props, rendering `meta name="description"`, `link rel="canonical"`, full Open Graph tag set (`og:type`, `og:url`, `og:title`, `og:description`, conditional `og:image`), and Twitter card tags — all URLs resolved via `new URL()`, no raw string concatenation
- Homepage, projects gallery, and all 5 case study pages now pass real, non-placeholder descriptions into `BaseLayout`; the one project with a thumbnail (`sales-real-time`) produces an absolute-URL `og:image` tag; the other 4 correctly omit `og:image` entirely (verified via grep — zero `og:image` occurrences in their built HTML)
- Verified zero leaked `"undefined"` strings in any built case-study page

## Task Commits

Each task was committed atomically:

1. **Task 1: Install @astrojs/sitemap, register it, add robots.txt** - `4c4872c` (feat)
2. **Task 2: Extend BaseLayout.astro with SEO/OG/Twitter meta tags** - `3a3962a` (feat)
3. **Task 3: Pass description/image props from each page into BaseLayout** - `b1849dc` (feat) — includes the inline og:image base-path bug fix described below

## Files Created/Modified
- `public/robots.txt` - New file, references `https://gersonlramos.github.io/gersonlopesr.github.io/sitemap-index.xml`
- `astro.config.mjs` - Registered `sitemap({ filter: (page) => !page.includes('404') })` alongside `mdx()`
- `package.json` / `package-lock.json` - Added `@astrojs/sitemap@3.7.3` dependency
- `src/layouts/BaseLayout.astro` - Added `description`/`image`/`type` props; renders meta description, canonical link, Open Graph, and Twitter card tags
- `src/pages/index.astro` - Passes a homepage-specific description to `BaseLayout`
- `src/pages/projects/index.astro` - Passes a projects-gallery description to `BaseLayout`
- `src/pages/projects/[slug].astro` - Passes `project.data.impactSummary` as description and a BASE_URL-prefixed `project.data.thumbnail` as image

## Decisions Made
- Fixed a real bug found during Task 3 execution: passing `project.data.thumbnail` (e.g. `/projects/sales-real-time/thumbnail.png`) directly as the `image` prop produced `og:image` content `https://gersonlramos.github.io/projects/sales-real-time/thumbnail.png` — missing the `/gersonlopesr.github.io/` base path segment, a 404 URL. `Astro.site` only carries the origin, not the configured `base`, so `new URL(image, Astro.site)` in `BaseLayout` cannot fix this on its own. Resolved by constructing `thumbnailUrl = \`${baseUrl}/${project.data.thumbnail.replace(/^\//, '')}\`` in `[slug].astro` before passing it as `image`, mirroring the exact convention already used by `ProjectCard.astro` (and the same bug class Phase 3 already fixed once). Verified: `og:image` now resolves to `https://gersonlramos.github.io/gersonlopesr.github.io/projects/sales-real-time/thumbnail.png`.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] og:image URL missing base path segment**
- **Found during:** Task 3
- **Issue:** The plan's exact code (`image={project.data.thumbnail}`) passes the raw content-collection path straight into `BaseLayout`'s `image` prop, which resolves it via `new URL(image, Astro.site)`. Since `Astro.site` is only the origin (`https://gersonlramos.github.io`) and does not include the configured `base` (`/gersonlopesr.github.io`), the resulting `og:image` URL omitted the base segment entirely, producing a dead link for social-media crawlers — reproducing the exact BASE_URL string-concatenation bug class Phase 3 already found and fixed once in `ProjectCard.astro`/`[slug].astro`/`Nav.astro`.
- **Fix:** Prefixed the thumbnail path with `BASE_URL` in `[slug].astro` (matching `ProjectCard.astro`'s existing pattern) before passing it as the `image` prop, so `new URL()` in `BaseLayout` resolves a fully correct absolute URL including the base path.
- **Files modified:** `src/pages/projects/[slug].astro`
- **Verification:** `npm run build` then `grep -o '<meta property="og:image"[^>]*>' dist/projects/sales-real-time/index.html` confirms `content="https://gersonlramos.github.io/gersonlopesr.github.io/projects/sales-real-time/thumbnail.png"`
- **Committed in:** `b1849dc` (part of Task 3 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Necessary correctness fix — without it, the site's one `og:image` tag would have been a broken link on every social share. No scope creep; fix stayed within Task 3's file scope.

## Issues Encountered
None beyond the auto-fixed bug above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- POLISH-04 is fully satisfied: every page emits a non-empty meta description and full Open Graph/Twitter tag set; `dist/sitemap-index.xml` and `dist/robots.txt` both exist after build; `robots.txt` correctly points to the deployed sitemap URL.
- `npm run build` passes cleanly across all 8 pages (homepage, projects gallery, 5 case studies, 404).
- No blockers for the remaining Phase 4 plans (link verification, final comprehensive human-verify checkpoint). The next link-verification plan should confirm `robots.txt` and `sitemap-index.xml` resolve correctly on the live deployed URL, since local build verification cannot confirm live GitHub Pages routing.

---
*Phase: 04-polish-performance-launch*
*Completed: 2026-07-04*

## Self-Check: PASSED

- FOUND: public/robots.txt
- FOUND: astro.config.mjs (sitemap integration)
- FOUND: src/layouts/BaseLayout.astro
- FOUND: src/pages/index.astro
- FOUND: src/pages/projects/index.astro
- FOUND: src/pages/projects/[slug].astro
- FOUND: commit 4c4872c
- FOUND: commit 3a3962a
- FOUND: commit b1849dc
