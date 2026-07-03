# Phase 1: Foundation & Deployment Pipeline - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-03
**Phase:** 01-foundation-deployment-pipeline
**Areas discussed:** GitHub & domínio, Idioma do conteúdo, Identidade visual

---

## Gray Area Selection

| Option | Description | Selected |
|--------|-------------|----------|
| Stack técnica | Confirm Astro+MDX+Tailwind vs Jekyll vs Quarto | |
| GitHub & domínio | GitHub username/repo, custom domain timing | ✓ |
| Idioma do conteúdo | English vs Portuguese vs bilingual | ✓ |
| Identidade visual | Site name/tagline, color scheme/theme | ✓ |

---

## GitHub & Domínio

| Option | Description | Selected |
|--------|-------------|----------|
| gersonlopesr | GitHub username based on user's email | ✓ |
| Outro username | User types a different username | |

**User's choice:** gersonlopesr

| Option | Description | Selected |
|--------|-------------|----------|
| URL padrão por enquanto (Recomendado) | username.github.io, no DNS/HTTPS wait; custom domain deferred to v2 | ✓ |
| Já tenho um domínio | Configure custom domain now in Phase 1 | |

**User's choice:** URL padrão por enquanto (Recomendado)

| Option | Description | Selected |
|--------|-------------|----------|
| 100% do zero | No existing repo/code | ✓ |
| Já existe algo | Prior repo/draft to consider | |

**User's choice:** 100% do zero

**Notes:** Repo will be `gersonlopesr.github.io` (User Pages repo). Custom domain formally deferred to v2 (EXP-01, already in REQUIREMENTS.md).

---

## Idioma do Conteúdo

| Option | Description | Selected |
|--------|-------------|----------|
| Inglês (Recomendado) | Max international reach, matches PROJECT.md assumption | |
| Português | Focus on Brazilian/Lusophone market | |
| Bilíngue (EN primário + PT) | More maintenance, covers both audiences from v1 | ✓ (initial) |

**User's initial choice:** Bilíngue (EN primário + PT)

| Option | Description | Selected |
|--------|-------------|----------|
| Majoritariamente em português | Existing material needs translation | |
| Já tenho versões em inglês | CV/LinkedIn already in English | ✓ |
| Misto | Mixed existing material | |

**User's choice:** Já tenho versões em inglês

**Follow-up — bilingual structure:**

| Option | Description | Selected |
|--------|-------------|----------|
| URLs separadas /en/ e /pt/ (Recomendado) | Full bilingual routing, best SEO for both languages | |
| Um único idioma padrão no v1, PT depois | English-only v1, Portuguese as v2 addition — reduces scope now | ✓ |
| Deixa eu explicar | User provides own structure idea | |

**User's final choice:** Um único idioma padrão no v1, PT depois

**Notes:** User reconsidered after the bilingual-structure follow-up — settled on **English-only for v1**, Portuguese deferred to v2. This resolves the language blocker flagged in STATE.md/PROJECT.md.

---

## Identidade Visual

| Option | Description | Selected |
|--------|-------------|----------|
| Seu nome completo | Just the name, personal approach | |
| Nome + tagline | Name + role tagline in header/title | ✓ |
| Deixa eu explicar | User provides own name/tagline | |

**User's choice:** Nome + tagline

| Option | Description | Selected |
|--------|-------------|----------|
| Escuro (dark tech) | Dark background, modern/technical feel | ✓ |
| Claro minimalista | Light background, clean professional | |
| Ambos (toggle claro/escuro) | Visitor chooses, more implementation work | |

**User's choice:** Escuro (dark tech)

**Follow-up — exact name/tagline text:**

| Option | Description | Selected |
|--------|-------------|----------|
| Gerson Lopes — Data Scientist & Data Engineer | Direct name + hybrid role tagline | ✓ |
| Deixa eu escrever exatamente | User provides exact custom text | |

**User's choice:** Gerson Lopes — Data Scientist & Data Engineer

**Notes:** Confirmed exact site title text. Dark theme only, no toggle for v1.

---

## Claude's Discretion

- Exact CI/CD workflow implementation details (GitHub Actions steps)
- Exact color palette values within "dark tech" direction
- Font choices, spacing, visual details not explicitly specified
- Internal repo/file structure within Astro conventions

## Deferred Ideas

- Custom domain + HTTPS — v2 (EXP-01)
- Portuguese/bilingual content — v2
- Light/dark theme toggle — not selected, dark-only for v1

## Stack (not discussed)

User did not select "Stack técnica" as an area to discuss — the research-recommended Astro + MDX + Tailwind v4 stack from PROJECT.md was not explicitly revisited or re-confirmed, but also not objected to.
