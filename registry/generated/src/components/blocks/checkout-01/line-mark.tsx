import { cn } from "../../vip-ui/utils";

function mix(hex: string, target: string, amount: number) {
  const parse = (value: string) => [
    Number.parseInt(value.slice(1, 3), 16),
    Number.parseInt(value.slice(3, 5), 16),
    Number.parseInt(value.slice(5, 7), 16),
  ];
  const from = parse(hex);
  const to = parse(target);
  const channel = (index: number) =>
    Math.round(from[index] + (to[index] - from[index]) * amount)
      .toString(16)
      .padStart(2, "0");
  return `#${channel(0)}${channel(1)}${channel(2)}`;
}

export function JacketMark({
  hex,
  className,
}: {
  hex: string;
  className?: string;
}) {
  const dark = mix(hex, "#000000", 0.28);
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn("size-full", className)}
    >
      <path d="M24 10 H40 L46 16 L46 54 H18 V16 Z" fill={hex} />
      <path d="M24 10 L18 16 L12 48 L20 50 L23 30 Z" fill={hex} />
      <path d="M40 10 L46 16 L52 48 L44 50 L41 30 Z" fill={hex} />
      <path d="M31 10 H33 V54 H31 Z" fill={dark} />
      <path d="M18 52 H46 V54 H18 Z" fill={dark} />
      <ellipse cx="32" cy="9" rx="6" ry="2.4" fill={dark} />
    </svg>
  );
}

export function CapMark({
  hex,
  className,
}: {
  hex: string;
  className?: string;
}) {
  const dark = mix(hex, "#000000", 0.3);
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn("size-full", className)}
    >
      <path d="M12 40 Q12 16 32 16 Q52 16 52 40 Z" fill={hex} />
      <path d="M8 39 H56 Q58 49 44 49 H20 Q6 49 8 39 Z" fill={dark} />
      <circle cx="32" cy="16" r="3" fill={dark} />
      <path d="M32 17 V40" stroke={dark} strokeWidth="1" opacity="0.5" />
      <path
        d="M19 21 Q26 32 26 40"
        stroke={dark}
        strokeWidth="1"
        fill="none"
        opacity="0.35"
      />
      <path
        d="M45 21 Q38 32 38 40"
        stroke={dark}
        strokeWidth="1"
        fill="none"
        opacity="0.35"
      />
    </svg>
  );
}
