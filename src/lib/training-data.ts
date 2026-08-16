import trainingCsv from "../data/training.csv?raw";

export async function loadTrainingCsv() {
    return trainingCsv;
}

export async function parseTrainingCsv() {
    const csv = await loadTrainingCsv();

    const lines = csv
        .split(/\r?\n/)
        .filter((line) => line.trim() !== "");

    const [headerLine, ...dataLines] = lines;

    const headers = headerLine.split(",");

    return dataLines.map((line) => {
        const values = line.split(",");

        return Object.fromEntries(
            headers.map((header, index) => [
                header,
                values[index] ?? "",
            ])
        );
    });
}

export type PerformancePoint = {
    date: Date;
    exercise: "squat" | "bench" | "deadlift";
    weight: number;
    reps: number;
    rpe: number;
};

function normaliseExercise(
    exercise: string
): PerformancePoint["exercise"] {
    switch (exercise) {
        case "Squat":
            return "squat";

        case "Bænkpres":
            return "bench";

        case "Dødløft":
            return "deadlift";

        default:
            throw new Error(
                `Unknown exercise: ${exercise}`
            );
    }
}

function parseDate(value: string) {
    const datePart = value.split(" ")[0];

    const [day, month, year] = datePart
        .split("/")
        .map(Number);

    return new Date(
        Date.UTC(year, month - 1, day)
    );
}

export async function getPerformanceData():
    Promise<PerformancePoint[]> {

    const rows = await parseTrainingCsv();

    return rows
        .filter(
            (row) =>
                row["SætRolle"] === "Top single"
        )
        .map((row) => ({
            date: parseDate(row["Dato"]),
            exercise: normaliseExercise(
                row["Øvelse"]
            ),
            weight: Number(row["Vægt"]),
            reps: Number(row["Reps"]),
            rpe: Number(row["RPE"]),
        }));
}

export function calculateE1RM(
    weight: number,
    reps: number,
    rpe: number
) {
    const e1RM =
        weight * (
            1 + (reps + (10 - rpe)) / 30
        );

    return Math.round(e1RM * 10) / 10;
}

export function getCurrentE1RM(
    data: PerformancePoint[],
    exercise: PerformancePoint["exercise"]
) {
    if (data.length === 0) {
        return null;
    }

    const latestDate = Math.max(
        ...data.map((point) => point.date.getTime())
    );

    const windowStart =
        latestDate - 27 * 24 * 60 * 60 * 1000;

    const recentExerciseData = data.filter(
        (point) =>
            point.exercise === exercise &&
            point.date.getTime() >= windowStart &&
            point.date.getTime() <= latestDate
    );

    if (recentExerciseData.length === 0) {
        return null;
    }

    return Math.max(
        ...recentExerciseData.map((point) =>
            calculateE1RM(
                point.weight,
                point.reps,
                point.rpe
            )
        )
    );
}

export function getOneRepPR(
    data: PerformancePoint[],
    exercise: PerformancePoint["exercise"]
) {
    const singles = data.filter(
        (point) =>
            point.exercise === exercise &&
            point.reps === 1
    );

    if (singles.length === 0) {
        return null;
    }

    const maxWeight = Math.max(
        ...singles.map((point) => point.weight)
    );

    return singles
        .filter((point) => point.weight === maxWeight)
        .toSorted(
            (a, b) =>
                a.date.getTime() - b.date.getTime()
        )[0];
}

export function getE1RMSeries(
    data: PerformancePoint[],
    exercise: PerformancePoint["exercise"]
): E1RMPoint[] {
    return data
        .filter(
            (point) =>
                point.exercise === exercise
        )
        .map((point) => ({
            date: point.date,
            e1RM: calculateE1RM(
                point.weight,
                point.reps,
                point.rpe
            ),
            weight: point.weight,
            reps: point.reps,
            rpe: point.rpe,
        }))
        .toSorted(
            (a, b) =>
                a.date.getTime() -
                b.date.getTime()
        );
}

const TREND_DAYS = 56;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export type E1RMPoint = {
    date: Date;
    e1RM: number;
    weight: number;
    reps: number;
    rpe: number;
};

export type TrendResult = {
    startDate: Date;
    endDate: Date;
    start: number;
    end: number;
    change: number;
    slope: number;
    points: number;
};

export function getTrend(
    series: E1RMPoint[],
    latestTrainingDate: Date
): TrendResult | null {
    const windowStart = new Date(
        latestTrainingDate.getTime() -
            (TREND_DAYS - 1) * MS_PER_DAY
    );

    const points = series.filter(
        (point) =>
            point.date >= windowStart &&
            point.date <= latestTrainingDate
    );

    if (points.length < 2) {
        return null;
    }

    const values = points.map((point) => ({
        x:
            (point.date.getTime() -
                windowStart.getTime()) /
            MS_PER_DAY,
        y: point.e1RM,
    }));

    const n = values.length;

    const meanX =
        values.reduce(
            (sum, point) => sum + point.x,
            0
        ) / n;

    const meanY =
        values.reduce(
            (sum, point) => sum + point.y,
            0
        ) / n;

    const numerator = values.reduce(
        (sum, point) =>
            sum +
            (point.x - meanX) *
                (point.y - meanY),
        0
    );

    const denominator = values.reduce(
        (sum, point) =>
            sum +
            (point.x - meanX) ** 2,
        0
    );

    if (denominator === 0) {
        return null;
    }

    const slope = numerator / denominator;
    const intercept = meanY - slope * meanX;

    const firstPoint = points[0];
    const lastPoint = points[points.length - 1];

    const firstX =
        (firstPoint.date.getTime() -
            windowStart.getTime()) /
        MS_PER_DAY;

    const lastX =
        (lastPoint.date.getTime() -
            windowStart.getTime()) /
        MS_PER_DAY;

    const start =
        intercept + slope * firstX;

    const end =
        intercept + slope * lastX;

    return {
        startDate: firstPoint.date,
        endDate: lastPoint.date,
        start,
        end,
        change: end - start,
        slope,
        points: points.length,
    };
}
