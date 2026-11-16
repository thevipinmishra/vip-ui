import { cn } from "@/lib/utils";

const variants = [
  { sky: "#c6e7e8", back: "#2f8f9d", front: "#1f6f7c", light: "#f4fbf8" },
  { sky: "#f6d9a6", back: "#d0714b", front: "#6f4a38", light: "#fff3d8" },
  { sky: "#e7eff7", back: "#a8bccd", front: "#7e93a8", light: "#f7fbff" },
  { sky: "#f4e2bd", back: "#d9a86c", front: "#8a5f36", light: "#fff8e8" },
];

export function FileArt({ id, className }: { id: string; className?: string }) {
  const seed = [...id].reduce((total, char) => total + char.charCodeAt(0), 0);
  const variant = variants[seed % variants.length];

  return (
    <svg
      data-lightbox-source=""
      aria-hidden="true"
      viewBox="0 0 400 300"
      className={cn("size-full", className)}
    >
      <rect width="400" height="300" fill={variant.sky} />
      {seed % 2 === 0 ? (
        <>
          <circle cx="300" cy="82" r="34" fill={variant.light} />
          <path
            d="M0 212 90 130 170 200 250 138 330 210 400 166V300H0Z"
            fill={variant.back}
          />
          <path
            d="M0 252 120 200 220 250 320 205 400 246V300H0Z"
            fill={variant.front}
          />
        </>
      ) : (
        <>
          <circle cx="108" cy="88" r="26" fill={variant.light} />
          <path d="M0 170Q100 150 200 170T400 170V300H0Z" fill={variant.back} />
          <path
            d="M0 216Q120 196 240 216T400 210V300H0Z"
            fill={variant.front}
          />
        </>
      )}
    </svg>
  );
}
