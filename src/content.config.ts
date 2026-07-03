import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    stack: z.array(z.string()),
    role: z.string(),
    repoUrl: z.string().url(),
    notebookUrl: z.string().url().optional(),
    thumbnail: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { projects };
