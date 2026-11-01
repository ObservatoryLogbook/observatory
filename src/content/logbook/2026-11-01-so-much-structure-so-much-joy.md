---
title: So much structure, so much joy
date: 2026-11-01
projects:
  - observatory
engineering:
  - food
---

I like structure and order. Perhaps that comes as a surprise by now. Perhaps not. Hopefully not.

This means that my weekends are often remarkably similar. Saturdays are for weekly chores, a bit of relaxation, and, of course, the highlight of the day: my afternoon nap. Sundays are for training, the less frequent household chores, and preferably another nap. It is a routine that works remarkably well for me.

The weekend actually begins on Friday evening or Saturday morning, when I prepare the meal plan for the coming week. That allows me to organise the grocery shopping and do some meal preparation on Sunday, something I find surprisingly relaxing. Much like working on Observatory, I am happiest when I am creating something with a purpose, preferably with at least the outline of a plan to follow.

My partner? Quite the opposite.

His approach to dinner planning is to enter a supermarket and decide what he feels like eating at that particular moment, or simply see what catches his attention. There is something rather charming about this, although it is not a method I would particularly enjoy relying on myself.

Since I do most of the cooking and meal planning, I have wanted for some time to give him online access to the weekly plan. That way, he can see what is coming and decide whether he needs to adjust his expectations in advance. Or perhaps he can simply look forward to dinner. Either way, the information will be available.

Meanwhile, the recipe collection in [Food](/engineering/food/) has been growing considerably. It now contains not only recipes, but also my observations from preparing them: what worked, what did not, and what I might want to change next time. Some recipes have become firm favourites, while others are still works in progress.

It seemed like the right time to combine the ingredients, so to speak, and bring the weekly meal plan into Observatory.

The result is a new [Meal Plan](/engineering/food/meal-plan/) section, showing the current week's dinners and any additional cooking projects. Each day can contain several recipes, which is particularly useful for meals with separate accompaniments. Existing recipes link directly to their entries in Food, while new dishes can appear on the plan before their recipes have been written up.

The current day's meals are highlighted automatically, making the page equally useful for checking what is for dinner and for quickly opening a recipe on my iPad or phone while cooking.

Perhaps the most satisfying part was how little new infrastructure we actually needed.

The existing Astro content collection system provided the foundation. We added a collection for meal plans, with one Markdown file per plan and an explicit date for each day. A small helper function selects the most recent plan, while the page itself uses the existing Observatory layout and design conventions. A little browser-side JavaScript takes care of identifying today's date in Copenhagen, so the highlighting changes without requiring a new website deployment.

There was no need for a database, a separate editing interface, or any elaborate new machinery. We simply extended what was already there.

Working through the implementation with Kepler was particularly enjoyable. We made small changes, tested them as we went along, and adjusted the visual design until it felt right. The familiar result kept appearing: zero errors, zero warnings, zero hints.

By late afternoon, Meal Plan 1.0 was finished, tested, and published. The first week's plan is already online.

This also gives me another practical reason to use Observatory every day. I can find tonight's recipes without searching through old conversations, and the notes I make after cooking can feed directly into the next iteration. Over time, the growing recipe collection should become an increasingly useful record of what actually works in my kitchen.

And speaking of the kitchen, today's Nordic Pulled Pork has turned out absolutely fantastic. The braised red cabbage is simmering away, the skyr rolls are ready, and dinner is coming together nicely.

A productive Sunday, a new piece of Observatory, and something delicious for dinner.

**So much structure. So much joy.**
