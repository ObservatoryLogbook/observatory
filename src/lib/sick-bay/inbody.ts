export type SegmentalObservation = {
  measured_on: string;

  right_arm_lean_kg: number | null;
  left_arm_lean_kg: number | null;
  trunk_lean_kg: number | null;
  right_leg_lean_kg: number | null;
  left_leg_lean_kg: number | null;

  right_arm_fat_kg: number | null;
  left_arm_fat_kg: number | null;
  trunk_fat_kg: number | null;
  right_leg_fat_kg: number | null;
  left_leg_fat_kg: number | null;
};

type SegmentKey =
  | "right_arm_lean_kg"
  | "left_arm_lean_kg"
  | "trunk_lean_kg"
  | "right_leg_lean_kg"
  | "left_leg_lean_kg"
  | "right_arm_fat_kg"
  | "left_arm_fat_kg"
  | "trunk_fat_kg"
  | "right_leg_fat_kg"
  | "left_leg_fat_kg";

function getDomain(
  data: SegmentalObservation[],
  keys: SegmentKey[]
) {
  const values = data
    .flatMap((observation) =>
      keys.map((key) => observation[key])
    )
    .filter(
      (value): value is number =>
        value !== null
    );

  const min = Math.min(...values);
  const max = Math.max(...values);

  const padding =
    Math.max((max - min) * 0.15, 0.05);

  return {
    min: min - padding,
    max: max + padding,
  };
}

function getSparklinePath(
  data: SegmentalObservation[],
  key: SegmentKey,
  x: number,
  y: number,
  width: number,
  height: number,
  domain: {
    min: number;
    max: number;
  }
) {
  const validPoints = data
    .map((observation, index) => ({
      value: observation[key],
      index,
    }))
    .filter(
      (
        point
      ): point is {
        value: number;
        index: number;
      } =>
        point.value !== null
    );

  if (validPoints.length < 2) {
    return "";
  }

  const denominator =
    Math.max(data.length - 1, 1);

  return validPoints
    .map((point, pointIndex) => {
      const px =
        x +
        (point.index / denominator) *
          width;

      const py =
        y +
        height -
        (
          (point.value - domain.min) /
          (domain.max - domain.min)
        ) *
          height;

      return `${
        pointIndex === 0 ? "M" : "L"
      } ${px} ${py}`;
    })
    .join(" ");
}

function addSparkline(
  svg: SVGSVGElement,
  data: SegmentalObservation[],
  key: SegmentKey,
  x: number,
  y: number,
  width: number,
  height: number,
  domain: {
    min: number;
    max: number;
  }
) {
  const pathData =
    getSparklinePath(
      data,
      key,
      x,
      y,
      width,
      height,
      domain
    );

  if (!pathData) {
    return;
  }

  const ns =
    "http://www.w3.org/2000/svg";

  const frame =
    document.createElementNS(
      ns,
      "rect"
    );

  frame.setAttribute(
    "x",
    String(x)
  );

  frame.setAttribute(
    "y",
    String(y)
  );

  frame.setAttribute(
    "width",
    String(width)
  );

  frame.setAttribute(
    "height",
    String(height)
  );

  frame.setAttribute(
    "class",
    "segmental-sparkline-frame"
  );

  svg.appendChild(frame);

  const path =
    document.createElementNS(
      ns,
      "path"
    );

  path.setAttribute(
    "d",
    pathData
  );

  path.setAttribute(
    "class",
    "segmental-sparkline"
  );

  svg.appendChild(path);
}

function getMonthSpan(
  first: string,
  last: string
) {
  const start = new Date(`${first}T00:00:00`);
  const end = new Date(`${last}T00:00:00`);

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (end.getDate() > start.getDate()) {
    months += 1;
  }

  return months;
}

