"use client";

import { useInView, useReducedMotion } from "motion/react";
import {
  type ComponentProps,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { colorChannels, useEffectColors } from "@/lib/effect-color";
import { cn } from "@/lib/utils";

export type DitherShape = "halo" | "wave" | "ripple" | "swirl";
export type DitherFade = "edges" | "bottom" | "none";

export interface DitherProps extends ComponentProps<"div"> {
  color?: string;
  background?: string;
  shape?: DitherShape;
  size?: number;
  scale?: number;
  speed?: number;
  intensity?: number;
  interactive?: boolean;
  fade?: DitherFade;
  paused?: boolean;
  children?: ReactNode;
}

const fadeMasks: Record<DitherFade, string | undefined> = {
  edges:
    "radial-gradient(125% 115% at 50% 42%, black 42%, rgba(0,0,0,0.7) 72%, transparent 100%)",
  bottom: "linear-gradient(to bottom, black 12%, black 58%, transparent 100%)",
  none: undefined,
};

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(
  (value) => (value + 0.5) / 16,
);

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);
const smoothstep = (edge0: number, edge1: number, value: number) => {
  const t = clamp((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

function field(
  shape: DitherShape,
  x: number,
  y: number,
  time: number,
  aspect: number,
  scale: number,
  center: { x: number; y: number },
) {
  const cx = 0.5 + (center.x - 0.5) * 0.55;
  const cy = 0.5 + (center.y - 0.5) * 0.55;
  const dx = (x - cx) * aspect;
  const dy = y - cy;
  const radius = Math.hypot(dx, dy) / Math.max(scale, 0.2);

  if (shape === "wave") {
    const waveX = x + (center.x - 0.5) * 0.35;
    const frequency = Math.max(scale, 0.2);
    const band =
      0.5 +
      (center.y - 0.5) * 0.42 +
      0.15 * Math.sin(waveX * 6.2 * frequency + time * 0.55) +
      0.05 * Math.sin(waveX * 14.3 * frequency - time * 0.35);
    const core = Math.exp(-((y - band) ** 2) / 0.014);
    const echo = Math.exp(-((y - band - 0.2) ** 2) / 0.0025) * 0.5;
    return clamp(Math.max(core, echo));
  }

  if (shape === "ripple") {
    const rings = 0.5 + 0.5 * Math.sin(radius * 28 - time * 1.6);
    return clamp(rings * smoothstep(0.72, 0.16, radius) * 1.4);
  }

  if (shape === "swirl") {
    const angle = Math.atan2(dy, dx);
    const spiral = 0.5 + 0.5 * Math.sin(angle * 3 + radius * 19 - time * 1.2);
    return clamp(spiral * smoothstep(0.74, 0.18, radius) * 1.5);
  }

  const texture = 0.82 + 0.18 * Math.sin(Math.atan2(dy, dx) * 9 + time * 0.8);
  return clamp(smoothstep(0.5, 0.1, radius) * texture);
}

export function Dither({
  color = "var(--foreground)",
  background = "transparent",
  shape = "wave",
  size = 3,
  scale = 1,
  speed = 1,
  intensity = 0.6,
  interactive = true,
  fade = "edges",
  paused = false,
  className,
  style,
  children,
  ...props
}: DitherProps) {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0.5, y: 0.5 });
  const phase = useRef(0);
  const [documentVisible, setDocumentVisible] = useState(true);
  const inView = useInView(ref, { margin: "160px" });
  const reduceMotion = useReducedMotion() === true;
  const [frontColor, backgroundColor] = useEffectColors([color, background]);
  const hasChildren = children != null;
  const active =
    inView && documentVisible && !paused && !reduceMotion && speed > 0;

  const draw = useCallback(
    (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d", { alpha: true });
      if (!context) return;
      const width = canvas.width;
      const height = canvas.height;
      if (!width || !height) return;
      const pixels = context.createImageData(width, height);
      const data = pixels.data;
      const [fr, fg, fb, fa] = colorChannels(frontColor);
      const [br, bg, bb, ba] = colorChannels(backgroundColor);
      const aspect = width / height;
      let index = 0;
      for (let y = 0; y < height; y += 1) {
        const ny = y / height;
        for (let x = 0; x < width; x += 1) {
          const value = field(
            shape,
            x / width,
            ny,
            time,
            aspect,
            scale,
            pointer.current,
          );
          const threshold = BAYER[(x & 3) + ((y & 3) << 2)];
          if (value > threshold) {
            data[index] = fr;
            data[index + 1] = fg;
            data[index + 2] = fb;
            data[index + 3] = fa * 255;
          } else {
            data[index] = br;
            data[index + 1] = bg;
            data[index + 2] = bb;
            data[index + 3] = ba * 255;
          }
          index += 4;
        }
      }
      context.putImageData(pixels, 0, 0);
    },
    [backgroundColor, frontColor, scale, shape],
  );

  useEffect(() => {
    const setVisible = () => setDocumentVisible(!document.hidden);
    setVisible();
    document.addEventListener("visibilitychange", setVisible);
    return () => document.removeEventListener("visibilitychange", setVisible);
  }, []);

  useEffect(() => {
    const root = ref.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const resize = () => {
      const rect = root.getBoundingClientRect();
      const width = Math.max(1, Math.ceil(rect.width / Math.max(size, 1)));
      const height = Math.max(1, Math.ceil(rect.height / Math.max(size, 1)));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      draw(phase.current);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(root);
    return () => observer.disconnect();
  }, [draw, size]);

  useEffect(() => {
    if (!active) {
      draw(phase.current);
      return;
    }
    let frame = 0;
    let last = performance.now();
    let lastDraw = 0;
    const tick = (now: number) => {
      phase.current += (Math.min(now - last, 100) / 1000) * speed;
      last = now;
      if (now - lastDraw >= 1000 / 30) {
        draw(phase.current);
        lastDraw = now;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, draw, speed]);

  useEffect(() => {
    if (!interactive) return;
    const root = ref.current;
    if (!root) return;
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = root.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        pointer.current = { x: 0.5, y: 0.5 };
        return;
      }
      pointer.current = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      };
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [interactive]);

  return (
    <div
      {...props}
      ref={ref}
      data-slot="dither"
      data-shape={shape}
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
          <canvas
            ref={canvasRef}
            className="absolute inset-0 size-full"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
      </div>
      {children}
    </div>
  );
}
