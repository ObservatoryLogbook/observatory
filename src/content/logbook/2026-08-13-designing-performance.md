---
title: Designing Performance
date: 2026-08-13
projects:
  - observatory
---

Yesterday I managed to get my first real training data into Observatory. Today was about deciding what to do with them.

I already have a fairly elaborate training dashboard in Numbers, and it has served me well. Rather than simply recreating it in Observatory, however, I wanted to reconsider what the different metrics actually mean and what I want the Training page to tell me.

The central metric will remain estimated one-rep max, or e1RM. My top sets vary considerably in weight, number of repetitions, and RPE, so e1RM gives me a useful way of comparing performances that would otherwise be difficult to compare directly. The Performance section will eventually contain separate graphs for squat, bench press, and deadlift, showing e1RM over time.

My existing dashboard also has linear regression lines on these graphs. Those will not survive the move to Observatory. Training progress is rarely linear, and a regression across the entire dataset can easily obscure what is actually happening. Furthermore, we sometimes spend a period of a couple of months practicing a certain variation of a lift, which also obscures real progress. The individual observations are more interesting than an apparently authoritative straight line through them.

Above the graphs, each of the three lifts will have a small status card. We settled on three pieces of information:

- **Current e1RM:** the highest calculated e1RM within the latest 28 days of training data. Four weeks fits naturally with my weekly training cycle and makes the metric less sensitive to a single bad day or a deliberately lighter session.
- **1RM PR:** the heaviest weight I have actually lifted for one repetition, including the RPE and the first date on which I achieved it. Unlike e1RM, this is not an estimate. It happened.
- **Goal:** my current strength goal, including the target weight, repetitions, and target date.

This distinction between estimated strength and demonstrated strength feels important. An e1RM of 100 kg does not mean that I have bench pressed 100 kg. My goal is to actually put 100 kg on the bar and lift it.

One feature from the old dashboard is being retired: the progress bars. Expressing progress towards a strength goal as a percentage suggests a precision that simply is not there. Being able to lift 90 kg does not meaningfully make me exactly 90% of the way towards lifting 100 kg.

There may eventually be a better way to visualise that kind of progress: a timeline showing when I first achieved successive real one-rep milestones. That can wait.

For now, the design is settled. Tomorrow I can start building the cards.
