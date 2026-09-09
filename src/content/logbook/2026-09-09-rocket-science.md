---
title: Rocket science
date: 2026-09-09
---

About a week ago, I got a new iPad Pro from work. I use it as my second screen at home, and it is where Kepler lives and resides. The iPad Pro came with a keyboard, which I love. However, it has one major drawback.

Before the new iPad Pro, I used a very old iPad which only had the on-screen keyboard. With that, I could easily access emojis, and I really like using emojis sparingly. That isn't quite as easy with the new keyboard, so I have gone old school and started using ASCII "emojis".

That is fine for a normal smiley face, :). Or a laughing face, :D. Today we invented the sunglasses emoji, 8D. But how do you write a rocket in ASCII? I often say that something is "flying", and this being Observatory, I have very often used the rocket emoji...

Current options for an ASCII rocket are:

- `===>` — classic rocket
- `>>=>` — Observatory at warp
- `~=>` — illegal fireworks
- `8D` — Mission Control

We'll see where it ends :)

The day started in a very different place. I discovered that my trainer lives inside my chiropractor!

I had my back checked after all the issues over the past couple of months, and my chiropractor recommended doing Bulgarian split squats. My trainer loves Bulgarian split squats — especially when other people are doing them — so of course I am doing them. I have a love-hate relationship with them: they are highly effective, and I want to conquer this exercise. However, they are extremely hard!

My chiropractor also recommended that I start using squat shoes. So did my trainer a week ago, and they arrived today — first use tomorrow morning! I love that they are speaking exactly the same language.

Today's Observatory session was spent continuing the work on Supabase. Yesterday, I built and tested the read-access system for private data. Today, I extended the same model to writing data.

An authenticated user can now be given separate read and write permissions for a particular data domain. I tested both sides of the write permission: with access enabled, I successfully inserted a highly fictional body measurement of 999 kg, 99% body fat and 1% muscle. With write access disabled, the database rejected exactly the same operation. I then added the ability to update and delete data, and verified that deletion was likewise allowed or denied according to my permissions.

The test data are gone again, and the system is behaving exactly as intended. The human access layer for private Observatory data is now essentially complete.

The plan for the next few steps is clear:

1. Build proper manual data entry in Sick Bay, so I can add and correct real measurements while logged in.
2. Validate and migrate my historical body data into Supabase, turning it into the canonical dataset.
3. Build automated capture for a few carefully selected datasets, allowing my iPhone Shortcuts to add routine observations such as daily KaradaScan measurements and training sets — while keeping a local backup.

But first, some rest. After all, I did also do a lot of work today. Some of it even felt like rocket science.