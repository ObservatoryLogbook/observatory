import { getCollection } from "astro:content";

export async function getTraining() {
    const entries = await getCollection("engineering-training");

    return entries[0];
}

export async function getStrengthGoals() {
    const training = await getTraining();

    return training.data.goals.filter(
        (goal) =>
            goal.type === "strength" &&
            !goal.achieved
    );
}

export async function getSkillGoals() {
    const training = await getTraining();

    return training.data.goals.filter(
        (goal) =>
            goal.type === "skill" &&
            !goal.achieved
    );
}

export async function getAchievedGoals() {
    const training = await getTraining();

    return training.data.goals
        .filter((goal) => goal.achieved)
        .toSorted(
            (a, b) =>
                b.achieved!.getTime() -
                a.achieved!.getTime()
        );
}

export async function getLatestAchievedStrengthGoals() {
    const training = await getTraining();

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
                (candidate) => candidate.name === goal.name
            ) === index
    );
}
