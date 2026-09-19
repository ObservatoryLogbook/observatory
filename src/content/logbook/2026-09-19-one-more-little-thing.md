---
title: "One more little thing"
date: 2026-09-19
projects: 
	- observatory
---

I woke up at four this morning and never really managed to fall asleep again. This was not an especially promising start to a Saturday.

At some point I had to decide between going to the gym and opening Observatory. I had intended to choose the gym. Instead, I gave myself exactly one hour of Observatory first, with a timer and everything. This seemed sufficiently responsible.

It escalated.

There was training, eventually. There was also laundry, a nap that may have been the highlight of the day, and some vague attempts at being a functional adult. But in between, Sick Bay kept pulling me back in.

The InBody section had been waiting for its turn. And before anything could be visualised, there was quite a lot of plumbing to do.

I had transcribed the complete historical segmental data from my old InBody printouts: lean mass, fat mass and their respective evaluation percentages for both arms, both legs and the trunk. Today those data finally got a proper home in Sick Bay. We created a new `inbody_segmental_analysis` table in Supabase, added the appropriate access policies, imported the historical measurements and extended the existing InBody save function to handle the twenty new segmental values alongside the assessment and impedance data.

Then came the slightly nerve-racking part: testing the entire chain from the input form in the browser through the save function and into all three InBody tables. It worked. The test data appeared exactly where they were supposed to, and could subsequently be deleted again.

Success. No rows returned.

With the infrastructure in place, we could finally start asking questions of the data.

One small detour was visceral fat. InBody reports a visceral fat level as well as an evaluation of trunk fat, and I wondered whether the two were essentially telling me the same thing. In my eighteen measurements, they very nearly are: the two series are extremely strongly correlated. Useful to know, because it suggests that plotting both longitudinally would add relatively little information.

A more interesting question concerned KaradaScan and InBody.

The two instruments disagree rather spectacularly on my absolute skeletal muscle mass. Karada puts me somewhere around 35 kg, while InBody currently says 49.5 kg. Rather than disappearing into the rabbit hole of trying to establish which number is somehow the *true* one, we compared the fourteen dates for which I have measurements from both instruments.

The result was reassuring. Despite their very different absolute estimates, the muscle measurements follow each other quite closely and are strongly correlated. The same is true for fat mass. In other words, the instruments disagree about the absolute scale, but broadly agree about the changes taking place over time.

That makes the division of labour rather appealing: Karada gives me daily, high-frequency measurements, while the much sparser InBody scans add something Karada cannot provide: information about *where* those changes are occurring.

And that brought us to the visualisation.

What started as a rather primitive stick figure with five numbers around it slowly turned into something I had not quite imagined beforehand: a proper segmental body-composition visualisation. Five tiny histories for arms, trunk and legs, arranged around a silhouette and fed by the actual measurements from my InBody scans.

The silhouette itself became a project within the project. After several increasingly muscular but anatomically questionable attempts, my partner and I drew an outline ourselves. Kepler turned it into an SVG path. Somehow, this worked.

Then my partner and I went out for dinner at Asador. Excellent meat, a sufficiently large quantity of it, and apparently still enough remaining capacity for ice cream from Ismageriet on the way home.

And because apparently that was not quite enough for one Saturday, I opened Observatory again afterwards. A few final adjustments to the sparklines, a tiny axis, nineteen months compressed into a few centimetres, and suddenly the whole thing looked finished.

Not finished-finished, obviously.

This is Observatory.

But finished enough that I am now writing this with my eyes almost closed.

**Status:** Success. No rows returned.