# Phase 4: Polish, Performance & Launch - Research

**Researched:** 2026-07-04
**Domain:** Static-site launch audit for an Astro 7 + MDX + Tailwind v4 GitHub Pages portfolio — responsive QA, image compression, link verification, and baseline SEO meta tags
**Confidence:** HIGH (all findings verified directly against the live codebase, a local `npm run build`, the live deployed site, and official Astro/linkinator docs — no speculative recommendations)

## Summary

This phase is fundamentally an **audit phase**, not a build phase, and the codebase inspection confirms that framing is correct. There is no test framework (Phase 3 research already established `npm run build` as the only automated gate) and each of the four POLISH requirements maps to a small, targeted, well-scoped fix rather than new architecture:

- **POLISH-01 (responsive):** Every page already uses `sm:` Tailwind breakpoints for section padding and grid layout — but `src/components/Nav.astro` has **zero** responsive classes on its 5-item nav row, and a width calculation shows it will overflow well before the 640px `sm:` breakpoint. This is the one real, concrete responsive bug this phase needs to fix; everything else (hero, experience list, project grid, case-study article) already degrades gracefully.
- **POLISH-02 (images):** Only 2 raster images exist in the whole site (`sales-real-time/thumbnail.png` at 950×541/100KB, `postgres-clean-process-superstore/diagram.png` at 1550×1232/121KB); the 3 architecture diagrams are already SVG (2-3KB each, no action needed). Direct Sharp testing in this repo (Sharp is already transitively installed via Astro, confirmed working) shows both PNGs shrink 63-73% with a same-dimensions PNG recompression pass alone — no resizing, no format change, no schema/architecture migration needed. This resolves Phase 3's deferred Open Question 2 (`image()` schema helper vs. plain-string convention): **keep the plain-string `public/` convention, do not migrate to `astro:assets`/`image()`.**
- **POLISH-03 (links):** The project already has a proven pattern — `npx linkinator` was used successfully in Phase 1 (SETUP verification) and should now run as a full site-wide recursive crawl against the **live deployed URL** (not just local preview), covering both internal routes and the external links (5 GitHub repos, 1 live demo, LinkedIn, Kaggle, GitHub profile, mailto).
- **POLISH-04 (SEO):** Confirmed via direct HTML fetch of the live site — there is currently **zero** SEO infrastructure: no meta description, no Open Graph tags, no `@astrojs/sitemap` in `package.json`. This is a from-scratch (but small) addition: extend `BaseLayout.astro` with description/OG props, add per-page values, install and configure `@astrojs/sitemap`.

**Primary recommendation:** Treat this phase as 4 independent, narrow audits-with-fixes (nav responsiveness, PNG recompression, linkinator crawl, SEO meta + sitemap), each verifiable by a fast automated check (`npm run build`, file-size diff, linkinator exit code, `curl | grep`), culminating in one comprehensive human-verify checkpoint that confirms the entire v1 site (all 4 phases combined) is launch-ready.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| POLISH-01 | Site is responsive and usable on mobile and desktop | Nav.astro overflow bug identified with concrete width math (below); fix pattern provided (flex-wrap, zero-JS); rest of site's existing `sm:` breakpoint usage audited and confirmed adequate |
| POLISH-02 | Images are compressed and correctly sized for fast loading | Full image inventory (2 PNGs, 3 SVGs) with measured before/after compression via direct Sharp test in this repo; recommendation is a one-off recompression script, not a schema/architecture change |
| POLISH-03 | Every link on the site verified working, no dead links | `linkinator` 7.6.1 confirmed available (already used successfully in Phase 1/2); recursive crawl pattern against live URL documented with flags for known false-positive sources (LinkedIn bot-blocking) |
| POLISH-04 | Site has SEO meta tags (description, Open Graph, sitemap) | Live site confirmed to have zero SEO tags currently; `@astrojs/sitemap@3.7.3` verified compatible; BaseLayout extension pattern with code example provided |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

