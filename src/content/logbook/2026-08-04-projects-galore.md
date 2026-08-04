---
title: What is a project to me?
date: 2026-08-04
projects:
  - observatory
---

Back in development, I turned my attention to Projects: what a project actually is to me, and what role it should play within the Observatory.

I eventually arrived at the following definition:

> A project is a long-running effort centred around a single idea, question, or objective. It provides the context within which individual observations make sense. While the Logbook records events chronologically, a Project brings them together thematically, offering an overview of the original purpose, the current state, the accumulated knowledge, and the eventual outcomes. A project does not necessarily end when its objectives have been reached. Some projects naturally transition into operation, where they continue to exist as part of everyday life while occasionally giving rise to new development projects.

With that definition in place, I started implementing Projects in Astro. Naturally, the very first project became delightfully meta: the Observatory itself.

I began by creating a simple project page describing its purpose and direction. From there, I spent some time figuring out how observations should reference projects. That led me to the concept of *slugs*, which was new to me but turned out to be an elegant solution. Instead of maintaining lists manually, each observation simply points to its project, allowing the project page to assemble its related observations automatically.

The result is still wonderfully ugly, but it works. I now have a functioning project page that combines descriptive content with automatically generated links to the observations that belong to it. The visual design can come later. Establishing the architecture was the important milestone.

These are small steps, but they feel significant. After several days away in Northern Jutland, it was surprisingly peaceful to return home and continue building the Observatory.
