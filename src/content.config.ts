import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const logbook = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/content/logbook",
    }),
});

const projects = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/content/projects",
    }),
});

export const collections = {
    logbook,
    projects,
};
