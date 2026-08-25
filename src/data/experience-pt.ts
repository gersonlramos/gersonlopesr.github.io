import type { ExperienceEntry } from './experience';

export const experiencePt: ExperienceEntry[] = [
  {
    role: 'Cientista de Dados / Engenheiro de Dados Cloud',
    organization: 'CompassUOL (cliente: Stellantis)',
    period: 'Nov 2024 — Atual',
    context: 'Arquitetando uma migração de grande escala do GCP para a AWS para um cliente automotivo empresarial, abrangendo ferramentas de acompanhamento e pipelines de dados.',
    impact: [
      'Liderei a descoberta em 9 domínios de negócio e mais de 3.000 objetos, mapeando componentes legados do GCP e estruturando o trabalho em épicos de entrega.',
      'Liderei a migração de pipelines de BigQuery e Cloud Functions para Snowflake e Apache Airflow na AWS EKS, preservando a precisão financeira e resolvendo dependências circulares.',
      'Construí um dashboard interativo de acompanhamento com Streamlit e Plotly, ETL pela API do Jira, autenticação baseada em Supabase e previsão de entrega por Monte Carlo.',
      'Padronizei configurações de segurança e infraestrutura em dezenas de DAGs do Airflow de vários domínios.',
    ],
  },
  {
    role: 'Cientista de Dados',
    organization: 'Outlier AI (via LATAM Coders)',
    period: 'Nov 2024 — Jun 2025',
    context: 'Colaborador em meio período em trabalhos aplicados com LLMs, desde pipelines de recuperação até frameworks de avaliação da qualidade do raciocínio dos modelos.',
    impact: [
      'Construí pipelines RAG e fluxos de fine-tuning de LLMs, incluindo geração de datasets sintéticos e scripts de avaliação de benchmarks.',
      'Contribuí para frameworks de testes automatizados que avaliam e melhoram a precisão do raciocínio dos modelos.',
    ],
  },
  {
    role: 'Engenheiro de Dados',
    organization: 'CompassUOL (projeto: Pottencial Seguros)',
    period: 'Dez 2024 — Nov 2025',
    context: 'Atuei na base analítica de uma seguradora, levando uma arquitetura lakehouse Medallion do desenho à otimização de performance.',
    impact: [
      'Implementei uma arquitetura Medallion de alta performance, com camadas Bronze, Silver e Gold para analytics avançado e modelos de ML.',
      'Refatorei orquestrações do Airflow com sensores customizados, reduzindo o bloqueio de workers em 99% e aumentando o throughput em 35% com Apache Iceberg e Spark.',
      'Atuei em pipelines de ingestão CDC com Kafka e processamento batch em Spark e EMR para mais de 1.000 tabelas, usando AWS Glue para persistir tabelas Iceberg.',
    ],
  },
  {
    role: 'Desenvolvedor de ML e IA',
    organization: 'CompassUOL (AI Studio)',
    period: 'Jun 2024 — Nov 2024',
    context: 'Desenvolvi soluções de ML clássico e IA generativa na AWS, do treinamento e deployment dos modelos à infraestrutura de suporte.',
    impact: [
      'Construí um classificador de faixa de preço de reservas hoteleiras com Random Forest e XGBoost, alcançando F1 ponderado de 87% e disponibilizando inferência em um endpoint do SageMaker.',
      'Coconstrui o DengueBot, um chatbot de saúde pública, sendo responsável pelo modelo de pré-diagnóstico no SageMaker e sua infraestrutura.',
      'Construí uma prova de conceito de tradutor SQL para PySpark capaz de tratar SELECT, JOIN, WHERE, ORDER BY, COALESCE e CASE WHEN com resolução correta de aliases.',
    ],
  },
  {
    role: 'Cientista de Dados / Analista de Dados Sênior',
    organization: 'Pet Premium Distribuidora',
    period: 'Set 2021 — Fev 2024',
    context: 'Atuei de ponta a ponta com previsões, segmentação e relatórios, transformando dados operacionais em decisões para estoque e estratégia executiva.',
    impact: [
      'Construí modelos de classificação e regressão para previsão de vendas, projeção de entregas e propensão de compra, influenciando o planejamento de estoque e a priorização de vendedores.',
      'Apliquei clustering para segmentar clientes por comportamento de compra e usei os segmentos para otimizar rotas de vendas e entregas.',
      'Construí dashboards no Power BI para previsão de vendas, resultados financeiros, entregas e satisfação de clientes, consolidando KPIs para decisões executivas.',
    ],
  },
  {
    role: 'Supervisor Financeiro',
    organization: 'Pet Premium Distribuidora',
    period: 'Set 2020 — Set 2021',
    context: 'Reestruturei processos financeiros centrais e entreguei análises de estratégia tributária diretamente à liderança da empresa.',
    impact: [
      'Liderei a reestruturação dos processos de compras, contas a pagar e contas a receber.',
      'Realizei análise tributária estratégica, avaliando os regimes de Lucro Real e Lucro Presumido e apresentando recomendações à liderança.',
      'Analisei demonstrações financeiras para identificar falhas de processo e oportunidades de redução de custos.',
    ],
  },
];
