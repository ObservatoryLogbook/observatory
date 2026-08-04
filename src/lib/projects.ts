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
