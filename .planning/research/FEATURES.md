# Feature Research

**Domain:** Data Scientist / Data Engineer personal portfolio website (static, GitHub Pages)
**Researched:** 2026-07-03
**Confidence:** MEDIUM-HIGH (converged across multiple independent sources: career-advice sites, DS/DE practitioner blogs, GitHub portfolio examples, UX portfolio-review retrospectives; no single source treated as authoritative alone)

## Feature Landscape

### Table Stakes (Users Expect These)

Recruiters/hiring managers scan portfolios in seconds. Missing these makes the site feel unfinished or unprofessional, regardless of project quality.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| About / value proposition section | First thing scanned — recruiters need to know "who is this person, what do they do" in <10s | LOW | Should state hybrid DS/DE identity explicitly, not just "data enthusiast" |
| Projects gallery/list | Core evidence of capability; the whole point of the site | LOW | 3-5 strong projects recommended over 10+ shallow ones |
| Individual project case study pages | A live link/repo alone doesn't show reasoning — recruiters want to see *how* you think, not just the output | MEDIUM | Needs consistent problem→approach→impact structure (see Case Study Framing below) |
| Experience/CV summary | Recruiters cross-reference portfolio against resume; a portfolio with zero career context reads as a hobby site | LOW | Doesn't need to duplicate full resume — timeline/highlights suffice |
| Contact / links to other profiles (LinkedIn, GitHub, email) | Portfolio is explicitly a "hub" — recruiters need a frictionless next step | LOW | Must be visible without hunting (footer or nav, not buried) |
| Responsive / mobile-friendly layout | Recruiters frequently open links on phones between meetings | LOW-MEDIUM | Non-negotiable; a portfolio that breaks on mobile is disqualifying |
| Working links (repos, live demos, external profiles) | Broken links are one of the most-cited credibility killers in portfolio reviews | LOW | Needs to be actively maintained — treat as an ongoing hygiene task, not a one-time build item |
| Visible "last updated" / recency signal | Stale portfolios (18+ months untouched) read as abandoned or as a candidate no longer actively building | LOW | Even a simple "Updated July 2026" or recent commit-activity indicator helps |
| Clear tech stack per project | Recruiters skim for keywords/tools (Python, SQL, Airflow, Spark, etc.) | LOW | Should be scannable (tags/badges), not buried in prose |
| Active GitHub link with real commit history | For DS/DE specifically, GitHub is treated as the credibility backstop — recruiters click through to verify the portfolio isn't just marketing copy | LOW (just a link) | The portfolio site should link out to GitHub; GitHub itself must actually show ongoing activity, not one big initial commit dump |

### Differentiators (Competitive Advantage)

