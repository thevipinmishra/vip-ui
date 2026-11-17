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

const [ridge, tide, face, , , lake] = photos;

const stories = [
  {
    photo: ridge,
    title: "Sunrise on the ridge",
    body: "A two-hour climb for the first light of the day.",
  },
  {
    photo: tide,
    title: "Low tide at the point",
    body: "Walk out to the pools an hour before the turn.",
  },
  {
    photo: face,
    title: "After the storm",
    body: "Fresh snow on the north face by morning.",
  },
  {
    photo: lake,
    title: "Dusk on the lake",
    body: "The water goes still for ten minutes after sunset.",
  },
];

export function CarouselVerticalDemo() {
  return (
    <Carousel
      aria-label="Trip highlights"
      opts={{ axis: "y" }}
      className="w-full max-w-md grid-cols-[minmax(0,1fr)_auto] items-center"
    >
      <CarouselViewport className="h-64">
        {stories.map((story) => (
          <CarouselSlide key={story.title} className="h-full">
            <div
              className="relative grid h-full content-end gap-1 overflow-hidden rounded-xl bg-cover bg-center p-5 text-white"
              style={{ backgroundImage: `url("${story.photo.src}")` }}
            >
              <span className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              <p className="relative text-base font-medium">{story.title}</p>
              <p className="relative max-w-[34ch] text-xs leading-5 text-white/80">
                {story.body}
              </p>
            </div>
          </CarouselSlide>
        ))}
      </CarouselViewport>
      <div className="flex flex-col items-center gap-3">
        <CarouselPrevious />
        <CarouselIndicators />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
