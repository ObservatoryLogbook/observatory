---
title: Getting back to Observatory
date: 2026-10-31
projects:
  - observatory
engineering:
  - food
---

The last few weeks have been more than hectic. Several major projects at work have reached critical milestones over the past three or four weeks, leaving very little time or energy for much else. Not everything is finished yet, but the workload is finally beginning to look more manageable.

In the middle of all this, we somehow managed to squeeze in a 48-hour excursion to Rome earlier this week. It was absolutely fantastic. The weather was beautiful, the food was excellent, and the sights were as impressive as ever. Most importantly, though, the company could not have been better. Under those circumstances, it hardly mattered that I was running on far too little sleep and was still recovering from the preceding weeks at work.

All of this has meant that I have barely touched Observatory lately. I have not even been recording my observations. There simply has not been enough mental bandwidth. Looking back at my last observation, on 18 October, I had actually anticipated precisely this. It is reassuring to see that the interruption was temporary, just as I had hoped.

Yesterday and today, however, we finally made some progress again. And rather unexpectedly, we reached a milestone that may fundamentally change how I work on Observatory.

**Kepler now has direct access to the Observatory repository on GitHub.**

This has been something I have wanted for quite some time. Until now, our collaboration has generally required me to transfer code or content between ChatGPT and my development environment, check the results, and push the changes myself. That workflow has worked reasonably well, but it has also meant that even fairly simple updates depended on having access to my computer.

Now Kepler can read the repository, create branches, add and update files, and prepare pull requests directly on GitHub. Once the changes have been reviewed and merged, Netlify takes care of publishing them to Observatory. We tested the entire process today, from creating a file to seeing the resulting page appear on the website.

There were a few minor hiccups along the way, but the overall workflow proved remarkably effective. More importantly, I could manage the entire process from my iPad.

This removes one of the remaining obstacles to making Observatory fully portable. I still want my MacBook for more substantial development work, but routine content updates no longer need to depend on it.

We put the new capability to work almost immediately.

For some time, I have been experimenting with weekly meal plans for my partner and me. The process has gradually evolved into something more interesting than simply deciding what to cook: recipes are developed, tested, evaluated, and improved. Some become favourites, while others need another round of experimentation.

The next step is to introduce a **Meal Plan** section under Food, allowing us to see the current week's meals and eventually look back at previous plans. The recipes themselves already have a home in Observatory, so the intention is to build on that existing collection rather than create another disconnected system.

Before designing the new section, we decided to bring some of the recent recipes into Observatory. This turned into an excellent test of the GitHub integration. Over the course of the evening, we added nine recipes, including several new favourites, some promising experiments, and a few dishes where the lessons learned were perhaps more valuable than the results themselves.

Importantly, we preserved the distinction between recipes that have actually been tested and changes that are merely being considered. We also established links between related recipes, such as the big-batch Bolognese and the Mexican loaded potatoes made from it.

By the end of the evening, the Food collection had grown to 49 recipes, and we had completed eight pull requests. What would previously have involved a considerable amount of copying, pasting, and switching between applications had become a much more straightforward collaborative process.

It feels as though Observatory has taken another step towards becoming the sort of personal system I originally imagined: something I can use and maintain wherever I happen to be, without the technology getting in the way.

Tomorrow, I hope to turn my attention to the architecture of Meal Plan. There are some interesting design decisions ahead, and I am looking forward to exploring them.

But for now, it is simply good to be back.

Stay tuned for more tomorrow.
