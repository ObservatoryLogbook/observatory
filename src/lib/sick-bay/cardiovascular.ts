import {
  dateToDayNumber,
  getCenteredThreePointAverage,
  type NumericObservation,
} from "./time-series";

export type BloodPressureReading = {
  measured_on: string;
  reading_number: number;
  systolic: number;
  diastolic: number;
  pulse: number;
};

export type WeeklyBloodPressure = {
  measured_on: string;

  systolicMean: number;
  systolicMin: number;
  systolicMax: number;

  diastolicMean: number;
  diastolicMin: number;
  diastolicMax: number;

  pulseMean: number;
  pulseMin: number;
  pulseMax: number;

  n: number;
};

export function getWeeklyBloodPressure(
  readings: BloodPressureReading[]
): WeeklyBloodPressure[] {
  const grouped =
    new Map<string, BloodPressureReading[]>();

  for (const reading of readings) {
    const existing =
      grouped.get(reading.measured_on) ?? [];

    existing.push(reading);

    grouped.set(
      reading.measured_on,
      existing
    );
  }

  const mean = (
    values: number[]
  ) =>
    values.reduce(
      (sum, value) => sum + value,
      0
    ) / values.length;

  return Array.from(grouped.entries())
    .sort(([dateA], [dateB]) =>
      dateA.localeCompare(dateB)
    )
    .map(([measured_on, group]) => {
      const systolic =
        group.map(
          (reading) =>
            reading.systolic
        );

      const diastolic =
        group.map(
          (reading) =>
            reading.diastolic
        );

      const pulse =
        group.map(
          (reading) =>
            reading.pulse
        );

      return {
        measured_on,

        systolicMean:
          mean(systolic),
        systolicMin:
          Math.min(...systolic),
        systolicMax:
          Math.max(...systolic),

        diastolicMean:
          mean(diastolic),
        diastolicMin:
          Math.min(...diastolic),
        diastolicMax:
          Math.max(...diastolic),

        pulseMean:
          mean(pulse),
        pulseMin:
          Math.min(...pulse),
        pulseMax:
          Math.max(...pulse),

        n: group.length,
      };
    });
}

export function getSystolicData(
  observations: WeeklyBloodPressure[]
): NumericObservation[] {
  return observations.map(
    (observation) => ({
      measured_on:
        observation.measured_on,
      value:
        observation.systolicMean,
    })
  );
}

export function getDiastolicData(
  observations: WeeklyBloodPressure[]
): NumericObservation[] {
  return observations.map(
    (observation) => ({
      measured_on:
        observation.measured_on,
      value:
        observation.diastolicMean,
    })
  );
}

export function getBloodPressureSeries(
  observations: WeeklyBloodPressure[]
) {
  const systolic =
    getSystolicData(observations);

  const diastolic =
    getDiastolicData(observations);


  const pulse =
    observations.map(
      (observation) => ({
        measured_on:
          observation.measured_on,
        value:
          observation.pulseMean,
      })
    );

  return {
    systolic,
    diastolic,
    pulse,

    systolicAverage:
      getCenteredThreePointAverage(
        systolic
      ),

    diastolicAverage:
      getCenteredThreePointAverage(
        diastolic
      ),
  };
}

