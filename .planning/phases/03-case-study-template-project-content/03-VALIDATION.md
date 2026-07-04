---
phase: 3
slug: case-study-template-project-content
status: planned
nyquist_compliant: true
wave_0_complete: false
created: 2026-07-04
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None currently configured (no Jest/Vitest/Playwright in `package.json`) |
| **Config file** | none — Wave 0 not required, build itself is the gate |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build` (static content site — build IS the validation suite; type-checks the Zod content-collection schema against every `.mdx` file) |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build` + manual visual pass (`npm run preview`) over gallery and case study pages
- **Before `/gsd:verify-work`:** Full manual link-check pass (repoUrl/notebookUrl/demoUrl for all 5 projects), build green
- **Max feedback latency:** ~30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-T1 | 01 | 1 | PROJ-01, PROJ-02 | schema-enforced | `npm run build` | ❌ W0 (build is the gate) | ⬜ pending |
| 03-01-T2 | 01 | 1 | PROJ-01 | schema-enforced | `npm run build` | ❌ W0 | ⬜ pending |
| 03-01-T3 | 01 | 1 | PROJ-02 | schema-enforced | `npm run build` | ❌ W0 | ⬜ pending |
| 03-02-T1 | 02 | 2 | PROJ-04 | file-exists | `test -f diagram.svg` | ❌ W0 | ⬜ pending |
| 03-02-T2 | 02 | 2 | PROJ-03, PROJ-04, PROJ-05, PROJ-06 | schema-enforced + manual | `npm run build` | ❌ W0 | ⬜ pending |
| 03-03-T1 | 03 | 2 | PROJ-03, PROJ-04, PROJ-05 | schema-enforced + manual | `npm run build` | ❌ W0 | ⬜ pending |
| 03-03-T2 | 03 | 2 | PROJ-03, PROJ-04, PROJ-05 | schema-enforced + manual | `npm run build` | ❌ W0 | ⬜ pending |
| 03-04-T1 | 04 | 2 | PROJ-03, PROJ-05 | schema-enforced + manual | `npm run build` | ❌ W0 | ⬜ pending |
| 03-04-T2 | 04 | 2 | PROJ-03, PROJ-05 | schema-enforced + manual | `npm run build` | ❌ W0 | ⬜ pending |
| 03-05-T1 | 05 | 3 | PROJ-01 through PROJ-06 (structural) | schema-enforced | `npm run build` | ❌ W0 | ⬜ pending |
| 03-05-T2 | 05 | 3 | PROJ-01 through PROJ-06 (content quality, PROJ-06 demo) | manual (checkpoint:human-verify) | Manual: visit demoUrl, confirm HTTP 200 + interactive | — | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No test framework install needed — the extended Zod schema (with `superRefine` enforcing PROJ-04's diagram requirement for DE-tagged projects) IS the automated gate, and `astro build` already type-checks it against every content file.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Every case study explicitly states business/practical impact, not just a technical metric | PROJ-03 | Content-quality judgment, not mechanically testable | Read each case study's Impact section; confirm it names a concrete outcome or practical capability, not a bare metric |
| Flagship demo link works and is interactive | PROJ-06 | Requires visiting an externally-hosted page outside this repo's build | Visit `demoUrl` for the flagship project, confirm HTTP 200 and interactive content loads |
| GitHub repo links are real, public, and non-empty | PROJ-05 | URL format is schema-enforced, but reachability/content isn't | Click through each `repoUrl`/`notebookUrl`, confirm it resolves to real, non-404 content |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify (`npm run build`) or are explicitly manual-only per the table above
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references (none needed — build is the gate)
- [x] No watch-mode flags
- [x] Feedback latency < 30s
- [x] `nyquist_compliant: true` set in frontmatter (set by planner once plans are finalized)

**Approval:** planner-finalized — 5 plans across 3 waves created 2026-07-04, matching this validation contract.
