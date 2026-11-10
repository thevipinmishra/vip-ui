import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { componentName, getComponent } from "./catalog";
import { findPalette } from "./palettes";
import { site } from "./seo";

export const ogContentType = "image/png";

export const ogSize = {
  width: 1200,
  height: 630,
} as const;

export const ogAlt = `${site.name} — ${site.tagline}`;

export const ogArts = [
  "controls",
  "chart",
  "blocks",
  "swatches",
  "scale",
  "type",
] as const;

export type OgArt = (typeof ogArts)[number];

function oklchToHex(value: string): string {
  const match = value.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/);
  if (!match) return value;
  const [lightness, chroma, hue] = match.slice(1).map(Number);
  const angle = (hue * Math.PI) / 180;
  const a = chroma * Math.cos(angle);
  const b = chroma * Math.sin(angle);
  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const linear = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  return `#${linear
    .map((channel) => {
      const clamped = Math.min(1, Math.max(0, channel));
      const encoded =
        clamped <= 0.0031308
          ? 12.92 * clamped
          : 1.055 * clamped ** (1 / 2.4) - 0.055;
      return Math.round(encoded * 255)
        .toString(16)
        .padStart(2, "0");
    })
    .join("")}`;
}

function rgba(hex: string, alpha: number): string {
  const number = Number.parseInt(hex.slice(1), 16);
  return `rgba(${(number >> 16) & 255}, ${(number >> 8) & 255}, ${number & 255}, ${alpha})`;
}

const ink = "#1a211e";

export const ogColors = {
  background: "#f7f9f8",
  card: "#ffffff",
  foreground: ink,
  muted: "#5f6563",
  border: "#d7dad9",
  teal: oklchToHex("oklch(0.62 0.11 180)"),
  ochre: oklchToHex("oklch(0.63 0.13 75)"),
  orchid: oklchToHex("oklch(0.56 0.14 320)"),
  brick: oklchToHex("oklch(0.48 0.13 32)"),
} as const;

const blueRamp = [2, 4, 6, 8, 9, 10].map((index) =>
  oklchToHex(findPalette("blue").light[index]),
);

const artGlow: Record<OgArt, string> = {
  controls: ogColors.orchid,
  chart: ogColors.teal,
  blocks: ogColors.ochre,
  swatches: ink,
  scale: blueRamp[3],
  type: ogColors.teal,
};

const geistFontPath = (file: string) =>
  join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans", file);

function loadOgFonts() {
  return Promise.all([
    readFile(geistFontPath("Geist-Regular.ttf")),
    readFile(geistFontPath("Geist-SemiBold.ttf")),
  ]).then(([geistRegular, geistSemiBold]) => [
    {
      name: "Geist",
      data: geistRegular,
      style: "normal" as const,
      weight: 400 as const,
    },
    {
      name: "Geist",
      data: geistSemiBold,
      style: "normal" as const,
      weight: 600 as const,
    },
  ]);
}

let ogFonts: ReturnType<typeof loadOgFonts> | undefined;

function getOgFonts() {
  ogFonts ??= loadOgFonts();
  return ogFonts;
}

