"use client";

import { CarouselSlide } from "@/components/ui/carousel";
import {
  Lightbox,
  LightboxContent,
  LightboxImage,
  LightboxTrigger,
} from "@/components/ui/lightbox";
import { lightboxPhotos } from "./lightbox-art";

export function LightboxDemo() {
  return (
    <Lightbox>
      <div className="grid w-full max-w-md grid-cols-2 gap-3">
        {lightboxPhotos.map((photo, index) => (
          <LightboxTrigger
            key={photo.id}
            index={index}
            aria-label={`Open ${photo.name}`}
            className="aspect-[4/3] bg-cover bg-center"
            style={{ backgroundImage: `url("${photo.src}")` }}
          />
        ))}
      </div>
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
  );
}
