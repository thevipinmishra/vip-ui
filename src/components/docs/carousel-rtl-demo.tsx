"use client";

import {
  Carousel,
  CarouselIndicators,
  CarouselNext,
  CarouselPrevious,
  CarouselSlide,
  CarouselViewport,
} from "@/components/ui/carousel";

const items = [
  { name: "سترة ميدانية", detail: "قطن عضوي", tone: "bg-muted" },
  { name: "حقيبة كانفاس", detail: "سعة ١٨ لترا", tone: "bg-secondary" },
  { name: "قبعة صوفية", detail: "مقاس واحد", tone: "bg-accent" },
  { name: "كوب معدني", detail: "٣٥٠ مل", tone: "bg-card" },
  { name: "حزام جلدي", detail: "مقاس ٩٠", tone: "bg-muted" },
];

export function CarouselRtlDemo() {
  return (
    <div dir="rtl">
      <Carousel aria-label="منتجات مميزة" className="w-full max-w-md">
        <CarouselViewport>
          {items.map((item) => (
            <CarouselSlide key={item.name}>
              <div
                className={`grid aspect-[4/3] place-items-center rounded-xl ring-1 ring-border/60 ${item.tone}`}
              >
                <span className="text-base font-medium text-muted-foreground">
                  {item.name}
                </span>
              </div>
              <div className="mt-3 grid gap-0.5">
                <p className="truncate text-sm font-medium">{item.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {item.detail}
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
    </div>
  );
}
