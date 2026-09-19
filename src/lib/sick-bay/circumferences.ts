export type CircumferenceObservation = {
  measured_on: string;
  shoulders_cm: number;
  chest_cm: number;
  waist_cm: number;
  hips_cm: number;
  left_upper_arm_cm: number;
  left_thigh_cm: number;
};

export type FormIndexObservation = {
  measured_on: string;
  value: number;
};

export function getFormIndex(
  observation: CircumferenceObservation
): number {
  return (
    (observation.shoulders_cm +
      observation.chest_cm) /
    (observation.waist_cm +
      observation.hips_cm)
  );
}

export type CircumferenceTrend = {
  slopePerWeek: number;
  n: number;
  startDate: string;
  endDate: string;
};

export type NumericObservation = {
  measured_on: string;
  value: number;
};

function dateToDayNumber(
  date: string
): number {
  const [year, month, day] =
    date.split("-").map(Number);

  return (
    Date.UTC(year, month - 1, day) /
    86_400_000
  );
}

export function getCircumferenceTrend(
  observations: NumericObservation[]
): CircumferenceTrend | null {
  const today = new Date();

  const todayKey = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const endDay =
    dateToDayNumber(todayKey);

  const startDay =
    endDay - 83;

  const recent =
    observations.filter((observation) => {
      const day =
        dateToDayNumber(
          observation.measured_on
        );

      return (
        day >= startDay &&
        day <= endDay
      );
    });

  if (recent.length < 2) {
    return null;
  }

  const points =
    recent.map((observation) => ({
      x:
        dateToDayNumber(
          observation.measured_on
        ) - startDay,
      y: observation.value,
    }));

  const meanX =
    points.reduce(
      (sum, point) => sum + point.x,
      0
    ) / points.length;

  const meanY =
    points.reduce(
      (sum, point) => sum + point.y,
      0
    ) / points.length;

  let numerator = 0;
  let denominator = 0;

  for (const point of points) {
    numerator +=
      (point.x - meanX) *
      (point.y - meanY);

    denominator +=
      (point.x - meanX) ** 2;
  }

  if (denominator === 0) {
    return null;
  }

  return {
    slopePerWeek:
      (numerator / denominator) * 7,
    n: recent.length,
    startDate:
      recent[0].measured_on,
    endDate:
      recent[recent.length - 1]
        .measured_on,
  };
}

export type NumericObservation = {
  measured_on: string;
  value: number;
};

