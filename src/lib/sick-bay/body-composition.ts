export type WeightObservation = {
  measured_on: string;
  weight_kg: number;
  body_fat_pct: number;
  muscle_pct: number;
};

export type RollingAveragePoint = {
  date: string;
  mean: number | null;
  n: number;
};

export function getRolling7DayAverage(
  observations: WeightObservation[]
): RollingAveragePoint[] {
  if (observations.length === 0) {
    return [];
  }

  const byDate = new Map<string, number>();

  for (const observation of observations) {
    byDate.set(
      observation.measured_on,
      observation.weight_kg
    );
  }

  const startDate = new Date(
    `${observations[0].measured_on}T00:00:00`
  );

  const endDate = new Date();

  const result: RollingAveragePoint[] = [];

  for (
    let current = new Date(startDate);
    current <= endDate;
    current.setDate(current.getDate() + 1)
  ) {
    const windowStart = new Date(current);
    windowStart.setDate(windowStart.getDate() - 6);

    let sum = 0;
    let n = 0;

    for (
      let d = new Date(windowStart);
      d <= current;
      d.setDate(d.getDate() + 1)
    ) {
      const key = [
        d.getFullYear(),
        String(d.getMonth() + 1).padStart(2, "0"),
        String(d.getDate()).padStart(2, "0"),
      ].join("-");

      const value = byDate.get(key);

      if (value !== undefined) {
        sum += value;
        n += 1;
      }
    }

    const currentKey = [
      current.getFullYear(),
      String(current.getMonth() + 1).padStart(2, "0"),
      String(current.getDate()).padStart(2, "0"),
    ].join("-");

    result.push({
      date: currentKey,
      mean: n > 0 ? sum / n : null,
      n,
    });
  }

  return result;
}

export function getHistoryStartDate(
  days: number
): string {
  const today = new Date();

  const start = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  start.setDate(
    start.getDate() - (days - 1)
  );

  return [
    start.getFullYear(),
    String(start.getMonth() + 1).padStart(2, "0"),
    String(start.getDate()).padStart(2, "0"),
  ].join("-");
}

export type WeightTrend = {
  slopeKgPerWeek: number;
  n: number;
  startDate: string;
  endDate: string;
};

function dateToDayNumber(date: string): number {
  const [year, month, day] =
    date.split("-").map(Number);

  return (
    Date.UTC(year, month - 1, day) /
    86_400_000
  );
}

export function getWeightTrend(
  observations: WeightObservation[]
): WeightTrend | null {
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

  const points = recent.map(
    (observation) => ({
      x:
        dateToDayNumber(
          observation.measured_on
        ) - startDay,
      y: observation.weight_kg,
    })
  );

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

  const slopeKgPerDay =
    numerator / denominator;

  return {
    slopeKgPerWeek:
      slopeKgPerDay * 7,
    n: recent.length,
    startDate:
      recent[0].measured_on,
    endDate:
      recent[recent.length - 1]
        .measured_on,
  };
}

