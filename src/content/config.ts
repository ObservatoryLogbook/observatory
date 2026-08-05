import { defineCollection, z } from "astro:content";

const logbook = defineCollection({
    type: "content",

    schema: z.object({
        title: z.string(),
        date: z.date(),

        projects: z.array(z.string()).optional(),
    }),
});

const projects = defineCollection({
    type: "content",

    schema: z.object({
        title: z.string(),

        status: z.enum([
            "Active",
            "Paused",
            "Operational",
            "Completed",
            "Archived",
        ]),

        started: z.date(),

        purpose: z.string(),

        outcomes: z.array(z.string()),
    }),
});

export const collections = {
    logbook,
    projects,
};
