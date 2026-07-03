# Phase 1: Foundation & Deployment Pipeline - Research

**Researched:** 2026-07-03
**Domain:** Astro 7 static site scaffold + GitHub Actions → GitHub Pages deployment pipeline (User Pages repo), base layout (nav/footer), Content Collections schema definition
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** GitHub username is `gersonlopesr` — repo is a User Pages repo: `gersonlopesr.github.io`
- **D-02:** Use the default GitHub Pages URL (`gersonlopesr.github.io`) for v1. Custom domain is explicitly deferred (already tracked as v2 requirement EXP-01) — avoids DNS/HTTPS propagation delay risk in this phase.
- **D-03:** Starting 100% from scratch — no prior repository or code to migrate/preserve.
- **D-04:** All v1 content is in **English**. Portuguese is deferred to v2 as a bilingual addition (not launched simultaneously).
- **D-05:** User already has English versions of CV/LinkedIn material available to draw from in later phases (relevant for Phase 2).
- **D-06:** Site name/title: **"Gerson Lopes — Data Scientist & Data Engineer"** — used in header and browser tab title.
- **D-07:** Color theme: **dark tech** (dark background, modern/technical feel). No light/dark toggle for v1 — single dark theme only.
- **D-08 (not revisited):** The research-recommended stack (Astro + MDX + Tailwind CSS, deployed via `withastro/action` to GitHub Pages) stands as-is from PROJECT.md. Not explicitly re-confirmed by the user, but not objected to either. **Note:** see "State of the Art" section below — the concrete Astro major version has moved from 6.x (as documented in prior research) to 7.x (current stable as of this research date); the decision to use Astro itself is unaffected, only the pinned version number.

### Claude's Discretion

