"use client";

import {
  ColorThumb as AriaColorThumb,
  type ColorThumbProps,
  composeRenderProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";

export function ColorThumb({ className, ...props }: ColorThumbProps) {
  return (
    <AriaColorThumb
      {...props}
      className={composeRenderProps(className, (className) =>
        cn(
          "size-6 cursor-grab rounded-full border-2 border-white shadow-[var(--shadow-card)] ring-1 ring-black/50 outline-none outline-offset-4 outline-transparent transition-[outline-color,outline-offset] duration-150 ease-out-quint dragging:cursor-grabbing disabled:cursor-default focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2",
          className,
        ),
      )}
    >
      {({ isDragging }) => (
        <span
          aria-hidden="true"
          data-dragging={isDragging || undefined}
          className="pointer-events-none absolute -inset-1 rounded-full ring-2 ring-primary/60 opacity-0 scale-85 transition-[opacity,scale] duration-150 ease-out-quint motion-reduce:duration-0 data-dragging:opacity-100 data-dragging:scale-100"
        />
      )}
    </AriaColorThumb>
  );
}
