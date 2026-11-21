import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "src/lib/palette-data.ts");

function encode(channel) {
  const value = Math.min(1, Math.max(0, channel));
  return value <= 0.0031308
    ? 12.92 * value
    : 1.055 * value ** (1 / 2.4) - 0.055;
}

function decode(channel) {
  return channel <= 0.04045
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4;
}

function oklchToRgb(l, c, h) {
  const hue = (h * Math.PI) / 180;
  const a = c * Math.cos(hue);
  const b = c * Math.sin(hue);
  const lms = [
    (l + 0.3963377774 * a + 0.2158037573 * b) ** 3,
    (l - 0.1055613458 * a - 0.0638541728 * b) ** 3,
    (l - 0.0894841775 * a - 1.291485548 * b) ** 3,
  ];
  return [
    encode(
      4.0767416621 * lms[0] - 3.3077115913 * lms[1] + 0.2309699292 * lms[2],
    ),
    encode(
      -1.2684380046 * lms[0] + 2.6097574011 * lms[1] - 0.3413193965 * lms[2],
    ),
    encode(
      -0.0041960863 * lms[0] - 0.7034186147 * lms[1] + 1.707614701 * lms[2],
    ),
  ];
}

function inGamut(l, c, h, epsilon) {
  return oklchToRgb(l, c, h).every(
    (channel) => channel >= -epsilon && channel <= 1 + epsilon,
  );
}

function maxChroma(l, h) {
  if (h === 0) return 0;
  let low = 0;
  let high = 0.42;
  for (let i = 0; i < 48; i++) {
    const mid = (low + high) / 2;
    if (inGamut(l, mid, h, 1e-4)) low = mid;
    else high = mid;
  }
  return low;
}

