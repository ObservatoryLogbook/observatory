---
title: Monday on a Wednesday
date: 2026-09-16
projects:
  - observatory
---

At work, we are slowly beginning to work in a more project-oriented way, which of course raises a number of questions: what is a project, who are project owners and who are project leaders, what phases does a project go through, what kind of statuses should we use, etc. And not least, what tool should we use for managing projects across the organisation?

The choice has fallen on Monday.com. Back in February, we had one of the most horrendous two-day courses I have ever attended. It was so bad that the organisers decided to give us a free one-day course with an experienced project leader who was also a Monday.com expert. Which was perfect, because he could give us an introduction not only to the tool, but also to the whole culture surrounding project management. A very interesting day at a very interesting location in the Meatpacking District of Copenhagen, but also a very intense one.

On top of that, I slept poorly last night, so I was a bit off.

Nevertheless, the evening consisted of a bit of Observatory. What started as some fairly innocent work on Sick Bay turned into a surprisingly productive session. I continued breaking up what had become a rather enormous `sick-bay.astro`, moving the body-composition logic into its own module. The page itself is now down from roughly 1,700 lines to about 1,000, which feels considerably less alarming.

I also added a shared hover interaction to the body-composition chart. Moving across the three panels now gives me a single vertical hairline and a tooltip showing the date and the seven-day averages for weight, muscle mass and fat mass. It even works on my phone, although that required a little extra adjustment to make both the current status and the tooltip readable on a smaller screen.

There was, inevitably, one final tiny rabbit hole when the tooltip suddenly became enormous on my computer. After briefly suspecting responsive breakpoints and browser behaviour, the explanation turned out to be rather less sophisticated: I had changed the TypeScript file but had not saved it before reloading the page.

All in all, a lot of ups and downs, mostly ups, but still a feeling of Monday on a Wednesday...