"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ComponentProps, useEffect, useState } from "react";
import { cn } from "./utils";

export interface BorderBeamProps
  extends Omit<ComponentProps<"span">, "children"> {
  duration?: number;
  active?: boolean;
}

const ring = "linear-gradient(#000 0 0), linear-gradient(#000 0 0)";

export function BorderBeam({
  duration = 6,
  active = true,
  className,
  style,
  ...props
}: BorderBeamProps) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || !active || reduceMotion) return null;

  return (
    <span
      aria-hidden="true"
      {...props}
      data-slot="border-beam"
      className={cn(
        "pointer-events-none absolute inset-[calc(var(--border-beam-width,1px)*-1)] rounded-[inherit] p-[var(--border-beam-width,1px)] [container-type:size] forced-colors:hidden",
        className,
      )}
      style={{
        maskImage: ring,
        WebkitMaskImage: ring,
        maskClip: "content-box, border-box",
        WebkitMaskClip: "content-box, border-box",
        maskComposite: "exclude",
        WebkitMaskComposite: "xor",
        ...style,
      }}
    >
      <motion.span
        className="absolute top-1/2 left-1/2 -mt-[calc(50cqw+50cqh)] -ml-[calc(50cqw+50cqh)] size-[calc(100cqw+100cqh)] bg-[conic-gradient(transparent_0turn,transparent_0.62turn,color-mix(in_oklab,var(--border-beam-color,var(--color-foreground))_35%,transparent)_0.84turn,var(--border-beam-color,var(--color-foreground))_0.97turn,transparent_1turn)]"
        initial={{ transform: "rotate(0deg)" }}
        animate={{ transform: ["rotate(0deg)", "rotate(360deg)"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      />
    </span>
  );
}
