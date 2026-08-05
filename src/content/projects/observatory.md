---
title: Observatory

status: Active

started: 2026-07-20

purpose: >
  Build a personal digital home for observations, projects, data, and exploration.

outcomes:
  - Daily Logbook
  - Project pages
  - Personal dashboards
---

## Background

I have always been fascinated by the idea of having an online place that I could truly call *home*. Whenever I explored existing platforms --- social media, blogging services, website builders, and the like --- they always felt like someone else's space rather than my own.

The obvious solution eventually became the most appealing one: to build my own digital home from the ground up. Every design decision should therefore answer one simple question: *does this make Observatory feel more like home?*

## Original idea

Observatory should become a place where I can collect observations, develop ideas, explore subjects in depth, learn new skills, write code, build visualisations, and organise long-term projects.

More importantly, it should reflect the way I think and work.

Observatory is designed primarily for myself rather than for an imagined audience. If others happen to find inspiration here, they are more than welcome to do so, but external expectations should never determine its direction.

## Current direction

The current phase is focused on building the underlying framework of Observatory.

That means both technical and conceptual work: creating the architecture, defining the different sections of the site, and deciding what genuinely belongs here. Just as importantly, it also means recognising which ideas are merely technically interesting without actually contributing to Observatory's identity.

## Principles and lessons learned

### Design principles

#### Minimise friction

When choosing between alternative designs, prefer the one that reduces everyday friction the most.

A system that is easy to use is a system that is actually used.

#### One authoritative source of truth

Every piece of information should exist in exactly one place.

Pages, registers, dashboards, and visualisations are simply different ways of presenting the same underlying data.

Whenever possible, derived information should be generated automatically.

#### Reuse rather than duplicate

When code or logic begins to appear in multiple places, it should be extracted into a reusable component or function rather than copied.

### Astro architecture

#### Separation of responsibilities

Each directory has a single responsibility.

- `content/` stores data and written content.
- `components/` contains reusable building blocks.
- `pages/` assembles complete pages from components.
- `layouts/` defines the shared page structure.
- `lib/` contains shared business logic and helper functions.

A page should primarily describe **what** is displayed rather than **how** it is produced.

#### Components

Components should be named after what they **are**, not what they **do**.

Good:

    LogEntryList

Less good:

    PrepareLogEntries

Components should be made flexible through props whenever appropriate.

For example:

    <LogEntryList limit={5} />

Default behaviour should always feel intuitive. If `limit` is omitted, every available entry should be displayed.

### Learning principles

#### Understand first, abstract later

Learn one new concept at a time.

It is perfectly acceptable to treat part of the system as a temporary black box if that makes it possible to understand the rest.

Concepts such as:

- `Promise.all()`
- `async`
- `.sort()`

do not need to be fully understood the first time they are encountered. Initially it is enough to know what they accomplish in the current context. A deeper understanding can follow naturally later.

### Development principles

#### Refactor early

Once the same logic begins to appear in multiple places, move it into a shared component or function.

Do not wait until five copies exist.

At the same time, avoid creating abstractions before there is a genuine need for reuse.

#### Test small changes

Even simple changes should be verified.

For example, if

    <LogEntryList limit={1} />

behaves correctly, there is much greater confidence that the component will also work with other values.

#### Build in small steps

Prefer many small, verifiable improvements over one large implementation.

After each meaningful step:

1. Verify that the site still works.
2. Commit the changes.
3. Push them to the repository.

Small iterations make mistakes easier to locate and significantly reduce the cost of experimentation.
