import Link from "next/link";
import type { ReactNode } from "react";
import { getComponent } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function Part({
  slug,
  name,
  href,
  className,
  children,
}: {
  slug: string;
  name?: string;
  href?: string;
  className?: string;
  children: ReactNode;
}) {
  const label = name ?? getComponent(slug)?.name ?? slug;

  return (
    <div
      data-part={label}
      className={cn(
        "relative min-w-0 rounded-lg outline-1 outline-offset-[3px] outline-transparent outline-dashed transition-[outline-color] duration-200 group-data-inspect/showcase:outline-primary/70",
        className,
      )}
    >
      {children}
      <Link
        href={href ?? `/components/${slug}`}
        aria-label={`${label} component`}
        className="invisible absolute start-2 inset-bs-0 z-20 -translate-y-[calc(100%-5px)] scale-90 whitespace-nowrap rounded-full bg-primary px-2 py-0.5 text-[0.6875rem] font-medium leading-4 text-primary-foreground opacity-0 shadow-sm transition-[opacity,visibility] motion-safe:transition-[opacity,scale,visibility] duration-200 hover:underline active:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring group-data-inspect/showcase:visible group-data-inspect/showcase:scale-100 group-data-inspect/showcase:opacity-100"
      >
        {label}
      </Link>
    </div>
  );
}
