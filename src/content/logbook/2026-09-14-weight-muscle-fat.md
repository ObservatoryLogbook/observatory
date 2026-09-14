---
title: Weight, muscle, fat
date: 2026-09-14
projects:
  - observatory
---

If you asked me what I did today, the answer would be simple. I worked out, I worked, I cooked and had dinner, and I did a little Observatory.

When listed like that, it is difficult to believe that work is what took up by far most of my time, most of my attention, and most of my energy. Don't get me wrong, I love my work, I love my colleagues, and I love the place I work at. But it is also demanding.

That is part of the reason I am building Observatory. First, it lowers friction in the everyday tasks that I want to do, such as tracking my body composition. Just a few days ago, we made the Sick Bay Input page. I am now actually using it, and I love seeing on the Sick Bay page how my body composition is slowly changing. It is already surprisingly motivating.

Second, Observatory is an excellent hobby and therefore an excellent distraction. I get to sit and think about things I enjoy while still learning something new. I can go down rabbit holes figuring out tiny details and spend hours doing so, for no other reason than that I think it is fun.

Like tonight. I spent almost two hours working on a single plot.

The plot has three vertically stacked panels showing my weight, muscle mass and fat mass over the past year. It borrows heavily from the style of yesterday's weight plot, but all three panels now share the same time axis. That makes it very easy to compare what happens to the three quantities at the same point in time, while still giving each quantity its own useful vertical scale.

We spent most of the evening getting the basic structure right, then ended up spending an almost comical amount of time on three tiny labels. The data points behind "Weight", "Muscle mass" and "Fat mass" made the text difficult to read, so we added small background rectangles behind them. That should have been simple. Instead, we eventually discovered that the rectangles were being drawn *underneath* the data points because of the order of the SVG elements. After a fair amount of debugging, the solution was to draw them last and make them slightly transparent.

This is exactly the kind of completely unnecessary problem I enjoy solving in Observatory.

And the resulting plot is already interesting. At least according to the KaradaScan measurements, changes in my weight over the past year appear to have been dominated by changes in fat mass, while my estimated muscle mass has remained surprisingly constant. Given how much I train, I did not necessarily expect that.

Tomorrow we will probably start looking at the InBody measurements from my gym. That may turn out to be particularly interesting because InBody and KaradaScan report rather different estimates of muscle and fat mass, and may not even be measuring exactly the same thing. At the same time, I have definitely become significantly, and visibly, stronger over the past year. There is clearly more to understand here.

And hey, in just over eight hours, I get to repeat the cycle!