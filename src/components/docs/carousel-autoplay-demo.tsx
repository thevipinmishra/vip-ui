"use client";

import { PauseIcon, PlayIcon } from "@phosphor-icons/react";
import Autoplay, { type AutoplayType } from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselNext,
  CarouselPrevious,
  CarouselSlide,
  CarouselStatus,
  CarouselViewport,
  useCarousel,
} from "@/components/ui/carousel";
import { photos } from "./photo-art";

const [ridge, tide, face, forest] = photos;

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
    photo: forest,
    title: "The pine valley trail",
    body: "Eight shaded kilometers with one steep climb.",
  },
];

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function autoplayOf(api: CarouselApi) {
  return api.plugins().autoplay as AutoplayType | undefined;
}

function AutoplayToggle() {
  const { api } = useCarousel();
  const [choice, setChoice] = useState<boolean | null>(null);
  const choiceRef = useRef(choice);

  useEffect(() => {
    if (!api) return;
    const hold = () => {
      const autoplay = autoplayOf(api);
      if (!autoplay) return;
      if (!(choiceRef.current ?? !autoplay.options.playOnInit)) return;
      queueMicrotask(() => autoplay.stop());
    };
    api.on("autoplay:play", hold);
    return () => {
      api.off("autoplay:play", hold);
    };
  }, [api]);

  const autoplay = api ? autoplayOf(api) : undefined;
  if (!autoplay) return null;
  const paused = choice ?? !autoplay.options.playOnInit;

  return (
    <Button
      variant="outline"
      size="sm"
      iconOnly
      aria-label={paused ? "Play slides" : "Pause slides"}
      onPress={() => {
        choiceRef.current = !paused;
        setChoice(!paused);
        if (paused) autoplay.play();
        else autoplay.stop();
      }}
    >
      {paused ? (
        <PlayIcon aria-hidden="true" />
      ) : (
        <PauseIcon aria-hidden="true" />
      )}
    </Button>
  );
}

export function CarouselAutoplayDemo() {
  const [plugins] = useState(() => [
    Autoplay({
      delay: 4000,
      playOnInit: !prefersReducedMotion(),
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]);

  return (
    <Carousel
      aria-label="Trip highlights"
      opts={{ loop: true }}
      plugins={plugins}
      className="w-full max-w-md"
    >
      <CarouselViewport aria-live="off">
        {stories.map((story) => (
          <CarouselSlide key={story.title}>
            <div
              className="relative grid aspect-[16/10] content-end gap-1 overflow-hidden rounded-xl bg-cover bg-center p-5 text-white"
              style={{ backgroundImage: `url("${story.photo.src}")` }}
            >
              <span className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              <p className="relative text-base font-medium">{story.title}</p>
              <p className="relative max-w-[32ch] text-xs leading-5 text-white/80">
                {story.body}
              </p>
            </div>
          </CarouselSlide>
        ))}
      </CarouselViewport>
      <div className="flex items-center justify-between gap-3">
        <CarouselPrevious />
        <div className="flex items-center gap-3">
          <CarouselStatus />
          <AutoplayToggle />
        </div>
        <CarouselNext />
      </div>
    </Carousel>
  );
}
