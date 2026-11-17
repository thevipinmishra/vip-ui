"use client";

import { CarouselSlide } from "@/components/ui/carousel";
import {
  Lightbox,
  LightboxContent,
  LightboxImage,
  LightboxTrigger,
} from "@/components/ui/lightbox";
import { photos } from "./photo-art";

const [photo] = photos;

export function LightboxSingleDemo() {
  return (
    <Lightbox>
      <LightboxTrigger
        index={0}
        aria-label={`Open ${photo.name}`}
        className="aspect-[4/3] w-full max-w-sm bg-cover bg-center"
        style={{ backgroundImage: `url("${photo.src}")` }}
      />
      <LightboxContent>
        <CarouselSlide>
          <LightboxImage
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
          />
        </CarouselSlide>
      </LightboxContent>
    </Lightbox>
  );
}
