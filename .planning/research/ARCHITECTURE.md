# Architecture Research

**Domain:** Personal data science / data engineering portfolio site, statically hosted on GitHub Pages
**Researched:** 2026-07-03
**Confidence:** HIGH (GitHub Pages/Jekyll mechanics, deploy pipeline, custom domain) / MEDIUM (analytics vendor specifics, notebook-embedding conventions — verify current free-tier limits before committing)

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         SOURCE (repo, main branch)                   │
├───────────────────────────────────────────────────────────────────  │
│ ┌────────────┐ ┌───────────────┐ ┌──────────────┐ ┌───────────────┐ │
│ │ Content     │ │ Layouts/      │ │ Assets        │ │ Config/CI     │ │
│ │ (markdown,  │ │ Includes      │ │ (images, css, │ │ (_config.yml, │ │
│ │ front matter│ │ (templates,   │ │ js, resume,   │ │ .github/      │ │
│ │ per project)│ │ nav, footer)  │ │ notebook HTML)│ │ workflows/)   │ │
│ └──────┬─────┘ └──────┬────────┘ └──────┬────────┘ └──────┬────────┘ │
├────────┴───────────────┴─────────────────┴─────────────────┴────────┤
│                    BUILD (GitHub Actions runner)                     │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  Jekyll build (bundle exec jekyll build)                     │    │
│  │  → resolves collections, layouts, includes, plugins          │    │
│  │  → emits static HTML/CSS/JS into _site/                      │    │
│  └─────────────────────────────────────────────────────────────┘    │
├───────────────────────────────────────────────────────────────────  │
│                    ARTIFACT + DEPLOY                                 │
│  actions/upload-pages-artifact  →  actions/deploy-pages               │
├───────────────────────────────────────────────────────────────────  │
│                    SERVE (GitHub Pages CDN)                          │
│  username.github.io  (+ optional custom domain via CNAME/DNS)        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                           │
│  │ /         │  │/projects/│  │/projects/│  ...one URL per case     │
│  │ (About)   │  │ (index)  │  │ slug/    │      study               │
│  └──────────┘  └──────────┘  └──────────┘                           │
└───────────────────────────────────────────────────────────────────┘
                          │
                          ▼  (client-side, async, non-blocking)
              ┌───────────────────────────┐
              │ Privacy-friendly analytics │  (GoatCounter / Plausible)
              │ Search engines (sitemap.xml,│
              │ robots.txt, jekyll-seo-tag) │
              └───────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Content collection (`_projects`) | One markdown file per case study; front matter holds structured metadata (title, summary, stack, role, links, thumbnail) | Jekyll collection with `output: true` |
| Layouts (`_layouts/`) | Reusable page skeletons (default, project, page/CV) | Liquid templates, shared header/footer via includes |
| Includes (`_includes/`) | Repeated fragments: nav, footer, project card, head/meta, analytics snippet | Liquid partials |
| Assets (`/assets`) | Images, plots, compiled CSS, JS, resume PDF, optional notebook HTML exports | Static files, referenced by relative path from content |
| Build pipeline (`.github/workflows/`) | Turn source into deployable static output on every push to main | GitHub Actions: checkout → setup-ruby/bundler → jekyll build → upload-pages-artifact → deploy-pages |
| GitHub Pages hosting | Serve built static files over CDN, HTTPS, optional custom domain | Pages "Source: GitHub Actions" (Settings → Pages) |
| SEO layer | Meta tags, sitemap, robots, canonical URLs, Open Graph images | `jekyll-seo-tag` + `jekyll-sitemap` plugins, per-page front matter |
| Analytics | Anonymous, cookie-free visit counting; no backend needed | Third-party script tag (GoatCounter/Plausible) added to head include |
| External project repos | Full code, notebooks, README stay in their own GitHub repos; portfolio links out rather than duplicating | GitHub natively renders `.ipynb` — link directly instead of re-hosting |

## Recommended Project Structure

