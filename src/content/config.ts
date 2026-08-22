import { defineCollection, z } from "astro:content";

/* =========================================================
   Logbook
   ========================================================= */

const logbook = defineCollection({
    type: "content",

    schema: z.object({
        title: z.string(),
        date: z.date(),

        projects: z.array(z.string()).optional(),
    }),
});

/* =========================================================
   Projects
   ========================================================= */

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

/* =========================================================
   Books
   ========================================================= */

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

/* =========================================================
   Training
   ========================================================= */

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

/* =========================================================
   Food
   ========================================================= */

const recipeIngredient = z.object({
    name: z.string(),

    amount: z.union([
        z.number(),
        z.string(),
    ]).optional(),

    unit: z.string().optional(),
    note: z.string().optional(),
    optional: z.boolean().optional(),
});

const recipeIngredientGroup = z.object({
    group: z.string(),
    items: z.array(recipeIngredient),
});

const foodRecipes = defineCollection({
    type: "content",

    schema: z.object({
        title: z.string(),
        category: z.string(),

        status: z.enum([
            "idea",
            "tested",
            "favourite",
        ]),

        tags: z.array(z.string()).default([]),

        source: z.object({
            name: z.string(),
            note: z.string().optional(),
        }).optional(),

        servings: z.number().positive().optional(),

        ingredients: z.array(
            recipeIngredientGroup
        ),
    }),
});

/* =========================================================
   Exports
   ========================================================= */

export const collections = {
    logbook,
    projects,
    "engineering-books": engineeringBooks,
    "engineering-training": engineeringTraining,
    "training-programmes": trainingProgrammes,
    "food-recipes": foodRecipes,
};
