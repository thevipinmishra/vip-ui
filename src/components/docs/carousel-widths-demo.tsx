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
import { photos } from "./photo-art";

const [ridge, tide, face, dunes, forest] = photos;

const guides = [
  {
    photo: ridge,
    name: "Ridge walks",
    count: "12 routes",
    width: "w-56",
    badge: "New",
    variant: "accent" as const,
  },
  {
    photo: tide,
    name: "Coastal weekends",
    count: "8 routes",
    width: "w-80",
    badge: "Popular",
    variant: "success" as const,
  },
  {
    photo: face,
    name: "Winter peaks",
    count: "5 routes",
    width: "w-64",
    badge: "Guide needed",
    variant: "warning" as const,
  },
  {
    photo: dunes,
    name: "Desert nights",
    count: "4 routes",
    width: "w-44",
    badge: "Updated",
    variant: "outline" as const,
  },
  {
    photo: forest,
    name: "Forest trails",
    count: "15 routes",
    width: "w-72",
    badge: "New",
    variant: "accent" as const,
  },
];

export function CarouselWidthsDemo() {
  return (
    <Carousel aria-label="Trail guides" className="w-full max-w-2xl">
      <CarouselViewport>
        {guides.map((guide) => (
          <CarouselSlide
            key={guide.name}
            className={`basis-auto pb-1 ${guide.width}`}
          >
            <div
              className="relative h-40 rounded-xl bg-cover bg-center"
              style={{ backgroundImage: `url("${guide.photo.src}")` }}
            >
              <Badge variant={guide.variant} className="absolute start-3 top-3">
                {guide.badge}
              </Badge>
            </div>
            <div className="mt-2.5 flex items-baseline justify-between gap-3">
              <p className="truncate text-sm font-medium">{guide.name}</p>
              <p className="shrink-0 text-xs text-muted-foreground">
                {guide.count}
              </p>
            </div>
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