- Exact CI/CD workflow implementation (GitHub Actions config, `upload-pages-artifact` + `deploy-pages` steps)
- Exact color palette values within the "dark tech" direction (specific hex values, contrast ratios)
- Font choices, spacing, and other visual details not explicitly specified
- Internal repo/file structure conventions (within Astro's standard project layout)

### Deferred Ideas (OUT OF SCOPE)

- **Custom domain + HTTPS** — deferred to v2 (already tracked as EXP-01 in REQUIREMENTS.md)
- **Portuguese / bilingual content** — deferred to v2, English-only for v1 launch
- **Light/dark theme toggle** — not selected; v1 ships with dark theme only, toggle could be revisited later if desired

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SETUP-01 | Site is built with Astro + MDX + Tailwind and auto-deploys to GitHub Pages via GitHub Actions | Verified current `npm create astro@latest` scaffold flow, exact package versions (Astro 7.0.6, `@astrojs/mdx` 7.0.2, `tailwindcss`/`@tailwindcss/vite` 4.3.2), and the official `withastro/action@v6` + `actions/deploy-pages@v5` workflow YAML (see Code Examples) |
| SETUP-02 | Site is served at a working `username.github.io` URL with no broken paths/404s | Verified `astro.config.mjs` `site`/`base` semantics for a User Pages repo (no `base` needed, defaults to `/`), plus Pitfall 4 (baseurl misconfiguration) translated from Jekyll to Astro terms |
| SETUP-03 | Every page shows a persistent nav + footer with contact/profile links | Verified Astro layout composition pattern (shared `.astro` layout importing global Tailwind CSS, `<slot />` for page content) — architecture translated from ARCHITECTURE.md's Jekyll `_layouts`/`_includes` pattern |

</phase_requirements>

## Summary

Phase 1 builds the technical skeleton the rest of the project depends on: a working Astro project, a GitHub Actions pipeline that deploys it to a live GitHub Pages URL, and a persistent nav/footer shell. The Jekyll-vs-Astro gap flagged by SUMMARY.md is resolved below — all architectural patterns from ARCHITECTURE.md (collection-per-content-type, CI-driven deploy, User Pages repo naming, avoid-hardcoded-paths) transfer directly to Astro; only the concrete syntax changes (Liquid → `.astro`/Zod, `_config.yml` → `astro.config.mjs`, Jekyll collections → Astro Content Collections).

**Important version correction versus prior project-level research:** STACK.md and CLAUDE.md recommend "Astro 6.x" as current stable. As of this research date (2026-07-03), **Astro 7.0.6 is the actual current stable release** (Astro 7.0.0 shipped June 2026, one month before this research). The npm registry was queried directly to confirm this. Astro 7 is a "foundations" release (new Rust-based compiler, Vite 8, stricter HTML parsing) with one narrow breaking change (stricter HTML parsing — surfaces malformed markup as build errors instead of silently fixing it) and keeps the same `Node >=22` floor and the same Content Collections (`src/content.config.ts`) API introduced in Astro 5. This does not change any of the architectural decisions in CONTEXT.md or PROJECT.md — it only changes the exact version to pin. **Recommendation: use Astro 7 (current stable), not Astro 6,** since 6.x is now a prior major and will stop receiving new features.

**Primary recommendation:** Scaffold with `npm create astro@latest` (TypeScript strict template, empty starter), add `mdx` and `tailwind` integrations via `astro add`, name the repo exactly `gersonlopesr.github.io`, set `site: 'https://gersonlopesr.github.io'` with no `base` in `astro.config.mjs`, and deploy via a two-job GitHub Actions workflow (`withastro/action@v6` build + `actions/deploy-pages@v5` deploy) triggered on push to `main`. Build the nav/footer as a single shared `BaseLayout.astro` that every page imports, with a `<slot />` for page content — this is the direct Astro translation of Jekyll's `_layouts/default.html` + `_includes/nav.html`/`footer.html` pattern.

## Standard Stack

### Core

| Library | Version (verified 2026-07-03) | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `astro` | **7.0.6** (current stable; 7.0.0 released June 2026) | Static site generator | Current stable major; supersedes the "6.x" figure in STACK.md/CLAUDE.md — verified directly against the npm registry, not training data. Islands architecture, built-in Content Collections, official GitHub Pages deploy action. |
| `@astrojs/mdx` | **7.0.2** | MDX support for case-study authoring | Version-matched to `astro@7.x` (Astro integration versions track the core major). Install via `astro add mdx`, never install manually with a mismatched version. |
| `tailwindcss` | **4.3.2** | Utility-first CSS | CSS-first config (`@theme` in CSS), no `tailwind.config.js` file needed. |
| `@tailwindcss/vite` | **4.3.2** | Vite plugin wiring Tailwind into Astro's build | **Not** `@astrojs/tailwind` — that integration is deprecated and only supports Tailwind v3. `astro add tailwind` (Astro ≥5.2) installs this plugin automatically and is correct for Astro 7. |
| Node.js | **>=22.12.0** (local: v22.22.1 confirmed available) | Build-time runtime only | Astro 7's documented `engines.node` floor (verified via `npm view astro engines`). Not shipped to users — build artifact is static HTML/CSS/JS. |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Astro Content Collections + Zod (bundled in `astro` core, no separate install) | bundled with 7.0.6 | Type-safe schema for the `projects` collection | Define now (empty/schema-only, per phase scope) — Phase 3 populates actual entries. |
| `@astrojs/sitemap` | **3.7.3** | `sitemap.xml` generation | Not a Phase 1 requirement (POLISH-04 is Phase 4), but cheap to add now if convenient — optional for this phase, do not block on it. |
| `astro/loaders` `glob()` (bundled) | bundled | Loads `.md`/`.mdx` files from a content directory into a collection | Required by the `content.config.ts` pattern in Astro 5+/7 — replaces the old implicit-folder-collection behavior from Astro <5 (do not use outdated `defineCollection({ type: 'content', schema })`-only patterns found in older tutorials). |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Astro 7 (current) | Astro 6.x (prior major, per stale project research) | No concrete benefit — 6.x only makes sense if pinning to it deliberately for stability reasons already in production; for a brand-new scaffold there is no reason to start one major behind. |
| `npm` as package manager | `pnpm` (recommended in STACK.md) | `pnpm` is **not installed** in the current local dev environment (verified: `pnpm --version` → command not found). `npm` (v11.12.0, confirmed installed) works identically with `withastro/action` (auto-detects `package-lock.json`). Use npm for Phase 1 to avoid an extra local install step; switching to pnpm later is a zero-risk change (only affects the lockfile + CI auto-detection, not app code). |
| `withastro/action@v6` (major tag, resolves to v6.1.1) | Pinning exact `v6.1.1` | Using the major tag (`@v6`) is the pattern shown in the action's own README and Astro's official docs — gets patch/minor fixes automatically. Pin to an exact SHA only if reproducibility is a stricter requirement than convenience (not the case here). |

**Installation:**
```bash
# Scaffold (creates Astro 7 project; interactive prompts: directory, template, TypeScript strictness, install deps, git init)
npm create astro@latest -- --template minimal --typescript strict

# cd into the new project, then add integrations
npx astro add mdx
npx astro add tailwind
# (optional, not required this phase) npx astro add sitemap
```

**Version verification performed:**
```bash
npm view astro version        # → 7.0.6
npm view @astrojs/mdx version # → 7.0.2
npm view tailwindcss version  # → 4.3.2
npm view @tailwindcss/vite version # → 4.3.2
npm view @astrojs/sitemap version  # → 3.7.3
npm view astro engines        # → { node: '>=22.12.0', npm: '>=9.6.5', pnpm: '>=7.1.0' }
```
All confirmed against the live npm registry on 2026-07-03, not assumed from training data.

## Architecture Patterns

### Recommended Project Structure

```
gersonlopesr.github.io/                 # repo name MUST match exactly — User Pages repo
├── .github/
│   └── workflows/
│       └── deploy.yml                  # CI: build via withastro/action, deploy via actions/deploy-pages
├── astro.config.mjs                    # site: 'https://gersonlopesr.github.io', no `base`, tailwind vite plugin
├── package.json
├── package-lock.json
├── src/
│   ├── content.config.ts               # Content Collections config — `projects` schema defined here (Astro 5+/7 convention)
│   ├── content/
│   │   └── projects/                   # empty in Phase 1 — populated in Phase 3 (PROJ-* requirements)
│   ├── layouts/
│   │   └── BaseLayout.astro            # persistent shell: <Nav />, <slot />, <Footer />
│   ├── components/
│   │   ├── Nav.astro
│   │   └── Footer.astro                # contact/profile links (LinkedIn, GitHub, Kaggle) — SETUP-03
│   ├── pages/
│   │   └── index.astro                 # placeholder home page for this phase (full content is Phase 2)
│   └── styles/
│       └── global.css                  # `@import "tailwindcss";` + `@theme { ... }` dark tech palette
├── public/
│   └── favicon.svg
└── tsconfig.json
```

### Structure Rationale

- **Repo name `gersonlopesr.github.io` (User Pages repo):** required for root-domain hosting with an empty `base` — directly satisfies D-01/D-02 and avoids the entire class of baseurl bugs described in PITFALLS.md Pitfall 4. This is the single highest-leverage decision in this phase; get it right before writing any code.
- **`src/content.config.ts` (not `src/content/config.ts`):** Astro 5+ (carried into 7) moved the Content Collections config file to the project root of `src/`, not nested inside `src/content/`. This is the concrete Astro translation of ARCHITECTURE.md's Jekyll `_config.yml` collection declaration — verified directly against current Astro docs (see Code Examples).
- **`BaseLayout.astro` as the single shared shell:** directly satisfies SETUP-03 (persistent nav/footer on every page). This is the Astro-native translation of ARCHITECTURE.md's `_layouts/default.html` + `_includes/nav.html`/`footer.html` — in Astro, includes/partials are just regular `.astro` components imported into the layout, no separate "includes" mechanism is needed.
- **`projects` collection schema defined but empty:** Phase 1 scope is the schema only (per phase description: "even though Phase 1 only needs the schema defined, not populated"). This unblocks Phase 3 (PROJ-01..06) without requiring any case-study content to exist yet, and lets `getCollection('projects')` be called safely (returns `[]`) if a projects listing stub is built early.
- **Global CSS imported once, in the layout:** Tailwind v4's `@import "tailwindcss"` directive goes in one CSS file (`src/styles/global.css`), imported once in `BaseLayout.astro`'s frontmatter — not per-page. This keeps the "dark tech" theme (D-07) centralized as a single `@theme` block rather than scattered utility overrides.

### Pattern 1: Shared layout with slot (Astro translation of Jekyll's layout+includes)

**What:** One `.astro` layout component wraps every page, rendering `<Nav />` and `<Footer />` around a `<slot />` that receives the page's own content.
**When to use:** Always, for every page in this site — this is what makes nav/footer "persistent" (SETUP-03) without duplicating markup per page.
**Example:**
```astro
---
// src/layouts/BaseLayout.astro
// Source: https://docs.astro.build/en/basics/layouts/ (official docs pattern)
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title?: string;
}
const { title = 'Gerson Lopes — Data Scientist & Data Engineer' } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
  </head>
  <body class="bg-slate-950 text-slate-100">
    <Nav />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```
```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout>
  <h1>Placeholder — content ships in Phase 2</h1>
</BaseLayout>
```

### Pattern 2: Content Collections config (Astro translation of Jekyll's `_projects` collection)

**What:** A single `src/content.config.ts` file declares every collection with a `loader` (where files live) and a Zod `schema` (what frontmatter fields are required/typed).
**When to use:** Define now for `projects`, even with zero entries — this is the direct Astro equivalent of ARCHITECTURE.md's `_projects/` Jekyll collection pattern, and the schema below matches the frontmatter fields ARCHITECTURE.md's example used (`title`, `summary`, `stack`, `role`, `repo_url`, `notebook_url`, `thumbnail`, `order`).
**Example:**
```typescript
// src/content.config.ts
// Source: https://docs.astro.build/en/guides/content-collections/ (official docs, Astro 5+/7 API)
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    stack: z.array(z.string()),
    role: z.string(),
    repoUrl: z.string().url(),
    notebookUrl: z.string().url().optional(),
    thumbnail: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { projects };
```
This file can exist with zero `.md`/`.mdx` files in `src/content/projects/` — `getCollection('projects')` simply returns an empty array until Phase 3 adds entries.

### Anti-Patterns to Avoid

- **Setting a non-empty `base` for this repo:** This is a User Pages repo (`gersonlopesr.github.io`), which serves at the domain root. Setting `base: '/gersonlopesr.github.io'` or any non-`/` value is the exact mistake ARCHITECTURE.md's Anti-Pattern 4 describes (translated from Jekyll's `baseurl` mistake) — it would break every internal link/asset path.
- **Using `src/content/config.ts` (old nested path) instead of `src/content.config.ts`:** older Astro tutorials (pre-5.0) and possibly stale training data reference the nested path — current Astro 7 convention is the root-of-`src` file. Both may still work via a fallback in some versions, but the documented current convention is `src/content.config.ts`; don't mix both.
- **Installing `@astrojs/tailwind`:** this integration is deprecated and only supports Tailwind v3. Installing it alongside `tailwindcss@4.x` will fail or silently misconfigure. Use `@tailwindcss/vite` via `astro add tailwind`.
- **Relying on GitHub's legacy "Deploy from a branch" Jekyll auto-build:** this repo is not a Jekyll site at all (no `_config.yml`, Ruby, etc.) — GitHub Pages must be explicitly set to **Settings → Pages → Build and deployment → Source: "GitHub Actions"** (a one-time manual step in the repo's web UI, not something committed to code) or the Actions-built site will never actually serve.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Build + deploy to GitHub Pages | A custom Actions workflow that runs `npm run build` and manually pushes `dist/` to a `gh-pages` branch | `withastro/action@v6` + `actions/deploy-pages@v5` | Official, maintained by the Astro team; auto-detects package manager from the lockfile; handles the Pages artifact upload/deploy environment correctly (avoids the deprecated "push to gh-pages branch" pattern, which has its own stale-cache and permissions pitfalls). |
| Nav/footer repeated per page | Copy-pasting `<nav>`/`<footer>` HTML into every `.astro` page | A single `BaseLayout.astro` with `<slot />`, imported by every page | Astro's component model already solves "shared chrome across pages" — hand-rolling this via copy-paste is exactly what SETUP-03 and PITFALLS.md Pitfall 9/10 warn against (inconsistent or missing CTA/nav across pages). |
| Type-checking case-study frontmatter | Manually validating frontmatter fields at render time, or trusting untyped Markdown frontmatter | Astro Content Collections + Zod schema (`content.config.ts`) | Malformed frontmatter fails the build loudly instead of breaking a page silently in production — directly the reasoning STACK.md gives for choosing Astro's Content Collections over plain Markdown. |
| Tailwind config file boilerplate | A hand-written `tailwind.config.js` with theme extensions | Tailwind v4's CSS-first `@theme` block in `global.css` | Tailwind v4 removed the need for a JS config file for most projects; fighting this by adding a v3-style config back in adds unnecessary complexity and drifts from the current official pattern. |

