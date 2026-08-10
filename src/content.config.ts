import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Kolekcje treści. Jeden plik .md = jeden projekt / jeden partner.
 * Pliki zaczynające się od `_` (np. `_TEMPLATE.md`) są pomijane przy buildzie.
 *
 * Instrukcja dla nietechnicznych: src/content/projects/README.md
 */

export const PROJECT_STATUSES = [
  'planowany',
  'w-rozwoju',
  'zrealizowany',
  'wstrzymany',
] as const;

export const PROJECT_VISUALS = [
  'robot',
  'robot-legs',
  'robot-tracks',
  'arm',
  'lidar',
  'ui',
  'hat',
] as const;

const projects = defineCollection({
  loader: glob({
    pattern: ['**/[^_]*.{md,mdx}', '!**/README.md'],
    base: './src/content/projects',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),                        // 1–2 zdania na kartę
      category: z.string(),                       // "Podstawa", "Nadstawa", "Projekt pokazowy"…
      status: z.enum(PROJECT_STATUSES),
      date: z.coerce.date(),                      // decyduje o „3 najnowsze" na stronie głównej
      featured: z.boolean().default(false),       // przypięcie na stronę główną
      order: z.number().default(100),             // kolejność na /projects
      tags: z.array(z.string()).default([]),
      visual: z.enum(PROJECT_VISUALS).default('robot'),
      cover: image().optional(),                  // render/zdjęcie — nadpisuje `visual`
      coverAlt: z.string().default(''),
      downloads: z
        .array(z.object({ label: z.string(), href: z.string() }))
        .default([]),
      placeholder: z.boolean().default(false),    // treść robocza, czeka na materiały
      draft: z.boolean().default(false),          // nie trafia na stronę wcale
    }),
});

const partners = defineCollection({
  loader: glob({
    pattern: ['**/[^_]*.{md,mdx}', '!**/README.md'],
    base: './src/content/partners',
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      summary: z.string(),                        // jedno zdanie na kafelek
      url: z.string().url().optional(),
      logo: image().optional(),                   // logotypy — czekamy na Dominika
      order: z.number().default(100),
      /** `false` = rozmowy w toku, kafelek dostaje adnotację zamiast znikać. */
      confirmed: z.boolean().default(true),
      placeholder: z.boolean().default(false),
    }),
});

export const collections = { projects, partners };
