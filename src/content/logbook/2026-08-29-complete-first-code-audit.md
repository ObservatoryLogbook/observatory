---
title: The first systems audit
date: 2026-08-29
projects:
  - observatory
---

The cleaning continued today.

After asking Kepler to review the complete Observatory codebase earlier this week, I have now worked my way through the results of the first proper systems audit: roughly 4,900 lines of Astro, TypeScript and CSS.

The most important conclusion was also the most reassuring one: the architecture is fundamentally sound. Observatory does not need a major rewrite.

What we found instead was mostly evolutionary sediment. Code that had made sense when it was written, but had since been overtaken by better patterns elsewhere in Observatory. There were a few actual mistakes, some unused code, repeated logic that had finally become mature enough to abstract, and a handful of places where behaviour depended on assumptions that had never been made explicit.

The first step was simply to fix and remove things. A malformed link, an extra closing HTML tag, an RSS link in the wrong part of the document, invisible copy-and-paste characters, unused imports and variables, obsolete training logic, old CSS selectors and even an entire `.old.astro` component disappeared.

That last one also produced a useful rule for Observatory:

**The repository represents the current system. Git represents its history.**

I am still getting used to that. Years of programming without version control have left me with a tendency to keep files called `old`, `new`, `newest` and variations thereof, just in case. There is no reason to do that anymore.

The second part of the audit was consolidation. The green section headings became a shared design primitive. Related observations, which had independently evolved into almost identical implementations in Food, Reading and Training, became a single component. Food had grown sufficiently complex that its taxonomy, grouping and statistics were moved into its own `lib/food.ts`.

We also made some less visible improvements. Reading now has deterministic sorting rules rather than relying on collection order. Science now loads the Logbook once when counting observations across projects instead of querying it separately for every project. PerformanceChart lost a little redundant code and gained proper types.

Some findings deliberately resulted in no code changes.

The simple CSV parser used by Training is not robust enough for every possible CSV file, but it works for the current Numbers export. Rather than patching it in isolation, we will reconsider the ingestion format when the planned phone-to-Observatory dataflow is designed.

Training is also still a very large file. But it is well structured, and splitting it merely to produce smaller files would not improve Observatory. There are natural component boundaries if they become useful later. For now, they can stay where they are.

Even the lack of an empty-data guard in PerformanceChart turned out not to be a problem: the component belongs to a system in which it is only created for lifts with existing performance history. Not every theoretically possible state needs code to handle it.

That may be the most useful lesson from the audit. Refactoring is not about making everything abstract, generic or identical. It is about recognising which things have acquired the same function and which differences are meaningful.

Or, in a principle we have arrived at several times while building Observatory:

**Unify things that have the same function, not things that merely look similar.**

So this is a useful breakpoint.

The first version of Observatory grew quickly. We experimented, changed terminology, replaced designs and discovered better patterns as we went. After its first complete systems audit, those patterns are now sufficiently established that we could clean up much of what was left behind without having to rethink the system itself.

Observatory is still small, still incomplete and still evolving.

But the foundations hold.