import { getCollection } from "astro:content";

export async function getProjects() {
    return await getCollection("projects");
}

export async function getProject(slug: string) {
    const projects = await getProjects();

    return projects.find(
        (project) => project.id.replace(/\.md$/, "") === slug
    );
}

export async function getActiveProjects(limit?: number) {
    const projects = await getProjects();

    const active = projects.filter(
        (project) => project.data.status === "Active"
    );

    return limit
        ? active.slice(0, limit)
        : active;
}