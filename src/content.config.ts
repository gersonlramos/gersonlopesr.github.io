import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z
    .object({
      title: z.string(),
      summary: z.string(),
      category: z.enum(['data-science', 'data-engineering']),
      impactSummary: z.string(),
      stack: z.array(z.string()),
      role: z.string(),
      repoUrl: z.string().url(),
      notebookUrl: z.string().url().optional(),
      thumbnail: z.string().optional(),
      diagramPath: z.string().optional(),
      demoUrl: z.string().url().optional(),
      order: z.number().default(0),
    })
    .superRefine((data, ctx) => {
      if (data.category === 'data-engineering' && !data.diagramPath) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'PROJ-04: data-engineering case studies must include diagramPath',
          path: ['diagramPath'],
        });
      }
    }),
});

export const collections = { projects };