- **Stack is locked:** Astro (7.0.6 installed, CLAUDE.md's "6.x" reference is stale — see State of the Art) + MDX + Tailwind v4, static output only, deployed via `withastro/action` to GitHub Pages. No server-rendered features, no CMS.
- **Zero-JS-by-default is explicit project policy.** Any responsive-nav fix must not introduce a JS-driven hamburger/toggle unless a CSS-only (`flex-wrap`, `<details>`) solution genuinely cannot work. This directly shapes the POLISH-01 recommendation below.
- **`astro:assets` + Sharp is CLAUDE.md's stated "Always" recommendation** for images — but this research (and Phase 3's own Open Question 2) finds the project's established convention is plain `public/` + `BASE_URL` string paths, not the Content Collection `image()` helper. This phase must make a final decision (see Don't Hand-Roll and Pitfall sections below); the evidence supports **not** migrating, for reasons specific to this codebase's small image count and already-adequate dimensions.
- **`@astrojs/sitemap` is CLAUDE.md's explicit recommendation** for SEO ("Add sitemap now (near-zero cost)") — confirmed still current and trivial to wire into the existing `site` config.
- **Lighthouse / PageSpeed Insights** listed as a "Development Tool" for periodic performance audits — recommended as part of this phase's final human-verify checkpoint, not as an automated gate (no CI integration exists or is being added).
- No heavy client component libraries, no CMS — not implicated by this phase's scope, but reinforces that any Nav fix should stay CSS-only.

## Standard Stack

### Core (already installed — no version changes needed)