**Key insight:** Every piece of "plumbing" in this phase (deploy pipeline, layout sharing, content schema, CSS theming) has an official, first-party solution as of the current Astro 7 / Tailwind 4 versions. There is no part of Phase 1 that legitimately requires a custom-built solution — the entire phase should be "wire together standard pieces correctly," not "build infrastructure."

## Common Pitfalls

### Pitfall 1: Wrong repo name or non-empty `base` breaks every path (translated from ARCHITECTURE.md/PITFALLS.md Jekyll `baseurl` pitfall)

**What goes wrong:** If the repo isn't named exactly `gersonlopesr.github.io`, GitHub Pages serves it as a project site at `gersonlopesr.github.io/<reponame>/`, which requires `base: '/<reponame>'` in `astro.config.mjs` and breaks any hardcoded root-relative asset path.
**Why it happens:** Easy to typo the repo name at creation time, or to reuse a generic repo name from a template.
**How to avoid:** Create the repo with the exact name `gersonlopesr.github.io` (case-sensitive-safe, GitHub lowercases usernames in the domain but the repo name must still match the account name), verify in repo Settings before scaffolding Astro, and confirm `astro.config.mjs` has `site: 'https://gersonlopesr.github.io'` with **no** `base` key (or `base: '/'`, the default).
**Warning signs:** CSS/images 404 in production but work in `astro dev`; internal links resolve to `/undefined/...` or double slashes.