export function renderSegmentalLeanChart(
  svg: SVGSVGElement,
  data: SegmentalObservation[]
) {
  if (data.length === 0) {
    return;
  }

  svg.innerHTML = "";

  const ns = "http://www.w3.org/2000/svg";

  function createSvgElement<K extends keyof SVGElementTagNameMap>(
    tag: K,
    attributes: Record<string, string | number> = {}
  ): SVGElementTagNameMap[K] {
    const element = document.createElementNS(ns, tag);

    for (const [name, value] of Object.entries(attributes)) {
      element.setAttribute(name, String(value));
    }

    return element;
  }

  function addText(
    text: string,
    x: number,
    y: number,
    className: string,
    anchor: "start" | "middle" | "end" = "middle"
  ) {
    const element = createSvgElement("text", {
      x,
      y,
      class: className,
      "text-anchor": anchor,
    });

    element.textContent = text;
    svg.appendChild(element);
  }

  // Anatomical figure
  const figure =
    createSvgElement("g", {
      class: "segmental-figure",
    });

  // Body
  figure.appendChild(
    createSvgElement("path", {
      d: `
        M 1262 380

        C 1240 380, 1220 396, 1212 424
        C 1203 456, 1212 482, 1227 505
        C 1229 517, 1225 530, 1217 537

        C 1170 538, 1110 525, 1066 533
        C 1048 536, 1038 542, 1033 547

        C 1033 520, 1037 482, 1051 456
        C 1062 442, 1082 435, 1099 434
        C 1101 423, 1098 411, 1093 403
        C 1085 394, 1075 393, 1068 396

        C 1040 405, 1012 445, 983 488
        C 968 511, 958 548, 952 581
        C 960 596, 980 607, 1007 618

        C 1044 629, 1080 636, 1111 629
        C 1135 648, 1157 698, 1175 749
        C 1182 800, 1170 868, 1155 930
        C 1146 981, 1141 1062, 1145 1120

        C 1147 1162, 1138 1204, 1131 1239
        C 1129 1289, 1137 1343, 1145 1390
        C 1140 1418, 1125 1446, 1117 1460
        C 1114 1474, 1120 1484, 1131 1486

        C 1148 1488, 1163 1480, 1171 1474
        C 1184 1464, 1191 1454, 1191 1447
        C 1190 1423, 1185 1397, 1187 1374
        C 1192 1330, 1203 1261, 1206 1202

        C 1212 1160, 1225 1112, 1242 1060
        C 1250 1035, 1257 1013, 1262 996

        C 1267 1013, 1274 1035, 1282 1060
        C 1299 1112, 1312 1160, 1318 1202

        C 1321 1261, 1332 1330, 1337 1374
        C 1339 1397, 1334 1423, 1333 1447
        C 1333 1454, 1340 1464, 1353 1474
        C 1361 1480, 1376 1488, 1393 1486

        C 1404 1484, 1410 1474, 1407 1460
        C 1399 1446, 1384 1418, 1379 1390
        C 1387 1343, 1395 1289, 1393 1239
        C 1386 1204, 1377 1162, 1379 1120

        C 1383 1062, 1378 981, 1369 930
        C 1354 868, 1342 800, 1349 749
        C 1367 698, 1389 648, 1413 629

        C 1444 636, 1480 629, 1517 618
        C 1544 607, 1564 596, 1572 581
        C 1566 548, 1556 511, 1541 488

        C 1512 445, 1484 405, 1456 396
        C 1449 393, 1439 394, 1431 403
        C 1426 411, 1423 423, 1425 434
        C 1442 435, 1462 442, 1473 456

        C 1487 482, 1491 520, 1491 547
        C 1486 542, 1476 536, 1458 533

        C 1414 525, 1354 538, 1307 537
        C 1299 530, 1295 517, 1297 505
        C 1312 482, 1321 456, 1312 424
        C 1304 396, 1284 380, 1262 380

        Z
      `,
      transform: `
        translate(284 0)
        scale(0.42)
        translate(-1262 -295)
      `,
    })
  );

  svg.appendChild(figure);

  const armDomain =
    getDomain(
      data,
      [
        "left_arm_lean_kg",
        "right_arm_lean_kg",
      ]
    );

  const legDomain =
    getDomain(
      data,
      [
        "left_leg_lean_kg",
        "right_leg_lean_kg",
      ]
    );

  const trunkDomain =
    getDomain(
      data,
      [
        "trunk_lean_kg",
      ]
    );

  const armSpan = armDomain.max - armDomain.min;
  const trunkSpan = trunkDomain.max - trunkDomain.min;
  const legSpan = legDomain.max - legDomain.min;

  const addScaleSpan = (
    value: number,
    x: number,
    y: number
  ) => {
    const text = createSvgElement("text", {
      x,
      y,
      class: "segmental-time-key",
      "text-anchor": "middle",
      transform: `rotate(-90 ${x} ${y})`,
    });

    text.textContent = `${value.toFixed(1)} kg`;
    svg.appendChild(text);
  };

  addSparkline(
    svg,
    data,
    "left_arm_lean_kg",
    130,
    125,
    80,
    50,
    armDomain
  );

  addSparkline(
    svg,
    data,
    "right_arm_lean_kg",
    358,
    125,
    80,
    50,
    armDomain
  );

  addSparkline(
    svg,
    data,
    "trunk_lean_kg",
    244,
    225,
    80,
    50,
    trunkDomain
  );

  addSparkline(
    svg,
    data,
    "left_leg_lean_kg",
    130,
    345,
    80,
    50,
    legDomain
  );

  addSparkline(
    svg,
    data,
    "right_leg_lean_kg",
    358,
    345,
    80,
    50,
    legDomain
  );

  // Labels only for the first prototype.
  addText("LEFT ARM", 170, 95, "segmental-label");
  addText("RIGHT ARM", 398, 95, "segmental-label");

  addText("TRUNK", 284, 190, "segmental-label");

  addText("LEFT LEG", 170, 315, "segmental-label");
  addText("RIGHT LEG", 398, 315, "segmental-label");

  // Latest values.
  const latest = data[data.length - 1];

  addText(
    latest.left_arm_lean_kg !== null
      ? `${latest.left_arm_lean_kg.toFixed(2)} kg`
      : "—",
    170,
    115,
    "segmental-value"
  );

  addText(
    latest.right_arm_lean_kg !== null
      ? `${latest.right_arm_lean_kg.toFixed(2)} kg`
      : "—",
    398,
    115,
    "segmental-value"
  );

  addText(
    latest.trunk_lean_kg !== null
      ? `${latest.trunk_lean_kg.toFixed(1)} kg`
      : "—",
    284,
    210,
    "segmental-value"
  );

  addText(
    latest.left_leg_lean_kg !== null
      ? `${latest.left_leg_lean_kg.toFixed(2)} kg`
      : "—",
    170,
    335,
    "segmental-value"
  );

  addText(
    latest.right_leg_lean_kg !== null
      ? `${latest.right_leg_lean_kg.toFixed(2)} kg`
      : "—",
    398,
    335,
    "segmental-value"
  );

  addScaleSpan(armSpan, 121, 150);
  addScaleSpan(trunkSpan, 235, 250);
  addScaleSpan(legSpan, 121, 370);

  const firstDate =
    new Date(
      `${data[0].measured_on}T00:00:00`
    );

  const lastDate =
    new Date(
      `${data[data.length - 1].measured_on}T00:00:00`
    );

  const formatDate = (date: Date) =>
    date.toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );

  const monthSpan =
    getMonthSpan(
      data[0].measured_on,
      data[data.length - 1].measured_on
    );

  const legendX = 242;
  const legendY = 430;

  const xAxis =
    createSvgElement("line", {
      x1: legendX,
      y1: legendY,
      x2: legendX + 65,
      y2: legendY,
      class: "segmental-time-line",
    });

  const xArrow =
    createSvgElement("path", {
      d: `
        M ${legendX + 65} ${legendY}
        L ${legendX + 59} ${legendY - 3}
        L ${legendX + 59} ${legendY + 3}
        Z
      `,
      class: "segmental-time-arrow",
    });

  const yAxis =
    createSvgElement("line", {
      x1: legendX,
      y1: legendY,
      x2: legendX,
      y2: legendY - 32,
      class: "segmental-time-line",
    });

  const yArrow =
    createSvgElement("path", {
      d: `
        M ${legendX} ${legendY - 32}
        L ${legendX - 3} ${legendY - 26}
        L ${legendX + 3} ${legendY - 26}
        Z
      `,
      class: "segmental-time-arrow",
    });

  svg.appendChild(xAxis);
  svg.appendChild(xArrow);
  svg.appendChild(yAxis);
  svg.appendChild(yArrow);

  addText(
    "mass (kg)",
    legendX + 7,
    legendY - 25,
    "segmental-time-key",
    "start"
  );

  addText(
    "0",
    legendX,
    legendY + 16,
    "segmental-time-key",
    "start"
  );

  addText(
    `${monthSpan} months`,
    legendX + 65,
    legendY + 16,
    "segmental-time-key",
    "end"
  );
}


