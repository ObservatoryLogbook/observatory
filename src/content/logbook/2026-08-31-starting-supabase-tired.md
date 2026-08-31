---
title: Starting Supabase, tired
date: 2026-08-31
---

I didn't sleep well last night. I kept tossing and turning, and I felt like I was waking up all the time without ever really waking up. The cause? Probably stress-related. We have a big application deadline tomorrow at work, and our work starts immediately afterwards, screening and preparing applications for further processing.

At the same time, we are preparing contract negotiations with three teams who will receive large grants — the largest in the history of the foundation.

On top of that, I am still starting a new team, and things are a little up in the air on many fronts. Busy times!

At least I successfully started the new training programme this morning.

On the Observatory side, we took the first concrete steps towards creating a secure online data layer. As described yesterday, we decided to test Supabase rather than make Numbers the permanent source of truth for my personal data.

Tonight, we created the Observatory Supabase project and its first table: `body_measurements`. It contains the raw observations from my home body composition scale — date, source, weight, body fat percentage and muscle percentage — while calculated values will remain exactly that: calculations. Row Level Security is enabled from the outset, since these data will eventually form part of the private side of Observatory.

The next step will be deliberately small: add a fictional measurement and first prove that an unauthorised user *cannot* retrieve it. Only then will we start opening up authenticated access and eventually connect Observatory and my iPhone to the database.

But that will be tomorrow. I am so tired, even though it is only 8pm, that my partner has ordered me to bed. Apparently I may also be getting a little grumpy...