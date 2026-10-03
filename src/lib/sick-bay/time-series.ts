export type NumericObservation = {
  measured_on: string;
  value: number;
};

export function dateToDayNumber(
  date: string
): number {
  const [year, month, day] =
    date.split("-").map(Number);

  return (
    Date.UTC(year, month - 1, day) /
    86_400_000
  );
}

export function getCenteredThreePointAverage(
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

export type MetricTrend = {
  slopePerWeek: number;
  n: number;
  startDate: string;
  endDate: string;
};

export function getMetricTrend(
  observations: NumericObservation[]
): MetricTrend | null {
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
      y: observation.value,
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

  const slopePerDay =
    numerator / denominator;

  return {
    slopePerWeek:
      slopePerDay * 7,
    n: recent.length,
    startDate:
      recent[0].measured_on,
    endDate:
      recent[recent.length - 1]
        .measured_on,
  };
}
