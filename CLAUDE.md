<!-- GSD:project-start source:PROJECT.md -->
## Project

**Portfólio — Cientista de Dados & Engenheiro de Dados**

Um site de portfólio pessoal, hospedado no GitHub Pages, para um profissional pleno (2-5 anos de experiência) que atua de forma híbrida como Cientista de Dados e Engenheiro de Dados. O site existe para construir autoridade e visibilidade no mercado — mostrando projetos reais (mix de DS e DE) através de case studies bem documentados, funcionando também como hub que conecta a outros perfis profissionais (LinkedIn, Kaggle, etc.).

**Core Value:** Os case studies de projetos precisam comunicar claramente a capacidade técnica e o raciocínio por trás das decisões — não apenas "o que foi feito", mas "por que" e "qual foi o impacto". Se isso falhar, o portfólio não cumpre seu objetivo de vender as capacidades do profissional.

### Constraints

- **Hospedagem**: GitHub Pages — decisão já tomada pelo usuário, implica site estático (sem backend dinâmico)
- **Stack técnica**: Astro 6 + MDX + Tailwind CSS v4, deploy via GitHub Actions (`withastro/action`) — escolhido pela pesquisa por permitir case studies tipados (Content Collections) e melhor polimento visual. **Assunção do Claude (usuário não respondeu), fácil de trocar por Jekyll se preferir menos complexidade de build.**
- **Idioma**: Inglês — escolhido por padrão para maximizar alcance internacional, alinhado com o objetivo de "se mostrar para o mundo". **Assunção do Claude, não confirmada pelo usuário — fácil de revisitar/trocar para PT ou bilíngue.**
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack
### Core Technologies
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **Astro** | 6.x (current stable, requires Node ≥22) | Static site generator / framework | Ships zero JS by default ("islands architecture") — pages are just HTML/CSS unless a component explicitly needs interactivity. That's exactly the profile of a portfolio: mostly text + images + charts, with occasional interactive widgets. Content Collections (built-in, Zod-typed frontmatter) map perfectly onto "one case study = one file" — add a new project by writing a Markdown/MDX file, no code changes. Official first-party GitHub Pages deploy action (`withastro/action`) makes CI trivial. HIGH confidence (verified via astro.build changelogs and official docs, July 2026). |
| **Node.js** | 22 LTS or 24 | Build-time runtime (GitHub Actions only — not shipped to users) | Astro 6 dropped Node 18/20 support and requires Node ≥22. Only used to build the site in CI; the deployed artifact is static HTML/CSS/JS, so this has zero hosting implications. HIGH confidence. |
| **Tailwind CSS** | 4.3 (via `@tailwindcss/vite` plugin) | Styling | CSS-first config (`@theme` in CSS, no `tailwind.config.js` needed), builds are dramatically faster than v3, and utility classes let a solo maintainer restyle components without touching a separate stylesheet architecture. Note: the old `@astrojs/tailwind` integration only supports Tailwind v3 — for v4 you must use the official Vite plugin (`npx astro add tailwind` now wires this up automatically as of Astro 5.2+). HIGH confidence. |
| **MDX** (`@astrojs/mdx`) | latest, matched to Astro 6 | Case-study content authoring | Case studies need more than plain prose — embedding a chart component, a callout box, or a "tech stack used" badge list inline with Markdown. MDX lets the user (or future you) drop a `<Chart />` or `<TechBadges />` component directly into a case-study `.mdx` file while still writing 95% plain Markdown. HIGH confidence. |
| **pnpm** | 9.x / 10.x (current) | Package manager | Faster installs, disk-efficient (single content-addressable store), and `withastro/action` auto-detects the lockfile (`pnpm-lock.yaml`) with zero extra config. Any of npm/yarn/pnpm work — pnpm is the modern default recommendation for new Node projects. MEDIUM confidence (best-practice convention, not a hard requirement). |
### Supporting Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Astro Content Collections + Zod (built into Astro core) | bundled | Type-safe schema for `projects/*.md` (title, stack, role, impact, links) | Always — this is how the "Projects" and case study pages should be modeled from day one. Prevents malformed frontmatter from silently breaking a page. |
| `astro:assets` + Sharp (built into Astro core) | bundled | Automatic image optimization (resizing, WebP/AVIF, lazy loading) | Always for screenshots, architecture diagrams, project thumbnails — avoids hand-optimizing images and keeps the 1GB GitHub Pages size limit and page-weight low. |
| Matplotlib / Seaborn / Plotly (Python, offline, author-time only) | current | Generate static PNG/SVG charts and export interactive HTML fragments from the *existing* analysis notebooks | Default choice for embedding data viz. Export once at authoring time (`fig.write_html("chart.html", include_plotlyjs="cdn", full_html=False)` or `plt.savefig(...)`) and commit the output — no client-side data processing needed, keeps the site static and fast. |
| Vega-Lite / `vega-embed` (npm, loaded client-side only where used) | current (vega-embed 6.x) | Truly interactive charts (filterable/zoomable) embedded as an Astro island | Use only for the 1-2 "flagship" case studies where interactivity adds real value (e.g., an interactive dashboard demo) — not for every chart, to keep JS payload minimal and preserve Astro's zero-JS default. |
| Quarto CLI (author-time tool, not an npm package) | 1.7.x (current) | Render an existing Jupyter/R notebook to a clean, styled static HTML page (code + output + narrative) | When a case study *is* a notebook-driven analysis and you want to show the executed code alongside the plots (not just the plots). Render with `quarto render analysis.ipynb --to html` and embed the result via `<iframe>` or copy the rendered HTML body into an MDX page. See "Stack Patterns by Variant" below for the alternative of running the whole site in Quarto instead. |
| `astro-icon` or `lucide-astro` | current | Icon set (tech stack badges, social links) | Always — cheap, tree-shaken, zero runtime JS. |
| `@astrojs/sitemap` + `@astrojs/rss` | bundled Astro integrations | SEO sitemap now; RSS ready for the v2 blog | Add sitemap now (near-zero cost); add RSS when the blog ships in v2. |
| Formspree (external hosted service, no package) | free tier: 50 submissions/month per form | Contact form backend | Required — GitHub Pages cannot run server code, so any "Contact me" form needs a third-party form-processing endpoint. Point the form's `action` at the Formspree endpoint; no JS needed for the basic case. Alternative: a plain `mailto:` link if a form feels like overkill for a portfolio. |
| GoatCounter or Plausible (script tag, hosted service) | current | Privacy-friendly, cookie-free visit analytics | Optional but recommended for a "build authority" goal — lets the user see which case studies get traction. Both work by dropping a `<script>` tag; no backend needed on the GitHub Pages side. |
### Development Tools
| Tool | Purpose | Notes |
|------|---------|-------|
| GitHub Actions — `withastro/action` | Build + deploy to GitHub Pages | Official, maintained by the Astro team. Reads `astro.config.mjs`, auto-detects package manager via lockfile, deploys via `actions/deploy-pages`. Using a custom Actions workflow (rather than GitHub's native Jekyll auto-build) also removes the 10-builds/hour soft limit and the 10-minute build timeout is per-run, not a concern at this site's scale. |
| Prettier + `prettier-plugin-astro` | Code formatting | Keeps `.astro`/`.mdx` files consistently formatted for a solo maintainer returning to the repo months later. |
| VS Code + official Astro extension | Editor tooling | Syntax highlighting, type-checking (`astro check`) for `.astro` files and Content Collections schemas. |
| Lighthouse / PageSpeed Insights | Periodic performance/SEO audit | Run manually before major releases — Astro's static output should score 95+ out of the box; use this to catch regressions if heavier JS (Vega-Lite islands) creep in. |
## Installation
# Scaffold (creates Astro 6 project with TypeScript, MDX prompts included)
# Add integrations
# Supporting libraries
# Dev dependencies
# Optional: render a Jupyter/R case-study notebook to static HTML (author-time, not part of the JS build)
## Alternatives Considered
| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Astro + MDX + Tailwind | **Quarto** (as the entire site, not just per-notebook rendering) | If the user strongly prefers authoring everything as `.qmd`/`.ipynb` files in Python/R and wants near-zero front-end/JS involvement. Quarto has first-class GitHub Pages publishing (`quarto publish gh-pages` or a GH Action) and renders executed notebooks (code + plots + prose) natively — genuinely the best tool if case studies *are* notebooks. Trade-off: less polished/product-like visual design out of the box, and less flexible for a distinct "About / hero / contact" marketing-style front page — Quarto websites read more like technical reports than a personal brand site. |
| Astro + MDX + Tailwind | **Hugo** (e.g. with a theme like `hugo-profile`) | If build speed at very large page counts is a real concern (not the case here — a portfolio has ~10-40 pages) or the user is already fluent in Go templates. Hugo is faster to build but has no islands architecture, so embedding an interactive chart means hand-rolling `<script>` tags in a shortcode rather than using a typed component — more friction for the interactive-viz use case this project needs. |
| Astro + MDX + Tailwind | **Jekyll** (native GitHub Pages build, no Actions/Node needed at all) | If the user wants the absolute lowest setup friction — GitHub Pages builds Jekyll sites automatically from `main`/`docs`, no CI configuration, no Node toolchain to install locally. Reasonable fallback path if Node/Astro tooling ever becomes a maintenance burden. Trade-off: GitHub's native Jekyll build only allows a fixed allow-list of plugins, Liquid templating is less ergonomic than MDX for embedding components, and the Ruby ecosystem is in slow decline (fewer actively maintained themes each year). |
| Astro + MDX + Tailwind | **Next.js (static export, `output: 'export'`)** | Only if there's a concrete plan to eventually need SSR, API routes, or a backend — none of which GitHub Pages can run anyway. For a purely static content site, Next.js ships the full React runtime for no functional benefit over Astro's islands, meaning larger JS bundles and slower page loads with nothing gained. Not recommended for this project. |
| Static PNG/SVG charts + selective Vega-Lite islands | **Full client-side notebook runtimes (JupyterLite, Binder embeds)** | Only if the goal is to let visitors *edit and re-run* code live in the browser (a genuinely different product goal than "showcase a finished case study"). For a portfolio, this adds multi-second cold-start WASM loads and megabytes of payload for a feature almost no recruiter/hiring manager will use. Pre-rendered static exports (Quarto/nbconvert/Plotly HTML) achieve the "show the work" goal at a fraction of the cost. |
## What NOT to Use
| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Next.js with SSR, ISR, middleware, or the App Router's server actions | These all require a Node server process at request time — GitHub Pages only serves static files, so any of these features simply will not work when deployed. | Astro (static output) or Next.js strictly in `output: 'export'` mode if React is a hard requirement — but see the alternatives table above for why Astro is still preferred. |
| **Docsy** (Hugo theme) | Docsy is purpose-built for large, versioned, multi-page *technical documentation* sites (the Kubernetes docs style: sidebar tree nav, version switcher, doc-search). A personal portfolio has a completely different content model (hero/about/projects/contact) — forcing Docsy into that shape means fighting the theme's structure the entire time. | Astro with a simple custom layout, or a portfolio-specific Hugo theme (`hugo-profile`) if Hugo is chosen instead. |
| **academicpages** / **al-folio** (Jekyll academic themes) as-is | Both are explicitly designed around academic career artifacts — publications list, talks, teaching, CV generated from BibTeX/YAML — not industry project case studies. Using them unmodified signals "PhD candidate" rather than "hybrid DS/DE practitioner selling project impact," which works against this project's stated goal (Core Value: communicate technical capability + business impact for a pleno-level industry professional). | If Jekyll's zero-toolchain native GitHub Pages build is still wanted, start from a minimal/blank Jekyll theme and build the case-study layout from scratch rather than reskinning an academic CV template. |
| A CMS or server-rendered backend (WordPress, Ghost, Django admin, etc.) | Needs PHP/Node/Python running server-side plus a database — fundamentally incompatible with GitHub Pages, which only serves static files. Already excluded by the project's own constraints (Out of Scope: "CMS ou painel administrativo"). | Markdown/MDX files in the Astro Content Collection, edited directly in the repo — this *is* the "flat-file CMS" for a solo maintainer. |
| Heavy client component libraries (Material UI, Ant Design, Chakra, full Bootstrap JS bundle) | These assume a React/Vue SPA context and ship large JS runtimes for widgets (modals, dropdowns) a portfolio rarely needs — directly undermines Astro's zero-JS-by-default performance advantage, which matters for a site whose job is to make a strong, fast first impression. | Tailwind CSS utility classes + a handful of hand-written Astro components (few need any client-side JS at all). |
| Committing raw, un-exported `.ipynb` files and expecting GitHub Pages to render them nicely | GitHub Pages does not execute or specially render notebooks — an unconverted `.ipynb` served as a static asset just downloads or shows raw JSON, not a readable page. | Export via `nbconvert --to html --embed-images` or `quarto render` at authoring time, and commit/embed the resulting HTML/assets, not the raw notebook. |
## Stack Patterns by Variant
- Use **Astro 6 + MDX + Tailwind v4** as the whole site.
- Because it gives the best balance of "product-like" polish, fast static output, typed content collections for maintainability, and first-party GitHub Actions deployment — the strongest fit for an industry-facing (not academic) hybrid DS/DE portfolio.
- Use **Quarto** as the full site generator (`quarto create-project website`), publishing via `quarto publish gh-pages` or a Quarto GitHub Action.
- Because Quarto natively executes and renders `.ipynb`/`.qmd` notebooks (code + output + prose) into a website without any separate "export then embed" step — the most direct path when the source of truth is a notebook, at the cost of a more report-like visual style than a hand-styled Astro site.
- Use **Jekyll**, relying on GitHub Pages' native built-in Jekyll build (push to `main`, no Actions workflow required).
- Because GitHub Pages will build and deploy Jekyll sites automatically with zero configuration — the lowest-friction path — but accept the trade-offs of a more limited plugin allow-list and less flexible templating versus Astro/MDX.
- If on Astro: add a `blog` Content Collection alongside `projects`, reuse the same MDX pipeline, and add `@astrojs/rss`.
- If on Quarto: Quarto's `listing` pages handle a blog index natively with no extra tooling.
## Version Compatibility
| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| `astro@6.x` | `node >=22` | Astro 6 (March 2026) dropped Node 18/20 support; GitHub Actions runners default to a recent Node LTS, but pin the version explicitly in the workflow (`actions/setup-node@v4` with `node-version: 22`) to avoid drift. |
| `@tailwindcss/vite@4.x` | `astro@6.x` (Vite 7 under the hood) | Use the Vite plugin, **not** `@astrojs/tailwind` — that integration only supports Tailwind v3 and will fail or silently misbehave against v4. `npx astro add tailwind` now installs the correct v4 setup automatically. |
| `@astrojs/mdx` | `astro@6.x` | Install via `astro add mdx` to guarantee matching versions; mismatched MDX/Astro versions are a common source of build errors after upgrades. |
| `withastro/action@v3` (or latest tag) | any Astro version | Auto-detects package manager from lockfile; defaults to Node 24 internally for the action's own environment, independent of the Node version your `astro.config` targets — no conflict in practice, but worth knowing if debugging CI Node-version mismatches. |
| `vega-embed@6.x` | `vega-lite@5.x`, `vega@5.x` | Only relevant if the interactive-chart-island pattern is used; keep these three in lockstep per the official Vega-Lite compatibility table when upgrading. |
## Sources
- https://docs.astro.build/en/guides/deploy/github/ — official Astro → GitHub Pages deployment guide (HIGH confidence, official docs)
- https://astro.build/blog/astro-6/ — Astro 6 release notes, Node ≥22 requirement (HIGH confidence, official)
- https://astro.build/blog/whats-new-june-2026/ , https://astro.build/blog/whats-new-march-2026/ , https://astro.build/blog/whats-new-may-2026/ — recent Astro changelogs confirming v6/v7 status as of mid-2026 (HIGH confidence, official)
- https://github.com/withastro/action — official GitHub Action for Astro→Pages deploys (HIGH confidence, official repo)
- https://tailwindcss.com/docs/installation/framework-guides/astro — official Tailwind+Astro v4 setup guide (HIGH confidence, official docs)
- https://tailwindcss.com/blog/tailwindcss-v4 , InfoQ Tailwind 4.2 coverage — version/feature confirmation (HIGH/MEDIUM confidence)
- https://quarto.org/docs/publishing/github-pages.html , https://quarto.org/docs/websites/ — official Quarto GitHub Pages publishing docs (HIGH confidence, official)
- https://academicpages.github.io/ , https://github.com/academicpages/academicpages.github.io , https://github.com/alshedivat/al-folio — academic portfolio template ecosystem, confirming academic-career-artifact focus (MEDIUM confidence, primary source repos)
- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits — official GitHub Pages limits (1GB site size, 100GB/month bandwidth soft limit, 10 builds/hour soft limit lifted when using custom Actions workflows, 10-minute build timeout) (HIGH confidence, official docs)
- WebSearch aggregation on static site generator comparisons (thesoftwarescout.com, hygraph.com, talos.tools) — cross-referenced for Astro/Hugo/Next.js positioning in 2026 (MEDIUM confidence, multiple independent sources agreeing)
- WebSearch on Formspree/static form services (un-static.com, staticforms.dev) — confirmed viable no-backend contact form pattern (MEDIUM confidence)
- WebSearch on Plotly/Vega-Lite/Observable Plot static embedding (matteoguzzo.com, geeksforgeeks.org, vega-embed GitHub repo) — confirmed static-export and client-embed patterns for interactive charts (MEDIUM confidence)
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
