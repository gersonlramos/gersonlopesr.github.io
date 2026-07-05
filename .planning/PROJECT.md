# Portfólio — Cientista de Dados & Engenheiro de Dados

## What This Is

Um site de portfólio pessoal, hospedado no GitHub Pages, para um profissional pleno (2-5 anos de experiência) que atua de forma híbrida como Cientista de Dados e Engenheiro de Dados. O site existe para construir autoridade e visibilidade no mercado — mostrando projetos reais (mix de DS e DE) através de case studies bem documentados, funcionando também como hub que conecta a outros perfis profissionais (LinkedIn, Kaggle, etc.).

## Core Value

Os case studies de projetos precisam comunicar claramente a capacidade técnica e o raciocínio por trás das decisões — não apenas "o que foi feito", mas "por que" e "qual foi o impacto". Se isso falhar, o portfólio não cumpre seu objetivo de vender as capacidades do profissional.

## Requirements

### Validated

- [x] Visitante consegue entender rapidamente quem é o profissional e sua proposta de valor (seção "Sobre") — Validated in Phase 02: core-narrative-pages
- [x] Visitante consegue ver a trajetória profissional/experiência (resumo tipo CV) — Validated in Phase 02: core-narrative-pages
- [x] Visitante consegue entrar em contato ou encontrar links para outros perfis (LinkedIn, GitHub, Kaggle, e-mail) — Validated in Phase 02: core-narrative-pages
- [x] Visitante consegue navegar por uma galeria/lista de projetos — Validated in Phase 03: case-study-template-project-content
- [x] Visitante consegue abrir um case study detalhado de cada projeto (problema, abordagem, tecnologias, resultado/impacto) — Validated in Phase 03: case-study-template-project-content
- [x] Site é responsivo (funciona bem em mobile e desktop) — Validated in Phase 04: polish-performance-launch
- [x] Site é hospedado via GitHub Pages — Validated in Phase 01: foundation-deployment-pipeline (live throughout, hardened/fully verified in Phase 04)

### Active

None — todos os requisitos v1 foram entregues e validados. v1 está lançado.

### Out of Scope

- Blog/artigos técnicos — considerado para v2, para não inflar o escopo inicial do v1
- Sistema de autenticação/área restrita — portfólio é 100% público, não há necessidade
- CMS ou painel administrativo — conteúdo é atualizado editando arquivos diretamente (site estático)
- Comentários/interatividade social no site — a interação acontece fora do site (LinkedIn, e-mail)

## Context

- Usuário já possui vários projetos prontos para apresentar, cobrindo tanto Ciência de Dados (modelagem, análise) quanto Engenharia de Dados (pipelines, infraestrutura de dados) — mix híbrido.
- Objetivo não é uma busca urgente por vaga, e sim construção de autoridade/visibilidade contínua no mercado.
- Nível de experiência: pleno (2-5 anos).
- Site deve funcionar como ponto central (hub) que direciona visitantes para outros perfis relevantes (LinkedIn, Kaggle, GitHub).

## Constraints

- **Hospedagem**: GitHub Pages — decisão já tomada pelo usuário, implica site estático (sem backend dinâmico)
- **Stack técnica**: Astro 6 + MDX + Tailwind CSS v4, deploy via GitHub Actions (`withastro/action`) — escolhido pela pesquisa por permitir case studies tipados (Content Collections) e melhor polimento visual. **Assunção do Claude (usuário não respondeu), fácil de trocar por Jekyll se preferir menos complexidade de build.**
- **Idioma**: Inglês — escolhido por padrão para maximizar alcance internacional, alinhado com o objetivo de "se mostrar para o mundo". **Assunção do Claude, não confirmada pelo usuário — fácil de revisitar/trocar para PT ou bilíngue.**

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Hospedar via GitHub Pages | Já decidido pelo usuário — gratuito, integrado ao GitHub onde os projetos já vivem | ✅ Entregue — site ao vivo em https://gersonlramos.github.io/gersonlopesr.github.io/ |
| Estrutura v1: Sobre + Projetos + Experiência + Contato | Cobre o essencial para "vender" capacidades sem inflar escopo; blog fica para v2 | ✅ Entregue nas Phases 02-03 |
| Blog adiado para v2 | Foco do v1 é mostrar projetos existentes rapidamente; blog é trabalho contínuo separado | ✅ Confirmado — fora do escopo v1, mantido como candidato v2 |
| Idioma do conteúdo: Inglês | Assunção do Claude (usuário não respondeu à pergunta) — maximiza alcance internacional, mas pode ser trocado facilmente | ⚠️ Revisit |
| Stack: Astro + MDX + Tailwind v4 | Recomendação da pesquisa (STACK.md) — case studies tipados, deploy oficial via GitHub Actions. Assunção do Claude, não confirmada | ⚠️ Revisit |
| Diferenciais v1: diagramas de arquitetura (DE), 1 demo externo interativo, CV em PDF | Baixo custo/alto valor segundo FEATURES.md; assunção do Claude na ausência de resposta | ✅ Entregue na Phase 03 (3 diagramas SVG estáticos, demo interativo do Analise_cenarios já ao vivo, CV em PDF na Phase 02) |
| Projetos de case study: Analise_cenarios (flagship), redshift-dbt, SQL_PySpark_Translator, Sales_Real_Time, Postgres-Clean-Process-SuperStore | Pesquisa da Phase 03 confirmou que os projetos mais fortes do currículo (Stellantis, Pottencial Seguros) são trabalho de cliente sem repositório público; os 5 escolhidos são reais, públicos e verificáveis no GitHub (github.com/gersonlramos) | ✅ Entregue na Phase 03 |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

## Current State

**v1 is launched.** Phase 04 (polish-performance-launch), the final phase of v1, is complete — the live site (https://gersonlramos.github.io/gersonlopesr.github.io/) is now responsive (Nav no longer overflows on mobile), has its images optimized (two oversized PNGs recompressed ~66-76% with no visible quality loss), includes baseline SEO infrastructure (meta description, Open Graph/Twitter tags, XML sitemap, robots.txt), and had a full site-wide link audit (linkinator, zero broken links). The user completed a comprehensive final walkthrough across all 4 phases (narrative, projects gallery, all 5 case studies, resume downloads, contact links, responsive/SEO fixes) and approved it as launch-ready. All 17 v1 requirements are validated. Next: `/gsd:complete-milestone` to close out v1, or begin scoping v2 (blog, custom domain, analytics, additional demos).

---
*Last updated: 2026-07-05 after Phase 04 completion — v1 launched*
