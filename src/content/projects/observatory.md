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

Observatory has moved beyond its initial phase of establishing the underlying framework. Its core sections and several practical systems are now in place, including the Logbook, project pages, reading and recipe collections, training records, and personal health dashboards.

The emphasis is shifting from building infrastructure to **using what already exists**: recording observations, developing Science projects, maintaining Engineering collections, and allowing real everyday needs to guide what comes next.

Consolidation is part of this transition. Shared design patterns, components, styles, and functions should be made consistent and easier to maintain, without redesigning working systems simply for the sake of change.

New features should emerge from concrete uses rather than from the temptation to build another system. Observatory should remain a place for curiosity, experimentation, and learning --- not become an obligation to maintain.

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

When code, styling, or logic begins to appear in multiple places, look for an opportunity to extract the shared decision into a reusable component, style, or function rather than copying it.

The goal is not to minimise the number of lines of code. It is to minimise the number of places where the same decision must be maintained.

#### A coherent visual language

Observatory should feel like one place across all its sections. Typography, colours, spacing, headers, cards, and other recurring elements should follow shared design principles, while individual pages retain the presentation their content requires.

A page's place in the navigation is not the same as its function. Science, Engineering, and Sick Bay can act as portals; Logbook, Food, and Reading can act as collections. Their headers can share a common structure even when the content beneath them is very different.

Use established layout widths rather than choosing new dimensions independently for every page. Collection-style pages should share a common content width, while wider dashboards and portals may need a different layout.

### Astro architecture

#### Separation of responsibilities

Each directory has a clear responsibility.

- `content/` stores data and written content.
- `components/` contains reusable building blocks.
- `pages/` assembles complete pages from components.
- `layouts/` defines the shared page structure.
- `lib/` contains shared business logic and helper functions.
- `styles/` contains the shared visual foundations and styles used across sections.

A page should primarily describe **what** is displayed rather than **how** it is produced.

#### Styling responsibilities

Use a single global stylesheet entry point to load a small number of clearly organised CSS modules.

- Shared design values, typography, layout widths, and recurring visual patterns belong in common styles.
- Reusable components should own the styling specific to their structure and behaviour.
- Page-local styles should be reserved for genuinely page-specific presentation.

Do not move CSS into a global file merely to make an Astro file shorter. Consider scope, specificity, responsive behaviour, and whether the rules actually express the same design decision.

Structural refactoring should ordinarily preserve the existing appearance and behaviour. Intentional design changes should be considered and tested separately.

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

Once the same logic or visual pattern begins to appear in multiple places, consider moving it into a shared component, style, or function.

Do not wait until five copies exist.

At the same time, avoid creating abstractions before there is a genuine need for reuse.

#### Test small changes

Even simple changes should be verified.

For example, if

    <LogEntryList limit={1} />

behaves correctly, there is much greater confidence that the component will also work with other values.

For changes to styling and layout, a successful type check and build are not enough: verify the rendered result on relevant screen sizes as well.

#### Build in small steps

Prefer many small, verifiable improvements over one large implementation.

After each meaningful step:

1. Verify that the site still works.
2. Commit the changes.
3. Push them to the repository.

Small iterations make mistakes easier to locate and significantly reduce the cost of experimentation.
