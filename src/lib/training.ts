import { getCollection } from "astro:content";

export async function getTrainingCore() {
    const entries = await getCollection("engineering-training");

    const training = entries.find(
        (entry) => "goals" in entry.data
    );

    if (!training) {
        throw new Error("Training core entry not found");
    }

    return training;
}

export async function getTrainingMotivation() {
    const entries = await getCollection("engineering-training");

    return entries.find(
        (entry) =>
            "section" in entry.data &&
            entry.data.section === "motivation"
    );
}

export async function getStrengthGoals() {
    const training = await getTrainingCore();

    return training.data.goals.filter(
        (goal) =>
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
