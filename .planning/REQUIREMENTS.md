# Requirements: Portfólio — Cientista de Dados & Engenheiro de Dados

**Defined:** 2026-07-03
**Core Value:** Os case studies de projetos precisam comunicar claramente a capacidade técnica e o raciocínio por trás das decisões — não apenas "o que foi feito", mas "por que" e "qual foi o impacto".

## v1 Requirements

### Setup & Deploy

- [ ] **SETUP-01**: Site é construído com Astro + MDX + Tailwind e faz deploy automático para GitHub Pages via GitHub Actions
- [ ] **SETUP-02**: Site é servido em uma URL `username.github.io` funcional, sem paths quebrados
- [ ] **SETUP-03**: Site tem layout base persistente com navegação e rodapé contendo links de contato/perfis

### Narrativa (Sobre / Experiência / Contato)

- [x] **NARR-01**: Visitante consegue ler uma seção Sobre/hero declarando o posicionamento híbrido Cientista de Dados + Engenheiro de Dados
- [x] **NARR-02**: Visitante consegue ver um resumo da experiência profissional (estilo CV)
- [x] **NARR-03**: Visitante consegue baixar um CV/currículo em PDF
- [x] **NARR-04**: Visitante encontra informações de contato e links para perfis externos (LinkedIn, GitHub, Kaggle) a partir de qualquer página

### Projetos & Case Studies

- [x] **PROJ-01**: Visitante consegue navegar por uma galeria/lista de todos os projetos com tags de tecnologia visíveis
- [x] **PROJ-02**: Visitante consegue abrir uma página de case study dedicada para cada projeto, seguindo o template problema→abordagem→impacto
- [x] **PROJ-03**: Cada case study declara explicitamente o impacto de negócio/prático (não apenas uma métrica técnica)
- [x] **PROJ-04**: Case studies de Engenharia de Dados incluem um diagrama estático de arquitetura/pipeline
- [x] **PROJ-05**: Cada case study linka para o código/notebook completo no GitHub em vez de embutí-lo
- [x] **PROJ-06**: Pelo menos um projeto "flagship" linka para uma demo interativa hospedada externamente (ex: Streamlit Community Cloud, Hugging Face Spaces)

### Polimento & Lançamento

- [x] **POLISH-01**: Site é responsivo e usável em mobile e desktop
- [x] **POLISH-02**: Imagens são otimizadas (comprimidas, dimensionadas corretamente) para carregamento rápido
- [ ] **POLISH-03**: Todos os links do site são verificados como funcionais antes do lançamento
- [ ] **POLISH-04**: Site tem tags básicas de SEO (meta description, Open Graph, sitemap)

## v2 Requirements

### Conteúdo Contínuo

- **BLOG-01**: Visitante consegue ler posts/artigos técnicos em uma seção de blog
- **BLOG-02**: Visitante consegue ver vídeos curtos demonstrando os projetos flagship

### Expansão

- **EXP-01**: Domínio customizado configurado com HTTPS
- **EXP-02**: Analytics leve (GoatCounter ou Plausible) instalado
- **EXP-03**: Demos interativas adicionais além do projeto flagship único do v1

## Out of Scope

| Feature | Reason |
|---------|--------|
| Blog/artigos técnicos no v1 | Adiado para v2 para não inflar escopo inicial — foco do v1 é mostrar projetos existentes rapidamente |
| Autenticação/área restrita | Portfólio é 100% público, não há necessidade de login |
| CMS/painel administrativo | Site estático — conteúdo é atualizado editando arquivos diretamente |
| Comentários/interatividade social no site | Interação acontece fora do site (LinkedIn, e-mail) |
| Projetos "toy" genéricos (Titanic/Iris/MNIST) como case study | Identificado na pesquisa como o principal fator de perda de credibilidade — case studies devem usar projetos reais/autorais |
| Embutir notebooks brutos (nbconvert) nas páginas | Quebra performance/estilo — case studies usam narrativa curada + imagens exportadas, com link para o notebook completo |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| SETUP-01 | Phase 1 | Pending |
| SETUP-02 | Phase 1 | Pending |
| SETUP-03 | Phase 1 | Pending |
| NARR-01 | Phase 2 | Complete |
| NARR-02 | Phase 2 | Complete |
| NARR-03 | Phase 2 | Complete |
| NARR-04 | Phase 2 | Complete |
| PROJ-01 | Phase 3 | Complete |
| PROJ-02 | Phase 3 | Complete |
| PROJ-03 | Phase 3 | Complete |
| PROJ-04 | Phase 3 | Complete |
| PROJ-05 | Phase 3 | Complete |
| PROJ-06 | Phase 3 | Complete |
| POLISH-01 | Phase 4 | Complete |
| POLISH-02 | Phase 4 | Complete |
| POLISH-03 | Phase 4 | Pending |
| POLISH-04 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 17 total
- Mapped to phases: 17/17 ✓
- Unmapped: 0

---
*Requirements defined: 2026-07-03*
*Last updated: 2026-07-03 after roadmap creation — 4 phases, full v1 coverage confirmed*
