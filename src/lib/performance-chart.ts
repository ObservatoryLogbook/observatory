import type { E1RMPoint, TrendResult } from "./training-data";

// Keep the chart's geometry and SVG classes shared with PerformanceChart.astro.
export function renderPerformanceChart(
    svg: SVGSVGElement,
    data: E1RMPoint[],
    trend: TrendResult | null
) {
    svg.replaceChildren();
    if (data.length === 0) return;

    const width = svg.viewBox.baseVal.width;
    const height = svg.viewBox.baseVal.height;
    const padding = { top: 5, right: 20, bottom: 48, left: 58 };
    const plotWidth = width - padding.left - padding.right;
    const plotHeight = height - padding.top - padding.bottom;
    const minDate = Math.min(...data.map((point) => point.date.getTime()));
    const maxDate = Math.max(...data.map((point) => point.date.getTime()));
    const firstDataDate = new Date(minDate);
    const lastDataDate = new Date(maxDate);
    const domainStart = Date.UTC(
        firstDataDate.getUTCFullYear(), firstDataDate.getUTCMonth(), 1
    );
    const domainEnd = Date.UTC(
        lastDataDate.getUTCFullYear(), lastDataDate.getUTCMonth() + 1, 1
    );
    const values = data.map((point) => point.e1RM);
    let yMin = Math.floor(Math.min(...values) / 5) * 5;
    let yMax = Math.ceil(Math.max(...values) / 5) * 5;
    if (yMin === yMax) {
        yMin -= 5;
        yMax += 5;
    }

    const x = (date: Date) => padding.left +
        (date.getTime() - domainStart) / (domainEnd - domainStart) * plotWidth;
    const y = (value: number) => padding.top +
        (1 - (value - yMin) / (yMax - yMin)) * plotHeight;

    const fragment = document.createDocumentFragment();
    function append<K extends keyof SVGElementTagNameMap>(
        tag: K,
        attributes: Record<string, string | number>,
        text?: string
    ): SVGElementTagNameMap[K] {
        const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
        for (const [name, value] of Object.entries(attributes)) {
            element.setAttribute(name, String(value));
        }
        if (text !== undefined) element.textContent = text;
        fragment.appendChild(element);
        return element;
    }

    append("line", {
        x1: padding.left, y1: padding.top + plotHeight,
        x2: padding.left + plotWidth, y2: padding.top + plotHeight,
        class: "axis",
    });
    append("line", {
        x1: padding.left, y1: padding.top,
        x2: padding.left, y2: padding.top + plotHeight,
        class: "axis",
    });

    for (let value = yMin; value <= yMax; value += 5) {
        append("line", {
            x1: padding.left, y1: y(value),
            x2: padding.left + plotWidth, y2: y(value),
            class: "grid-line",
        });
        append("text", {
            x: padding.left - 10, y: y(value), class: "axis-label y-tick",
        }, String(value));
    }
    append("text", {
        x: 14, y: padding.top + plotHeight / 2,
        class: "axis-title",
        transform: `rotate(-90 14 ${padding.top + plotHeight / 2})`,
    }, "e1RM (kg)");

    for (let tick = domainStart; tick <= maxDate;) {
        const date = new Date(tick);
        const month = date.toLocaleDateString("en-GB", {
            month: "short", timeZone: "UTC",
        });
        const label = date.getUTCMonth() === 0 || tick === domainStart
            ? `${month} ${date.getUTCFullYear()}` : month;
        append("line", {
            x1: x(date), y1: padding.top,
            x2: x(date), y2: padding.top + plotHeight,
            class: "month-grid-line",
        });
        append("text", {
            x: x(date), y: padding.top + plotHeight + 22,
            class: "axis-label x-tick",
        }, label);
        tick = Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1);
    }
    append("text", {
        x: padding.left + plotWidth / 2, y: height - 2,
        class: "axis-title x-title",
    }, "Date");

    if (trend) {
        append("line", {
            x1: x(trend.startDate), y1: y(trend.start),
            x2: x(trend.endDate), y2: y(trend.end),
            class: "trend-line",
        });
    }

    // Render the recorded top sets.
    for (const point of data) {
        append("circle", {
            cx: x(point.date),
            cy: y(point.e1RM),
            r: 4,
            class: "data-point",
        });
    }

    // Hover elements, matching the Cardiovascular chart.
    const hoverLayer = append("g", {
        visibility: "hidden",
        class: "performance-hover-layer",
    });

    const hoverLine = document.createElementNS(
        "http://www.w3.org/2000/svg", "line"
    );
    hoverLine.setAttribute("class", "performance-hover-line");
    hoverLine.setAttribute("y1", String(padding.top));
    hoverLine.setAttribute("y2", String(padding.top + plotHeight));
    hoverLayer.appendChild(hoverLine);

    const tooltip = document.createElementNS(
        "http://www.w3.org/2000/svg", "g"
    );
    tooltip.setAttribute("class", "performance-hover-tooltip");
    hoverLayer.appendChild(tooltip);

    const tooltipWidth = 158;
    const tooltipHeight = 78;

    const background = document.createElementNS(
        "http://www.w3.org/2000/svg", "rect"
    );
    background.setAttribute("width", String(tooltipWidth));
    background.setAttribute("height", String(tooltipHeight));
    background.setAttribute("rx", "3");
    background.setAttribute("class", "performance-hover-tooltip-bg");
    tooltip.appendChild(background);

    const tooltipLines = [15, 33, 51, 69].map((position, index) => {
        const line = document.createElementNS(
            "http://www.w3.org/2000/svg", "text"
        );
        line.setAttribute("x", "8");
        line.setAttribute("y", String(position));
        if (index === 0) {
            line.setAttribute("class", "performance-hover-tooltip-date");
        }
        tooltip.appendChild(line);
        return line;
    });

    // A transparent target makes the entire plot interactive.
    const hoverTarget = append("rect", {
        x: padding.left,
        y: padding.top,
        width: plotWidth,
        height: plotHeight,
        fill: "transparent",
        "pointer-events": "all",
    });

    svg.appendChild(fragment);

    const dateFormatter = new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
    });

    hoverTarget.addEventListener("pointermove", (event) => {
        const bounds = svg.getBoundingClientRect();

        const pointerX =
            ((event.clientX - bounds.left) / bounds.width) * width;

        const clampedX = Math.min(
            padding.left + plotWidth,
            Math.max(padding.left, pointerX)
        );

        const pointerTime = domainStart +
            ((clampedX - padding.left) / plotWidth) *
            (domainEnd - domainStart);

        const nearest = data.reduce((best, point) =>
            Math.abs(point.date.getTime() - pointerTime) <
            Math.abs(best.date.getTime() - pointerTime)
                ? point
                : best
        );

        const snappedX = x(nearest.date);

        tooltipLines[0].textContent =
            dateFormatter.format(nearest.date);
        tooltipLines[1].textContent =
            `e1RM: ${nearest.e1RM.toFixed(1)} kg`;
        tooltipLines[2].textContent =
            `Top set: ${nearest.weight} kg × ${nearest.reps}`;
        tooltipLines[3].textContent =
            `RPE: ${nearest.rpe}`;

        hoverLine.setAttribute("x1", String(snappedX));
        hoverLine.setAttribute("x2", String(snappedX));

        const tooltipGap = 10;
        const tooltipX =
            snappedX + tooltipGap + tooltipWidth <=
            padding.left + plotWidth
                ? snappedX + tooltipGap
                : snappedX - tooltipGap - tooltipWidth;

        tooltip.setAttribute(
            "transform",
            `translate(${tooltipX} ${padding.top + 10})`
        );

        hoverLayer.setAttribute("visibility", "visible");
    });

    hoverTarget.addEventListener("pointerleave", () => {
        hoverLayer.setAttribute("visibility", "hidden");
    });
}
