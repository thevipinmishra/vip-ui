"use client";

import { SpeakerHighIcon, SpeakerLowIcon } from "@phosphor-icons/react";
import {
  Slider,
  SliderHandle,
  SliderRail,
  SliderRange,
  SliderTrack,
} from "@/components/ui/slider";

export function SliderCustomDemo() {
  return (
    <Slider
      aria-label="Media volume"
      defaultValue={60}
      className="w-full max-w-sm"
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        <SpeakerLowIcon aria-hidden="true" className="size-5 shrink-0" />
        <SliderTrack className="flex-1">
          <SliderRail>
            <SliderRange />
          </SliderRail>
          <SliderHandle />
        </SliderTrack>
        <SpeakerHighIcon aria-hidden="true" className="size-5 shrink-0" />
      </div>
    </Slider>
  );
}
