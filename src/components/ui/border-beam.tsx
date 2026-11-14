"use client";

import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

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
  if (!active) return null;

  return (
    <span
      aria-hidden="true"
      {...props}
      data-slot="border-beam"
      className={cn(
        "pointer-events-none absolute -inset-(--border-beam-width,1px) rounded-[inherit] p-(--border-beam-width,1px) @container-size forced-colors:hidden",
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
      <span
        className="absolute top-1/2 left-1/2 -mt-[calc(50cqw+50cqh)] -ml-[calc(50cqw+50cqh)] size-[calc(100cqw+100cqh)] bg-[conic-gradient(transparent_0turn,transparent_0.62turn,color-mix(in_oklab,var(--border-beam-color,var(--color-foreground))_35%,transparent)_0.84turn,var(--border-beam-color,var(--color-foreground))_0.97turn,transparent_1turn)] motion-safe:animate-border-beam motion-reduce:hidden"
        style={{ animationDuration: `${duration}s` }}
      />
    </span>
  );
}
