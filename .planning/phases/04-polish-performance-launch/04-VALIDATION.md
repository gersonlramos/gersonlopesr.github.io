---
phase: 4
slug: polish-performance-launch
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-07-04
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None (consistent with Phases 1-3) — `npm run build` is the validation gate |
| **Config file** | none — Wave 0 not required |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build` + `npx linkinator <url> --recurse --status-code "403:warn" --status-code "999:warn"` + manual visual/meta-tag spot checks |
| **Estimated runtime** | ~30-60 seconds (build + linkinator crawl) |

---

## Sampling Rate

- **After every task commit:** `npm run build`
- **After every plan wave:** `npm run build` + the relevant spot check (linkinator for link tasks, `curl | grep` for SEO tasks, manual resize for Nav task)
- **Before `/gsd:verify-work`:** Full `npm run build` + full-site `linkinator --recurse` against the live URL + manual meta-tag/OG verification + comprehensive human-verify checkpoint covering the entire v1 site
- **Max feedback latency:** ~60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-T1 | 01 | 1 | POLISH-01 | manual (visual) | `npm run build` (regression) + manual resize test at 375/390/768/1024px | ❌ W0 | ⬜ pending |
| 04-02-T1 | 02 | 1 | POLISH-02 | scripted | one-off Node/Sharp recompression script + `ls -la` size check | ❌ W0 | ⬜ pending |
| 04-03-T1 | 03 | 1 | POLISH-04 | scripted | `npm run build && grep -c 'sitemap-index' dist/sitemap-index.xml` | ❌ W0 | ⬜ pending |
| 04-04-T1 | 04 | 2 | POLISH-03 | automated | `npx linkinator <live-url> --recurse --status-code "403:warn" --status-code "999:warn"` (exit 0) | ✓ (linkinator is the tool) | ⬜ pending |
| 04-05-T1 | 05 | 3 | POLISH-01 through POLISH-04 (full launch) | manual (checkpoint:human-verify) | Comprehensive manual verification across all 4 phases | — | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No test framework install needed — every check is either the existing `npm run build` gate, a one-off Node/Sharp script, or a CLI tool invocation (`linkinator`) with a pass/fail exit code.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Nav and page sections don't overflow/clip at mobile widths | POLISH-01 | No automated viewport/visual-regression tooling in this project; not worth adding a framework for one check | Resize browser (or use devtools device toolbar) at 375px, 390px, 768px, 1024px on homepage, gallery, and a case study page; confirm no horizontal scroll or clipped nav links |
| Meta description and Open Graph tags render correctly when shared | POLISH-04 | Social-preview rendering isn't mechanically testable without a live share/crawler | View page source on homepage and one case study page; confirm `<meta name="description">` and `og:title`/`og:description`/`og:image` tags are present with real (non-placeholder) content |
| Full v1 site is launch-ready across all 4 phases | POLISH-01 through 04 (final gate) | This is a holistic, cross-phase human judgment call, not a single mechanical check | Human walks the entire live site (home, projects gallery, all 5 case studies, resume downloads, footer links) end to end per the 04-05 checkpoint script |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify (`npm run build`, scripted checks, or `linkinator`) or are explicitly manual-only per the table above
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references (none needed — build/script/CLI gates suffice)
- [x] No watch-mode flags
- [x] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter (set by planner once plans are finalized)

**Approval:** pending
