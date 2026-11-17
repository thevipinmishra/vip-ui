"use client";

import { CarouselSlide } from "@/components/ui/carousel";
import {
  Lightbox,
  LightboxContent,
  LightboxImage,
  LightboxTrigger,
} from "@/components/ui/lightbox";
import { photos } from "./photo-art";

export function LightboxCaptionsDemo() {
  return (
    <Lightbox>
      <div className="grid w-full max-w-md grid-cols-6 gap-2">
        {photos.map((photo, index) => (
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
        {photos.map((photo) => (
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
