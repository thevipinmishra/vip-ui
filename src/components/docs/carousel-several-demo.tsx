"use client";

import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
  CarouselSlide,
  CarouselViewport,
} from "@/components/ui/carousel";

const essentials = [
  { name: "Wool socks", price: "$18" },
  { name: "Field cap", price: "$32" },
  { name: "Leather belt", price: "$64" },
  { name: "Lined gloves", price: "$44" },
  { name: "Merino scarf", price: "$58" },
  { name: "Rain cover", price: "$28" },
];

export function CarouselSeveralDemo() {
  return (
    <Carousel aria-label="Pack essentials" className="w-full max-w-xl">
      <CarouselViewport>
        {essentials.map((item) => (
          <CarouselSlide key={item.name} className="basis-1/2">
            <div className="grid aspect-square place-items-center rounded-xl bg-muted ring-1 ring-border/60">
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {item.name.split(" ")[0]}
              </span>
            </div>
            <div className="mt-2.5 flex items-baseline gap-2">
              <p className="truncate text-sm font-medium">{item.name}</p>
              <p className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {item.price}
              </p>
            </div>
          </CarouselSlide>
        ))}
      </CarouselViewport>
      <div className="flex items-center justify-between gap-3">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
