"use client";

import { useInView } from "motion/react";
import { type ComponentProps, useEffect, useRef, useState } from "react";
import { cn } from "./utils";

export type HighlighterVariant = "highlight" | "underline" | "circle";

export interface HighlighterProps extends ComponentProps<"span"> {
  variant?: HighlighterVariant;
  trigger?: "mount" | "in-view";
  delay?: number;
}

const color = "var(--highlighter-color,var(--chart-3))";

interface Box {
  width: number;
  height: number;
  stroke: number;
}

function underlinePath({ width, height, stroke }: Box) {
  return `M ${stroke} ${height * 0.7} C ${width * 0.3} ${height * 0.3}, ${width * 0.65} ${height * 0.75}, ${width - stroke} ${height * 0.4}`;
}

function circlePath({ width, height, stroke }: Box) {
  const cx = width / 2;
  const cy = height / 2;
  const rx = cx - stroke;
  const ry = cy - stroke;
  const points = 64;
  const sweep = Math.PI * 2 * 1.08;
  const start = -Math.PI * 0.62;
  const commands: string[] = [];
  for (let index = 0; index <= points; index++) {
    const progress = index / points;
    const angle = start + sweep * progress;
    const x = cx + Math.cos(angle) * rx * (1 - 0.07 * progress);
    const y = cy + Math.sin(angle) * ry * (1 - 0.03 * progress);
    commands.push(`${index ? "L" : "M"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return commands.join(" ");
}

export function Highlighter({
  variant = "highlight",
  trigger = "in-view",
  delay = 0,
  className,
  style,
  ref,
  children,
  ...props
}: HighlighterProps) {
  const root = useRef<HTMLSpanElement | null>(null);
  const canvas = useRef<SVGSVGElement>(null);
  const inView = useInView(root, { once: true, amount: "all" });
  const [mounted, setMounted] = useState(false);
  const [box, setBox] = useState<Box>();
  const visible = mounted && (trigger === "mount" || inView);
  const drawn = visible ? "" : undefined;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const node = canvas.current;
    if (!node) return;
    const observer = new ResizeObserver(() => {
      const rect = node.getBoundingClientRect();
      const fontSize = parseFloat(getComputedStyle(node).fontSize);
      setBox({
        width: rect.width,
        height: rect.height,
        stroke: Math.max(1.5, fontSize * 0.08),
      });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const shared = {
    ...props,
    ref: (node: HTMLSpanElement | null) => {
      root.current = node;
      if (typeof ref === "function") return ref(node);
      if (ref) ref.current = node;
    },
    "data-slot": "highlighter",
    "data-variant": variant,
    "data-drawn": drawn,
  };

  if (variant === "highlight") {
    const fill = `color-mix(in oklab, ${color} 32%, transparent)`;
    return (
      <span
        {...shared}
        className={cn(
          "mx-[-0.12em] rounded-[0.2em] bg-no-repeat px-[0.12em] bg-position-[left_center] bg-size-[0%_100%] transition-[background-size] duration-600 ease-out-quint data-drawn:bg-size-[100%_100%] motion-reduce:transition-none rtl:bg-position-[right_center] forced-colors:bg-[Mark] forced-colors:bg-none! forced-colors:text-[MarkText] forced-colors:forced-color-adjust-none",
          className,
        )}
        style={{
          backgroundImage: `linear-gradient(${fill}, ${fill})`,
          transitionDelay: `${delay}s`,
          ...style,
        }}
      >
        {children}
      </span>
    );
  }

  const path = box?.width
    ? variant === "underline"
      ? underlinePath(box)
      : circlePath(box)
    : undefined;

  return (
    <span
      {...shared}
      className={cn(
        "group/highlighter relative inline-block leading-none",
        className,
      )}
      style={style}
    >
      {children}
      <svg
        ref={canvas}
        aria-hidden="true"
        fill="none"
        viewBox={box?.width ? `0 0 ${box.width} ${box.height}` : undefined}
        className={cn(
          "pointer-events-none absolute overflow-visible",
          variant === "underline"
            ? "top-[calc(100%-0.05em)] left-0 h-[0.3em] w-full"
            : "top-[-0.3em] left-[-0.3em] h-[calc(100%+0.6em)] w-[calc(100%+0.6em)]",
        )}
      >
        {path && (
          <path
            d={path}
            pathLength={1}
            strokeWidth={box?.stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-(--highlighter-color,var(--chart-3)) [stroke-dasharray:1_2] [stroke-dashoffset:1.01] transition-[stroke-dashoffset] duration-600 ease-out-quint group-data-drawn/highlighter:[stroke-dashoffset:0] motion-reduce:transition-none forced-colors:stroke-[CanvasText]"
            style={{ transitionDelay: `${delay}s` }}
          />
        )}
      </svg>
    </span>
  );
}
