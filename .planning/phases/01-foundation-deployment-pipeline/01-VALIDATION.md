---
phase: 1
slug: foundation-deployment-pipeline
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-07-03
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None currently (greenfield project, no test runner installed) |
| **Config file** | none — see Wave 0 |
| **Quick run command** | `npm run build` (runs `astro check` + `astro build`; fails loudly on broken Content Collections schema, invalid MDX, or Astro 7's stricter HTML parsing errors) |
| **Full suite command** | `npm run build` locally, plus a post-deploy live-URL smoke check: `npx linkinator https://gersonlopesr.github.io --recurse` (no install required, run via `npx`) |
| **Estimated runtime** | ~30 seconds (build) + ~15 seconds (linkinator smoke check) |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build` + push to `main` + verify the GitHub Actions workflow completes both `build` and `deploy` jobs successfully
- **Before `/gsd:verify-work`:** Full suite must be green — build green + live URL smoke check via `linkinator` + manual nav/footer/contact-link visual check on the actual deployed URL (local build success alone is not sufficient per PITFALLS.md)
- **Max feedback latency:** ~45 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-xx | 01 | 0 | SETUP-01 | build/smoke | `npm run build` (local/pre-push check); live validation = GitHub Actions run status (`build` + `deploy` jobs both green) | ❌ W0 | ⬜ pending |
| 01-01-xx | 01 | 0 | SETUP-02 | smoke (link check) | `npx linkinator https://gersonlopesr.github.io --recurse --skip "linkedin.com,github.com/gersonlopesr"` | ❌ W0 | ⬜ pending |
| 01-01-xx | 01 | 0 | SETUP-03 | manual / smoke | Manual: view-source/browser check confirming `<nav>`/`<footer>` markup and links present on `/` after deploy. Optional: `curl -s https://gersonlopesr.github.io \| grep -o 'href="https://www.linkedin.com[^"]*"'` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `package.json` + Astro 7 project scaffold — no pre-existing test infrastructure since the project starts 100% from scratch (per CONTEXT.md D-03). This scaffold task **is** Wave 0 for this phase.
- [ ] No dedicated test framework (Playwright/Vitest) installed — for this phase's scope (deploy pipeline + layout shell, no interactive logic), `npm run build` + `linkinator` + manual visual check is proportionate. Revisit adding Vitest/Playwright in later phases (3+) if component-level testing becomes necessary — do not over-engineer test tooling here.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Persistent nav/footer with contact/profile links visible on every page | SETUP-03 | Visual layout correctness (element presence + placement) is not reliably assertable via a crude grep/curl check alone | Open the live deployed URL (`https://gersonlopesr.github.io`) in a browser after deploy; confirm nav and footer render on the home page and at least one other route, with working links to contact/LinkedIn/GitHub/Kaggle |
| Dark tech theme applied correctly | (supports SETUP-03 / overall Phase 1 goal) | Visual/aesthetic judgment, not automatable | Open the live deployed URL; confirm dark background theme renders as intended, no unstyled/broken CSS |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references (package.json/scaffold — confirmed above)
- [ ] No watch-mode flags
- [ ] Feedback latency < 45s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
