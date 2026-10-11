type Rgb = [number, number, number];

function parseOklch(value: string) {
  const match = value.match(
    /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/,
  );
  if (!match) throw new Error(`Expected an oklch() color, got ${value}`);
  return {
    l: Number(match[1]),
    c: Number(match[2]),
    h: Number(match[3]),
    alpha: match[4] === undefined ? 1 : Number(match[4]),
  };
}

function encode(channel: number) {
  const value = Math.min(1, Math.max(0, channel));
  return value <= 0.0031308
    ? 12.92 * value
    : 1.055 * value ** (1 / 2.4) - 0.055;
}

function decode(channel: number) {
  return channel <= 0.04045
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4;
}

export function toRgb(value: string, base?: Rgb): Rgb {
  const { l, c, h, alpha } = parseOklch(value);
  const hue = (h * Math.PI) / 180;
  const a = c * Math.cos(hue);
  const b = c * Math.sin(hue);
  const lms = [
    (l + 0.3963377774 * a + 0.2158037573 * b) ** 3,
    (l - 0.1055613458 * a - 0.0638541728 * b) ** 3,
    (l - 0.0894841775 * a - 1.291485548 * b) ** 3,
  ];
  const rgb: Rgb = [
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
  if (alpha === 1 || !base) return rgb;
  return rgb.map(
    (channel, index) => channel * alpha + base[index] * (1 - alpha),
  ) as Rgb;
}

function luminance([r, g, b]: Rgb) {
  return 0.2126 * decode(r) + 0.7152 * decode(g) + 0.0722 * decode(b);
}

export function contrast(
  foreground: string,
  background: string,
  base?: string,
) {
  const under = toRgb(background, base ? toRgb(base) : undefined);
  const over = toRgb(foreground, under);
  const [light, dark] = [luminance(over), luminance(under)].sort(
    (x, y) => y - x,
  );
  return (light + 0.05) / (dark + 0.05);
}

export function contrastGrade(ratio: number) {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "AA large";
  return "Low";
}

export function toHex(value: string) {
  return `#${toRgb(value)
    .map((channel) =>
      Math.round(channel * 255)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}