### Pitfall 2: GitHub Pages "Source" not switched to GitHub Actions (one-time manual step)

**What goes wrong:** The Actions workflow runs and reports success, but the live URL still shows a 404 or an old GitHub-generated placeholder page, because Pages is still configured to build from a branch instead of from the Actions artifact.
**Why it happens:** This is a repo Settings UI toggle, not something expressed in code/YAML — easy to forget since every other part of the pipeline is "as code."
**How to avoid:** Before (or immediately after) the first push, go to **Settings → Pages → Build and deployment → Source** and select **"GitHub Actions"** explicitly. Astro's official deploy guide calls this out as a required manual step.
**Warning signs:** Actions tab shows green/successful runs, but the public URL doesn't reflect the new content, or shows a completely different page than expected.

### Pitfall 3: MDX/Astro version mismatch after ad-hoc installs

**What goes wrong:** Manually running `npm install @astrojs/mdx` (rather than `astro add mdx`) can pull a version not matched to the installed Astro major, causing build errors that are confusing to diagnose.
**Why it happens:** `npm install <package>` alone doesn't know which Astro major you're on; `astro add` specifically resolves a compatible version.
**How to avoid:** Always use `npx astro add mdx` / `npx astro add tailwind`, never bare `npm install` for Astro integrations.
**Warning signs:** Build errors referencing internal Astro/MDX API mismatches after an integration install.

