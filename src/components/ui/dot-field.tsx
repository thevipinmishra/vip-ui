"use client";

import { useInView } from "motion/react";
import {
  type ComponentProps,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export type DotFieldVariant = "dots" | "grid";
export type DotFieldFade = "edges" | "bottom" | "none";

export interface DotFieldProps extends ComponentProps<"div"> {
  size?: number;
  gap?: number;
  color?: string;
  interactive?: boolean;
  spotlight?: number;
  intensity?: number;
  variant?: DotFieldVariant;
  fade?: DotFieldFade;
  children?: ReactNode;
}

const fadeMasks: Record<DotFieldFade, string | undefined> = {
  edges:
    "radial-gradient(120% 110% at 50% 42%, black 42%, rgba(0,0,0,0.7) 70%, transparent 100%)",
  bottom: "linear-gradient(to bottom, black 12%, black 58%, transparent 100%)",
  none: undefined,
};

function patternFor(
  variant: DotFieldVariant,
  color: string,
  size: number,
  gap: number,
) {
  if (variant === "grid") {
    return {
      backgroundImage: `linear-gradient(to right, ${color} ${size}px, transparent ${size}px), linear-gradient(to bottom, ${color} ${size}px, transparent ${size}px)`,
      backgroundSize: `${gap}px ${gap}px`,
    };
  }
  return {
    backgroundImage: `radial-gradient(circle, ${color} ${size}px, transparent ${size + 0.4}px)`,
    backgroundSize: `${gap}px ${gap}px`,
  };
}

export function DotField({
  size = 1.5,
  gap = 20,
  color = "var(--muted-foreground)",
  interactive = true,
  spotlight = 220,
  intensity = 1,
  variant = "dots",
  fade = "edges",
  className,
  style,
  children,
  ...props
}: DotFieldProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "140px" });
  const [documentVisible, setDocumentVisible] = useState(true);
  const hasChildren = children != null;

  useEffect(() => {
    const setVisible = () => setDocumentVisible(!document.hidden);
    setVisible();
    document.addEventListener("visibilitychange", setVisible);
    return () => document.removeEventListener("visibilitychange", setVisible);
  }, []);

  useEffect(() => {
    if (!interactive || !inView || !documentVisible) return;
    const node = ref.current;
    const layer = glow.current;
    if (!node || !layer) return;
    let frame = 0;
    let nextX = 0;
    let nextY = 0;

    const paint = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const x = nextX - rect.left;
      const y = nextY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      if (!inside) {
        layer.style.opacity = "0";
        return;
      }
      layer.style.setProperty("--dot-x", `${x}px`);
      layer.style.setProperty("--dot-y", `${y}px`);
      layer.style.opacity = "1";
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      nextX = event.clientX;
      nextY = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const hide = () => {
      layer.style.opacity = "0";
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [interactive, inView, documentVisible]);

  const basePattern = patternFor(
    variant,
    `color-mix(in oklab, ${color} 42%, transparent)`,
    size,
    gap,
  );
  const activePattern = patternFor(
    variant,
    `color-mix(in oklab, ${color} 30%, var(--foreground))`,
    size,
    gap,
  );

  return (
    <div
      {...props}
      ref={ref}
      data-slot="dot-field"
      data-variant={variant}
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
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ opacity: intensity }}
      >
        <div
          className="absolute inset-0"
          style={{
            maskImage: fadeMasks[fade],
            WebkitMaskImage: fadeMasks[fade],
          }}
        >
          <div className="absolute inset-0" style={basePattern} />
          {interactive && (
            <div
              ref={glow}
              data-dot-glow=""
              className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-out-quint motion-reduce:transition-none"
              style={{
                ...activePattern,
                maskImage: `radial-gradient(${spotlight}px circle at var(--dot-x, 50%) var(--dot-y, 50%), black 0%, rgba(0,0,0,0.55) 42%, transparent 72%)`,
                WebkitMaskImage: `radial-gradient(${spotlight}px circle at var(--dot-x, 50%) var(--dot-y, 50%), black 0%, rgba(0,0,0,0.55) 42%, transparent 72%)`,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(${spotlight * 0.9}px circle at var(--dot-x, 50%) var(--dot-y, 50%), color-mix(in oklab, ${color} 16%, transparent), transparent 70%)`,
                }}
              />
            </div>
          )}
        </div>
        <div
          className="absolute inset-0 mix-blend-soft-light"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 0%, color-mix(in oklab, var(--foreground) 5%, transparent), transparent 62%)",
          }}
        />
      </div>
      {children}
    </div>
  );
}