export function renderSegmentalFatChart(
  svg: SVGSVGElement,
  data: SegmentalObservation[]
) {
  if (data.length === 0) {
    return;
  }

  svg.innerHTML = "";

  const ns = "http://www.w3.org/2000/svg";

  function createSvgElement<K extends keyof SVGElementTagNameMap>(
    tag: K,
    attributes: Record<string, string | number> = {}
  ): SVGElementTagNameMap[K] {
    const element = document.createElementNS(ns, tag);

    for (const [name, value] of Object.entries(attributes)) {
      element.setAttribute(name, String(value));
    }

    return element;
  }

  function addText(
    text: string,
    x: number,
    y: number,
    className: string,
    anchor: "start" | "middle" | "end" = "middle"
  ) {
    const element = createSvgElement("text", {
      x,
      y,
      class: className,
      "text-anchor": anchor,
    });

    element.textContent = text;
    svg.appendChild(element);
  }

  // Anatomical figure
  const figure =
    createSvgElement("g", {
      class: "segmental-figure",
    });

  // Body
  figure.appendChild(
    createSvgElement("path", {
      d: `
        M 1262 380

        C 1240 380, 1220 396, 1212 424
        C 1203 456, 1212 482, 1227 505
        C 1229 517, 1225 530, 1217 537

        C 1170 538, 1110 525, 1066 533
        C 1048 536, 1038 542, 1033 547

        C 1033 520, 1037 482, 1051 456
        C 1062 442, 1082 435, 1099 434
        C 1101 423, 1098 411, 1093 403
        C 1085 394, 1075 393, 1068 396

        C 1040 405, 1012 445, 983 488
        C 968 511, 958 548, 952 581
        C 960 596, 980 607, 1007 618

        C 1044 629, 1080 636, 1111 629
        C 1135 648, 1157 698, 1175 749
        C 1182 800, 1170 868, 1155 930
        C 1146 981, 1141 1062, 1145 1120

        C 1147 1162, 1138 1204, 1131 1239
        C 1129 1289, 1137 1343, 1145 1390
        C 1140 1418, 1125 1446, 1117 1460
        C 1114 1474, 1120 1484, 1131 1486

        C 1148 1488, 1163 1480, 1171 1474
        C 1184 1464, 1191 1454, 1191 1447
        C 1190 1423, 1185 1397, 1187 1374
        C 1192 1330, 1203 1261, 1206 1202

        C 1212 1160, 1225 1112, 1242 1060
        C 1250 1035, 1257 1013, 1262 996

        C 1267 1013, 1274 1035, 1282 1060
        C 1299 1112, 1312 1160, 1318 1202

        C 1321 1261, 1332 1330, 1337 1374
        C 1339 1397, 1334 1423, 1333 1447
        C 1333 1454, 1340 1464, 1353 1474
        C 1361 1480, 1376 1488, 1393 1486

        C 1404 1484, 1410 1474, 1407 1460
        C 1399 1446, 1384 1418, 1379 1390
        C 1387 1343, 1395 1289, 1393 1239
        C 1386 1204, 1377 1162, 1379 1120

        C 1383 1062, 1378 981, 1369 930
        C 1354 868, 1342 800, 1349 749
        C 1367 698, 1389 648, 1413 629

        C 1444 636, 1480 629, 1517 618
        C 1544 607, 1564 596, 1572 581
        C 1566 548, 1556 511, 1541 488

        C 1512 445, 1484 405, 1456 396
        C 1449 393, 1439 394, 1431 403
        C 1426 411, 1423 423, 1425 434
        C 1442 435, 1462 442, 1473 456

        C 1487 482, 1491 520, 1491 547
        C 1486 542, 1476 536, 1458 533

        C 1414 525, 1354 538, 1307 537
        C 1299 530, 1295 517, 1297 505
        C 1312 482, 1321 456, 1312 424
        C 1304 396, 1284 380, 1262 380

        Z
      `,
      transform: `
        translate(284 0)
        scale(0.42)
        translate(-1262 -295)
      `,
    })
  );

  svg.appendChild(figure);

  const armDomain =
    getDomain(
      data,
      [
        "left_arm_fat_kg",
        "right_arm_fat_kg",
      ]
    );

  const legDomain =
    getDomain(
      data,
      [
        "left_leg_fat_kg",
        "right_leg_fat_kg",
      ]
    );

  const trunkDomain =
    getDomain(
      data,
      [
        "trunk_fat_kg",
      ]
    );

  const armSpan = armDomain.max - armDomain.min;
  const trunkSpan = trunkDomain.max - trunkDomain.min;
  const legSpan = legDomain.max - legDomain.min;

  const addScaleSpan = (
    value: number,
    x: number,
    y: number
  ) => {
    const text = createSvgElement("text", {
      x,
      y,
      class: "segmental-time-key",
      "text-anchor": "middle",
      transform: `rotate(-90 ${x} ${y})`,
    });

    text.textContent = `${value.toFixed(1)} kg`;
    svg.appendChild(text);
  };

  addSparkline(
    svg,
    data,
    "left_arm_fat_kg",
    130,
    125,
    80,
    50,
    armDomain
  );

  addSparkline(
    svg,
    data,
    "right_arm_fat_kg",
    358,
    125,
    80,
    50,
    armDomain
  );

  addSparkline(
    svg,
    data,
    "trunk_fat_kg",
    244,
    225,
    80,
    50,
    trunkDomain
  );

  addSparkline(
    svg,
    data,
    "left_leg_fat_kg",
    130,
    345,
    80,
    50,
    legDomain
  );

  addSparkline(
    svg,
    data,
    "right_leg_fat_kg",
    358,
    345,
    80,
    50,
    legDomain
  );

  // Labels only for the first prototype.
  addText("LEFT ARM", 170, 95, "segmental-label");
  addText("RIGHT ARM", 398, 95, "segmental-label");

  addText("TRUNK", 284, 190, "segmental-label");

  addText("LEFT LEG", 170, 315, "segmental-label");
  addText("RIGHT LEG", 398, 315, "segmental-label");

  // Latest values.
  const latest = data[data.length - 1];

  addText(
    latest.left_arm_fat_kg !== null
      ? `${latest.left_arm_fat_kg.toFixed(2)} kg`
      : "—",
    170,
    115,
    "segmental-value"
  );

  addText(
    latest.right_arm_fat_kg !== null
      ? `${latest.right_arm_fat_kg.toFixed(2)} kg`
      : "—",
    398,
    115,
    "segmental-value"
  );

  addText(
    latest.trunk_fat_kg !== null
      ? `${latest.trunk_fat_kg.toFixed(1)} kg`
      : "—",
    284,
    210,
    "segmental-value"
  );

  addText(
    latest.left_leg_fat_kg !== null
      ? `${latest.left_leg_fat_kg.toFixed(2)} kg`
      : "—",
    170,
    335,
    "segmental-value"
  );

  addText(
    latest.right_leg_fat_kg !== null
      ? `${latest.right_leg_fat_kg.toFixed(2)} kg`
      : "—",
    398,
    335,
    "segmental-value"
  );

  addScaleSpan(armSpan, 121, 150);
  addScaleSpan(trunkSpan, 235, 250);
  addScaleSpan(legSpan, 121, 370);

  const firstDate =
    new Date(
      `${data[0].measured_on}T00:00:00`
    );

  const lastDate =
    new Date(
      `${data[data.length - 1].measured_on}T00:00:00`
    );

  const formatDate = (date: Date) =>
    date.toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );

  const monthSpan =
    getMonthSpan(
      data[0].measured_on,
      data[data.length - 1].measured_on
    );

  const legendX = 242;
  const legendY = 430;

  const xAxis =
    createSvgElement("line", {
      x1: legendX,
      y1: legendY,
      x2: legendX + 65,
      y2: legendY,
      class: "segmental-time-line",
    });

  const xArrow =
    createSvgElement("path", {
      d: `
        M ${legendX + 65} ${legendY}
        L ${legendX + 59} ${legendY - 3}
        L ${legendX + 59} ${legendY + 3}
        Z
      `,
      class: "segmental-time-arrow",
    });

  const yAxis =
    createSvgElement("line", {
      x1: legendX,
      y1: legendY,
      x2: legendX,
      y2: legendY - 32,
      class: "segmental-time-line",
    });

  const yArrow =
    createSvgElement("path", {
      d: `
        M ${legendX} ${legendY - 32}
        L ${legendX - 3} ${legendY - 26}
        L ${legendX + 3} ${legendY - 26}
        Z
      `,
      class: "segmental-time-arrow",
    });

  svg.appendChild(xAxis);
  svg.appendChild(xArrow);
  svg.appendChild(yAxis);
  svg.appendChild(yArrow);

  addText(
    "mass (kg)",
    legendX + 7,
    legendY - 25,
    "segmental-time-key",
    "start"
  );

  addText(
    "0",
    legendX,
    legendY + 16,
    "segmental-time-key",
    "start"
  );

  addText(
    `${monthSpan} months`,
    legendX + 65,
    legendY + 16,
    "segmental-time-key",
    "end"
  );
}

