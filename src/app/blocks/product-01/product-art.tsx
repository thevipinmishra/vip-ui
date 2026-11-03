"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

function mix(hex: string, target: string, amount: number) {
  const parse = (value: string) => [
    Number.parseInt(value.slice(1, 3), 16),
    Number.parseInt(value.slice(3, 5), 16),
    Number.parseInt(value.slice(5, 7), 16),
  ];
  const from = parse(hex);
  const to = parse(target);
  const channel = (index: number) =>
    Math.round(from[index] + (to[index] - from[index]) * amount)
      .toString(16)
      .padStart(2, "0");
  return `#${channel(0)}${channel(1)}${channel(2)}`;
}

export type ArtView = "front" | "back" | "detail";

export function ProductArt({
  hex,
  colorName,
  view,
  className,
}: {
  hex: string;
  colorName: string;
  view: ArtView;
  className?: string;
}) {
  const dark = mix(hex, "#000000", 0.2);
  const darker = mix(hex, "#000000", 0.32);
  const light = mix(hex, "#ffffff", 0.14);
  const cream = "#ece4d3";
  const id = useId().replaceAll(":", "");
  const label =
    view === "front"
      ? "front view"
      : view === "back"
        ? "back view"
        : "fabric detail";

  return (
    <svg
      viewBox={view === "detail" ? "0 0 400 480" : "30 55 340 355"}
      role="img"
      aria-label={`Field Jacket in ${colorName}, ${label}`}
      className={cn("h-full w-full", className)}
    >
      <defs>
        <pattern
          id={`weave-${id}`}
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(32)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="10"
            stroke="#ffffff"
            strokeOpacity="0.07"
            strokeWidth="1.5"
          />
        </pattern>
        <filter id={`soft-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="10"
            stdDeviation="12"
            floodColor="#000000"
            floodOpacity="0.14"
          />
        </filter>
      </defs>

      {view === "detail" ? (
        <g>
          <rect
            x="58"
            y="54"
            width="284"
            height="372"
            rx="18"
            fill={hex}
            filter={`url(#soft-${id})`}
          />
          <rect
            x="58"
            y="54"
            width="284"
            height="372"
            rx="18"
            fill={`url(#weave-${id})`}
          />
          <rect
            x="58.75"
            y="54.75"
            width="282.5"
            height="370.5"
            rx="17.25"
            fill="none"
            stroke={darker}
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
          <rect x="100" y="188" width="200" height="102" rx="9" fill={darker} />
          <rect
            x="108"
            y="196"
            width="184"
            height="86"
            rx="6"
            fill="none"
            stroke={cream}
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeDasharray="6 5"
          />
          <path
            d="M100 216 H300"
            stroke={dark}
            strokeOpacity="0.8"
            strokeWidth="2"
            strokeDasharray="7 4"
          />
          <circle cx="200" cy="236" r="11" fill={cream} />
          <circle
            cx="200"
            cy="236"
            r="7"
            fill="none"
            stroke={darker}
            strokeOpacity="0.45"
            strokeWidth="1.5"
          />
          <circle cx="200" cy="236" r="2" fill={darker} />
          <g stroke={cream} strokeOpacity="0.42" strokeWidth="1.5">
            <path d="M112 296 H288" strokeDasharray="6 5" />
            <path d="M112 306 H232" strokeDasharray="6 5" />
          </g>
          <g fill={darker}>
            <rect x="304" y="80" width="9" height="320" rx="4" />
            <rect x="300" y="80" width="17" height="10" rx="4" fill={cream} />
          </g>
          <g stroke={cream} strokeOpacity="0.55" strokeWidth="1.4">
            {Array.from({ length: 34 }, (_, index) => {
              const y = 94 + index * 9;
              return <path key={y} d={`M306 ${y} h5`} strokeDasharray="2 4" />;
            })}
          </g>
          <text
            x="88"
            y="382"
            fill={cream}
            fillOpacity="0.82"
            fontFamily="inherit"
            fontSize="9"
            letterSpacing="2.4"
          >
            FIELD JACKET
          </text>
          <text
            x="88"
            y="397"
            fill={cream}
            fillOpacity="0.55"
            fontFamily="inherit"
            fontSize="6.5"
            letterSpacing="1.4"
          >
            8.5 OZ ORGANIC COTTON
          </text>
        </g>
      ) : (
        <g>
          <ellipse
            cx="200"
            cy="392"
            rx="128"
            ry="10"
            className="text-foreground"
            fill="currentColor"
            opacity="0.08"
          />
          <g filter={`url(#soft-${id})`}>
            <path
              d="M150 100 L134 108 L94 306 Q92 320 104 323 L134 329 Q145 330 147 317 L158 136 Z"
              fill={hex}
            />
            <path
              d="M250 100 L266 108 L306 306 Q308 320 296 323 L266 329 Q255 330 253 317 L242 136 Z"
              fill={hex}
            />
            <path
              d="M150 102 L136 110 L98 304 Q97 316 106 319 L134 325 Q143 326 145 315 L156 134 Z"
              fill={`url(#weave-${id})`}
            />
            <path
              d="M250 102 L264 110 L302 304 Q303 316 294 319 L266 325 Q257 326 255 315 L244 134 Z"
              fill={`url(#weave-${id})`}
            />
            <path
              d="M158 94 Q200 86 242 94 L258 104 L264 130 L268 352 Q268 362 256 364 L144 364 Q132 362 132 352 L136 130 L142 104 Z"
              fill={hex}
            />
            <path
              d="M158 94 Q200 86 242 94 L258 104 L264 130 L268 352 Q268 362 256 364 L144 364 Q132 362 132 352 L136 130 L142 104 Z"
              fill={`url(#weave-${id})`}
            />
            <path
              d="M132 348 H268 V356 Q268 362 256 364 H144 Q132 362 132 352 Z"
              fill={darker}
              opacity="0.55"
            />
            <path
              d="M151 112 L156 148"
              stroke={dark}
              strokeWidth="1.6"
              strokeOpacity="0.45"
              fill="none"
            />
            <path
              d="M249 112 L244 148"
              stroke={dark}
              strokeWidth="1.6"
              strokeOpacity="0.45"
              fill="none"
            />
            <path
              d="M136 150 C133 210 132 290 133 348"
              stroke={dark}
              strokeWidth="1.2"
              strokeOpacity="0.28"
              fill="none"
            />
            <path
              d="M264 150 C267 210 268 290 267 348"
              stroke={dark}
              strokeWidth="1.2"
              strokeOpacity="0.28"
              fill="none"
            />
            <path
              d="M96 300 L144 307"
              stroke={cream}
              strokeWidth="2"
              strokeOpacity="0.38"
            />
            <path
              d="M304 300 L256 307"
              stroke={cream}
              strokeWidth="2"
              strokeOpacity="0.38"
            />
            <circle cx="116" cy="312" r="2.2" fill={cream} opacity="0.55" />
            <circle cx="284" cy="312" r="2.2" fill={cream} opacity="0.55" />
            <ellipse cx="200" cy="97" rx="35" ry="10" fill={darker} />
            <path
              d="M163 88 Q200 112 237 88 L246 97 Q200 126 154 97 Z"
              fill={dark}
            />
            <path
              d="M166 92 Q200 110 234 92"
              fill="none"
              stroke={cream}
              strokeWidth="1.2"
              strokeOpacity="0.28"
              strokeDasharray="4 4"
            />

            {view === "front" ? (
              <g>
                <rect x="192" y="112" width="16" height="246" fill={dark} />
                <path
                  d="M200 114 V356"
                  stroke={darker}
                  strokeWidth="1.2"
                  strokeOpacity="0.7"
                />
                {[146, 190, 234, 278, 322].map((y) => (
                  <g key={y}>
                    <circle cx="200" cy={y} r="4.6" fill={cream} />
                    <circle
                      cx="200"
                      cy={y}
                      r="2.6"
                      fill={darker}
                      opacity="0.35"
                    />
                  </g>
                ))}

                <g
                  fill="none"
                  stroke={dark}
                  strokeWidth="1.8"
                  strokeOpacity="0.65"
                >
                  <rect x="142" y="168" width="38" height="42" rx="3" />
                  <rect x="220" y="168" width="38" height="42" rx="3" />
                </g>
                <path
                  d="M142 178 H180 M220 178 H258"
                  stroke={darker}
                  strokeWidth="2.2"
                  strokeOpacity="0.55"
                />
                <circle cx="161" cy="183" r="2.6" fill={cream} />
                <circle cx="239" cy="183" r="2.6" fill={cream} />

                <g
                  stroke={dark}
                  strokeWidth="2"
                  strokeOpacity="0.55"
                  strokeLinecap="round"
                >
                  <path d="M136 292 L166 308" />
                  <path d="M264 292 L234 308" />
                  <path d="M135 298 L144 302" strokeOpacity="0.3" />
                  <path d="M265 298 L256 302" strokeOpacity="0.3" />
                </g>

                <g>
                  <rect
                    x="184"
                    y="334"
                    width="32"
                    height="12"
                    rx="2"
                    fill={cream}
                    opacity="0.9"
                  />
                  <text
                    x="200"
                    y="342.5"
                    textAnchor="middle"
                    fill="#41463b"
                    fontFamily="inherit"
                    fontSize="4.6"
                    letterSpacing="0.8"
                  >
                    BRACKEN
                  </text>
                </g>
              </g>
            ) : (
              <g>
                <path
                  d="M136 142 Q200 160 264 142"
                  fill="none"
                  stroke={dark}
                  strokeWidth="2"
                  strokeOpacity="0.6"
                />
                <path
                  d="M200 160 V356"
                  fill="none"
                  stroke={dark}
                  strokeWidth="1.4"
                  strokeOpacity="0.35"
                />
                <path
                  d="M192 88 Q200 78 208 88"
                  fill="none"
                  stroke={darker}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <g>
                  <rect
                    x="184"
                    y="130"
                    width="32"
                    height="12"
                    rx="2.5"
                    fill={cream}
                  />
                  <text
                    x="200"
                    y="138.5"
                    textAnchor="middle"
                    fill="#41463b"
                    fontFamily="inherit"
                    fontSize="4.6"
                    letterSpacing="0.7"
                  >
                    BRACKEN
                  </text>
                </g>
                <path
                  d="M133 352 H267"
                  stroke={darker}
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                />
              </g>
            )}
          </g>
          {view === "front" && (
            <g>
              <path
                d="M200 124 L200 136"
                stroke={light}
                strokeWidth="2"
                strokeOpacity="0.5"
              />
              <path
                d="M186 112 L200 124 L214 112"
                fill="none"
                stroke={darker}
                strokeWidth="1.4"
                strokeOpacity="0.5"
              />
            </g>
          )}
        </g>
      )}
    </svg>
  );
}

