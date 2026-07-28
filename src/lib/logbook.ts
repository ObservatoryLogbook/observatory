import { getCollection, type CollectionEntry } from "astro:content";

export type Observation = CollectionEntry<"logbook"> & {
    slug: string;
    number: number;
    formattedNumber: string;
};

/**
 * Sort observations chronologically.
 *
 * The oldest observation comes first. If two observations have
 * the same date, their filenames determine the order.
 */
function sortChronologically(
    observations: CollectionEntry<"logbook">[],
): CollectionEntry<"logbook">[] {
    return [...observations].sort((a, b) => {
        const dateDifference =
            a.data.date.getTime() - b.data.date.getTime();

        if (dateDifference !== 0) {
            return dateDifference;
        }

        return a.id.localeCompare(b.id);
    });
}

/**
 * Return all logbook observations with:
 *
 * - a URL slug
 * - a sequential observation number
 * - a zero-padded display number
 *
 * Observation #1 is always the earliest observation.
 */
export async function getObservations(): Promise<Observation[]> {
    const entries = await getCollection("logbook");
    const chronologicalEntries = sortChronologically(entries);

    return chronologicalEntries.map((entry, index) => {
        const number = index + 1;

        return {
            ...entry,
            slug: entry.id.replace(/\.md$/, ""),
            number,
            formattedNumber: String(number).padStart(3, "0"),
        };
    });
}