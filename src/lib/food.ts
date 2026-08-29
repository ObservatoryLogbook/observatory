import { getCollection } from "astro:content";

export const FOOD_CATEGORIES = [
    "Dinner",
    "Sweets",
    "Snacks",
    "Bread",
    "Other",
] as const;

export async function getRecipes() {
    const recipes = await getCollection("food-recipes");

    return recipes.toSorted((a, b) =>
        a.data.title.localeCompare(b.data.title)
    );
}

export async function getRecipesByCategory() {
    const recipes = await getRecipes();

    return FOOD_CATEGORIES
        .map((category) => ({
            category,
            recipes: recipes.filter(
                (recipe) => recipe.data.category === category
            ),
        }))
        .filter((group) => group.recipes.length > 0);
}

export async function getRecipeStats() {
    const recipes = await getRecipes();

    return {
        idea: recipes.filter(
            (recipe) => recipe.data.status === "idea"
        ).length,

        tested: recipes.filter(
            (recipe) => recipe.data.status === "tested"
        ).length,

        favourite: recipes.filter(
            (recipe) => recipe.data.status === "favourite"
        ).length,
    };
}