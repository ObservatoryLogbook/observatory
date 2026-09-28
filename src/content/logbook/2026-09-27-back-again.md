---
title: Back again
date: 2026-09-27
projects: 
  - observatory
sickBay:
  - body-composition
---

As tired and unproductive as yesterday was, as productive and fulfilling today was. I'm definitely back again today, with a much better night's sleep (not fully optimal yet, but getting there). 

Today's training started with three things: 
- I made an agreement with my trainer that I need to get back again to tracking calories. I've been gaining weight lately, as my new body composition page illustrates very clearly, and I don't want to. 
- I had the best bench press set in a very long time - I'm definitely back again to making strong progress on the bench, with my estimated 1 Rep Max exceeding 100 kg for the first time. 
- My deadlift warm-up started strong, but then I hurt my back again... this time probably the quadratus lumborum, according to my trainer. Hopefully it is just a mild case of a strained muscle, but we will see. 

Back home, I relaxed a little with my partner before he had to go to work. Which meant one thing: Observatory! 

It ended up being a surprisingly substantial day of work. I finished the cleanup following the introduction of static type checking, leaving the entire codebase at zero errors, warnings and hints. I also continued yesterday's cleanup of Sick Bay by generalising the calculations for metric trends and rolling averages, so weight, fat mass, muscle mass, FFMI, waist circumference and Form Index can now use the same underlying machinery instead of maintaining parallel versions of essentially the same calculation.

There was also a rather satisfying real-world test of the new Training setup. After getting home from the gym, I entered today's bench press set directly through the published Training Input page, and the Training page immediately showed an estimated 1RM above 100 kg. No rebuild, no CSV file and no intermediate step. For the first time, that part of Observatory really felt like a live system rather than a website displaying data I had prepared elsewhere.

The biggest change, however, was Sick Bay. What used to be a single large page is now beginning to turn into a proper section of Observatory. I created a private Sick Bay landing page, with the existing dashboard moved into Body Composition as its first domain. The landing page uses the same visual language as Engineering, but its first card is fed directly from Supabase and shows my current seven-day averages for weight, fat mass and muscle mass, together with their twelve-week trends. The entire Sick Bay area remains behind authentication and read access, including even the description of what is in it.

This also clarified the architecture considerably. Sick Bay is no longer just "the page with all my body measurements". It can grow into distinct areas for Body Composition, Cardiovascular data and, eventually, Sleep, while still allowing analyses to cross those boundaries without duplicating the underlying observations. That feels like a much more durable model.

Now, however, I need to get back to bed again. It's been a long and eventful day.