### Pitfall 4: Confusing "builds locally" with "deployed correctly" (translated from PITFALLS.md Pitfall 4/5)

**What goes wrong:** `npm run dev` and even `npm run build && npm run preview` look correct locally, but the actual deployed `gersonlopesr.github.io` URL differs — because local `preview` doesn't necessarily exercise the same `site`/`base` resolution GitHub Pages does, and because the workflow itself can fail silently if permissions (`pages: write`, `id-token: write`) are missing from the workflow YAML.
**Why it happens:** Local dev servers are forgiving about absolute vs. relative paths in ways production static hosting is not.
**How to avoid:** Treat "phase done" as **the live `https://gersonlopesr.github.io` URL loads correctly with working nav/footer links and no console 404s** — not "local build succeeded." Explicitly check the Actions run logs for both the `build` and `deploy` jobs after the first push.
**Warning signs:** Actions workflow is green, but visiting the actual URL shows unstyled HTML, missing nav, or a GitHub 404 page.

### Pitfall 5: Astro 7's stricter HTML parsing surfaces markup errors that Astro 6 silently tolerated

**What goes wrong:** Malformed HTML (unclosed tags, invalid nesting) that previously built without complaint under Astro 6 now fails the build under Astro 7's new Rust-based compiler.
**Why it happens:** Astro 7 intentionally tightened HTML parsing to standards-aligned rules instead of silently auto-correcting invalid markup (confirmed via Astro 7 release coverage, MEDIUM confidence — cross-referenced across multiple independent 2026 upgrade-notes articles, not yet verified against the primary astro.build changelog post directly).
**How to avoid:** Not a practical risk for a from-scratch Phase 1 scaffold (no legacy markup to migrate), but worth knowing if a build error appears that references invalid HTML structure — the fix is to correct the markup, not to suppress the check.
**Warning signs:** Build fails with an error pointing at a specific file/line of invalid HTML nesting.

