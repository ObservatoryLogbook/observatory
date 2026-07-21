import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const logbook = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/logbook" }),
});

export const collections = { logbook };
