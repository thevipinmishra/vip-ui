"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import {
  type ComponentProps,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export type AuroraTone = "mist" | "sage" | "sunset" | "mono";

const tones: Record<AuroraTone, [string, string, string]> = {
  mist: [
    "color-mix(in oklab, var(--chart-2) 70%, var(--background))",
    "color-mix(in oklab, var(--chart-6) 52%, var(--background))",
    "color-mix(in oklab, var(--chart-4) 36%, var(--background))",
  ],
  sage: [
    "color-mix(in oklab, var(--chart-2) 78%, var(--background))",
    "color-mix(in oklab, var(--chart-2) 32%, var(--background))",
    "color-mix(in oklab, var(--chart-3) 36%, var(--background))",
  ],
  sunset: [
    "color-mix(in oklab, var(--chart-5) 62%, var(--background))",
    "color-mix(in oklab, var(--chart-3) 60%, var(--background))",
    "color-mix(in oklab, var(--chart-4) 42%, var(--background))",
  ],
  mono: [
    "color-mix(in oklab, var(--foreground) 18%, var(--background))",
    "color-mix(in oklab, var(--foreground) 9%, var(--background))",
    "color-mix(in oklab, var(--foreground) 14%, var(--background))",
  ],
};

interface BlobConfig {
  id: string;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  size: string;
  opacity: number;
  animate?: boolean;
  keyframes: {
    x: string[];
    y: string[];
    scale: number[];
    rotate: number[];
  };
  duration: number;
}

const blobs: BlobConfig[] = [
  {
    id: "north",
    left: "-16%",
    top: "-34%",
    size: "76%",
    opacity: 0.9,
    keyframes: {
      x: ["0%", "7%", "-4%", "0%"],
      y: ["0%", "-5%", "6%", "0%"],
      scale: [1, 1.08, 0.96, 1],
      rotate: [0, 8, -5, 0],
    },
    duration: 22,
  },
  {
    id: "east",
    right: "-14%",
    top: "-18%",
    size: "66%",
    opacity: 0.78,
    animate: false,
    keyframes: {
      x: ["0%", "-7%", "5%", "0%"],
      y: ["0%", "6%", "-4%", "0%"],
      scale: [1, 0.94, 1.07, 1],
      rotate: [0, -7, 4, 0],
    },
    duration: 27,
  },
  {
    id: "south",
    bottom: "-38%",
    left: "8%",
    size: "82%",
    opacity: 0.7,
    animate: false,
    keyframes: {
      x: ["0%", "6%", "-7%", "0%"],
      y: ["0%", "-4%", "5%", "0%"],
      scale: [1, 1.05, 0.97, 1],
      rotate: [0, 5, -3, 0],
    },
    duration: 32,
  },
];

const grainTexture =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")";

export type AuroraFade = "edges" | "bottom" | "none";

export interface AuroraProps extends ComponentProps<"div"> {
  colors?: [string, string, string];
  tone?: AuroraTone;
  speed?: number;
  grain?: number;
  intensity?: number;
  fade?: AuroraFade;
  paused?: boolean;
  children?: ReactNode;
}

const fadeMasks: Record<AuroraFade, string | undefined> = {
  edges:
    "radial-gradient(125% 115% at 50% 32%, black 38%, rgba(0,0,0,0.72) 68%, transparent 100%)",
  bottom: "linear-gradient(to bottom, black 12%, black 55%, transparent 100%)",
  none: undefined,
};

export function Aurora({
  colors,
  tone = "mist",
  speed = 1,
  grain = 0.08,
  intensity = 1,
  fade = "edges",
  paused = false,
  className,
  style,
  children,
  ...props
}: AuroraProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useRef<ReturnType<typeof animate>[]>([]);
  const inView = useInView(ref, { margin: "160px" });
  const reduceMotion = useReducedMotion() === true;
  const [documentVisible, setDocumentVisible] = useState(true);
  const palette = colors ?? tones[tone];
  const hasChildren = children != null;
  const active =
    inView && documentVisible && !paused && !reduceMotion && speed > 0;
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const setVisible = () => setDocumentVisible(!document.hidden);
    setVisible();
    document.addEventListener("visibilitychange", setVisible);
    return () => document.removeEventListener("visibilitychange", setVisible);
  }, []);

  useEffect(() => {
    const root = ref.current;
    if (!root || reduceMotion || speed <= 0) return;
    const nodes = [...root.querySelectorAll<HTMLElement>("[data-aurora-blob]")];
    const moving = blobs.filter((blob) => blob.animate !== false);
    controls.current = nodes
      .map((node, index) => {
        const blob = moving[index];
        if (!blob) return undefined;
        const loop = animate(node, blob.keyframes, {
          duration: blob.duration / Math.max(speed, 0.05),
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        });
        loop.pause();
        if (activeRef.current) loop.play();
        return loop;
      })
      .filter((item): item is ReturnType<typeof animate> => item != null);
    return () => {
      for (const control of controls.current) control.stop();
      controls.current = [];
    };
  }, [reduceMotion, speed]);

  useEffect(() => {
    for (const control of controls.current) {
      if (active) control.play();
      else control.pause();
    }
  }, [active]);

  return (
    <div
      {...props}
      ref={ref}
      data-slot="aurora"
      data-tone={colors ? "custom" : tone}
      aria-hidden={hasChildren ? undefined : true}
      className={cn(
        "isolate overflow-hidden",
        hasChildren ? "relative" : "pointer-events-none absolute inset-0",
        className,
      )}
      style={style}
    >
      <div
        data-effect-layer=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 transform-gpu [contain:paint]"
        style={{ opacity: intensity }}
      >
        <div
          className="absolute inset-0"
          style={{
            maskImage: fadeMasks[fade],
            WebkitMaskImage: fadeMasks[fade],
          }}
        >
          {blobs.map((blob, index) => (
            <div
              key={blob.id}
              data-aurora-blob={blob.animate === false ? undefined : ""}
              className="absolute rounded-full will-change-transform"
              style={{
                left: blob.left,
                right: blob.right,
                top: blob.top,
                bottom: blob.bottom,
                width: blob.size,
                aspectRatio: "1",
                opacity: blob.opacity,
                background: `radial-gradient(circle at 50% 50%, ${palette[index]} 0%, ${palette[index]} 16%, transparent 68%)`,
              }}
            />
          ))}
          <div
            className="absolute inset-0"
            style={{ backgroundImage: grainTexture, opacity: grain }}
          />
          <div
            className="absolute inset-0"
            style={{
              opacity: 0.2,
              background: `radial-gradient(55% 65% at 18% 18%, ${palette[0]} 0%, transparent 64%), radial-gradient(50% 60% at 82% 28%, ${palette[1]} 0%, transparent 66%), radial-gradient(60% 70% at 48% 92%, ${palette[2]} 0%, transparent 64%)`,
            }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(118deg, transparent 24%, color-mix(in oklab, var(--foreground) 7%, transparent) 48%, transparent 72%)",
          }}
        />
      </div>
      {children}
    </div>
  );
}
