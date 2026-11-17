"use client";

import {
  Carousel,
  CarouselIndicators,
  CarouselNext,
  CarouselPrevious,
  CarouselSlide,
  CarouselViewport,
} from "@/components/ui/carousel";
import { photos } from "./photo-art";

export function CarouselDemo() {
  return (
    <Carousel aria-label="Trip photos" className="w-full max-w-md">
      <CarouselViewport>
        {photos.map((photo) => (
          <CarouselSlide key={photo.id}>
            <div
              role="img"
              aria-label={photo.alt}
              className="aspect-[4/3] rounded-xl bg-cover bg-center"
              style={{ backgroundImage: `url("${photo.src}")` }}
            />
            <div className="mt-3 grid gap-0.5">
              <p className="truncate text-sm font-medium">{photo.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {photo.caption}
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
