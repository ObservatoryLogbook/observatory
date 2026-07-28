---
title: Logbook register page
date: 2026-07-28
---

I continued working on the structure of this little corner of the Internet with my trusted partner in crime. Yesterday evening we reached an important milestone by creating individual pages for every observation using Astro. This had been a goal since [this observation a few days ago](2026-07-24-building-first-rss-feed). At first, the pages consisted of nothing more than plain text, but they confirmed that Astro was correctly generating the site structure.

This morning we turned our attention to presentation rather than functionality. The first task was styling the individual observation pages, keeping the text comfortably narrow to read—borrowing a little inspiration from the document layouts I became so accustomed to during my years writing papers in LaTeX. The goal was for each page to feel like a page from an actual laboratory notebook: something inviting to sit down and read.

Once the individual pages felt complete, we connected them together by adding navigation to the previous and next observation, along with a link back to the Logbook itself.

One of the more important tasks today was settling on the terminology that will gradually define Observatory. I have found myself using the following conventions:

- **Observatory** is the control room found on the main page.
- **Logbook** is the chronological register of all observations.
- **Observation** is an individual logbook entry.
- **Observation #005** refers to the observation's permanent number in the Logbook.

Each observation now receives a sequential observation number. The Logbook itself is displayed in reverse chronological order, meaning the newest observation always appears first, while the numbering allows me to keep track of how many observations have been made over time. The observation number is also displayed at the top of each observation alongside the date.

Bringing all of these individual pages together required a surprising amount of work, much of it spent designing the Logbook itself. The intention is for it to resemble a real laboratory notebook: a chronological record of observations, experiments, results, and occasionally discussion and conclusions. For now, each entry contains only three pieces of information—the observation number, the date, and the title. Nothing more, nothing less. As the Logbook grows, I may decide to include additional metadata, but simplicity feels like the right choice for now.

With the Logbook now in place, Observatory finally begins to feel like a real place. It has developed beyond a collection of pages into something that resembles an actual workspace. It is also in a state where I can comfortably step away for a few days while continuing to write observations, even if development itself pauses. We'll see where the next stage begins in about a week's time.