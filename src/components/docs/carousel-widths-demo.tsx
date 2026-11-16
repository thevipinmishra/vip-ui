"use client";

import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselIndicators,
  CarouselNext,
  CarouselPrevious,
  CarouselSlide,
  CarouselViewport,
} from "@/components/ui/carousel";

const drops = [
  {
    name: "Oversized quilted vest",
    width: "w-56",
    badge: "New",
    variant: "accent" as const,
  },
  {
    name: "Waxed canvas weekender",
    width: "w-80",
    badge: "Best seller",
    variant: "success" as const,
  },
  {
    name: "Merino base layer",
    width: "w-64",
    badge: "Low stock",
    variant: "warning" as const,
  },
  {
    name: "Insulated flask",
    width: "w-44",
    badge: "Restocked",
    variant: "outline" as const,
  },
  {
    name: "Foldable camp stool",
    width: "w-72",
    badge: "New",
    variant: "accent" as const,
  },
];

export function CarouselWidthsDemo() {
  return (
    <Carousel aria-label="New arrivals" className="w-full max-w-2xl">
      <CarouselViewport>
        {drops.map((drop) => (
          <CarouselSlide
            key={drop.name}
            className={`basis-auto pb-1 ${drop.width}`}
          >
            <div className="relative grid h-40 place-items-center rounded-xl bg-muted ring-1 ring-border/60">
              <span className="px-4 text-center text-sm font-medium text-muted-foreground">
                {drop.name}
              </span>
              <Badge variant={drop.variant} className="absolute start-4 top-4">
                {drop.badge}
              </Badge>
            </div>
            <p className="mt-2.5 truncate text-sm font-medium">{drop.name}</p>
          </CarouselSlide>
        ))}
      </CarouselViewport>
      <div className="flex items-center justify-between gap-3">
        <CarouselPrevious />
        <CarouselIndicators />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
