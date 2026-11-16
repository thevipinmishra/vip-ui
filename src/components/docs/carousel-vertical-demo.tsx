"use client";

import {
  Carousel,
  CarouselIndicators,
  CarouselNext,
  CarouselPrevious,
  CarouselSlide,
  CarouselViewport,
} from "@/components/ui/carousel";

const notes = [
  {
    title: "Built for wet mornings",
    body: "The shell sheds rain without a coating.",
    tone: "bg-muted",
  },
  {
    title: "Repairs, not landfill",
    body: "We fix zips, snaps, and seams for two years.",
    tone: "bg-secondary",
  },
  {
    title: "Made in small runs",
    body: "Four hundred jackets, then the pattern rests.",
    tone: "bg-accent",
  },
  {
    title: "Ready for the trail",
    body: "Six pockets, a storm hood, and a pack strap.",
    tone: "bg-card",
  },
];

export function CarouselVerticalDemo() {
  return (
    <Carousel
      aria-label="Field notes"
      opts={{ axis: "y" }}
      className="w-full max-w-sm"
    >
      <CarouselViewport className="h-64">
        {notes.map((note) => (
          <CarouselSlide key={note.title} className="h-full">
            <div
              className={`grid h-full content-end gap-1.5 rounded-xl p-5 ring-1 ring-border/60 ${note.tone}`}
            >
              <p className="text-base font-medium">{note.title}</p>
              <p className="max-w-[34ch] text-xs leading-5 text-muted-foreground">
                {note.body}
              </p>
            </div>
          </CarouselSlide>
        ))}
      </CarouselViewport>
      <div className="flex items-center justify-between gap-3">
        <CarouselPrevious />
        <CarouselIndicators />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