export function renderBodyCompositionChart(
  weightRaw: WeightObservation[],
  weightRolling: RollingAveragePoint[],
  muscleRaw: WeightObservation[],
  muscleRolling: RollingAveragePoint[],
  fatRaw: WeightObservation[],
  fatRolling: RollingAveragePoint[],
  historyStartDate: string
) {

  const svg =
    document.querySelector<SVGSVGElement>(
      "#weight-history-chart"
    );

  if (
    !svg ||
    weightRolling.length === 0 ||
    muscleRolling.length === 0 ||
    fatRolling.length === 0
  ) {
    return;
  }

  const width = 568;
  const height = 600;

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
  plotHeight / 3; 

  const startDay =
    dateToDayNumber(historyStartDate);

  const endDay =
    dateToDayNumber(
      weightRolling.at(-1)!.date
    );

  const x = (date: string) => {
    const day = dateToDayNumber(date);

    return (
      padding.left +
      ((day - startDay) /
        (endDay - startDay || 1)) *
        plotWidth
    );
  };

  function buildPanelScale(
    rawData: WeightObservation[],
    rollingData: RollingAveragePoint[],
    panelIndex: number
  ) {
    const values = [
      ...rawData.map(
        (point) => point.weight_kg
      ),
      ...rollingData
        .filter(
          (
            point
          ): point is RollingAveragePoint & {
            mean: number;
          } => point.mean !== null
        )
        .map((point) => point.mean),
    ];

    const rawMin =
      Math.min(...values);

    const rawMax =
      Math.max(...values);

    let yMin =
      Math.floor(rawMin);

    let yMax =
      Math.ceil(rawMax);

    if (yMin === yMax) {
      yMin -= 1;
      yMax += 1;
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

    const range =
      yMax - yMin;

    const tickStep =
      range <= 5 ? 1 : 2;

    const ticks: number[] = [];

    const firstTick =
      Math.ceil(yMin / tickStep) *
      tickStep;

    for (
      let value = firstTick;
      value <= yMax;
      value += tickStep
    ) {
      ticks.push(value);
    }

    return {
      y,
      yMin,
      yMax,
      ticks,
      panelTop,
    };
  }

  const weightScale =
    buildPanelScale(
      weightRaw,
      weightRolling,
      0
    );

  const muscleScale =
    buildPanelScale(
      muscleRaw,
      muscleRolling,
      1
    );

  const fatScale =
    buildPanelScale(
      fatRaw,
      fatRolling,
      2
    );

  /*
   * X-axis ticks:
   * first day of every second month.
   */

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

  /*
   * Latest 84-day trend window.
   */

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
      typeof buildPanelScale
    >,
    omitTopTick = false
  ) {
    const ticks =
      omitTopTick
        ? scale.ticks.slice(0, -1)
        : scale.ticks;

    return ticks
      .map(
        (value) => `
          <line
            x1="${padding.left}"
            y1="${scale.y(value)}"
            x2="${padding.left + plotWidth}"
            y2="${scale.y(value)}"
            class="weight-grid-line"
          />

          <text
            x="${padding.left - 10}"
            y="${scale.y(value)}"
            class="weight-axis-label weight-y-tick"
          >
            ${value}
          </text>
        `
      )
      .join("");
  }

  const yGrid = [
    renderPanelGrid(weightScale),
    renderPanelGrid(muscleScale, true),
    renderPanelGrid(fatScale, true),
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
            class="weight-month-line"
          />

          <text
            x="${x(date)}"
            y="${padding.top + plotHeight + 22}"
            class="weight-axis-label weight-x-tick"
          >
            ${formatTick(date)}
          </text>
        `
      )
      .join("");

  function renderRawPoints(
    rawData: WeightObservation[],
    scale: ReturnType<
      typeof buildPanelScale
    >
  ) {
    return rawData
      .map(
        (point) => `
          <circle
            cx="${x(point.measured_on)}"
            cy="${scale.y(point.weight_kg)}"
            r="2.2"
            class="weight-raw-point"
          />
        `
      )
      .join("");
  }

  function renderRollingLines(
    rollingData: RollingAveragePoint[],
    scale: ReturnType<
      typeof buildPanelScale
    >
  ) {
    const segments: string[][] = [];

    let currentSegment: string[] = [];

    for (const point of rollingData) {
      if (point.mean === null) {
        if (currentSegment.length > 0) {
          segments.push(
            currentSegment
          );

          currentSegment = [];
        }

        continue;
      }

      currentSegment.push(
        `${x(point.date)},${scale.y(point.mean)}`
      );
    }

    if (currentSegment.length > 0) {
      segments.push(
        currentSegment
      );
    }

    return segments
      .map(
        (segment) => `
          <polyline
            points="${segment.join(" ")}"
            class="weight-rolling-line"
          />
        `
      )
      .join("");
  }

  const rawPoints = [
    renderRawPoints(
      weightRaw,
      weightScale
    ),
    renderRawPoints(
      muscleRaw,
      muscleScale
    ),
    renderRawPoints(
      fatRaw,
      fatScale
    ),
  ].join("");

  const rollingLines = [
    renderRollingLines(
      weightRolling,
      weightScale
    ),
    renderRollingLines(
      muscleRolling,
      muscleScale
    ),
    renderRollingLines(
      fatRolling,
      fatScale
    ),
  ].join("");

  const isNarrowScreen =
    window.matchMedia(
      "(max-width: 640px)"
    ).matches;

  const tooltipWidth =
    isNarrowScreen ? 142 : 110;

  const tooltipHeight =
    isNarrowScreen ? 82 : 70;

  const tooltipFontSize =
    isNarrowScreen ? 13 : 9;

  svg.innerHTML = `
    <g class="weight-chart-legend">
      <circle
        cx="${padding.left + 3}"
        cy="17"
        r="2.2"
        class="weight-raw-point"
      />

      <text
        x="${padding.left + 12}"
        y="17"
        class="weight-chart-meta"
      >
        Daily measurements
      </text>

      <line
        x1="${padding.left + 110}"
        y1="17"
        x2="${padding.left + 130}"
        y2="17"
        class="weight-legend-line"
      />

      <text
        x="${padding.left + 138}"
        y="17"
        class="weight-chart-meta"
      >
        7-day average
      </text>
    </g>

    <text
      x="${trendStartX + 6}"
      y="17"
      class="weight-chart-meta weight-trend-label"
    >
      Latest 12 weeks
    </text>

    <rect
      x="${trendStartX}"
      y="${padding.top}"
      width="${trendWidth}"
      height="${plotHeight}"
      class="weight-trend-window"
    />

    ${yGrid}
    ${xGrid}

    <line
      x1="${padding.left}"
      y1="${padding.top}"
      x2="${padding.left + plotWidth}"
      y2="${padding.top}"
      class="weight-axis"
    />

    <line
      x1="${padding.left}"
      y1="${padding.top + panelHeight}"
      x2="${padding.left + plotWidth}"
      y2="${padding.top + panelHeight}"
      class="weight-axis"
    />

    <line
      x1="${padding.left}"
      y1="${padding.top + panelHeight * 2}"
      x2="${padding.left + plotWidth}"
      y2="${padding.top + panelHeight * 2}"
      class="weight-axis"
    />

    <line
      x1="${padding.left}"
      y1="${padding.top + plotHeight}"
      x2="${padding.left + plotWidth}"
      y2="${padding.top + plotHeight}"
      class="weight-axis"
    />

    <line
      x1="${padding.left}"
      y1="${padding.top}"
      x2="${padding.left}"
      y2="${padding.top + plotHeight}"
      class="weight-axis"
    />

    ${rawPoints}
    ${rollingLines}

    <g class="composition-panel-label">
      <rect
        x="${padding.left + 3}"
        y="${padding.top + 3}"
        width="50"
        height="20"
        class="composition-panel-label-bg"
      />

      <text
        x="${padding.left + 8}"
        y="${padding.top + 16}"
        class="composition-panel-title"
      >
        Weight (kg)
      </text>
    </g>

    <g class="composition-panel-label">
      <rect
        x="${padding.left + 3}"
        y="${padding.top + panelHeight + 3}"
        width="78"
        height="20"
        class="composition-panel-label-bg"
      />

      <text
        x="${padding.left + 8}"
        y="${padding.top + panelHeight + 16}"
        class="composition-panel-title"
      >
        Muscle mass (kg)
      </text>
    </g>

    <g class="composition-panel-label">
      <rect
        x="${padding.left + 3}"
        y="${padding.top + panelHeight * 2 + 3}"
        width="62"
        height="20"
        class="composition-panel-label-bg"
      />

      <text
        x="${padding.left + 8}"
        y="${padding.top + panelHeight * 2 + 16}"
        class="composition-panel-title"
      >
        Fat mass (kg)
      </text>
    </g>

    <g
      id="composition-hover-layer"
      visibility = "hidden"
    >
      <line
        id="composition-hover-line"
        x1="${padding.left}"
        y1="${padding.top}"
        x2="${padding.left}"
        y2="${padding.top + plotHeight}"
        class="composition-hover-line"
      />
    </g>

    <g
      id="composition-hover-tooltip"
      class="composition-hover-tooltip"
      visibility="hidden"
      style="font-size: ${tooltipFontSize}px"
    >

    <rect
      width="${tooltipWidth}"
      height="${tooltipHeight}"
      rx="3"
      class="composition-hover-tooltip-bg"
    />

      <text
        x="8"
        y="${isNarrowScreen ? 18 : 15}"
        id="composition-hover-date"
        class="composition-hover-tooltip-date"
      ></text>

      <text
        x="8"
        y="${isNarrowScreen ? 38 : 32}"
        id="composition-hover-weight"
      ></text>

      <text
        x="8"
        y="${isNarrowScreen ? 57 : 47}"
        id="composition-hover-muscle"
      ></text>

      <text
        x="8"
        y="${isNarrowScreen ? 76 : 62}"
        id="composition-hover-fat"
      ></text>
    </g>

    <rect
      id="composition-hover-target"
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
      "#composition-hover-target"
    );

  const hoverLayer =
    svg.querySelector<SVGGElement>(
      "#composition-hover-layer"
    );

  const hoverLine =
    svg.querySelector<SVGLineElement>(
      "#composition-hover-line"
    );

  const hoverTooltip =
    svg.querySelector<SVGGElement>(
      "#composition-hover-tooltip"
    );

  const hoverDate =
    svg.querySelector<SVGTextElement>(
      "#composition-hover-date"
    );

  const hoverWeight =
    svg.querySelector<SVGTextElement>(
      "#composition-hover-weight"
    );

  const hoverMuscle =
    svg.querySelector<SVGTextElement>(
      "#composition-hover-muscle"
    );

  const hoverFat =
    svg.querySelector<SVGTextElement>(
      "#composition-hover-fat"
    );

  if (
    !hoverTarget ||
    !hoverLayer ||
    !hoverLine ||
    !hoverTooltip ||
    !hoverDate ||
    !hoverWeight ||
    !hoverMuscle ||
    !hoverFat
  ) {
    return;
  }

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

      const hoveredDay =
        Math.round(
          startDay +
          relativeX *
            (endDay - startDay)
        );

        const hoveredDate =
          new Date(
            hoveredDay * 86_400_000
          )
            .toISOString()
            .slice(0, 10);

        const weightPoint =
          weightRolling.find(
            (point) =>
              point.date === hoveredDate
          );

        const musclePoint =
          muscleRolling.find(
            (point) =>
              point.date === hoveredDate
          );

        const fatPoint =
          fatRolling.find(
            (point) =>
              point.date === hoveredDate
          );

          const formatValue = (
            value: number | null | undefined
          ) =>
            value === null ||
            value === undefined
              ? "—"
              : `${value.toFixed(1)} kg`;

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
                `${hoveredDate}T00:00:00Z`
              )
            );

          hoverDate.textContent =
            formattedDate;

          hoverWeight.textContent =
            `Weight  ${formatValue(weightPoint?.mean)}`;

          hoverMuscle.textContent =
            `Muscle  ${formatValue(musclePoint?.mean)}`;

          hoverFat.textContent =
            `Fat  ${formatValue(fatPoint?.mean)}`;

      const snappedX =
        padding.left +
        (
          (hoveredDay - startDay) /
          (endDay - startDay || 1)
        ) *
          plotWidth;

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

      hoverLine.setAttribute(
        "x1",
        String(snappedX)
      );

      hoverLine.setAttribute(
        "x2",
        String(snappedX)
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
