---
title: New programme, data structures, ice cream and a movie
date: 2026-08-30
projects:
  - observatory
engineering:
  - training
---

Sundays are fundays - definitely around here. I often get a lot of big and small things done on Sundays, perhaps because there often is no structure laid out, not a plan, not a rigid schedule. That is very unlike the rest of the week. 

Today was different, however, today was all about plans and structures and schedules. Although not the day itself. 

I really enjoy strength training, I can see progress, and that motivates me. However, my current training programme was due for a small overhaul. I train Monday, Wednesday, Friday and Sunday mornings, but the exercises were unevenly divided between the different days. Either I had to spend almost two hours in the gym Monday mornings or Friday mornings, and that was too much. Furthermore, my lower back has been annoying me, so we wanted to introduce more exercises to strengthen that. 

The solution: training five days a week. This morning, we spent the time between sets sorting out the new training programme. I'm really excited about it starting tomorrow! And yes, the new programme is already uploaded to the [Training page](../engineering/training). 

Back home, we finally started tackling the next big Observatory project: how to import data from my phone, e.g., to [Training](../engineering/training). Before doing that, though, we needed to figure out which data structures to use and how. 

What initially seemed like a fairly simple data-import problem quickly turned into a more fundamental discussion about Observatory’s data architecture. We cleaned up the Training dataset and reduced it to the five observations we actually need to store: date, exercise, weight, reps and RPE. Everything else, estimated one-rep maxes, trends and other metrics, should be calculated from those observations rather than stored alongside them.

The same principle turned out to work remarkably well for body data. Weight, body composition, circumferences, blood pressure and InBody measurements are observations; weekly averages, fat and muscle mass, trends and correlations are interpretations. **Store observations. Derive interpretations.** That became today’s central design principle.

We almost went ahead and created a new Numbers file to serve as the source of truth for all of this. Fortunately, a Sunday power nap intervened. If the data will ultimately be consumed and analysed by Observatory, why should Numbers sit permanently in the middle? Instead, we started designing backwards from what Observatory will eventually need: a private canonical data store that can receive measurements directly from my phone, combine Training, Body and eventually Apple Health data, and securely share selected data with the very small number of people I trust with access.

That led us to our current architectural candidate: a small private PostgreSQL database using Supabase, with authentication and access control built in. Numbers may still be useful for migration, but it no longer needs to be part of the permanent architecture. We didn’t get as far as building the proof of concept today: apparently ice cream has higher scheduling priority than database architecture. For once, stopping before building anything may have been the most productive part of the exercise.

My partner had put me on a schedule. The reason: we needed to go out for one of the season's last ice creams. Unfortunately, it wasn't a good one! So we may, just may, have to go for another one soon. That was followed by a full-on date night with dinner and a movie. 

All in all, a very fun Sunday: a new training programme, the beginnings of a new data architecture for Observatory, a strategically important power nap, disappointing ice cream, and a very good date night.