export function renderCircumferenceChart(
  svg: SVGSVGElement,
  waistData: NumericObservation[],
  formIndexData: NumericObservation[],
  historyStartDate: string
) {
  if (
    waistData.length === 0 ||
    formIndexData.length === 0
  ) {
    return;
  }

  const width = 568;
  const height = 440;

  const padding = {
    top: 40,
    right: 24,
    bottom: 46,
    left: 58,
  };

  const plotWidth =
    width - padding.left - padding.right;

  const plotHeight =
    height - padding.top - padding.bottom;

  const panelHeight =
    plotHeight / 2;

  const startDay =
    dateToDayNumber(historyStartDate);

  const endDay =
    dateToDayNumber(
      waistData.at(-1)!.measured_on
    );

  const x = (date: string) => {
    const day =
      dateToDayNumber(date);

    return (
      padding.left +
      ((day - startDay) /
        (endDay - startDay || 1)) *
        plotWidth
    );
  };

  function buildScale(
    data: NumericObservation[],
    panelIndex: number,
    tickStep: number
  ) {
    const values =
      data.map(
        (observation) =>
          observation.value
      );

    const rawMin =
      Math.min(...values);

    const rawMax =
      Math.max(...values);

    let yMin =
      Math.floor(
        rawMin / tickStep
      ) * tickStep;

    let yMax =
      Math.ceil(
        rawMax / tickStep
      ) * tickStep;

    if (yMin === yMax) {
      yMin -= tickStep;
      yMax += tickStep;
    }

    const panelTop =
      padding.top +
      panelIndex * panelHeight;

    const y = (value: number) =>
      panelTop +
      (
        1 -
        (value - yMin) /
          (yMax - yMin)
      ) *
        panelHeight;

    return {
      y,
      yMin,
      yMax,
      panelTop,
      tickStep,
    };
  }

  const waistScale =
    buildScale(
      waistData,
      0,
      2
    );

  const formIndexScale =
    buildScale(
      formIndexData,
      1,
      0.02
    );

  const xTicks: string[] = [];

  const startParts =
    historyStartDate
      .split("-")
      .map(Number);

  let tickDate = new Date(
    Date.UTC(
      startParts[0],
      startParts[1],
      1
    )
  );

  while (
    tickDate.getTime() <=
    endDay * 86_400_000
  ) {
    const key = [
      tickDate.getUTCFullYear(),
      String(
        tickDate.getUTCMonth() + 1
      ).padStart(2, "0"),
      "01",
    ].join("-");

    if (
      dateToDayNumber(key) >= startDay
    ) {
      xTicks.push(key);
    }

    tickDate = new Date(
      Date.UTC(
        tickDate.getUTCFullYear(),
        tickDate.getUTCMonth() + 2,
        1
      )
    );
  }

  const formatTick = (
    date: string
  ) => {
    const [year, month, day] =
      date.split("-").map(Number);

    const value = new Date(
      Date.UTC(
        year,
        month - 1,
        day
      )
    );

    const monthName =
      value.toLocaleDateString(
        "en-GB",
        {
          month: "short",
          timeZone: "UTC",
        }
      );

    if (
      value.getUTCMonth() === 0
    ) {
      return `${monthName} ${year}`;
    }

    return monthName;
  };

  const trendStartDay =
    Math.max(
      startDay,
      endDay - 83
    );

  const trendStartX =
    padding.left +
    ((trendStartDay - startDay) /
      (endDay - startDay || 1)) *
      plotWidth;

  const trendWidth =
    padding.left +
    plotWidth -
    trendStartX;

  function renderPanelGrid(
    scale: ReturnType<
      typeof buildScale
    >,
    decimals: number,
    omitTopTick = false
  ) {
    const ticks: number[] = [];

    for (
      let value = scale.yMin;
      value <=
        scale.yMax + scale.tickStep / 2;
      value += scale.tickStep
    ) {
      ticks.push(value);
    }

    const visibleTicks =
      omitTopTick
        ? ticks.slice(0, -1)
        : ticks;

    return visibleTicks
      .map(
        (value) => `
          <line
            x1="${padding.left}"
            y1="${scale.y(value)}"
            x2="${padding.left + plotWidth}"
            y2="${scale.y(value)}"
            class="circumference-grid-line"
          />

          <text
            x="${padding.left - 10}"
            y="${scale.y(value)}"
            class="circumference-axis-label circumference-y-tick"
          >
            ${value.toFixed(decimals)}
          </text>
        `
      )
      .join("");
  }

  const yGrid = [
    renderPanelGrid(
      waistScale,
      0
    ),
    renderPanelGrid(
      formIndexScale,
      2,
      true
    ),
  ].join("");

  const xGrid =
    xTicks
      .map(
        (date) => `
          <line
            x1="${x(date)}"
            y1="${padding.top}"
            x2="${x(date)}"
            y2="${padding.top + plotHeight}"
            class="circumference-month-line"
          />

          <text
            x="${x(date)}"
            y="${padding.top + plotHeight + 22}"
            class="circumference-axis-label circumference-x-tick"
          >
            ${formatTick(date)}
          </text>
        `
      )
      .join("");

  function buildLineSegments(
    data: NumericObservation[],
    scale: ReturnType<
      typeof buildScale
    >
  ) {
    const segments: string[] = [];

    let currentSegment: string[] = [];

    data.forEach(
      (observation, index) => {
        const point =
          `${x(observation.measured_on)},${scale.y(observation.value)}`;

        if (index === 0) {
          currentSegment.push(point);
          return;
        }

        const previous =
          data[index - 1];

        const gap =
          dateToDayNumber(
            observation.measured_on
          ) -
          dateToDayNumber(
            previous.measured_on
          );

        if (gap > 14) {
          if (
            currentSegment.length >= 2
          ) {
            segments.push(
              currentSegment.join(" ")
            );
          }

          currentSegment = [point];
        } else {
          currentSegment.push(point);
        }
      }
    );

    if (currentSegment.length >= 2) {
      segments.push(
        currentSegment.join(" ")
      );
    }

    return segments;
  }

  function getSmoothedData(
    data: NumericObservation[]
  ): NumericObservation[] {
    const result: NumericObservation[] = [];

    for (
      let index = 1;
      index < data.length - 1;
      index += 1
    ) {
      const previous =
        data[index - 1];

      const current =
        data[index];

      const next =
        data[index + 1];

      const gapBefore =
        dateToDayNumber(
          current.measured_on
        ) -
        dateToDayNumber(
          previous.measured_on
        );

      const gapAfter =
        dateToDayNumber(
          next.measured_on
        ) -
        dateToDayNumber(
          current.measured_on
        );

      if (
        gapBefore > 14 ||
        gapAfter > 14
      ) {
        continue;
      }

      result.push({
        measured_on:
          current.measured_on,
        value:
          (
            previous.value +
            current.value +
            next.value
          ) / 3,
      });
    }

    return result;
  }

  function renderSeries(
    data: NumericObservation[],
    scale: ReturnType<
      typeof buildScale
    >
  ) {
    const smoothedData =
      getSmoothedData(data);

    const lines =
      buildLineSegments(
        smoothedData,
        scale
      )
        .map(
          (points) => `
            <polyline
              points="${points}"
              class="circumference-line"
            />
          `
        )
        .join("");

    const points =
      data
        .map(
          (observation) => `
            <circle
              cx="${x(observation.measured_on)}"
              cy="${scale.y(observation.value)}"
              r="2.5"
              class="circumference-point"
            />
          `
        )
        .join("");

    return lines + points;
  }

  const isNarrowScreen =
    window.matchMedia(
      "(max-width: 640px)"
    ).matches;

  const tooltipWidth =
    isNarrowScreen ? 142 : 112;

  const tooltipHeight =
    isNarrowScreen ? 68 : 62;

  const tooltipFontSize =
    isNarrowScreen ? 13 : 9;

  svg.innerHTML = `
    <circle
      cx="${padding.left}"
      cy="17"
      r="2.5"
      class="circumference-legend-point"
    />

    <text
      x="${padding.left + 8}"
      y="17"
      class="circumference-chart-meta"
    >
      Weekly measurements
    </text>

    <line
      x1="${padding.left + 112}"
      y1="17"
      x2="${padding.left + 128}"
      y2="17"
      class="circumference-legend-line"
    />

    <text
      x="${padding.left + 134}"
      y="17"
      class="circumference-chart-meta"
    >
      3-week average
    </text>

    <text
      x="${trendStartX + 6}"
      y="17"
      class="circumference-chart-meta circumference-trend-label"
    >
      Latest 12 weeks
    </text>

    <rect
      x="${trendStartX}"
      y="${padding.top}"
      width="${trendWidth}"
      height="${plotHeight}"
      class="circumference-trend-window"
    />

    ${yGrid}
    ${xGrid}

    <line
      x1="${padding.left}"
      y1="${padding.top}"
      x2="${padding.left + plotWidth}"
      y2="${padding.top}"
      class="circumference-axis"
    />

    <line
      x1="${padding.left}"
      y1="${padding.top + panelHeight}"
      x2="${padding.left + plotWidth}"
      y2="${padding.top + panelHeight}"
      class="circumference-axis"
    />

    <line
      x1="${padding.left}"
      y1="${padding.top + plotHeight}"
      x2="${padding.left + plotWidth}"
      y2="${padding.top + plotHeight}"
      class="circumference-axis"
    />

    <line
      x1="${padding.left}"
      y1="${padding.top}"
      x2="${padding.left}"
      y2="${padding.top + plotHeight}"
      class="circumference-axis"
    />

    ${renderSeries(
      waistData,
      waistScale
    )}

    ${renderSeries(
      formIndexData,
      formIndexScale
    )}

    <g class="circumference-panel-label">
      <rect
        x="${padding.left + 3}"
        y="${padding.top + 3}"
        width="42"
        height="20"
        class="circumference-panel-label-bg"
      />

      <text
        x="${padding.left + 8}"
        y="${padding.top + 16}"
        class="circumference-panel-title"
      >
        Waist (cm)
      </text>
    </g>

    <g class="circumference-panel-label">
      <rect
        x="${padding.left + 3}"
        y="${padding.top + panelHeight + 3}"
        width="62"
        height="20"
        class="circumference-panel-label-bg"
      />

      <text
        x="${padding.left + 8}"
        y="${padding.top + panelHeight + 16}"
        class="circumference-panel-title"
      >
        Form index
      </text>
    </g>

    <g
      id="circumference-hover-layer"
      visibility="hidden"
    >
      <line
        id="circumference-hover-line"
        x1="${padding.left}"
        y1="${padding.top}"
        x2="${padding.left}"
        y2="${padding.top + plotHeight}"
        class="circumference-hover-line"
      />

      <g
        id="circumference-hover-tooltip"
        class="circumference-hover-tooltip"
        visibility="hidden"
      >
        <rect
          width="112"
          height="62"
          rx="3"
          class="circumference-hover-tooltip-bg"
        />

      <text
        x="8"
        y="${isNarrowScreen ? 17 : 14}"
        id="circumference-hover-date"
        class="circumference-hover-tooltip-date"
      ></text>

      <text
        x="8"
        y="${isNarrowScreen ? 39 : 34}"
        id="circumference-hover-waist"
      ></text>

      <text
        x="8"
        y="${isNarrowScreen ? 59 : 52}"
        id="circumference-hover-form-index"
      ></text>
      </g>
    </g>

    <rect
      id="circumference-hover-target"
      x="${padding.left}"
      y="${padding.top}"
      width="${plotWidth}"
      height="${plotHeight}"
      fill="transparent"
      pointer-events="all"
    />
  `;

  const hoverTarget =
    svg.querySelector<SVGRectElement>(
      "#circumference-hover-target"
    );

  const hoverLayer =
    svg.querySelector<SVGGElement>(
      "#circumference-hover-layer"
    );

  const hoverLine =
    svg.querySelector<SVGLineElement>(
      "#circumference-hover-line"
    );

  const hoverTooltip =
    svg.querySelector<SVGGElement>(
      "#circumference-hover-tooltip"
    );

  const hoverDate =
    svg.querySelector<SVGTextElement>(
      "#circumference-hover-date"
    );

  const hoverWaist =
    svg.querySelector<SVGTextElement>(
      "#circumference-hover-waist"
    );

  const hoverFormIndex =
    svg.querySelector<SVGTextElement>(
      "#circumference-hover-form-index"
    );

  if (
    !hoverTarget ||
    !hoverLayer ||
    !hoverLine ||
    !hoverTooltip ||
    !hoverDate ||
    !hoverWaist ||
    !hoverFormIndex
  ) {
    return;
  }

  const tooltipBackground =
    hoverTooltip.querySelector<SVGRectElement>(
      ".circumference-hover-tooltip-bg"
    );

  if (!tooltipBackground) {
    return;
  }

  tooltipBackground.setAttribute(
    "width",
    String(tooltipWidth)
  );

  tooltipBackground.setAttribute(
    "height",
    String(tooltipHeight)
  );

  hoverTooltip.style.fontSize =
    `${tooltipFontSize}px`;

  hoverTarget.addEventListener(
    "pointermove",
    (event) => {
      const bounds =
        svg.getBoundingClientRect();

      const pointerX =
        (
          (event.clientX - bounds.left) /
          bounds.width
        ) * width;

      const clampedX =
        Math.min(
          padding.left + plotWidth,
          Math.max(
            padding.left,
            pointerX
          )
        );

      const relativeX =
        (clampedX - padding.left) /
        plotWidth;

      const pointerDay =
        startDay +
        relativeX *
          (endDay - startDay);

      const nearest =
        waistData.reduce(
          (best, observation) => {
            const observationDay =
              dateToDayNumber(
                observation.measured_on
              );

            const bestDay =
              dateToDayNumber(
                best.measured_on
              );

            return (
              Math.abs(
                observationDay -
                pointerDay
              ) <
              Math.abs(
                bestDay -
                pointerDay
              )
                ? observation
                : best
            );
          }
        );

      const formIndexPoint =
        formIndexData.find(
          (observation) =>
            observation.measured_on ===
            nearest.measured_on
        );

      const snappedX =
        x(nearest.measured_on);

      const formattedDate =
        new Intl.DateTimeFormat(
          "en-GB",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
            timeZone: "UTC",
          }
        ).format(
          new Date(
            `${nearest.measured_on}T00:00:00Z`
          )
        );

      hoverDate.textContent =
        formattedDate;

      hoverWaist.textContent =
        `Waist  ${nearest.value.toFixed(1)} cm`;

      hoverFormIndex.textContent =
        formIndexPoint
          ? `Form index  ${formIndexPoint.value.toFixed(2)}`
          : "Form index  —";

      hoverLine.setAttribute(
        "x1",
        String(snappedX)
      );

      hoverLine.setAttribute(
        "x2",
        String(snappedX)
      );

      const tooltipGap = 10;

      const tooltipX =
        snappedX +
          tooltipGap +
          tooltipWidth <=
        padding.left + plotWidth
          ? snappedX + tooltipGap
          : snappedX -
            tooltipGap -
            tooltipWidth;

      const tooltipY =
        padding.top + 10;

      hoverTooltip.setAttribute(
        "transform",
        `translate(${tooltipX} ${tooltipY})`
      );

      hoverLayer.setAttribute(
        "visibility",
        "visible"
      );

      hoverTooltip.setAttribute(
        "visibility",
        "visible"
      );
    }
  );

  svg.addEventListener(
    "pointerleave",
    () => {
      hoverLayer.setAttribute(
        "visibility",
        "hidden"
      );

      hoverTooltip.setAttribute(
        "visibility",
        "hidden"
      );
    }
  );
}
