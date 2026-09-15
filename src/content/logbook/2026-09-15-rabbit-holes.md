---
title: Rabbit holes
date: 2026-09-15
projects:
  - observatory
---

I guess you could say the story of my life revolves around rabbit holes. When I was five years old, my mom asked if I wanted to do gymnastics over the winter, which is quite normal for Danish children at that age. I told her that I would much rather do something with space exploration. That was the beginning of a very deep rabbit hole, which eventually culminated in a successful academic career trying to address the big question: how did we get here?

Funnily enough, one of the highlights of my career was standing in a room presenting a research proposal to a selection panel. I was successful and became the happy recipient of a 10 MDKK research grant. Today I was back in that exact room for the first time since 2017, but in a very different capacity. I was there for a network meeting with other funders, trying to understand how we can learn from our grant holders. Funny how life can twist and turn!

Tonight's Observatory session also started going down a very deep rabbit hole. I primarily collect body composition data from two sources: my own KaradaScan, which I use daily, and the InBody scanner at my gym, where I get a scan about once a month. They both record weight, and roughly agree, at least to within a kilo, which is good enough.

They also both measure body fat, where there are more significant differences. Not as big as for muscle mass, though, where there is an almost 15 kg difference between the two. Suddenly we got the idea: let's try to figure out if we can understand the differences in the algorithms, the measuring methods, etc. And since the algorithms are proprietary, maybe we can reverse-engineer them from the raw impedance measurements?

We stopped! And in good time. Otherwise I fear we would still be at it.

But then I remembered that I had wanted to show my trainer the latest version of Sick Bay on my phone this morning, and I couldn't log in. That turned out to be a much more mundane problem: the Supabase environment variables existed locally on my MacBook, but not on Netlify. Once they were added there, authentication worked perfectly on both my computer and my phone.

At that point, we could of course have stopped.

Instead, we decided to implement a nice little logout button. Both on the Sick Bay page and on the Input page.

It worked fine on the Input page. On the Sick Bay page, it worked fine too... after about 45 minutes of debugging. Somewhere during our apparently simple modification, we first managed to lose the closing part of a guard clause, and later an entire block of DOM element declarations disappeared. The particularly entertaining version of the bug was a perfectly valid page that simply sat there saying "Checking authentication..." forever, without a single error in the console.

By then it had also become rather obvious that `sick-bay.astro`, at more than 1,700 lines, was becoming slightly unreasonable for a human being to navigate. Its companion `input.astro` is more than 1,400 lines. I may enjoy rabbit holes, but asking me to locate "the block somewhere near the end of that 360-line function" is perhaps taking things a little too far.

So one rabbit hole led naturally into another: we started refactoring Sick Bay. Supabase now has its own shared client, authentication and access checks have started moving into shared code, and both pages are still working. We stopped there, with a clean break and considerably fewer reasons for the next logout button to consume 45 minutes of my life.

Needless to say, I didn't expect to spend all evening going down two very different rabbit holes.

But then again, I didn't expect a question about space exploration at the age of five to last several decades either.