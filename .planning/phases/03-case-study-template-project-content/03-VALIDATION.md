---
phase: 3
slug: case-study-template-project-content
status: draft
nyquist_compliant: false
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
| 03-01-01 | 01 | 1 | PROJ-01, PROJ-02 | schema-enforced | `npm run build` | ❌ W0 (build is the gate) | ⬜ pending |
| 03-02-01 | 02 | 2 | PROJ-03, PROJ-04, PROJ-05 | schema-enforced + manual | `npm run build` | ❌ W0 | ⬜ pending |
| 03-03-01 | 03 | 3 | PROJ-06 | manual | Manual: visit demoUrl, confirm HTTP 200 | — | ⬜ pending |

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
- [ ] `nyquist_compliant: true` set in frontmatter (set by planner once plans are finalized)

**Approval:** pending
