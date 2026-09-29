---
title: The production line
date: 2026-09-28
engineering:
  - reading
  - food
---

The foundation was closed today after Friday's anniversary celebrations, giving me a slightly unexpected Monday off. I had not really planned anything for the day, but it turned out to be surprisingly productive. In case you're in doubt: I strongly like productivity. 

I actually managed no less than six administrative tasks, a training session (slightly modified from the normal Monday programme due to the irritated quadratus lumborum), groceries and a few other minor things before 10.30. 

I spent several sessions working on Observatory. In the morning, I finally completed the integration of Sick Bay with Related Observations. Sick Bay observations can now be tagged explicitly as belonging to Body Composition, Cardiovascular or Sleep, rather than being squeezed into the Engineering taxonomy. I also added the observation title to the navigation bar on individual Logbook entries, including a mobile version that actually works with long titles.

Later, I returned to some smaller design details. Observatory now has its telescope favicon in modern browsers, even if Safari 16 on the old MacBook stubbornly refuses to acknowledge it. I also refined the metadata on the Science cards and shortened their dates, bringing Science and Engineering closer to the same visual language without making them identical.

In the evening, I went through the entire Observatory backlog. This unexpectedly revealed that one of the remaining Reading tasks had already been implemented: individual book pages have always been able to contain arbitrary Markdown content. More importantly, the audit removed a considerable amount of completed work and clarified what is actually left.

That led to a more general realization about Observatory. For the past couple of months, most of the effort has gone into building the architecture: collections, navigation, Engineering systems, Supabase, input forms, authentication, Sick Bay and all the infrastructure needed to make the site useful. The architecture is now sufficiently mature that the balance can start shifting from building Observatory to actually using it.

There are already several real Science projects that are not represented on the site, and much of the existing content is still sparse. Reading can contain not only books but my reasons for reading them and my thoughts afterwards. Food needs more of the recipes I actually cook. Science needs to catch up with the projects that are actually happening.

A useful rhythm may therefore be emerging: weekdays for populating and operating Observatory, and weekends for the larger development projects that benefit from uninterrupted time. Development will continue, of course. Cardiovascular and Sleep alone will keep us occupied for a while. But from now on, new architecture should increasingly emerge from actual use rather than being built in anticipation of it.

Perhaps Observatory is finally reaching the point where I can spend a little less time building the telescope and a little more time looking through it.