"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import type { ComponentProps } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const defaultColors = ["var(--chart-2)", "var(--chart-6)"];

const grainTexture =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

export type OrbState = "idle" | "thinking";

export interface OrbProps extends Omit<ComponentProps<"div">, "color"> {
  size?: number;
  state?: OrbState;
  colors?: string[];
  speed?: number;
  label?: string;
  paused?: boolean;
}

export function Orb({
  size = 96,
  state = "idle",
  colors = defaultColors,
  speed = 1,
  label,
  paused = false,
  className,
  style,
  ...props
}: OrbProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useRef<ReturnType<typeof animate>[]>([]);
  const inView = useInView(ref, { margin: "120px" });
  const reduceMotion = useReducedMotion() === true;
  const [documentVisible, setDocumentVisible] = useState(true);
  const thinking = state === "thinking";
  const active = inView && documentVisible && !paused && !reduceMotion;
  const activeRef = useRef(active);
  activeRef.current = active;
  const color = (index: number) =>
    colors[index % Math.max(colors.length, 1)] ?? "transparent";
  const c0 = color(0);
  const c1 = color(1);

  useEffect(() => {
    const setVisible = () => setDocumentVisible(!document.hidden);
    setVisible();
    document.addEventListener("visibilitychange", setVisible);
    return () => document.removeEventListener("visibilitychange", setVisible);
  }, []);

  useEffect(() => {
    const root = ref.current;
    if (!root || reduceMotion) return;
    const spinNodes = [
      ...root.querySelectorAll<HTMLElement>("[data-orb-spin]"),
    ];
    const halo = root.querySelector<HTMLElement>("[data-orb-halo]");
    const next: ReturnType<typeof animate>[] = [];
    spinNodes.forEach((node, index) => {
      const duration =
        (thinking ? 6.5 : 15) /
        Math.max(speed, 0.05) /
        (index === 0 ? 1 : 1.45);
      next.push(
        animate(
          node,
          { rotate: index === 0 ? 360 : -360 },
          { repeat: Number.POSITIVE_INFINITY, ease: "linear", duration },
        ),
      );
    });
    if (halo) {
      next.push(
        animate(
          halo,
          thinking
            ? {
                scale: [1, 1.08, 1],
                opacity: [0.48, 0.72, 0.48],
              }
            : {
                scale: [1, 1.02, 1],
                opacity: [0.38, 0.5, 0.38],
              },
          {
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            duration: (thinking ? 3.2 : 7) / Math.max(speed, 0.2),
          },
        ),
      );
    }
    for (const control of next) control.pause();
    if (activeRef.current) {
      for (const control of next) control.play();
    }
    controls.current = next;
    return () => {
      for (const control of controls.current) control.stop();
      controls.current = [];
    };
  }, [reduceMotion, speed, thinking]);

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
      data-slot="orb"
      data-state={state}
      {...(label
        ? { role: "img", "aria-label": label }
        : { "aria-hidden": true })}
      className={cn(
        "relative inline-grid shrink-0 place-items-center",
        className,
      )}
      style={{ width: size, height: size, ...style }}
    >
      <div
        data-orb-halo=""
        aria-hidden="true"
        className="absolute inset-[-14%] rounded-full will-change-transform"
        style={{
          background: `radial-gradient(circle, color-mix(in oklab, ${c0} 42%, transparent) 0%, transparent 68%)`,
          opacity: thinking ? 0.62 : 0.42,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{
          background: `linear-gradient(155deg, color-mix(in oklab, ${c1} 58%, #000) 0%, ${c1} 42%, color-mix(in oklab, ${c0} 54%, #000) 100%)`,
          boxShadow:
            "inset 0 2px 12px rgba(255,255,255,0.26), inset 0 -18px 30px rgba(0,0,0,0.38), inset 0 0 0 1px rgba(255,255,255,0.12)",
        }}
      >
        <div
          data-orb-spin=""
          className="absolute inset-[-28%] will-change-transform"
          style={{
            background: `conic-gradient(from 20deg, transparent 0%, ${c0} 18%, transparent 34%, ${c1} 56%, transparent 72%, ${c0} 92%, transparent 100%)`,
            filter: "blur(5px)",
            mixBlendMode: "soft-light",
            opacity: 0.9,
          }}
        />
        <div
          data-orb-spin=""
          className="absolute inset-[-32%] will-change-transform"
          style={{
            background: `conic-gradient(from 200deg, transparent 0%, color-mix(in oklab, ${c1} 70%, white) 24%, transparent 42%, color-mix(in oklab, ${c0} 72%, white) 68%, transparent 86%)`,
            filter: "blur(8px)",
            mixBlendMode: "overlay",
            opacity: 0.7,
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 48%, color-mix(in oklab, ${c0} 28%, transparent) 0%, transparent 56%), radial-gradient(circle at 70% 84%, color-mix(in oklab, ${c1} 38%, transparent) 0%, transparent 46%), radial-gradient(circle at 50% 50%, transparent 54%, rgba(0,0,0,0.32) 100%)`,
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 mix-blend-overlay"
          style={{ backgroundImage: grainTexture, opacity: 0.08 }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 31% 19%, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.14) 17%, transparent 30%)",
            mixBlendMode: "screen",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 116%, rgba(255,255,255,0.28) 0%, transparent 34%)",
            mixBlendMode: "soft-light",
          }}
        />
      </div>
    </div>
  );
}
