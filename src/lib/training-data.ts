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
    const exerciseData = data.filter(
        (point) => point.exercise === exercise
    );

    if (exerciseData.length === 0) {
        return null;
    }

    const latestDate = Math.max(
        ...exerciseData.map((point) => point.date.getTime())
    );

    const windowStart = latestDate - 27 * 24 * 60 * 60 * 1000;

    const recentData = exerciseData.filter(
        (point) => point.date.getTime() >= windowStart
    );

    return Math.max(
        ...recentData.map((point) =>
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
