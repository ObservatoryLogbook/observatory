---
title: Completing first version of Engineering
date: 2026-08-23
projects:
  - observatory
engineering:
  - food
---

Today I was rested. I had a very good night's sleep, I trained, I did my chores, and then I sat down in front of the computer, ready to work on Observatory.

The main task today was to finish the Engineering section of Observatory. What initially looked like a fairly simple landing page turned into a useful exercise in figuring out what Engineering actually represents in the structure of the site.

We started with Food, which already had a basic recipe collection. As the number of recipes grew, the flat alphabetical list stopped making sense, so I introduced a small taxonomy: Dinner, Sweets, Snacks, Bread, and Other. The recipe schema now enforces these categories, while Other deliberately acts as an escape hatch for things that do not yet justify a category of their own. Recipes are grouped by category on the Food page, with their status and tags retained as secondary information.

Food also became the first Engineering page to get related Logbook observations. I added an `engineering` field to the Logbook schema, allowing an observation to point to one or more Engineering areas independently of its project associations. A shared helper retrieves observations for a particular Engineering area, and the existing `ObservationList` component renders them. After testing the model on Food, I added the same mechanism to Reading and Training.

The larger design problem was the Engineering landing page. My first instinct had been to treat its entries like projects and represent them with similar information cards. That turned out to be conceptually wrong. Projects have states, start dates, and activity histories. Engineering areas are persistent systems and collections. There is no meaningful sense in which Food or Reading is "active" or "completed".

Instead, each Engineering card now exposes a small piece of information that is characteristic of the system behind it. Reading shows the book currently in progress and when I started it. Food shows the number of recipes with each status: Idea, Tested, and Favourite. Training shows my current strength goals for squat, bench press, and deadlift. The cards therefore share a visual language without being forced into the same data model.

This also led to a useful refinement of the design language. Small uppercase labels now provide context for the data inside the cards, while the actual values remain visually subordinate or prominent according to their meaning. The same principle already exists elsewhere in Observatory, but today it became much more deliberate.

Finally, I connected Engineering properly to the rest of the site. It now has an entry in the global navigation, and the Engineering card on the Observatory front page links to the new landing page and is no longer In Development. Rather than listing the Engineering areas on that card, which would quickly stop scaling as more are added, it shows the area with the latest Engineering-related Logbook activity and the date of that activity. Because this is derived from the same `engineering` metadata used for related observations, it requires no separate system to maintain.

There are currently only three Engineering areas: Reading, Food, and Training. But for the first time today, Engineering feels less like three unrelated pages and more like an extensible part of Observatory.

Many of today's solutions came about by letting the different elements remain different instead of trying to abstract those differences away. We did not try to force Reading, Food, and Training to show exactly the same type of information. Instead, we identified what they actually have in common: their relationship to observations. This also means that having a common design language across Observatory does not mean that everything has to be alike. It means that different things should be expressed consistently. And that is an important lesson to finish the day, the weekend, and the week with.