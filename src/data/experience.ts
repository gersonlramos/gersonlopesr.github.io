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
    period: 'Dec 2025 — Present',
    context:
      'Architecting a large-scale GCP-to-AWS migration for an enterprise automotive client, spanning both delivery-tracking tooling and the underlying data pipelines.',
    impact: [
      'Led discovery and scoping across 9 business domains and 3,000+ objects, mapping legacy GCP components (Cloud Functions, DataStage, Dataflow) and structuring the work into delivery epics.',
      'Led a multi-domain pipeline migration from BigQuery/Cloud Functions to Snowflake/Apache Airflow on AWS EKS, preserving exact financial numeric precision and resolving cross-pipeline circular dependencies.',
      'Built an interactive Streamlit/Plotly migration-tracking dashboard with a Jira-API ETL, Supabase-backed role auth, and Monte Carlo delivery forecasting, replacing manual spreadsheet reporting.',
      'Standardized security and infrastructure configuration across dozens of Airflow DAGs spanning multiple business domains.',
    ],
  },
  {
    role: 'Data Engineer',
    organization: 'CompassUOL (Project: Pottencial Seguros)',
    period: 'Dec 2024 — Nov 2025',
    context:
      'Worked on the analytics foundation for an insurance client, taking a Medallion lakehouse architecture through design and performance tuning.',
    impact: [
      'Implemented a high-performance Medallion Architecture (Bronze/Silver/Gold) to support advanced analytics and ML models.',
      'Refactored Airflow orchestrations with custom sensors, cutting worker blockage by 99% and increasing pipeline throughput by 35% using Apache Iceberg and Spark.',
      'Worked within an existing Kafka CDC ingestion pipeline and batch processing on Spark/EMR across 1,000+ tables, using AWS Glue to persist Iceberg tables across the Medallion layers.',
    ],
  },
  {
    role: 'Data Scientist',
    organization: 'Outlier AI (via LATAM Coders)',
    period: 'Nov 2024 — Jun 2025',
    context:
      'Part-time contributor to applied LLM work — from retrieval pipelines to the evaluation frameworks that measure model reasoning quality.',
    impact: [
      'Built RAG pipelines and LLM fine-tuning workflows, including synthetic dataset generation and benchmark evaluation scripts.',
      'Contributed to automated testing frameworks evaluating and improving model reasoning accuracy.',
    ],
  },
  {
    role: 'ML and AI Developer',
    organization: 'CompassUOL (AI Studio)',
    period: 'Jun 2024 — Nov 2024',
    context:
      'Developed classic ML and generative AI solutions on AWS, from model training through deployment and the supporting infrastructure.',
    impact: [
      'Built a hotel booking price-range classifier (Random Forest, XGBoost) tuned via RandomizedSearchCV and GridSearchCV and validated with 5-fold cross-validation, reaching a weighted F1-score of 87%; trained and deployed on SageMaker with a live inference endpoint.',
      'Co-developed DengueBot, a public-health chatbot for dengue outbreak identification, owning the SageMaker pre-diagnosis model and its infrastructure (Docker on EC2, Lex/Lambda routing through a containerized ECS service).',
      'Built a proof-of-concept rule-based SQL-to-PySpark translator handling SELECT, JOIN, WHERE, ORDER BY, COALESCE and CASE WHEN with correct table alias resolution.',
    ],
  },
  {
    role: 'Data Scientist / Sr. Data Analyst',
    organization: 'Pet Premium Distribuidora',
    period: 'Sep 2021 — Feb 2024',
    context:
      'Owned forecasting, segmentation, and reporting end-to-end, turning operational data into decisions for inventory planning and executive strategy.',
    impact: [
      'Built classification and regression models (Scikit-Learn) for sales forecasting, delivery projections, and customer purchase likelihood, directly influencing inventory planning and sales rep prioritization.',
      'Applied clustering to segment customers by purchasing behavior, using the segments to design optimized sales and delivery routes based on time, fuel cost, and customer satisfaction.',
      'Built a suite of Power BI dashboards covering sales forecasts, financial results, delivery performance, and customer satisfaction, consolidating KPIs for executive decision-making.',
    ],
  },
  {
    role: 'Financial Supervisor',
    organization: 'Pet Premium Distribuidora',
    period: 'Sep 2020 — Sep 2021',
    context:
      'Restructured core financial processes and delivered tax strategy analysis directly to company leadership.',
    impact: [
      'Led the restructuring of purchasing, accounts payable, and accounts receivable processes.',
      'Conducted strategic tax analysis (ICMS-ST and state tax incentives) evaluating Lucro Real vs. Lucro Presumido regimes, presenting findings and recommendations to leadership.',
      'Analyzed financial statements to identify process gaps and cost-reduction opportunities.',
    ],
  },
];