export function JacketThumb({
  hex,
  className,
}: {
  hex: string;
  className?: string;
}) {
  const dark = mix(hex, "#000000", 0.26);
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn("size-full", className)}
    >
      <path d="M24 10 H40 L46 16 L46 54 H18 V16 Z" fill={hex} />
      <path d="M24 10 L18 16 L12 48 L20 50 L23 30 Z" fill={hex} />
      <path d="M40 10 L46 16 L52 48 L44 50 L41 30 Z" fill={hex} />
      <path d="M31 10 H33 V54 H31 Z" fill={dark} />
      <path d="M18 52 H46 V54 H18 Z" fill={dark} />
      <ellipse cx="32" cy="9" rx="6" ry="2.4" fill={dark} />
    </svg>
  );
}

export function CapThumb({
  hex,
  className,
}: {
  hex: string;
  className?: string;
}) {
  const dark = mix(hex, "#000000", 0.3);
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn("size-full", className)}
    >
      <path d="M12 40 Q12 16 32 16 Q52 16 52 40 Z" fill={hex} />
      <path d="M8 39 H56 Q58 49 44 49 H20 Q6 49 8 39 Z" fill={dark} />
      <circle cx="32" cy="16" r="3" fill={dark} />
      <path d="M32 17 V40" stroke={dark} strokeWidth="1" opacity="0.5" />
      <path
        d="M19 21 Q26 32 26 40"
        stroke={dark}
        strokeWidth="1"
        fill="none"
        opacity="0.35"
      />
      <path
        d="M45 21 Q38 32 38 40"
        stroke={dark}
        strokeWidth="1"
        fill="none"
        opacity="0.35"
      />
    </svg>
  );
}
