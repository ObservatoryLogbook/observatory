---
title: The day after
date: 2026-09-26
projects: 
  - observatory
---

Following all the festivities of yesterday, today was remarkably quiet. I had no plans, and I definitely didn't want any plans. At all! I just wanted to rest, do a little housework, and a little Observatory.

I'm still feeling the effects of yesterday. I wasn't hungover or anything like that, just very, very tired. It is that feeling where all the energy and adrenaline has just been ramping up towards the big day yesterday, and then today I finally realise how tired I actually am. It is good to be able to rest a bit.

I did manage to do a little bit of housework with my partner, who thankfully was incredibly understanding. He really is one of a kind!

After he left for work, I could do a little Observatory after some quiet days on that front. We started the afternoon by thinking about the next steps. I have decided that the current Sick Bay page will be slightly demoted to a page within Sick Bay, so that we end up with a similar structure to Science and Engineering: they are the overall areas with subdomains inside them. The same will be true here. What we have built so far will likely become Body Composition or something along those lines. We also discussed what other pages Sick Bay could contain, and what their purpose would be.

Then I asked Kepler for a little audit of the code base, and that led to some technical issues. Thankfully everything could be recovered in another conversation, and instead of building out Sick Bay, the result became an updated backlog, as well as an audit of the code base.

The audit turned out to be a very useful exercise. There was no need for a major rewrite, but it did uncover a collection of smaller issues and opportunities for making the Observatory a little more robust. We cleaned up the authentication boundaries around Sick Bay, made sure private data is properly cleared when access changes, improved error handling, and fixed a few bits of old or duplicated code. We also tightened up some of the Body Composition machinery, including the InBody history charts, which now use the actual dates of measurements rather than simply spacing observations evenly across time.

We went through the Supabase access model as well, checking the RLS policies and the functions used for reading and writing private data. That also revealed an old version of the InBody save function that was no longer used, so it could finally be removed. We tested the Training data flow from end to end too, with a deliberately ridiculous 999 kg training observation briefly making me by far the strongest human being in recorded history.

Finally, we added proper static type checking to the Observatory. The first check rather dramatically reported 82 errors. That number was somewhat less alarming once we looked at what was actually behind it: many of them are repeated consequences of a much smaller number of typing issues in older code. We even fixed the first one before stopping, bringing the grand total down to 80. So there is now another rather well-defined clean-up job waiting in the backlog.

All in all, not quite the Observatory afternoon I had expected, but probably a more useful one.

Now, however, on that note, it is definitely time for me to hopefully get a good, long, full night's sleep... the first in many days!