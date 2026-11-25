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

const [ridge, tide, face, dunes, forest] = photos;

const items = [
  { photo: ridge, name: "شروق على القمة", place: "جبال الألب" },
  { photo: tide, name: "برك المد والجزر", place: "ساحل كاليفورنيا" },
  { photo: face, name: "الوجه الشمالي", place: "شامونيه" },
  { photo: dunes, name: "كثبان بعد المطر", place: "وادي رم" },
  { photo: forest, name: "وادي الصنوبر", place: "الغابة السوداء" },
];

export function CarouselRtlDemo() {
  return (
    <div dir="rtl" className="flex w-full justify-center">
      <Carousel aria-label="صور الرحلة" className="w-full max-w-md">
        <CarouselViewport>
          {items.map((item) => (
            <CarouselSlide key={item.name}>
              <div
                role="img"
                aria-label={item.name}
                className="aspect-[4/3] rounded-xl bg-cover bg-center"
                style={{ backgroundImage: `url("${item.photo.src}")` }}
              />
              <div className="mt-3 grid gap-0.5">
                <p className="truncate text-sm font-medium">{item.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {item.place}
                </p>
              </div>
            </CarouselSlide>
          ))}
        </CarouselViewport>
        <div className="flex items-center justify-between gap-3">
          <CarouselPrevious aria-label="الشريحة السابقة" />
          <CarouselIndicators />
          <CarouselNext aria-label="الشريحة التالية" />
        </div>
      </Carousel>
    </div>
  );
}