## Code Examples

### GitHub Actions workflow — full deploy pipeline

```yaml
# .github/workflows/deploy.yml
# Source: https://docs.astro.build/en/guides/deploy/github/ (official Astro docs)
# and https://github.com/withastro/action (verified latest release: v6.1.1, via GitHub API)
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v7
      - name: Install, build, and upload your site
        uses: withastro/action@v6
        # Defaults used (verified via action.yml): node-version: "24", out-dir: "dist",
        # package-manager auto-detected from lockfile (package-lock.json → npm)

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

**Verified action versions (via `curl https://api.github.com/repos/<org>/<repo>/releases/latest` on 2026-07-03):**
- `actions/checkout` → latest release `v7.0.0`
- `withastro/action` → latest release `v6.1.1` (use major tag `@v6`)
- `actions/deploy-pages` → latest release `v5.0.0`

### astro.config.mjs — User Pages repo, no base

```javascript
// astro.config.mjs
// Source: https://docs.astro.build/en/reference/configuration-reference/ (official docs)
import { defineConfig } from 'astro';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://gersonlopesr.github.io',
  // no `base` — User Pages repos serve at the domain root; base defaults to '/'
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Tailwind v4 setup (dark tech theme entry point)

```bash
npx astro add tailwind
# installs @tailwindcss/vite and wires it into astro.config.mjs automatically (Astro >=5.2 behavior, confirmed current for 7.x)
```

```css
/* src/styles/global.css */
/* Source: https://docs.astro.build/en/guides/styling/ (official docs) */
@import "tailwindcss";

