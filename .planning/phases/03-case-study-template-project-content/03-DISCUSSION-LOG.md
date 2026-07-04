# Phase 3: Case Study Template & Project Content - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-04
**Phase:** 03-case-study-template-project-content
**Areas discussed:** Project selection & scope, Gallery layout & tagging, Case study content sourcing

---

## Area Selection

| Option | Description | Selected |
|--------|-------------|----------|
| Project selection & scope | Which real DS/DE projects go into v1, how many, DS/DE mix | ✓ |
| Gallery layout & tagging | Grid vs list, filter by tech/category | ✓ |
| Case study content sourcing | Existing write-ups vs. draft from scratch | ✓ |
| Flagship interactive demo | Which project, does demo already exist | (not selected) |

---

## Project Selection & Scope

### Q: How many projects should Phase 3 turn into full case studies for v1?

| Option | Description | Selected |
|--------|-------------|----------|
| 3-5 projects | Research explicit: 3-5 deep, varied projects beat a long shallow list | ✓ |
| 1-2 projects | Smaller scope, faster to ship, but thinner evidence | |
| 6+ projects | More coverage, higher total authoring effort | |

**User's choice:** 3-5 projects

### Q: What's the DS/DE mix across the featured projects?

| Option | Description | Selected |
|--------|-------------|----------|
| Roughly even split | Matches hero's hybrid DS+DE positioning | ✓ |
| DS-leaning | Most projects modeling/analytics-focused | |
| DE-leaning | Most projects pipeline/infrastructure-focused | |

**User's choice:** Roughly even split

### Q: Do you already know which specific projects you want featured, or should that be worked out during planning/research?

| Option | Description | Selected |
|--------|-------------|----------|
| I have specific projects in mind | Lock concrete projects into scope now | |
| Decide during planning | Researcher proposes candidates from GitHub/PROJECT.md | ✓ |

**User's choice:** Decide during planning
**Notes:** Researcher should scan github.com/gersonlopesr and cross-reference resume-level project mentions from Phase 2 (Stellantis dashboard, GCP→AWS migration, Pottencial Seguros medallion architecture, AI Studio ML models, Pet Premium forecasting).

---

## Gallery Layout & Tagging

### Q: How should the projects gallery be laid out?

| Option | Description | Selected |
|--------|-------------|----------|
| Grid of cards | Thumbnail + title + tags + summary, matches dark tech theme | ✓ |
| Vertical list | More text-forward, denser rows | |

**User's choice:** Grid of cards

### Q: Should visitors be able to filter/sort the gallery?

| Option | Description | Selected |
|--------|-------------|----------|
| No filtering, single ordered list | Filtering adds JS for little payoff at 3-5 projects | ✓ |
| Simple category filter (DS/DE/All) | Lightweight, reinforces hybrid positioning | |
| Full tag filtering | Most flexible, most implementation work | |

**User's choice:** No filtering, single ordered list

---

## Case Study Content Sourcing

### Q: Do you already have written material for your projects, or does content need to be built mostly from scratch?

| Option | Description | Selected |
|--------|-------------|----------|
| Existing repos/notebooks to draw from | Research mines these, confirms framing with user | ✓ |
| Mostly from scratch | Narrative drafted collaboratively per project | |

**User's choice:** Existing repos/notebooks to draw from

### Q: Do you have architecture diagrams already for your DE projects, or do they need to be created?

| Option | Description | Selected |
|--------|-------------|----------|
| Need to be created | No diagrams exist yet; create Mermaid/Excalidraw static diagrams | ✓ |
| Already have diagrams | Just need export/embed as static images | |

**User's choice:** Need to be created

### Q: For business-impact framing — do you have concrete numbers in mind, or should research help identify/frame these?

| Option | Description | Selected |
|--------|-------------|----------|
| I have concrete numbers | User supplies specific metrics per project | |
| Research should help extract/frame it | Pull from repos/commits, propose framing for confirmation | ✓ |

**User's choice:** Research should help extract/frame it

---

## Claude's Discretion

- Exact routing/URL structure for case study pages
- Content Collection schema extensions (category, problem/approach/impact structure, diagram path, demo URL)
- Diagram tool choice (Mermaid vs. Excalidraw vs. draw.io export)
- Card visual design details within existing dark tech theme tokens

## Deferred Ideas

- Flagship interactive demo (PROJ-06) specifics — area not selected for discussion this round; still in phase scope, needs a decision before implementation.
- Full tag-based filtering — deferred in favor of no filtering at current project count.
- "Last updated" indicator / GitHub activity badge — noted in FEATURES.md as v1.x/v2 candidates.
