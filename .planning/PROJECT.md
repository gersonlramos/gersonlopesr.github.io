# Portfólio — Cientista de Dados & Engenheiro de Dados

## What This Is

Um site de portfólio pessoal, hospedado no GitHub Pages, para um profissional pleno (2-5 anos de experiência) que atua de forma híbrida como Cientista de Dados e Engenheiro de Dados. O site existe para construir autoridade e visibilidade no mercado — mostrando projetos reais (mix de DS e DE) através de case studies bem documentados, funcionando também como hub que conecta a outros perfis profissionais (LinkedIn, Kaggle, etc.).

## Core Value

Os case studies de projetos precisam comunicar claramente a capacidade técnica e o raciocínio por trás das decisões — não apenas "o que foi feito", mas "por que" e "qual foi o impacto". Se isso falhar, o portfólio não cumpre seu objetivo de vender as capacidades do profissional.

## Requirements

### Validated

(Nenhum ainda — construir para validar)

### Active

- [ ] Visitante consegue entender rapidamente quem é o profissional e sua proposta de valor (seção "Sobre")
- [ ] Visitante consegue navegar por uma galeria/lista de projetos
- [ ] Visitante consegue abrir um case study detalhado de cada projeto (problema, abordagem, tecnologias, resultado/impacto)
- [ ] Visitante consegue ver a trajetória profissional/experiência (resumo tipo CV)
- [ ] Visitante consegue entrar em contato ou encontrar links para outros perfis (LinkedIn, GitHub, Kaggle, e-mail)
- [ ] Site é responsivo (funciona bem em mobile e desktop)
- [ ] Site é hospedado via GitHub Pages

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
| Hospedar via GitHub Pages | Já decidido pelo usuário — gratuito, integrado ao GitHub onde os projetos já vivem | — Pending |
| Estrutura v1: Sobre + Projetos + Experiência + Contato | Cobre o essencial para "vender" capacidades sem inflar escopo; blog fica para v2 | — Pending |
| Blog adiado para v2 | Foco do v1 é mostrar projetos existentes rapidamente; blog é trabalho contínuo separado | — Pending |
| Idioma do conteúdo: Inglês | Assunção do Claude (usuário não respondeu à pergunta) — maximiza alcance internacional, mas pode ser trocado facilmente | ⚠️ Revisit |
| Stack: Astro + MDX + Tailwind v4 | Recomendação da pesquisa (STACK.md) — case studies tipados, deploy oficial via GitHub Actions. Assunção do Claude, não confirmada | ⚠️ Revisit |
| Diferenciais v1: diagramas de arquitetura (DE), 1 demo externo interativo, CV em PDF | Baixo custo/alto valor segundo FEATURES.md; assunção do Claude na ausência de resposta | ⚠️ Revisit |

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

---
*Last updated: 2026-07-03 after initialization*