const logoMark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="44" height="44"><path fill="${ink}" d="M7.71 32H7a7 7 0 0 1-7-7V7a7 7 0 0 1 7-7h13.51z"/><path fill="${ink}" fill-opacity=".5" d="M24.29 0H25a7 7 0 0 1 7 7v18a7 7 0 0 1-7 7H11.49z"/></svg>`;
const logoMarkSrc = `data:image/svg+xml;base64,${Buffer.from(logoMark).toString("base64")}`;

export function truncateDescription(text: string, maxLength = 150): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;

  const slice = clean.slice(0, maxLength);
  const boundary = slice.lastIndexOf(" ");
  const cut = boundary > maxLength * 0.6 ? slice.slice(0, boundary) : slice;
  return `${cut.replace(/[.,;:!?-]+$/, "")}…`;
}

function titleSize(title: string): number {
  if (title.length <= 20) return 88;
  if (title.length <= 36) return 76;
  return 68;
}

function Art({ art }: { art: OgArt }) {
  switch (art) {
    case "chart":
      return (
        <div style={{ display: "flex", alignItems: "flex-end", gap: 14 }}>
          {(
            [
              [28, ogColors.ochre],
              [46, ogColors.teal],
              [36, ogColors.orchid],
              [58, ogColors.teal],
              [42, ogColors.brick],
              [52, ogColors.ochre],
            ] as const
          ).map(([height, color]) => (
            <div
              key={`${height}-${color}`}
              style={{
                width: 14,
                height,
                borderRadius: 9999,
                backgroundColor: color,
              }}
            />
          ))}
        </div>
      );
    case "blocks":
      return (
        <div style={{ display: "flex", gap: 9, width: 112, height: 70 }}>
          <div
            style={{
              width: 26,
              borderRadius: 8,
              backgroundColor: ogColors.ochre,
            }}
          />
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              gap: 9,
            }}
          >
            <div
              style={{
                height: 20,
                borderRadius: 8,
                backgroundColor: ogColors.teal,
              }}
            />
            <div style={{ display: "flex", flex: 1, gap: 9 }}>
              <div
                style={{
                  flex: 1,
                  borderRadius: 8,
                  backgroundColor: ogColors.orchid,
                }}
              />
              <div
                style={{
                  flex: 1,
                  borderRadius: 8,
                  backgroundColor: ogColors.brick,
                }}
              />
            </div>
          </div>
        </div>
      );
    case "swatches":
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          {[
            ink,
            ogColors.teal,
            ogColors.ochre,
            ogColors.orchid,
            ogColors.brick,
          ].map((color, index) => (
            <div
              key={color}
              style={{
                width: 56,
                height: 56,
                marginLeft: index === 0 ? 0 : -14,
                borderRadius: 9999,
                border: `5px solid ${ogColors.background}`,
                backgroundColor: color,
              }}
            />
          ))}
        </div>
      );
    case "scale":
      return (
        <div
          style={{
            display: "flex",
            height: 40,
            overflow: "hidden",
            borderRadius: 9999,
            border: `1px solid ${rgba(ink, 0.1)}`,
          }}
        >
          {blueRamp.map((color) => (
            <div
              key={color}
              style={{ width: 26, height: 40, backgroundColor: color }}
            />
          ))}
        </div>
      );
    case "type":
      return (
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: ink,
          }}
        >
          Aa
        </div>
      );
    default:
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: 70,
              height: 40,
              padding: 5,
              borderRadius: 9999,
              backgroundColor: ogColors.teal,
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 9999,
                backgroundColor: ogColors.background,
              }}
            />
          </div>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: ogColors.ochre,
            }}
          />
          <div
            style={{
              width: 60,
              height: 40,
              borderRadius: 9999,
              backgroundColor: ogColors.brick,
            }}
          />
        </div>
      );
  }
}

interface OgCardOptions {
  title: string;
  description: string;
  label?: string;
  art?: OgArt;
}

function OgCard({
  title,
  description,
  label,
  art = "controls",
}: OgCardOptions) {
  const glow = artGlow[art];

  return (
    <div
      style={{
        width: ogSize.width,
        height: ogSize.height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        backgroundColor: ogColors.background,
        color: ogColors.foreground,
        fontFamily: "Geist",
        padding: "52px 64px 48px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: ogSize.width,
          height: ogSize.height,
          display: "flex",
          backgroundImage: `radial-gradient(circle at 50% 0%, ${rgba(glow, glow === ink ? 0.08 : 0.16)} 0%, ${rgba(glow, 0)} 60%)`,
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* biome-ignore lint/performance/noImgElement: Satori renders the card, not the browser. */}
          <img src={logoMarkSrc} width={44} height={44} alt="" />
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            vip/ui
          </div>
        </div>
        {label ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 18px",
              border: `1px solid ${ogColors.border}`,
              borderRadius: 9999,
              backgroundColor: ogColors.card,
              color: ogColors.muted,
              fontSize: 20,
              lineHeight: 1.2,
            }}
          >
            {label}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          paddingBottom: 12,
        }}
      >
        <div style={{ display: "flex", opacity: 0.9 }}>
          <Art art={art} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            maxWidth: 940,
            marginTop: 36,
            fontSize: titleSize(title),
            fontWeight: 600,
            letterSpacing: "-0.045em",
            lineHeight: 1.06,
            textAlign: "center",
            textWrap: title.length > 20 ? "balance" : "wrap",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            maxWidth: 840,
            marginTop: 24,
            fontSize: 28,
            lineHeight: 1.45,
            textAlign: "center",
            textWrap: "balance",
            color: ogColors.muted,
          }}
        >
          {truncateDescription(description)}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 20,
          lineHeight: 1,
          color: ogColors.muted,
        }}
      >
        {site.domain}
      </div>
    </div>
  );
}

export async function renderOgCard(
  options: OgCardOptions,
): Promise<ImageResponse> {
  return new ImageResponse(<OgCard {...options} />, {
    ...ogSize,
    fonts: await getOgFonts(),
  });
}

export async function componentOgCard(slug: string): Promise<ImageResponse> {
  const component = getComponent(slug);

  return renderOgCard({
    label: component?.group ?? "Components",
    title: component?.name ?? componentName(slug),
    description:
      component?.description ??
      "An accessible React component built with React Aria, Tailwind CSS, and Motion.",
    art: "controls",
  });
}
