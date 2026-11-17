"use client";

import { PauseIcon, PlayIcon } from "@phosphor-icons/react";
import Autoplay, { type AutoplayType } from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
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

function AutoplayToggle() {
  const { api } = useCarousel();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!api) return;
    const autoplay = api.plugins().autoplay as AutoplayType | undefined;
    if (!autoplay) return;
    setPlaying(autoplay.isPlaying());
    const play = () => setPlaying(true);
    const stop = () => setPlaying(false);
    api.on("autoplay:play", play);
    api.on("autoplay:stop", stop);
    return () => {
      api.off("autoplay:play", play);
      api.off("autoplay:stop", stop);
    };
  }, [api]);

  if (!api?.plugins().autoplay) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      iconOnly
      aria-label={playing ? "Pause slides" : "Play slides"}
      onPress={() => {
        const autoplay = api.plugins().autoplay as AutoplayType | undefined;
        if (!autoplay) return;
        if (autoplay.isPlaying()) autoplay.stop();
        else autoplay.play();
      }}
    >
      {playing ? (
        <PauseIcon aria-hidden="true" />
      ) : (
        <PlayIcon aria-hidden="true" />
      )}
    </Button>
  );
}

function useReducedMotionPreference() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function CarouselAutoplayDemo() {
  const reducedMotion = useReducedMotionPreference();

  return (
    <Carousel
      aria-label="Trip highlights"
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 4000,
          playOnInit: !reducedMotion,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
          stopOnFocusIn: true,
        }),
      ]}
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
