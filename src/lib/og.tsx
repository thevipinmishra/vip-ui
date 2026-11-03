import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { componentName, getComponent } from "./catalog";
import { site } from "./seo";

export const ogContentType = "image/png";

export const ogSize = {
  width: 1200,
  height: 630,
} as const;

export const ogAlt = `${site.name} — ${site.tagline}`;

export const ogColors = {
  background: "#101211",
  surface: "#171918",
  foreground: "#eceeed",
  muted: "#adb5b2",
  border: "rgba(236,238,237,0.12)",
  teal: "#7bd3c7",
  amber: "#e6b566",
} as const;

export const ogChips = [
  "React Aria",
  "Tailwind CSS v4",
  "Motion",
  "vip-ui.dev",
] as const;

const geistRegular = await readFile(
  join(
    process.cwd(),
    "node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf",
  ),
);
const geistSemiBold = await readFile(
  join(
    process.cwd(),
    "node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.ttf",
  ),
);

const ogFonts = [
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
];

const logoMark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64"><path fill="#eceeed" d="M7.71 32H7a7 7 0 0 1-7-7V7a7 7 0 0 1 7-7h13.51z"/><path fill="#eceeed" fill-opacity=".5" d="M24.29 0H25a7 7 0 0 1 7 7v18a7 7 0 0 1-7 7H11.49z"/></svg>`;
const logoMarkSrc = `data:image/svg+xml;base64,${Buffer.from(logoMark).toString("base64")}`;

interface OgCardOptions {
  eyebrow: string;
  title: string;
  description: string;
  meta?: string;
  snippet?: string;
  accent?: string;
  chips?: readonly string[];
}

function rgba(hex: string, alpha: number): string {
  const value = hex.replace("#", "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((part) => `${part}${part}`)
          .join("")
      : value;
  const number = Number.parseInt(full, 16);
  return `rgba(${(number >> 16) & 255}, ${(number >> 8) & 255}, ${number & 255}, ${alpha})`;
}

/** Cut at a word boundary so a long catalog description never overflows. */
export function truncateDescription(text: string, maxLength = 170): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;

  const slice = clean.slice(0, maxLength);
  const boundary = slice.lastIndexOf(" ");
  const cut = boundary > maxLength * 0.6 ? slice.slice(0, boundary) : slice;
  return `${cut.replace(/[.,;:!?-]+$/, "")}…`;
}

function titleSize(title: string): number {
  if (title.length <= 16) return 92;
  if (title.length <= 26) return 84;
  if (title.length <= 34) return 78;
  return 72;
}

