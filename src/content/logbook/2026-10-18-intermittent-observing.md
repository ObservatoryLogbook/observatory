---
title: Intermittent observing
date: 2026-10-18
projects:
  - observatory
---

There is no doubt that Observatory serves as an escape for me. Especially these days, when work doesn't just leave me stimulated, but overstimulated. When that happens, I need to withdraw and focus on one or a few things, preferably on my own. Observatory has been perfect for that.

What really works for me is that I get to do a bit of programming, design something that lowers barriers and simply works the way I want it to, and gradually build something that feels entirely my own. Perhaps more importantly, through my daily observations, I also get to reflect on the day and write about it. I genuinely enjoy both aspects, as well as the more technical side of Observatory, even if, for now, the audience is just me.

Over the next week or two, however, I suspect I will have less time for Observatory than I have had recently. Work will demand most of my time and energy, and that is okay. I have a few very important projects coming up that will require my full attention. I will still be around, and I will probably do a little work behind the scenes, but daily observations may become less frequent for a while. After that, things should return to normal, which I am already looking forward to.

Being the person I am, I also very much enjoy having things in their proper places, with everything having a specific place where it belongs. In my mind, there is even a limit to how many things can live in one place before I start losing track of what is there.

Observatory's styling had gradually become home to too many different elements, and it was time for a thorough clean-up. That is what we set out to do today.

We started with the largest offender: `global.css`, which had grown into a rather substantial collection of unrelated styling rules. We split it into smaller, purpose-specific stylesheets covering design tokens, base styling, navigation, overview pages, cards, projects, Logbook, and responsive behaviour. The goal was not simply to reduce the size of a file, but to give each part of the design a clear and logical home.

From there, we turned our attention to styling that had been duplicated across different parts of Observatory. Body Composition and Cardiovascular now share common Sick Bay styling, while chart-related elements across Training and Sick Bay have been consolidated into a shared stylesheet. Engineering and the Sick Bay landing page also gained a common foundation for their cards and layouts. Along the way, we made a small visual improvement to Cardiovascular by replacing its trend arrows with the same neutral chevrons used elsewhere.

We then tackled something that had been bothering me for a while: the lack of consistency between the main section headers. Science, Engineering, Sick Bay, and Logbook now use a shared `SectionHeader` component, with a consistent typographic hierarchy and optional icons. Logbook, in particular, lost its rather prominent green header box in favour of something simpler and more in keeping with the rest of Observatory. Importantly, its observation register remained unchanged.

Finally, we addressed the widths of our content pages. Food and Reading already used the same maximum width, while Logbook was slightly wider. Rather than continuing to maintain these values independently, we introduced shared layout definitions, distinguishing between narrower collection pages and wider, dashboard-oriented pages. This should make it much easier to build future features, such as the meal-planning section I am increasingly eager to get started on, without having to rediscover old design decisions.

Throughout the day, we worked in small, controlled steps, testing each change before moving on. Every round passed Astro's checks without errors, warnings, or hints, and every build completed successfully. Just as importantly, I checked the results visually on both my computer and my phone. Apart from the intentional changes, Observatory looked and behaved exactly as before.

**Seven rounds of refactoring, and remarkably little to show for it on the surface. Which, of course, was precisely the point.**

We also updated Observatory's project description to reflect how much the project has matured. The focus is no longer primarily on building the underlying infrastructure, but on using what is already there, consolidating what we have learned, and developing new functionality when there is a genuine need for it.

And somewhere between all of this, I still managed to prepare dinner and food for the coming week, and have a conversation with my parents. Not a bad Sunday at all.

Now that things have been tidied up, I feel calmer. Everything has a place again, and I have a much clearer sense of how Observatory should grow from here.

I am ready to take on next week, head-on.
