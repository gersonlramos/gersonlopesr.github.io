# Project Research Summary

**Project:** Portfolio - Cientista de Dados & Engenheiro de Dados
**Domain:** Personal portfolio website (hybrid Data Scientist / Data Engineer, pleno-level), static site hosted on GitHub Pages
**Researched:** 2026-07-03
**Confidence:** HIGH (stack, architecture mechanics), MEDIUM-HIGH (features, pitfalls)

## Executive Summary

This is a static, content-driven personal brand site whose entire value proposition rests on writing quality, not technical sophistication. Experts build this class of site as a static-site-generator project with one file per case study (a "collection" pattern), a locked-down narrative template enforced across every project, and a link-out strategy to external artifacts (GitHub repos, notebooks, hosted demos) rather than embedding heavy content in-repo. The technical bar is low - GitHub Pages, a static generator, and CI-based deploy are all extremely well-documented, low-risk territory. The real risk is entirely on the content side: recruiters scan for seconds, and the single most-cited failure mode across all research sources is a portfolio that reads as a list of tutorial notebooks with no business reasoning or impact framing.

The recommended approach is Astro 6 + MDX + Tailwind CSS v4, deployed via GitHub Actions (withastro/action) to a User Pages repo (username.github.io). Content lives in an Astro Content Collection (projects/*.md or .mdx, Zod-typed frontmatter) - one file per case study, each rendered at its own deep-linkable URL. Charts/diagrams are pre-exported static images (Matplotlib/Plotly/Quarto, authored offline) rather than embedded live notebooks, keeping the site fast and zero-JS by default except for the rare interactive-chart island. This stack was chosen over Jekyll, Hugo, Quarto-as-site, and Next.js because it best balances "product-like" polish with typed, maintainable content authoring and a first-party GitHub Pages deploy path - but Jekyll remains a legitimate lower-friction fallback if Node tooling becomes a maintenance burden.

The key risks are almost entirely non-technical: (1) case studies that describe code instead of business reasoning/impact, (2) a generic "About" section with no distinct positioning for the hybrid DS+DE identity, and (3) content going stale post-launch. These are mitigated by enforcing a mandatory problem-approach-impact case-study template from the start (a content decision made before any project is written up, not retrofitted), and by treating "last updated"/link-hygiene as an explicit ongoing practice rather than a one-time build task. The few genuine technical risks - baseurl/path misconfiguration, silent Jekyll-style build failures, custom-domain HTTPS provisioning delays - are avoidable by using a GitHub Actions-based build/deploy pipeline from day one and following the documented User Pages repo-naming convention.

## Key Findings

### Recommended Stack

Astro 6 (Node 22+ at build time only) is the core framework, paired with @astrojs/mdx for rich case-study authoring and Tailwind CSS v4 (via the official Vite plugin, not the legacy @astrojs/tailwind integration) for styling. Astro's Content Collections with Zod schemas give typed, validated frontmatter for projects (title, stack, role, impact, links), and astro:assets + Sharp handle automatic image optimization out of the box - directly addressing the "unoptimized images" pitfall. Charts are pre-rendered offline (Matplotlib/Seaborn/Plotly/Quarto) and committed as static images/HTML fragments; Vega-Lite/vega-embed is reserved for at most 1-2 flagship interactive charts to preserve Astro's zero-JS-by-default performance profile. Deployment uses the official withastro/action GitHub Action; Formspree (or a plain mailto link) covers the contact form since GitHub Pages cannot run server code.

**Core technologies:**
- Astro 6 + MDX: static site generator with islands architecture - ships zero JS by default, ideal for a mostly-text-and-images portfolio with rare interactive widgets
- Tailwind CSS v4 (Vite plugin): utility-first styling, fast builds, no separate config file needed
- Astro Content Collections (Zod): typed, validated per-project frontmatter - "add a project" = "add one markdown file"
- GitHub Actions (withastro/action): official CI/CD to GitHub Pages, removes legacy Jekyll plugin whitelist and build-minute limits

### Expected Features

**Must have (table stakes):** About/value-proposition section, projects gallery, individual case-study pages, experience/CV summary, contact + external profile links (LinkedIn/GitHub/Kaggle), responsive layout, working links, visible tech-stack tags per project, an active/real GitHub link. All of these are already captured in PROJECT.md's Active Requirements.

**Should have (competitive differentiators):** Business-impact framing in every case study ("reduced X by Y%") - the single highest-ROI item, since it's pure writing effort, not a technical feature; end-to-end problem-approach-impact narrative; architecture diagrams for DE projects (static image, no interactivity needed); one externally-hosted interactive demo/dashboard link for a flagship project (Streamlit Community Cloud / HF Spaces, since GitHub Pages can't host a backend); quantified scale details for DE work (volume, frequency, latency, cost); resume/CV PDF download; GitHub activity badge/link-out.

**Defer (v2+):** Technical blog/writing (already correctly excluded from v1 per PROJECT.md, despite being one of the most-cited high-value differentiators in research - flagged as a strong v2 priority), video walkthroughs of flagship projects, additional embedded dashboards beyond one flagship.

### Architecture Approach

The recommended architecture is a collection-per-content-type pattern: each project case study is one file in a projects content collection, rendered at its own deep-linkable URL (/projects/slug/) via a shared layout, with a lightweight listing/gallery page consuming the same frontmatter. Full notebooks, raw datasets, and pipeline code stay in their own external GitHub repos (which natively render .ipynb); the portfolio embeds only a curated narrative plus 2-4 exported chart images, with a clear "View full notebook on GitHub" outbound link. The build/deploy pipeline is CI-driven (GitHub Actions: build to upload-pages-artifact to deploy-pages), never committing build output, which keeps the deployment mechanism swappable regardless of which generator is used underneath.

Note on source material: the ARCHITECTURE.md research was conducted using Jekyll as the reference implementation (collections, Liquid includes, _config.yml), while STACK.md independently recommends Astro as the primary technology. The architectural patterns (collection-per-project, link-out over embed, CI-driven deploy, User Pages repo-naming, avoid hardcoded baseurl paths) are generator-agnostic and apply directly to Astro - but the concrete file/folder structure and code examples in ARCHITECTURE.md will need translation to Astro's Content Collections + .astro/.mdx conventions during planning. This is flagged as a gap below.

**Major components:**
1. Content collection (projects/) - one file per case study; Zod-validated frontmatter (title, summary, stack, role, links, thumbnail)
2. Layouts/components - shared page shell, project detail layout, reusable project-card component for the gallery
3. Assets (assets/images/projects/slug/) - optimized, colocated per-project images/diagrams; resume PDF
4. CI/CD (.github/workflows/) - Astro build via withastro/action, deployed via actions/deploy-pages
5. External integration layer - outbound links to GitHub repos/notebooks, optional analytics script tag (GoatCounter/Plausible), Formspree contact endpoint

### Critical Pitfalls

1. Portfolio reads as a list of tutorials, not real work - enforce a mandatory case-study template (problem-approach-impact) for every project from the start; never publish a bare notebook/repo link as a "case study."
2. Generic/no personal narrative - the About/hero section must state a distinct hybrid DS+DE positioning ("builds the pipeline and the model that runs on it"), not a generic skills-list bio; decide this narrative before writing individual case studies, since it should inform which projects get featured.
3. Write-ups describe code, not business reasoning - every case study must explicitly state the "why" behind decisions and end with impact/outcome, never a bare metric (accuracy/F1/RMSE) with no business translation.
4. Jekyll/Astro baseurl or path misconfiguration breaks the deployed site - confirm the repo is a User Pages repo (username.github.io, empty base path); use framework-native URL helpers consistently; always verify the actual deployed Pages URL, not just local dev server output, before considering a phase "done."
5. Unoptimized images / raw notebook embeds cause slow pages - never embed raw nbconvert HTML exports; export only curated figures, resize to actual display width, and compress before committing (astro:assets+Sharp handles most of this automatically if used consistently).

## Implications for Roadmap

Based on combined research, suggested phase structure:

### Phase 1: Foundation & Deployment Pipeline
**Rationale:** Technical setup must be verified working (real deployed URL, not just local dev) before any content is layered on top - multiple pitfalls (baseurl misconfig, silent build failures) are cheapest to prevent here and expensive to retrofit later.
**Delivers:** Astro 6 project scaffold (TypeScript, MDX, Tailwind v4), User Pages repo (username.github.io) wired to GitHub Actions (withastro/action) deploying to GitHub Pages, base layout/nav/footer shell with persistent contact/profile links, projects Content Collection schema (Zod) defined (empty/placeholder content is fine).
**Uses:** Astro + MDX + Tailwind v4 stack; withastro/action; Content Collections + Zod.
**Avoids:** Pitfall 4 (baseurl/path misconfiguration), Pitfall 5 (silent build failures), Pitfall 9 (no CTA - footer/nav links built into the base template from day one).

### Phase 2: Core Narrative Pages (About, Experience, Contact)
**Rationale:** Feature dependency research is explicit that the personal narrative/positioning should be decided before case studies are drafted, since it informs which projects get featured and how. This is also pure low-complexity content work that can ship fast and establish the site's voice.
**Delivers:** About/hero section with an explicit hybrid DS+DE positioning statement, Experience/CV summary, Contact section, working nav capped at PROJECT.md's 4 core sections (About/Projects/Experience/Contact).
**Addresses:** Table-stakes features - About, Experience, Contact/links hub.
**Avoids:** Pitfall 2 (generic narrative), Pitfall 10 (cluttered navigation - resist adding sections beyond the scoped 4).

### Phase 3: Case Study Template & Project Content
**Rationale:** This is the core value proposition of the entire site (per PROJECT.md's Core Value) and the single most research-flagged risk area. The template must be locked before drafting individual projects, and it directly gates the projects gallery.
**Delivers:** A single enforced problem-approach-impact-tech-stack case-study template (Astro layout + MDX content type), the projects gallery/listing page, and populated case-study pages for the user's existing real DS+DE projects - with business-impact framing, architecture diagrams (static images) for DE-flavored projects, and scannable tech-stack tags.
**Implements:** Collection-per-content-type architecture pattern; link-out-for-deep-artifacts pattern (curated narrative + exported charts, full notebooks/repos linked externally, never embedded raw).
**Avoids:** Pitfall 1 (reads as tutorials), Pitfall 3 (code not reasoning), Pitfall 7 & 8 (unoptimized/raw notebook embeds).

### Phase 4: Polish, Performance & Launch
**Rationale:** Once content and structure exist, this phase hardens the site against the remaining "looks done but isn't" risks - performance, mobile, SEO, and (if desired) custom domain - before treating v1 as complete.
**Delivers:** Image optimization audit (astro:assets/Sharp applied consistently), responsive/mobile QA on real devices, SEO layer (@astrojs/sitemap, meta/Open Graph tags), optional analytics (GoatCounter/Plausible), optional custom domain + HTTPS setup (with buffer time for DNS/cert propagation), a working-links check pass, and a documented post-launch maintenance checklist (quarterly content review). Delivers a production-ready, launched v1 site.

### Phase Ordering Rationale

- Deployment pipeline first because every subsequent phase needs a working, verified deploy target to validate against (per Pitfall 4/5, "works locally" is not a valid done-state).
- Narrative/positioning before case studies because FEATURES.md's dependency graph explicitly states the case-study template and site positioning should be locked before content is drafted - building case studies ad hoc risks inconsistent framing that's expensive to rewrite later.
- Case studies as their own phase because they are simultaneously the highest-value and highest-risk part of the site (Core Value in PROJECT.md, and the top-cited pitfall category in PITFALLS.md) - deserves focused attention rather than being folded into general "content" work.
- Polish/launch last because performance, SEO, and custom-domain concerns are meaningfully easier to verify once real content (real image sizes, real page count) exists, and several sub-tasks (HTTPS provisioning) have external waiting periods best scheduled with buffer before a hard launch date.

### Research Flags

Phases likely needing deeper research during planning:
- Phase 1: Needs a short /gsd:research-phase pass to translate the Jekyll-based architectural patterns in ARCHITECTURE.md into concrete Astro Content Collections + withastro/action CI syntax, since the two research documents used different reference implementations.
- Phase 4: Needs research-at-implementation-time for analytics vendor selection (verify current GoatCounter/Plausible free-tier limits, per ARCHITECTURE.md's own caveat) and, if a custom domain is chosen, the exact current DNS/CAA record requirements (GitHub's documented specifics can shift).

Phases with standard patterns (skip research-phase):
- Phase 2: Well-documented, low-complexity static content pages - no novel technical risk.
- Phase 3: The case-study template and content-collection pattern are thoroughly documented across all four research files with consistent, converging recommendations - implementation guidance is already actionable as-is.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Verified against official Astro/Tailwind/GitHub docs and current (2026) changelogs; version requirements explicit |
| Features | MEDIUM-HIGH | Converges across many independent career-advice/practitioner sources, but no single authoritative source; all directional, not from primary UX research on this exact audience |
| Architecture | HIGH (mechanics) / MEDIUM (generator fit) | GitHub Pages/deploy mechanics are HIGH confidence and official; but research was conducted against Jekyll as reference while Stack research recommends Astro - patterns transfer, syntax does not |
| Pitfalls | MEDIUM-HIGH | Technical pitfalls (baseurl, HTTPS, build failures) verified against official GitHub Docs and issue trackers; content/positioning pitfalls synthesized from multiple independent but non-primary sources |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

- Jekyll-vs-Astro architecture mismatch: ARCHITECTURE.md's concrete examples (Liquid templates, _config.yml, Jekyll collections) need direct translation to Astro's Content Collections/.astro conventions during Phase 1 planning - the underlying patterns hold, but no file should be copy-pasted as-is.
- Language decision unconfirmed: PROJECT.md flags English-vs-Portuguese as an unconfirmed assumption by Claude, not a user decision - should be explicitly confirmed before Phase 2 content drafting begins, since it affects all narrative writing.
- Analytics vendor free-tier limits: ARCHITECTURE.md explicitly notes GoatCounter/Plausible free-tier specifics should be verified at implementation time, not assumed from research.
- Custom domain: Not yet decided as in/out of scope for v1 - PROJECT.md doesn't mention one; if added later, Pitfall 6 (HTTPS provisioning delays) should be scheduled with buffer time well before any target launch date.

## Sources

### Primary (HIGH confidence)
- https://docs.astro.build/en/guides/deploy/github/ - official Astro to GitHub Pages deployment guide
- https://astro.build/blog/astro-6/ - Astro 6 release notes (Node 22+ requirement)
- https://github.com/withastro/action - official GitHub Action for Astro to Pages deploys
- https://tailwindcss.com/docs/installation/framework-guides/astro - official Tailwind v4 + Astro setup
- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits - official GitHub Pages limits
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-jekyll-build-errors-for-github-pages-sites
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages
- https://jekyllrb.com/docs/collections/ - collection pattern reference (Jekyll-specific, pattern transfers to Astro)

### Secondary (MEDIUM confidence)
- https://www.kdnuggets.com/5-portfolio-mistakes-that-keep-data-scientists-from-getting-hired - DS-industry publication, fetched in full
- https://pipeline2insights.substack.com/p/how-to-create-data-engineering-data-engineers-github-portfolio-in-2026 - DE-specific practitioner guide
- https://brainstation.io/career-guides/how-to-build-a-data-science-portfolio, https://www.dataquest.io/blog/career-guide-data-science-projects-portfolio/, https://www.tredence.com/blog/data-science-portfolio - career-advice consensus on table-stakes/differentiator features
- https://careerfoundry.com/en/blog/data-analytics/data-analytics-portfolio-examples/ - concrete named portfolio examples
- https://designfolio.substack.com/p/portfolio-tips-ux - cross-domain UX portfolio review retrospective (large sample size cited)

### Tertiary (LOW confidence)
- Medium opinion pieces on tutorial-dataset anti-patterns (corroborated by multiple other sources, but individually single-author) - treated as directional
- https://hakia.com/skills/building-portfolio/ - general developer-portfolio stats (44% stale/broken-link figure), not DS/DE-specific

---
*Research completed: 2026-07-03*
*Ready for roadmap: yes*
