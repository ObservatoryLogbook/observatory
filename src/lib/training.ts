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

export async function getTrainingSection(
    section: "focus" | "motivation"
) {
    const entries = await getCollection("engineering-training");

    const entry = entries.find(
        (entry) =>
            "section" in entry.data &&
            entry.data.section === section
    );

    if (!entry) {
        throw new Error(
            `Training section "${section}" not found`
        );
    }

    return entry;
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

export async function getAchievedGoals() {
    const training = await getTrainingCore();

    return training.data.goals
        .filter((goal) => goal.achieved)
        .toSorted(
            (a, b) =>
                b.achieved!.getTime() -
                a.achieved!.getTime()
        );
}

export async function getLatestAchievedStrengthGoals() {
    const training = await getTrainingCore();

    const achievedStrengthGoals = training.data.goals
        .filter(
            (goal) =>
                goal.type === "strength" &&
                goal.achieved
        )
        .toSorted(
            (a, b) =>
                b.achieved!.getTime() -
                a.achieved!.getTime()
        );

    return achievedStrengthGoals.filter(
        (goal, index, goals) =>
            goals.findIndex(
                (candidate) =>
                    candidate.name === goal.name
            ) === index
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