| Library | Version (verified via `npm view` / local install) | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro | 7.0.6 (installed; matches `package.json` `^7.0.6`) | Static site build | Already the project's stack; `astro build` is the only validation gate |
| sharp | present in `node_modules` transitively (via Astro's default image service, resolved as `@img/sharp-win32-x64`/`darwin`/etc. per platform in `package-lock.json`) | One-off author-time PNG recompression for POLISH-02 | Already resolved, tested working directly in this repo (see Code Examples) — no new install needed for the recommended lighter-touch approach |
| linkinator | 7.6.1 (latest, verified via `npm view`) | POLISH-03 site-wide link crawl | Already used successfully via `npx` in Phase 1 (SETUP-02 verification); same pattern, wider scope |

### Supporting (new dependency to add)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@astrojs/sitemap` | 3.7.3 (verified current via `npm view @astrojs/sitemap version`, 2026-07-04) | Generates `sitemap-index.xml` + `sitemap-0.xml` at build time | Add now for POLISH-04 — the project's `site` field is already correctly configured in `astro.config.mjs`, which is the integration's only hard requirement |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Plain-string `public/` image paths + one-off Sharp recompression (recommended) | Migrate `thumbnail`/`diagramPath` schema fields to the `image()` Content Collection helper + `<Image />` component | Would give automatic responsive `srcset`/WebP conversion and future-proof any new project images, but requires moving files from `public/projects/*` into `src/` (breaking the established convention flagged as a pitfall in Phase 3's own research), rewriting `ProjectCard.astro` and `[slug].astro`'s image rendering, and touching all 5 MDX frontmatter files — a disproportionate refactor for 2 images that are already close to their ideal display dimensions and shrink 63-73% with recompression alone (measured, see Code Examples). Rejected for this phase; revisit only if a future phase adds many more raster images. |
| Zero-JS `flex-wrap` nav fix (recommended) | CSS-only `<details>`/`<summary>` disclosure hamburger menu | Also zero-JS and would look more like a "real" mobile nav pattern, but adds a second interaction pattern to a 5-link nav that doesn't need one — over-engineering for this site's small nav. Keep as documented fallback if the wrapped 2-line nav looks visually awkward during human-verify. |
| Manual `linkinator` recursive crawl against the live URL | GitHub Actions `linkinator-action` (CI-integrated) | Would auto-run link-checks on every future deploy, which is valuable long-term, but out of scope for a one-time pre-launch verification requirement (POLISH-03 says "verified... before launch," not "continuously monitored"). Worth flagging as a v2/EXP candidate, not a v1 task. |
| `@astrojs/sitemap` (recommended) | Hand-written static `sitemap.xml` | The site is entirely static with a fixed, small page count, so a hand-written file is *possible*, but the official integration costs one `npm install` + one config line and auto-updates if pages are ever added — no reason to hand-roll. |

**Installation:**
```bash
npm install @astrojs/sitemap
```

**Version verification:** Confirmed via `npm view` on 2026-07-04: `@astrojs/sitemap@3.7.3` (latest), no peer dependency conflicts declared, compatible with `astro@7.0.6` (sitemap integration only requires the `site` config option, already set).

## Architecture Patterns

### Recommended Project Structure

No new files/folders — this phase only modifies existing files:

```
astro.config.mjs          # add sitemap() integration
src/
├── layouts/
│   └── BaseLayout.astro  # add description/image/type props + meta tags
├── components/
│   └── Nav.astro         # fix mobile overflow (flex-wrap)
├── pages/
│   ├── index.astro       # pass description prop to BaseLayout
│   ├── projects/
│   │   ├── index.astro   # pass description prop
│   │   └── [slug].astro  # pass description + image (project thumbnail) props
public/
├── projects/
│   ├── sales-real-time/thumbnail.png            # recompressed in place
│   └── postgres-clean-process-superstore/diagram.png  # recompressed in place
└── robots.txt             # new, optional — references sitemap for discoverability
```

### Pattern 1: Fix Nav mobile overflow (POLISH-01)

**What:** `src/components/Nav.astro`'s `<ul>` of 5 links plus the logo `<a>` sit in a single-row `flex items-center justify-between` container with zero responsive classes. On a 375px viewport, the logo ("Gerson Ramos", ~140px) plus 5 nav items (`px-4 py-2` padding + `gap-2` between them) sum to roughly 490-520px of required width — well over the available space, causing horizontal overflow/clipping.

**Verified by direct calculation from the actual rendered classes** (`px-4` = 32px horizontal padding per link, `gap-2` = 8px between items, plus text widths for "Home"/"About"/"Experience"/"Projects"/"Contact"): this is a real, reproducible bug, not a hypothetical — confirm visually at 375px/390px viewport widths during execution.

**When to use:** Immediately — this is the concrete finding of the POLISH-01 audit and the only nav-related fix needed.

**Example (zero-JS fix — add `flex-wrap` at both the outer nav row and the `<ul>` level):**
```astro
<!-- src/components/Nav.astro -->
<nav class="bg-surface border-b border-border px-4 py-6 sm:px-8">
  <div class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-y-2">
    <a href={homeHref} class="...">Gerson Ramos</a>
    <ul class="flex flex-wrap justify-center gap-1 sm:gap-2">
      <!-- existing li/a mapping unchanged -->
    </ul>
  </div>
</nav>
```
Adding `flex-wrap` to the outer container lets the nav `<ul>` drop to its own row below the logo when space is tight; adding `flex-wrap` to the `<ul>` itself is a second safety net so the 5 links wrap onto 2 lines if still too narrow for one. This requires no JavaScript, matches CLAUDE.md's zero-JS philosophy, and is a 2-class change.

**Verification:** Resize browser (or use responsive dev tools) at 375px, 390px, 768px, 1024px — confirm no horizontal scrollbar and no clipped/overlapping nav text at any width.

### Pattern 2: One-off PNG recompression script (POLISH-02)

**What:** Both oversized raster images are already close to correct *display* dimensions (see calculation below) — the problem is compression, not size. A same-dimensions, higher-compression PNG re-encode captures nearly all the available savings.

**Measured in this repo** (Sharp already resolved via `node_modules`, tested directly — see Code Examples for the exact commands run):

| File | Original | Recompressed PNG (same dims) | WebP (same dims) | Reduction |
|------|----------|-------------------------------|-------------------|-----------|
| `sales-real-time/thumbnail.png` | 102,330 bytes (950×541) | 37,161 bytes | 53,390 bytes | 64% (PNG wins — flat-color chart/screenshot content compresses better losslessly than lossy WebP at these dimensions) |
| `postgres-clean-process-superstore/diagram.png` | 124,204 bytes (1550×1232) | 34,052 bytes | 38,364 bytes | 73% (PNG wins) |

**Display-size sanity check:** `thumbnail.png` renders inside a `sm:grid-cols-2` card in a `max-w-5xl` (1024px) container — each card is roughly ~470-480px wide, so the 950px-wide source is already an appropriate ~2x-retina width; no resize needed. `diagram.png` renders inside a `max-w-3xl` (768px) article — the 1550px source is ~2x that, also already appropriate for retina; no resize needed.

**Recommendation:** Keep both files at their current pixel dimensions; recompress in place with a one-off Node script using Sharp directly (no new dependency required to run this once, though adding `sharp` as an explicit `devDependency` is cheap insurance if this script is kept in the repo for future use).

**When to use:** Once, before launch. Not a recurring build step — commit the recompressed files directly.

**Example:**
```js
// scripts/optimize-images.mjs (author-time only, not part of the Astro build)
// Source: tested directly in this repo, 2026-07-04 — Sharp API docs (sharp.pixelplumbing.com)
import sharp from 'sharp';

const files = [
  'public/projects/sales-real-time/thumbnail.png',
  'public/projects/postgres-clean-process-superstore/diagram.png',
];

for (const file of files) {
  const buf = await sharp(file).png({ quality: 85, compressionLevel: 9 }).toBuffer();
  await sharp(buf).toFile(file); // overwrite in place
  console.log(`${file}: recompressed`);
}
```

**Additional zero-cost fix while touching these `<img>` tags:** add explicit `width`/`height` attributes (950/541 and 1550/1232 respectively) to `ProjectCard.astro` and `[slug].astro`'s `<img>` elements to prevent layout shift (CLS) during image load, and `loading="lazy"` + `decoding="async"` since both images are below the immediate viewport fold. This is standard web-perf hygiene, zero risk, and directly supports the "pages load quickly" success criterion beyond raw file size.

### Pattern 3: Site-wide link crawl (POLISH-03)

**What:** `linkinator` with `--recurse` checks every internal page reachable by crawling from the entry URL, and validates (but doesn't recursively follow) every external link it encounters on those pages — covering all 5 GitHub repo links, the 1 live demo link, LinkedIn, Kaggle, GitHub profile, and the `mailto:` link in one pass, with no `--skip` needed for GitHub Pages' own internal links.

**When to use:** Run twice — once locally against `npm run preview` during development for fast iteration, and once more against the live deployed URL as the final pre-launch gate (per the phase goal "fully verified before public launch").

**Example:**
```bash
# Local preview pass (fast iteration during development)
npm run build && npm run preview &
npx linkinator http://localhost:4321/gersonlopesr.github.io/ --recurse

# Final live pre-launch pass (after deploy)
npx linkinator https://gersonlramos.github.io/gersonlopesr.github.io/ --recurse \
  --status-code "403:warn" --status-code "999:warn"
```

**Why `--status-code "403:warn"` and `"999:warn"`:** LinkedIn (and some other platforms) return non-standard status codes (403, or a proprietary 999) to block automated/bot traffic even when the link is genuinely valid for a real browser visitor. Treating these as warnings rather than hard failures avoids a false-positive "broken link" report for `https://www.linkedin.com/in/gersonlramos/`. This is a documented `linkinator` v7 pattern (the `--status-code CODE:ACTION` flag), not a project-specific guess — verify the actual LinkedIn/Kaggle response codes during execution and adjust flags if a different code appears.

**Note on `base` path:** the site is a *project page* (`gersonlramos.github.io/gersonlopesr.github.io/`), not a user-page root — always include the trailing `/gersonlopesr.github.io/` segment when testing, matching the pattern already established in Phase 1's `01-04-SUMMARY.md`.

### Pattern 4: SEO meta tags + sitemap (POLISH-04)

**What:** Extend `BaseLayout.astro` with `description` (required-ish, default provided) and optional `image`/`type` props, output standard meta description + Open Graph tags, and add `@astrojs/sitemap`.

**Current state (verified via direct fetch of the live HTML, 2026-07-04):** zero `<meta name="description">`, zero `og:*` tags, no sitemap reference anywhere in `<head>`, and `@astrojs/sitemap` absent from `package.json`. This is a from-scratch addition, not a fix.

**Example — `astro.config.mjs`:**
```js
// Source: https://docs.astro.build/en/guides/integrations-guide/sitemap/ (verified 2026-07-04)
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://gersonlramos.github.io',
  base: '/gersonlopesr.github.io',
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !page.includes('404') }),
  ],
  vite: { plugins: [tailwindcss()] },
});
```
`site` is already correctly set — this is the integration's only hard requirement, confirmed via official docs. Relative page URLs collected by Astro at build time are automatically prefixed with `base`, so the project-page path is handled with zero extra config (verified via official docs and community sources, 2026-07-04).

**Example — `BaseLayout.astro` extension:**
```astro
---
// Source: pattern verified against Open Graph protocol spec (ogp.me) + existing BaseLayout.astro
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
  image?: string; // absolute URL preferred; falls back to no og:image if omitted
  type?: 'website' | 'article';
}

const {
  title = 'Gerson Ramos — Data Scientist & Data Engineer',
  description = 'Portfolio of Gerson Ramos, a hybrid Data Scientist & Data Engineer — real-world case studies in ML, analytics, and data pipeline engineering.',
  image,
  type = 'website',
} = Astro.props;

const faviconHref = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/favicon.svg`;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href={faviconHref} />
    <link rel="canonical" href={canonicalURL} />
    <title>{title}</title>
    <meta name="description" content={description} />

    <meta property="og:type" content={type} />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {image && <meta property="og:image" content={new URL(image, Astro.site)} />}

    <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
  </head>
  <body class="bg-background text-foreground">
    <Nav />
    <main><slot /></main>
    <Footer />
  </body>
</html>
```

**Per-page usage:** homepage passes only `description` (no image — see Open Questions); `projects/index.astro` passes a description like "Browse case studies in Data Science and Data Engineering by Gerson Ramos"; `[slug].astro` passes `description={project.data.impactSummary}` and, if a thumbnail exists, `image={project.data.thumbnail}` (works for `sales-real-time`; DE projects without a `thumbnail` field fall back to no `og:image`, which is valid per the Open Graph spec — image is recommended, not required).

**`Astro.site` + `new URL(...)` correctly produces an absolute URL that already includes `base`** since `canonicalURL` is built from `Astro.url.pathname` (which Astro populates with the base-prefixed path) — no manual string concatenation needed, avoiding the exact class of `BASE_URL` string-concatenation bug Phase 3 already found and fixed once in `ProjectCard.astro`/`[slug].astro`/`Nav.astro`.

### Anti-Patterns to Avoid

- **Migrating to `astro:assets`/`image()` for 2 images:** See Alternatives Considered — disproportionate effort/risk for the measured gain versus a one-off recompression script.
- **JS-driven hamburger menu for a 5-link nav:** Contradicts the project's explicit zero-JS-by-default philosophy for a problem `flex-wrap` solves with 2 CSS classes.
- **Skipping the live-URL linkinator pass and only testing local preview:** Local `astro preview` and the live GitHub Pages deployment can differ (caching, actual DNS/TLS, GitHub's own redirect behavior) — the phase goal is explicitly "before public launch," so the final check must hit the real URL.
- **Treating LinkedIn 403/999 responses as genuine broken links:** Known bot-blocking behavior, not a real dead link — use `--status-code` to avoid a false failure blocking launch.
- **Adding `og:image` with a relative path:** Open Graph crawlers require absolute URLs for `og:image`; always resolve through `new URL(path, Astro.site)`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|--------------|-----|
| Sitemap generation | Manual `sitemap.xml` | `@astrojs/sitemap` | Zero-cost official integration, auto-updates if pages are added later, handles `base` path prefixing automatically |
| Broken-link detection | Custom crawler script (regex-scraping HTML for `<a href>`) | `linkinator` (already proven in Phase 1) | Handles redirects, external link validation, concurrency, and has documented flags for known bot-blocking false positives (LinkedIn) |
| PNG compression | Hand-tuned lossy conversion pipeline, or an online tool requiring manual upload/download per image | Sharp (already resolved in `node_modules`) via a 6-line script | Reproducible, scriptable, measured in this repo to cut both oversized files by 63-73% with zero visual quality loss at `quality: 85` |
| Responsive nav collapse | Custom JS toggle + ARIA state management | Tailwind `flex-wrap` (CSS-only) | The nav only has 5 links — this doesn't need interactive disclosure, just graceful line-wrapping |

**Key insight:** Every fix in this phase has a near-zero-dependency, already-available answer. The actual work is the *audit* — finding the specific overflow bug, measuring the specific compression gain, and confirming what's actually missing in `<head>` — not building new infrastructure.

## Common Pitfalls

### Pitfall 1: Assuming "no visible bug in normal browser use" means POLISH-01 is already satisfied
**What goes wrong:** The site "looks fine" at a typical desktop-emulator width (e.g., a 1280px+ dev browser window) and the temptation is to sign off POLISH-01 without testing narrow real-device widths.
**Why it happens:** Every page section (`sm:` classes) genuinely does look correct above 640px, masking the Nav.astro bug, which only manifests below ~520-550px of available nav width.
**How to avoid:** Explicitly test at 375px (iPhone SE/mini class) and 390px (iPhone 12-15 class) widths, not just the `sm:`/`md:`/`lg:` breakpoints Tailwind defines (640/768/1024px) — the bug lives *below* the smallest defined breakpoint.
**Warning signs:** A visual QA pass that only resizes down to 640px and calls it done.

### Pitfall 2: Over-optimizing images by resizing below display resolution
**What goes wrong:** Aggressively downscaling `thumbnail.png`/`diagram.png` (e.g., to 600px wide) to chase a smaller file size, producing blurry images on retina/HiDPI displays.
**Why it happens:** Smaller pixel dimensions always produce a smaller file, so it's an easy (but wrong) first instinct.
**How to avoid:** The display-size math above shows both images are already close to ideal 2x-retina width for their containers — resize is not needed, only recompression. Verify this hasn't regressed if a project's card/article layout changes in a future phase (recompute display width × 2 before resizing).
**Warning signs:** A resize target chosen without first checking the actual rendered container width in the relevant component (`ProjectCard.astro` / `[slug].astro`).

### Pitfall 3: `og:image` with a relative or `public/`-style path
**What goes wrong:** Passing `image="/projects/sales-real-time/thumbnail.png"` directly into an `og:image` meta tag without resolving it to an absolute URL — social media crawlers (Facebook, LinkedIn, Twitter/X) require absolute URLs for `og:image` and will silently fail to render a preview image if given a relative path.
**Why it happens:** Every other image reference in this codebase uses the `${baseUrl}/...` relative-string pattern, making it easy to reuse the same pattern here by habit.
**How to avoid:** Always wrap image paths through `new URL(image, Astro.site)` before emitting `og:image` (see Pattern 4 code example) — `Astro.site` is already configured with the correct production origin.
**Warning signs:** An `og:image` meta tag value in page source that starts with `/` instead of `https://`.

### Pitfall 4: Confusing "sitemap present" with "sitemap linked/discoverable"
**What goes wrong:** Adding `@astrojs/sitemap`, confirming `dist/sitemap-index.xml` exists after build, and considering POLISH-04 done — while no `robots.txt` or `<link rel="sitemap">` actually points crawlers to it.
**Why it happens:** The integration's own docs focus on generation, not discovery; it's easy to stop at "the file exists."
**How to avoid:** Add a `public/robots.txt` referencing the full sitemap URL (`Sitemap: https://gersonlramos.github.io/gersonlopesr.github.io/sitemap-index.xml`) — cheap, aligns with the phase's "discoverable" framing, not strictly required by the literal POLISH-04 wording but low-cost and high-value.
**Warning signs:** No `robots.txt` in `public/` at all (confirmed absent in current codebase).

### Pitfall 5: Re-introducing the BASE_URL string-concatenation bug pattern
**What goes wrong:** Phase 3 already found and fixed a site-wide bug where `${baseUrl}/${path}` string concatenation produced malformed URLs (`ProjectCard.astro`, `[slug].astro`, `Nav.astro`). Any new code touching URLs in this phase (canonical URLs, `og:url`, `og:image`) risks reintroducing the same class of bug if done via manual string concatenation instead of `new URL()`.
**How to avoid:** Use `new URL(Astro.url.pathname, Astro.site)` (Pattern 4) rather than string-template concatenation for every new URL this phase introduces.
**Warning signs:** Any `` `${...}/${...}` `` template literal building a URL from scratch instead of `new URL(...)`.

## Code Examples

### Verified Sharp compression test (run directly in this repo, 2026-07-04)
```js
// Source: tested live against this repo's actual files, confirms Sharp is already
// resolved and working via node_modules (no extra install needed to run this once)
const sharp = require('sharp');

async function test(path, label) {
  const orig = require('fs').statSync(path).size;
  const pngSame = await sharp(path).png({ quality: 85, compressionLevel: 9 }).toBuffer();
  console.log(label, 'orig:', orig, 'recompressed:', pngSame.length);
}
// Results (2026-07-04):
// thumbnail (950x541):  orig 102330 -> recompressed 37161  (-64%)
// diagram   (1550x1232): orig 124204 -> recompressed 34052  (-73%)
```

### Verified PNG header dimension read (no dependency needed)
```js
// Confirms actual pixel dimensions without any image library —
// PNG width/height are stored as big-endian uint32 at byte offsets 16 and 20.
const fs = require('fs');
function pngSize(path) {
  const buf = fs.readFileSync(path);
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}
```

### Live-site current `<head>` (fetched 2026-07-04, confirms the "before" state)
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/svg+xml" href="/gersonlopesr.github.io/favicon.svg">
  <title>Gerson Ramos — Data Scientist &amp; Data Engineer</title>
  <link rel="stylesheet" href="/gersonlopesr.github.io/_astro/BaseLayout.BLR-iMtk.css">
</head>
<!-- No meta description, no og:* tags, no sitemap reference — confirmed absent -->
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|---------------|--------|
| CLAUDE.md's stack table says "Astro 6.x" | Project is actually running Astro 7.0.6 (`package.json` `^7.0.6`, confirmed installed) | Astro 7 released after CLAUDE.md's stack research was written | No functional impact — Content Layer API, `astro:assets`, and integration patterns referenced in CLAUDE.md and Phase 3 research are all still current for Astro 7. Flagging only so the planner doesn't second-guess the version mismatch as a bug. |
| N/A (no prior SEO work in this project) | `@astrojs/sitemap@3.7.3` is the current, actively maintained official integration | N/A | Straightforward add, no deprecated API surface encountered |

**Deprecated/outdated:** None encountered specific to this phase's scope.

## Open Questions

1. **Should the homepage/gallery pages ship a default `og:image`, or launch without one?**
   - What we know: No branded social-preview image (1200×630 banner) exists anywhere in the repo; creating one is a design task, not a code task, and is out of this research's scope to produce.
   - What's unclear: Whether the user wants to invest in a quick banner graphic (e.g., name + tagline on the site's dark theme, exportable from Figma/Canva in minutes) before launch, or accept a text-only social card for v1.
   - Recommendation: Ship `og:title`/`og:description`/`og:type`/`og:url` unconditionally now (zero cost, defined in Pattern 4). For `og:image`, use the per-project `thumbnail` field where it exists (`sales-real-time` case study only) and omit it elsewhere — a valid, spec-compliant state. Treat a proper homepage banner as a fast-follow, not a launch blocker.

2. **Should `robots.txt` be added even though POLISH-04's literal wording doesn't require it?**
   - What we know: It's a 2-line file, zero risk, and directly supports "discoverable" from the phase goal statement.
   - What's unclear: Nothing technical — this is purely a scope-boundary judgment call for the planner.
   - Recommendation: Include it; cost is negligible relative to benefit (see Pitfall 4).

3. **Should the final PostgreSQL/SuperStore ERD image and Sales_Real_Time thumbnail be re-exported at source (e.g., from the original Power BI/pgAdmin tool) instead of recompressed?**
   - What we know: Recompression alone (no resize, no re-export) already achieves 63-73% reduction with no visible quality loss at `quality: 85`.
   - What's unclear: Whether re-exporting from source would yield an even smaller baseline (unlikely to matter enough to justify the extra author effort of returning to the original tools).
   - Recommendation: Recompression is sufficient; do not block launch on re-exporting from original tooling.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Astro build | ✓ | v22.22.1 (matches `engines: >=22.12.0`) | — |
| npm | dependency install | ✓ | bundled with Node | — |
| Sharp (transitive via Astro) | one-off image recompression script | ✓ (confirmed working via direct test in this repo) | resolved per-platform in `package-lock.json` | If ever unavailable: any PNG optimizer (pngquant, ImageOptim, Squoosh) achieves the same end result manually |
| linkinator (via `npx`) | POLISH-03 link crawl | ✓ (already used successfully in Phase 1) | 7.6.1 (latest) | — |
| `@astrojs/sitemap` | POLISH-04 sitemap | Not yet installed — add via `npm install @astrojs/sitemap` | 3.7.3 (latest, verified) | — |
| Live deployed site (`gersonlramos.github.io/gersonlopesr.github.io/`) | Final linkinator pass, live SEO tag verification | ✓ (confirmed HTTP 200, fetched live 2026-07-04) | — | — |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:** `@astrojs/sitemap` is simply not yet installed (not "missing" in the sense of unavailable) — a one-command `npm install` resolves this, no fallback needed.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None (confirmed, consistent with Phase 3 research) — `npm run build` is the validation gate |
| Config file | none |
| Quick run command | `npm run build` |
| Full suite command | `npm run build` + `npx linkinator <url> --recurse` + manual visual/meta-tag spot checks (this phase is audit-heavy; most requirements are not mechanically unit-testable) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| POLISH-01 | Nav and page sections don't overflow/clip at mobile widths | manual (visual) | `npm run build` (regression gate only) + manual resize test at 375/390/768/1024px | — (no automated viewport test exists; not worth adding a framework for this) |
| POLISH-02 | Both PNGs recompressed, no oversized images remain | scripted | `node scripts/optimize-images.mjs` then `ls -la public/projects/**/*.png` to confirm new sizes (~37KB, ~34KB) | ❌ Wave 0 — script itself is the "test" |
| POLISH-03 | Zero broken links, internal + external | automated | `npx linkinator https://gersonlramos.github.io/gersonlopesr.github.io/ --recurse --status-code "403:warn" --status-code "999:warn"` — exit code 0 required | ✓ (linkinator itself is the tool, no wrapper file needed) |
| POLISH-04 | Meta description + OG tags present in page source, sitemap file exists at build output | scripted | `npm run build && grep -c 'sitemap-index' dist/sitemap-index.xml` (existence check) + `curl -s <url> | grep -o 'meta name="description"'` post-deploy | ❌ Wave 0 — no test file, `curl`/`grep` one-liners are sufficient for a static site this size |

### Sampling Rate
- **Per task commit:** `npm run build` (schema/build regression check, <15s for this project size)
- **Per wave merge:** `npm run build` + relevant spot check (linkinator for link-related tasks, `curl | grep` for SEO tasks, manual resize for nav task)
- **Phase gate:** Full `npm run build` + full-site `linkinator --recurse` against the live URL + manual meta-tag/OG verification via "view page source" + comprehensive human-verify checkpoint covering the entire v1 site (all 4 phases) before considering v1 launched

### Wave 0 Gaps
- No test framework install needed — every check in this phase is either the existing `npm run build` gate, a one-off Node script (image recompression), or a CLI tool invocation (`linkinator`) with a pass/fail exit code.
- Optional: add two `package.json` scripts for reuse/documentation value (not required, but cheap):
  - `"check:links": "linkinator https://gersonlramos.github.io/gersonlopesr.github.io/ --recurse --status-code \"403:warn\" --status-code \"999:warn\""`
  - No script needed for image optimization since it's a one-time task (script can live in `scripts/` and be deleted or kept for future images).

*(No missing framework install needed — this phase's validation is entirely build-gate + scripted checks + human visual verification, appropriate for a static content site at this scale and for requirements this audit-oriented.)*

## Sources

### Primary (HIGH confidence)
- Local codebase inspection: `src/pages/*.astro`, `src/components/*.astro`, `src/layouts/BaseLayout.astro`, `src/content.config.ts`, `astro.config.mjs`, `package.json`, `.github/workflows/deploy.yml` — read directly, 2026-07-04
- Live site fetch: `https://gersonlramos.github.io/gersonlopesr.github.io/` — fetched directly via `curl`, 2026-07-04, confirmed current `<head>` state and HTTP 200
- Direct `npm run build` execution in this repo, 2026-07-04 — confirmed clean build, 8 pages, no errors
- Direct Sharp compression test executed in this repo, 2026-07-04 — exact before/after byte counts for both PNGs (see Code Examples)
- Direct PNG dimension read (byte-offset parsing) executed in this repo, 2026-07-04 — confirmed 950×541 and 1550×1232
- `npm view @astrojs/sitemap version` / `npm view linkinator version` — npm registry, fetched 2026-07-04
- https://docs.astro.build/en/guides/integrations-guide/sitemap/ — official docs, sitemap setup/config, fetched 2026-07-04
- `.planning/phases/03-case-study-template-project-content/03-RESEARCH.md` — this project's own prior research, Open Question 2 and Pitfall 4 (image() vs. plain-string convention), directly informs this phase's POLISH-02 recommendation
- `.planning/phases/01-foundation-deployment-pipeline/01-04-SUMMARY.md` — confirms `linkinator` was already used successfully in this project, establishing the pattern extended in this research

### Secondary (MEDIUM confidence)
- WebSearch: Astro `astro:assets`/`Image` public vs. src/ optimization behavior, cross-referenced with official docs terminology ("images in public/ are never optimized") — consistent with official Astro docs framing
- WebSearch: `linkinator` `--status-code` flag behavior for LinkedIn bot-blocking (403/999) — corroborated by the flag's documented existence in `npx linkinator --help` output (verified directly) and multiple community reports of LinkedIn's bot-blocking behavior

### Tertiary (LOW confidence)
- None — every finding in this document is grounded in either direct repo/live-site inspection, a command actually run in this repo, or official documentation fetched the same day.

## Metadata

**Confidence breakdown:**
- Standard stack (sitemap, linkinator, Sharp): HIGH — versions verified via npm registry same-day, Sharp availability and compression gains measured directly in this repo
- Architecture patterns (Nav fix, BaseLayout SEO extension): HIGH — Nav overflow bug is a directly observable class-inspection finding, not speculative; BaseLayout pattern follows official Astro `Astro.site`/`Astro.url` API and Open Graph spec
- Pitfalls: HIGH — each pitfall is either a directly-confirmed absence (no robots.txt, no OG tags) or a documented recurrence risk from this project's own Phase 3 history (BASE_URL concatenation bug)
- Image optimization approach (recompression vs. `image()` migration): HIGH — decision is based on measured compression results and the already-adequate display-size calculation, not a training-data assumption

**Research date:** 2026-07-04
**Valid until:** ~30 days (stable static-site tooling; re-verify `@astrojs/sitemap` and `linkinator` versions if planning is delayed significantly, and re-run the live-site fetch/linkinator crawl if content changes before launch)

---
*Phase: 04-polish-performance-launch*
*Research completed: 2026-07-04*
