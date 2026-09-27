import {
    getCollection,
    type CollectionEntry,
} from "astro:content";

type TrainingEntry =
    CollectionEntry<"engineering-training">;

type TrainingCoreData =
    Extract<
        TrainingEntry["data"],
        { goals: unknown }
    >;

type TrainingCoreEntry =
    TrainingEntry & {
        data: TrainingCoreData;
    };

function isTrainingCoreEntry(
    entry: TrainingEntry
): entry is TrainingCoreEntry {
    return "goals" in entry.data;
}

type TrainingGoal =
    TrainingCoreData["goals"][number];

type StrengthGoal =
    Extract<
        TrainingGoal,
        { type: "strength" }
    >;

export async function getTrainingCore() {
    const entries =
        await getCollection(
            "engineering-training"
        );

    const training =
        entries.find(
            isTrainingCoreEntry
        );

    if (!training) {
        throw new Error(
            "Training core entry not found"
        );
    }

    return training;
}

export async function getTrainingMotivation() {
    const entries =
        await getCollection(
            "engineering-training"
        );

    const motivation = entries.find(
        (entry) =>
            "section" in entry.data &&
            entry.data.section === "motivation"
    );

    if (!motivation) {
        throw new Error(
            "Training motivation entry not found"
        );
    }

    return motivation;
}

export async function getStrengthGoals() {
    const training = await getTrainingCore();

    return training.data.goals.filter(
        (goal): goal is StrengthGoal =>
            goal.type === "strength" &&
            !goal.achieved
    );
}

export async function getSkillGoals() {
    const training = await getTrainingCore();

    return training.data.goals.filter(
        (goal) =>
            goal.type === "skill" &&
            !goal.achieved
    );
}

export async function getTrainingProgrammes() {
    const programmes = await getCollection(
        "training-programmes"
    );

    return programmes.toSorted(
        (a, b) =>
            a.data.order - b.data.order
    );
}

export async function getTrainingContext() {
    const training = await getTrainingCore();

    return training.data.context;
}
