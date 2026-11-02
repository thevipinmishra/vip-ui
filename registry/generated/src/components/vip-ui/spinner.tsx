import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const spinnerStyles = tv({
  base: "relative inline-grid shrink-0 place-items-center align-middle text-current [&>*]:col-start-1 [&>*]:row-start-1",
  variants: {
    size: {
      xs: "size-3.5 [--spinner-stroke:1.75px]",
      sm: "size-4 [--spinner-stroke:2px]",
      md: "size-6 [--spinner-stroke:2.5px]",
      lg: "size-10 [--spinner-stroke:3.5px]",
      xl: "size-14 [--spinner-stroke:4.5px]",
    },
  },
  defaultVariants: { size: "md" },
});

type SpinnerProps = Omit<ComponentProps<"output">, "children"> & {
  variant?: "ring" | "dots" | "segments";
  size?: NonNullable<VariantProps<typeof spinnerStyles>["size"]>;
  decorative?: boolean;
};

const ticks = [0, 45, 90, 135, 180, 225, 270, 315];

const dots = [
  "[animation-delay:-0.32s]",
  "[animation-delay:-0.16s]",
  "[animation-delay:0s]",
];

export function Spinner({
  variant = "ring",
  size = "md",
  decorative = false,
  className,
  ...props
}: SpinnerProps) {
  return (
    <output
      {...props}
      aria-label={decorative ? undefined : (props["aria-label"] ?? "Loading")}
      aria-hidden={decorative ? true : undefined}
      data-slot="spinner"
      data-variant={variant}
      className={spinnerStyles({ size, className })}
    >
      {variant === "ring" && (
        <>
          <span
            aria-hidden="true"
            className="size-full rounded-full border-[length:var(--spinner-stroke)] border-current opacity-15"
          />
          <span
            aria-hidden="true"
            className="relative size-full animate-spin [animation-duration:0.75s] motion-reduce:animate-none"
          >
            <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_15%,currentColor)] [mask-image:radial-gradient(farthest-side,transparent_calc(100%-var(--spinner-stroke)-0.5px),#000_calc(100%-var(--spinner-stroke)))] forced-colors:hidden" />
            <span className="absolute inset-0 hidden rounded-full border-[length:var(--spinner-stroke)] border-transparent border-t-[CanvasText] forced-colors:block" />
            <span className="absolute start-1/2 top-0 size-[var(--spinner-stroke)] -translate-x-1/2 rtl:translate-x-1/2 rounded-full bg-current forced-colors:bg-[CanvasText]" />
          </span>
        </>
      )}
      {variant === "dots" && (
        <span
          aria-hidden="true"
          className="flex size-full items-center justify-center gap-[12%]"
        >
          {dots.map((delay) => (
            <span
              key={delay}
              className={`flex h-[60%] w-[20%] items-center animate-bounce [animation-duration:0.9s] motion-reduce:animate-none ${delay}`}
            >
              <span
                className={`aspect-square w-full rounded-full bg-current animate-pulse [animation-duration:0.9s] motion-reduce:animate-none forced-colors:bg-[CanvasText] ${delay}`}
              />
            </span>
          ))}
        </span>
      )}
      {variant === "segments" && (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
          className="size-full animate-spin [animation-duration:0.8s] [animation-timing-function:steps(8,end)] motion-reduce:animate-none"
        >
          {ticks.map((angle, index) => (
            <line
              key={angle}
              x1="20"
              y1="4"
              x2="20"
              y2="11"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeOpacity={1 - index * 0.11}
              transform={`rotate(${-angle} 20 20)`}
            />
          ))}
        </svg>
      )}
    </output>
  );
}
