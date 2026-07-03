---
phase: 2
slug: core-narrative-pages
status: approved
nyquist_compliant: true
created: 2026-07-03
---

# Phase 2 - Validation Strategy

## Commands

- Quick check: `npm run build`
- Live smoke: `npx linkinator https://gersonlramos.github.io/gersonlopesr.github.io --recurse --skip "linkedin.com,kaggle.com,github.com/gersonlopesr"`

## Required Checks by Requirement

- NARR-01:
  - Hero/About text includes explicit hybrid DS+DE positioning.
- NARR-02:
  - Experience section is visible and contains role/period/impact information.
- NARR-03:
  - Resume download link points to a PDF file served with HTTP 200.
- NARR-04:
  - Contact and profile links (LinkedIn, GitHub, Kaggle, email) are reachable from any page via persistent shell.

## Deployment Checks

- Latest Actions run on `main` has build+deploy success.
- Live homepage returns 200.
- Live unknown route returns custom 404 page with HTTP 404.
- No internal asset 404s from served HTML.
