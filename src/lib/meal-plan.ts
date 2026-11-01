import { getCollection } from "astro:content";

export async function getMealPlans() {
    const plans = await getCollection("meal-plans");

    return plans.toSorted(
        (a, b) =>
            b.data.startDate.getTime() -
            a.data.startDate.getTime()
    );
}

export async function getLatestMealPlan() {
    const plans = await getMealPlans();

    return plans[0] ?? null;
}
