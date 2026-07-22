---
title: Building a simple architecture
date: 2026-07-22
---

The number of observations is still small, but it is already time to think about the overall architecture of this corner of the internet.

Building on previous Python experience, the first decision was to place reusable components in a central location, so they only need to be maintained in one place. This reduces the risk of errors and makes creating new pages simple and straightforward. The components can also be adapted by passing properties to them, making them flexible and reusable.

As the number of logbook entries and observations slowly grows, it is also time to create a dedicated front page, which for now will show only the 5 latest entries, as well as a separate page containing the complete logbook.

This exercise reminded me so much of programming in Python, which I used to do all the time. So nostalgic!
