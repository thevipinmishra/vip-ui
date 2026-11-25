"use client";

import { useState } from "react";
import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
  CarouselSlide,
  CarouselStatus,
  CarouselViewport,
} from "@/components/ui/carousel";
import {
  Lightbox,
  LightboxContent,
  LightboxImage,
  LightboxTrigger,
} from "@/components/ui/lightbox";
import { photos } from "./photo-art";

export function LightboxControlledDemo() {
  const [index, setIndex] = useState(0);

  return (
    <Lightbox index={index} onIndexChange={setIndex}>
      <Carousel
        aria-label="Gallery"
        index={index}
        onIndexChange={setIndex}
        className="w-full max-w-md"
      >
        <CarouselViewport>
          {photos.map((photo, position) => (
            <CarouselSlide key={photo.id}>
              <LightboxTrigger
                index={position}
                aria-label={`Open ${photo.name}`}
                className="aspect-[4/3] w-full bg-cover bg-center"
                style={{ backgroundImage: `url("${photo.src}")` }}
              />
            </CarouselSlide>
          ))}
        </CarouselViewport>
        <div className="flex items-center justify-between gap-3">
          <CarouselPrevious />
          <CarouselStatus />
          <CarouselNext />
        </div>
      </Carousel>
      <LightboxContent>
        {photos.map((photo) => (
          <CarouselSlide key={photo.id}>
            <LightboxImage
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
            />
          </CarouselSlide>
        ))}
      </LightboxContent>
    </Lightbox>
  );
}
