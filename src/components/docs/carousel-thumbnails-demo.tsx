"use client";

import {
  Carousel,
  CarouselSlide,
  CarouselThumbnail,
  CarouselThumbnails,
  CarouselViewport,
} from "@/components/ui/carousel";

const views = [
  { id: "front", label: "Front" },
  { id: "back", label: "Back" },
  { id: "fabric", label: "Fabric" },
  { id: "pocket", label: "Pocket" },
];

export function CarouselThumbnailsDemo() {
  return (
    <Carousel aria-label="Jacket photos" className="w-full max-w-md">
      <CarouselViewport>
        {views.map((view) => (
          <CarouselSlide key={view.id}>
            <div className="grid aspect-[4/5] place-items-center rounded-xl bg-muted ring-1 ring-border/60">
              <span className="text-sm font-medium text-muted-foreground">
                {view.label} view
              </span>
            </div>
          </CarouselSlide>
        ))}
      </CarouselViewport>
      <CarouselThumbnails>
        {views.map((view, position) => (
          <CarouselThumbnail
            key={view.id}
            index={position}
            aria-label={`Show ${view.label.toLowerCase()} view`}
          >
            <span className="grid aspect-square place-items-center rounded-md bg-card/60">
              <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {view.label}
              </span>
            </span>
          </CarouselThumbnail>
        ))}
      </CarouselThumbnails>
    </Carousel>
  );
}
