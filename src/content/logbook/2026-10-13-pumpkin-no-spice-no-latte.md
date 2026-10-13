---
title: Pumpkin no spice no latte
date: 2026-10-13
engineering:
	- training
---

My partner has obsessive tendencies: protein-whatever, sunscreen, training, whimsicalness, and… pumpkin. He is absolutely obsessed with pumpkins. I guess there could be worse things to obsess about.

So today I made a small and modest salad for him (and a fraction for me): 2 cucumbers, 2 cans of drained chickpeas, 300 g skyr, 450 g cottage cheese, and four Hokkaido pumpkins, roasted, cooled, and cut into cubes. You know, just a small, modest salad. Again, it’s not the worst thing to be addicted to, so who am I to complain?

Luckily, I roasted the pumpkins on Sunday, so when I got home today, all I had to do was chop everything up and mix it together. Which left plenty of time for a nice, long Observatory session!

The goal for today was to visualise my training history for the current calendar year. Yesterday, we successfully imported all the training dates into Supabase, so today was all about visualisation.

Setting up the basic component was easy and straightforward enough, but then we spent half an hour discussing cell sizes, spacing, and colours, both on the computer screen and on the phone. I am very happy with the result, though: it is minimalist, and it presents the relevant data in a clean and accessible format.

We now have a dedicated Training History component, with data fetched directly from Supabase, a compact calendar covering the entire year, and different interactions for desktop and mobile. The desktop version has hover tooltips, while the mobile version lets me tap individual days to see their dates and training status.

We also had a brief encounter with four TypeScript errors, all caused by Astro trying to check our Supabase Edge Function, which runs on Deno. Fortunately, the solution was simple: tell Astro to mind its own business. We finished with the glorious 0 errors, 0 warnings, and 0 hints.

And the calendar shows that I have a bone to pick with my trainer…!

We were supposed to train on October 1st, but he didn’t have any classes that day, so we shifted it to October 2nd. Which meant that, entirely unintentionally, I broke my streak of having trained on the first day of every month this year.

Had I known I was keeping a streak, I would have squeezed in even just a 15-minute workout!

But… such is life. At least there’s not long until November 1st!