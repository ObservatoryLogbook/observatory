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

const engineeringBooks = defineCollection({
    type: "content",

    schema: z.object({
        title: z.string(),
        author: z.string(),
        category: z.string(),
        started: z.date().optional(),
        finished: z.date().optional(),
        rating: z.number().min(1).max(5).optional(),
    }),
});


const strengthGoal = z.object({
    type: z.literal("strength"),
    name: z.string(),
    target: z.number(),
    unit: z.literal("kg"),
    reps: z.number().int().positive(),
    started: z.date(),
    targetDate: z.date().optional(),
    achieved: z.date().optional(),
});

const skillGoal = z.object({
    type: z.literal("skill"),
    name: z.string(),
    target: z.number().int().positive(),
    started: z.date(),
    targetDate: z.date().optional(),
    achieved: z.date().optional(),
});

const trainingGoal = z.discriminatedUnion("type", [
    strengthGoal,
    skillGoal,
]);

const trainingContext = z.object({
    title: z.string(),
    eventDate: z.date().optional(),
    affectedFrom: z.date(),
    affectedUntil: z.date().optional(),
    status: z.enum([
        "acute",
        "recovering",
        "residual",
        "resolved",
    ]),
    notes: z.string(),
});

const engineeringTraining = defineCollection({
    type: "content",

    schema: z.union([
        z.object({
            title: z.string(),
            goals: z.array(trainingGoal),
            context: z.array(trainingContext).default([]),
        }),

        z.object({
            section: z.enum([
                "focus",
                "motivation",
            ]),
        }),
    ]),
});

const trainingProgrammes = defineCollection({
    type: "content",
    schema: z.object({
        day: z.enum([
            "Monday",
            "Wednesday",
            "Friday",
            "Sunday",
        ]),
        started: z.preprocess(
            (value) =>
                value === null || value === ""
                    ? undefined
                    : value,
            z.coerce.date().optional()
        ),
        description: z.string(),
        order: z.number(),
    }),
});

export const collections = {
    logbook,
    projects,
    "engineering-books": engineeringBooks,
    "engineering-training": engineeringTraining,
    "training-programmes": trainingProgrammes,
};