These are what separate a portfolio that gets remembered from one that blends into "yet another candidate."

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Business-impact framing per project ("Reduced X by Y%", cost savings, decision enabled) | Recruiters explicitly say they want outcome-first framing, not just methodology; this is the single most-cited gap between average and standout portfolios | LOW-MEDIUM | Pure content/writing work, not a technical feature — highest ROI item in this whole list |
| End-to-end project narrative (problem → data → method → deployment/monitoring → impact) | Signals "can ship," not just "can model in a notebook" — cited repeatedly as what separates junior from senior-reading portfolios | MEDIUM | Especially relevant for the hybrid DS/DE positioning: showing pipeline + model + outcome in one story is rare and valuable |
| Architecture diagrams for data engineering projects (Mermaid.js, Excalidraw, simple draw.io export) | DE hiring managers want to see system design thinking, not just a list of tools used | LOW-MEDIUM | Static image/SVG is enough — no interactivity required |
| Embedded/linked interactive dashboard or live demo (Streamlit, Dash, Tableau Public, Looker Studio, observable notebook) | Turns a passive read into a "try it yourself" moment; frequently cited as what makes a DS portfolio memorable | MEDIUM-HIGH | Given GitHub Pages is static hosting, this typically means *linking out* to an externally-hosted demo (e.g., Streamlit Community Cloud, HF Spaces) rather than hosting it in-repo — plan for this as an external link, not an embedded backend |
| Custom, polished data visualizations (not default matplotlib/library styling) | Cited explicitly as a differentiator — visual polish signals attention to communication, a core DS skill | LOW-MEDIUM | Applies to screenshots/plots embedded in case studies |
| GitHub activity/contribution embed or link-out | Reinforces "this person ships continuously," complements the case studies with an at-a-glance recency signal | LOW | Can be as simple as a GitHub stats badge/image or a direct link; avoid over-engineering a live widget |
| Quantified scale details for DE projects (rows processed, run frequency, latency, cost) | Distinguishes "built a toy pipeline" from "built something that resembles production" | LOW | Pure content addition to case study template |
| Resume/CV PDF download | Convenience for recruiters who want an offline artifact to forward internally | LOW | Should stay in sync with the on-site experience section |
| Technical writing / blog (deferred to v2 per PROJECT.md) | Blog posts explaining reasoning are one of the highest-signal differentiators found in research (shows communication skill + depth), but explicitly out of scope for v1 | HIGH (ongoing) | Correctly deferred — don't let this leak into v1 scope; note as strong v2 candidate |
| Video walkthrough / short Loom-style demo of a flagship project | Multimedia portfolios (cited example: Tim Hopper's site) are memorable precisely because they don't read like every other list-of-projects page | MEDIUM | High effort-to-maintain; best reserved for 1 flagship project rather than all of them |
| Domain-specific / self-sourced datasets (APIs, scraping, government open data) rather than pre-cleaned Kaggle CSVs | Signals real-world data-wrangling skill (60-80% of real DS work is cleaning/integration) — explicitly named as a top differentiator | Varies (project-level, not site-level) | This is a *project selection* concern more than a *website feature* — worth flagging to the user even though it's about project content, not site architecture |

### Anti-Features (Commonly Present, Actively Hurt Credibility)

These are documented across multiple sources as things that actively damage a data portfolio's credibility — either as content choices or site behaviors to avoid.

| Anti-Feature | Why It Seems OK / Gets Included | Why It's Problematic | Alternative |
|--------------|----------------------------------|------------------------|-------------|
| Generic tutorial/toy projects as flagship work (Titanic, Iris, MNIST, Boston Housing, plain NYC Taxi) | Easy, well-documented starter datasets; everyone learns on them | Signals "followed a tutorial," not "did data science"; hiring reviewers report treating these as an automatic reject signal since they've seen the identical notebook hundreds of times | Use the user's own real/hybrid DS+DE projects (per PROJECT.md, these already exist); if a public dataset is used, pick messy/unconventional ones and go far beyond the standard tutorial treatment |
| Project descriptions that only list what was done / tools used, with no "why" | Feels like sufficient documentation ("I used XGBoost, got 92% accuracy") | Doesn't show reasoning or business understanding — this is exactly what senior reviewers say they filter for; a model with no context reads as "can follow a recipe" | Every case study must include problem framing and a decision-rationale (why this approach/tool over alternatives) — see Case Study Framing below |
| Ending case study at a model metric (accuracy/F1/RMSE) with no business translation | Feels like the "proof point" of technical skill | Recruiters explicitly say accuracy alone doesn't demonstrate practical value; project reads as a Kaggle leaderboard entry rather than a solved problem | Always close with impact/action: what changed, what decision was enabled, what would happen next in production |
| Broken links (dead repo links, expired demo URLs, stale LinkedIn/GitHub links) | Low priority to check once the site is "done" | Directly and repeatedly cited as one of the fastest ways to lose credibility; signals poor operational discipline | Treat link-checking as ongoing maintenance; consider a simple periodic manual check or an automated link-checker in CI given GitHub Pages hosting |
| Stale portfolio with no updates for 12-18+ months and no recent projects | Building it once feels like "done" | Reads as an abandoned side-project or a candidate no longer active; explicitly flagged in developer-portfolio audits (~44% of reviewed portfolios had this problem) | Bake in a lightweight update cadence (e.g., add/revise one project per quarter); surface a visible "last updated" indicator |
| Overloading with too many shallow projects (10+ notebooks, all similar) | Feels like "more evidence of skill" | Recruiters explicitly prefer 3-5 deep, varied projects over a long shallow list; repetition across similar analyses also reads badly | Curate hard — pick projects that each demonstrate a distinct skill/domain, cut or archive the rest |
| Real-time/overly interactive site features hosted as if this were a live web app (auth, comments, admin dashboard, dynamic backend) | Feels modern/impressive | Explicitly out of scope per PROJECT.md constraints (static site, GitHub Pages, no backend); building this would fight the hosting choice and add unnecessary complexity | Any "interactive" differentiator (dashboards, demos) should be an externally-hosted link-out, not a feature built into the static site itself |
| Unannotated screenshots/mockups of dashboards or notebooks dropped into a case study with no caption | Feels like "showing the work" | Reviewer has to guess what to look at or why it matters — same failure mode documented in UX portfolio reviews | Always caption/annotate what the visual shows and why it's included |
| Case study describing a finished product with no development narrative (just "here's the live link") | Minimal-effort way to "prove" the project is real | Gives no insight into process/reasoning, which is what reviewers say they actually care about; also risks the live artifact having evolved and no longer matching the description | Pair every live link/demo with a written case study — link is supplementary evidence, not a replacement for narrative |

## Case Study Framing (Problem → Approach → Impact)

Research converges strongly on a specific narrative structure for project case studies, applicable to both DS and DE projects:

1. **Problem statement (2-3 sentences, concrete not vague)** — State the situation in specific, quantified terms where possible ("Manual reporting took 6 hours/week and had a 2-day data lag" beats "reporting was slow"). This is the "why does this project exist" framing that recruiters explicitly say is missing from most portfolios.
2. **Approach / methodology** — Explain the reasoning behind decisions (why this model, why this architecture, why these tools, what trade-offs were considered), not just a list of steps. For DE projects, include an architecture diagram (Mermaid/Excalidraw is sufficient — no interactivity needed).
3. **Scale/complexity signals** — For DE work: data volume, run frequency, latency, cost. For DS work: dataset size/messiness, validation approach, what made the data hard to work with.
4. **Impact / outcome, stated first or emphasized last** — Lead or close with the measurable or qualitative result: cost saved, time saved, decision enabled, accuracy in context of a business threshold, or (if impact wasn't measurable) a clear articulation of what would be measured in production. Never end at a bare technical metric.
5. **Tech stack, scannable** — Tags/badges for tools used, so a skimming recruiter can pattern-match keywords quickly.

This structure should be the enforced template for every project case study page.

## Feature Dependencies

```
[Project case study pages]
    └──requires──> [Projects gallery/list] (gallery is the entry point to case studies)
    └──requires──> [Case study narrative template] (problem→approach→impact structure)

[Business-impact framing] ──enhances──> [Project case study pages]
[Architecture diagrams] ──enhances──> [Project case study pages] (esp. DE projects)
[GitHub activity link/embed] ──enhances──> [About / value proposition section]
[Interactive dashboard/live demo link] ──enhances──> [Project case study pages] (optional per-project)

[Technical writing / blog] ──conflicts──> [v1 scope] (explicitly deferred per PROJECT.md — do not build in v1)
[Dynamic backend features (auth, comments, CMS)] ──conflicts──> [GitHub Pages static hosting constraint]
```

### Dependency Notes

- **Case study pages require a narrative template first:** Building case study pages without first locking the problem→approach→impact structure risks inconsistent, weaker write-ups per project. The template should be decided before content is drafted, not discovered ad hoc per project.
- **Business-impact framing enhances case studies, doesn't require new site features:** This is almost entirely a content/writing concern, which means it's cheap to fix and should be prioritized early, even before visual polish.
- **Interactive demos conflict with the static-hosting constraint if built in-repo:** Any "live demo" differentiator must be an external link (Streamlit Community Cloud, Hugging Face Spaces, Tableau Public, Looker Studio, Observable) rather than something hosted inside the GitHub Pages site itself.
- **Blog conflicts with v1 scope:** Already correctly deferred in PROJECT.md. Worth reinforcing here since it's one of the most frequently cited high-value differentiators in research — strong candidate to prioritize immediately in a v2 milestone.

## MVP Definition

### Launch With (v1)

Minimum viable product — matches and slightly extends the Active Requirements already listed in PROJECT.md.

- [ ] About / value proposition section (hybrid DS+DE identity stated clearly) — recruiters need this in seconds
- [ ] Projects gallery — entry point to all case studies
- [ ] Case study pages using problem→approach→impact template for each project — this is the core value proposition per PROJECT.md
- [ ] Business-impact framing embedded in every case study (not a separate feature — a writing requirement for the template) — highest-ROI differentiator, nearly free to include
- [ ] Architecture diagram (static image) for DE-flavored case studies — cheap, high signal
- [ ] Experience/CV summary section — resume cross-reference
- [ ] Contact + links to LinkedIn/GitHub/Kaggle/email — hub function per PROJECT.md
- [ ] Responsive layout — non-negotiable baseline
- [ ] Tech-stack tags per project — scannable keyword signal
- [ ] Working links verified before each publish — prevent the #1 cited credibility killer

### Add After Validation (v1.x)

Features to add once core is working and content is live.

- [ ] Resume/CV PDF download — trigger: once experience section content is finalized
- [ ] GitHub activity badge/link-out on About page — trigger: once GitHub repos are curated and clean
- [ ] Link-out to 1 externally-hosted interactive demo (Streamlit/HF Spaces) for the strongest project — trigger: pick the single best DS project as a flagship
- [ ] "Last updated" indicator — trigger: once a real update cadence is established

### Future Consideration (v2+)

Features to defer until v1 is live and validated.

- [ ] Technical blog/writing — deferred per PROJECT.md; highest-value differentiator per research but ongoing content commitment, correctly excluded from v1
- [ ] Video walkthroughs of flagship projects — high production effort, best done once flagship projects are finalized and stable
- [ ] Additional embedded dashboards per project (beyond one flagship) — diminishing returns vs. effort for v1

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| About/value proposition | HIGH | LOW | P1 |
| Projects gallery | HIGH | LOW | P1 |
| Case study pages (problem→approach→impact) | HIGH | MEDIUM | P1 |
| Business-impact framing in case studies | HIGH | LOW | P1 |
| Experience/CV summary | MEDIUM | LOW | P1 |
| Contact/links hub | HIGH | LOW | P1 |
| Responsive layout | HIGH | LOW-MEDIUM | P1 |
| Working-link hygiene | HIGH | LOW | P1 |
| Architecture diagrams (DE projects) | MEDIUM-HIGH | LOW-MEDIUM | P1/P2 |
| Tech-stack tags | MEDIUM | LOW | P1 |
| Resume PDF download | MEDIUM | LOW | P2 |
| GitHub activity link/embed | MEDIUM | LOW | P2 |
| One flagship interactive demo (external link) | MEDIUM-HIGH | MEDIUM-HIGH | P2 |
| "Last updated" indicator | LOW-MEDIUM | LOW | P2 |
| Blog/technical writing | HIGH (long-term) | HIGH (ongoing) | P3 (v2) |
| Video walkthroughs | MEDIUM | MEDIUM-HIGH | P3 (v2) |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

## Competitor / Reference Analysis

| Feature | Typical junior/generic DS portfolio | Strong DS/DE portfolio (per research) | Our Approach |
|---------|--------------------------------------|-----------------------------------------|--------------|
| Project selection | Titanic/Iris/MNIST, 8-10 shallow notebooks | 3-5 deep, varied, self-sourced/real projects | Use existing real hybrid DS+DE projects per PROJECT.md; avoid tutorial datasets |
| Case study depth | Link to repo/notebook only | Full narrative: problem, approach, trade-offs, impact | Enforce problem→approach→impact template site-wide |
| Impact framing | Ends at accuracy/metric | Leads or closes with business/operational outcome | Mandatory impact section in template |
| DE-specific signal | Tool list only ("used Airflow, Spark") | Architecture diagram + scale details (volume, frequency, cost) | Add diagram + scale fields to DE case studies |
| Recruiter verification | GitHub link with one big dump commit | GitHub link with visible ongoing activity | Link out to GitHub; keep repos genuinely active (a process/behavior note, not a site feature) |
| Site maintenance | Untouched for 1-2 years, broken links | Visibly current, working links | Bake in link-check habit and update cadence |
| Interactivity | Static PDF-style project pages only | External live-demo link for at least one flagship project | Defer to v1.x — one flagship demo link, hosted externally (Streamlit/HF Spaces) given GitHub Pages static constraint |

## Sources

- [BrainStation: How to Build a Data Science Portfolio](https://brainstation.io/career-guides/how-to-build-a-data-science-portfolio) — MEDIUM confidence (career-education site, general consensus)
- [Dataquest: Career guide — data science portfolio](https://www.dataquest.io/blog/career-guide-data-science-projects-portfolio/) — MEDIUM confidence
- [Tredence: 10 Must-Haves in Your Data Science Portfolio](https://www.tredence.com/blog/data-science-portfolio) — MEDIUM confidence
- [Careery: Data Analyst Portfolio Projects That Actually Get You Hired (2026)](https://careery.pro/blog/data-analyst-careers/data-analyst-portfolio-projects) — MEDIUM confidence
- [Towards Data Science: The Portfolio that Got Me a Data Scientist Job](https://towardsdatascience.com/the-portfolio-that-got-me-a-data-scientist-job-513cc821bfe4/) — MEDIUM confidence (practitioner first-hand account)
- [InfluenceFlow: Guide to Portfolio Case Studies (2026)](https://influenceflow.io/resources/guide-to-portfolio-case-studies-showcase-your-work-land-more-opportunities-in-2026/) — MEDIUM confidence
- [KDnuggets: 5 Portfolio Mistakes That Keep Data Scientists From Getting Hired](https://www.kdnuggets.com/5-portfolio-mistakes-that-keep-data-scientists-from-getting-hired) — MEDIUM-HIGH confidence (established DS industry publication, fetched and read in full)
- [Medium: Don't Sink Your Data Analysis Portfolio with the Titanic Project](https://medium.com/@benjamin.BA/dont-sink-your-data-analysis-portfolio-with-the-titanic-project-64fadad604e5) — LOW-MEDIUM confidence (single-author opinion, but corroborated by multiple other sources)
- [Medium: 5 Data Science Projects to Ruin Your Portfolio](https://medium.com/disruptive-innovation-journal/5-data-science-projects-to-ruin-your-portfolio-11885ba838cc) — LOW-MEDIUM confidence, corroborated
- [Pipeline2Insights: The Data Engineer's GitHub Portfolio (2026 Edition)](https://pipeline2insights.substack.com/p/how-to-create-data-engineering-data-engineers-github-portfolio-in-2026) — MEDIUM confidence (DE-specific practitioner guide, fetched and read in full)
- [GitHub topic: data-science-portfolio](https://github.com/topics/data-science-portfolio) — reference examples, LOW confidence (aggregation, not analysis)
- [CareerFoundry: 9 Data Analytics Portfolio Examples (2025)](https://careerfoundry.com/en/blog/data-analytics/data-analytics-portfolio-examples/) — MEDIUM confidence (concrete named examples: Ger Inberg's R-Shiny apps, Naledi's blog+portfolio combo, Tim Hopper's multimedia portfolio)
- [Designfolio: I Reviewed 500+ Portfolios: Tips from Ex-Head of Design](https://designfolio.substack.com/p/portfolio-tips-ux) — MEDIUM confidence (cross-domain but directly relevant to broken-links/case-study anti-patterns; large sample size cited)
- [Hakia: Developer Portfolio Guide 2026](https://hakia.com/skills/building-portfolio/) — LOW-MEDIUM confidence (cites the "44% broken links / stale portfolio" stat, general developer audience not DS/DE-specific)

---
*Feature research for: Data Scientist / Data Engineer personal portfolio website*
*Researched: 2026-07-03*
