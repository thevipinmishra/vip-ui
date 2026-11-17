"use client";

import { MotionConfig } from "motion/react";
import {
  type CSSProperties,
  createContext,
  type ReactNode,
  use,
  useMemo,
  useState,
} from "react";

export const showcaseAccents = [
  { color: "#3b4a42", label: "Sage" },
  { color: "#0f766e", label: "Teal" },
  { color: "#4f46e5", label: "Indigo" },
  { color: "#e11d48", label: "Rose" },
  { color: "#b45309", label: "Amber" },
];

type ShowcaseAppearance = {
  accent: string;
  setAccent: (accent: string) => void;
  radius: number;
  setRadius: (radius: number) => void;
  reduceMotion: boolean;
  setReduceMotion: (reduceMotion: boolean) => void;
};

const ShowcaseAppearanceContext = createContext<ShowcaseAppearance | null>(
  null,
);

export function useShowcaseAppearance() {
  const value = use(ShowcaseAppearanceContext);
  if (!value) throw new Error("Use inside ShowcaseAppearanceProvider.");
  return value;
}

export function ShowcaseAppearanceProvider({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const [accent, setAccent] = useState(showcaseAccents[0].color);
  const [radius, setRadius] = useState(1);
  const [reduceMotion, setReduceMotion] = useState(false);
  const value = useMemo(
    () => ({
      accent,
      setAccent,
      radius,
      setRadius,
      reduceMotion,
      setReduceMotion,
    }),
    [accent, radius, reduceMotion],
  );
  const tinted = accent !== showcaseAccents[0].color;

  return (
    <ShowcaseAppearanceContext value={value}>
      <MotionConfig reducedMotion={reduceMotion ? "always" : "user"}>
        <div
          data-reduce-motion={reduceMotion || undefined}
          className={className}
          style={
            {
              ...(radius !== 1 && {
                "--radius": `${0.625 * radius}rem`,
              }),
              ...(tinted && {
                "--primary": accent,
                "--primary-foreground": "#fff",
              }),
            } as CSSProperties
          }
        >
          {children}
        </div>
      </MotionConfig>
    </ShowcaseAppearanceContext>
  );
}
