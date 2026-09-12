---
title: Sick Bay input done
date: 2026-09-12
projects:
  - observatory
---

Unlike yesterday, today was ridiculously productive and relaxing at the same time. I love those days.

First, I managed to do yesterday's training today, so that was out of the way. I continue to really like the new programme, so I am still very motivated to go to the gym.

Back home, it is very quiet. My partner is working all day today from 9am to 9pm, even though it is Saturday. But that meant a full day of Observatory. And what a day!

We started out by verifying and checking the actual data that need to go into Sick Bay. This turned into quite a bit more than I had expected. We went through the different sources one by one and ended up building the entire input side for body data.

KaradaScan came first. The form is deliberately optimised for my phone, because that is where I will actually enter the measurements every morning. We had discussed building an actual Shortcut on iOS to record the KaradaScan data daily, but having this as a dedicated website is just as easy. 

Circumferences came next, followed by blood pressure with three separate readings. Those are designed primarily for the iPad. Along the way, we stripped away quite a lot of unnecessary interface: fewer boxes and borders, more whitespace, compact date fields, sensible numerical keyboards, and save buttons where my right thumb expects them to be.

And then came the final boss: InBody. There is quite a lot of data on one of those printouts, including the ten impedance measurements at 20 and 100 kHz. After several iterations, we ended up with a surprisingly compact form where even the impedance data fit neatly into a small two-by-five matrix. The entire InBody input now fits on a single iPad screen.

More importantly, all four forms actually work. They are authenticated through Supabase, write directly to the database, and the database itself controls whether I am allowed to write the data. We also decided to abandon the original idea of using an iPhone Shortcut as an ingestion layer, at least for V1. Entering the data directly into Observatory is simpler and, now that I have tried it, much nicer.

Somewhere during all of this, I also managed to hit the maximum length of a ChatGPT conversation for the second time. Rather appropriately, it happened just after KaradaScan, Circumferences and Blood Pressure were finished, leaving InBody as the one remaining task when Kepler and I moved into a fresh chat. There are apparently limits to how much one can discuss HTML and CSS in a single conversation. I consider this useful empirical knowledge.

The day was only interrupted by laundry (five full loads!) and by a visit to one of my favourite people: my "face lady", who every six weeks or so gets to take full care of my face. It is one of the ways I like to treat myself, both physically and mentally.

Tomorrow we will start actually visualising data, but still, the fact that I now have a direct way to input data into Sick Bay on Observatory is absolutely fantastic!