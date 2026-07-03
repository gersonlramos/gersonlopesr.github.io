export interface ExperienceEntry {
  role: string;
  organization: string;
  period: string;
  context: string;
  impact: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Data Scientist / Cloud Data Engineer',
    organization: 'CompassUOL (Client: Stellantis)',
    period: 'Nov 2024 — Present',
    context:
      'Architecting a large-scale GCP-to-AWS migration for an enterprise automotive client, spanning both delivery-tracking tooling and the underlying data pipelines.',
    impact: [
      'Built an interactive Streamlit/Plotly migration-tracking dashboard with a Jira-API ETL, Supabase-backed role auth, and Monte Carlo delivery forecasting, replacing manual spreadsheet reporting.',
      'Led a multi-domain pipeline migration from BigQuery/Cloud Functions to Snowflake/Apache Airflow on AWS EKS, preserving exact financial numeric precision and resolving cross-pipeline circular dependencies.',
      'Standardized security and infrastructure configuration across dozens of Airflow DAGs spanning multiple business domains.',
    ],
  },
  {
    role: 'Data Scientist',
    organization: 'Outlier AI',
    period: 'Nov 2024 — Present',
    context:
      'Contributing to applied LLM work — from retrieval pipelines to the evaluation frameworks that measure model reasoning quality.',
    impact: [
      'Built RAG pipelines and LLM fine-tuning workflows, including synthetic dataset generation and benchmark evaluation scripts.',
      'Contributed to automated testing frameworks evaluating and improving model reasoning accuracy.',
    ],
  },
  {
    role: 'Data Engineer',
    organization: 'CompassUOL (Project: Pottencial Seguros)',
    period: 'Jun 2024 — Present',
    context:
      'Built the analytics foundation for an insurance client, taking a Medallion lakehouse architecture from design through performance tuning.',
    impact: [
      'Built a high-performance Medallion Architecture (Bronze/Silver/Gold) to support advanced analytics and ML models.',
      'Refactored Airflow orchestrations with custom sensors, cutting worker blockage by 99% and increasing pipeline throughput by 35% using Apache Iceberg and Spark.',
      'Built real-time CDC ingestion via Kafka alongside batch processing on Spark/EMR.',
    ],
  },
  {
    role: 'ML and AI Developer',
    organization: 'CompassUOL (AI Studio)',
    period: 'Jun 2024 — Nov 2024',
    context:
      'Developed classic ML and NLP solutions, from predictive models to serverless APIs backed by generative AI services.',
    impact: [
      'Built XGBoost and Random Forest models for hotel pricing and sports-outcome prediction, reaching 87% accuracy.',
      'Developed serverless NLP APIs integrating Amazon Bedrock and Amazon Lex.',
    ],
  },
  {
    role: 'Data Scientist / Sr. Data Analyst',
    organization: 'Pet Premium Distribuidora',
    period: 'Sep 2020 — Feb 2024',
    context:
      'Owned forecasting, analysis, and reporting end-to-end, turning data into decisions for inventory planning and executive strategy.',
    impact: [
      'Developed and deployed sales-forecasting models (Scikit-Learn, linear regression) that directly influenced inventory planning.',
      'Conducted deep exploratory data analysis in SQL and Python to identify market trends.',
      'Built Power BI dashboards tracking KPIs for executive decision-making.',
    ],
  },
];
