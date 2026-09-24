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
    const dateFormatter = new Intl.DateTimeFormat("en-GB", {
        day: "numeric", month: "short", timeZone: "UTC",
    });
    for (const point of data) {
        const circle = append("circle", {
            cx: x(point.date), cy: y(point.e1RM), r: 4, class: "data-point",
        });
        const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
        title.textContent = `${dateFormatter.format(point.date)} · ` +
            `${point.e1RM.toFixed(1)} kg · ` +
            `${point.weight} kg x ${point.reps} @ ${point.rpe}`;
        circle.appendChild(title);
    }
    svg.appendChild(fragment);
}
