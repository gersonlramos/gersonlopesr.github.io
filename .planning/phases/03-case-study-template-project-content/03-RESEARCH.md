# Phase 3: Case Study Template & Project Content - Research

**Researched:** 2026-07-04
**Domain:** Astro 7 Content Collections (dynamic routing + schema design) + real-project content sourcing (GitHub repo audit) for a DS/DE portfolio case-study template
**Confidence:** HIGH (Astro APIs, verified via official docs) / MEDIUM (project selection — verified against live GitHub API but content depth judged manually) / LOW (PROJ-06 flagship choice — flagged as open decision)

## Summary

This phase has two very different halves. The **technical half** (gallery page, dynamic case-study route, extended Content Collection schema, static diagrams) is low-risk: Astro 7's Content Layer API (`glob()` loader + Zod schema, already partially wired in `src/content.config.ts`) supports everything needed with well-documented, stable APIs, and the project already has every design-token and BASE_URL convention needed to build these pages consistently with Phases 1-2.

The **content half** is the real risk area, and this is the most important finding of this research: **the enterprise/employer projects with the strongest quantified impact (Pottencial Seguros' 99%/35% pipeline metrics, the Stellantis Airflow/Snowflake migration, Outlier AI's RAG work, AI Studio's ML models) have no public GitHub repositories** — they're client/employer work and understandably not open-sourced. A live scan of `github.com/gersonlramos` (the actual username — note it is `gersonlramos`, not `gersonlopesr`; only the *repo* is named `gersonlopesr.github.io`) turned up 17 public repos, of which 5 are credible, non-toy, DS/DE-relevant candidates that a case study can honestly link to per PROJ-05. Two of those five *do* tie back to real disclosed employer contexts (already public on the live site's Experience section), and one — `Analise_cenarios` — already has a live, working, interactive GitHub Pages demo that can satisfy PROJ-06 with zero new deployment work.

**Primary recommendation:** Feature the 5 concrete candidates identified below (3 DE-leaning, 2 DS-leaning), use `Analise_cenarios`'s existing live demo (https://gersonlramos.github.io/Analise_cenarios/) as the PROJ-06 flagship link, extend `src/content.config.ts` with `category`, `impactSummary`, `diagramPath`, and `demoUrl` fields, put narrative content in the MDX body (not frontmatter), and render static Mermaid-sourced SVG diagrams for DE case studies (author-time export via mermaid.live, zero new runtime dependency).

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| PROJ-01 | Visitor browses a gallery of all projects with visible tech tags | Astro Content Layer `getCollection()` + a `src/pages/projects/index.astro` grid page (pattern below); `stack: string[]` already in schema |
| PROJ-02 | Dedicated case study page per project, problem→approach→impact template | `src/pages/projects/[slug].astro` with `getStaticPaths()` + `render()` (pattern below); template structure enforced via MDX heading convention, documented below |
| PROJ-03 | Explicit business/practical impact per case study, not just a metric | Content-sourcing audit below (README/CLAUDE.md mining) + new `impactSummary` schema field + "Case Study Content Pattern" guidance distinguishing employer-tied vs. self-directed projects |
| PROJ-04 | DE case studies include a static architecture/pipeline diagram | Diagram tooling research below (Mermaid Live Editor → static SVG, zero new dependency) + `diagramPath` schema field with a Zod `superRefine` to enforce presence for DE category |
| PROJ-05 | Every case study links to full code/notebook on GitHub (not embedded) | Full GitHub repo audit below — confirms which real repos exist and are linkable; `repoUrl`/`notebookUrl` fields already exist in schema |
| PROJ-06 | At least one flagship project links to an externally-hosted interactive demo | `Analise_cenarios` repo confirmed to have a **live, working** GitHub Pages demo (verified HTTP 200, real interactive Gantt/scenario UI) — satisfies this requirement today with no new deployment; Streamlit/HF Spaces fallback path documented for a different flagship choice |

## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Feature 3-5 projects in v1.
- **D-02:** Roughly even DS/DE split.
- **D-03:** Specific project selection deferred to research — scan `github.com/gersonlopesr` [sic, see note above: actual username is `gersonlramos`] and cross-reference resume-mentioned work (CompassUOL/Stellantis, Pottencial Seguros, AI Studio, Outlier AI, Pet Premium). Toy datasets (Titanic/Iris/MNIST) explicitly out of scope.
- **D-04:** Grid of cards layout — thumbnail + title + tech-stack tags + 1-line summary.
- **D-05:** No filter/sort UI for v1.
- **D-06:** Case study narrative drafted primarily from the user's existing GitHub repos/notebooks/READMEs, not from a blank page.
- **D-07:** DE architecture diagrams don't exist yet, need to be created this phase; simple static diagram (Mermaid or Excalidraw export), no interactivity required.
- **D-08:** Business-impact framing (PROJ-03) proposed by research from available evidence (repo README claims, commit history, resume metrics), then confirmed with the user — not supplied upfront.

### Claude's Discretion
- Exact routing/URL structure for case study pages (e.g., `/projects/[slug]`).
- Content Collection schema extensions for problem/approach/impact structure, DS/DE category, diagram path, demo URL.
- Diagram tool choice (Mermaid vs. Excalidraw vs. draw.io export) — pick whichever fits the Astro build pipeline best.
- Card visual design details within the existing dark tech theme tokens.

### Deferred Ideas (OUT OF SCOPE)
- Flagship interactive demo (PROJ-06) specifics were not discussed with the user this round — this research proposes a concrete, zero-effort answer (`Analise_cenarios`'s existing live demo), but the planner should still get explicit user confirmation before locking it in, since it involves naming a specific employer/client project publicly.
- Full tag-based filtering — deferred to a future milestone.
- "Last updated" / GitHub activity badge — v1.x/v2 candidate, out of Phase 3 scope.

## Project Constraints (from CLAUDE.md)

- Stack is locked: **Astro 6/7 + MDX + Tailwind v4**, static output only, deployed via `withastro/action` to GitHub Pages — no server-rendered features, no CMS, no client-side backend calls.
- **Zero-JS-by-default philosophy is explicit project policy** ("ships zero JS by default... that's exactly the profile of a portfolio"). This directly informs the diagram-tooling decision below: avoid client-rendered Mermaid (would ship a JS runtime for something a static SVG solves for free).
- `astro:assets` + Sharp **"Always"** for screenshots/diagrams/thumbnails per the stack doc — informs the schema recommendation to use the `image()` helper for raster thumbnails.
- Vega-Lite/vega-embed reserved **only** for 1-2 flagship interactive case studies, not every chart — reinforces that PROJ-06's "interactive demo" should stay as a single external link-out, not an in-repo JS island.
- No toy datasets (Titanic/Iris/MNIST) — explicitly banned in both CLAUDE.md's source project (PROJECT.md/REQUIREMENTS.md Out of Scope) and FEATURES.md anti-patterns. This directly disqualifies `Machine_Learning`, `divvy_tripdata_analisys`, and `Datacamp_Projects` from the candidate repo list (certificate/tutorial-flavored, even if not literally Titanic).
- Committing raw un-exported `.ipynb` and expecting Pages to render it nicely is explicitly listed as "what NOT to do" — reinforces PROJ-05's "link out, don't embed" requirement; any notebook must be linked to GitHub (which renders `.ipynb` natively) rather than embedded in the Astro build.
- Display name is "Gerson Ramos" (corrected in Phase 2) — must be used consistently; do not reintroduce "Gerson Lopes".

## Standard Stack

### Core (already installed — no new dependencies needed for the routing/schema half)

| Library | Version (verified via npm view) | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro | 7.0.6 | SSG, Content Layer API, dynamic routing | Already the project's locked stack; Content Layer (`glob()` loader) already wired for `projects` |
| @astrojs/mdx | 7.0.2 | MDX rendering for case study body content | Matches installed Astro major version; already a dependency |
| astro/zod (bundled with astro) | bundled | Schema validation for Content Collections | Already used in `content.config.ts` |
| tailwindcss / @tailwindcss/vite | 4.1.11 | Card grid + case-study page styling | Already installed; existing design tokens (`--color-accent`, `--color-surface`, etc.) in `src/styles/global.css` cover everything needed |
| lucide-astro | 0.556.0 | Icons for GitHub/external-link/demo affordances on cards and case study pages | Already installed, zero new dependency; tree-shaken, zero runtime JS |

### Supporting (author-time only, NOT npm dependencies)

| Tool | Purpose | When to Use |
|------|---------|-------------|
| Mermaid Live Editor (mermaid.live, browser-based, no install) | Author architecture/pipeline diagrams as text, export static SVG | For all PROJ-04 DE diagrams — write the diagram as Mermaid syntax, paste into mermaid.live, export SVG, commit the SVG (and optionally the `.mmd` source for future edits) to `public/projects/<slug>/diagram.svg` |
| GitHub API (`api.github.com/users/gersonlramos/repos`) | Content-sourcing / repo verification | Already used during this research to confirm which repos are real, public, and non-empty |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Mermaid Live Editor (manual export) | `astro-mermaid` (npm, v2.1.0) | Renders Mermaid client-side in the browser — adds a real JS runtime (mermaid.js is not small) purely to draw a diagram that never changes after publish. Directly contradicts the project's stated zero-JS-by-default philosophy and CLAUDE.md's explicit "static image/SVG is enough — no interactivity required" (D-07). Rejected. |
| Mermaid Live Editor (manual export) | `@mermaid-js/mermaid-cli` (`mmdc`, v11.16.0) | Produces the same static SVG output, but requires installing a devDependency that pulls in a headless Chromium (Puppeteer) — heavy install, and this project's STATE.md already flags prior Windows/OneDrive tooling friction. Manual mermaid.live export achieves an identical result with zero local install. Only worth it if diagrams need to be regenerated frequently in CI (not the case here — diagrams are written once per case study). |
| Mermaid (diagram-as-code) | Excalidraw / draw.io hand-drawn export | Also static/zero-JS and explicitly allowed by CONTEXT.md D-07. Reasonable alternative if a project's diagram genuinely doesn't fit boxes-and-arrows flowchart syntax, but Mermaid's `flowchart`/`graph TD` syntax maps very directly onto the pipeline diagrams needed here (data flow: source → transform → sink) and is more maintainable as text than a hand-drawn file. Recommend Mermaid as the default, Excalidraw as a fallback for any diagram that doesn't fit flowchart syntax. |
| `image()` schema helper for `thumbnail` | Plain `z.string()` (current schema) | The existing schema already uses `z.string().optional()` for `thumbnail`, not `image()`. CLAUDE.md says "Always" use `astro:assets`/Sharp for thumbnails, but this project's established convention (Phase 1/2) is a plain BASE_URL-safe string path into `public/` (see `resume.pdf` pattern), not colocated content-collection assets. Recommend keeping plain string paths into `public/projects/<slug>/` for both `thumbnail` and `diagramPath` for consistency with the existing pattern — see Open Questions for the tradeoff. |

**Installation:** None required — every core library needed is already in `package.json`.

**Version verification:** Confirmed via `npm view <pkg> version` against the npm registry on 2026-07-04: `astro@7.0.6`, `@astrojs/mdx@7.0.2`, `lucide-astro@0.556.0` all current and already installed at these versions.

## Architecture Patterns

### Recommended Project Structure

```
src/
├── content/
│   └── projects/
│       ├── stellantis-migration-scenario-planning.mdx   # DE
│       ├── northwind-dbt-redshift-pipeline.mdx          # DE
│       ├── sql-to-pyspark-translator.mdx                # DE
│       ├── pet-premium-realtime-sales-dashboard.mdx     # DS
│       └── superstore-data-quality-pipeline.mdx         # DS
├── content.config.ts          # extended Zod schema (see below)
├── pages/
│   ├── projects/
│   │   ├── index.astro        # PROJ-01 gallery — grid of cards
│   │   └── [slug].astro       # PROJ-02 case study page — getStaticPaths + render()
├── components/
│   ├── ProjectCard.astro      # new — card used by gallery grid
│   └── Nav.astro              # add "Projects" link
public/
└── projects/
    ├── stellantis-migration-scenario-planning/
    │   ├── thumbnail.png
    │   └── diagram.svg
    └── ... (one folder per slug, consistent with existing public/resume.pdf convention)
```

### Pattern 1: Extended Content Collection Schema

**What:** Extend the existing partial schema with category, impact summary, diagram path, and demo URL — with a `superRefine` enforcing PROJ-04 (DE case studies must have a diagram) at build time.

**When to use:** Immediately — this is the foundation every other task in this phase depends on.

**Example:**
```typescript
// src/content.config.ts
// Source: https://docs.astro.build/en/guides/content-collections/ (Content Layer API, verified 2026-07-04)
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z
    .object({
      title: z.string(),
      summary: z.string(),
      category: z.enum(['data-science', 'data-engineering']),
      impactSummary: z.string(), // 1-2 sentence business/practical impact, used on card + case study header
      stack: z.array(z.string()),
      role: z.string(),
      repoUrl: z.string().url(),
      notebookUrl: z.string().url().optional(),
      thumbnail: z.string().optional(), // path under public/, e.g. "/projects/<slug>/thumbnail.png"
      diagramPath: z.string().optional(), // path under public/, e.g. "/projects/<slug>/diagram.svg"
      demoUrl: z.string().url().optional(), // PROJ-06 flagship external demo link
      order: z.number().default(0),
    })
    .superRefine((data, ctx) => {
      if (data.category === 'data-engineering' && !data.diagramPath) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'PROJ-04: data-engineering case studies must include diagramPath',
          path: ['diagramPath'],
        });
      }
    }),
});

export const collections = { projects };
```

This directly enforces PROJ-04 as a build-time failure (not a runtime bug) — a DE-tagged project missing a diagram will fail `astro build`/`astro check` rather than silently shipping.

### Pattern 2: Gallery Page (PROJ-01)

**What:** `src/pages/projects/index.astro` renders a grid of cards from `getCollection('projects')`, sorted by the existing `order` field.

**When to use:** Entry point to all case studies — build before `[slug].astro` since the card component's data needs match the case study header.

**Example:**
```astro
---
// src/pages/projects/index.astro
// Source: https://docs.astro.build/en/guides/content-collections/ (getCollection, verified 2026-07-04)
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

const baseUrl = import.meta.env.BASE_URL;
const projects = (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
---

<BaseLayout title="Projects — Gerson Ramos">
  <section class="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12 sm:py-16">
    <h1 class="text-center text-2xl font-semibold leading-tight text-foreground">Projects</h1>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {projects.map((project) => (
        <a
          href={`${baseUrl}/projects/${project.id}/`}
          class="flex flex-col gap-3 rounded border border-border bg-surface p-6 hover:border-accent"
        >
          <h2 class="text-lg font-semibold leading-snug text-foreground">{project.data.title}</h2>
          <p class="text-base leading-normal text-muted-foreground">{project.data.summary}</p>
          <ul class="flex flex-wrap gap-2">
            {project.data.stack.map((tech) => (
              <li class="rounded border border-border px-2 py-1 font-mono text-xs text-accent">{tech}</li>
            ))}
          </ul>
        </a>
      ))}
    </div>
  </section>
</BaseLayout>
```

No filtering UI per D-05 — this is intentionally the entire gallery implementation.

### Pattern 3: Dynamic Case Study Route (PROJ-02)

**What:** `src/pages/projects/[slug].astro` uses `getStaticPaths()` to generate one page per collection entry, and `render()` from `astro:content` to render the MDX body.

**When to use:** For all individual case study pages.

**Example:**
```astro
---
// src/pages/projects/[slug].astro
// Source: https://docs.astro.build/en/guides/content-collections/ (getStaticPaths + render, verified 2026-07-04, current Astro 7 API)
import { getCollection, render } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map((project) => ({
    params: { slug: project.id },
    props: { project },
  }));
}

const { project } = Astro.props;
const { Content } = await render(project);
const baseUrl = import.meta.env.BASE_URL;
---

<BaseLayout title={`${project.data.title} — Gerson Ramos`}>
  <article class="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-12 sm:py-16">
    <header class="flex flex-col gap-2">
      <h1 class="text-2xl font-semibold leading-tight text-foreground">{project.data.title}</h1>
      <p class="text-base leading-normal text-accent">{project.data.impactSummary}</p>
    </header>

    {project.data.diagramPath && (
      <img src={`${baseUrl}${project.data.diagramPath}`} alt={`${project.data.title} architecture diagram`} class="rounded border border-border" />
    )}

    <div class="prose prose-invert max-w-none">
      <Content />
    </div>

    <footer class="flex flex-wrap gap-4 border-t border-border pt-6">
      <a href={project.data.repoUrl} class="text-accent hover:underline">View code on GitHub →</a>
      {project.data.notebookUrl && <a href={project.data.notebookUrl} class="text-accent hover:underline">View notebook →</a>}
      {project.data.demoUrl && <a href={project.data.demoUrl} class="text-accent hover:underline">Try the live demo →</a>}
    </footer>
  </article>
</BaseLayout>
```

Note `project.id` is the filename-derived slug from the glob loader (kebab-case) — no custom slug logic needed; name content files exactly as the desired URL segment.

### Pattern 4: MDX Body Structure (Problem → Approach → Impact)

**What:** The narrative itself lives in the MDX body as three headed sections, not in frontmatter. Frontmatter stays reserved for structured/queryable metadata (used by the gallery and card).

**Rationale:** Problem/approach/impact are multi-paragraph prose that benefit from Markdown formatting and may embed inline elements (a caption under a screenshot, a callout). Cramming this into frontmatter strings loses formatting and makes the schema unreadable. This matches Astro's own guidance pattern for blog/content collections (frontmatter = metadata, body = content) and is consistent with how MDX is described in this project's own tech-stack doc ("drop a `<Chart />` or `<TechBadges />` component directly into a case-study `.mdx` file while still writing 95% plain Markdown").

**Example MDX body skeleton:**
```mdx
## Problem

Manual Jira status parsing for the Stellantis data-lake migration made it impossible to compare
squad-allocation scenarios before committing to a timeline...

## Approach

...

## Impact

...
```

### Anti-Patterns to Avoid

- **Embedding raw `.ipynb` or full notebook HTML in the page:** Explicitly out of scope per REQUIREMENTS.md and CLAUDE.md's "What NOT to Use" table. Every notebook reference must be a link (`notebookUrl`) to GitHub, which already renders `.ipynb` natively.
- **Ending a case study at a technical metric:** FEATURES.md is explicit that this is the #1 differentiator gap. Every MDX body must close (or open) with a business/practical translation of impact, not just "87% accuracy" or "reduced worker blockage."
- **Client-rendered Mermaid for a diagram that never changes:** See Alternatives Considered — ships JS for no benefit over a static SVG.
- **Inventing employer-style impact metrics for personal/practice repos:** See "Case Study Content Pattern" below — a self-directed dbt practice project should not claim fabricated business outcomes it didn't have.

### Case Study Content Pattern by Project Type

The GitHub audit below (Don't Hand-Roll / Sources sections) surfaced an important nuance: only 2 of the 5 recommended candidates are tied to a real disclosed employer engagement; the other 3 are self-directed skill-building projects using common practice datasets (Northwind, SuperStore). PROJ-03 requires "business/practical impact, not just a technical metric" for **every** case study — but "business impact" means something different for each type:

| Project type | Impact framing pattern | Example |
|---|---|---|
| Employer-tied (already disclosed in Experience section) | Cite the real, already-public business outcome | `Analise_cenarios` → "this scenario simulator let the Stellantis migration team compare squad-allocation timelines before committing, informing the same delivery forecasting referenced in the Experience section" |
| Self-directed practice project | Frame impact as the practical capability demonstrated and the real-world pattern it mirrors — do not invent a fake business outcome | `redshift-dbt` → "demonstrates the same medallion-style transformation approach used in production (Pottencial Seguros), applied here to a portable dataset so the technique can be shown publicly without exposing client data" |

This distinction should be made explicit in the plan's task for drafting each case study's Impact section, so execution doesn't default to generic "impact: none, it's just a demo" copy (which would fail PROJ-03) or overclaim (which would misrepresent a personal project as production work).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|--------------|-----|
| Slug generation for case study URLs | Custom slugify function | Astro's `glob()` loader — `entry.id` is derived directly from the filename | Already wired; naming content files in kebab-case (e.g. `pet-premium-realtime-sales-dashboard.mdx`) is the entire "slug system" needed |
| Schema-level enforcement of "DE case studies need a diagram" (PROJ-04) | A custom lint script or manual checklist | Zod's `.superRefine()` on the collection schema (Pattern 1 above) | Fails the build immediately and precisely, with zero extra tooling |
| Static diagram rendering | A hand-rolled SVG/CSS box-and-arrow diagram, or a custom Mermaid render pipeline | Mermaid Live Editor (mermaid.live) → export SVG once, commit | Zero new dependency, zero client JS, and Mermaid's flowchart syntax is purpose-built for exactly this (source → transform → sink) diagram shape |
| Raster image optimization | Manual image resizing/compression | `astro:assets` + Sharp (already bundled) if thumbnails are wired through the `image()` schema helper — see Open Questions for whether to adopt this now or in Phase 4 | Already part of the stack per CLAUDE.md; don't hand-roll resizing scripts |
| Verifying GitHub repos are real/public before linking | Guessing or trusting the resume alone | GitHub REST API (`api.github.com/users/<user>/repos`), as done in this research | Confirms existence, non-empty status, default branch, and content in seconds — already done below, no need to redo per-project during planning |

**Key insight:** Every piece of new "infrastructure" this phase needs (slugs, diagram rendering, schema validation) has a zero-dependency or already-installed answer. The actual risk in this phase is not tooling — it's content honesty (don't overclaim impact on personal projects) and content availability (most of the strongest resume metrics have no public repo to link to).

## Common Pitfalls

### Pitfall 1: Assuming resume-mentioned projects have public repos
**What goes wrong:** Planning case studies around the Pottencial Seguros medallion architecture or the Stellantis Airflow/Snowflake migration (the strongest quantified metrics: "cut worker blockage 99%, +35% throughput") without confirming a public repo exists to satisfy PROJ-05.
**Why it happens:** These are legitimately the most impressive, best-quantified achievements on the resume, making them tempting to lead with.
**How to avoid:** Confirmed via GitHub API: neither exists as a public repo under `gersonlramos`. Use the 5 candidates identified in this research instead, all of which are confirmed public, non-empty, and real.
**Warning signs:** A task that says "write case study for X" where X has no `repoUrl` candidate found in this research — flag immediately rather than assuming one will surface during writing.

### Pitfall 2: GitHub username confusion
**What goes wrong:** CONTEXT.md and prior planning materials reference `github.com/gersonlopesr` — but that username does not exist (404 confirmed).
**Why it happens:** The site's *repository* is named `gersonlopesr.github.io` (an artifact of an earlier assumed name, per STATE.md's note about the "Gerson Lopes" → "Gerson Ramos" correction in Phase 2), but the GitHub *account* itself is `gersonlramos`.
**How to avoid:** All GitHub profile links (footer, About page, case study repoUrls) must point to `github.com/gersonlramos`, not `github.com/gersonlopesr`. Verify the footer's existing GitHub link in `src/components/Footer.astro` is already correct — if not, this is a bug to fix in this phase.
**Warning signs:** Any hardcoded `gersonlopesr` GitHub URL in the codebase.

### Pitfall 3: Naming a client (Stellantis) in a public repo/case study
**What goes wrong:** `Analise_cenarios`'s own `CLAUDE.md` file explicitly names "Stellantis" and references internal OneDrive paths (`OneDrive - Compass UOL\Projetos\Stellantis\...`). Treating this as automatically safe to feature just because the repo is already public could be premature.
**Why it happens:** The repo owner already made it public and the Experience section (Phase 2, already live) already discloses "CompassUOL (Client: Stellantis)" — so the client name itself isn't new information. But building a full case study around it is a more prominent, more scrutinized use of that disclosure than a resume bullet.
**How to avoid:** Flagged as an Open Question below — recommend a brief human-verify checkpoint before publishing this specific case study, even though nothing in this research suggests it's actually a problem (the info is already disclosed and the repo is already public).
**Warning signs:** None currently — this is a proactive flag, not a discovered issue.

### Pitfall 4: Treating `thumbnail`/`diagramPath` as Content-Collection-managed assets
**What goes wrong:** Using the Content Layer `image()` schema helper (which resolves relative to the content entry's own file location) while also trying to follow this project's established `public/` + `${baseUrl}` convention (used for `resume.pdf`) — mixing both patterns creates two incompatible asset-resolution mental models in the same codebase.
**Why it happens:** CLAUDE.md recommends `image()` "Always," but Phase 1/2 already established the `public/` + BASE_URL string pattern for every other asset.
**How to avoid:** Pick one. This research recommends staying consistent with the already-shipped `public/` + `${baseUrl}` pattern for both `thumbnail` and `diagramPath` (plain `z.string()` fields), deferring Sharp-based optimization to Phase 4 (POLISH-02 explicitly covers "images are optimized"). See Open Questions for the alternative if the planner disagrees.
**Warning signs:** A task that tries to `import` a content-collection thumbnail as a Vite asset while another task references it as `${baseUrl}/projects/...` — pick one path resolution strategy before writing tasks.

## GitHub Repository Audit (github.com/gersonlramos)

Fetched live via `api.github.com/users/gersonlramos/repos` on 2026-07-04 (17 public repos total). Full README/content spot-checks performed for the strongest candidates.

### Recommended Candidates (5 total — 3 DE, 2 DS, per D-01/D-02)

| Repo | Proposed Category | What it is | Evidence for PROJ-03 impact framing | Assets available |
|---|---|---|---|---|
| [`Analise_cenarios`](https://github.com/gersonlramos/Analise_cenarios) | Data Engineering (extraction/simulation) | Parses raw Jira-derived `.txt` story data across 9 Stellantis data-lake domains, simulates squad allocation scenarios, generates a comparative Gantt timeline (Plotly) | Ties directly to the disclosed Stellantis migration-tracking work in the live Experience section; **has its own working GitHub Pages demo** (see PROJ-06 below) | Live demo at `docs/index.html`; CLAUDE.md documents the full pipeline for narrative sourcing |
| [`redshift-dbt`](https://github.com/gersonlramos/redshift-dbt) | Data Engineering | dbt project against AWS Redshift; 8-source medallion-style transformation pipeline (dedup, enrichment, joins) on the Northwind dataset | Practice-project framing: mirrors the medallion-architecture pattern used in production at Pottencial Seguros (per Experience section), demonstrated on a portable dataset | README has an ASCII architecture diagram — good source material to redraw as a proper Mermaid diagram |
| [`SQL_PySpark_Translator`](https://github.com/gersonlramos/SQL_PySpark_Translator) | Data Engineering | Custom SQL→PySpark query translator/parser (handles joins, aliases, aggregates, GROUP BY, etc.) | Practice-project framing: directly relevant tooling skill given the "refactored Airflow orchestrations... Apache Iceberg and Spark" experience bullet | Single well-documented notebook |
| [`Sales_Real_Time`](https://github.com/gersonlramos/Sales_Real_Time) | Data Science | Power BI dashboard + PostgreSQL simulation for **pet-product sales** monitoring (KPIs, payment-type distribution, per-seller performance) | Domain directly matches the disclosed Pet Premium Distribuidora experience ("Power BI dashboards tracking KPIs for executive decision-making") | Has real screenshots (`PowerBI_2.png`, `PowerBI_Tabelas.png`) and even a demo video file — good thumbnail source |
| [`Postgres-Clean-Process-SuperStore`](https://github.com/gersonlramos/Postgres-Clean-Process-SuperStore) | Data Science | Data cleaning/quality pipeline in PostgreSQL (ERD, dedup, null imputation, ranking queries) on the SuperStore dataset | Practice-project framing: demonstrates the data-quality/EDA discipline behind the Pet Premium and AI Studio experience bullets | Already has a real ERD diagram image (`SuperStore_ERD.png`) — directly reusable, may not even need a new Mermaid diagram if categorized DS (diagram only required for DE per schema) |

### Explicitly Excluded Candidates (and why)

| Repo | Why excluded |
|---|---|
| `Machine_Learning` | Explicitly "Google Advanced Data Analytics Certificate" projects — tutorial/certificate-flavored, same anti-pattern family as Titanic/Iris/MNIST per FEATURES.md and REQUIREMENTS.md Out of Scope |
| `divvy_tripdata_analisys` | Google Data Analytics Certificate capstone ("Cyclistic" bike-share) — one of the most common guided-capstone projects in the DA-certificate ecosystem; same tutorial-flavor concern |
| `Datacamp_Projects` | Explicitly DataCamp certificate coursework |
| `Premier_League_Analisys` | Real personal side-project (Matplotlib dream-team visualization), but not DS/DE-professional in nature and not needed to hit the 3-5 project target; keep as an optional 6th "fun" addition if the planner wants variety, not a core case study |
| `nba-api-interface`, `People_Registry_LocalStorage`, `bolao_copa_2026`, `PostgreSQL` | Not DS/DE-relevant (general web dev / mobile app) |
| `Hackathon-PL-SQL-Pyhton-Squad-6` | A fork, not solely the user's own work — weaker attribution for a case study |
| `dashboard_fase_3_publico` | Confirmed **empty repo** (0 bytes, no commits) via API — cannot be used |

### PROJ-06 Flagship Interactive Demo — Concrete Finding

`Analise_cenarios` has `homepage: https://gersonlramos.github.io/Analise_cenarios/` set in its GitHub repo metadata, and this URL was fetched and confirmed **live and working** (HTTP 200) — it's an interactive scenario-planning page titled "Stellantis — Planejamento de Migração," hosted on GitHub Pages under a separate repo from the main portfolio site. This is genuinely externally-hosted (independent build/deploy from the main Astro site) and interactive (Gantt/scenario visualization), which satisfies PROJ-06's literal requirement ("links to an externally-hosted interactive demo") **without any new deployment work** in this phase.

If the planner/user prefers a different flagship project instead (e.g., one of the DS candidates), the fallback pattern for building a *new* externally-hosted demo is:
- **Streamlit Community Cloud** (free tier): requires a public GitHub repo with a `streamlit_app.py` (or similar) entry point and `requirements.txt`; deploy via share.streamlit.io by connecting the GitHub repo — no server management needed, but does require writing a new Streamlit app around existing analysis code (not zero-effort).
- **Hugging Face Spaces** (free tier): supports Streamlit, Gradio, or static/Docker SDKs; deploy by pushing to a HF-hosted git repo — similarly requires wrapping existing work in an app entry point.

Given D-01 already caps this at "at least one flagship," and `Analise_cenarios` already satisfies it with zero new work, **the recommendation is to use it** and treat Streamlit/HF Spaces as a documented fallback only if the human-verify checkpoint below surfaces a reason not to (see Open Questions).

## Code Examples

### Verified Astro Content Layer patterns (Source: docs.astro.build, fetched 2026-07-04, current for Astro 7)

```astro
---
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('projects');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---
<Content />
```

Key confirmed facts:
- `render()` is imported from `"astro:content"` directly (not a method on the entry object — that was the older Astro 2.x API).
- `post.id` (not `post.slug`) is the current field name for the glob-loader-derived identifier.
- If slugs ever need `/` segments, the file must be named `[...slug].astro` (rest parameter) — not needed here since all project slugs are single-segment.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|---------------|--------|
| Legacy Content Collections (`defineCollection({ type: 'content', schema })`, entry `.slug`, entry `.render()` method) | Content Layer API (`defineCollection({ loader: glob(...), schema })`, entry `.id`, `render(entry)` imported from `astro:content`) | Astro 5.0 (Dec 2024) introduced Content Layer; this project's `content.config.ts` already uses the new `glob()` loader | This project is already on the current API — no migration needed, just extend the existing schema |
| `@astrojs/tailwind` integration | `@tailwindcss/vite` plugin for Tailwind v4 | Tailwind v4 / Astro 5.2+ | Already correctly configured in this project's `astro.config.mjs` |

**Deprecated/outdated:** None relevant surfaced beyond the above — this project's stack is already current as of research date.

## Open Questions

1. **Should `Analise_cenarios` (naming Stellantis explicitly) be the PROJ-06 flagship, or should the planner get explicit user sign-off first?**
   - What we know: The repo is public, the client name is already disclosed on the live Experience section, and the demo works.
   - What's unclear: Whether the user is comfortable with a full case study (not just a resume bullet) built around client-identifiable project-management data, even though nothing in the repo appears to leak actual client business data (it's timeline/story-count analysis, not real business metrics or PII).
   - Recommendation: Proceed with it as the working assumption for planning, but the plan should include a human-verify checkpoint before this specific case study is published, distinct from the general content-review checkpoint.

2. **`thumbnail`/`diagramPath` as plain strings (BASE_URL convention) vs. `image()` schema helper (Sharp-optimized)?**
   - What we know: CLAUDE.md recommends `image()` "Always"; the project's actual established convention (resume.pdf) is plain BASE_URL strings.
   - What's unclear: Whether adopting `image()` now (small schema change, but introduces a second asset-resolution pattern into the codebase) is worth it in Phase 3, versus deferring all optimization work to Phase 4 (POLISH-02 exists specifically for this).
   - Recommendation: Use plain strings + `public/` in Phase 3 for consistency and lower risk; let Phase 4 POLISH-02 revisit whether thumbnails specifically should move to `image()` for Sharp optimization, since that's explicitly its job.

3. **Should `Premier_League_Analisys` be added as a 6th lighter/fun project?**
   - What we know: It's a real personal project (not employer-tied, not certificate coursework), fits D-01's upper bound of 5 only if one of the 5 recommended candidates is dropped.
   - What's unclear: Whether variety (a lighter, clearly-personal-interest project) adds or dilutes the hybrid DS/DE positioning goal.
   - Recommendation: Leave out of the initial 5; the planner can offer it as an optional addition if content review of the 5 recommended candidates reveals one is too thin to carry a full case study.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Astro build | ✓ | v22.22.1 (matches `engines: >=22.12.0`) | — |
| npm | dependency install | ✓ | bundled with Node | — |
| astro (installed) | build/dev | ✓ | 7.0.6 | — |
| @astrojs/mdx (installed) | MDX rendering | ✓ | 7.0.2 | — |
| Mermaid Live Editor | diagram authoring | ✓ (browser-based, no install needed) | n/a | `@mermaid-js/mermaid-cli` if local CLI rendering is ever preferred (heavier install, see Alternatives) |
| GitHub API access | repo verification (already done in this research) | ✓ | n/a | — |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:** None — everything needed for this phase's technical implementation is already installed or requires no installation (browser-based Mermaid export).

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None currently configured (no Jest/Vitest/Playwright in `package.json` or repo) |
| Config file | none — see Wave 0 |
| Quick run command | `npm run build` (runs `astro build`, which type-checks the Zod content-collection schema against every `.mdx` file and fails the build on a schema violation — e.g., a missing `diagramPath` on a DE-tagged project via the `superRefine` in Pattern 1) |
| Full suite command | `npm run build` (same — this is a static content site; there is no separate "unit test suite" distinct from the build's own validation) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PROJ-01 | Gallery renders all projects with tags | smoke | `npm run build` (fails if `getCollection('projects')` throws) + manual visual check | ❌ Wave 0 (no test file; build is the gate) |
| PROJ-02 | Each project has a working case study page | smoke | `npm run build` (getStaticPaths must resolve for every entry) + manual click-through | ❌ Wave 0 |
| PROJ-03 | Every case study states business impact | manual-only | N/A — this is a content-quality requirement, not mechanically testable | — |
| PROJ-04 | DE case studies have a diagram | schema-enforced | `npm run build` (Zod `superRefine` fails build if a DE project lacks `diagramPath`) | ❌ Wave 0 — schema change is itself the "test file" |
| PROJ-05 | Every case study links to GitHub | schema-enforced + manual | `repoUrl: z.string().url()` already enforces a well-formed URL at build time; manual check confirms it's a real, non-404 repo (already verified for all 5 candidates in this research) | ❌ Wave 0 |
| PROJ-06 | Flagship demo link works | manual | Manual: visit `demoUrl`, confirm HTTP 200 and interactivity (already verified for `Analise_cenarios` in this research) | — |

### Sampling Rate
- **Per task commit:** `npm run build` (catches schema violations and broken MDX immediately, in well under 30 seconds for a project this size)
- **Per wave merge:** `npm run build` + manual visual pass over the gallery and each case study page (`npm run preview`)
- **Phase gate:** Full manual link-check pass (repoUrl/notebookUrl/demoUrl for all 5 projects) before `/gsd:verify-work` — this phase's version of POLISH-03's later, site-wide link audit

### Wave 0 Gaps
- No dedicated test file needed — the extended Zod schema (Pattern 1) *is* the automated gate for PROJ-04/PROJ-05's structural requirements. No new test framework install required.
- Recommend adding a `npm run typecheck` script (`astro check`) alongside `npm run build` if not already run in CI, to catch template-level type errors in the new `[slug].astro`/`index.astro` pages before they reach the build step.

*(No missing framework install needed — the existing `astro build` step is a sufficient and appropriate automated gate for a static content site at this scale.)*

## Sources

### Primary (HIGH confidence)
- https://docs.astro.build/en/guides/content-collections/ — official docs, fetched 2026-07-04, confirmed current `getCollection`/`getStaticPaths`/`render()` API for Astro 7 (Content Layer)
- https://docs.astro.build/en/guides/images/ — official docs, fetched 2026-07-04, confirmed `image()` schema helper behavior and SVG-passthrough (not Sharp-optimized) behavior
- `api.github.com/users/gersonlramos/repos` — GitHub REST API, fetched live 2026-07-04, full repo list with fork/description/language/pushed_at metadata
- `raw.githubusercontent.com/gersonlramos/<repo>/main/README.md` and `/CLAUDE.md` — fetched live 2026-07-04 for `redshift-dbt`, `Sales_Real_Time`, `SQL_PySpark_Translator`, `Postgres-Clean-Process-SuperStore`, `Analise_cenarios`, `Premier_League_Analisys`, `divvy_tripdata_analisys`, `Machine_Learning`
- `gersonlramos.github.io/Analise_cenarios/` — fetched live 2026-07-04, confirmed HTTP 200 and real interactive content
- `npm view astro / @astrojs/mdx / lucide-astro / astro-mermaid / @mermaid-js/mermaid-cli version` — npm registry, fetched 2026-07-04, current published versions
- Local codebase inspection: `src/content.config.ts`, `src/components/Nav.astro`, `src/layouts/BaseLayout.astro`, `src/pages/index.astro`, `src/styles/global.css`, `package.json`, `astro.config.mjs` — read directly, 2026-07-04

### Secondary (MEDIUM confidence)
- `.planning/research/FEATURES.md` (this project's own prior research) — case study framing, anti-patterns, MVP prioritization; MEDIUM-HIGH per its own stated confidence

### Tertiary (LOW confidence)
- None — all findings in this document were verified against a primary source (official docs, live GitHub API, or direct file inspection) rather than left as unverified web search claims.

## Metadata

**Confidence breakdown:**
- Standard stack / Astro APIs: HIGH — verified against official docs fetched same-day, and the project's own installed versions
- Architecture patterns (routing, schema): HIGH — directly derived from official docs + existing codebase conventions
- Project/content selection: MEDIUM — repo existence and content confirmed via live API/fetch, but final suitability of narrative depth is a judgment call the planner/user should sanity-check
- PROJ-06 flagship recommendation: MEDIUM — the demo is confirmed live and working, but whether it's the *right* choice given the Stellantis-naming consideration (Open Question 1) needs a human check
- Diagram tooling: HIGH — zero-dependency, zero-JS approach directly matches explicit CLAUDE.md philosophy

**Research date:** 2026-07-04
**Valid until:** ~30 days for the technical/Astro findings (stable APIs); the GitHub repo audit should be re-verified if planning is delayed more than a few days, since repo visibility/content could change

---
*Phase: 03-case-study-template-project-content*
*Research completed: 2026-07-04*
