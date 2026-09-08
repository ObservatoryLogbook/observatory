---
title: Data access issues
date: 2026-09-08
---

I did it! I made it to the gym this morning, and it felt good. I've actually become one of those people who can miss going to the gym — who knew!

Today marks exactly one week since the application deadline, and we had our first big milestone: we needed to distribute more than 300 applications to almost 40 reviewers, and it needed to be done intelligently. Preferably, reviewers should be familiar with the topic of the application, but there are many other factors at play. It is a giant jigsaw puzzle, and one which I had to solve today.

As always with so many moving parts, the key thing is to keep a cool mind. I do that by listening to soundtracks designed to blend into the background, where the music is there but doesn't require attention or focus. Currently, I am listening to the soundtrack from Doctor Who 2005, Series 6. So many wonderful episodes from that season — and music to match.

We succeeded by 5pm, and all the assignments were uploaded to our system. Within 10 minutes, the first comments came back: we can't see the applications!

Our developers were quickly on it, but still, it has been a working night, to say the least.

In between baking four pumpkins for a chickpea and pumpkin salad, talking to my parents, and dealing with the work crisis, I somehow managed to squeeze in a little Observatory as well. I returned to Supabase and started turning last week's proof of concept into a proper access model for private data.

Instead of hardcoding my user ID into the security policy, access is now defined separately: an authenticated user can be given read and write permissions for a particular data domain. The database then checks those permissions before revealing anything. I tested both directions — with read access enabled, the test data appeared; with it disabled, they disappeared. I switched access back on, and there they were again.

It is a tiny piece of infrastructure, but an important one. Eventually, it means I can give selected people access to selected parts of Observatory without changing the underlying security rules for each person.

Now it seems like the reviewers can see the applications, and I can see the test data when I am properly logged in to my little Supabase test page.

Time to call it a day!