@theme {
  /* dark tech palette — exact hex values are Claude's discretion per CONTEXT.md */
  --color-background: #0a0e14;
  --color-foreground: #e2e8f0;
  --color-accent: #22d3ee;
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|---------------|--------|
| Astro 6.x (as documented in this project's STACK.md/ARCHITECTURE.md/CLAUDE.md) | **Astro 7.0.6** | Astro 7.0.0 shipped June 2026, ~1 month before this research | Pin `astro@7.x` (or unpinned `latest` at scaffold time), not `6.x`. No feature/decision changes — same Node floor (>=22), same Content Collections API, same MDX/Tailwind integration pattern. Only the stricter HTML parsing (see Pitfall 5) is a genuinely new behavior. |
| `src/content/config.ts` (older Astro <5 tutorials, and some stale AI training data) | `src/content.config.ts` | Introduced with Astro 5.0's Content Layer API, unchanged in 7.x | Verified directly against current official docs — use the root-of-`src` path. |
| `@astrojs/tailwind` integration | `@tailwindcss/vite` plugin via `astro add tailwind` | Tailwind v4 release (integration deprecated for v4 projects) | `@astrojs/tailwind` only supports Tailwind v3 and must not be used with `tailwindcss@4.x`. |
| Manually pushing a `gh-pages` branch from CI | `actions/upload-pages-artifact` (handled internally by `withastro/action`) + `actions/deploy-pages` | GitHub's Pages "Actions as a source" model, now the documented default | Requires the one-time manual Settings → Pages → Source → "GitHub Actions" toggle (Pitfall 2). |

**Deprecated/outdated:**
- `@astrojs/tailwind`: superseded by `@tailwindcss/vite`, do not install for this project.
- Nested `src/content/config.ts`: superseded by `src/content.config.ts`.
- GitHub's legacy automatic Jekyll build path: not applicable at all to an Astro project — must use the Actions-based deploy described above.

## Open Questions

1. **Exact `npm create astro@latest` interactive flow in a non-interactive CI/agent context**
   - What we know: The scaffold command supports `--yes`/`--no`/`--template`/`--typescript` flags to skip prompts entirely (verified via `withastro/astro` GitHub issues + README, MEDIUM confidence — not fetched from a single canonical current doc page for the full flag list).
   - What's unclear: The precise current default template name(s) available as of Astro 7 (e.g., whether "minimal"/"basics" naming is unchanged) wasn't independently confirmed against a live `npm create astro@latest --help` run in this research pass.
   - Recommendation: At execution time, run `npm create astro@latest -- --help` first to confirm current flag names/template list before scripting the non-interactive scaffold command, and adjust the exact flags in the plan's task if they've drifted.

2. **Whether `astro add mdx` / `astro add tailwind` prompt for confirmation in a non-TTY environment**
   - What we know: These commands are designed to be run interactively and typically ask to confirm dependency installation and config file changes.
   - What's unclear: The exact non-interactive flag (commonly `-y`/`--yes`) current for Astro 7's CLI wasn't independently re-verified in this pass.
   - Recommendation: Plan tasks should run these commands and be prepared to pass a `--yes` confirmation flag, verifying via `--help` if the command hangs waiting for input.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Astro build (local dev + reference for CI parity) | ✓ | v22.22.1 | — (satisfies Astro 7's `>=22.12.0` floor) |
| npm | Package management, scaffold command | ✓ | 11.12.0 | — |
| pnpm | STACK.md's recommended package manager | ✗ | — | Use npm instead (fully supported by `withastro/action`'s lockfile auto-detection; zero functional difference for this project's scale) |
| git | Version control, repo init | ✓ | 2.54.0 | — |
| GitHub CLI (`gh`) | Convenience for repo creation/Pages settings from terminal | ✗ | — | Create the repo and toggle Pages → Source: "GitHub Actions" via the GitHub web UI instead (one-time manual steps regardless of `gh` availability) |

**Missing dependencies with no fallback:**
- None — all missing items have a viable fallback.

**Missing dependencies with fallback:**
- pnpm → use npm (already the plan's recommendation above, given pnpm isn't installed locally)
- GitHub CLI → use GitHub web UI for the one-time repo-creation and Pages-source-toggle steps

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None currently (greenfield project, no test runner installed) |
| Config file | none — see Wave 0 |
| Quick run command | `npm run build` (runs `astro check` + `astro build`; fails loudly on broken Content Collections schema, invalid MDX, or Astro 7's stricter HTML parsing errors) |
| Full suite command | `npm run build` locally, plus a post-deploy live-URL smoke check: `npx linkinator https://gersonlopesr.github.io --recurse` (no install required, run via `npx`) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SETUP-01 | Astro+MDX+Tailwind project builds and auto-deploys on push | build/smoke | `npm run build` (local/pre-push check); live validation = GitHub Actions run status (`build` + `deploy` jobs both green) | ❌ Wave 0 — no `package.json` yet, created by scaffold task |
| SETUP-02 | Live URL reachable, no broken paths/404s | smoke (link check) | `npx linkinator https://gersonlopesr.github.io --recurse --skip "linkedin.com,github.com/gersonlopesr"` (skip external profile links prone to bot-blocking false positives) | ❌ Wave 0 — no deployed site yet until this phase's tasks run |
| SETUP-03 | Nav + footer with contact/profile links present on every page | manual / smoke | Manual: view-source or browser check confirming `<nav>`/`<footer>` markup and links present on `/` after deploy. Optional automated: `curl -s https://gersonlopesr.github.io | grep -o 'href="https://www.linkedin.com[^"]*"'` as a crude presence check | ❌ Wave 0 — depends on `BaseLayout.astro`/`Nav.astro`/`Footer.astro` existing |

### Sampling Rate

- **Per task commit:** `npm run build` (catches schema errors, invalid MDX/HTML, missing imports before pushing)
- **Per wave merge:** `npm run build` + push to `main` + verify the Actions workflow completes both jobs successfully
- **Phase gate:** Full suite (build green + live URL smoke check via `linkinator` + manual nav/footer/contact-link visual check on the actual deployed URL) before `/gsd:verify-work` — per PITFALLS.md's explicit warning, local build success is not sufficient; the live URL must be checked.

### Wave 0 Gaps

- [ ] `package.json` + Astro project scaffold — none of the above commands exist until the scaffold task runs (this **is** Wave 0 for this phase; there is no pre-existing test infrastructure to inherit since the project starts 100% from scratch per D-03).
- [ ] No dedicated test framework (Playwright/Vitest) installed — for this phase's scope (deploy pipeline + layout shell, no interactive logic), `npm run build` + `linkinator` + manual visual check is proportionate. If later phases (3+) need component-level testing, revisit adding Vitest/Playwright at that time — do not over-engineer test tooling in Phase 1 for a static-content site.

## Sources

### Primary (HIGH confidence)
- `npm view astro version/engines`, `npm view @astrojs/mdx version`, `npm view tailwindcss version`, `npm view @tailwindcss/vite version`, `npm view @astrojs/sitemap version` — live npm registry queries, 2026-07-03
- `curl https://api.github.com/repos/actions/checkout/releases/latest` → v7.0.0 — GitHub API, 2026-07-03
- `curl https://api.github.com/repos/withastro/action/releases/latest` → v6.1.1 — GitHub API, 2026-07-03
- `curl https://api.github.com/repos/actions/deploy-pages/releases/latest` → v5.0.0 — GitHub API, 2026-07-03
- https://docs.astro.build/en/guides/deploy/github/ — official Astro → GitHub Pages deployment guide (workflow YAML, site/base guidance)
- https://docs.astro.build/en/guides/content-collections/ — official Content Collections docs (`src/content.config.ts`, `glob()` loader, Zod schema, `getCollection`)
- https://docs.astro.build/en/reference/configuration-reference/ — official `site`/`base` config reference
- https://docs.astro.build/en/guides/styling/ — official Tailwind v4 + Astro setup (`astro add tailwind`, `@import "tailwindcss"`, layout import pattern)
- https://docs.astro.build/en/basics/layouts/ — official layout/slot pattern
- Local environment probes: `node --version`, `npm --version`, `pnpm --version`, `git --version`, `gh --version` — 2026-07-03

### Secondary (MEDIUM confidence)
- Astro 7 breaking-changes summary (stricter HTML parsing, `compressHTML: 'jsx'` default, Node >=22 floor, Satteri Markdown processor) — cross-referenced across multiple independent 2026 upgrade-notes articles (aerolaunch.app, ton-technotes.com, thecwlzone.com, happas.jp); not independently verified against the primary astro.build/blog changelog post directly in this pass — flagged as MEDIUM, recommend a quick primary-source check if any Astro 7 upgrade issue arises during execution.
- `npm create astro@latest` flag list (`--template`, `--install`/`--no-install`, `--git`/`--no-git`, `--yes`/`-y`, `--no`/`-n`, `--typescript`) — via WebSearch of `withastro/astro` GitHub README/issues, not independently re-run against a live `--help` output in this research pass (see Open Questions).

### Tertiary (LOW confidence)
- None retained as authoritative in this document — all LOW-confidence findings were either upgraded via verification or moved to Open Questions.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — every version number verified directly against the live npm registry and GitHub API, not training data.
- Architecture: HIGH — official Astro docs directly confirm layout/slot pattern, Content Collections file location, and config reference; translation from ARCHITECTURE.md's Jekyll examples is a direct 1:1 conceptual mapping (collection→collection, layout→layout, include→component).
- Pitfalls: HIGH (technical: repo naming, base config, Pages source toggle — verified against official docs) / MEDIUM (Astro 7 stricter-HTML-parsing specifics — cross-referenced secondary sources only).

**Research date:** 2026-07-03
**Valid until:** ~30 days (Astro/Tailwind ecosystem moves fast — re-verify exact package versions if planning is delayed past early August 2026; the architectural patterns and repo-naming/base guidance are stable and don't have a meaningful expiry).

---
*Phase: 01-foundation-deployment-pipeline*
*Researched: 2026-07-03*
