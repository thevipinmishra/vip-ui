"use client";

import { CarouselSlide } from "@/components/ui/carousel";
import {
  Lightbox,
  LightboxContent,
  LightboxImage,
  LightboxTrigger,
} from "@/components/ui/lightbox";
import { lightboxPhotos } from "./lightbox-art";

export function LightboxCaptionsDemo() {
  return (
    <Lightbox>
      <div className="grid w-full max-w-md grid-cols-4 gap-2">
        {lightboxPhotos.map((photo, index) => (
          <LightboxTrigger
            key={photo.id}
            index={index}
            aria-label={`Open ${photo.name}`}
            className="aspect-square w-full bg-cover bg-center"
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
              caption={photo.caption}
            />
          </CarouselSlide>
        ))}
      </LightboxContent>
    </Lightbox>
  );
}