function pascalCase(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function OgCard({
  eyebrow,
  title,
  description,
  meta,
  snippet,
  accent = ogColors.teal,
  chips = ogChips,
}: OgCardOptions) {
  const descriptionText = truncateDescription(description);
  const accentTint = rgba(accent, 0.06);
  const accentRing = rgba(accent, 0.4);

  return (
    <div
      style={{
        width: ogSize.width,
        height: ogSize.height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        backgroundColor: ogColors.background,
        color: ogColors.foreground,
        fontFamily: "Geist",
        padding: "52px 64px 46px",
      }}
    >
      {/* Background geometry: a clipped ring, an accent wash, a marker, and a hairline. */}
      <div
        style={{
          position: "absolute",
          top: -190,
          right: -110,
          width: 560,
          height: 560,
          display: "flex",
          borderRadius: 9999,
          border: "1px solid rgba(236,238,237,0.08)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 86,
          right: 142,
          width: 240,
          height: 240,
          display: "flex",
          borderRadius: 9999,
          backgroundColor: accentTint,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 212,
          right: 240,
          width: 26,
          height: 26,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 9999,
          border: `1px solid ${accentRing}`,
        }}
      >
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: 9999,
            backgroundColor: accent,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 132,
          right: 320,
          width: 1,
          height: 174,
          display: "flex",
          backgroundColor: "rgba(236,238,237,0.08)",
        }}
      />

      {/* Masthead: logo mark, wordmark, and the route eyebrow with meta or snippet. */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* biome-ignore lint/performance/noImgElement: Satori renders the card, not the browser. */}
          <img src={logoMarkSrc} width={64} height={64} alt="" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: "-0.055em",
              lineHeight: 1,
            }}
          >
            <span>vip</span>
            <span style={{ color: ogColors.muted }}>/</span>
            <span>ui</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: 9999,
                backgroundColor: accent,
              }}
            />
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.18em",
                color: ogColors.muted,
              }}
            >
              {eyebrow.toUpperCase()}
            </div>
          </div>
          {snippet ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "6px 12px",
                border: `1px solid ${ogColors.border}`,
                borderRadius: 9999,
                backgroundColor: "rgba(236,238,237,0.03)",
                color: accent,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              {snippet}
            </div>
          ) : meta ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 14,
                lineHeight: 1.2,
                color: ogColors.muted,
              }}
            >
              {meta}
            </div>
          ) : null}
        </div>
      </div>

      {/* Main copy: accent rule, title, then a truncated 2–3 line description. */}
      <div
        style={{
          display: "flex",
          flex: "1 1 0",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          maxWidth: 820,
          paddingTop: 4,
          paddingBottom: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 48,
            height: 3,
            marginBottom: 22,
            borderRadius: 9999,
            backgroundColor: accent,
            opacity: 0.85,
          }}
        />
        <div
          style={{
            display: "flex",
            maxWidth: 820,
            fontSize: titleSize(title),
            fontWeight: 600,
            letterSpacing: "-0.05em",
            lineHeight: 0.98,
            color: ogColors.foreground,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: 800,
            marginTop: 24,
            fontSize: 29,
            lineHeight: 1.42,
            color: ogColors.muted,
          }}
        >
          {descriptionText}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {chips.map((chip) => (
          <div
            key={chip}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 14px",
              border: `1px solid ${ogColors.border}`,
              borderRadius: 9999,
              backgroundColor: "rgba(236,238,237,0.03)",
              color: ogColors.muted,
              fontSize: 14,
              lineHeight: 1.2,
              letterSpacing: "0.01em",
            }}
          >
            {chip}
          </div>
        ))}
      </div>

      {/* Abstract UI panel: solid surfaces and bars, so it stays Satori-safe. */}
      <div
        style={{
          position: "absolute",
          right: 64,
          bottom: 140,
          width: 236,
          height: 158,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 20,
          border: `1px solid ${ogColors.border}`,
          borderRadius: 24,
          backgroundColor: ogColors.surface,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 9999,
                backgroundColor: accent,
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 9999,
                backgroundColor: "rgba(236,238,237,0.22)",
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 9999,
                backgroundColor: "rgba(236,238,237,0.12)",
              }}
            />
          </div>
          <div
            style={{
              width: 34,
              height: 4,
              borderRadius: 9999,
              backgroundColor: "rgba(236,238,237,0.16)",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              width: 150,
              height: 8,
              borderRadius: 9999,
              backgroundColor: "rgba(236,238,237,0.22)",
            }}
          />
          <div
            style={{
              width: 104,
              height: 8,
              borderRadius: 9999,
              backgroundColor: "rgba(236,238,237,0.12)",
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 26,
              height: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              backgroundColor: rgba(ogColors.amber, 0.16),
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: 9999,
                backgroundColor: ogColors.amber,
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <div
              style={{
                width: 62,
                height: 5,
                borderRadius: 9999,
                backgroundColor: "rgba(236,238,237,0.16)",
              }}
            />
            <div
              style={{
                width: 40,
                height: 5,
                borderRadius: 9999,
                backgroundColor: "rgba(236,238,237,0.10)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function renderOgCard(options: OgCardOptions): ImageResponse {
  return new ImageResponse(<OgCard {...options} />, {
    ...ogSize,
    fonts: ogFonts,
  });
}

export function componentOgCard(slug: string): ImageResponse {
  const component = getComponent(slug);
  const name = component?.name ?? componentName(slug);

  return renderOgCard({
    eyebrow: component?.group ?? "Component",
    title: name,
    description:
      component?.description ??
      "An accessible React component built with React Aria, Tailwind CSS v4, and Motion.",
    snippet: `<${pascalCase(slug)} />`,
    accent: ogColors.teal,
  });
}