```
<username>.github.io/                 # User Pages repo — MUST use this exact name for root-domain hosting
├── .github/
│   └── workflows/
│       └── deploy.yml                # CI: build Jekyll site, deploy via Pages Actions
├── _config.yml                       # site config, plugin list, collection declaration
├── Gemfile / Gemfile.lock            # pins Jekyll + plugin versions (built via Actions, not GitHub's legacy auto-build)
├── _layouts/
│   ├── default.html                  # base HTML shell, includes head/nav/footer
│   ├── page.html                     # About / Experience / Contact
│   └── project.html                  # case study detail layout
├── _includes/
│   ├── head.html                     # meta tags, seo-tag, analytics snippet
│   ├── nav.html
│   ├── footer.html                   # links hub: LinkedIn, GitHub, Kaggle, email
│   └── project-card.html             # reusable card for listing page
├── _projects/                        # COLLECTION — one file per case study
│   ├── churn-prediction-model.md     # front matter: title, summary, stack[], role, repo_url, notebook_url, thumbnail
│   └── realtime-etl-pipeline.md
├── assets/
│   ├── css/
│   ├── js/
│   ├── images/
│   │   └── projects/
│   │       ├── churn-prediction-model/   # per-project image folder (charts, diagrams, screenshots)
│   │       └── realtime-etl-pipeline/
│   └── files/
│       └── resume.pdf
├── index.md                          # About / home (value proposition, hero)
├── projects.md                       # listing page — loops over site._projects collection
├── experience.md                     # CV-style summary
├── contact.md                        # contact + external profile links (may fold into footer instead of separate page)
├── 404.html
├── robots.txt
├── sitemap.xml                       # auto-generated by jekyll-sitemap, not hand-written
└── CNAME                             # only if/when a custom domain is added
```

### Structure Rationale