export function renderBloodPressureChart(
  svg: SVGSVGElement,
  weeklyData: WeeklyBloodPressure[],
  systolicData: NumericObservation[],
  diastolicData: NumericObservation[],
  systolicAverage: NumericObservation[],
  diastolicAverage: NumericObservation[],
  historyStartDate: string
) {
  if (
    weeklyData.length === 0 ||
    systolicData.length === 0 ||
    diastolicData.length === 0
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
      weeklyData.at(-1)!.measured_on
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
    lowerReference: number,
    upperReference: number
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

    const yMin =
      Math.floor(
        Math.min(
          rawMin,
          lowerReference - 10
        ) / 10
      ) * 10;

    const yMax =
      Math.ceil(
        Math.max(
          rawMax,
          upperReference + 10
        ) / 10
      ) * 10;

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
    };
  }

  const systolicScale =
    buildScale(
      systolicData,
      0,
      120,
      135
    );

  const diastolicScale =
    buildScale(
      diastolicData,
      1,
      70,
      85
    );

  const xTicks: string[] = [];

  const startParts =
    historyStartDate
      .split("-")
      .map(Number);

  let tickDate = new Date(
    Date.UTC(
      startParts[0],
      startParts[1] - 1,
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

  function renderPanelGrid(
    scale: ReturnType<
      typeof buildScale
    >,
    omitTopTick = false
  ) {
    const ticks: number[] = [];

    for (
      let value = scale.yMin;
      value <= scale.yMax;
      value += 10
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
            class="bp-grid-line"
          />

          <text
            x="${padding.left - 10}"
            y="${scale.y(value)}"
            class="bp-axis-label bp-y-tick"
          >
            ${value}
          </text>
        `
      )
      .join("");
  }

  const yGrid = [
    renderPanelGrid(
      systolicScale
    ),
    renderPanelGrid(
      diastolicScale,
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
            class="bp-month-line"
          />

          <text
            x="${x(date)}"
            y="${padding.top + plotHeight + 22}"
            class="bp-axis-label bp-x-tick"
          >
            ${formatTick(date)}
          </text>
        `
      )
      .join("");

  function renderReferenceBands(
    scale: ReturnType<
      typeof buildScale
    >,
    lowerReference: number,
    upperReference: number
  ) {
    const panelBottom =
      scale.panelTop +
      panelHeight;

    const lowerY =
      scale.y(lowerReference);

    const upperY =
      scale.y(upperReference);

    return `
      <rect
        x="${padding.left}"
        y="${scale.panelTop}"
        width="${plotWidth}"
        height="${upperY - scale.panelTop}"
        class="bp-reference-high"
      />

      <rect
        x="${padding.left}"
        y="${upperY}"
        width="${plotWidth}"
        height="${lowerY - upperY}"
        class="bp-reference-middle"
      />

      <rect
        x="${padding.left}"
        y="${lowerY}"
        width="${plotWidth}"
        height="${panelBottom - lowerY}"
        class="bp-reference-low"
      />

      <line
        x1="${padding.left}"
        y1="${upperY}"
        x2="${padding.left + plotWidth}"
        y2="${upperY}"
        class="bp-reference-line"
      />

      <line
        x1="${padding.left}"
        y1="${lowerY}"
        x2="${padding.left + plotWidth}"
        y2="${lowerY}"
        class="bp-reference-line"
      />
    `;
  }

  function renderAverageLine(
    data: NumericObservation[],
    scale: ReturnType<
      typeof buildScale
    >
  ) {
    if (data.length < 2) {
      return "";
    }

    const points =
      data
        .map(
          (observation) =>
            `${x(observation.measured_on)},${scale.y(observation.value)}`
        )
        .join(" ");

    return `
      <polyline
        points="${points}"
        class="bp-average-line"
      />
    `;
  }

  function renderWeeklySeries(
    scale: ReturnType<
      typeof buildScale
    >,
    metric:
      | "systolic"
      | "diastolic"
  ) {
    return weeklyData
      .map((observation) => {
        const mean =
          metric === "systolic"
            ? observation.systolicMean
            : observation.diastolicMean;

        const min =
          metric === "systolic"
            ? observation.systolicMin
            : observation.diastolicMin;

        const max =
          metric === "systolic"
            ? observation.systolicMax
            : observation.diastolicMax;

        const pointX =
          x(observation.measured_on);

        return `
          <line
            x1="${pointX}"
            y1="${scale.y(max)}"
            x2="${pointX}"
            y2="${scale.y(min)}"
            class="bp-range"
          />

          <line
            x1="${pointX - 3}"
            y1="${scale.y(max)}"
            x2="${pointX + 3}"
            y2="${scale.y(max)}"
            class="bp-range"
          />

          <line
            x1="${pointX - 3}"
            y1="${scale.y(min)}"
            x2="${pointX + 3}"
            y2="${scale.y(min)}"
            class="bp-range"
          />

          <circle
            cx="${pointX}"
            cy="${scale.y(mean)}"
            r="2.5"
            class="bp-point"
          />
        `;
      })
      .join("");
  }

  const isNarrowScreen =
    window.matchMedia(
      "(max-width: 640px)"
    ).matches;

  const tooltipWidth =
    isNarrowScreen ? 166 : 136;

  const tooltipHeight =
    isNarrowScreen ? 76 : 68;

  const tooltipFontSize =
    isNarrowScreen ? 13 : 9;

  svg.innerHTML = `
    <circle
      cx="${padding.left}"
      cy="17"
      r="2.5"
      class="bp-point"
    />

    <text
      x="${padding.left + 8}"
      y="17"
      class="bp-chart-meta"
    >
      Weekly mean
    </text>

    <line
      x1="${padding.left + 92}"
      y1="11"
      x2="${padding.left + 92}"
      y2="23"
      class="bp-range"
    />

    <line
      x1="${padding.left + 89}"
      y1="11"
      x2="${padding.left + 95}"
      y2="11"
      class="bp-range"
    />

    <line
      x1="${padding.left + 89}"
      y1="23"
      x2="${padding.left + 95}"
      y2="23"
      class="bp-range"
    />

    <text
      x="${padding.left + 102}"
      y="17"
      class="bp-chart-meta"
    >
      Measurement range
    </text>

    <line
      x1="${padding.left + 224}"
      y1="17"
      x2="${padding.left + 240}"
      y2="17"
      class="bp-average-line"
    />

    <text
      x="${padding.left + 246}"
      y="17"
      class="bp-chart-meta"
    >
      3-week average
    </text>

    ${renderReferenceBands(
      systolicScale,
      120,
      135
    )}

    ${renderReferenceBands(
      diastolicScale,
      70,
      85
    )}

    ${yGrid}
    ${xGrid}

    <line
      x1="${padding.left}"
      y1="${padding.top}"
      x2="${padding.left + plotWidth}"
      y2="${padding.top}"
      class="bp-axis"
    />

    <line
      x1="${padding.left}"
      y1="${padding.top + panelHeight}"
      x2="${padding.left + plotWidth}"
      y2="${padding.top + panelHeight}"
      class="bp-axis"
    />

    <line
      x1="${padding.left}"
      y1="${padding.top + plotHeight}"
      x2="${padding.left + plotWidth}"
      y2="${padding.top + plotHeight}"
      class="bp-axis"
    />

    <line
      x1="${padding.left}"
      y1="${padding.top}"
      x2="${padding.left}"
      y2="${padding.top + plotHeight}"
      class="bp-axis"
    />

    ${renderWeeklySeries(
      systolicScale,
      "systolic"
    )}

    ${renderAverageLine(
      systolicAverage,
      systolicScale
    )}

    ${renderWeeklySeries(
      diastolicScale,
      "diastolic"
    )}

    ${renderAverageLine(
      diastolicAverage,
      diastolicScale
    )}

    <g class="bp-panel-label">
      <text
        x="${padding.left + 8}"
        y="${padding.top + 18}"
        class="bp-panel-title"
      >
        Systolic (mmHg)
      </text>
    </g>

    <g class="bp-panel-label">
      <text
        x="${padding.left + 8}"
        y="${padding.top + panelHeight + 18}"
        class="bp-panel-title"
      >
        Diastolic (mmHg)
      </text>
    </g>

    <g
      id="bp-hover-layer"
      visibility="hidden"
    >
      <line
        id="bp-hover-line"
        x1="${padding.left}"
        y1="${padding.top}"
        x2="${padding.left}"
        y2="${padding.top + plotHeight}"
        class="bp-hover-line"
      />

      <g
        id="bp-hover-tooltip"
        class="bp-hover-tooltip"
        visibility="hidden"
      >
        <rect
          width="136"
          height="68"
          rx="3"
          class="bp-hover-tooltip-bg"
        />

        <text
          x="8"
          y="${isNarrowScreen ? 17 : 14}"
          id="bp-hover-date"
          class="bp-hover-tooltip-date"
        ></text>

        <text
          x="8"
          y="${isNarrowScreen ? 39 : 34}"
          id="bp-hover-systolic"
        ></text>

        <text
          x="8"
          y="${isNarrowScreen ? 59 : 52}"
          id="bp-hover-diastolic"
        ></text>
      </g>
    </g>

    <rect
      id="bp-hover-target"
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
      "#bp-hover-target"
    );

  const hoverLayer =
    svg.querySelector<SVGGElement>(
      "#bp-hover-layer"
    );

  const hoverLine =
    svg.querySelector<SVGLineElement>(
      "#bp-hover-line"
    );

  const hoverTooltip =
    svg.querySelector<SVGGElement>(
      "#bp-hover-tooltip"
    );

  const hoverDate =
    svg.querySelector<SVGTextElement>(
      "#bp-hover-date"
    );

  const hoverSystolic =
    svg.querySelector<SVGTextElement>(
      "#bp-hover-systolic"
    );

  const hoverDiastolic =
    svg.querySelector<SVGTextElement>(
      "#bp-hover-diastolic"
    );

  if (
    !hoverTarget ||
    !hoverLayer ||
    !hoverLine ||
    !hoverTooltip ||
    !hoverDate ||
    !hoverSystolic ||
    !hoverDiastolic
  ) {
    return;
  }

  const tooltipBackground =
    hoverTooltip.querySelector<SVGRectElement>(
      ".bp-hover-tooltip-bg"
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
        weeklyData.reduce(
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

      hoverSystolic.textContent =
        `Systolic  ${nearest.systolicMean.toFixed(1)}  ${nearest.systolicMin}–${nearest.systolicMax}`;

      hoverDiastolic.textContent =
        `Diastolic  ${nearest.diastolicMean.toFixed(1)}  ${nearest.diastolicMin}–${nearest.diastolicMax}`;

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

