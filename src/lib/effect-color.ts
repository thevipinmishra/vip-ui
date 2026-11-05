"use client";

import { useEffect, useState } from "react";

let colorContext: CanvasRenderingContext2D | null = null;

function canvasContext() {
  if (typeof document === "undefined") return null;
  if (!colorContext) {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    colorContext = canvas.getContext("2d", { willReadFrequently: true });
  }
  return colorContext;
}

function readVariable(name: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

function resolveVariables(value: string) {
  let resolved = value;
  for (let depth = 0; depth < 8 && resolved.includes("var("); depth += 1) {
    resolved = resolved.replace(
      /var\(\s*(--[a-z0-9-]+)\s*(?:,[^)]*)?\)/gi,
      (_, name: string) => readVariable(name) || "",
    );
  }
  return resolved;
}

/**
 * Resolves a CSS color, including theme variables, color-mix(), and oklch(),
 * to an rgba() string that canvas can read.
 */
export function resolveEffectColor(value: string): string {
  if (typeof window === "undefined" || !value) return value;
  const resolved = resolveVariables(value);
  const context = canvasContext();
  if (!context) return resolved;
  context.clearRect(0, 0, 1, 1);
  context.fillStyle = "#000";
  context.fillStyle = resolved;
  context.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;
  return `rgba(${r}, ${g}, ${b}, ${a / 255})`;
}

/** Splits a resolved rgba() string into channel values. */
export function colorChannels(value: string): [number, number, number, number] {
  const match = value.match(
    /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?\s*\)/i,
  );
  if (!match) return [0, 0, 0, 1];
  const alpha = match[4] === undefined ? 1 : Number(match[4]);
  return [
    Number(match[1]),
    Number(match[2]),
    Number(match[3]),
    alpha > 1 ? alpha / 255 : alpha,
  ];
}

function useThemeVersion() {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    const bump = () => setVersion((current) => current + 1);
    const observer = new MutationObserver(bump);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    });
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", bump);
    return () => {
      observer.disconnect();
      scheme.removeEventListener("change", bump);
    };
  }, []);

  return version;
}

/** Resolves theme colors and updates them when the theme changes. */
export function useEffectColors(colors: readonly string[]): string[] {
  const version = useThemeVersion();
  const key = colors.join("\u0000");
  const [resolved, setResolved] = useState<string[]>(() =>
    colors.map((value) =>
      typeof document === "undefined" ? value : resolveEffectColor(value),
    ),
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: a theme change must re-resolve the same colors.
  useEffect(() => {
    const next = key.split("\u0000").map(resolveEffectColor);
    setResolved((current) =>
      current.length === next.length &&
      current.every((value, index) => value === next[index])
        ? current
        : next,
    );
  }, [key, version]);

  return resolved;
}
