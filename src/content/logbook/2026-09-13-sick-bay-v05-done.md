---
title: Sick Bay v0.5 Done
date: 2026-09-13
projects:
  - observatory
---

This morning started off exactly where we left off last night, with the Sick Bay Input page. However, now I'm no longer the developer, now I'm the user. I measure the circumference of certain body parts every Sunday morning, and this morning was no different. And then I got to input it directly into the Sick Bay Supabase, using the input page we worked on yesterday. And it worked like a charm! So easy and straightforward, it actually made me happy to input a small record.

The next big step was to start displaying some of the data in Sick Bay. Until now, all the work has been about getting data safely into Supabase. Today, some of it finally came back out again.

We started with the three measurements I want at the top of Sick Bay: weight, fat mass, and muscle mass. All three are based on my daily KaradaScan measurements and shown as rolling seven-day averages, which makes much more sense to me than whatever happened to be measured on a single morning. Below each number is a twelve-week trend, calculated from the underlying daily measurements.

Then came the first proper history plot. Weight now has a full 365-day view, with the individual daily measurements kept as faint points and the seven-day average drawn on top. Missing measurements remain missing rather than being interpolated, and the latest twelve weeks are subtly highlighted to correspond to the period used for the current trend. We spent a perhaps slightly unreasonable amount of time on widths, axes, spacing, labels, legends, and a few pixels here and there. But by the end it looked exactly like it belonged in Observatory rather than like a generic health dashboard.

The work was only interrupted by a training session, which started with an InBody scan and gave me yet another chance to test the input functions.

I broke for a nap early afternoon. After all, it is Sunday, and I love my naps. I thought I would do a little more Sick Bay before my partner came home, but then Sunday cleaning happened, followed by meal prepping for the week, which included making frikadeller from 3 kg of ground meat, cooking dinner for us, and so on. I only went back to Sick Bay in the evening, when we finished polishing the layout. So satisfying!

And that means finishing in yet another clean place. We are ready for a little more Observatory tomorrow.