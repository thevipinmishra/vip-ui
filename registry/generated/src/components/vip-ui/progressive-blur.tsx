import type { ComponentProps } from "react";
import { cn } from "./utils";

export type ProgressiveBlurSide = "top" | "bottom" | "left" | "right";

export interface ProgressiveBlurProps
  extends Omit<ComponentProps<"div">, "children"> {
  side?: ProgressiveBlurSide;
  blur?: number;
}

const layers = 5;
const steps = Array.from({ length: layers }, (_, step) => step);

const placement: Record<ProgressiveBlurSide, string> = {
  top: "inset-x-0 top-0 h-16",
  bottom: "inset-x-0 bottom-0 h-16",
  left: "inset-y-0 left-0 w-16",
  right: "inset-y-0 right-0 w-16",
};

function layerMask(side: ProgressiveBlurSide, index: number) {
  const stop = (step: number) => `${Math.min(100, (step / layers) * 100)}%`;
  const end =
    index + 3 > layers ? "black 100%" : `transparent ${stop(index + 3)}`;
  return `linear-gradient(to ${side}, transparent ${stop(index)}, black ${stop(index + 1)}, black ${stop(index + 2)}, ${end})`;
}

export function ProgressiveBlur({
  side = "bottom",
  blur = 12,
  className,
  ...props
}: ProgressiveBlurProps) {
  return (
    <div
      aria-hidden="true"
      {...props}
      data-slot="progressive-blur"
      data-side={side}
      className={cn(
        "pointer-events-none absolute select-none",
        placement[side],
        className,
      )}
    >
      {steps.map((step) => {
        const filter = `blur(${blur / 2 ** (layers - 1 - step)}px)`;
        const mask = layerMask(side, step);
        return (
          <div
            key={step}
            className="absolute inset-0"
            style={{
              backdropFilter: filter,
              WebkitBackdropFilter: filter,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
    </div>
  );
}