- **`_projects/` as a Jekyll collection, not a single page:** each case study gets its own URL (`/projects/<slug>/`), which is deep-linkable (shareable in a LinkedIn post, resume, or recruiter email), individually SEO-indexable, and keeps the listing page as pure metadata/summary rendering rather than a 3000-word wall of text. A single "Projects" page with in-page anchors was considered and rejected — it hurts SEO (one title/description for all projects) and makes sharing a specific case study clumsy.
- **`assets/images/projects/<slug>/`:** keeps plot/screenshot assets colocated by project, avoiding a flat images folder that becomes unmanageable past 5-6 projects.
- **`_includes/footer.html` for external links:** LinkedIn/Kaggle/GitHub/email links belong in a persistent site-wide element (footer or nav), not buried on a single Contact page, since the site's stated purpose is to be a "hub."
- **Repo name = `<username>.github.io`:** this is a User Pages repo, which serves at the domain root with no `baseurl` path prefix. A project-page repo (`username.github.io/reponame/`) requires setting `baseurl` in `_config.yml` and prefixing all internal links — an easy source of broken links/assets that is simply avoided by using the user-page convention for what is explicitly a personal brand site.
- **Gemfile + Actions-based build (not GitHub's legacy automatic Jekyll build):** building explicitly via GitHub Actions instead of relying on the "push and GitHub builds it for you" legacy path removes the Jekyll plugin whitelist restriction (only a small fixed set of plugins — `jekyll-seo-tag`, `jekyll-sitemap`, `jekyll-feed`, etc. — is permitted in the legacy build), pins exact Jekyll/Ruby versions so local `bundle exec jekyll serve` matches production exactly, and is the path GitHub itself now documents as the flexible/recommended option (also required if the site is ever built with a non-Jekyll tool).

## Architectural Patterns

### Pattern 1: Collection-per-content-type with shared layout

**What:** Each "type" of repeatable content (here: projects) is a Jekyll collection with its own layout, and front matter carries structured metadata that both the individual page and the listing page consume.
**When to use:** Whenever content is repeatable and needs both an index/summary view and a detail view (portfolio projects, but also would apply to a future blog).
**Trade-offs:** Requires learning Liquid front matter/looping syntax; in exchange, adding a new project is "add one markdown file," not "copy-paste and edit HTML."

**Example:**
```yaml
# _projects/churn-prediction-model.md
---
layout: project
title: "Customer Churn Prediction"
summary: "Gradient-boosted model reducing churn-detection lag from weeks to days."
stack: [Python, XGBoost, Airflow, PostgreSQL]
role: "Data Scientist"
repo_url: "https://github.com/<user>/churn-prediction"
notebook_url: "https://github.com/<user>/churn-prediction/blob/main/analysis.ipynb"
thumbnail: /assets/images/projects/churn-prediction-model/thumb.png
order: 1
---
## Problem
...
## Approach
...
## Impact
...
```
```liquid
{% raw %}
<!-- projects.md listing page -->
{% for project in site.projects | sort: 'order' %}
  {% include project-card.html project=project %}
{% endfor %}
{% endraw %}
```

### Pattern 2: Link-out for deep artifacts, embed only curated highlights

**What:** Full Jupyter notebooks, raw datasets, and complete pipeline code stay in their own GitHub repos (which already render `.ipynb` natively in the GitHub UI). The portfolio case study page contains a curated narrative (problem/approach/impact) plus a handful of exported chart images (PNG/SVG from matplotlib/plotly), with a clearly labeled "View full notebook on GitHub" / "View source repo" outbound link.
**When to use:** Always, for this domain — it is the default recommended pattern for data science portfolios rather than an edge case.
**Trade-offs:** Requires manually exporting 2-4 key plots per project as static images (one extra step after analysis), but avoids bloating page weight with a full nbconvert HTML dump (which brings its own CSS/JS that clashes with site styling, is not responsive/mobile-friendly, and is poor for SEO since search engines index the curated markdown page, not a giant notebook export).

### Pattern 3: CI-driven build/deploy, never commit build output

**What:** The `_site/` build output (and any `node_modules`/vendor bundle directories) is never committed. `.github/workflows/deploy.yml` triggers on push to `main`, runs `bundle exec jekyll build`, uploads via `actions/upload-pages-artifact`, and publishes via `actions/deploy-pages`.
**When to use:** Always — this is the current GitHub-recommended pattern (Settings → Pages → Source: "GitHub Actions") and works identically regardless of which static site generator is chosen later.
**Trade-offs:** None significant for a project this size; adds a few seconds of CI time per push in exchange for reproducible builds and freedom from the legacy plugin whitelist.

**Example:**
```yaml
# .github/workflows/deploy.yml
name: Deploy Pages
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
      - uses: actions/checkout@v4
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.3'
          bundler-cache: true
      - uses: actions/configure-pages@v5
      - run: bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"
      - uses: actions/upload-pages-artifact@v3
        with:
          path: "_site"
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Data Flow

### Content Publish Flow

```
Author edits/adds markdown (project case study, About, Experience)
    ↓
Author adds/updates images in assets/images/projects/<slug>/  (exported from notebook/analysis beforehand)
    ↓
git push to main
    ↓
GitHub Actions: checkout → bundle install → jekyll build
    ↓ (Liquid resolves layouts + includes + front matter, collections render both index and detail pages)
_site/ (plain HTML/CSS/JS, sitemap.xml, robots.txt already baked in via plugins)
    ↓
actions/upload-pages-artifact → actions/deploy-pages
    ↓
GitHub Pages CDN serves at https://<username>.github.io (or custom domain via CNAME + DNS)
    ↓
Visitor's browser loads page → analytics script (GoatCounter/Plausible) fires a lightweight, cookie-free pageview beacon
```

### Key Data Flows

1. **Case study authoring → publication:** markdown + front matter + local image files are the single source of truth; nothing is generated or fetched at request time (fully static, no server-side code possible on GitHub Pages).
2. **Notebook/deep-detail linkage:** the *analysis* lives in the project's own GitHub repo; the *portfolio* only stores a curated summary + link. This keeps the portfolio repo small and fast to build regardless of how large or numerous the underlying notebooks are.
3. **SEO metadata generation:** `jekyll-seo-tag` reads front matter (title, description, image) per page at build time and emits `<meta>`/Open Graph/Twitter Card tags; `jekyll-sitemap` walks all rendered pages at build time to emit `sitemap.xml`. Both are build-time, zero-runtime-cost.
4. **Analytics:** a small async `<script>` tag in `_includes/head.html` sends a beacon to the analytics vendor's endpoint on page load; no cookies, no consent banner needed with GoatCounter/Plausible-class tools, and no impact on Jekyll build or Pages hosting.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| ~5-15 projects (expected v1 scope) | Everything above is sufficient as-is; Jekyll build time is sub-second to a few seconds. |
| 15-50 projects / added blog (v2) | Still fine as a single Jekyll site; introduce tags/categories on collections for filtering, paginate the listing page (`jekyll-paginate-v2`, an Actions-build-only plugin since it's not in the legacy whitelist). |
| Site outgrows Jekyll's templating needs (heavy interactivity, search, filtering UI) | Migrate to a JS-based static site generator (Astro/Next static export/Eleventy) — the GitHub Actions deploy pipeline (`upload-pages-artifact` + `deploy-pages`) is generator-agnostic, so this migration does not require changing the hosting/deploy architecture, only the build step. |

### Scaling Priorities

1. **First "bottleneck" (not a technical one):** content freshness/maintenance — the real risk at this scale is not build performance but the author not keeping case studies updated. Architecture should optimize for "adding one project = one markdown file + one image folder," which it does.
2. **Second consideration:** if a blog is added later (explicitly out of scope for v1 per PROJECT.md), it should be a second Jekyll collection (`_posts` is built-in) reusing the same layout/include infrastructure — no architectural rework needed, just an additive collection.

## Anti-Patterns

### Anti-Pattern 1: Single monolithic "Projects" page with all case studies inline

**What people do:** Put all project write-ups as sections/anchors on one long page to "keep it simple."
**Why it's wrong:** No per-project SEO (one title/description for everything), no clean shareable URL per project, page becomes very long and slow to scan, and any future filtering/tagging becomes a rewrite instead of an additive change.
**Instead:** Use a Jekyll collection (`_projects/`) — one file per case study, each rendered at its own URL, with a lightweight listing/index page.

### Anti-Pattern 2: Embedding full nbconvert HTML notebook exports directly in the site

**What people do:** Run `jupyter nbconvert --to html` and drop the full output (code cells, execution counts, notebook CSS) directly into the case study page or as an iframe.
**Why it's wrong:** Notebook HTML brings its own stylesheet/JS that visually clashes with the site theme, is usually not mobile-responsive, bloats page weight, and buries the "why/impact" narrative under raw code cells — hurting the core value stated in PROJECT.md (communicating reasoning and impact, not just code).
**Instead:** Write a curated markdown narrative per case study (problem → approach → impact) with 2-4 exported chart images, and link out to the full notebook/repo on GitHub for readers who want the complete detail.

### Anti-Pattern 3: Relying on GitHub's legacy automatic Jekyll build instead of a GitHub Actions workflow

**What people do:** Just push to `main` and let GitHub auto-detect and build Jekyll (Settings → Pages → Source: "Deploy from a branch").
**Why it's wrong:** Locks the site to the small GitHub Pages plugin whitelist, makes local `jekyll serve` version drift from production a common source of "works locally, breaks live" bugs, and blocks any future switch to a non-Jekyll generator without changing the whole hosting setup.
**Instead:** Use Settings → Pages → Source: "GitHub Actions" with an explicit workflow (build step is swappable later without touching the deploy mechanism).

### Anti-Pattern 4: Treating `username.github.io` as a project-page repo (wrong repo naming / baseurl handling)

**What people do:** Name the repo something other than `<username>.github.io`, or set a non-empty `baseurl` for what is meant to be the root personal site.
**Why it's wrong:** Produces a site living at `username.github.io/reponame/`, which breaks unless every internal link/asset path correctly prepends the baseurl — a frequent source of "CSS/images don't load" bugs, and is a worse URL for a personal brand/CV site than the clean root domain.
**Instead:** Name the repo exactly `<username>.github.io` (User Pages), leave `baseurl` empty, and add a custom domain via `CNAME` file + DNS only if/when desired — the root-domain behavior does not change either way.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| GitHub Pages | Settings → Pages → Source: GitHub Actions; auto-provisions HTTPS cert for both default `github.io` domain and any custom domain once DNS is verified | No server-side code possible — confirm any feature idea is achievable as static HTML/CSS/JS |
| Custom domain (optional) | Add `CNAME` file to repo root with the domain, configure DNS: apex domain → A/ALIAS/ANAME records pointing at GitHub's IPs, `www` subdomain → CNAME record pointing at `<username>.github.io`; GitHub auto-redirects apex↔www once both are configured | Apex domains cannot use a CNAME record at the DNS level — this is a DNS protocol constraint, not a GitHub limitation |
| Analytics (GoatCounter or Plausible) | Add vendor's async `<script>` tag to `_includes/head.html`; GoatCounter offers a free hosted tier with no account-verification friction and explicitly supports `github.io` domains; Plausible has a paid hosted tier (or self-host) | Both are cookie-free/no-consent-banner-required, matching a portfolio site's need for simplicity; verify current free-tier limits before final selection (verify at implementation time, not assumed here) |
| jekyll-seo-tag / jekyll-sitemap | Add to `Gemfile` + `_config.yml` plugins list; both are safe under Actions-based build (and also whitelisted under the legacy build, so no lock-in either way) | Front matter (`title`, `description`, per-project `thumbnail`/image) drives the generated meta tags — populate front matter consistently across all content |
| Project source repos (GitHub) | Plain outbound `<a href>` links from each case study to the project's own repo/notebook | GitHub natively renders `.ipynb` files — no conversion needed for this link-out pattern |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Content (`_projects/*.md`) ↔ Layouts/Includes | Front matter variables consumed via Liquid (`page.title`, `project.stack`, etc.) | Keep front matter schema consistent across all project files so the listing page and card include can loop generically |
| Build (Actions) ↔ Hosting (Pages) | `upload-pages-artifact` → `deploy-pages`, connected only via the Pages "environment" GitHub sets up | Generator-agnostic boundary — swapping Jekyll for another SSG later only changes the build job's internal steps |
| Site ↔ Analytics vendor | One-way, client-side, fire-and-forget script tag | No dependency in the build pipeline; analytics can be added/removed/swapped without touching content or build |
| Site ↔ External project repos | One-way outbound links only | Portfolio never pulls/embeds live data from those repos at build or runtime — keeps the build fully static and independent of other repos' state |

## Sources

- [Configuring a publishing source for your GitHub Pages site — GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Using custom workflows with GitHub Pages — GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [actions/deploy-pages — GitHub](https://github.com/actions/deploy-pages)
- [Managing a custom domain for your GitHub Pages site — GitHub Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [About custom domains and GitHub Pages — GitHub Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
- [jekyll/jekyll-sitemap — GitHub](https://github.com/jekyll/jekyll-sitemap)
- [Jekyll Collections — official docs](https://jekyllrb.com/docs/collections/)
- [About GitHub Pages and Jekyll — GitHub Docs (plugin whitelist)](https://help.github.com/articles/adding-jekyll-plugins-to-a-github-pages-site)
- [GoatCounter — open source, privacy-friendly analytics](https://github.com/arp242/goatcounter)
- [Plausible Analytics — privacy-first web analytics](https://github.com/plausible/analytics)
- [Create a Minimalism GitHub Page for Your Data Science Portfolio — Chris Tran (worked example of Jekyll-based DS portfolio)](https://chriskhanhtran.github.io/_posts/2020-01-13-portfolio-tutorial/)

---
*Architecture research for: Personal data science/data engineering portfolio on GitHub Pages*
*Researched: 2026-07-03*
