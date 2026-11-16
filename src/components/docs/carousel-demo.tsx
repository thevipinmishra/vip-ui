"use client";

import {
  BackpackIcon,
  CoffeeIcon,
  SneakerIcon,
  TentIcon,
  ToteIcon,
} from "@phosphor-icons/react";
import {
  Carousel,
  CarouselIndicators,
  CarouselNext,
  CarouselPrevious,
  CarouselSlide,
  CarouselViewport,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const products = [
  {
    name: "Field Jacket",
    detail: "Moss · Size M",
    icon: BackpackIcon,
    tone: "bg-muted",
  },
  {
    name: "Canvas Tote",
    detail: "Sand · 18 L",
    icon: ToteIcon,
    tone: "bg-secondary",
  },
  {
    name: "Camp Mug",
    detail: "Ember · 350 ml",
    icon: CoffeeIcon,
    tone: "bg-accent",
  },
  {
    name: "Trail Sneaker",
    detail: "Slate · Size 42",
    icon: SneakerIcon,
    tone: "bg-card",
  },
  {
    name: "Two-Person Tent",
    detail: "Pine · 2.4 kg",
    icon: TentIcon,
    tone: "bg-muted",
  },
];

export function CarouselDemo() {
  return (
    <Carousel aria-label="Featured products" className="w-full max-w-md">
      <CarouselViewport>
        {products.map((product) => (
          <CarouselSlide key={product.name}>
            <div
              className={cn(
                "grid aspect-[16/9] place-items-center rounded-xl ring-1 ring-border/60",
                product.tone,
              )}
            >
              <product.icon
                size={48}
                aria-hidden="true"
                className="text-muted-foreground"
              />
            </div>
            <div className="mt-3 grid gap-0.5">
              <p className="truncate text-sm font-medium">{product.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {product.detail}
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
