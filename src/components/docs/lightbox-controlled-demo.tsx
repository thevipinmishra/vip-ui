"use client";

import { useState } from "react";
import {
  Carousel,
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
import { lightboxPhotos } from "./lightbox-art";

export function LightboxControlledDemo() {
  const [index, setIndex] = useState(0);

  return (
    <div className="grid w-full max-w-md gap-2">
      <Lightbox index={index} onIndexChange={setIndex}>
        <Carousel aria-label="Gallery" index={index} className="gap-2">
          <CarouselViewport style={{ overflow: "hidden" }}>
            {lightboxPhotos.map((photo, position) => (
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
          <div className="flex items-center justify-end">
            <CarouselStatus />
          </div>
        </Carousel>
        <LightboxContent>
          {lightboxPhotos.map((photo) => (
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
    </div>
  );
}
