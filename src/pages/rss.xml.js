import rss from "@astrojs/rss";
import { getObservations } from "../lib/logbook";

export async function GET(context) {
    const observations = (await getObservations()).toReversed();

    return rss({
        title: "Observatory Logbook",
        description:
            "A personal notebook on science, technology, research, and life.",
        site: context.site,

        items: observations.map((observation) => ({
            title: observation.data.title,
            pubDate: observation.data.date,
            link: `/logbook/${observation.slug}`,
        })),
    });
}