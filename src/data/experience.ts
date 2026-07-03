export interface ExperienceEntry {
  role: string;
  organization: string;
  period: string;
  context: string;
  impact: string[];
}

// PLACEHOLDER-confirm-phase-2: organization names and exact dates are illustrative
// pending the user's real CV details (see 02-02-SUMMARY.md Known Stubs). Role
// progression and impact framing reflect the hybrid DS/DE narrative from PROJECT.md
// and should be replaced with verified employment history before final publish.
export const experience: ExperienceEntry[] = [
  {
    role: 'Data Scientist & Data Engineer',
    organization: 'Company Name — TBD (confirm employer)',
    period: '2023 — Present',
    context:
      'Hybrid contributor across the analytics lifecycle: designing predictive models and building the data pipelines that put them into production.',
    impact: [
      'Reduced pipeline latency by re-architecting batch ETL jobs into incremental processing.',
      'Shipped a forecasting model that improved planning accuracy for a core business metric.',
      'Introduced data quality checks that cut downstream reporting incidents.',
    ],
  },
  {
    role: 'Data Engineer',
    organization: 'Company Name — TBD (confirm employer)',
    period: '2021 — 2023',
    context:
      'Owned ingestion and transformation infrastructure supporting analytics and reporting teams across the organization.',
    impact: [
      'Migrated legacy batch jobs to a scheduled, monitored orchestration workflow.',
      'Built reusable data models that shortened new-dashboard turnaround time.',
      'Partnered with analysts to define and enforce data contracts between systems.',
    ],
  },
  {
    role: 'Data Analyst',
    organization: 'Company Name — TBD (confirm employer)',
    period: '2019 — 2021',
    context:
      'Started the transition into data engineering and science by owning end-to-end reporting and exploratory analysis.',
    impact: [
      'Automated recurring manual reports, freeing up analyst time each week.',
      'Delivered exploratory analyses that directly informed product decisions.',
    ],
  },
];