function luminance({ l, c, h }) {
  const [r, g, b] = oklchToRgb(l, c, h).map(decode);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

function toHex({ l, c, h }) {
  return `#${oklchToRgb(l, c, h)
    .map((channel) =>
      Math.round(channel * 255)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}

function format({ l, c, h }) {
  return `oklch(${l.toFixed(3)} ${c < 0.0005 ? "0" : c.toFixed(3)} ${Math.round(h)})`;
}

const lightLadder = [
  0.987,
  0.969,
  0.944,
  0.919,
  0.894,
  0.866,
  0.82,
  0.755,
  null,
  null,
  0.505,
  0.285,
];
const darkLadder = [
  0.185,
  0.215,
  0.243,
  0.268,
  0.293,
  0.322,
  0.365,
  0.43,
  null,
  null,
  0.735,
  0.93,
];

const lightChromaCurve = [
  0.05, 0.09, 0.15, 0.21, 0.27, 0.35, 0.48, 0.66, 1, 0.98, 0.62, 0.3,
];
const darkChromaCurve = [
  0.18, 0.25, 0.32, 0.38, 0.43, 0.48, 0.56, 0.68, 1, 0.97, 0.68, 0.28,
];
const neutralLightCurve = [
  0.15, 0.2, 0.26, 0.32, 0.38, 0.45, 0.55, 0.68, 1, 1, 0.85, 0.75,
];
const neutralDarkCurve = [
  0.3, 0.36, 0.42, 0.48, 0.54, 0.6, 0.68, 0.78, 1, 1, 0.75, 0.25,
];

const gamutMargin = 0.985;
const solidDarkL = 0.7;
const pageLight = { l: 0.969, c: 0, h: 0 };

const definitions = [
  {
    slug: "gray",
    name: "Gray",
    kind: "neutral",
    hue: 0,
    solidC: 0,
    solidLightL: 0.42,
    description:
      "Surfaces, borders, and text. It has no chroma, so it does not tint other hues.",
  },
  {
    slug: "slate",
    name: "Slate",
    kind: "neutral",
    hue: 257,
    solidC: 0.02,
    solidLightL: 0.42,
    description: "A cool neutral. Pair it with Blue, Indigo, and Cyan.",
  },
  {
    slug: "sage",
    name: "Sage",
    kind: "neutral",
    hue: 165,
    solidC: 0.016,
    solidLightL: 0.42,
    description: "A green neutral. Pair it with Green and Teal.",
  },
  {
    slug: "mauve",
    name: "Mauve",
    kind: "neutral",
    hue: 305,
    solidC: 0.018,
    solidLightL: 0.42,
    description: "A purple neutral. Pair it with Red, Violet, Plum, and Pink.",
  },
  {
    slug: "sand",
    name: "Sand",
    kind: "neutral",
    hue: 85,
    solidC: 0.014,
    solidLightL: 0.42,
    description: "A warm neutral. Pair it with Orange, Bronze, and Gold.",
  },
  {
    slug: "red",
    name: "Red",
    neutral: "mauve",
    hue: 27,
    solidC: 0.19,
    description: "Errors and destructive actions.",
  },
  {
    slug: "orange",
    name: "Orange",
    neutral: "sand",
    hue: 58,
    solidC: 0.17,
    description: "Warnings and urgent accents that must not look like errors.",
  },
  {
    slug: "yellow",
    name: "Yellow",
    neutral: "sand",
    hue: 92,
    solidC: 0.16,
    solidLightL: 0.8,
    lightLadder: [
      0.99, 0.975, 0.955, 0.935, 0.915, 0.89, 0.865, 0.835, 0.8, 0.765, 0.52,
      0.3,
    ],
    description:
      "Highlights and attention. Text on step 9 is dark in both modes.",
  },
  {
    slug: "green",
    name: "Green",
    neutral: "sage",
    hue: 152,
    solidC: 0.16,
    description: "Success and confirmation.",
  },
  {
    slug: "teal",
    name: "Teal",
    neutral: "sage",
    hue: 178,
    solidC: 0.14,
    description: "Calm accents and data.",
  },
  {
    slug: "cyan",
    name: "Cyan",
    neutral: "slate",
    hue: 205,
    solidC: 0.13,
    description: "Cool accents and information.",
  },
  {
    slug: "blue",
    name: "Blue",
    neutral: "slate",
    hue: 258,
    solidC: 0.18,
    description: "Links, focus, and primary actions.",
  },
  {
    slug: "indigo",
    name: "Indigo",
    neutral: "slate",
    hue: 277,
    solidC: 0.2,
    description: "A deep blue for brands and primary actions.",
  },
  {
    slug: "violet",
    name: "Violet",
    neutral: "mauve",
    hue: 297,
    solidC: 0.19,
    description: "Accents and categories that must look different from blue.",
  },
  {
    slug: "plum",
    name: "Plum",
    neutral: "mauve",
    hue: 325,
    solidC: 0.18,
    description: "A rich purple for brands and expressive accents.",
  },
  {
    slug: "pink",
    name: "Pink",
    neutral: "mauve",
    hue: 348,
    solidC: 0.2,
    description: "Tags, highlights, and expressive accents.",
  },
  {
    slug: "bronze",
    name: "Bronze",
    neutral: "sand",
    hue: 42,
    solidC: 0.07,
    description: "A muted metal for calm, refined brands.",
  },
  {
    slug: "gold",
    name: "Gold",
    neutral: "sand",
    hue: 82,
    solidC: 0.085,
    description: "A muted metal. Use it in place of Yellow for solid fills.",
  },
];

function whiteTextSolidL(hue, solidC) {
  let l = 0.62;
  while (l > 0.4) {
    const solid = {
      l,
      c: Math.min(solidC, maxChroma(l, hue) * gamutMargin),
      h: hue,
    };
    if (
      contrast({ l: 0.987, c: 0, h: 0 }, solid) >= 4.6 &&
      contrast(solid, pageLight) >= 4.55
    )
      break;
    l -= 0.001;
  }
  return Math.round(l * 1000) / 1000;
}

function buildRamp({ hue, solidC }, ladder, curve) {
  return ladder.map((l, index) => {
    const cap = maxChroma(l, hue) * gamutMargin;
    const wanted = hue === 0 ? 0 : solidC * curve[index];
    return { l, c: Math.min(wanted, cap), h: hue };
  });
}

const palettes = [];
const failures = [];

for (const definition of definitions) {
  const solidLightL =
    definition.solidLightL ??
    whiteTextSolidL(definition.hue, definition.solidC);
  const light = buildRamp(
    definition,
    (definition.lightLadder ?? lightLadder).map((l, index) =>
      l === null ? (index === 8 ? solidLightL : solidLightL - 0.035) : l,
    ),
    definition.kind === "neutral" ? neutralLightCurve : lightChromaCurve,
  );
  const dark = buildRamp(
    definition,
    darkLadder.map((l, index) =>
      l === null ? (index === 8 ? solidDarkL : solidDarkL + 0.04) : l,
    ),
    definition.kind === "neutral" ? neutralDarkCurve : darkChromaCurve,
  );

  const lightSolidText =
    contrast(light[0], light[8]) >= 4.5
      ? 1
      : contrast(light[11], light[8]) >= 4.5
        ? 12
        : null;
  const darkSolidText =
    contrast(dark[0], dark[8]) >= 4.5
      ? 1
      : contrast(dark[11], dark[8]) >= 4.5
        ? 12
        : null;

  const checks = [
    ["light text 11 on 1", contrast(light[10], light[0]), 4.5],
    ["light text 12 on 1", contrast(light[11], light[0]), 7],
    ["light text 11 on 2", contrast(light[10], light[1]), 4.5],
    ["dark text 11 on 2", contrast(dark[10], dark[1]), 4.5],
    ["dark text 12 on 2", contrast(dark[11], dark[1]), 7],
    [
      "light solid text",
      lightSolidText ? contrast(light[lightSolidText - 1], light[8]) : 0,
      4.5,
    ],
    [
      "dark solid text",
      darkSolidText ? contrast(dark[darkSolidText - 1], dark[8]) : 0,
      4.5,
    ],
    ...(lightSolidText === 1
      ? [["light solid 9 on 2", contrast(light[8], light[1]), 4.5]]
      : []),
  ];

  for (const [label, ratio, floor] of checks) {
    if (ratio < floor)
      failures.push(
        `${definition.slug}: ${label} ${ratio.toFixed(2)} is below ${floor}`,
      );
  }
  for (const [mode, ramp] of [
    ["light", light],
    ["dark", dark],
  ]) {
    ramp.forEach((color, index) => {
      const rounded = format(color);
      const [, l, c, h] = rounded.match(/oklch\(([\d.]+) ([\d.]+) ([\d.]+)\)/);
      if (!inGamut(Number(l), Number(c), Number(h), 0.0005))
        failures.push(
          `${definition.slug}-${mode}-${index + 1} is outside sRGB`,
        );
    });
  }

  if (!lightSolidText || !darkSolidText)
    failures.push(`${definition.slug}: step 9 has no text step at 4.5:1`);

  palettes.push({
    definition,
    light,
    dark,
    lightSolidText,
    darkSolidText,
    checks,
  });

  console.log(
    `${definition.slug.padEnd(7)} solid ${toHex(light[8])} / ${toHex(dark[8])}  text ${lightSolidText === 1 ? "1" : "12"}/${darkSolidText === 1 ? "1" : "12"}  ${checks
      .map(
        ([label, ratio, floor]) =>
          `${label} ${ratio.toFixed(2)}${ratio < floor ? " FAIL" : ""}`,
      )
      .join(" | ")}`,
  );
}

if (failures.length > 0) {
  console.error(
    `\n${failures.length} check(s) failed:\n${failures.join("\n")}`,
  );
  process.exitCode = 1;
} else {
  const entries = palettes
    .map(
      ({ definition, light, dark, lightSolidText, darkSolidText }) => `  {
    slug: "${definition.slug}",
    name: "${definition.name}",
    description: "${definition.description}",
    kind: "${definition.kind ?? "accent"}",
    neutral: "${definition.neutral ?? definition.slug}",
    solidText: { light: ${lightSolidText}, dark: ${darkSolidText} },
    light: [
${light.map((color) => `      "${format(color)}",`).join("\n")}
    ],
    dark: [
${dark.map((color) => `      "${format(color)}",`).join("\n")}
    ],
  },`,
    )
    .join("\n");

  const file = `// Generated by scripts/generate-palettes.mjs. Run pnpm palette:build to regenerate.
export const paletteData = [
${entries}
] as const;
`;

  await writeFile(output, file);
  console.log(`\nWrote ${path.relative(root, output)}`);
}
