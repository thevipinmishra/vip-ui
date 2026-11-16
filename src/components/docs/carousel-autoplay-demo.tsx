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

const stories = [
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
      aria-label="Field notes"
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
              className={`grid aspect-[16/10] content-end gap-1.5 rounded-xl p-5 ring-1 ring-border/60 ${story.tone}`}
            >
              <p className="text-base font-medium">{story.title}</p>
              <p className="max-w-[32ch] text-xs leading-5 text-muted-foreground">
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
