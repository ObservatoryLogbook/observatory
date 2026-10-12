---
title: Streamlining training history
date: 2026-10-12
---

After last week’s exceptionally intense schedule, Monday was largely about catching up and returning to something resembling a normal routine.

The day began with an early morning workout, followed by the usual Gym Finish Apple Shortcut. Yesterday, we extended the shortcut to automatically register completed training days in Supabase, alongside its existing tasks of maintaining my training logs. Although everything worked during testing, this morning was its first proper field test. It passed with flying colours: by the time I got home, today’s training session had already been recorded in Observatory’s database.

The evening brought another quiet session of Observatory development. Having automated the registration of future training days, the obvious next step was to reconstruct the past. My historical training records were scattered across a collection of Apple Notes, but a small export shortcut made it surprisingly straightforward to extract the dates. After a little data cleaning, all 152 training days from 2026 were successfully consolidated in Supabase.

That is 152 out of 285 days this year — just over 53%, or slightly more than one workout every other day. Not a bad result, particularly considering how much else has happened this year.

With both the historical data and automatic registration in place, the foundations of Training History are now complete. The Edge Function has also been added to Observatory’s Git repository, ensuring that the backend code is preserved alongside the rest of the project.

Tomorrow, perhaps, the visualisation work can begin. For tonight, however, it is time to rest.