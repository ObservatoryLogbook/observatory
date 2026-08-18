---
title: Towards a global design language
date: 2026-08-18
projects:
  - observatory
---

Today's plan was simple and easy: clean up various heading styles, quickly extend a header bar, and then be done.

Instead we ended up moving towards a global design language for Observatory. And we deleted a Training section.

On the Training page, we had a number of ways of encoding h2 headers, for example, as well as h3 headers. Some of the content also lived in Markdown files, which meant that it did not automatically inherit the local styles. All of that needed some cleaning up.

It was fairly straightforward to harmonise the different headers and make the typography consistent. However, the Current focus section did not work. The headers became too small, they didn't match the rest of the text, and the section was just... off.

After thinking about various solutions for almost half an hour, the obvious answer arrived: the problem was not the typography of the section, the problem was the section itself. Its content didn't belong in a separate section; instead, it belonged in various other parts, most notably the Current programmes section. Cleaning that up helped enormously. Although the solution seems obvious when describing it here, it really took a lot of back-and-forth, discussing various solutions. But in my opinion, that is often what marks a good decision: it has been well thought-out, alternatives and implications have been considered, and nothing was left to chance.

Following this cleanup of the typography hierarchy, we will proceed tomorrow with applying it across the rest of Observatory, at least in the places where it makes the most sense.

Visually, not a lot changed today. Behind the scenes, though, we've been busy!