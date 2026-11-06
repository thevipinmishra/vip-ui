import { ProgressiveBlur } from "@/components/ui/progressive-blur";

export function ProgressiveBlurCaptionDemo() {
  return (
    <figure className="relative aspect-[4/3] w-full max-w-sm overflow-clip rounded-xl bg-[repeating-conic-gradient(from_45deg,var(--chart-2)_0_25%,var(--chart-3)_0_50%)] bg-[length:2.5rem_2.5rem] shadow-[var(--shadow-card)]">
      <div className="absolute inset-[18%] rounded-full bg-[repeating-radial-gradient(circle,var(--chart-4)_0_0.75rem,var(--chart-5)_0.75rem_1.5rem)]" />
      <ProgressiveBlur
        blur={24}
        className="h-1/2 bg-linear-to-t from-black/40 to-transparent"
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-4 text-white">
        <p className="text-sm font-medium">Tiles, No. 4</p>
        <p className="text-xs opacity-80">Print on cotton paper, 2026</p>
      </figcaption>
    </figure>
  );
}
