"use client";

import {
  Carousel,
  CarouselSlide,
  CarouselThumbnail,
  CarouselThumbnails,
  CarouselViewport,
} from "@/components/ui/carousel";
import { photos } from "./photo-art";

export function CarouselThumbnailsDemo() {
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
          </CarouselSlide>
        ))}
      </CarouselViewport>
      <CarouselThumbnails>
        {photos.map((photo, position) => (
          <CarouselThumbnail
            key={photo.id}
            index={position}
            aria-label={`Show ${photo.name}`}
          >
            <span
              className="aspect-square rounded-md bg-cover bg-center"
              style={{ backgroundImage: `url("${photo.src}")` }}
            />
          </CarouselThumbnail>
        ))}
      </CarouselThumbnails>
    </Carousel>
  );
}
