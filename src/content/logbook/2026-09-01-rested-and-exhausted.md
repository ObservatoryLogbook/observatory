---
title: Rested and exhausted
date: 2026-09-01
---

Almost nine hours of sleep will definitely do the trick. Even though I did wake up to the sound of my alarm clock. I hate it when that happens as a complete A-type person... I'm usually awake well before the alarm goes off... at 5:20am.

I continued with the new training programme, today focusing on the posterior chain from the hamstrings, through the glutes, to the lower back. And with a little quads and skipping thrown in, just for the fun of it. It was actually really good, especially afterwards.

We welcomed a new colleague to my team today, the second in just two weeks. And hopefully with a third on the way. The team is slowly but steadily growing more focused, and I can see strong potential for growth in terms of capabilities and competencies with the new recruitments, which is fantastic. I fear that it might be difficult to ensure that the everyday administrative tasks still get done while we also have fun developing and growing.

Today we also closed two application rounds. It is interesting for me, because I have written countless applications for telescopes, for funding, for jobs, you name it. And submitting an application is always the culmination of a very focused period of work. Here it is the opposite: we have spent the last six months preparing for just this day. And now all of our preparatory work kicks into play — it will definitely be a number of interesting weeks ahead of us!

And tonight, Observatory took another fairly fundamental step forward. Yesterday we started experimenting with Supabase as a possible private data layer; today we actually proved that the architecture works. We created an authenticated user and tested the security boundaries from the outside: anonymous access was blocked, an authenticated user without an explicit policy could still see nothing, and only when a Row Level Security policy recognised my identity did our fictional body measurement appear.

Then we connected Observatory itself to Supabase. A deliberately ugly little Sick Bay test page allowed me to log in and retrieve the measurement directly from the database. Opening the same page in a private browser session returned only two unexpectedly satisfying words: *Not authenticated.* The test data may have belonged to a suspiciously lean 75 kg Captain Picard, but the result was real: Observatory can now access private data without making that data public. Supabase has gone from promising candidate to working prototype.

Just as rested as I was this morning, just as tired I am now, but in a good and productive way. Tomorrow will be fun, though, but more on that tomorrow!