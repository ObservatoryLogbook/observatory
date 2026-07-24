import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const allLogs = (await getCollection('logbook')).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: 'Logbook',
    description: 'A personal notebook on science, technology, research, and life.',
    site: context.site,
    items: allLogs.map((log) => ({
      title: log.data.title,
      pubDate: log.data.date,
      link: '/logbook/',
    })),
  });
}