# Phase 2: Core Narrative Pages - Research

## Summary

Phase 2 should prioritize information clarity over interaction complexity. The fastest credible implementation is a content-first single-page narrative on `index.astro`, preserving the persistent shell from Phase 1 and extending navigation with section anchors.

## Implementation Direction

1. Use anchored sections (`#about`, `#experience`, `#contact`) on the home page for quick scanning.
2. Keep Footer as global contact fallback, but ensure contact/profile links are real and non-placeholder.
3. Store experience entries in a dedicated data module to keep page markup maintainable.
4. Treat resume PDF as a static asset in `public/` and expose a clear download link.

## Risks and Mitigations

- Risk: project-pages base path regressions when adding links.
  - Mitigation: all internal links derive from `import.meta.env.BASE_URL`.
- Risk: missing/invalid resume PDF blocks NARR-03.
  - Mitigation: checkpoint plan requiring provided PDF or approved conversion.
- Risk: placeholder LinkedIn/Kaggle links violate NARR-04 intent.
  - Mitigation: checkpoint to confirm exact profile URLs before final deploy verification.

## Verification Focus

- Build remains green after each plan.
- Live page shows About + Experience + Contact narrative.
- Resume link returns 200 and downloads PDF.
- Footer/contact links are real and reachable.
- Custom 404 behavior and asset integrity remain unchanged.

---

_Phase: 02-core-narrative-pages_
_Research date: 2026-07-03_
