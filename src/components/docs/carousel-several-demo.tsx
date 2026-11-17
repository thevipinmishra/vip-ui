"use client";

import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
  CarouselSlide,
  CarouselViewport,
} from "@/components/ui/carousel";
import { photos } from "./photo-art";

const [ridge, tide, face, dunes, forest, lake] = photos;

const stays = [
  { photo: ridge, name: "Ridge cabin", place: "Sierra Nevada", price: "$180" },
  { photo: tide, name: "Tide house", place: "Big Sur", price: "$240" },
  { photo: face, name: "North hut", place: "Chamonix", price: "$150" },
  { photo: dunes, name: "Dune camp", place: "Wadi Rum", price: "$120" },
  { photo: forest, name: "Pine lodge", place: "Black Forest", price: "$165" },
  { photo: lake, name: "Lake house", place: "Lake Bled", price: "$210" },
];

export function CarouselSeveralDemo() {
  return (
    <Carousel aria-label="Places to stay" className="w-full max-w-xl">
      <CarouselViewport>
        {stays.map((stay) => {
          const { photo } = stay;
          return (
            <CarouselSlide key={stay.name} className="basis-1/2">
              <div
                role="img"
                aria-label={photo.alt}
                className="aspect-[4/3] rounded-xl bg-cover bg-center"
                style={{ backgroundImage: `url("${photo.src}")` }}
              />
              <div className="mt-2.5 flex items-baseline justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{stay.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {stay.place}
                  </p>
                </div>
                <p className="shrink-0 text-sm tabular-nums">
                  {stay.price}
                  <span className="text-xs text-muted-foreground">
                    {" "}
                    / night
                  </span>
                </p>
              </div>
            </CarouselSlide>
          );
        })}
      </CarouselViewport>
      <div className="flex items-center justify-between gap-3">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
